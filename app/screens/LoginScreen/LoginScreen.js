import React, {useContext, useState} from "react";
import {Text, View, Image, TextInput, Dimensions, Linking, TouchableOpacity, Platform} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {LinearGradient} from "expo-linear-gradient";
import {FRONTEND_SERVER_URL, API_SERVER_URL} from "@env";
import axios from "axios";
import getText from "../../assets/text/Text";
import colors from "../../../AppColors"
import styles from "./LoginScreenStyleSheet";
import mainStyles from "../../../AppStyleSheet.js"
import handleError from "../../../ErrorHandler";


function LoginScreen() {

    const {userContext, setUserContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const [loading, setLoading] = useState(false)

    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    const redirectToRegisterPage = () => {
        const url = FRONTEND_SERVER_URL+"/register"

        if(Linking.canOpenURL(url)){
            Linking.openURL(url)
        }
    }

    const handleLogin = () => {
        if(email.length === 0 || password.length === 0){
            setTextSnack(text.loginScreen.noCredentials)
            setTypeSnack("ERROR")
            setShowSnack(true)
            return
        }
        setLoading(true)

        axios({
            method: "POST",
            url: API_SERVER_URL+"/login?username="+email+"&password="+password,
            withCredentials: true
        }).then(function (response) {
            setUserContext({
                languageId: response.data.options[0][0],
                mapTheme: response.data.options[0][1],
                darkMode: response.data.options[0][2],
                nickName: response.data.options[0][3],
                profileImage: response.data.options[0][4],
                address: response.data.options[0][5],
                addressUpdate: response.data.options[0][6],
                id: response.data.options[0][7],
                roles: response.data.roles
            })
        }).catch(function (error) {
            switch (error.response.data.exception) {
                case "Bad credentials":
                    setTextSnack(text.error.badCredentials)
                    break
                case "User is disabled":
                    setTextSnack(text.error.inactiveAccount)
                    break
                case "User account is locked":
                    setTextSnack(text.error.unverifiedAccount)
                    break
                default:
                    handleError(error)
                    setTextSnack(text.error.somethingWentWrong)
            }
            setPassword("")
            setTypeSnack("ERROR")
            setShowSnack(true)
            setLoading(false)
        })
    }

    return (
        <View style={styles.background}>
            <View style={styles.title}>
                <Image source={require("../../assets/images/login.png")} style={styles.image} />

                <Text style={styles.text}>{text.loginScreen.title}</Text>

                <View style={{...styles.division, borderRightWidth: Dimensions.get("window").width, borderTopWidth: Dimensions.get("window").width/10}} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>{text.loginScreen.email}</Text>
                <TextInput keyboardType="email-address" style={styles.input} placeholder={text.loginScreen.email} value={email} onChangeText={text => onEmailChange(text)} />

                <Text style={[styles.label, styles.passwordLabel]}>{text.loginScreen.password}</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholderTextColor={colors.gray} placeholder={text.loginScreen.password} value={password} onChangeText={text => onPasswordChange(text)} />

                <Text onPress={redirectToRegisterPage} style={styles.register}>{text.loginScreen.register}</Text>

                <TouchableOpacity activeOpacity={.8} onPress={handleLogin}>
                    {Platform.OS === "ios" ? (
                        <View style={{...styles.button, backgroundColor: colors.lightGreen}}>
                            {loading === true && (
                                <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../assets/images/loading.gif")} />
                            )}
                            <Text style={styles.buttonText}>{text.loginScreen.signIn}</Text>
                        </View>
                    ) : (
                        <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                            {loading === true && (
                                <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../assets/images/loading.gif")} />
                            )}
                            <Text style={styles.buttonText}>{text.loginScreen.signIn}</Text>
                        </LinearGradient>
                    )}
                </TouchableOpacity>

            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </View>
    )

}

export default LoginScreen

