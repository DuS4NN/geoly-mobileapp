import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title:{
        flex: 2,
        alignItems: "center",
        backgroundColor: colors.backgroundGreen
    },
    image: {
        flex: 1.5,
        resizeMode: "contain",
        marginTop: 20
    },
    text: {
        flex: 0.5,
        fontFamily: "MarkProBold",
        fontWeight: "bold",
        fontSize: 30,
        textTransform: "uppercase",
        color: colors.darkGreen
    },
    division: {
        width: 0,
        height: 0,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        borderTopColor: colors.backgroundGreen,
    },
    form: {
        flex: 2
    },
    label: {
        fontFamily: "OpenSans",
        fontSize: 12,
        color: colors.gray,
        marginTop: 10,
        marginBottom: 10
    },
    passwordLabel: {
        marginTop: 40
    },
    input: {
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
    register: {
        color: colors.gray,
        fontSize: 14,
        fontFamily: "OpenSansLight",
        paddingTop: 15,
        textDecorationLine: "underline"
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
