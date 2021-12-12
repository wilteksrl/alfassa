import React, {memo} from 'react';
import Button from '../../components/CustomButtons/Button';
import SmallButton from "../../components/CustomButtons/smallButton";
import Snackbar from 'react-native-snackbar';
import { Divider } from 'react-native-paper'

import {ThemeProvider} from 'react-native-elements';
import Timeline from 'react-native-timeline-flatlist'
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList} from 'react-native';
import ClaimList from '../../components/List/ClaimList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import {delelteZeroClaim} from "../../redux/actions/Claims"
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {connect} from "react-redux"
import {theme } from "../../config/theme"

const showCustomer = (props) => {
    
    let data=props.route.params
   const data2 = [
        {time: '', title: props.name, description: 'Claimed',  descriptionStyle:{color:theme.colors.green,fontFamily:"Nunito"},titleStyle:{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}},
        {time: '', title: data.APPROVER_NAME, description: data.APPROVAL_STATUS=="0"?"Pending":data.APPROVAL_STATUS=="1"?"Approved":data.APPROVAL_STATUS=="2"?"Rejected":"Zero Claim",
        descriptionStyle:{color:data.APPROVAL_STATUS=="0"?theme.colors.yellow:data.APPROVAL_STATUS=="1"?theme.colors.green:data.APPROVAL_STATUS=="2"?theme.colors.red:theme.colors.blue,fontFamily:"Nunito"},titleStyle:{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}
    
    },
      
      ]


      const handleSubmit=()=>{
props.delelteZeroClaim(
    data.CLAIM_ID
).then((res) => {
    setTimeout(() => {
      Snackbar.show({
        text: 'Claim Delete Succesfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);

    props.navigation.goBack();

    props.getClaims(1);
  })


      }
    console.log(data);
    return(
     <Container>
    <Header >
<Nav 
centerComponent={<View  style={{marginLeft:"-80%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Claim Details</Typography>
</View> }
 rightComponent={
    <View style={{marginLeft:-60,marginTop:9}}>
    {data.APPROVAL_STATUS==(0)&& <SmallButton
     title="Delete Claim"
     type={"outline"}
     onPress={() => handleSubmit()}
     />}
     {data.APPROVAL_STATUS==(3)&& <SmallButton
     title="Delete Claim"
     type={"outline"}
     onPress={() => handleSubmit()}
     />}</View>
    }
  
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    <Content>
    <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5,marginTop:10}}>
        <Typography size={24} style={{marginLeft:5}} type={"bold"} color={"textPrimary"}>Claim ID {"("+data.CLAIM_ID+")"} </Typography>
     
    {/* {data.APPROVAL_STATUS==(0)&& <SmallButton
     title="Delete Claim"
     type={"outline"}
     onPress={() => handleSubmit()}
     />}
     {data.APPROVAL_STATUS==(3)&& <SmallButton
     title="Delete Claim"
     type={"outline"}
     onPress={() => handleSubmit()}
     />} */}
     
        </View>
      
         <View style= {{marginTop:5,marginBottom:0,marginLeft:10,justifyContent:"flex-start",flexDirection:"row"}}>
         <Icon
         type="feather"
         name="calendar"
         size={18}
         />
         <Typography size={12} style={{marginLeft:5}} color={"textSecondary"} >{new Date(data.CLAIM_DATE).toDateString()}</Typography>
         </View>
     
         
<View style={styles.infoCard}>

    <View style={styles.infoChild}>
<Typography size={24} color={"red"} type={"bold"}>₹ {Number(data.TOTAL_CLAIMED_AMOUNT)}</Typography>
<Typography size={16} color={"textPrimary"} type={"bold"}>Claimed</Typography>
    </View>


    <View style={[styles.infoChild,styles.border]}>
    <Typography size={24} color={"green"} type={"bold"}>₹ {Number(data.APPROVAL_STATUS)?Number(data.TOTAL_CLAIMED_AMOUNT):0}</Typography>
    <Typography size={16} color={"textPrimary"} type={"bold"}>Approved</Typography>
</View>
</View>

<View style= {{marginTop:24,marginBottom:16,marginLeft:10,justifyContent:"flex-start",alignItems: "center",flexDirection:"row"}}>
         <Icon
         type="entypo"
         name="calculator"
         size={18}
         />
         <Typography size={18} style={{marginLeft:10}} type={"bold"} >Breakups</Typography>
         </View>


         <View style={styles.table}>
<View style={styles.header}>
<Typography size={12} color={"textSecondary"} >Details</Typography>
</View>

<View style={styles.row}>
    <Typography size={12} color={"textSecondary"}>Travel</Typography>
    <Typography size={12} color={"textSecondary"}>₹ {Number(data.EXP_TAXI_AUTO)+Number(data.EXP_BUS_TRAIN)+Number(data.EXP_PLANE)+(Number(data.EXP_FUEL))+((props.level.EXP_PER_KM_RATE)*(Number(data.END_KM)-Number(data.START_KM)))}</Typography>
</View>
<View style={styles.row}>
    <Typography size={12} color={"textSecondary"}>Daliy Allowance</Typography>
    <Typography size={12} color={"textSecondary"}>₹ {Number(data.DA_RATES_LOCAL)+Number(data.DA_RATES_OUTST)}</Typography>
</View>
<View style={styles.row}>
    <Typography size={12} color={"textSecondary"}>Accommodation</Typography>
    <Typography size={12} color={"textSecondary"}>₹ {Number(data.EXP_HOTEL)}</Typography>
</View>
<View style={styles.row}>
    <Typography size={12} color={"textSecondary"}>Mobile Bill</Typography>
    <Typography size={12} color={"textSecondary"}>₹ {Number(data.EXP_MOBILE_INTERNET)}</Typography>
</View>

<View style={styles.row}>
    <Typography size={12} color={"textSecondary"}>Others</Typography>
    <Typography size={12} color={"textSecondary"}>₹ {Number(data.EXP_VEH_REPAIR)+Number(data.EXP_MISC)+Number(data.EXP_STATIONARY)}</Typography>
</View>
         </View>
       <View style={{marginTop:15}}>
         <View style={styles.table}>
               <View style={styles.header}>
<Typography size={12} color={"textPrimary"} type="bold" >Comments</Typography>
</View>
<View style={styles.bottom}>
    <Typography size={12} color={"textSecondary"}>{data.MISC_COMMENTS}</Typography>
</View>
</View>
</View>



         <View style= {{marginTop:24,marginBottom:16,marginLeft:10,justifyContent:"flex-start",alignItems: "center",flexDirection:"row"}}>
         <Icon
         type="entypo"
         name="back-in-time"
         size={18}
         />
         <Typography size={18} style={{marginLeft:10}} type={"bold"} >Timeline</Typography>
         </View>
<View>

<Timeline
lineColor={theme.colors.green}
circleColor={theme.colors.green}
titleStyle={{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}}
          data={data2}
          
        />
</View>
    </Content>
    <Footer></Footer>
    </Container>
);}

const styles = StyleSheet.create({

    infoCard:{

paddingTop:16,
paddingBottom:16,
flexDirection:"row",
    },
    infoChild:{
flex:1,
justifyContent:"center",
alignItems:"center"
    },

    border:{
borderLeftWidth:2,
borderColor:"#e2e2e2"
    },

 
    addCust:{
lineHeight:40,
marginLeft:70
},
table:{
    margin:16,
    marginTop:8,
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
    paddingLeft:12
},
bottom:{
    backgroundColor:"#F2F2F2",
    flexDirection:"row",
    padding:12,
    height:100,
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderBottomColor:"#e2e2e2",
},
row:{
    backgroundColor:"#F2F2F2",
    flexDirection:"row",
    padding:12,
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderBottomColor:"#e2e2e2",
}

})

const mapStateToProps=(state)=>{
    return {
        level:state.claims.level,
    name:state.auth.details.EMP_NAME,
    deleteData:state.claims.deleteClaim,
    }
}
export default connect(mapStateToProps,{delelteZeroClaim})(memo(showCustomer));