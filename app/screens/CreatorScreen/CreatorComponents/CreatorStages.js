import React, {useContext, useState} from "react";
import {Text, View, Image, TouchableOpacity, Platform} from "react-native";
import {UserContext} from "../../../../UserContext";
import DropDownPicker from 'react-native-dropdown-picker';
import colors from "../../../../AppColors"
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";
import GPS from "../../../components/GPS";
import {LinearGradient} from "expo-linear-gradient";
import StageGoToPlace from "./StageGoToPlace";
import StageScanQrCode from "./StageScanQrCode";
import StageAnswerQuestion from "./StageAnswerQuestion";
import mainStyles from "../../../../AppStyleSheet";

function CreatorStages (props) {

    const {setStages, stages, showSnackBar, addStage, addStageLoading, setAddStageLoading} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])


    const [stageType, setStageType] = useState("GO_TO_PLACE")

    const stageTypes = [
        {
            value: 'GO_TO_PLACE',
            label: text.stageTypes.GO_TO_PLACE,
            selected: true
        }, {
            value: 'ANSWER_QUESTION',
            label: text.stageTypes.ANSWER_QUESTION
        }, {
            value: 'SCAN_QR_CODE',
            label: text.stageTypes.SCAN_QR_CODE
        }
    ]

    const handleAddStage = () => {
        if(stages.length >= 5) return
        setAddStageLoading(true)

        if(stageType === "GO_TO_PLACE"){
            GPS().then(response => {
                if(response !== null){
                    addStage(response, stageType)
                    return response
                }else{
                    showSnackBar(text.creator.gps, "ERROR")
                    return null
                }
            })
        }else{
            addStage(null, stageType)
        }
    }

    const changeSelectedStageType = (item) => {
        setStageType(item.value)
    }

    return (
        <View style={styles.formContainer}>

            <Text style={styles.formTitle}>{text.creator.stages}</Text>

            {stages.length === 0 && (

                <View style={styles.loadingContainer}>
                    <Image style={styles.loadingImage} source={require("../../../assets/images/loading.gif")} />
                </View>

            )}

            {stages.length < 5 && stages.length > 0 &&(
                <View>
                    <Text style={styles.formLabel}>{text.creator.stageType}</Text>
                    <DropDownPicker
                        items={stageTypes}
                        containerStyle={{
                            alignSelf: "center",
                            width: "86%",
                            height: 45,
                        }}
                        itemStyle={{
                            borderBottomColor: colors.lightGray,
                            borderBottomWidth: 1,
                        }}
                        onChangeItem={item => changeSelectedStageType(item)}
                    />

                    <TouchableOpacity activeOpacity={.8} onPress={handleAddStage}>
                        {Platform.OS === "ios" ? (
                            <View style={{...styles.button, backgroundColor: colors.lightGreen}}>
                                {addStageLoading && (
                                    <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                                )}
                                <Text style={styles.buttonText}>{text.creator.addStage}</Text>
                            </View>
                        ) : (
                            <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                {addStageLoading && (
                                    <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                                )}
                                <Text style={styles.buttonText}>{text.creator.addStage}</Text>
                            </LinearGradient>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {stages.map(stage => (
                <View key={stage.id}>
                    {stage.type === "GO_TO_PLACE" && (
                        <StageGoToPlace stage={stage} stages={stages} setStages={setStages} />
                    )}
                    {stage.type === "ANSWER_QUESTION" && (
                        <StageAnswerQuestion stage={stage} stages={stages} setStages={setStages} showSnackBar={showSnackBar}/>
                    )}
                    {stage.type === "SCAN_QR_CODE" && (
                        <StageScanQrCode stage={stage} stages={stages} setStages={setStages} />
                    )}
                </View>
            ))}

        </View>
    )
}

export default CreatorStages
