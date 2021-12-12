import React from 'react'

import { Button, ThemeProvider } from "react-native-elements";

import { useNavigation } from '@react-navigation/native';
import Typography from "../Typography/Typography";
import IconButton from "../CustomButtons/IconButton";
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ImageBackground, Text, View ,TouchableOpacity} from "react-native";
import { theme } from "../../config/theme";
const  BannerCard=(props)=> {
    const navigation = useNavigation();
    return (
        <ThemeProvider theme={theme}>
          
<TouchableOpacity onPress={()=>navigation.navigate(props.nav,{selectMode:true})} style={styles.selector}>

    {props.leftIcon}

<View style={{flexGrow:1,paddingLeft:20}}>
<Typography size={14} style={{textTransform:"capitalize"}} color={!props.value?"textSecondary":"textPrimary"}>{props.value?props.value:props.placeholder}</Typography>
</View>
<Icon
type={"materialIcon"}

size={30}
name={"keyboard-arrow-down"}

/>

</TouchableOpacity>
          
            </ThemeProvider >
    )
}

const styles = StyleSheet.create({

    selector:{
        flexDirection:"row",
        flex:1,
        alignItems:"center",
        borderWidth:1,
        height:60,
        borderColor:theme.colors.textTertiary,
        borderRadius:20, 
        paddingLeft:16,
        paddingRight:16
    },
    
})

BannerCard.defaultProps={
    onPress:null,
    
}

export default BannerCard