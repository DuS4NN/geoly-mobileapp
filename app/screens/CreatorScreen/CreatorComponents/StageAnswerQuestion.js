import React, {useContext, useState, useEffect, useRef} from "react";
import {Text, View, TextInput, Pressable} from "react-native";
import {UserContext} from "../../../../UserContext";
import colors from "../../../../AppColors"
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";

function StageAnswerQuestion (props) {

    const {stage, stages, setStages, showSnackBar} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const [answerList, setAnswerList] = useState([])
    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const adviseRef = useRef(null)
    const noteRef = useRef(null)

    const [addReviewValue, setAddReviewValue] = useState("")
    const [correctValue, setCorrectValue] = useState("")

    const handleDeleteAnswer = (deleteAnswer) => {
        setAnswerList(answerList.filter(function (answer) {
            return answer !== deleteAnswer
        }))
    }

    const handleAddAnswer = () => {
        if(addReviewValue.includes(";")){
            showSnackBar(text.error.ANSWER_SYMBOL, "ERROR")
            return
        }
        if(addReviewValue.length === 0){
            return
        }
        if(addReviewValue.length > 100){
            showSnackBar(text.error.ANSWER_LENGTH, "ERROR")
            return
        }
        if(answerList.length >= 5){
            showSnackBar(text.error.INVALID_ANSWER_COUNT, "ERROR")
            setAddReviewValue("")
            return
        }

        if(answerList.find(function (answer) {
            return answer === addReviewValue
        })){
            showSnackBar(text.error.ANSWER_ALREADY_EXISTS, "ERROR")
            setAddReviewValue("")
            return
        }

        setAnswerList([...answerList, addReviewValue])
        setAddReviewValue("")
    }

    const handleChangeCorrectAnswer = (value) => {
        setCorrectValue(value)
    }
    const handleAddReviewValueChange = (value) => {
        setAddReviewValue(value)
    }

    useEffect(() => {
        if(noteRef !== null && adviseRef !== null && answerRef !== null && questionRef !== null){
            let newStages = []

            stages.map((s:any) => {
                if(s.id !== stage.id){
                    newStages.push(s)
                }else{
                    newStages.push({
                        ...stage,
                        question: questionRef,
                        advise: adviseRef,
                        answer: answerRef,
                        note: noteRef,
                        answerList: answerList
                    })
                }
            })
            setStages(newStages)
        }
    }, [noteRef, adviseRef, answerRef, questionRef, answerList])


    const handleDeleteStage = () => {
        if(stage.id === 0) return
        setStages(stages.filter((s:any) => {
            return s.id !== stage.id
        }))
    }
    return (
        <View style={styles.stageContainer}>
            <Pressable onPress={handleDeleteStage} style={styles.deleteButtonContainer}>
                <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.question}</Text>
                <TextInput maxLength={200} placeholder={text.creator.question} style={styles.formInput} ref={questionRef} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.answer}</Text>
                <TextInput value={correctValue} onChangeText={text => handleChangeCorrectAnswer(text)} maxLength={200} placeholder={text.creator.answer} style={styles.formInput} ref={answerRef} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.advise}</Text>
                <TextInput maxLength={200} placeholder={text.creator.advise} style={styles.formInput} ref={adviseRef} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.note}</Text>
                <TextInput maxLength={200} placeholder={text.creator.note} style={styles.formInput} ref={noteRef} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.answers}</Text>

                <View style={styles.answerListItem}>
                    <Text style={styles.answerListItemText}>{correctValue}</Text>
                </View>

                {answerList.map(answer => (
                    <View style={styles.answerListItem} key={answer}>
                        <Text style={styles.answerListItemText}>{answer}</Text>
                        <Pressable onPress={() => handleDeleteAnswer(answer)}>
                            <Text style={styles.answerListItemDelete}>X</Text>
                        </Pressable>
                    </View>
                ))}

                <View>
                    <TextInput maxLength={100} style={styles.formInput} onChangeText={text => handleAddReviewValueChange(text)} value={addReviewValue} placeholder={text.creator.addAnswer} />

                    <Pressable onPress={handleAddAnswer}>
                        <LinearGradient style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[colors.lightGreen, colors.darkerGreen]}>
                            <Text style={styles.buttonText}>{text.creator.addAnswer}</Text>
                        </LinearGradient>
                    </Pressable>

                </View>
            </View>
        </View>
    )
}

export default StageAnswerQuestion
