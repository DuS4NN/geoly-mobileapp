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
        height: 90,
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 15,
        marginBottom: 20

    },
    itemImageContainer: {
        width: "25%",
        justifyContent: "center",
    },
    itemImage: {
        height: "50%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    itemBorder: {
        alignSelf: "center",
        height: "80%",
        width: 1,
        backgroundColor: colors.lightGray
    },
    itemTextContainer: {
        width: "75%",
        justifyContent: "center"
    },
    itemText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 15,
        color: colors.black,
        paddingLeft: 10,
        paddingRight: 10
    },
    itemPartyNameText: {
        fontFamily: "OpenSansLight",
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.gray,
        fontSize: 13,
    },

    itemDeleteContainer: {
      backgroundColor: colors.lightGray
    },
    deleteText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 15,
        alignSelf: "center",
        color: colors.black,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    deleteButtonsContainers: {
        flexDirection: "row",
        justifyContent: "center"
    },
    deleteButton: {
        height: 30,
        width: 80,
        justifyContent: "center",
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10
    },
    deleteButtonText: {
        fontFamily: "OpenSans",
        color: colors.white,
        fontSize: 15,
        alignSelf: "center",
    },

    noDataContainer: {
        flex: 1,
    },
    noDataImage: {
        height: "40%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    noDataText: {
        fontFamily: "OpenSans",
        fontSize: 17,
        color: colors.black,
        alignSelf: "center",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10
    }
})
