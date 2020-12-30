import React, {useContext, useState, useEffect} from "react";
import {View, Image, BackHandler, ScrollView, Text} from "react-native";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./QuestDetailScreenStyleSheet";
import GameScreenHeader from "../GameScreen/GameScreenHeader";
import mainStyles from "../../../AppStyleSheet";
import {Snackbar} from "react-native-paper";
import QuestDetailMap from "./QuestDetailComponents/QuestDetailMap";
import QuestDetailInfo from "./QuestDetailComponents/QuestDetailInfo";
import QuestDetailStages from "./QuestDetailComponents/QuestDetailStages";
import QuestDetailButton from "./QuestDetailComponents/QuestDetailButton";


function QuestDetailScreen(props) {

    const {quest, goBack} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loadingDetails, setLoadingDetails] = useState(true)
    const [loadingStages, setLoadingStages] = useState(true)

    const [details, setDetails] = useState(null)
    const [stages, setStages] = useState([])

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    useEffect(() => {
        getDetails()
        getStages()

        BackHandler.addEventListener("hardwareBackPress", function () {
            goBack()
            return true
        })
    }, [])

    const getStages = async () => {
        axios({
            method: "GET",
            url: API_SERVER_URL+"/quest/stage?id="+quest.id
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){
                setStages(response.data.data.map((stage => {
                    return {
                        id: stage[0],
                        latitude: stage[2],
                        longitude: stage[3],
                        type: stage[6],
                    }
                })))
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
            setLoadingStages(false)
        })
    }

    const getDetails = async () => {
        axios({
            method: "GET",
            url: API_SERVER_URL+"/quest/detail?id="+quest.id
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){
                let details = response.data.data[0]
                setDetails({
                        id: details[0],
                        name: details[1],
                        difficulty: details[2],
                        description: details[3],
                        categoryName: details[5],
                        nick: details[6],
                        userImage: details[7],
                        date: details[12]
                    })
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
            setLoadingDetails(false)
        })
    }

    const showSnackBar = (text, type) => {
        setShowSnack(true)
        setTypeSnack(type)
        setTextSnack(text)
    }

    return (
        <View style={styles.background}>
            <GameScreenHeader quest={quest} type={"CLASSIC"} goBack={goBack} />

            <View style={styles.content}>
                {(loadingDetails === true || loadingStages === true) ? (
                    <View style={styles.loading}>
                        <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                    </View>
                ) : (
                    <ScrollView style={{flex:1}}>

                        <QuestDetailInfo details={details} />

                        <View style={styles.contentInfoContainer}>
                            <View style={styles.description}>
                                <Text style={styles.descriptionText}>{details.description}</Text>
                            </View>
                            <QuestDetailMap stages={stages} />
                        </View>

                        <QuestDetailStages stages={stages} />
                        <QuestDetailButton questId={details.id} showSnackBar={showSnackBar} />
                    </ScrollView>
                )}

            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
        </View>
    )
}

export default QuestDetailScreen
