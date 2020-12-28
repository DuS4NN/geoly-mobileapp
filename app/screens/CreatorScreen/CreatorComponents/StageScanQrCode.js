import React, {useContext, useEffect, useRef} from "react";
import {Text, View, TextInput,  Pressable} from "react-native";
import {UserContext} from "../../../../UserContext";
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";

function StageScanQrCode (props) {

    const {stage, stages, setStages} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const noteRef = useRef(null)

    useEffect(() => {
        if(noteRef !== null){
            let newStages = []

            stages.map((s:any) => {
                if(s.id !== stage.id){
                    newStages.push(s)
                }else{
                    newStages.push({
                        ...stage,
                        note: noteRef
                    })
                }
            })
            setStages(newStages)
        }
    }, [noteRef])

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
                <Text style={styles.formLabel}>{text.creator.note}</Text>
                <TextInput maxLength={200} placeholder={text.creator.note} style={styles.formInput} ref={noteRef} />
            </View>

            <Text style={styles.qrCodeText}>{text.creator.qrCode}</Text>
        </View>
    )
}

export default StageScanQrCode
