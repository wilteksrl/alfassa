import { View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

import { AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';



import Home from './screens/dashboard/Home';
import WebView from "./screens/dashboard/WebView"
import SideDrawer from "./components/Drawer"


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function Routes(props) {
  // props.initCustomers();


  return (
    <>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        hidden={false}
        translucent
      />



   



      <NavigationContainer>

      

          <Drawer.Navigator
            drawerContent={(props) => (<SideDrawer {...props} />)}
            headerMode={false}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="WebView" component={WebView} />
            <Drawer.Screen name="WebView1" component={WebView} />
            <Drawer.Screen name="WebView2" component={WebView} />
            <Drawer.Screen name="WebView3" component={WebView} />
            <Drawer.Screen name="WebView4" component={WebView} />
            <Drawer.Screen name="WebView5" component={WebView} />
          </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}



export default (Routes);
