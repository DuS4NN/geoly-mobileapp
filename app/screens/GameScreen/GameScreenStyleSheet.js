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
    backArrow: {
        height: 20,
        width: 20,
        marginLeft: 20,
        marginTop: 10,
        alignSelf: "flex-start"
    },



    gameContent: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
    }


})
