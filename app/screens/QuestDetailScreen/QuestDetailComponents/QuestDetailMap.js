import React, {useContext, useState, useEffect, useRef, useCallback} from "react";
import {View, Image} from "react-native";
import {UserContext} from "../../../../UserContext";
import styles from "../QuestDetailScreenStyleSheet";
import MapView, {Marker, Polyline} from "react-native-maps";
import getMapTheme from "../../../assets/mapStyles/MapTheme";
import colors from "../../../../AppColors";

function QuestDetailMap(props) {

    const {stages} = props

    const {userContext} = useContext(UserContext)
    const mapTheme = getMapTheme(userContext["mapTheme"])

    const strokeColor = [colors.lightGreen, colors.black, colors.lightGray, colors.black, colors.black]

    const [markers] = useState([])
    const [lines] = useState([])

    const [loadingMarkers, setLoadingMarkers] = useState(true)
    const [endCoordinates, setEndCoordinates] = useState(null)

    const mapRef = useRef(null)

    useEffect(() => {
        createMarkers()
        setLoadingMarkers(false)
    }, [])

    const createMarkers = () => {
        for(let i=0; i<stages.length; i++){

            let type= stages[i].type

            if(i<stages.length-1){
                let nextType = stages[i+1].type

                if(type === "GO_TO_PLACE" && nextType !== "GO_TO_PLACE"){
                    createMarker(require("../../../assets/stageTypeImages/GO_AND_INTERACT.png"), i)
                }else if(type === "GO_TO_PLACE"){
                    createMarker(require("../../../assets/stageTypeImages/GO_TO_PLACE.png"), i)
                }

            }else{
                if(type === "GO_TO_PLACE"){
                    createMarker(require("../../../assets/stageTypeImages/GO_TO_PLACE.png"), i)
                }
            }
        }
    }
    const createMarker = (icon, i) => {
        let newMarker = {
            id: "marker-"+i,
            coordinate: {latitude: stages[i].latitude, longitude: stages[i].longitude},
            image: icon,
            style: {width: 40, height: 40}
        }

        lines.push({latitude: stages[i].latitude, longitude: stages[i].longitude})

        setEndCoordinates({latitude: stages[i].latitude, longitude: stages[i].longitude})
        markers.push(newMarker)
    }

    const onMapReadyHandler = useCallback(() => {
        mapRef?.current?.fitToCoordinates([{latitude: stages[0].latitude, longitude: stages[0].longitude}, endCoordinates], {
            animated: true,
            edgePadding: {
                top: 200,
                right: 50,
                bottom: 100,
                left: 50
            }
        })

    }, [mapRef, endCoordinates])

    return (
        <View style={styles.mapContainer}>
            {loadingMarkers === false && (
                <MapView
                    style={styles.map}
                    customMapStyle={mapTheme}
                    ref={mapRef}
                    onMapReady={onMapReadyHandler}
                    initialRegion={{
                        latitude: stages[0].latitude,
                        longitude: stages[0].longitude,
                        latitudeDelta: 0.1922,
                        longitudeDelta: 0.1421,
                    }}>

                    {markers.map(marker => (
                        <Marker key={marker.id} coordinate={marker.coordinate}>
                            <Image
                                source={marker.image}
                                style={marker.style}/>
                        </Marker>
                    ))}

                    <Polyline
                        coordinates={lines}
                        strokeColor={strokeColor[userContext["mapTheme"]-1]}
                        strokeWidth={3}/>

                </MapView>
            )}
        </View>
    )
}

export default QuestDetailMap
