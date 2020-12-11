import React from "react";
import {View} from "react-native";

import styles from "./QuestListStyleSheet";

import QuestsItem from "./QuestItem";

function QuestsList(props) {
    const {questList} = props

    return (
        <View style={styles.background}>
            {questList.map((quest => (
                <QuestsItem quest={quest} key={quest.id}/>
            )))}
        </View>
    )
}

export default QuestsList
