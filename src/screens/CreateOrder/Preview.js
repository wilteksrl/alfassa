import React, {memo,useState,useCallback} from 'react';
import Selector from "../../components/Misc/Selector"
import { useFocusEffect } from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import InputField from '../../components/CustomInputs/InputField';
import Typography from "../../components/Typography/Typography";
import {Icon} from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import {connect} from "react-redux"
import {setRemark} from "../../redux/actions/Order"

import Cards from "../../components/Misc/DataCard"
const LoginScreen = (props) =>{ 
    // const [remarks, setRemark] = useState("");

const setRemark=(remarks)=>{
    props.setRemark(remarks)
        }



        useFocusEffect(
            useCallback(() => {
                setRemark("")
             }, [])
           );
    let total=0
    props.cart.map(item=>{
        total=total+(Number(item.PRICE)*item.Qty*Number(item.FACTOR))
    })
    // console.log(total);
    // console.log(props.remarks);

  return(
  <View style={styles.container}>
  
  <Typography size={14} color={"textPrimary"} type="bold" >Bill to</Typography>
<View style={{flexDirection:"row",alignItems: "center",borderBottomColor:"#e0e0e0",borderBottomWidth:1,paddingTop:12,paddingBottom:12}} >
<Avatar
size={40}

rounded
title={props.customer?props.customer.CUSTOMER_NAME[0]:"N/A"}
overlayContainerStyle={{backgroundColor:"#e0e0e0"}}

/>

<Typography size={14} style={{marginLeft:12}} type={"semiBold"}>{props.customer?props.customer.CUSTOMER_NAME:""}</Typography>
</View>

<Typography size={14} color={"textPrimary"} type="bold" style={{marginTop:16}} >Plant name</Typography>
<View style={{flexDirection:"row",alignItems: "center",borderBottomColor:"#e0e0e0",borderBottomWidth:1,paddingTop:12,paddingBottom:12}} >
<Icon
    type={"font-awesome"}
style={{paddingLeft:4,}}
    size={30}
    name={"industry"}
    
    />

<Typography size={14} style={{marginLeft:12}} type={"semiBold"}> {props.plant?props.plant.PLANT_DESCRIPTION:""}</Typography>
</View>

<View style={styles.table}>
<View style={styles.header}>

    <View style={{flex:3,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >Details</Typography></View>
    <View style={{flex:1,flexDirection: 'row',justifyContent:'center'}}><Typography size={12} color={"textSecondary"} >Qty</Typography></View>
    <View style={{flex:1,flexDirection: 'row',justifyContent:"flex-end"}}><Typography size={12} color={"textSecondary"} >Price</Typography></View>

</View>

{props.cart.map(item=>{
    return(
        <View style={styles.row}>

        <View style={{flex:3,flexDirection: 'row'}}><Typography size={12} color={"textSecondary"} >{item.SKU_DESCRIPTION}</Typography></View>
            <View style={{flex:1,flexDirection: 'row',justifyContent:'center'}}><Typography size={12} color={"textSecondary"} >{item.Qty}</Typography></View>
            <View style={{flex:1,flexDirection: 'row',justifyContent:"flex-end"}}><Typography size={12} color={"textSecondary"} >{"₹ "+Number(item.PRICE)*Number(item.FACTOR)}</Typography></View>
        </View>
    )
})
    
   }

         </View>

<View style={{flex:1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginTop:32}}>
<Typography size={24} style={{marginLeft:12}} color={"green"} type={"bold"} type={"semiBold"}>{"Total : ₹ "+total}</Typography>
</View>
<View style={{ marginLeft: 10,marginTop:30 }}>
                  <Typography size={15} type={'bold'}>Remark</Typography>

                </View>
                <InputField
                  value={props.remarks}
                  onChangeText={(value) => setRemark(value)}
                  placeholder="Enter Remark"
                />
  </View>

  
)}

const styles = StyleSheet.create({
    container:{
flex:1,
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
const mapStateToProps=(state)=>{

    return {
        remarks:state.order.remarks,
    }
}

export default connect(mapStateToProps,{setRemark})(memo(LoginScreen));
