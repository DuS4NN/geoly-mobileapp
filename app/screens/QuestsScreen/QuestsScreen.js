import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Dimensions, TouchableHighlight} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL, PUSHER_KEY, PUSHER_CLUSTER} from "@env";
import axios from "axios";
import GestureRecognizer from 'react-native-swipe-gestures';
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./QuestsScreenStyleSheet";
import mainStyles from "../../../AppStyleSheet.js"
import QuestsList from "./QuestList";
import GameScreen from "../GameScreen/GameScreen";
import Pusher from "pusher-js/react-native";
import { debounce } from "lodash";
import colors from "../../../AppColors";

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

    const [loading, setLoading] = useState(true)

    const [selectedQuest, setSelectedQuest] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)

        const channels_questUpdate = []
        const channels_partyUpdate = []
        const channels_partyQuestUpdate = []
        const channels_partyUserUpdate = []

        axios({
            method: "GET",
            url: API_SERVER_URL+"/allactivequests",
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){
                setDailyQuest(response.data.data[0].map((daily) => {

                    channels_questUpdate.push("QUEST-"+daily[2])
                    return {
                        name: daily[0],
                        category: daily[1],
                        id: daily[2]
                    }
                }))
                setClassicQuests(response.data.data[1].map((quest) => {

                    channels_questUpdate.push("QUEST-"+quest[2])
                    return {
                        name: quest[0],
                        category: quest[1],
                        id: quest[2]
                    }
                }))
                setPartyQuests(response.data.data[2].map((partyQuests) => {

                    channels_partyUpdate.push("PARTY-"+partyQuests[4])
                    channels_partyQuestUpdate.push("QUEST-"+partyQuests[4]+"-"+partyQuests[3])
                    channels_partyUserUpdate.push("PARTY-"+partyQuests[4]+"-"+userContext['id'])
                    return {
                        name: partyQuests[0],
                        category: partyQuests[1],
                        party: partyQuests[2],
                        id: partyQuests[3],
                        partyId: partyQuests[4]
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
            initPusherChannels(channels_questUpdate, channels_partyUpdate, channels_partyQuestUpdate, channels_partyUserUpdate)
        })
    }


    const initPusherChannels = (channels_questUpdate, channels_partyUpdate, channels_partyQuestUpdate, channels_partyUserUpdate) => {
        const pusher = new Pusher(PUSHER_KEY+"", {
            cluster: PUSHER_CLUSTER+""
        })

        channels_questUpdate = channels_questUpdate.filter((v, i, a) => a.indexOf(v) === i);
        channels_partyUpdate = channels_partyUpdate.filter((v, i, a) => a.indexOf(v) === i);
        channels_partyQuestUpdate = channels_partyQuestUpdate.filter((v, i, a) => a.indexOf(v) === i);
        channels_partyUserUpdate = channels_partyUserUpdate.filter((v, i, a) => a.indexOf(v) === i);

        channels_questUpdate.map((channel => {
            const channels = pusher.subscribe(channel)
            channels.bind("QUEST-UPDATE", function (data) {
                reloadData(text.success.reloadQuest)
            })
        }))
        channels_partyUpdate.map((channel => {
            const channels = pusher.subscribe(channel)
            channels.bind("PARTY-UPDATE", function (data) {
                reloadData(text.success.reloadParty)
            })
        }))
        channels_partyQuestUpdate.map((channel => {
            const channels = pusher.subscribe(channel)
            channels.bind("PARTY-QUEST-UPDATE", function (data) {
                reloadData(text.success.reloadQuest)
            })
        }))
        channels_partyUserUpdate.map((channel => {
            const channels = pusher.subscribe(channel)
            channels.bind("PARTY-USER-UPDATE", function (data) {
                reloadData(text.success.reloadParty)
            })
        }))
        //channel: QUEST-UPDATE, event: QUEST-<QUESTID>, deleteQuest, signOutOfDaily
        //channel: PARTY-UPDATE, event: PARTY-<PARTYID>, deleteParty
        //channel: PARTY-QUEST-UPDATE, event: QUEST-<PARTYID>-<QUESTID>, deleteQeust, singOutOfPartyQuest
        //channel: PARTY-USER-UPDATE, event: PARTY-<PARTYID>-<USERID>, leaveParty, kickFromParty
    }

    const reloadData = debounce((snackText) => {
        setSelectedQuest(null)
        setShowSnack(true)
        setTypeSnack("SUCCESS")
        setTextSnack(snackText)
        loadData()
    }, 1000)

    const switchButtonInNavigation = (item) => {
        setNavigationItem(item)
    }

    const onSwipe = (gestureName) => {
         switch(gestureName){
            case "SWIPE_LEFT":
                if(navigationItem === "DAILY") setNavigationItem("CLASSIC")
                else if(navigationItem === "CLASSIC") setNavigationItem("PARTY")
                break
            case "SWIPE_RIGHT":
                if(navigationItem === "PARTY") setNavigationItem("CLASSIC")
                else if(navigationItem === "CLASSIC") setNavigationItem("DAILY")
                break
            case "SWIPE_DOWN":
                loadData()
                break
        }
    }

    const removeQuestFromList = () => {
        switch (navigationItem) {
            case "PARTY":
                setPartyQuests(partyQuests.filter((filterQuest => {
                    return filterQuest.id !== selectedQuest.id
                })))
                break
            case "CLASSIC":
                setClassicQuests(classicQuests.filter((filterQuest => {
                    return filterQuest.id !== selectedQuest.id
                })))
                break
            case "DAILY":
                setDailyQuest(dailyQuest.filter((filterQuest => {
                    return filterQuest.id !== selectedQuest.id
                })))
                break
        }
        setTypeSnack("SUCCESS")
        setShowSnack(true)
        setTextSnack(text.success.questFinish)
    }

    return (
        <View style={{flex: 1}}>
            {selectedQuest === null ? (
                <GestureRecognizer style={{flex: 1}} onSwipe={(direction, state) => onSwipe(direction, state)} config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}>
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

                                    <TouchableHighlight style={styles.contentHighlightItem} underlayColor={colors.gray} onPress={() => switchButtonInNavigation("DAILY")}>
                                        <View style={[styles.contentNavigationItem, styles.contentNavigationLeftItem]}>
                                            <View style={navigationItem === "DAILY" ? styles.contentNavigationItemBackgroundSelectedLeft : styles.contentNavigationItemBackgroundLeft}>
                                                <Text style={navigationItem === "DAILY" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.daily}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.contentHighlightItem}  underlayColor={colors.gray} onPress={() => switchButtonInNavigation("CLASSIC")}>
                                        <View style={styles.contentNavigationItem }>
                                            <View style={navigationItem === "CLASSIC" ? styles.contentNavigationItemBackgroundSelectedCenter : styles.contentNavigationItemBackgroundCenter}>
                                                <Text style={navigationItem === "CLASSIC" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.classic}</Text>
                                            </View>

                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.contentHighlightItem} underlayColor={colors.gray} onPress={() => switchButtonInNavigation("PARTY")}>
                                        <View style={[styles.contentNavigationItem, styles.contentNavigationRightItem]}>
                                            <View style={navigationItem === "PARTY" ? styles.contentNavigationItemBackgroundSelectedRight : styles.contentNavigationItemBackgroundRight}>
                                                <Text style={navigationItem === "PARTY" ? [styles.contentNavigationItemText, styles.contentNavigationItemTextSelected] : styles.contentNavigationItemText}>{text.questScreen.party}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>

                                </View>

                                <View style={styles.contentData}>
                                    <QuestsList navigationItem={navigationItem} setSelectedQuest={setSelectedQuest} questList={navigationItem === "DAILY" ? dailyQuest : navigationItem === "PARTY" ? partyQuests : classicQuests} setQuestList={navigationItem === "DAILY" ? setDailyQuest : navigationItem === "PARTY" ? setPartyQuests : setClassicQuests}/>
                                </View>

                            </View>
                        )}

                        <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

                    </View>
                </GestureRecognizer>
            ) : (
                <GameScreen removeQuestFromList={removeQuestFromList} setSelectedQuest={setSelectedQuest} quest={selectedQuest} type={navigationItem}/>
            )}
        </View>
    )
}

export default QuestsScreen
