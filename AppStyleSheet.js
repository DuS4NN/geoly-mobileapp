import {Platform, StatusBar, StyleSheet} from "react-native";
import colors from "./AppColors";

export default StyleSheet.create({
    mainSafeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    snackBarError: {
        backgroundColor: colors.snackBarError
    },
    snackBarSuccess: {
        backgroundColor: colors.snackBarSuccess
    },
    buttonLoadingAnimationImage: {
        width: 40,
        height: 40,
    }
})
