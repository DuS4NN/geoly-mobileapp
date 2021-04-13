import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.lightBackgroundGray
    },

    gameHeaderContainer: {
        flex: 1,
        backgroundColor:  colors.backgroundGreen,
        height: "70%"
    },
    headerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },

    headerText: {
        paddingLeft: 15,
        paddingRight: 15,

        textAlign: "center",

        fontFamily: "MarkProBold",
        textTransform: "uppercase",
        fontSize: 22,
        color: colors.darkGreen
    },
    headerPartyText: {
        paddingTop: 10,
        fontFamily: "OpenSansLight",
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.gray,
        fontSize: 13,
    },
    backArrowContainer: {
        justifyContent: "center",
        width: 40,
        marginLeft: 10,
        borderRadius: 30,
        height: 40
    },
    backArrow: {
        height: 20,
        width: 20,
        alignSelf: "center"
    },



    gameContent: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
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

    leftStagesContainer: {
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: colors.backgroundGreen,
    },
    leftStagesText: {
        fontSize: 13,
        fontFamily: "OpenSansLight",
        textAlign: "center",
        color: colors.gray
    }


})
