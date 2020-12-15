import React, {useContext} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, Pressable} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./MainScreenStyleSheet";

function BottomNavigation (props) {

    const {navigationItem, setNavigationItem} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    return (
        <View style={styles.bottomNavigation}>

            <Pressable style={styles.bottomNavigationItem} onPress={() => setNavigationItem("QUESTS")}>
                <Image style={styles.bottomNavigationItemImage} source={navigationItem === "QUESTS" ? require("../../assets/navigationIcons/questsSelected.png") : require("../../assets/navigationIcons/quests.png")} />
                <Text style={navigationItem === "QUESTS" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.quests}</Text>
            </Pressable>

           <Pressable style={styles.bottomNavigationItem} onPress={() => setNavigationItem("NEAR")}>
               <Image style={styles.bottomNavigationItemImage} source= {navigationItem === "NEAR" ? require("../../assets/navigationIcons/nearSelected.png") : require("../../assets/navigationIcons/near.png")} />
               <Text style={navigationItem === "NEAR" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.near}</Text>
           </Pressable>

            <Pressable style={styles.bottomNavigationItem} onPress={() => setNavigationItem("CREATOR")}>
                <Image style={styles.bottomNavigationItemImage} source={navigationItem === "CREATOR" ? require("../../assets/navigationIcons/creatorSelected.png") : require("../../assets/navigationIcons/creator.png")} />
                <Text style={navigationItem === "CREATOR" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.creator}</Text>
            </Pressable>

            <Pressable style={styles.bottomNavigationItem} onPress={() => setNavigationItem("ME")}>
                <Image style={styles.bottomNavigationItemImage} source= {navigationItem === "ME" ? require("../../assets/navigationIcons/meSelected.png") : require("../../assets/navigationIcons/me.png")} />
                <Text style={navigationItem === "ME" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.me}</Text>
            </Pressable>

        </View>
    )
}

export default BottomNavigation
