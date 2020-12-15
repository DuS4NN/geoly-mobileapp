import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, Pressable} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./GameScreenStyleSheet";
import GameScreenHeader from "./GameScreenHeader";
import GestureRecognizer from "react-native-swipe-gestures";

function GameScreen (props) {

    const {quest, type, setSelectedQuest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    useEffect(() => {

    }, [])


    const getStages = () => {

    }

    const goBack = () => {
        setSelectedQuest(null)
    }


    return (
        <GestureRecognizer style={{flex: 1}} onSwipeRight={() => goBack()} config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}>
            <View style={styles.background}>
                <GameScreenHeader quest={quest} type={type} goBack={goBack}/>

                <View style={styles.gameContent}>

                </View>

            </View>
        </GestureRecognizer>
    )
}

export default GameScreen
