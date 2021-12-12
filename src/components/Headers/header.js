import React from "react";
import { Input ,ThemeProvider} from "react-native-elements";
import { SearchBar,Header } from 'react-native-elements';

import { StyleSheet, Text, View } from 'react-native';
import Typography from "../../components/Typography/Typography";
import {theme } from "../../config/theme"
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
const CustomHeader= (props) => {

  const navigation = useNavigation();

  return(


      <ThemeProvider theme={theme}>
        <View style={{backgroundColor:"#F6F6F9"}}>
    <Header
leftComponent={<View style={{marginTop:8}}><Icon  onPress={() => {
  navigation.goBack();
}}
name="chevron-left"  type={"feather"} size={30} style={{marginLeft:10}}/>


</View>}
statusBarProps={{
    backgroundColor:"#fff",
    barStyle:"dark-content",
    hidden:false,

}}
 containerStyle={{
  backgroundColor:"#F6F6F9",
     borderBottomWidth:0,
   justifyContent:"center",
alignItems:"center",
paddingTop:0,
height:60,
...props.style

 }}
 {...props}
  />
{props.title&&   <Typography
          size={24}
          style={{paddingLeft: 34,marginTop:0,paddingTop:0}}
          type={'bold'}
          color={'textPrimary'}>
         {props.title}
        </Typography>}
        </View>
  </ThemeProvider>



  )
};



const styles = StyleSheet.create({
    containerStyle:{
width:"100%",
backgroundColor:"rgba(0,0,0,0)",
padding:12,
borderTopWidth:0,
borderBottomWidth:0

    },
inputContainerStyle:{
    borderColor:"red",
    borderRadius:15,
  padding:2,
    backgroundColor:"#F2F3F2"
},
inputStyle:{
    fontFamily:"Nunito",
    marginLeft:5,
    fontSize:16,
    fontWeight:"normal",
    color:theme.colors.textPrimary,
},


   

  });
  




export default CustomHeader;
