import React, { useEffect, useState } from 'react';
import {SafeAreaView, LogBox, BackHandler} from 'react-native';
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import {API_SERVER_URL} from "@env";
import * as Font from "expo-font";
import axios from "axios";
import handleError from "./ErrorHandler";
import {UserContext} from "./UserContext";
import * as Location from "expo-location";
import styles from "./AppStyleSheet";
import GpsActivationScreen from "./app/screens/GpsActivationScreen/GpsActivationScreen";
import MainScreen from "./app/screens/MainScreen/MainScreen";

export default function App () {

    const [userContext, setUserContext] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [fontLoaded, setFontLoaded] = useState(false)
    const [gpsLoaded, setGpsLoaded] = useState(false)

    const [gpsEnabled, setGpsEnabled] = useState(false)

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

        loadFonts(setFontLoaded)
        checkUser().then(response => {
            getPosition()
        })
    }, [])

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
                    roles: roles
                })
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

    const getPosition = async () => {

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            BackHandler.exitApp()
            return
        }

        let enabled = await Location.hasServicesEnabledAsync()
        if(enabled === true){
            try{
                let location = await Location.getCurrentPositionAsync({});
                let coordinates = location.coords.latitude+","+location.coords.longitude

                /*setUserContext({
                    languageId: userContext["languageId"],
                    mapTheme: userContext["mapTheme"],
                    darkMode: userContext["darkMode"],
                    nickName: userContext["nickName"],
                    profileImage: userContext["profileImage"],
                    address: coordinates,
                    roles: userContext["roles"]
                })*/

                setGpsEnabled(true)
                setGpsLoaded(true)
                return true
            }catch (e) {
                setGpsEnabled(false)
                setGpsLoaded(true)
                return false
            }
        }else{
            setGpsEnabled(false)
            setGpsLoaded(true)
            return false
        }
    }

    return (
    <SafeAreaView style={styles.mainSafeAreaView}>

        {loaded && fontLoaded && gpsLoaded && (
            <UserContext.Provider value={{userContext, setUserContext}}>

                {gpsEnabled === false && (
                    <GpsActivationScreen getPosition={getPosition}/>
                )}

                {userContext["nickName"] !== null && gpsEnabled === true && (
                    <MainScreen/>
                )}

                {userContext["nickName"] === null && gpsEnabled === true && (
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


