import * as Location from "expo-location";
import {BackHandler} from "react-native";

export default async () => {

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        BackHandler.exitApp()
        return
    }

    let enabled = await Location.hasServicesEnabledAsync()
    if(enabled === true){
        try{
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        }catch (e) {
            return null
        }
    }else{
        return null
    }
}
