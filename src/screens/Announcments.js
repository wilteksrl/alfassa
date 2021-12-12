import React, {memo,useEffect,useState} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { Divider } from 'react-native-paper'

import Container from './../components/Layout/container';
import Header from './../components/Layout/header';
import Content from './../components/Layout/content';
import Footer from './../components/Layout/footer';
import {Icon} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import Offerlist from './../components/List/offerList';
import AvatarWithMore from './../components/List/AvatarWithMore';
import  Search from './../components/CustomInputs/SearchField';
import Typography from './../components/Typography/Typography';
import Nav from "./../components/Headers/header"
import {getAnnouncments } from "./../redux/actions/Utils"
import {connect} from "react-redux"

const showCustomer = (props) =>{ 
  const [refresh,setRefresh]=useState(false)
 
  useEffect(() =>
  {


getClaimsList(1)


  },[])

  const getClaimsList=(type=1)=>{
    setRefresh(true)
    props.getAnnouncments(type).then(() =>setRefresh(false)).catch(() =>setRefresh(false))
  }



  

 
  const renderItem=({ item }) => (


<Offerlist
onPress={() =>props.navigation.navigate("AnnouncmentDetail",{...item})}
             bottomDivider
         name={item.TITLE}
         dateFrom={new Date(item.VALID_FROM).toDateString()}
            dateTo={new Date(item.VALID_TILL
              ).toDateString()}
         state={item.REGION_NAME}
         badgeText={item.TYPE}
         badgeColor={item.APPROVAL_STATUS=="1"?"green":"yellow"}
        
         />
  )
  

  return (
     <Container>
    <Header >
<Nav 
centerComponent={<View  style={{marginLeft:"-70%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Announcements</Typography>
</View> }
  
/>
<Divider style={{ backgroundColor: 'black', height: 1 }} />

    </Header>
    {props.claims&&props.claims.lenghth>0?<Content fixed>
    {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Announcements </Typography>

     
        </View> */}
      
     <View style= {{flex:1}}>


{/* {props.claims.map(item =>{
  return(  <Typography size={12} style={styles.addCust} color={"primary"}>Add Claim </Typography>)
})} */}
         <FlatList
         key={"1"}
         refreshing={refresh}
onRefresh={()=>getClaimsList(1)}
onEndReached={(info)=>getClaimsList(2)}
        data={props.claims}
        renderItem={renderItem}
        keyExtractor={item => item.TYPE}
      />

</View>
     
       
       
    </Content>:<Content><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../assets/gif/announcements.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Announcement Found</Typography></View></View></Content>}
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
    claims:state.utils.offers
  }
}
export default connect(mapStateToProps,{getAnnouncments})(showCustomer);