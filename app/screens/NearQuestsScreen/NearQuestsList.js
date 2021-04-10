import React, {useContext} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import styles from "./NearQuestsListStyleSheet";
import {UserContext} from "../../../UserContext";
import getText from "../../assets/text/Text";
import NearQuestsItem from "./NearQuestsItem";
import { debounce } from "lodash";

function NearQuestsList(props) {

    const {questList, page, setPage, loadData, loadingNew, stopLoading, setSelectedQuest} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])


    const handleScroll = debounce(({layoutMeasurement, contentOffset, contentSize}) => {
        if(stopLoading) return
        const paddingToBottom = 20;
        if(layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom){
            loadData(page+1)
            setPage(page+1)
        }
    }, 100)

    return (
        <View style={{flex:1}}>

            {questList.length === 0 ? (
                <View style={styles.noDataContainer}>
                    <Image style={styles.noDataImage} source={require("../../assets/images/noData.png")} />
                    <Text style={styles.noDataText}>{text.nearScreen.noNearQuest}</Text>
                </View>
            ) : (
                <View style={{flex:1}}>
                    <View style={styles.offset}>

                    </View>

                    <ScrollView style={{flex:1}} onScroll={({nativeEvent}) => handleScroll(nativeEvent)}>
                        <View style={styles.background}>
                            {questList.map((quest => (
                                <NearQuestsItem quest={quest} key={quest.id} setSelectedQuest={setSelectedQuest} />
                            )))}
                            {loadingNew === true && (
                                <View style={styles.loadingData}>
                                    <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    )
}

export default NearQuestsList
