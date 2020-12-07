import React from 'react';
import { SafeAreaView, Platform, StatusBar, StyleSheet, AsyncStorage } from 'react-native';
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";

export default function App() {

    getUserData()

    return (
    <SafeAreaView
      style={styles.main}>
        <LoginScreen/>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

const getUserData = () => {
    try {
        const userData = AsyncStorage.getItem('user');
        if (value !== null) {
            //Backend request
        }else{
            AsyncStorage.setItem("user", {
                nickName: null,
                languageId: 2,
                mapTheme: 1,
                darkMode: false
            })
        }
    } catch (error) {

    }
}



