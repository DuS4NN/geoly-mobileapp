import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Pressable, BackHandler, Dimensions, StyleSheet} from "react-native";
import {UserContext} from "../../../../UserContext";
import * as Camera from "expo-camera";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {API_SERVER_URL, IMAGE_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../../ErrorHandler";
import getText from "../../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../../AppColors";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../../AppStyleSheet";
import FinishScreen from "./FinishScreen";

function ScanQrCodeScreen(props) {

    const {finishLoading, stage, handleFinishStage} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [codeData, setCodeData] = useState(null)
    const [finishScreen, setFinishScreen] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")



    useEffect(() => {
        getCameraPermission()

        BarCodeScanner.scanFromURLAsync("http://192.168.1.10:8080/image?url="+stage.qrCodeUrl).then(function (response) {
            setCodeData(response[0].data)
        })

    }, [])

    const getCameraPermission = async () => {
        let { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status !== 'granted') {
            BackHandler.exitApp()
        }
    }

    const handleBarCodeScanned = ({data}) => {
        if(codeData === null){
            setTextSnack(text.error.cantLoadCode)
            setShowSnack(true)
            setTypeSnack("ERROR")
            return
        }

        if(data === codeData){
            setFinishScreen(true)
        }else{
            setTextSnack(text.gameScreen.wrongQrCode)
            setShowSnack(true)
            setTypeSnack("ERROR")
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: colors.white}}>

            {finishScreen === true ? (
                <FinishScreen finishLoading={finishLoading} note={stage.note} handleFinishStage={handleFinishStage}/>
            ) : (
                <View style={{flex: 1, backgroundColor: colors.white}}>
                    <Text style={styles.qrCodeText}>{text.gameScreen.scanQrCode}</Text>
                    <BarCodeScanner style={{height: Dimensions.get("screen").height-70, width: Dimensions.get("screen").width}} onBarCodeScanned={handleBarCodeScanned}>



                    </BarCodeScanner>
                </View>
            )}

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </View>
    )
}

export default ScanQrCodeScreen
