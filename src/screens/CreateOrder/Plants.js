import React, {memo,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon,Divider} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList} from 'react-native';
import StockList from '../../components/List/StockList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {connect} from "react-redux"
import {setPlant} from "../../redux/actions/Order"

import { useNavigation } from '@react-navigation/native';
const showCustomer = (props) =>{ 
    const navigation = useNavigation();
    const [searchKey,setSearch]=useState(null)
    const setPlant=(plant)=>{
props.setPlant(plant)
        navigation.goBack()
    }


    useFocusEffect(
      useCallback(() => {
        setSearch("")
       }, [])
     );
     

    const renderItem = ({ item }) => {
      
     item=searchKey?item.item:item
      return (
        <StockList
        value={2}
        onPress={() =>setPlant(item)}
        bottomDivider
    name={item.PLANT_DESCRIPTION}
    desc={item.REGION_NAME}
    Plant={item.PLANT_ADDRESS}

    />
      );}
    

      let plantsData=searchKey&&props.index?
      props.index.search(searchKey):props.plants
    return(
     <Container>
    <Header >
<Nav 
centerComponent={<View style={{marginLeft:"-105%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Plants</Typography>
</View>}
  
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    {props.plants&&props.plants.length>0?<Content fixed>
   
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         placeholder="Search Plant"
         value={searchKey}
         onChangeText={txt=>setSearch(txt)}/>
         </View>


         <FlatList
      
        data={plantsData}
        renderItem={renderItem}
        keyExtractor={(item,index )=> item.PLANT_ID+index.toString()}
      />
  
    </Content>:<Content style={{backgroundColor:"white"}}><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/plant.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Plants Available</Typography></View></View></Content>}
    <Footer></Footer>
    </Container>
);}

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

const mapStateToProps=(state)=>{

    return {
        plants:state.order.allPlants,
        index:state.order.plantIndex,
    }
}
export default connect(mapStateToProps,{setPlant})(memo(showCustomer))