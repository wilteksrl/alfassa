import React,{useEffect,useState,} from 'react'
import {connect} from 'react-redux'
import {getOrders} from "../../redux/actions/Order"
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Nav from "../../components/Headers/header"
import  Search from '../../components/CustomInputs/SearchField';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList} from 'react-native';
import OrderList from '../../components/List/OrderList'
import Typography from '../../components/Typography/Typography';
import {Icon} from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { Divider } from 'react-native-paper'

import {theme } from "../../config/theme"




 function MyOrder(props) {

let total=0
   
    let data=props.route.params
 
    return (
     <Container>
<Header>
<Nav
centerComponent={<View  style={{marginLeft:"-80%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Order Details</Typography>
</View> }
/>

</Header>
<Divider style={{ backgroundColor: 'black', height: 1 }} />

<Content >

       
<View style={styles.container}>
<View style= {{marginBottom:4,marginLeft:0,marginTop:-10,justifyContent:"flex-start",flexDirection:"row"}}>
         <Icon
         type="feather"
         name="calendar"
         size={18}
         />
         <Typography size={12} style={{marginLeft:5}} color={"textSecondary"} >{new Date(data.ORDER_DATE).toDateString()}</Typography>
         </View>
  <Typography size={14} color={"textPrimary"} type="bold" >Bill to</Typography>
<View style={{flexDirection:"row",alignItems: "center",borderBottomColor:"#e0e0e0",borderBottomWidth:1,paddingTop:12,paddingBottom:12}} >
<Avatar
size={40}

rounded
icon={{name: 'user', type: 'font-awesome'}}
overlayContainerStyle={{backgroundColor:"#e0e0e0"}}

/>

<Typography size={14} style={{marginLeft:12}} type={"semiBold"}>{data.CUSTOMER_NAME?data.CUSTOMER_NAME:""}</Typography>
</View>

<Typography size={14} color={"textPrimary"} type="bold" style={{marginTop:16}} >Plant name</Typography>
<View style={{flexDirection:"row",alignItems: "center",borderBottomColor:"#e0e0e0",borderBottomWidth:1,paddingTop:12,paddingBottom:12}} >
<Icon
    type={"font-awesome"}
style={{paddingLeft:4,}}
    size={30}
    name={"industry"}
    
    />

<Typography size={14} style={{marginLeft:12}} type={"semiBold"}> {data.PLANT_NAME?data.PLANT_NAME:""}</Typography>
</View>



<View style={styles.table}>
<View style={styles.header}>

    <View style={{flex:3,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >Details</Typography></View>
    <View style={{flex:1,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >Qty</Typography></View>
    <View style={{flex:1,flexDirection: 'row',justifyContent:"flex-end"}}><Typography size={12} color={"textSecondary"} >Price</Typography></View>

</View>

{data.ORDER_DETAIL.map(item=>{
    total=total+Number(item.PRICE)
    return(
        <View style={styles.row}>

        <View style={{flex:3,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >{item.SKU_DESCRIPTION}</Typography></View>
            <View style={{flex:1,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >{item.SKU_QUANTITY}</Typography></View>
            <View style={{flex:1,flexDirection: 'row',justifyContent:"flex-end"}}><Typography size={12} color={"textSecondary"} >{"₹ "+Number(item.TOTAL_SKU_VALUE)}</Typography></View>
        </View>
    )
})
    
   }

         </View>


         <View style={styles.table}>
<View style={styles.header}>

<Typography size={12} color={"textSecondary"} >Remarks</Typography>

</View>
<View style={styles.row}>

<Typography size={12} color={"textSecondary"} >{data.REMARKS}</Typography>
</View>
    
   
         </View>

<View style={{flex:1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
<Typography size={24} style={{marginLeft:12}} color={"green"} type={"bold"} type={"semiBold"}>{"Total : ₹ "+Number(data.TOTAL_ORDER_VALUE)}</Typography>
</View>
        
  </View>

    
</Content>

     </Container>
    )
}
const mapStateToProps=(state)=>{
    
    return {
        order: state.order.allOrders
    }
}

const styles = StyleSheet.create({
    container:{
flex:1,
marginTop:24,
paddingLeft:10,paddingRight:10
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
    },
    table:{
       
        marginTop:24,
        marginBottom:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    overflow:"hidden"
    }
    ,
    header:{
        backgroundColor:"#E0E0E0",
        padding:8,
        paddingRight:12,
        flexDirection:"row",
        paddingLeft:12
    },
    row:{
        backgroundColor:"#F2F2F2",
        flexDirection:"row",
        padding:12,
        justifyContent:"space-between",
        borderBottomWidth:1,
        borderBottomColor:"#e2e2e2",
    }
    
});

export default connect(mapStateToProps,{getOrders})(MyOrder)
