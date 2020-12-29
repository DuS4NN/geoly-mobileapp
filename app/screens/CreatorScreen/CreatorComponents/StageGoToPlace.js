import React, {useContext, useEffect, useState} from "react";
import {Text, View, TextInput, Image, TouchableHighlight} from "react-native";
import {UserContext} from "../../../../UserContext";
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";
import MapView, {Marker} from "react-native-maps";
import getMapTheme from "../../../assets/mapStyles/MapTheme";
import colors from "../../../../AppColors";

function StageGoToPlace (props) {

    const {stage, stages, setStages} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])
    const mapTheme = getMapTheme(userContext["mapTheme"])

    const [note, setNote] = useState("")

    useEffect(() => {
        let newStages = []

        stages.map(s => {
            if(s.id !== stage.id){
                newStages.push(s)
            }else{
                newStages.push({
                    ...stage,
                    note: note
                })
            }
        })
        setStages(newStages)
    }, [note])

    const handleDeleteStage = () => {
        if(stage.id === 0) return
        setStages(stages.filter((s:any) => {
            return s.id !== stage.id
        }))
    }

    return (
        <View style={styles.stageContainer}>
            {stage.id !== 0 && (
                <TouchableHighlight underlayColor={colors.highlightWhite} onPress={handleDeleteStage} style={styles.deleteButtonContainer}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableHighlight>
            )}
            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.note}</Text>
                <TextInput maxLength={200} placeholder={text.creator.note} style={styles.formInput} value={note} onChangeText={text => setNote(text)} />
            </View>

            <MapView
                style={styles.map}
                customMapStyle={mapTheme}
                initialRegion={{
                    latitude: stage.latitude,
                    longitude: stage.longitude,
                    latitudeDelta: 0.1922,
                    longitudeDelta: 0.1421,
                }}>
                <Marker coordinate={{latitude: stage.latitude, longitude: stage.longitude}}>
                    <Image
                        source={require("../../../assets/mapIcons/destination.png")}
                        style={{width: 40, height: 40}}/>
                </Marker>
            </MapView>
        </View>
    )
}

export default StageGoToPlace
