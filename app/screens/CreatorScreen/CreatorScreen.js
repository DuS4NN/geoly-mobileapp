import React, {useContext, useState, useEffect, useRef} from "react";
import {Text, View, Image, Dimensions, ScrollView, Pressable} from "react-native";
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
import {API} from "react-native-web/dist/vendor/react-native/Animated/NativeAnimatedHelper";

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

    const nameRef = useRef(null)
    const descriptionRef = useRef(null)

    useEffect(() => {
        setDetails({
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

        let finalStages = []

        console.log(nameRef)

        /*stages.map(s => {

            finalStages.push({
                type: s.type,
                answer: s.answer === null ? null : s.answer.current?.value,
                question: s.question === null ? null : s.question.current?.value,
                advise: s.advise === null ? null : s.advise.current?.value === '' ? null : s.advise.current?.value,
                answersList: s.answerList === null ? null : s.answerList.length === 0 ? null : s.answerList.join(";"),
                latitude: s.latitude,
                longitude: s.longitude,
                qrCodeUrl: null,
                note: s.note === null ? null : s.note.current?.value === '' ? null : s.note.current?.value
            })
        })

        axios({
            method: "POST",
            url: API_SERVER_URL+"/addQuest",
            withCredentials: true,
            data: {
                name: nameRef.current?.value,
                description: descriptionRef.current?.value,
                categoryId: details.category,
                difficulty: details.difficulty,
                active: details.active,
                premium: details.premium,
                privateQuest: details.private,
                stages: finalStages
            }
        })*/

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
                                <CreatorForm categories={categories} details={details} setDetails={setDetails} nameRef={nameRef} descriptionRef={descriptionRef} />
                                <CreatorStages stages={stages} setStages={setStages} showSnackBar={showSnackBar} addStage={addStage} addStageLoading={addStageLoading} setAddStageLoading={setAddStageLoading}/>

                                <Pressable onPress={handleAddQuest}>
                                    <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                        {addQuestLoading === true && (
                                            <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../assets/images/loading.gif")} />
                                        )}
                                        <Text style={styles.buttonText}>{text.creator.addQuest}</Text>
                                    </LinearGradient>
                                </Pressable>

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
