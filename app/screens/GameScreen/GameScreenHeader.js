import React from "react";
import {View, Text, Image, Pressable} from "react-native";
import styles from "./GameScreenStyleSheet";

function GameScreenHeader (props) {

    const {quest, type, goBack} = props



    return (
        <View style={styles.gameHeaderContainer}>
            <Pressable onPress={() => goBack()} >
                <Image style={styles.backArrow} source={require("../../assets/icons/arrowLeft.png")} />
            </Pressable>
            <View style={styles.headerContent}>
                <Text numberOfLines={2} style={styles.headerText}>{quest.name}</Text>
                {type === "PARTY" && (
                    <Text style={styles.headerPartyText}>{quest.party}</Text>
                )}
            </View>
        </View>
    )
}

export default GameScreenHeader
