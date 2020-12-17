import React, {useContext, useState, useEffect, useRef, useCallback} from "react";
import {Text, View, Image, Pressable} from "react-native";
import {UserContext} from "../../../../UserContext";
import {API_SERVER_URL, GOOGLE_API_KEY} from "@env";
import axios from "axios";
import * as Location from "expo-location";
import MapView, {Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

import handleError from "../../../../ErrorHandler";
import getText from "../../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import colors from "../../../../AppColors";
import GPS from "../../../components/GPS"
import GpsActivationScreen from "../../GpsActivationScreen/GpsActivationScreen";
import getMapTheme from "../../../assets/mapStyles/MapTheme";

function GoToPlaceScreen(props) {

    const {stageList, setStageList} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])
    const mapTheme = getMapTheme(userContext["mapTheme"])
    const strokeColor = [colors.lightGreen, colors.black, colors.lightGray, colors.black, colors.black]
    const stage = stageList[0]

    const mapRef = useRef(null)

    const [coordinates, setCoordinates] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosition()
    }, [])

    const getPosition = async () => {
        setLoading(true)
        GPS().then(response => {
            if(response !== null){
                setCoordinates(response)
                setLoading(false)
                return response
            }else{
                setCoordinates(null)
                setLoading(false)
                return null
            }
        })

        await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.Balanced, distanceInterval: 1 },
            loc => {
                positionChangeHandler(loc.coords.latitude, loc.coords.longitude)
                setCoordinates({latitude: loc.coords.latitude, longitude: loc.coords.longitude})
            })
    }

    const positionChangeHandler = (latitude, longitude) => {

    }

    const onMapReadyHandler = useCallback(() => {
        mapRef?.current?.fitToCoordinates([coordinates, {latitude: stage.latitude, longitude: stage.longitude}], {
            animated: true,
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            }
        })
    }, [mapRef, coordinates])

    return (
        <View style={styles.background}>
            {loading === false ? (
                <View style={{flex:1, width: "100%"}}>
                    {coordinates !== null ? (
                        <MapView
                            style={styles.map}
                            customMapStyle={mapTheme}
                            ref={mapRef}
                            onMapReady={onMapReadyHandler}
                            initialRegion={{
                                latitude: coordinates.latitude,
                                longitude: coordinates.longitude,
                                latitudeDelta: 0.1922,
                                longitudeDelta: 0.1421,
                            }}>

                            <Marker coordinate={coordinates} identifier={"location"} title={text.gameScreen.location}>
                                <Image
                                    source={require("../../../assets/mapIcons/location.png")}
                                    style={{width: 40, height: 40}}
                                />
                            </Marker>

                            <Marker coordinate={{latitude: stage.latitude, longitude: stage.longitude}} identifier={"destination"} title={text.gameScreen.destination}>
                                <Image
                                    source={require("../../../assets/mapIcons/destination.png")}
                                    style={{width: 40, height: 40}}
                                />
                            </Marker>


                            <MapViewDirections
                                origin={coordinates}
                                destination={{latitude: stage.latitude, longitude: stage.longitude}}
                                apikey={GOOGLE_API_KEY}
                                mode={"DRIVING"}
                                strokeColor={strokeColor[userContext["mapTheme"]-1]}
                                strokeWidth={3}
                            />


                        </MapView>
                    ) : (
                        <GpsActivationScreen setCoordinates={setCoordinates}/>
                    )}
                </View>
            ) : (
                <View style={styles.loading}>
                    <Image style={styles.loadingImage} source={require("../../../assets/images/loading.gif")} />
                </View>
            )}
        </View>
    )
}

export default GoToPlaceScreen
