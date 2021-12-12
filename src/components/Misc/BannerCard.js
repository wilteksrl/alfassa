import React from 'react'
import { Button, ThemeProvider } from "react-native-elements";
import {Icon} from 'react-native-elements';
import Typography from "../Typography/Typography";
import IconButton from "../CustomButtons/IconButton";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ImageBackground, Text, View,TouchableOpacity } from "react-native";
import { theme } from "../../config/theme";
import { LineChart, Grid } from 'react-native-svg-charts'

export default function BannerCard(props) {
    // const data = [150000, 100000, 400000,200000,500000,100000]

let {
name,
subname,
onPress,
tile1,
tile2,
inc,
colour,
iconcolor,
iconname,
tile11,
colour11,
tile12,
iconcolor1,
iconname1,
data=[],

   
}=props

    return (
        <ThemeProvider theme={theme}>
            <LinearGradient colors={['#450A74',  "#C184F0"]}  style={styles.main}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
<Typography size={20} color={"white"} style={styles.TotalSales}>{name}</Typography>
<View style={{flexDirection:'row'}}>
<Typography size={20} color={"white"} style={styles.Total} type={"semiBold"}>{subname}</Typography>
<View style={{flexDirection:'row' }}>
    <Icon
    name={iconname}
    type={"ionicon"}
    color={iconcolor}
    size={20}
    />
    <View style={{marginLeft:-11,marginTop:2.5}}>
<Typography size={12} color={colour} style={styles.Total} type={"semiBold"}>{inc}</Typography>
</View>
</View>
</View>
</View>
<LineChart
                style={{ height: 85,width:160,marginTop:-5,marginRight:15}}
                data={data}
                numberOfTicks={0}
                showGrid={false}
                svg={{ stroke: 'white' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart></View>

            <View style={styles.table}>
<View style={styles.header}>
<Typography size={12} color={"white"} type={"bold"} >{tile1}</Typography>
<Typography size={12} color={"white"} type={"bold"} >{tile11}</Typography>
<View style={{marginTop:-3,marginLeft:"1%"}}>

<Icon
    name={iconname1}
    type={"ionicon"}
    color={iconcolor1}
    size={19}
    />
</View>
<View style={{marginTop:-1}}>
<Typography size={12} color={colour11} type={"bold"} >{tile12}</Typography>
</View>

</View>
</View>
<View style={styles.table2}>
<View style={styles.header}>
<Typography size={12} color={"white"} type={"bold"} >{tile2}</Typography>
</View>
</View>

         
            </LinearGradient>
            </ThemeProvider >
    )
}
const styles = StyleSheet.create({

    main:{
        aspectRatio:2.2,
marginTop:10,
borderRadius:8,
    //   borderTLeftRadius:8,
//       borderTopRightopRadius:8,
//   borderBottomLeftRadius:8,
//   borderBottomRightRadius:8,
        flex:1
    },
    header:{
        backgroundColor:"#7222B1",
        padding:8,
        paddingLeft:12,
        flexDirection:'row'
    },
    table:{
        marginLeft:5,
        marginRight:5,
        marginTop:-8,
        marginBottom:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    overflow:"hidden"
    }, 
    table2:{
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    overflow:"hidden"
    },
    TotalSales:{
        marginTop:5,
        marginLeft:8
    },
    Total:{
        marginLeft:8,
        marginTop:0
    }
})
