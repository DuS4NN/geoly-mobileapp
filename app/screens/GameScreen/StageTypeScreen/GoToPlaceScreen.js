import React, {useContext, useState, useEffect} from "react";
import {Text, View, Image, Pressable} from "react-native";
import {UserContext} from "../../../../UserContext";
import {API_SERVER_URL, GOOGLE_API_KEY} from "@env";
import axios from "axios";

import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import MapViewNavigation, { NavigationModes, TravelModeBox, TravelIcons, Geocoder, TravelModes, DirectionsListView, ManeuverView, DurationDistanceView } from 'react-native-maps-navigation';


import handleError from "../../../../ErrorHandler";
import getText from "../../../assets/text/Text";
import styles from "./StageTypeScreenStyleSheet";
import {LinearGradient} from "expo-linear-gradient";
import colors from "../../../../AppColors";
import GPS from "../../../components/GPS"
import GpsActivationScreen from "../../GpsActivationScreen/GpsActivationScreen";
import getMapTheme from "../../../assets/mapStyles/MapTheme";

function GoToPlaceScreen(props) {

    const {stage, setStageList} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])
    const mapTheme = getMapTheme(userContext["mapTheme"])

    const [coordinates, setCoordinates] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPosition()
    }, [])

    const getPosition = () => {
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
    }

    return (
        <View style={styles.background}>
            {loading === false ? (
                <View style={{flex:1, width: "100%"}}>
                    {coordinates !== null ? (
                        <MapView
                            style={styles.map}
                            customMapStyle={mapTheme}>
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
