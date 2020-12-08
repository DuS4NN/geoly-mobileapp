import React, {useContext, useState} from 'react';
import {Text, View, Image, TextInput} from "react-native";
import {UserContext} from "../../../UserContext";

import getText from "../../assets/text/Text";
import colors from "../../../AppColors"
import styles from './LoginScreenStyleSheet';


function LoginScreen() {

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    return (
        <View style={styles.background}>
            <View style={styles.title}>
                <Image source={require("../../assets/images/login.png")} style={styles.image} />

                <Text style={styles.text}>{text.loginScreen.title}</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>{text.loginScreen.email}</Text>
                <TextInput style={styles.input} placeholder={text.loginScreen.email} value={email} onChangeText={text => onEmailChange(text)} />

                <Text style={styles.label}>{text.loginScreen.password}</Text>
                <TextInput style={styles.input} placeholderTextColor={colors.gray} placeholder={text.loginScreen.password} value={password} onChangeText={text => onPasswordChange(text)} />
            </View>

        </View>
    )
}

export default LoginScreen

