import React, {useContext, useState} from "react";
import {Dimensions, Image, Text, View, TouchableHighlight} from "react-native";
import styles from "./MeScreenStyleSheet";
import {UserContext} from "../../../UserContext";
import getText from "../../assets/text/Text";
import {API_SERVER_URL, IMAGE_SERVER_URL} from "@env";
import colors from "../../../AppColors";
import axios from "axios";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../AppStyleSheet";

function MeScreen () {

    const {userContext, setUserContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loadingDaily, setLoadingDaily] = useState(false)
    const [loadingLogOut, setLoadingLogOut] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const showSnackbar = (text, type) => {
        setTextSnack(text)
        setShowSnack(true)
        setTypeSnack(type)
    }

    const signOnDaily = () => {
        setLoadingDaily(true)
        axios({
            method: "GET",
            url: API_SERVER_URL+"/signindaily",
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "ACCEPTED"){
                showSnackbar(text.success.signOnDaily,"SUCCESS")
            }else if(statusCode === "METHOD_NOT_ALLOWED"){
                showSnackbar(text.error[serverResponse], "ERROR")
            }else{
                showSnackbar(text.error.somethingWentWrong, "ERROR")
            }
        }).catch(function (error) {
            handleError(error)
            showSnackbar(text.error.somethingWentWrong, "ERROR")
        }).finally(function () {
            setLoadingDaily(false)
        })
    }

    const logOut = () => {
        setLoadingLogOut(true)
        axios({
            method: "GET",
            url: API_SERVER_URL+"/logout",
            withCredentials: true
        }).then(function () {
            setUserContext({
                nickName: null,
                profileImage: null,
                languageId: 2,
                mapTheme: 1,
                address: null,
                darkMode: false,
                roles: null
            })
        }).catch(function (error) {
            showSnackbar(text.error.somethingWentWrong, "ERROR")
            handleError(error)
            setLoadingLogOut(false)
        })
    }

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.headerText} >{text.profile.profile}</Text>
                <Image style={styles.headerImage} source={require("../../assets/images/profile.png")} />
            </View>
            <View style={{...styles.division, borderRightWidth: Dimensions.get("window").width, borderTopWidth: Dimensions.get("window").width/20}} />

            <View style={styles.content}>

               <View style={styles.contentContainer}>
                   <Image style={styles.profileImage} source={{uri: IMAGE_SERVER_URL+userContext["profileImage"]+"&timestamp="+Date.now()}}/>

                   <Text style={styles.nickName}>{userContext["nickName"]}</Text>

                   <TouchableHighlight style={styles.highlightItemContainer} underlayColor={colors.highlightWhite} onPress={signOnDaily}>
                       <View style={styles.itemContainer}>
                           <Text style={styles.itemText}>{text.profile.daily}</Text>
                           {loadingDaily === true && (
                               <View style={styles.loading}>
                                   <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                               </View>
                           )}
                       </View>
                   </TouchableHighlight>

                   <TouchableHighlight style={styles.highlightItemContainer} underlayColor={colors.highlightWhite} onPress={logOut}>
                       <View style={styles.itemContainer}>
                           <Text style={styles.itemText}>{text.profile.logout}</Text>
                           {loadingLogOut === true && (
                               <View style={styles.loading}>
                                   <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                               </View>
                           )}
                       </View>
                   </TouchableHighlight>

               </View>

            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
        </View>
    )
}

export default MeScreen
