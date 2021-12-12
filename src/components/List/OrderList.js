import React from "react";
import { Button ,ThemeProvider} from "react-native-elements";
import Typography from "../Typography/Typography";
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
date,
desc,
Plant,
amount,
TotalItem,
discount,
avatar_url,
stock
    }=props

  return(


      <ThemeProvider theme={theme}>

  <ListItem onPress={onPress} bottomDivider={bottomDivider} containerStyle={{backgroundColor:"white",borderBottomWidth:bottomDivider?1:0,borderColor:"#e2e2e2",padding:5,paddingBottom:15,paddingTop:15}}>

        <ListItem.Content style={{marginLeft:0}}>
          <ListItem.Title style={styles.titleStyle}>{date}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitleStyle}>{name}</ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subtitleStyle2}>{Plant}</ListItem.Subtitle>
        </ListItem.Content>

        <View>
<View style={{alignItems:'flex-end'}}>
<Typography size={16} color={"green"} type={"bold"}  style={{marginBottom:8}}>{amount}</Typography>
<Badge color={props.badgeColor} text={props.badgeText}/>
<Typography size={14} color={"textSecondary"} type={"bold"}  style={{marginTop:8}}>{"Total Items "+TotalItem}</Typography>
</View>
</View>
      </ListItem>
       
  </ThemeProvider>



  )
};



const styles = StyleSheet.create({
    titleStyle:{
fontFamily:"NunitoMedium",

fontSize:16,
color:theme.colors.textPrimary,
 marginBottom:0,
 paddingBottom:0,
 lineHeight:24
     
    },
    subtitleStyle:{
        marginTop:0,
        paddingTop:8,
        lineHeight:14,
        fontFamily:"NunitoLight",
        fontSize:15
    },
subtitleStyle2:{
    marginTop:0,
    paddingTop:10,
    lineHeight:14,
    color:theme.colors.textPrimary,
    fontSize:12
},
    avatarStyle:{
        color:theme.colors.textPrimary,
        fontSize:24,
    }
,


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
