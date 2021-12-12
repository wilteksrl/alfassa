import React from "react";
import { Button ,ThemeProvider} from "react-native-elements";
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, Text, View } from 'react-native';
import {theme } from "../../config/theme"
const CustomButton = (props) => {

    let { 
style,
next,
type
    }=props

  return(


      <ThemeProvider theme={theme}>
    <Button
    icon={next&&
      <Icon
        name="chevron-right"
        size={24}
        style={{marginRight:16}}
        color="white"
      />
    }
   containerStyle={style}
    buttonStyle={styles.buttonStyle}

    titleStyle={!next?styles.titleStyle:styles.titleStyleNext}
    disabledTitleStyle={styles.disabledTitleStyle}
    iconRight
{...props}
   
  />
  </ThemeProvider>



  )
};



const styles = StyleSheet.create({
    titleStyle:{
      fontFamily:"Nunito-Bold",
      fontSize:16,
color:theme.colors.white,

        width:"100%",
     
    },

    titleStyleNext:{
        fontFamily:"Nunito-Bold",
fontSize:16,
color:theme.colors.white,
        width:"100%",
        paddingLeft:28
    },
    disabledTitleStyle:{
      color:"white"
    }

    ,
    buttonStyle:{
        padding:15,
        
        borderRadius:11,
        width:"100%"
    }
  });
  




export default CustomButton;
