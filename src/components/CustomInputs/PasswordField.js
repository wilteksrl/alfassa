import React,{useState} from "react";
import { Input ,ThemeProvider} from "react-native-elements";

import { StyleSheet, Text, View } from 'react-native';
import {theme } from "../../config/theme"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomInput= (props) => {
const [secureMode,setSecureMode]=useState(true)


    let { 
style,
next

    }=props

  return(
      <ThemeProvider theme={theme}>
    <Input
   inputContainerStyle={styles.inputContainerStyle}
   labelStyle={styles.labelStyle}
   inputStyle={styles.inputStyle}
leftIconContainerStyle={styles.iconContainer}
errorStyle={{marginBottom:16,paddingTop:0,marginTop:0}}
rightIconContainerStyle={styles.iconContainer}
   rightIcon={
    !secureMode? <Icon
name={"eye"}
color={theme.colors.textSecondary}
onPress={()=>setSecureMode(!secureMode)}
size={24}
/>:<Icon
name={"eye-off"}
onPress={()=>setSecureMode(!secureMode)}
color={theme.colors.textSecondary}
size={24}
/>
}
textContentType={"password"}
secureTextEntry={secureMode}
   {...props}
  />
  </ThemeProvider>

  )
};


const styles = StyleSheet.create({
inputContainerStyle:{
    fontFamily:"Nunito-Regular",
    fontSize:13,
    color:theme.textPrimary,
    borderBottomWidth:2,
    paddingBottom:0,
    paddingTop:0,
    borderBottomColor:"#E2E2E2"
},
iconContainer:{
paddingRight:0
},
labelStyle:{
    fontFamily:"Nunito-Bold",
    fontSize:14,
    fontWeight:"normal",
   lineHeight:18,
    color:theme.colors.textPrimary
},
    inputStyle:{
fontFamily:"Nunito-Regular",
fontSize:14,
    },
  });
export default CustomInput;
