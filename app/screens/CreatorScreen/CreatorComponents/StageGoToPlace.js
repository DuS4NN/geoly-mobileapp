import React, {useContext, useEffect, useRef} from "react";
import {Text, View, TextInput, Image, Pressable} from "react-native";
import {UserContext} from "../../../../UserContext";
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";
import MapView, {Marker} from "react-native-maps";
import getMapTheme from "../../../assets/mapStyles/MapTheme";

function StageGoToPlace (props) {

    const {stage, stages, setStages} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])
    const mapTheme = getMapTheme(userContext["mapTheme"])

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
            {stage.id !== 0 && (
                <Pressable onPress={handleDeleteStage} style={styles.deleteButtonContainer}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </Pressable>
            )}
            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.note}</Text>
                <TextInput maxLength={200} placeholder={text.creator.note} style={styles.formInput} ref={noteRef} />
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
