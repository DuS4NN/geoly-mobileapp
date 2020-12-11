import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Dimensions, Pressable} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";

import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./QuestListStyleSheet";
import mainStyles from "../../../AppStyleSheet.js";



function QuestsItem(props) {

    const {quest} = props

    const [categoryImages] = useState({
        1: require("../../assets/categoryImages/1.png"),
        2: require("../../assets/categoryImages/2.png"),
        3: require("../../assets/categoryImages/3.png"),
        4: require("../../assets/categoryImages/4.png"),
        5: require("../../assets/categoryImages/5.png"),
        6:  require("../../assets/categoryImages/6.png"),
        7: require("../../assets/categoryImages/7.png")
    })

    const shadowOpt = {
        width:100,
        height:100,
        color:"#000",
        border:2,
        radius:3,
        opacity:0.2,
        x:0,
        y:3,
        style:{marginVertical:5}
    }

    return (
        <View style={styles.itemContainer}>

            <View style={styles.itemImageContainer}>
                <Image style={styles.itemImage} source={categoryImages[quest.category]} />
            </View>

                <View style={styles.itemTextContainer}>
                    <Text numberOfLines={2} style={styles.itemText}>{quest.name}</Text>
                </View>

        </View>
    )
}

export default QuestsItem
