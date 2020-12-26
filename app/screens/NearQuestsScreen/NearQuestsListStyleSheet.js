import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    offset: {
        height: 30,
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
    itemDistanceText: {
        fontFamily: "OpenSansLight",
        paddingLeft: 10,
        paddingRight: 10,
        color: colors.gray,
        fontSize: 13,
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
    },

    loadingData: {
        alignItems: "center",
        marginBottom: 40,
        marginTop: -15
    },
    loadingImage: {
        height: "20%",
        resizeMode: "contain"
    },
})
