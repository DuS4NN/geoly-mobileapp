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

function MainScreen () {
    const {userContext} = useContext(UserContext)

    const [navigationItem, setNavigationItem] = useState("QUESTS")


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

    return (
        <View style={styles.background}>

            <View style={{...styles.content}}>
                {navigationItem === "QUESTS" && (
                    <QuestsScreen/>
                )}
                {navigationItem === "NEAR" && (
                    <NearQuestsScreen/>
                )}
                {navigationItem === "CREATOR" && (
                    <CreatorScreen/>
                )}
                {navigationItem === "ME" && (
                    <MeScreen/>
                )}
            </View>

            <BottomNavigation navigationItem={navigationItem} setNavigationItem={setNavigationItem}/>

        </View>
    )
}

export default MainScreen
