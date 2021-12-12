import React,{useEffect,useState,useCallback} from 'react'
import {connect} from 'react-redux'
import {getOrders} from "../../redux/actions/Order"
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Typography from '../../components/Typography/Typography';

import Nav from "../../components/Headers/header"
import  Search from '../../components/CustomInputs/SearchField';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList} from 'react-native';
import OrderList from '../../components/List/OrderList'
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper'

 function MyOrder(props) {
    const [searchKey,setSearch]=useState(null)
    const [refresh,setRefresh]=useState(false)


    useFocusEffect(
        useCallback(() => {
            getData(1)
            setSearch("")
         }, [])
       );
     


    const getData=(type=1)=>{
        setRefresh(true)
        props.getOrders(type).then((items)=>{
            setRefresh(false);
        }).catch(err=>{
            setRefresh(false)
        })
    }

    const renderItem = ({ item }) => {
        item=searchKey?item.item:item
   let qty=0;
   let total=0

   item.ORDER_DETAIL&&item.ORDER_DETAIL.map(val=>{
       qty=qty+Number(val.SKU_QUANTITY)
       total=total+Number(val.PRICE)
   })
       return(
        <OrderList 
        onPress={()=>props.navigation.navigate("Order Details",{...item})}
                bottomDivider
            name={item.CUSTOMER_NAME}
            date={new Date(item.ORDER_DATE).toDateString()}
            Plant={item.PLANT_NAME}
            amount={"₹ "+Number(item.TOTAL_ORDER_VALUE)}
            TotalItem={qty}
            badgeText={"#"+item.ORDER_ID}
            badgeColor={"green"}
        
            />
     )}

     let order=searchKey&&props.index?
     props.index.search(searchKey):props.order
   
    return (
     <Container>
<Header>
<Nav
centerComponent={<View  style={{marginLeft:"-90%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>My Orders</Typography>
</View>}
/>
</Header>
<Divider style={{ backgroundColor: 'black', height: 1 }} />

{props.order&&props.order.length>0?<Content fixed>
<View style= {{marginTop:16,marginBottom:16}}>
         <Search placeholder="Search Orders"  value={searchKey}
            onChangeText={txt=>setSearch(txt)}/>
         </View>
         <View  style= {{flexDirection:"column",flex:1}}>
         <FlatList
refreshing={refresh}
onRefresh={()=>getData(1)}
onEndReached={(info)=>getData(2)}
        data={order}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.ORDER_ID+index.toString()}
      />
   </View>
       
       


    
</Content>
:<Content><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/order.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No order Found</Typography></View></View></Content>}
     </Container>
    )
}
const mapStateToProps=(state)=>{
    
    return {
        order: state.order.allOrders,
        index:state.order.orderIndex
    }
}
export default connect(mapStateToProps,{getOrders})(MyOrder)
