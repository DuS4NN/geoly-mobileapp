import React, {useContext, useState, useEffect} from "react";
import {Text, View, TextInput, Image, Pressable, Alert} from "react-native";
import {UserContext} from "../../../../UserContext";
import {API_SERVER_URL} from "@env";
import axios from "axios";
import handleError from "../../../../ErrorHandler";
import getText from "../../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../../AppColors";
import mainStyles from "../../../../AppStyleSheet";
import {Snackbar} from "react-native-paper";
import FinishScreen from "./FinishScreen";

function AnswerQuestionScreen(props) {

    const {finishScreen, setFinishScreen, finishLoading, stage, handleFinishStage} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [answer, setAnswer] = useState("")
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [answerList, setAnswerList] = useState([]);
    const [adviseUsed, setAdviseUsed] = useState(false)

    const [textSnack, setTextSnack] = useState("")
    const [showSnack, setShowSnack] = useState(false)
    const [typeSnack, setTypeSnack] = useState("ERROR")

    const [adviseLoading, setAdviseLoading] = useState(false)
    const [answerLoading, setAnswerLoading] = useState(false)

    useEffect(() => {
        if(stage.answerList === null) return

        let list = stage.answerList.split(";")
        list.push(stage.answer)
        setAnswerList(shuffleArray(list))
    }, [])

    const shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const onChangeText = (newAnswer) => {
        setAnswer(newAnswer)
    }

    const handleGetAdvise = () => {
        if(adviseUsed === true || stage.questType === "PARTY"){
            Alert.alert(text.gameScreen.adviseAlert, stage.advise)
            return
        }
        setAdviseLoading(true)
        axios({
            method: "GET",
            url: API_SERVER_URL+"/getAdvise?stageId="+stage.stageId,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "ACCEPTED"){
                setAdviseUsed(true)
                Alert.alert(text.gameScreen.adviseAlert, stage.advise)
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
            setAdviseLoading(false)
        })
    }

    const handleSubmitAnswer = () => {
        let finalAnswer = ""
        if(answer === "" && selectedAnswer === "") return

        if(stage.answerList === null || stage.answerList === ""){
            finalAnswer = answer.toLowerCase()
        }else{
            finalAnswer = selectedAnswer.toLowerCase()
        }

        if(finalAnswer === stage.answer.toLowerCase()){
            setFinishScreen(true)
            return
        }

        if(stage.questType === "PARTY"){
            setAnswer("")
            setSelectedAnswer("")

            setTextSnack(text.gameScreen.wrongAnswer)
            setShowSnack(true)
            setTypeSnack("ERROR")
            return
        }

        setAnswerLoading(true)
        axios({
            method: "GET",
            url: API_SERVER_URL+"/addWrongAnswer?stageId="+stage.stageId,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === "ACCEPTED"){
                setAnswer("")
                setSelectedAnswer("")

                setTextSnack(text.gameScreen.wrongAnswer)
                setShowSnack(true)
                setTypeSnack("ERROR")
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
            setAnswerLoading(false)
        })
    }


    return (
        <View style={{flex: 1}}>

            {finishScreen === true ? (
                <FinishScreen finishLoading={finishLoading} note={stage.note} handleFinishStage={handleFinishStage}/>
            ) : (
                <View style={{flex: 1}}>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{stage.question}</Text>

                        {(stage.answerList === null || stage.answerList === "") ? (
                            <View>
                                <TextInput style={styles.questionInput} placeholder={text.gameScreen.answerPlaceholder} value={answer} onChangeText={answer => onChangeText(answer)} />
                            </View>
                        ) : (
                            <View>
                                {answerList.map(answer => (
                                    <Pressable onPress={() => setSelectedAnswer(answer)} key={answer} style={styles.answerListContainer}>
                                        <Text style={selectedAnswer === answer ? [styles.answerListItem, styles.answerListItemSelected] : styles.answerListItem}>{answer}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                        {stage.advise !== null && (
                            <Pressable style={styles.questionAdviseContainer} onPress={handleGetAdvise}>
                                <Text style={styles.questionAdvise}>{text.gameScreen.advise}</Text>
                                {adviseLoading === true && (
                                    <Image style={styles.questionAdviseLoading} source={require("../../../assets/images/loading.gif")} />
                                )}
                            </Pressable>
                        )}

                        <Pressable onPress={handleSubmitAnswer}>
                            <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                {answerLoading === true && (
                                    <Image style={mainStyles.buttonLoadingAnimationImage} source={require("../../../assets/images/loading.gif")} />
                                )}
                                <Text style={styles.buttonText}>{text.gameScreen.submit}</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <Snackbar style={typeSnack === "ERROR" ? mainStyles.snackBarError : mainStyles.snackBarSuccess} visible={showSnack} onDismiss={() => setShowSnack(false)} duration={2000}>{textSnack}</Snackbar>

                </View>
            )}

        </View>
    )
}

export default AnswerQuestionScreen
