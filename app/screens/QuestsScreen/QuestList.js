import React, {useContext, useState} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import styles from "./QuestListStyleSheet";
import QuestsItem from "./QuestItem";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../AppStyleSheet";
import {UserContext} from "../../../UserContext";
import getText from "../../assets/text/Text";

function QuestsList(props) {

    const {navigationItem, questList, setQuestList, setSelectedQuest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    return (
        <View style={{flex:1}}>

            {questList.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Image style={styles.noDataImage} source={require("../../assets/images/noData.png")} />
                    <Text style={styles.noDataText}>{text.questScreen.noActiveQuest}</Text>
                </View>
            ) : (
                <View style={{flex:1, marginTop:20}}>
                    <ScrollView style={{flex:1}}>
                        {questList.map((quest => (
                            <QuestsItem navigationItem={navigationItem} setSelectedQuest={setSelectedQuest} setTextSnack={setTextSnack} setShowSnack={setShowSnack} setTypeSnack={setTypeSnack} quest={quest} questList={questList} setQuestList={setQuestList} key={quest.id}/>
                        )))}
                    </ScrollView>
                </View>
            )}

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

        </View>
    )
}

export default QuestsList
