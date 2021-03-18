import React, {useContext, useState, useEffect} from "react";
import {View, Image, Text, TouchableOpacity, Platform} from "react-native";
import {UserContext} from "../../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../../ErrorHandler";
import getText from "../../../assets/text/Text";
import styles from "../QuestDetailScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../../AppColors";
import mainStyles from "../../../../AppStyleSheet";

function QuestDetailButton (props) {

    const {questId, showSnackBar} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loading, setLoading] = useState(false)

    const handleSignOnQuest = () => {
        setLoading(true)

        axios({
            method: "POST",
            url: API_SERVER_URL+"/quest/signin?id="+questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "ACCEPTED"){
                showSnackBar(text.success.user_signed_up_on_quest, "SUCCESS")
            }else if(statusCode === "METHOD_NOT_ALLOWED"){
                showSnackBar(text.error[serverResponse], "ERROR")
            }else{
                showSnackBar(text.error.somethingWentWrong, "ERROR")
            }
        }).catch(function (error) {
            handleError(error)
            showSnackBar(text.error.somethingWentWrong, "ERROR")
        }).finally(function () {
            setLoading(false)
        })
    }


    return (
        <View style={{marginBottom: 30}}>

            <TouchableOpacity activeOpacity={.8} onPress={handleSignOnQuest}>
                {Platform.OS === "ios" ? (
                    <View style={{...styles.button, backgroundColor: colors.lightGreen}}>
                        {loading === true && (
                            <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                        )}
                        <Text style={styles.buttonText}>{text.loginScreen.signIn}</Text>
                    </View>
                ) : (
                    <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                        {loading === true && (
                            <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                        )}
                        <Text style={styles.buttonText}>{text.loginScreen.signIn}</Text>
                    </LinearGradient>
                )}
            </TouchableOpacity>

        </View>
    )
}

export default QuestDetailButton
