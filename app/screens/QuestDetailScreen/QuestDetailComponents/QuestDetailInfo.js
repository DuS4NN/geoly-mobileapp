import React from "react";
import {View, Image, Text} from "react-native";
import {IMAGE_SERVER_URL} from "@env";
import styles from "../QuestDetailScreenStyleSheet";
import getDate from "../../../components/getDate";

function QuestDetailInfo(props) {

    const {details} = props

    return (
        <View>
            <View style={styles.contentHeader}>
                <View style={styles.date}>
                    <Text numberOfLines={1} style={styles.dateText}>{getDate(details.date)}</Text>
                </View>
                <View style={styles.user}>
                    <Image style={styles.userImage} source={{uri: IMAGE_SERVER_URL+details.userImage}} />
                    <Text numberOfLines={1} style={styles.userText}>{details.nick}</Text>
                </View>
            </View>

            <View style={styles.description}>
                <Text style={styles.descriptionText}>{details.description}</Text>
            </View>
        </View>
    )
}

export default QuestDetailInfo
