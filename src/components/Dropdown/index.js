import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme } from "../../config/theme"
import Typography from "../Typography/Typography"
import { StyleSheet, Text, View } from 'react-native';
export default function index(props) {
    return (
<View>

    <Typography type={"bold"} size={14} style={{marginLeft:9,marginBottom:5}} >{props.label}</Typography>
    <View style={{marginBottom:32,marginLeft:8,borderBottomWidth:2,marginRight:8,borderBottomColor:"#e0e0e0"}}>
        <RNPickerSelect
    {...props}
   
       
      
          textInputProps={{ underlineColorAndroid: 'cyan' }}
        style={{
    ...pickerSelectStyles,
        placeholder: {
           
         color:"black"
          },
    
    
    }}
        
      
    />
    </View>

    </View>
    )
}




const styles = StyleSheet.create({
    inputContainerStyle:{
        fontFamily:"Nunito",
        fontSize:18,
        color:theme.colors.textPrimary,
        borderBottomWidth:2,
    width:"100%",
    marginRight:0,
    paddingRight:0,
    marginBottom:10,
        fontWeight:"normal",
        borderBottomColor:theme.colors.borderColor
    },
    inputStyle:{
        fontFamily:"Nunito-Regular",
        fontSize:14,
        fontWeight:"normal",
      
    
        color:theme.colors.textPrimary,
    },
    
    iconContainer:{
    paddingRight:10
    },
    
    labelStyle:{
        fontFamily:"Nunito-Bold",
        fontSize:14,
        fontWeight:"normal",
        marginLeft:0,
       lineHeight:18,
        color:theme.colors.textPrimary
    }
        ,
       
       
    
      });

      const pickerSelectStyles = StyleSheet.create({
        inputIOS: {
          fontSize: 12,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 4,
          color: 'black',
          paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
          fontSize: 12,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderWidth: 0.5,
          borderColor: 'purple',
          borderRadius: 8,
          color:theme.colors.textPrimary,
          paddingLeft: 30, // to ensure the text is never behind the icon
          paddingRight: 30, // to ensure the text is never behind the icon
        },
      });