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
