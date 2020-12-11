import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    itemContainer: {
        width: "90%",
        height: 120,
        flexDirection: "row",
        backgroundColor: colors.backgroundGray,
        borderRadius: 10

    },
    itemImageContainer: {
        width: "20%",
        justifyContent: "center"
    },
    itemImage: {
        height: "50%",
        alignSelf: "center",
        resizeMode: "contain",
        borderLeftWidth: 1,
    },
    itemTextContainer: {
        width: "80%",
        justifyContent: "center"
    },
    itemText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 20,
        color: colors.black,
        paddingLeft: 10,
        paddingRight: 10
    }
})
