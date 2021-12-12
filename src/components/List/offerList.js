import React from "react";
import { Button, ThemeProvider } from "react-native-elements";

import { ListItem, Icon, Avatar, Divider } from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native';
import Badge from "../Misc/Badge"
import Typography from "../Typography/Typography";
import { theme } from "../../config/theme"
const CustomButton = (props) => {

    let {
        name,
        icon,
        bottomDivider,
        onPress,
        subtitle,
        dateFrom,
        dateTo,
        amount,
        state,
        avatar_url
    } = props

    return (


        <ThemeProvider theme={theme}>

            <ListItem onPress={onPress} bottomDivider={bottomDivider} containerStyle={{ backgroundColor: "white", borderBottomWidth: bottomDivider ? 1 : 0, borderColor: "#e2e2e2", padding: 5, paddingBottom: 15, paddingTop: 15 }}>

                <ListItem.Content style={{ marginLeft: 0 }}>
                    <ListItem.Title style={styles.titleStyle}>{name}</ListItem.Title>
                    <View style={{ flexDirection: 'row' }}><Typography size={13} type='bold'>From : </Typography>
                    <Typography size={13} type='bold'>{dateFrom}</Typography>

                        {/* <ListItem.Subtitle style={styles.subtitleStyle}></ListItem.Subtitle> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}><Typography size={13} type='bold'>To : </Typography>
                    <Typography size={13} type='bold'>{dateTo}</Typography>
                        {/* <ListItem.Subtitle style={styles.subtitleStyle}>{dateTo}</ListItem.Subtitle> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    <Icon
                        type="ionicon"
                        name="location-outline"
                        size={20}
                    /> 
                        <Typography color="green" style={{ marginTop: 1 }}>{state}</Typography>
                        <View style={{ marginLeft: 20 }}>
                            <Badge marginLeft={50} color={props.badgeColor} text={props.badgeText} />
                        </View>
                    </View>
                </ListItem.Content>

                <ListItem.Chevron style={styles.chevron} color={theme.colors.textPrimary} size={24} />

            </ListItem>

        </ThemeProvider>



    )
};



const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: "NunitoMedium",
        textTransform: "capitalize",
        fontSize: 14,
        color: theme.colors.textPrimary,
        marginBottom: 0,
        paddingBottom: 0,
        lineHeight: 24

    },
    subtitleStyle: {
        marginTop: 0,
        paddingTop: 0,
        lineHeight: 14,
        fontFamily: "Nunito",
        fontSize: 13
    },

    avatarStyle: {
        color: theme.colors.textPrimary,
        fontSize: 24,
    }
    ,


    banner: {
        width: 100,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#e2e2e2"
    }
    ,

    chevron: {
        color: theme.colors.textPrimary,
        fontSize: 24,
    },




});



CustomButton.defaultProps = {
    onPress: null,

}

export default CustomButton;
