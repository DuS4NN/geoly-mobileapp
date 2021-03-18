import React, {useContext, useState, useEffect} from "react";
import {Text, View, TextInput, TouchableOpacity, TouchableHighlight, Platform, Image} from "react-native";
import {UserContext} from "../../../../UserContext";
import colors from "../../../../AppColors"
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import mainStyles from "../../../../AppStyleSheet";

function StageAnswerQuestion (props) {

    const {stage, stages, setStages, showSnackBar} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [answerList, setAnswerList] = useState([])
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [advise, setAdvise] = useState("")
    const [note, setNote] = useState("")

    const [addAnswerValue, setAddAnswerValue] = useState("")


    const handleDeleteAnswer = (deleteAnswer) => {
        setAnswerList(answerList.filter(function (a) {
            return a !== deleteAnswer
        }))
    }

    const handleAddAnswer = () => {
        if(addAnswerValue.includes(";")){
            showSnackBar(text.error.ANSWER_SYMBOL, "ERROR")
            return
        }
        if(addAnswerValue.replace(/ /g, "").length === 0){
            return
        }
        if(addAnswerValue.length > 100){
            showSnackBar(text.error.ANSWER_LENGTH, "ERROR")
            return
        }
        if(answerList.length >= 5){
            showSnackBar(text.error.INVALID_ANSWER_COUNT, "ERROR")
            setAddAnswerValue("")
            return
        }

        if(answerList.find(function (answer) {
            return answer === addAnswerValue
        })){
            showSnackBar(text.error.ANSWER_ALREADY_EXISTS, "ERROR")
            setAddAnswerValue("")
            return
        }

        setAnswerList([...answerList, addAnswerValue])
        setAddAnswerValue("")
    }

    const handleDeleteStage = () => {
        if(stage.id === 0) return
        setStages(stages.filter((s:any) => {
            return s.id !== stage.id
        }))
    }

    useEffect(() => {
        let newStages = []

        stages.map((s:any) => {
            if(s.id !== stage.id){
                newStages.push(s)
            }else{
                newStages.push({
                    ...stage,
                    question: question,
                    advise: advise,
                    answer: answer,
                    note: note,
                    answerList: answerList
                })
            }
        })
        setStages(newStages)

    }, [note, advise, answer, question, answerList])


    return (
        <View style={styles.stageContainer}>
            <TouchableHighlight underlayColor={colors.highlightWhite} onPress={handleDeleteStage} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButtonText}>X</Text>
            </TouchableHighlight>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.question}</Text>
                <TextInput maxLength={200} placeholder={text.creator.question} style={styles.formInput} value={question} onChangeText={text => setQuestion(text)} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.answer}</Text>
                <TextInput value={answer} onChangeText={text => setAnswer(text)} maxLength={200} placeholder={text.creator.answer} style={styles.formInput} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.advise}</Text>
                <TextInput maxLength={200} placeholder={text.creator.advise} style={styles.formInput} value={advise} onChangeText={text => setAdvise(text)} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.note}</Text>
                <TextInput maxLength={200} placeholder={text.creator.note} style={styles.formInput} value={note} onChangeText={text => setNote(text)} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.answers}</Text>

                <View style={styles.answerListItem}>
                    <Text style={styles.answerListItemText}>{answer}</Text>
                </View>

                {answerList.map(a => (
                    <View style={styles.answerListItem} key={a}>
                        <Text style={styles.answerListItemText}>{a}</Text>
                        <TouchableHighlight style={styles.answerListItemDeleteContainer} underlayColor={colors.highlightWhite} onPress={() => handleDeleteAnswer(a)}>
                            <Text style={styles.answerListItemDeleteText}>X</Text>
                        </TouchableHighlight>
                    </View>
                ))}

                <View>
                    <TextInput maxLength={100} style={styles.formInput} onChangeText={text => setAddAnswerValue(text)} value={addAnswerValue} placeholder={text.creator.addAnswer} />

                    <TouchableOpacity activeOpacity={.8} onPress={handleAddAnswer}>
                        {Platform.OS === "ios" ? (
                            <View style={{...styles.button, backgroundColor: colors.lightGreen}}>
                                <Text style={styles.buttonText}>{text.creator.addAnswer}</Text>
                            </View>
                        ) : (
                            <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                                <Text style={styles.buttonText}>{text.creator.addAnswer}</Text>
                            </LinearGradient>
                        )}
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default StageAnswerQuestion
