import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
    },

    content: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
    },

    loading: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.lightBackgroundGray
    },
    loadingImage: {
        height: "20%",
        resizeMode: "contain"
    },


    mapContainer: {
        height: 200,
        flex: 1
    },
    map: {
        flex: 1,
        width: "100%",
    },

    contentHeader: {
        backgroundColor: colors.backgroundGreen,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 4,
        paddingTop: 4,
        justifyContent: "space-between"
    },
    date: {
        marginRight: 50,
        marginLeft: 30,
        justifyContent: "flex-start",
    },
    dateText: {
        color: colors.gray,
        fontFamily: "OpenSansLight",
        fontSize: 16,
    },

    user: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 30,
    },
    userImage: {
        width: 27,
        height: 27,
        borderRadius: 30
    },
    userText: {
        paddingLeft: 7,
        fontFamily: "OpenSans",
        fontSize: 18,
    },

    description: {
        backgroundColor: colors.white,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    descriptionText: {
        fontFamily: "OpenSansLight",
        fontSize: 15
    },

    stageItem: {
        backgroundColor: colors.white,
        marginTop: 7,
        marginBottom: 7,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        height: 40,
        borderRadius: 30
    },
    stageItemImage: {
        marginLeft: 10,
        width: 30,
        height: 30
    },
    stageItemText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "OpenSans",
        fontSize: 15
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
