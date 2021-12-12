import React from 'react'
import { Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import Typography from "../Typography/Typography";
import IconButton from "../CustomButtons/IconButton";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../../config/theme";
import { LineChart, Grid } from 'react-native-svg-charts'

export default function BannerCard(props) {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -60, 0]

    let {
        name,
        subname,
        onPress,

    } = props

    return (
        <ThemeProvider theme={theme}>
            <LinearGradient colors={['black', "black"]} style={styles.main}>
                <View style={{marginLeft:4}}>
                    <View style={{marginTop:3}}>
                        <Typography size={16} color={"white"} style={styles.TotalSales} type={"bold"}>{name}</Typography>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Typography size={14} color={"white"} style={styles.Total}>{subname}</Typography>
                    </View></View>
            </LinearGradient>
        </ThemeProvider >
    )
}
const styles = StyleSheet.create({

    main: {
        aspectRatio: 5.4,
        marginTop: 10,
        borderRadius: 8,
        width: "100%",
        //   borderTLeftRadius:8,
        //       borderTopRightopRadius:8,
        //   borderBottomLeftRadius:8,
        //   borderBottomRightRadius:8,
        flex: 1
    },
    header: {
        backgroundColor: "#7222B1",
        padding: 8,
        paddingLeft: 12
    },
    table: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: -8,
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden"
    },
    table2: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden"
    },
    TotalSales: {
        marginTop: 4,
        marginLeft: 8
    },
    Total: {
        marginLeft: 8,
        marginTop: 0
    }
})
