import React, { useEffect, useState } from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import {API_SERVER_URL} from "@env"
import * as Font from "expo-font"
import axios from "axios"
import handleError from "./ErrorHandler";
import {UserContext} from "./UserContext";

export default function App () {

    const [userContext, setUserContext] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [fontLoaded, setFontLoaded] = useState(false)

    useEffect(() => {

        loadFonts(setFontLoaded)

        axios({
            method: "GET",
            url: API_SERVER_URL+"/checkUser",
            withCredentials: true
        }).then(function (response) {

            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){
                let options = response.data.data[1][0]
                let roles = response.data.data[0]
                setUserContext({
                    languageId: options[0],
                    mapTheme: options[1],
                    darkMode: options[2],
                    nickName: options[3],
                    profileImage: options[4],
                    roles: roles
                })
            }else{
                setUserContext({
                    nickName: null,
                    profileImage: null,
                    languageId: 2,
                    mapTheme: 1,
                    darkMode: false
                })
            }

        }).catch(function (error) {
            handleError(error)
        }).finally(function () {
            setLoaded(true)
        })

    }, [])

    return (
    <SafeAreaView style={styles.main}>

        {loaded && fontLoaded && (
            <UserContext.Provider value={{userContext, setUserContext}}>
                <LoginScreen/>
            </UserContext.Provider>
        )}

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})


async function loadFonts(setFontLoaded) {
    await Font.loadAsync({
        MarkProBold: require("./app/assets/fonts/MarkProBold.otf"),
        OpenSans: require("./app/assets/fonts/OpenSans.otf"),
        OpenSansLight: require("./app/assets/fonts/OpenSansLight.otf")
    })
    setFontLoaded(true)
}


