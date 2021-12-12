import React from "react";
import { Button ,ThemeProvider} from "react-native-elements";
import {Icon} from 'react-native-elements';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {theme } from "../../config/theme"
const CustomButton = (props) => {

    let { 

        padding,
        borderRadius,
        iconType,
        iconSize,
        iconColor,
        backgroundColor,
        size,
        iconName,
        style,
        borderColor,
        borderWidth,
        text,
        fontSize,

    }=props

  return(


      <ThemeProvider theme={theme}>
    <TouchableOpacity style={{justifyContent:"center",alignItems: "center",overflow: "hidden",borderRadius:8}}    onPress={() =>props.onPress()}  >
    <View
    style={[style,{padding:padding,borderRadius:8,backgroundColor:backgroundColor,borderWidth:borderWidth,borderColor:borderColor,borderBottomEndRadius:8,borderBottomStartRadius:8}]}
    onPress={() =>props.onPress()}
  
{...props}
   
  >
 <Icon
     // onPress={() =>props.onPress()}
        name={iconName}
        size={iconSize}
        color={iconColor}
        type={iconType}
      />
    </View>
  {text&&
  
  <Text style={{fontSize:fontSize,fontFamily:"extraBold",color:theme.colors.textPrimary,marginTop:8}}>{text}</Text>}
  </TouchableOpacity>
  </ThemeProvider>



  )
};


CustomButton.defaultProps={
    padding:8,
    borderRadius:1,
    iconType:"feather",
    iconSize:24,
    iconName:"plus",
    iconColor:"white",
    borderWidth:0,
    borderColor:"#000",
    text:null,
    fontSize:12,

    backgroundColor:theme.colors.primary
   

}
  




export default CustomButton;
