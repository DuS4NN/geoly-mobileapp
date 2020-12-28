import React, {useState} from "react";
import {View} from "react-native";
import styles from "./MainScreenStyleSheet";
import BottomNavigation from "./BottomNavigation";
import QuestsScreen from "../QuestsScreen/QuestsScreen";
import NearQuestsScreen from "../NearQuestsScreen/NearQuestsScreen";
import CreatorScreen from "../CreatorScreen/CreatorScreen";

function MainScreen () {

    const [navigationItem, setNavigationItem] = useState("QUESTS")

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
                    <QuestsScreen/>
                )}
            </View>

            <BottomNavigation navigationItem={navigationItem} setNavigationItem={setNavigationItem}/>

        </View>
    )
}

export default MainScreen
