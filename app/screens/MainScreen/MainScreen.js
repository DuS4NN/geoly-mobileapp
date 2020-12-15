import React, {useContext, useState} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, Pressable, Dimensions, StatusBar, Platform} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./MainScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";
import mainStyles from "../../../AppStyleSheet";
import {Snackbar} from "react-native-paper";
import BottomNavigation from "./BottomNavigation";
import QuestsScreen from "../QuestsScreen/QuestsScreen";

function MainScreen () {

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loading, setLoading] = useState(false)

    const [navigationItem, setNavigationItem] = useState("QUESTS")

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")


    return (
        <View style={styles.background}>

            <View style={{...styles.content}}>
                {navigationItem === "QUESTS" && (
                    <QuestsScreen/>
                )}
            </View>

            <BottomNavigation navigationItem={navigationItem} setNavigationItem={setNavigationItem}/>
        </View>
    )

}

export default MainScreen
