import {Platform, StatusBar, StyleSheet} from "react-native";
import colors from "./AppColors";

export default StyleSheet.create({
    mainSafeAreaView: {
        flex: 1,
        backgroundColor: Platform.OS === "android" ? colors.backgroundGreen : colors.white,
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
