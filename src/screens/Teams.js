import React, {memo,useEffect} from 'react';
import {ThemeProvider} from 'react-native-elements';

import Background from './../components/Background';
import Container from './../components/Layout/container';
import Header from './../components/Layout/header';
import Content from './../components/Layout/content';
import Footer from './../components/Layout/footer';
import {Icon} from 'react-native-elements';
import { Divider } from 'react-native-paper'

import {Text, View,Linking,Alert,Platform, StyleSheet,Image,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import StockList from './../components/List/StockList';
import AvatarWithMore from './../components/List/AvatarWithMore';
import  Search from './../components/CustomInputs/SearchField';
import Typography from './../components/Typography/Typography';
import Nav from "./../components/Headers/header"
import {connect} from "react-redux"
import TreeView from './../components/Tree'
import {getTeam} from "../redux/actions/Utils"
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
const showCustomer = (props) => {

  dialCall = (number) => {
    if (number){
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        console.log("hi");
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
  }
  else{Alert.alert('Phone number is not available');}
 };


useEffect(() =>{
    props.getTeam()
},[])

    const family = [
        {
          id: 'Grandparent',
          name: 'Grandpa',
          age: 78,
          children: [
            {
              id: 'Me',
              name: 'Me',
              age: 30,
              children: [
                {
                  id: 'Erick',
                  name: 'Erick',
                  age: 10,
                },
                {
                  id: 'Rose',
                  name: 'Rose',
                  age: 12,
                },
              ],
            },
          ],
        },
      ]

      function getIndicator(isExpanded, hasChildrenNodes) {
        if (!hasChildrenNodes) {
          return   ""
        } else if (isExpanded) {
          return  <Icon
          name='minus'
          style={{marginRight:8}}
          type='entypo'
          color='#517fa4'
        />
        } else {
          return <Icon
          name='plus'
          style={{marginRight:8}}
          type='entypo'
          color='#517fa4'
        />
        }
      }
    return(
     <Container>
    <Header >
<Nav 
centerComponent={<View  style={{marginLeft:"-95%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>My Team </Typography>
</View> }
  
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

  {props.team&&props.team.length>0?  <Content>
    {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>My Team </Typography>
   
        </View> */}
      <View style={{marginLeft:6,marginTop:32}}>
        <View style={{flexDirection:"row",alignItems: "center"}}>
          <View>
          <Avatar
            source={{
              uri:"http://apps.insecticidesindia.com:8030/storage/"+props.team[0]&&props.team[0].IMAGE
            }}
  rounded
  icon={{name: 'user', type: 'font-awesome'}}
size={40}
  activeOpacity={0.7}
  containerStyle={{ backgroundColor:"grey",marginRight:8}}
/>
          </View>
          <View>
          <Typography size={24}>{props.team[0]&&props.team[0].NAME}</Typography>
 <Typography size={14} color={"textSecondary"}>{props.team[0]&&props.team[0].DESIGNATION}{props.team[0].DESIGNATION&&" ( "+props.team[0].MOB+" ) "}</Typography>
          </View>

 </View>
 
        <TreeView
        idKey={"EMP_ID"}
        childrenKey={"EMPLOYEE"}
        collapsedItemHeightForLevel={80}
      data={props.team&&props.team[0]?props.team[0].EMPLOYEE:[]} // defined above
      renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
        return (
          <View style={{  marginLeft: 25 * level,marginTop:24,flexDirection: 'row',alignItems: 'center'}}>
            <Text >
         {getIndicator(isExpanded, hasChildrenNodes)}</Text>
         <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>


         <Avatar
  rounded
  source={{
    uri:"http://apps.insecticidesindia.com:8030/storage/"+node.EMP_IMAGE
  }}
  icon={{name: 'user', type: 'font-awesome'}}
size={35}
  activeOpacity={0.7}
  containerStyle={{ backgroundColor:"grey",marginRight:8}}
/>
       

           <View>
           <TouchableOpacity onLongPress={()=>dialCall(node.EMP_MOBILE_NO)}>

         <Typography size={18}>{node.EMP_NAME}</Typography>
 <Typography color={"textSecondary"}>{node.EMP_DESIGNATION?node.EMP_DESIGNATION:"N/A"}{node.EMP_MOBILE_NO&&" ( "+node.EMP_MOBILE_NO+" ) "}</Typography>
 </TouchableOpacity>
 </View>
 </View>
       
          </View>
        )
      }}
    />
       
       </View>
       
       
    </Content>:<Content style={{backgroundColor:"white"}}><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../assets/gif/team.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Team Found</Typography></View></View></Content>}
    <Footer></Footer>
    </Container>
);

}

const styles = StyleSheet.create({
  header:{
lineHeight:40,
marginLeft:5,

  },
    addCust:{
lineHeight:40,
marginLeft:70
},

})


const mapStateToProps=(state) =>{

  return {
team:state.utils.team
  }
}
export default connect(mapStateToProps,{getTeam})(memo(showCustomer))