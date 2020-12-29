import React, {useContext} from "react";
import {UserContext} from "../../../UserContext";
import {View, Image, Text, TouchableHighlight} from "react-native";
import getText from "../../assets/text/Text";
import styles from "./MainScreenStyleSheet";
import colors from "../../../AppColors";

function BottomNavigation (props) {

    const {navigationItem, setNavigationItem} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const questsIcon = require("../../assets/navigationIcons/quests.png")
    const questsSelectedIcon = require("../../assets/navigationIcons/questsSelected.png")
    const nearIcon = require("../../assets/navigationIcons/near.png")
    const nearSelectedIcon = require("../../assets/navigationIcons/nearSelected.png")
    const creatorIcon = require("../../assets/navigationIcons/creator.png")
    const creatorSelectedIcon = require("../../assets/navigationIcons/creatorSelected.png")
    const meIcon = require("../../assets/navigationIcons/me.png")
    const meSelectedIcon = require("../../assets/navigationIcons/meSelected.png")

    return (
        <View style={styles.bottomNavigation}>

            <TouchableHighlight underlayColor={colors.highlightWhite} style={styles.bottomNavigationItem} onPress={() => setNavigationItem("QUESTS")}>
               <View style={styles.bottomNavigationItem}>
                   <Image style={styles.bottomNavigationItemImage} source={navigationItem === "QUESTS" ? questsSelectedIcon : questsIcon} />
                   <Text style={navigationItem === "QUESTS" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.quests}</Text>
               </View>
            </TouchableHighlight>

           <TouchableHighlight underlayColor={colors.highlightWhite} style={styles.bottomNavigationItem} onPress={() => setNavigationItem("NEAR")}>
               <View style={styles.bottomNavigationItem}>
                  <Image style={styles.bottomNavigationItemImage} source= {navigationItem === "NEAR" ? nearSelectedIcon : nearIcon} />
                  <Text style={navigationItem === "NEAR" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.near}</Text>
              </View>
           </TouchableHighlight>

            <TouchableHighlight underlayColor={colors.highlightWhite} style={styles.bottomNavigationItem} onPress={() => setNavigationItem("CREATOR")}>
                <View style={styles.bottomNavigationItem}>
                    <Image style={styles.bottomNavigationItemImage} source={navigationItem === "CREATOR" ? creatorSelectedIcon : creatorIcon} />
                    <Text style={navigationItem === "CREATOR" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.creator}</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={colors.highlightWhite} style={styles.bottomNavigationItem} onPress={() => setNavigationItem("ME")}>
                <View style={styles.bottomNavigationItem}>
                    <Image style={styles.bottomNavigationItemImage} source= {navigationItem === "ME" ? meSelectedIcon : meIcon} />
                    <Text style={navigationItem === "ME" ? [styles.bottomNavigationItemText, styles.bottomNavigationItemTextSelected] : styles.bottomNavigationItemText}>{text.navigation.me}</Text>
                </View>
            </TouchableHighlight>

        </View>
    )
}

export default BottomNavigation
