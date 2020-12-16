import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./GameScreenStyleSheet";
import GameScreenHeader from "./GameScreenHeader";
import GestureRecognizer from "react-native-swipe-gestures";
import axios from "axios"
import {API_SERVER_URL} from "@env";
import handleError from "../../../ErrorHandler";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../AppStyleSheet";
import GoToPlaceScreen from "./StageTypeScreen/GoToPlaceScreen";
import ScanQrCodeScreen from "./StageTypeScreen/ScanQrCodeScreen";
import AnswerQuestionScreen from "./StageTypeScreen/AnswerQuestionScreen";

function GameScreen (props) {

    const {quest, type, setSelectedQuest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [stageList, setStageList] = useState([])
    const [loading, setLoading] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    useEffect(() => {
        getStages()
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
                url += ""
                break
        }

        axios({
            method: "GET",
            url: url,
            withCredentials: true
        }).then(function (response) {

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
                    answerList: stage[9]
                }
            })))

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

    return (
        <GestureRecognizer style={{flex: 1}} onSwipeRight={() => goBack()} config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}>
            <View style={styles.background}>
                <GameScreenHeader quest={quest} type={type} goBack={goBack}/>

                <View style={styles.gameContent}>
                    {loading === true ? (
                        <View style={styles.loading}>
                            <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                        </View>
                    ) : (
                        <View style={{flex: 1}}>
                            {stageList[0].type === "GO_TO_PLACE" && (
                                <GoToPlaceScreen stageList={stageList} setStageList={setStageList}/>
                            )}
                            {stageList[0].type === "ANSWER_QUESTION" && (
                                <AnswerQuestionScreen stageList={stageList} setStageList={setStageList}/>
                            )}
                            {stageList[0].type === "SCAN_QR_CODE" && (
                                <ScanQrCodeScreen stageList={stageList} setStageList={setStageList}/>
                            )}
                        </View>
                    )}
                </View>
            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </GestureRecognizer>
    )
}

export default GameScreen
