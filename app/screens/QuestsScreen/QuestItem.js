import React, {useContext, useState} from "react";
import {Text, View, Image, TouchableHighlight, TouchableOpacity} from "react-native";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./QuestListStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";

function QuestsItem(props) {

    const {navigationItem, setSelectedQuest, quest, questList, setQuestList, setShowSnack, setTextSnack, setTypeSnack} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [deleteView, setDeleteView] = useState(false)

    const [categoryImages] = useState({
        1: require("../../assets/categoryImages/1.png"),
        2: require("../../assets/categoryImages/2.png"),
        3: require("../../assets/categoryImages/3.png"),
        4: require("../../assets/categoryImages/4.png"),
        5: require("../../assets/categoryImages/5.png"),
        6:  require("../../assets/categoryImages/6.png"),
        7: require("../../assets/categoryImages/7.png")
    })

    const signOutOfQuest = () => {
        if(navigationItem === "CLASSIC"){
            axios({
                method: "GET",
                url: API_SERVER_URL+"/quest/signout?questId="+quest.id,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === "ACCEPTED"){

                    setQuestList(questList.filter((q => {
                        return q.id !== quest.id
                    })))

                    setTextSnack(text.success.signOff)
                    setTypeSnack("SUCCESS")
                    setShowSnack(true)
                }else{
                    setTextSnack(text.error.somethingWentWrong)
                    setTypeSnack("ERROR")
                    setShowSnack(true)
                }
            }).catch(function (error) {
                setDeleteView(false)

                setTextSnack(text.error.somethingWentWrong)
                setTypeSnack("ERROR")
                setShowSnack(true)

                handleError(error)
            })
        }else if(navigationItem === "PARTY"){
            axios({
                method: "GET",
                url: API_SERVER_URL+"/group/signout?partyId="+quest.partyId+"&questId="+quest.id,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === "ACCEPTED"){

                    setQuestList(questList.filter((q => {
                        return q.id !== quest.id
                    })))

                    setTextSnack(text.success.signOff)
                    setTypeSnack("SUCCESS")
                    setShowSnack(true)
                }else{
                    setTextSnack(text.error.somethingWentWrong)
                    setTypeSnack("ERROR")
                    setShowSnack(true)
                }
            }).catch(function (error) {
                setDeleteView(false)

                setTextSnack(text.error.somethingWentWrong)
                setTypeSnack("ERROR")
                setShowSnack(true)

                handleError(error)
            })
        }
    }

    const setView = () => {
        if(navigationItem !== "DAILY"){
            setDeleteView(true)
        }
    }

    return (
        <TouchableHighlight underlayColor={colors.lightGray} style={styles.highlightItemContainer} onPress={() => setSelectedQuest(quest)} onLongPress={() => setView()}>
            <View style={deleteView === true ? [styles.itemContainer, styles.itemDeleteContainer] : styles.itemContainer}>
                <View style={styles.itemImageContainer}>
                    <Image style={styles.itemImage} source={categoryImages[quest.category]} />
                </View>

                <View style={styles.itemBorder} />

                {deleteView === true ? (
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.deleteText}>{text.questScreen.signOff}</Text>

                        <View style={styles.deleteButtonsContainers}>
                            <TouchableOpacity activeOpacity={.8} onPress={() => setDeleteView(false)}>
                                <LinearGradient style={styles.deleteButton} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                    <Text style={styles.deleteButtonText}>{text.main.no}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={.8} onPress={signOutOfQuest}>
                                <LinearGradient style={styles.deleteButton} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightRed, colors.darkRed]}>
                                    <Text style={styles.deleteButtonText}>{text.main.yes}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.itemTextContainer}>
                        {navigationItem === "DAILY" ? (
                            <Text  numberOfLines={1} style={styles.itemText}>{text.gameScreen.daily}</Text>
                        ) : (
                            <Text numberOfLines={1} style={styles.itemText}>{quest.name}</Text>
                        )}
                        {navigationItem === "PARTY" && (
                            <Text style={styles.itemPartyNameText}>{quest.party}</Text>
                        )}
                    </View>
                )}
            </View>

        </TouchableHighlight>
    )
}

export default QuestsItem
