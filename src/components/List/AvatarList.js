import React from "react";
import { Button ,ThemeProvider} from "react-native-elements";

import { ListItem, Icon ,Avatar,Divider} from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native';
import Badge from "../Misc/Badge"
import {theme } from "../../config/theme"
const CustomButton = (props) => {

    let { 
name, 
icon,
bottomDivider,
onPress,
subtitle,
subtitle1,
avatar_url
    }=props

  return(


      <ThemeProvider theme={theme}>

  <ListItem onPress={onPress} bottomDivider={bottomDivider} containerStyle={{backgroundColor:"white",borderBottomWidth:bottomDivider?1:0,borderColor:"#e2e2e2"}}>
  <Avatar rounded  title={name&&name[0]&&name[0].toUpperCase()} source={{uri: avatar_url}}  size={45}/>
        <ListItem.Content style={{marginLeft:5}}>
          <ListItem.Title style={styles.titleStyle}>{name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitleStyle}>{subtitle}, ID-{subtitle1}</ListItem.Subtitle>
          {/* <ListItem.Subtitle style={styles.subtitleStyle}>{subtitle1}</ListItem.Subtitle> */}

        </ListItem.Content>
        <Badge color={props.badgeColor} text={props.badgeText}/>
        
        <ListItem.Chevron style={styles.chevron} color={theme.colors.textPrimary} size={24} />
        
      </ListItem>
       
  </ThemeProvider>



  )
};



const styles = StyleSheet.create({
    titleStyle:{
fontFamily:"NunitoMedium",

fontSize:14,
color:theme.colors.textPrimary,
 marginBottom:0,
 paddingBottom:0,
 lineHeight:24
     
    },
    subtitleStyle:{
        marginTop:0,
        paddingTop:0,
        lineHeight:14,
        fontFamily:"NunitoLight",
        fontSize:12
    },

    avatarStyle:{
        color:theme.colors.textPrimary,
        fontSize:24,
    }
,
    chevron:{
        color:theme.colors.textPrimary,
        fontSize:24,
    },

   
    
  
  });
  


CustomButton.defaultProps={
    onPress:null,
    
}

export default CustomButton;
