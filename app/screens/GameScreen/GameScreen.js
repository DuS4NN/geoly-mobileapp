import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, BackHandler} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./GameScreenStyleSheet";
import GameScreenHeader from "./GameScreenHeader";
import axios from "axios"
import {API_SERVER_URL} from "@env";
import handleError from "../../../ErrorHandler";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../AppStyleSheet";
import GoToPlaceScreen from "./StageTypeScreen/GoToPlaceScreen";
import ScanQrCodeScreen from "./StageTypeScreen/ScanQrCodeScreen";
import AnswerQuestionScreen from "./StageTypeScreen/AnswerQuestionScreen";

function GameScreen (props) {

    const {removeQuestFromList, quest, type, setSelectedQuest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [stageList, setStageList] = useState([])
    const [loading, setLoading] = useState(false)

    const [finishLoading, setFinishLoading] = useState(false)
    const [finishScreen, setFinishScreen] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    useEffect(() => {
        getStages()

        BackHandler.addEventListener("hardwareBackPress", function () {
            goBack()
            return true
        })
    }, [])

    const getStages = () => {
        setLoading(true)

        let url = API_SERVER_URL

        switch (type) {
            case "CLASSIC":
                url += "/getUnfinishedStagesClassic?questId="+quest.id
                break
            case "PARTY":
                url += "/getUnfinishedStagesParty?questId="+quest.id+"&partyId="+quest.partyId
                break
            case "DAILY":
                url += "/dailyquest"
                break
        }

        axios({
            method: "GET",
            url: url,
            withCredentials: true
        }).then(function (response) {
            if(type !== "DAILY"){
                setStageList(response.data.data.map((stage => {
                    return {
                        stageId: stage[0],
                        answer: stage[1],
                        latitude: stage[2],
                        longitude: stage[3],
                        qrCodeUrl: stage[4],
                        question: stage[5],
                        type: stage[6],
                        advise: stage[7],
                        note: stage[8],
                        answerList: stage[9],
                        questId: stage[10],
                        questType: type
                    }
                })))
            }else{
                let data = response.data.data
                setStageList([{
                    questId: data[0][0],
                    stageId: data[0][2],
                    duration: data[1],
                    latitude: data[2].latitude,
                    longitude: data[2].longitude,
                    type: "GO_TO_PLACE",
                    questType: type
                }])
            }

        }).catch(function (error) {
            handleError(error)
            setTypeSnack("ERROR")
            setShowSnack(true)
            setTextSnack(text.error.somethingWentWrong)
        }).finally(function () {
            setLoading(false)
        })
    }

    const goBack = () => {
        setSelectedQuest(null)
    }

    const handleFinishStage = () => {
        setFinishLoading(true)
        if(stageList.length === 1){
            axios({
                method: "GET",
                url: API_SERVER_URL+"/finishQuest?stageId="+stageList[0].stageId+"&type="+stageList[0].questType+"&questId="+stageList[0].questId,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === "ACCEPTED"){
                    goBack()
                    removeQuestFromList()
                }else{
                    setTypeSnack("ERROR")
                    setShowSnack(true)
                    setTextSnack(text.error.somethingWentWrong)
                }
            }).catch(function (error) {
                handleError(error)
                setTypeSnack("ERROR")
                setShowSnack(true)
                setTextSnack(text.error.somethingWentWrong)
                setFinishLoading(false)
            })
        }else{
            axios({
                method: "GET",
                url: API_SERVER_URL+"/finishStageAndStartNew?stageId="+stageList[0].stageId+"&questId="+stageList[0].questId+"&type="+stageList[0].questType,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === "ACCEPTED"){
                    setFinishScreen(false)
                    let newStageList = []

                    if(stageList.length > 2){
                        newStageList = stageList.pop()
                    }else{
                        newStageList = [stageList.pop()]
                    }
                    setStageList(newStageList)
                }else{
                    setTypeSnack("ERROR")
                    setShowSnack(true)
                    setTextSnack(text.error.somethingWentWrong)
                }
            }).catch(function (error) {
                handleError(error)
                setTypeSnack("ERROR")
                setShowSnack(true)
                setTextSnack(text.error.somethingWentWrong)
            }).finally(function () {
                setFinishLoading(false)
            })
        }
    }

    return (
        <View style={styles.background}>
            <GameScreenHeader quest={quest} type={type} goBack={goBack}/>

            <View style={styles.gameContent}>
                {loading === true ? (
                    <View style={styles.loading}>
                        <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                    </View>
                ) : (
                    <View style={{flex: 1}}>

                        <View style={styles.leftStagesContainer}>
                            <Text style={styles.leftStagesText}>{text.gameScreen.leftStages+stageList.length}</Text>
                        </View>

                        {stageList.length > 0 && stageList[0].type === "GO_TO_PLACE" && (
                            <GoToPlaceScreen finishScreen={finishScreen} setFinishScreen={setFinishScreen} finishLoading={finishLoading} stage={stageList[0]} handleFinishStage={handleFinishStage}/>
                        )}
                        {stageList.length > 0 && stageList[0].type === "ANSWER_QUESTION" && (
                            <AnswerQuestionScreen finishScreen={finishScreen} setFinishScreen={setFinishScreen} finishLoading={finishLoading} stage={stageList[0]} handleFinishStage={handleFinishStage}/>
                        )}
                        {stageList.length > 0 && stageList[0].type === "SCAN_QR_CODE" && (
                            <ScanQrCodeScreen finishScreen={finishScreen} setFinishScreen={setFinishScreen} finishLoading={finishLoading} stage={stageList[0]} handleFinishStage={handleFinishStage}/>
                        )}

                    </View>
                )}
            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
        </View>
    )
}

export default GameScreen
