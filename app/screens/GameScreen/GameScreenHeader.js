import React, {useContext} from "react";
import {View, Text, Image, TouchableHighlight} from "react-native";
import styles from "./GameScreenStyleSheet";
import {UserContext} from "../../../UserContext";
import getText from "../../assets/text/Text";
import colors from "../../../AppColors";

function GameScreenHeader (props) {

    const {quest, type, goBack} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    return (
        <View style={styles.gameHeaderContainer}>
            <TouchableHighlight underlayColor={colors.highlightBackgroundGreen} onPress={() => goBack()} style={styles.backArrowContainer}>
                    <Image style={styles.backArrow} source={require("../../assets/icons/arrowLeft.png")} />
            </TouchableHighlight>
            <View style={styles.headerContent}>
                {type === "DAILY" ? (
                    <Text  numberOfLines={1} style={styles.headerText}>{text.gameScreen.daily}</Text>
                ) : (
                    <Text numberOfLines={2} style={styles.headerText}>{quest.name}</Text>
                )}
                {type === "PARTY" && (
                    <Text style={styles.headerPartyText}>{quest.party}</Text>
                )}
            </View>
        </View>
    )
}

export default GameScreenHeader
