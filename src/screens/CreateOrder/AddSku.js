import React, {memo} from 'react';
import Selector from "../../components/Misc/Selector"
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import Typography from "../../components/Typography/Typography";
import {Icon} from 'react-native-elements';
import Cards from "../../components/Misc/DataCard"
import {connect} from "react-redux"
import StockList from '../../components/List/StockList';
import {addCartProduct,updateCartProduct} from "../../redux/actions/Order"
const LoginScreen = (props) => {
  

  

  const renderItem = ({ item }) => {

  
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
        
       { value:item.Qty,
      maxValue:Number(item.QUANTITY)
      
      }
      
      }
      
               />
  
    )
  }

  
  return(
  <View style={styles.container}>
   <Selector 
   leftIcon={
   <Icon
    type={"entypo"}
    
    size={30}
    name={"archive"}
    
    />
  }
  nav="SelectSKU"
  placeholder={"Select SKU"}
   />
<View style= {{flex:1}}>
<FlatList
      
      data={props.cart}
      renderItem={renderItem}
      keyExtractor={(item,index) => item.SKU_ID+index.toString()}
    />
    </View>

  </View>

  
)
}
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
const mapStateToProps=(state) =>{

  return {
stock:state.order.allProducts,

cart:state.order.products,
  }
}
export default connect(mapStateToProps,{addCartProduct,updateCartProduct})(LoginScreen)
