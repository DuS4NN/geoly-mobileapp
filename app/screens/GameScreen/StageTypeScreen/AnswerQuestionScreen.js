import React, {useContext, useState} from "react";
import {Text, View, Image, Pressable} from "react-native";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";

function AnswerQuestionScreen(props) {

    const {stageList, setStageList} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])


    return (
        <View>

        </View>
    )
}

export default AnswerQuestionScreen
