import React, {useContext} from "react";
import {Text, View, TextInput, Switch} from "react-native";
import {UserContext} from "../../../../UserContext";
import DropDownPicker from 'react-native-dropdown-picker';
import colors from "../../../../AppColors"
import getText from "../../../assets/text/Text";
import styles from "../CreatorScreenStyleSheet";

function CreatorForm (props) {

    const {categories, details, setDetails, name, setName, description, setDescription} = props

    const {userContext} = useContext(UserContext)
    const text = getText(userContext["languageId"])

    const difficulty = [
        {
            value: "1",
            label: "1",
            selected: true
        },
        {
            value: "2",
            label: "2"
        },
        {
            value: "3",
            label: "3"
        },
        {
            value: "4",
            label: "4"
        },
        {
            value: "5",
            label: "5"
        }
    ]

    const togglePrivate = () => {
        setDetails({
            ...details,
            private: !details.private
        })
    }
    const changeCategory = (item) => {
        setDetails({
            ...details,
            category: item.value
        })
    }
    const changeDifficulty = (item) => {
        setDetails({
            ...details,
            difficulty: item.value
        })
    }

    const changeName = (text) => {
        setDetails({
            ...details,
            name: text
        })
    }

    const changeDescription = (text) => {
        setDetails({
            ...details,
            description: text
        })
    }

    return (
        <View style={styles.formContainer}>

            <Text style={styles.formTitle}>{text.creator.formTitle}</Text>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.questName}</Text>
                <TextInput maxLength={50} placeholder={text.creator.questName} style={styles.formInput} value={name} onChangeText={text => changeName(text)}/>
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.category}</Text>

                {categories.length > 0 && (
                    <DropDownPicker
                        items={categories}
                        defaultValue={categories[0].value}
                        containerStyle={{
                            alignSelf: "center",
                            width: "86%",
                            height: 45,
                        }}
                        itemStyle={{
                            borderBottomColor: colors.lightGray,
                            borderBottomWidth: 1,
                        }}
                        onChangeItem={item => changeCategory(item)}
                    />
                )}

            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.difficulty}</Text>
                <DropDownPicker
                    items={difficulty}
                    containerStyle={{
                        alignSelf: "center",
                        width: "86%",
                        height: 45,
                    }}
                    itemStyle={{
                        borderBottomColor: colors.lightGray,
                        borderBottomWidth: 1,
                    }}
                    onChangeItem={item => changeDifficulty(item)}
                />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.description}</Text>
                <TextInput maxLength={500} placeholder={text.creator.description} style={styles.formInput} value={description} onChangeText={text => changeDescription(text)} />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>{text.creator.private}</Text>
                <Switch
                    trackColor={{ false: colors.lightGray, true: colors.lightGray }}
                    thumbColor={details.private ? colors.lightGreen : colors.gray}
                    ios_backgroundColor="#3e3e3e"
                    value={details.private}
                    onValueChange={togglePrivate}
                    style={styles.toggle}
                />
            </View>
        </View>
    )
}

export default CreatorForm
