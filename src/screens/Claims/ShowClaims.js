import React, {memo,useEffect,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import { Divider } from 'react-native-paper'
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import ClaimList from '../../components/List/ClaimList';
import SmallButton from "../../components/CustomButtons/smallButton";

import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {getClaims} from "../../redux/actions/Claims"
import {connect} from "react-redux"
import {theme } from "../../config/theme"

const showCustomer = (props) =>{ 
  
  const [refresh,setRefresh]=useState(false)
  const [searchKey,setSearch]=useState(null)
 
// console.log(props.claims.length);
  useFocusEffect(
   useCallback(() => {
      getClaimsList(1)
      setSearch("")
    }, [])
  );

//   useEffect(() =>
//   {


// getClaimsList(1)


//   },[])

  const getClaimsList=(type=1)=>{
    setRefresh(true)
    props.getClaims(type).then(() =>setRefresh(false)).catch(() =>setRefresh(false))
  }



  
// console.log(props.claims);
 
  const renderItem=({ item }) => {
    item=searchKey?item.item:item
    return(


<ClaimList
onPress={() =>props.navigation.navigate("Show Claim details",{...item})}
             bottomDivider
         name={"Claim-id :"+item.CLAIM_ID}
         date={new Date(item.CLAIM_DATE).toDateString()}
         amount={"Total Claimed Amount : ₹" +item.TOTAL_CLAIMED_AMOUNT}
         badgeText={item.APPROVAL_STATUS=="1"?"Approved":item.APPROVAL_STATUS=="0"?"Pending":item.APPROVAL_STATUS=="2"?"Rejected":"Zero Claim"}
         badgeColor={item.APPROVAL_STATUS=="1"?"green":item.APPROVAL_STATUS=="0"?"yellow":item.APPROVAL_STATUS=="2"?"red":"blue"}
         avatar_url={"../../assets/images/apple.png"}
         />
  )}
  

  let claimsData=searchKey&&props.index?
  props.index.search(searchKey):props.claims

  return (
     <Container>
    <Header >
<Nav 
 centerComponent={<View style={{marginLeft:"-110%",marginTop:8}}>
 <Typography size={19} type={"bold"} color={"textPrimary"}>Claims</Typography>
 </View>}

 rightComponent={
 
 <View style={{marginLeft:-40,marginTop:9}}>
 <SmallButton 
onPress={()=> props.navigation.navigate("Add Claims")}
 title="Add Claim" type={"outline"}/></View>
 }
  
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    {props.claims&&props.claims.length>0?<Content fixed>
    {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Claims </Typography>

        <TouchableOpacity onPress={()=> props.navigation.navigate("Add Claims")}>
        <Typography size={12} style={styles.addCust} color={"primary"}>Add Claim </Typography>
    </TouchableOpacity>
        </View> */}
      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         placeholder ={"Search claim"}
            value={searchKey}
            onChangeText={txt=>setSearch(txt)}
         />
         </View>
     <View style= {{flex:1}}>


{/* {props.claims.map(item =>{
  return(  <Typography size={12} style={styles.addCust} color={"primary"}>Add Claim </Typography>)
})} */}
         <FlatList
         key={"1"}
         refreshing={refresh}
onRefresh={()=>getClaimsList(1)}
onEndReached={(info)=>getClaimsList(2)}
        data={claimsData}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.CLAIM_ID+index.toString()}
      />

</View>
     
       
       
    </Content>:<Content style={{   backgroundColor:"white",
}}><View style={{marginTop:'5%'}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/claim.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17} type={'bold'}>No claim Found</Typography></View></View>
</Content>}
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

const mapStateToProps=(state)=>{

  return {
    claims:state.claims.claims,
    index:state.claims.claimIndex
  }
}
export default connect(mapStateToProps,{getClaims})(showCustomer);