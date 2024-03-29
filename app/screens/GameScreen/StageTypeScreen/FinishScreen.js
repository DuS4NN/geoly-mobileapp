import React, {useContext} from "react";
import {Text, View, Image, TouchableOpacity, Platform} from "react-native";
import {UserContext} from "../../../../UserContext";
import getText from "../../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../../AppColors";
import mainStyles from "../../../../AppStyleSheet";


function FinishScreen(props) {

    const {finishLoading, note, handleFinishStage, stageListLength} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    return (
        <View style={styles.finishedContainer}>
            <View style={styles.leftStagesContainer}>
                <Text style={styles.leftStagesText}>{text.gameScreen.leftStages+stageListLength}</Text>
            </View>

            <Text style={styles.finishedTitle}>{text.gameScreen.finishedScreenTitle}</Text>
            <Image style={styles.finishImage} source={require("../../../assets/images/celebration.png")} />
            {note !== "" && note !== null && (
                <View style={styles.finishNoteContainer}>
                    <Text style={styles.finishNoteTitle}>{text.gameScreen.noteTitle}</Text>
                    <Text style={styles.finishNote}>{note}</Text>
                </View>
            )}

            <TouchableOpacity activeOpacity={.8} onPress={handleFinishStage}>
                {Platform.OS === "ios" ? (
                    <View style={{...styles.button, backgroundColor: colors.lightGreen}}>
                        {finishLoading === true && (
                            <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                        )}
                        <Text style={styles.buttonText}>{text.gameScreen.continue}</Text>
                    </View>
                ) : (
                    <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                        {finishLoading === true && (
                            <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                        )}
                        <Text style={styles.buttonText}>{text.gameScreen.continue}</Text>
                    </LinearGradient>
                )}
            </TouchableOpacity>

        </View>
    )
}

export default FinishScreen
