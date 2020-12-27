import React, {useContext, useState} from "react";
import {View, Image, Text} from "react-native";
import {UserContext} from "../../../../UserContext";
import getText from "../../../assets/text/Text";
import styles from "../QuestDetailScreenStyleSheet";

function QuestDetailStages (props) {

    const {stages} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [stageTypeImages] = useState({
        GO_TO_PLACE: require("../../../assets/stageTypeImages/GO_TO_PLACE.png"),
        ANSWER_QUESTION: require("../../../assets/stageTypeImages/ANSWER_QUESTION.png"),
        SCAN_QR_CODE: require("../../../assets/stageTypeImages/SCAN_QR_CODE.png"),
    })

    return (
        <View style={{marginTop: 15}}>
            {stages.map((stage => (
                <View key={stage.id} style={styles.stageItem}>
                    <Image style={styles.stageItemImage} source={stageTypeImages[stage.type]} />
                    <Text style={styles.stageItemText} numberOfLines={1}>{text.stageTypes[stage.type]}</Text>
                </View>
            )))}
        </View>
    )
}

export default QuestDetailStages
