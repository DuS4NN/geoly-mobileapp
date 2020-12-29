import { StyleSheet } from "react-native";
import colors from "../../../AppColors";

export default StyleSheet.create({
    background: {
        flex: 1
    },
    /*
        --- HEADER ---
     */
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
    },
    /*
        --- LOADING ---
     */
    loading: {
        flex: 4,
        alignItems: "center",
        backgroundColor: colors.lightBackgroundGray
    },
    loadingImage: {
        height: "20%",
        resizeMode: "contain"
    },

    /*
        --- CONTENT ---
     */
    content: {
        flex: 4,
        backgroundColor: colors.lightBackgroundGray
    },
    /*
        --- CONTENT NAVIGATION ---
     */
    contentNavigation: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
    },
    contentHighlightItem: {
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50
    },

    contentNavigationItem: {
        width: 110,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        alignItems: "center",
        backgroundColor: colors.white
    },
    contentNavigationLeftItem: {
        borderLeftWidth: 2,
        borderLeftColor: "black",
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
    },
    contentNavigationRightItem: {
        borderRightWidth: 2,
        borderRightColor: "black",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
    },

    contentNavigationItemBackgroundLeft: {
        padding: 6,
        width: 105,
        alignItems: "center",
    },
    contentNavigationItemBackgroundCenter: {
        padding: 6,
        width: 105,
        alignItems: "center"
    },
    contentNavigationItemBackgroundRight: {
        padding: 6,
        width: 105,
        alignItems: "center",

    },
    contentNavigationItemBackgroundSelectedLeft: {
        backgroundColor: colors.backgroundGreen,
        padding: 6,
        width: 109,
        alignItems: "center",
        borderRadius: 50
    },
    contentNavigationItemBackgroundSelectedCenter: {
        backgroundColor: colors.backgroundGreen,
        padding: 6,
        width: 109,
        alignItems: "center",
        borderRadius: 50
    },
    contentNavigationItemBackgroundSelectedRight: {
        backgroundColor: colors.backgroundGreen,
        padding: 6,
        width: 109,
        alignItems: "center",

        borderRadius: 50
    },

    contentNavigationItemText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 18,
        color: colors.black
    },
    contentNavigationItemTextSelected: {
        color: colors.darkGreen,
    },
    /*
        --- CONTENT DATA ---
     */
    contentData: {
        flex: 1
    }
})
