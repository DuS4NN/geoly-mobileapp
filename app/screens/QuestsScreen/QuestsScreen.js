import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, TextInput, Dimensions, Linking, Pressable} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {FRONTEND_SERVER_URL, API_SERVER_URL} from "@env";
import axios from "axios";

import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import colors from "../../../AppColors"
import styles from "./QuestsScreenStyleSheet";
import mainStyles from "../../../AppStyleSheet.js"

function QuestsScreen() {

    const {userContext, setUserContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [dailyQuest, setDailyQuest] = useState([])
    const [quests, setQuests] = useState([])
    const [partyQuests, setPartyQuests] = useState([])

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: API_SERVER_URL+"/allactivequests",
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){
                setDailyQuest(response.data.data[0].map((daily) => {
                    return {
                        name: daily[0],
                        category: daily[1]
                    }
                }))
                setQuests(response.data.data[1].map((quest) => {
                    return {
                        name: quest[0],
                        category: quest[1]
                    }
                }))
                setQuests(response.data.data[2].map((partyQuests) => {
                    return {
                        name: partyQuests[0],
                        category: partyQuests[1],
                        party: partyQuests[2]
                    }
                }))
            }else{
                setTextSnack(text.error.somethingWentWrong)
                setShowSnack(true)
                setTypeSnack("ERROR")
                handleError(error)
            }
        }).catch(function (error) {
            setTextSnack(text.error.somethingWentWrong)
            setShowSnack(true)
            setTypeSnack("ERROR")
            handleError(error)
        }).finally(function () {
            setLoading(false)
        })
    }, [])

    return (
        <View>
            <Text>Ahoj</Text>


            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </View>
    )
}

export default QuestsScreen
