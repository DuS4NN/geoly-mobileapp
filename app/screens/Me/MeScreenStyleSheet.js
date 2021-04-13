import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.lightBackgroundGray
    },
    header: {
        flex: 1,
        backgroundColor: colors.backgroundGreen,
        flexDirection: "row",
    },
    headerText: {
        flex: 1,
        alignSelf: "center",
        textAlign: "center",

        fontFamily: "MarkProBold",
        textTransform: "uppercase",
        fontSize: 22,
        color: colors.darkGreen
    },
    headerImage: {
        flex: 1,
        height: "100%",
        resizeMode: "contain",
    },
    division: {
        width: 0,
        height: 0,
        backgroundColor: colors.lightBackgroundGray,
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        borderTopColor: colors.backgroundGreen,
        paddingBottom: 30
    },

    content: {
        flex: 4
    },
    contentContainer: {
        backgroundColor: colors.white,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 30,
        marginBottom: 30,
        borderRadius: 30,
        width: "85%",
        alignSelf: "center"
    },
    profileImage: {
        marginTop: 5,
        height: 100,
        width: 100,
        borderRadius: 100
    },
    nickName: {
        color: colors.darkGreen,
        fontSize: 30,
        marginTop: 20,
        fontFamily: "MarkProBold",
        marginBottom: 30
    },
    highlightItemContainer: {
        width: "80%",
        height: 40,
        borderRadius: 30,
        marginBottom: 20
    },
    itemContainer: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 30,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    itemText: {
        fontSize: 17,
        fontFamily: "OpenSans",
        textAlign: "center"
    },
    itemImage: {
        width: 15,
        height: 15
    },

    loading: {
        alignItems: "center",
    },
    loadingImage: {
        height: 40,
        width: 40,
        resizeMode: "contain"
    },

})
