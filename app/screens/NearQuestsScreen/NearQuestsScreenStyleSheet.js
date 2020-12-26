import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: colors.backgroundGreen,
        flexDirection: "row",
    },
    headerText: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",

        fontFamily: "MarkProBold",
        textTransform: "uppercase",
        fontSize: 22,
        color: colors.darkGreen
    },
    headerImage: {
        flex: 1,
        height: "100%",
        resizeMode: "contain",
    },
    division: {
        width: 0,
        height: 0,
        backgroundColor: colors.lightBackgroundGray,
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        borderTopColor: colors.backgroundGreen,
    },
    loading: {
        flex: 4,
        alignItems: "center",
        backgroundColor: colors.lightBackgroundGray
    },
    loadingImage: {
        height: "20%",
        resizeMode: "contain"
    },

    content: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
    },
})
