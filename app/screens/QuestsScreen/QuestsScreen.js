import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Dimensions, Pressable} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";

import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./QuestsScreenStyleSheet";
import mainStyles from "../../../AppStyleSheet.js"
import QuestsList from "./QuestList";

function QuestsScreen() {

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [dailyQuest, setDailyQuest] = useState([])
    const [classicQuests, setClassicQuests] = useState([])
    const [partyQuests, setPartyQuests] = useState([])

    const [navigationItem, setNavigationItem] = useState("CLASSIC")

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
                        category: daily[1],
                        id: daily[2]
                    }
                }))
                setClassicQuests(response.data.data[1].map((quest) => {
                    return {
                        name: quest[0],
                        category: quest[1],
                        id: quest[2]
                    }
                }))
                setPartyQuests(response.data.data[2].map((partyQuests) => {
                    return {
                        name: partyQuests[0],
                        category: partyQuests[1],
                        party: partyQuests[2],
                        id: partyQuests[3]
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

    const switchButtonInNavigation = (item) => {
        setNavigationItem(item)
    }

    return (
        <View style={styles.background}>

            <View style={styles.header}>
                <Text style={styles.headerText} >{text.questScreen.quests}</Text>
                <Image style={styles.headerImage} source={require("../../assets/images/quest.png")} />
            </View>
            <View style={{...styles.division, borderRightWidth: Dimensions.get("window").width, borderTopWidth: Dimensions.get("window").width/20}} />

            {loading === true ? (
                <View style={styles.loading}>
                    <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                </View>
            ) : (
                <View style={styles.content}>

                    <View style={styles.contentNavigation}>

                        <Pressable onPress={() => switchButtonInNavigation("DAILY")}>
                            <View style={navigationItem === "DAILY" ? [styles.contentNavigationItem, styles.contentNavigationLeftItem, styles.contentNavigationItemSelected] : [styles.contentNavigationItem, styles.contentNavigationLeftItem]}>
                                <Text style={navigationItem === "DAILY" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.daily}</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => switchButtonInNavigation("CLASSIC")}>
                            <View style={navigationItem === "CLASSIC" ? [styles.contentNavigationItem, styles.contentNavigationItemSelected] : styles.contentNavigationItem }>
                                <Text style={navigationItem === "CLASSIC" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.classic}</Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => switchButtonInNavigation("PARTY")}>
                            <View style={navigationItem === "PARTY" ? [styles.contentNavigationItem, styles.contentNavigationRightItem, styles.contentNavigationItemSelected] : [styles.contentNavigationItem, styles.contentNavigationRightItem]}>
                                <Text style={navigationItem === "PARTY" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.party}</Text>
                            </View>
                        </Pressable>

                    </View>

                    <View style={styles.contentData}>
                        <QuestsList questList={navigationItem === "DAILY" ? dailyQuest : navigationItem === "PARTY" ? partyQuests : classicQuests}/>
                    </View>

                </View>
            )}

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </View>
    )
}

export default QuestsScreen
