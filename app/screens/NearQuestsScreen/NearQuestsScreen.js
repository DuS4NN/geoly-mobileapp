import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Dimensions} from "react-native";
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./NearQuestsScreenStyleSheet";
import GPS from "../../components/GPS";
import {Snackbar} from "react-native-paper";
import mainStyles from "../../../AppStyleSheet";
import NearQuestsList from "./NearQuestsList";
import QuestDetailScreen from "../QuestDetailScreen/QuestDetailScreen";

function NearQuestsScreen() {

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [loading, setLoading] = useState(true)
    const [quests, setQuests] = useState([])

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const [page, setPage] = useState(1)
    const [stopLoading, setStopLoading] = useState(false)
    const [coordinates, setCoordinates] = useState(null)
    const [loadingNew, setLoadingNew] = useState(false)
    const [selectedQuest, setSelectedQuest] = useState(null)

    useEffect(() => {
        loadData(1)
    }, [])

    const loadData = (pageNumber) => {
        if(stopLoading) return

        if(pageNumber === 1){
            setLoading(true)
            GPS().then(response => {
                if(response !== null){
                    getData(response, pageNumber)
                    setCoordinates(response)
                    return response
                }else{
                    setLoading(false)
                    return null
                }
            })
        }else{
            setLoadingNew(true)
            getData(coordinates, pageNumber)
        }
    }

    const getData = (response, pageNumber) => {

        axios({
            method: "GET",
            url: API_SERVER_URL+"/getNearQuests?coordinates="+response.latitude+","+response.longitude+"&page="+pageNumber,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "OK"){

                let newQuests = response.data.data.map((quest => {
                    return {
                        id: quest[0],
                        name: quest[1],
                        categoryId: quest[2],
                        distance: quest[3]
                    }
                }))

                if(newQuests.length === 0 || newQuests.length<10) setStopLoading(true)
                setQuests(quests.concat(newQuests))

            }else{
                setTextSnack(text.error.somethingWentWrong)
                setShowSnack(true)
                setTypeSnack("ERROR")
            }
        }).catch(function (error) {
            handleError(error)
            setTextSnack(text.error.somethingWentWrong)
            setShowSnack(true)
            setTypeSnack("ERROR")
        }).finally(function () {
            setLoading(false)
            setLoadingNew(false)
        })
    }

    const goBack = () => {
        setSelectedQuest(null)
    }

    return (
        <View style={styles.background}>
            {selectedQuest === null ? (
                <View style={{flex:1}}>
                    <View style={styles.header}>
                        <Text style={styles.headerText} >{text.nearScreen.near}</Text>
                        <Image style={styles.headerImage} source={require("../../assets/images/near.png")} />
                    </View>
                    <View style={{...styles.division, borderRightWidth: Dimensions.get("window").width, borderTopWidth: Dimensions.get("window").width/20}} />

                    {loading === true ? (
                        <View style={styles.loading}>
                            <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                        </View>
                    ) : (
                        <View style={styles.content}>
                            <NearQuestsList questList={quests} page={page} setPage={setPage} loadData={loadData} loadingNew={loadingNew} stopLoading={stopLoading} setSelectedQuest={setSelectedQuest} />
                        </View>
                    )}

                    <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
                </View>
            ) : (
                <QuestDetailScreen goBack={goBack} quest={selectedQuest} />
            )}
        </View>
    )
}

export default NearQuestsScreen
