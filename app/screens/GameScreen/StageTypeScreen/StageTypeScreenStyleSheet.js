import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    /*
    ----- MAP SCREEN -----
     */
    map: {
        flex: 1,
        width: "100%"
    },

    /*
    ----- LOADING -----
     */
    loading: {
        flex: 4,
        alignItems: "center",
        backgroundColor: colors.lightBackgroundGray
    },
    loadingImage: {
        height: "20%",
        resizeMode: "contain"
    },
})
