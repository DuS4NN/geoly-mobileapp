import React from 'react'
import {Text, View, Image} from "react-native";

import styles from './LoginScreenStyleSheet'


function LoginScreen(props) {


    return (
        <View style={styles.background}>
            <Image source={require("../../assets/images/login.png")} style={styles.image} />

            <Text style={styles.text}>Welcome! das dasd as dasd </Text>
        </View>
    )
}

export default LoginScreen

