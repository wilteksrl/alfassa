import React, {memo,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import StockList from '../../components/List/StockList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {connect} from "react-redux"
import { Divider } from 'react-native-paper'

const showCustomer = (props) =>{ 
  const [searchKey,setSearch]=useState(null)
  useFocusEffect(
    useCallback(() => {
      setSearch("")
     }, [])
   );


  console.log(props.stock);
  let stocksData=searchKey&&props.index?
  props.index.search(searchKey):props.stock

  const renderItem = ({ item }) => {
    item=searchKey?item.item:item
 
  
    return(
    
<StockList
             bottomDivider
         name={item.SKU_DESCRIPTION}
         desc={item.CATEGORY_NAME}
         Plant={item.PLANT_DESCRIPTION}
amount={item.PRICE?("₹ "+Number(item.PRICE).toFixed(2)):"₹ 0.00"}
stock={item.QUANTITY&&Number(item.QUANTITY)}

         />
  
    )
  }



  return(
     <Container>
    <Header >
<Nav 
centerComponent={<View  style={{marginLeft:"-105%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Stocks </Typography>
</View>}
  
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    {props.stock&&props.stock.length>0?<Content fixed>
    {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Stocks </Typography>
   
        </View> */}
      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         placeholder="Search SKU"
         value={searchKey}
         onChangeText={txt=>setSearch(txt)}/>
         </View>
<View style={{flex:1}}>
<FlatList
      
      data={stocksData}
      renderItem={renderItem}
      keyExtractor={(item,index) => item.SKU_ID+index.toString()}
    />
</View>
    

     
        
       
     
       
       
    </Content>:<Content style={{backgroundColor:"white"}}><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/stock.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Stock Available</Typography></View></View></Content>}
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


const mapStateToProps=(state) =>{

  return {
stock:state.order.allProducts,
index:state.order.productIndex
  }
}
export default connect(mapStateToProps,{})(memo(showCustomer))