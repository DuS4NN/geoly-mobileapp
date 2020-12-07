import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.backgroundGreen,
        justifyContent: "flex-start"
    },
    image: {
        width: "70%",
        resizeMode: "contain",
        alignSelf: "center",
        backgroundColor: "red"
    },
    text: {
        flex: 1
    }
})
