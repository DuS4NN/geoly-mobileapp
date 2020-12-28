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
        paddingBottom: 30
    },

    content: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
    },

    formContainer: {
        marginBottom: 30,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        width: "85%",
        alignSelf: "center",
    },
    formTitle: {
        marginLeft: "7%",
        fontFamily: "OpenSans",
        fontSize: 18,
        color: colors.darkGreen,
        fontWeight: "bold",
        textTransform: "uppercase"

    },

    formItem: {
    },
    formLabel: {
        marginLeft: "7%",
        alignSelf: "flex-start",
        fontFamily: "OpenSans",
        fontSize: 12,
        color: colors.gray,
        marginTop: 10,
        marginBottom: 10
    },
    formInput: {
        alignSelf: "center",
        width: "86%",
        height: 45,
        borderWidth: 1,
        borderColor: colors.backgroundGray,
        backgroundColor: colors.backgroundGray,
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: "OpenSans"
    },
    toggle: {
        marginLeft: "7%",
         transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
        alignSelf: "flex-start",
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

    button: {
        marginTop: 40,
        height: 40,
        width: 150,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 50,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: "OpenSans",
        color: colors.white,
        fontSize: 15,
        alignSelf: "center",
    },

    stageContainer: {
        marginTop: 5,
        width: "90%",
        alignSelf: "center",
        padding: 10,
        borderColor: colors.lightGray,
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 15
    },

    deleteButtonContainer: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
        paddingRight: 10,
        width: 50
    },
    deleteButtonText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 17
    },

    map: {
        alignSelf: "center",
        marginTop: 10,
        width: "86%",
        height: 200
    },

    qrCodeText: {
        textAlign: "center",
        padding: 15,
        fontFamily: "OpenSans",
        fontSize: 15,
    },

    answerListItem: {
        width: "80%",
        borderRadius: 30,
        borderColor: colors.lightGray,
        borderWidth: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 10
    },
    answerListItemText: {
        fontFamily: "OpenSans",
        fontSize: 14,
        paddingLeft: 5,
    },
    answerListItemDelete: {
        paddingRight: 5,
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 15
    }
})
