import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundGreen,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        height: "40%",
        alignSelf: "center",
        resizeMode: "contain",
        marginTop: "20%"
    },
    text: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 20,
        color: colors.black,
        alignSelf: "center",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
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
