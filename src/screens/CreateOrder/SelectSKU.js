import React, {memo,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon,Divider} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import StockList from '../../components/List/StockList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import Button from '../../components/CustomButtons/Button';
import { useNavigation } from '@react-navigation/native';
import SmallButton from "../../components/CustomButtons/smallButton";
import {connect} from "react-redux"
import {addCartProduct,updateCartProduct,getProducts} from "../../redux/actions/Order"
 const showCustomer = (props) =>{ 
  const [searchKey,setSearch]=useState(null)
  const navigation = useNavigation();

  let stocks=props.plant&&props.stock.filter(item=>{
  
    return item.PLANT_ID==props.plant.PLANT_ID
  })
  
  useFocusEffect(
    useCallback(() => {
      setSearch("")
     }, [])
   );

  const renderItem = ({ item }) => {
    item=searchKey?item.item:item
    let ext=props.cart.find(product=>product.SKU_ID==item.SKU_ID)
  
    return(
  <StockList
  onUpdate={(val)=>props.updateCartProduct(item.SKU_ID,val)}
  onPressButton={()=>props.addCartProduct({...item,Qty:1})}
  itemData={item}
  num={true}
               bottomDivider
           name={item.SKU_DESCRIPTION}
           desc={item.CATEGORY_NAME}
           Plant={item.PLANT_DESCRIPTION}
  amount={"₹ "+Number(item.PRICE).toFixed(2)}
  numProps={
    
   { value:ext?ext.Qty:0,
  maxValue:Number(item.QUANTITY)
  
  }
  
  }
  stock={item.QUANTITY&&Number(item.QUANTITY)}

  
           />
  
    )
  }

  let stocksData=searchKey&&props.index?
  props.index.search(searchKey).filter(item=>{return item.item.PLANT_ID==props.plant.PLANT_ID}):stocks
  
  return(
     <Container>
    <Header >
<Nav 

/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    <Content fixed>
    <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Stocks </Typography>
   
        </View>
      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         placeholder="Search SKU"
         value={searchKey}
         onChangeText={txt=>setSearch(txt)}/>
         </View>
<View style= {{flex:1}}>
         <FlatList
      
        data={stocksData}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.SKU_ID+index.toString()}
      />

      </View>
{/* <ScrollView>
{stocks.map(item=>{

  let ext=props.cart.find(product=>product.SKU_ID==item.SKU_ID)
 
  return(
<StockList
onUpdate={(val)=>props.updateCartProduct(item.SKU_ID,val)}
onPressButton={()=>props.addCartProduct({...item,Qty:1})}
itemData={item}
num={true}
             bottomDivider
         name={item.SKU_DESCRIPTION}
         desc={item.CATEGORY_NAME}
         Plant={item.PLANT_DESCRIPTION}
amount={"₹ "+Number(item.PRICE).toFixed(2)}
numProps={
  
 { value:ext?ext.Qty:0,
maxValue:Number(item.QUANTITY)

}

}

         />

  )
})}



</ScrollView>
      */}
        
       
     
       
       
    </Content>
    <Footer>
<Button title="Continue" onPress={()=>navigation.goBack()} style={{padding:25}}/>
    </Footer>
    </Container>
)
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
stock:state.order.allProducts,
plant:state.order.plant,
cart:state.order.products,
index:state.order.productIndex,
customer:state.order.customer,

  }
}
export default connect(mapStateToProps,{addCartProduct,updateCartProduct,getProducts})(showCustomer)

