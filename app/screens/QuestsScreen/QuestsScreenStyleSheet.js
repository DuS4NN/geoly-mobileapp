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
        backgroundColor: 'white',
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
        backgroundColor: colors.white
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
        backgroundColor: colors.white
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
    contentNavigationItem: {
        width: 110,
        borderTopColor: "black",
        borderTopWidth: 2,
        borderBottomColor: "black",
        borderBottomWidth: 2,
        padding: 6,
        alignItems: "center"
    },
    contentNavigationItemSelected: {
        backgroundColor: colors.backgroundGreen
    },
    contentNavigationLeftItem: {
        borderLeftWidth: 2,
        borderLeftColor: "black",
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        paddingLeft: 15
    },
    contentNavigationRightItem: {
        borderRightWidth: 2,
        borderRightColor: "black",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        paddingRight: 15
    },
    contentNavigationItemText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        fontSize: 18,
        color: colors.black
    },
    contentNavigationItemTextSelected: {
        color: colors.darkGreen
    },
    /*
        --- CONTENT DATA ---
     */
    contentData: {
        flex: 1,

    }
})
