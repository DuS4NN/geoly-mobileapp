import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    title:{
        flex: 1.5,
        paddingTop: 20,
        alignItems: "center"
    },
    image: {
        flex: 2,
        resizeMode: "contain"
    },
    text: {
        flex: 0.5,
        fontFamily: "MarkProBold",
        fontWeight: "bold",
        fontSize: 25,
        textTransform: "uppercase",
        color: colors.darkGreen
    },

    form: {
      flex: 2
    },
    label: {
        fontFamily: "OpenSans",
        fontSize: 12,
        color: colors.gray,
        paddingTop: 20,
        paddingBottom: 10
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
    }
})
