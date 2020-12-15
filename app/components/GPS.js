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
            let location = await Location.getCurrentPositionAsync({});
            return location.coords.latitude+","+location.coords.longitude
        }catch (e) {
            return null
        }
    }else{
        return null
    }
}
