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
    ----- QUESTION SCREEN -----
     */
    questionContainer: {
        marginTop: 30,
        marginBottom: 30,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 20,
        backgroundColor: colors.white,
        width: "85%",
        alignSelf: "center",
        alignItems: "center"
    },
    questionText: {
        textAlign: "center",
        fontFamily: "OpenSans",
        fontSize: 17,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 30,
    },
    questionInput: {
        width: 300,
        height: 45,
        borderWidth: 1,
        borderColor: colors.backgroundGray,
        backgroundColor: colors.backgroundGray,
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: "OpenSans",
        fontWeight: "bold"
    },
    questionAdviseContainer: {
        marginTop: 15,
        textAlign: "left",
        width: "85%",
        flexDirection: "row",
    },
    questionAdvise: {
        color: colors.gray,
        fontFamily: "OpenSansLight",
        fontSize: 14,

    },
    questionAdviseLoading: {
        width: 20,
        height: 20
    },
    answerListContainer: {
    },
    answerListItem: {
        width: 200,
        marginTop: 7,
        marginBottom: 7,
        textAlign: "center",
        color: colors.black,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: colors.lightGray,
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20
    },
    answerListItemSelected: {
        backgroundColor: colors.backgroundGreen,
        color: colors.darkGreen,
        borderColor: colors.black
    },

    /*
    ----- QR CODE SCREEN -----
     */



    /*
    ----- FINISH SCREEN -----
     */
    finishedContainer: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
    },
    finishImage: {
        height: "40%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    finishedTitle: {
        fontFamily: "MarkProBold",
        fontSize: 20,
        color: colors.black,
        alignSelf: "center",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
    finishNoteContainer: {
      marginTop: 30
    },
    finishNoteTitle: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 17,
        color: colors.black,
        alignSelf: "center",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
    finishNote: {
        marginTop: 10,
        fontFamily: "OpenSans",
        fontSize: 15,
        color: colors.black,
        alignSelf: "center",
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20
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

    /*
    ----- BUTTON -----
     */
    button: {
        marginTop: 40,
        height: 40,
        width: 150,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 50,
    },
    buttonText: {
        fontFamily: "OpenSans",
        color: colors.white,
        fontSize: 15,
        alignSelf: "center",
    }
})
