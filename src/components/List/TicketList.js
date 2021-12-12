import React from "react";
import { Button ,ThemeProvider} from "react-native-elements";

import { ListItem, Icon ,Avatar,Divider} from 'react-native-elements'
import { StyleSheet, Text, View } from 'react-native';
import Badge from "../Misc/Badge"
import {theme } from "../../config/theme"
const CustomButton = (props) => {

    let { 
TicketID, 

bottomDivider,
onPress,

date,
status,
avatar_url
    }=props

  return(


      <ThemeProvider theme={theme}>

  <ListItem onPress={onPress} bottomDivider={bottomDivider} containerStyle={{backgroundColor:"white",borderBottomWidth:bottomDivider?1:0,borderColor:"#e2e2e2",padding:5,paddingBottom:15,paddingTop:15}}>
        <ListItem.Content style={{marginLeft:0}}>
          <ListItem.Title style={styles.titleStyle}>Ticket ID : {TicketID}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitleStyle}>Date : {new Date(date).toDateString()}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subtitleStyle}>Status : {status}</ListItem.Subtitle>
        </ListItem.Content>        
        <ListItem.Chevron style={styles.chevron} color={theme.colors.textPrimary} size={24} />
        
      </ListItem>
       
  </ThemeProvider>



  )
};



const styles = StyleSheet.create({
    titleStyle:{
fontFamily:"NunitoMedium",

fontSize:15,
color:theme.colors.textPrimary,
 margin:5,
 paddingBottom:0,
 lineHeight:24
     
    },
    subtitleStyle:{
        marginTop:0,
        margin:5,
        paddingTop:0,
        lineHeight:14,
        fontFamily:"NunitoLight",
        fontSize:14
    },



banner:{
width:100,
height:60,
borderRadius:10,
backgroundColor:"#e2e2e2"
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
