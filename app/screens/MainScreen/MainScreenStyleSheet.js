import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
    },
    content:{
        backgroundColor: colors.black,
        flex: 1, justifyContent: 'flex-start'
    },

    bottomNavigation: {
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: 'flex-end',
    },
    bottomNavigationItem: {
        flex: 1,
        height: 55,
        justifyContent: "center"
    },
    bottomNavigationItemImage: {
        height: "45%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    bottomNavigationItemText: {
        textAlign: "center",
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 0
    },
    bottomNavigationItemTextSelected: {
        color: colors.black,
        fontSize: 12
    }
})
