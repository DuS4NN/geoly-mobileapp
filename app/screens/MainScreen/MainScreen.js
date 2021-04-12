import React, {useContext, useState, useEffect} from "react";
import {View} from "react-native";
import styles from "./MainScreenStyleSheet";
import BottomNavigation from "./BottomNavigation";
import QuestsScreen from "../QuestsScreen/QuestsScreen";
import NearQuestsScreen from "../NearQuestsScreen/NearQuestsScreen";
import CreatorScreen from "../CreatorScreen/CreatorScreen";
import MeScreen from "../Me/MeScreen";
import GPS from "../../components/GPS";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";

function MainScreen (props) {
    const {categories} = props
    const {userContext} = useContext(UserContext)

    const [navigationItem, setNavigationItem] = useState("QUESTS")

    // QuestScreen
    const [dailyQuest, setDailyQuest] = useState([])
    const [classicQuests, setClassicQuests] = useState([])
    const [partyQuests, setPartyQuests] = useState([])
    const [init, setInit] = useState(true)
    const [loadingQuestScreen, setLoadingQuestScreen] = useState(true)

    // NearQuestScreen
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [quests, setQuests] = useState([])
    const [stopLoading, setStopLoading] = useState(false)
    const [coordinates, setCoordinates] = useState(null)
    const [initNear, setInitNear] = useState(true)

    useEffect(() => {
        let lastUpdate = new Date(userContext.addressUpdate)
        let now = new Date()

        if(userContext.addressUpdate === null || userContext.address === null || now.getMonth() !== lastUpdate.getMonth() || now.getDate() !== lastUpdate.getDate() || now.getFullYear() !== lastUpdate.getFullYear() ){
            GPS().then(response => {
                if(response !== null){
                    setAddress(response)
                }
            })
        }
    }, [])

    const setAddress = (address) => {
        axios({
            method: "GET",
            url: API_SERVER_URL+"/setAddress?address="+address.latitude+","+address.longitude,
            withCredentials: true
        }).catch(function (error) {
            handleError(error)
        })
    }

    const reloadDataAfterTakingQuest = () => {
        setInit(true)
        dailyQuest.length = 0
        classicQuests.length = 0
        partyQuests.length = 0
        setLoadingQuestScreen(true)
    }


    return (
        <View style={styles.background}>

            <View style={{...styles.content}}>
                {navigationItem === "QUESTS" && (
                    <QuestsScreen loadingQuestScreen={loadingQuestScreen} setLoadingQuestScreen={setLoadingQuestScreen} dailyQuest={dailyQuest} setDailyQuest={setDailyQuest} classicQuests={classicQuests} setClassicQuests={setClassicQuests} partyQuests={partyQuests} setPartyQuests={setPartyQuests} init={init} setInit={setInit}/>
                )}
                {navigationItem === "NEAR" && (
                    <NearQuestsScreen reloadDataAfterTakingQuest={reloadDataAfterTakingQuest} initNear={initNear} setInitNear={setInitNear} coordinates={coordinates} setCoordinates={setCoordinates} page={page} setPage={setPage} loading={loading} setLoading={setLoading} quests={quests} setQuests={setQuests} stopLoading={stopLoading} setStopLoading={setStopLoading}/>
                )}
                {navigationItem === "CREATOR" && (
                    <CreatorScreen categories={categories}/>
                )}
                {navigationItem === "ME" && (
                    <MeScreen reloadDataAfterTakingQuest={reloadDataAfterTakingQuest} />
                )}
            </View>

            <BottomNavigation navigationItem={navigationItem} setNavigationItem={setNavigationItem}/>


        </View>
    )
}

export default MainScreen
