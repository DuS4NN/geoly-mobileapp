import React, {useContext, useState} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, Pressable} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./GpsActivationScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";
import mainStyles from "../../../AppStyleSheet";
import {Snackbar} from "react-native-paper";
import GPS from "../../components/GPS";

function GpsActivationScreen(props) {

    const {setCoordinates} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loading, setLoading] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const reloadPosition = () => {
        setLoading(true)
        GPS().then(response => {
            if(response === null){
                setTextSnack(text.error.gpsIsDisabled)
                setTypeSnack("ERROR")
                setShowSnack(true)
                setLoading(false)
            }else{
                setCoordinates(true)
            }
        })
    }

    return (
        <View style={styles.background}>
            <Image style={styles.image} source={require("../../assets/images/gps.png")} />

            <Text style={styles.text}>{text.gpsActivationScreen.gps}</Text>

            <Pressable onPress={() => reloadPosition()}>
                <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                    {loading === true && (
                        <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../assets/images/loading.gif")} />
                    )}
                    <Text style={styles.buttonText}>{text.gpsActivationScreen.reload}</Text>
                </LinearGradient>
            </Pressable>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
        </View>
    )
}

export default GpsActivationScreen
