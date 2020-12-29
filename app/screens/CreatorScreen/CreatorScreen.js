import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Dimensions, ScrollView, TouchableOpacity} from "react-native";
import {Snackbar} from "react-native-paper"
import {UserContext} from "../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../ErrorHandler";
import getText from "../../assets/text/Text";
import styles from "./CreatorScreenStyleSheet";
import mainStyles from "../../../AppStyleSheet.js"
import CreatorForm from "./CreatorComponents/CreatorForm";
import CreatorStages from "./CreatorComponents/CreatorStages";
import GPS from "../../components/GPS";
import GpsActivationScreen from "../GpsActivationScreen/GpsActivationScreen";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../AppColors";

function CreatorScreen () {

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [categories, setCategories] = useState([])
    const [details, setDetails] = useState({})
    const [stages, setStages] = useState([])
    const [gpsEnable, setGpsEnable] = useState(true)
    const [loading, setLoading] = useState(true)
    const [addQuestLoading, setAddQuestLoading] = useState(false)
    const [addStageLoading, setAddStageLoading] = useState(false)
    const [id, setId] = useState(0)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")


    useEffect(() => {
        setDetails({
            name: "",
            description: "",
            category: 1,
            difficulty: 1,
            active: true,
            premium: false,
            private: false
        })
        setFirstStage()
        axios({
            method: "GET",
            url: API_SERVER_URL+"/categories"
        }).then(function (response) {
            setCategories(response.data.map(category => {
                return {
                    value: category.id,
                    label: category.name
                }
            }))
        }).catch(function (error) {
            handleError(error)
            showSnackBar(text.error.somethingWentWrong, "ERROR")
        })
    }, [])

    const showSnackBar = (text, type) => {
        setTextSnack(text)
        setTypeSnack(type)
        setShowSnack(true)
    }

    const setFirstStage = () => {
        GPS().then(response => {
            if(response !== null){
                addStage(response, "GO_TO_PLACE")
            }else{
                setGpsEnable(false)
                setLoading(false)
                return null
            }
        })
    }
    const addStage = (coordinates, type) => {
        setGpsEnable(true)
        setStages([
            ...stages,
            {
                id: id,
                type: type,
                answer: null,
                question: null,
                advise:null,
                answerList:null,
                latitude:  type === "GO_TO_PLACE" ? coordinates.latitude : null,
                longitude: type === "GO_TO_PLACE" ? coordinates.longitude : null,
                qrCodeUrl: null,
                note: null
            }
        ])
        setId(id+1)
        setLoading(false)
        setAddStageLoading(false)
    }

    const handleAddQuest = () => {
        setAddQuestLoading(true)

        if(details.name.replace(/ /g, "").length === 0 || details.name.length > 50){
            showSnackBar(text.error.INVALID_NAME_LENGTH_SIZE,"ERROR")
            return
        }

        if(details.description.replace(/ /g, "").length === 0 || details.description.length > 500){
            showSnackBar(text.error.INVALID_DESCRIPTION,"ERROR")
            return
        }

        let finalStages = []


        stages.map(s => {

            if(s.type === "GO_TO_PLACE" && (s.latitude === null || s.longitude === null)){
                showSnackBar(text.error.INVALID_COORDINATES,"ERROR")
                return
            }

            if(s.type === "ANSWER_QUESTION"){
                if(s.question.replace(/ /g, "").length === 0 || s.question.length > 200){
                    showSnackBar(text.error.INVALID_QUESTION,"ERROR")
                    return
                }
                if(s.answer.replace(/ /g, "").length === 0 || s.answer.length > 200){
                    showSnackBar(text.error.INVALID_ANSWER,"ERROR")
                    return
                }
            }

            finalStages.push({
                type: s.type,
                answer: s.answer,
                question: s.question,
                advise: s.advise === null ? null : s.advise.replace(/ /g, "").length === 0 ? null : s.advise,
                answersList: s.answerList === null ? null : s.answerList.length === 0 ? null : s.answerList.join(";"),
                latitude: s.latitude,
                longitude: s.longitude,
                qrCodeUrl: null,
                note: s.note === null ? null : s.note.replace(/ /g, "").length === 0 ? null : s.note,
            })

        })

        axios({
            method: "POST",
            url: API_SERVER_URL+"/addQuest",
            withCredentials: true,
            data: {
                name: details.name,
                description: details.description,
                categoryId: details.category,
                difficulty: details.difficulty,
                active: details.active,
                premium: details.premium,
                privateQuest: details.private,
                stages: finalStages
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "ACCEPTED"){
                showSnackBar(text.success.questCreated, "SUCCESS")

                setStages(stages.filter(s => {
                    return s.id === 0
                }))


            }else if(statusCode === "BAD_REQUEST"){
                showSnackBar(text.error[serverResponse], "ERROR")
            }else{
                showSnackBar(text.error.somethingWentWrong, "ERROR")
            }

        }).catch(function (error) {
            handleError(error)
            showSnackBar(text.error.somethingWentWrong, "ERROR")
        })

    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText} >{text.creator.creator}</Text>
                <Image style={styles.headerImage} source={require("../../assets/images/creator.png")} />
            </View>
            <View style={{...styles.division, borderRightWidth: Dimensions.get("window").width, borderTopWidth: Dimensions.get("window").width/20}} />

            <View style={styles.content}>
                {loading === true ? (
                    <View style={styles.loading}>
                        <Image style={styles.loadingImage} source={require("../../assets/images/loading.gif")} />
                    </View>
                ) : (
                    <View style={{flex:1}}>
                        {gpsEnable === true ? (
                            <ScrollView style={{flex:1}}>
                                <CreatorForm categories={categories} details={details} setDetails={setDetails} />
                                <CreatorStages stages={stages} setStages={setStages} showSnackBar={showSnackBar} addStage={addStage} addStageLoading={addStageLoading} setAddStageLoading={setAddStageLoading}/>

                                <View style={styles.formContainer}>
                                    <Text style={styles.formTitle}>{text.creator.addQuest}</Text>
                                    <TouchableOpacity activeOpacity={.8} onPress={handleAddQuest}>
                                        <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                            {addQuestLoading === true && (
                                                <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../assets/images/loading.gif")} />
                                            )}
                                            <Text style={styles.buttonText}>{text.creator.addQuest}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        ) : (
                            <GpsActivationScreen setCoordinates={addStage}/>
                        )}
                    </View>
                )}
            </View>

            <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>
        </View>
    )
}

export default CreatorScreen
