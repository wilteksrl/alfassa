import React, {memo} from 'react';
import Selector from "../../components/Misc/Selector"
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import Typography from "../../components/Typography/Typography";
import {Icon} from 'react-native-elements';
import Cards from "../../components/Misc/DataCard"
const LoginScreen = (props) =>{ 
 
  
  return(
  <View style={styles.container}>
   <Selector 
   leftIcon={
   <Icon
    type={"entypo"}
   
    size={30}
    name={"briefcase"}
    
    />
  }
  value={props.plant?props.plant.PLANT_DESCRIPTION:""}
  nav="Plants"
  placeholder={"Select Plant"}
   />




  </View>

  
)}

const styles = StyleSheet.create({
    container:{
flex:1
    },
    CardContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:32
    },

    dues:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        marginTop:32
    }
});

export default memo(LoginScreen);
