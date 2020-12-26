import React, {useState} from "react";
import {View} from "react-native";
import styles from "./MainScreenStyleSheet";
import BottomNavigation from "./BottomNavigation";
import QuestsScreen from "../QuestsScreen/QuestsScreen";
import NearQuestsScreen from "../NearQuestsScreen/NearQuestsScreen";

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
                    <QuestsScreen/>
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
