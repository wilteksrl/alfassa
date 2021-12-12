import React, { memo } from 'react';



import Icon from 'react-native-vector-icons/Ionicons';

import { Divider } from 'react-native-paper'

import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, FlatList } from 'react-native';

import { theme } from "../config/theme"


const showCustomer = (props) => (

  <View style={{ flex: 1, marginTop: -5 }}>
    {/* <Nav style={{backgroundColor:"#fff"}}/> */}
    <DrawerContentScrollView {...props}>


     
      <DrawerItem
        icon={({ focused, color, size }) => <Icon color={color} size={20} name={focused ? 'home' : 'home-outline'} />}
        style={{ marginTop: 32 }}
        labelStyle={{ fontSize: 16, marginLeft: -10, fontFamily: "Nunito", color: theme.colors.textPrimary }}
        label="Home"
        onPress={() => { props.navigation.navigate("Home") }}
      />
      {/* <DrawerItem
        icon={({ focused, color, size }) => <Icon color={color} size={20} name={focused ? 'home' : 'home-outline'} />}
        style={{ marginTop: 32 }}
        labelStyle={{ fontSize: 16, marginLeft: -10, fontFamily: "Nunito", color: theme.colors.textPrimary }}
        label="Employee"
        onPress={() => { props.navigation.navigate("Employee") }}
      /> */}
      <Divider style={styles.Devider} />
{/*      
        <DrawerItem
          icon={({ focused, color, size }) => <Icon color={color} size={20} name={focused ? 'person' : 'person-add-outline'} />}

          labelStyle={{ fontSize: 16, marginLeft: -10, fontFamily: "Nunito", color: theme.colors.textPrimary }}
          label="Add customer"
          onPress={() => { props.navigation.navigate("WebView") }}
        />
        <Divider style={styles.Devider} /> */}

   


  
    

    </DrawerContentScrollView>
  
  </View>
);




const styles = StyleSheet.create({
  header: {
    lineHeight: 40,
    marginLeft: 5,

  },

  AvatarView: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: "center",
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginBottom: -10,
    alignItems: "center",
  },
  Devider: {
    marginLeft: "20%",
    height: 1
  },
  backgroundImage: {
    position: 'absolute',
    // top: 0,
    height: "100%",
    marginLeft: -15,
    width: "110%",
    marginTop: -10,
    flex: 1,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // opacity: 1
  },
  addCust: {
    lineHeight: 40,
    marginLeft: 70
  },

})



showCustomer.defaultProps = {
  roleData: []
}

export default memo(showCustomer)