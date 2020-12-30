import React, { useEffect, useState } from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import {API_SERVER_URL} from "@env";
import * as Sentry from "@sentry/react-native";
import * as Font from "expo-font";
import axios from "axios";
import handleError from "./ErrorHandler";
import {UserContext} from "./UserContext";
import styles from "./AppStyleSheet";
import MainScreen from "./app/screens/MainScreen/MainScreen";
import GPS from "./app/components/GPS";

export default function App () {

    const [userContext, setUserContext] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [fontLoaded, setFontLoaded] = useState(false)

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        Sentry.init({
            dsn: "https://5e6de740c813439ca7dee24dbba7afa8@o421143.ingest.sentry.io/5547733",
            enableNative: false
        });

        loadFonts(setFontLoaded)
        checkUser()

    }, [])

    const setAddress = (address) => {
        axios({
            method: "GET",
            url: API_SERVER_URL+"/setAddress?address="+address.latitude+","+address.longitude,
            withCredentials: true
        }).catch(function (error) {
            handleError(error)
        })
    }

    const checkUser = async () => {
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
                    address: options[5],
                    addressUpdate: options[6],
                    id: options[7],
                    roles: roles
                })

                let lastUpdate = new Date(options[6])
                let now = new Date()

                if(options[6] === null || options[5] === null || now.getMonth() !== lastUpdate.getMonth() || now.getDate() !== lastUpdate.getDate() || now.getFullYear() !== lastUpdate.getFullYear() ){
                    GPS().then(response => {
                        if(response !== null){
                            setAddress(response)
                        }
                    })
                }

            }else{
                setUserContext({
                    nickName: null,
                    profileImage: null,
                    languageId: 2,
                    mapTheme: 1,
                    address: null,
                    darkMode: false,
                    roles: null
                })
            }
        }).catch(function (error) {
            setUserContext({
                nickName: null,
                profileImage: null,
                languageId: 2,
                mapTheme: 1,
                address: null,
                darkMode: false,
                roles: null
            })
            handleError(error)
        }).finally(function () {
            setLoaded(true)
        })
    }

    return (
    <SafeAreaView style={styles.mainSafeAreaView}>

        {loaded && fontLoaded && (
            <UserContext.Provider value={{userContext, setUserContext}}>

                {userContext["nickName"] !== null && (
                    <MainScreen/>
                )}

                {userContext["nickName"] === null && (
                    <LoginScreen/>
                )}

            </UserContext.Provider>
        )}

    </SafeAreaView>
    )
}

const loadFonts = (setFontLoaded) => {
    Font.loadAsync({
        MarkProBold: require("./app/assets/fonts/MarkProBold.otf"),
        OpenSans: require("./app/assets/fonts/OpenSans.otf"),
        OpenSansLight: require("./app/assets/fonts/OpenSansLight.otf")
    }).then(function () {
        setFontLoaded(true)
    })
}
