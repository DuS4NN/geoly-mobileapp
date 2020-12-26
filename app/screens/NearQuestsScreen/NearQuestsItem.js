import React, {useContext, useState} from "react";
import {Text, View, Image, Pressable} from "react-native";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./NearQuestsListStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";

function NearQuestsItem(props) {

    const {quest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [categoryImages] = useState({
        1: require("../../assets/categoryImages/1.png"),
        2: require("../../assets/categoryImages/2.png"),
        3: require("../../assets/categoryImages/3.png"),
        4: require("../../assets/categoryImages/4.png"),
        5: require("../../assets/categoryImages/5.png"),
        6:  require("../../assets/categoryImages/6.png"),
        7: require("../../assets/categoryImages/7.png")
    })

    const setSelectedQuest = (quest) => {

    }

    return (
        <Pressable onPress={() => setSelectedQuest(quest)}>
            <View style={styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} source={categoryImages[quest.categoryId]} />
                </View>

                <View style={styles.itemBorder} />

                <View style={styles.itemTextContainer}>
                    <Text numberOfLines={1} style={styles.itemText}>{quest.name}</Text>
                    <Text style={styles.itemDistanceText}>{quest.distance > 1 ? Math.round(quest.distance)+" "+text.nearScreen.km : Math.round(quest.distance*1000)+" "+text.nearScreen.m}</Text>
                </View>

            </View>

        </Pressable>
    )
}

export default NearQuestsItem
