import React, {memo,useState,useCallback,useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import axios from "../../utils/axios"
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon,Divider} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import StockList from '../../components/List/ledger';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {connect} from "react-redux"

const showCustomer = (props) =>{ 
  const [searchKey,setSearch]=useState(null)
  const [refresh,setRefresh]=useState(false)
  const [data,setData]=useState([])

  useFocusEffect(
    useCallback(() =>{
 getLedger()
  },[props.route.params.id])
  )

  const getLedger=()=>{

 
    setRefresh(true)
    axios.get(`http://apps.insecticidesindia.com:8031/suprsales_api/Ledger/viewLedgerMob.php?id=${props.route.params.id}&code=${props.route.params.code}`).then((res)=>{
if(res.data&&res.data.length>0){
  setData(res.data)

}
setRefresh(false)
    }).catch((err)=>{
      if(err.response&&err.response.status==404){
        setData([])
      }
      setData([])
      setRefresh(false)
    })
  }

  const renderItem = ({ item }) => {

 
  
    return(
<StockList
             bottomDivider
         name={item.TRANSACTION_ID}
         desc={item.TRANSACTION_TYPE}
         Plant={item.TRANSACTION_DESCRIPTION}
amount={"₹ "+Number(item.TRANSACTION_AMOUNT).toFixed(2)}
stock={item.TYPE}
discount={item.TRANSACTION_TIME}
         />
  
    )
  }


  return(
     <Container>
    <Header >
<Nav 

  
/>
    </Header>
    <Content fixed>
    <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Ledger </Typography>
   
        </View>
      
         <View style= {{marginTop:16,marginBottom:16}}>
        
         </View>
<View style={{flex:1}}>
{data.length==0&&<View style={{flexGrow:1,alignItems: "center",justifyContent:"center"}}>
  <Typography size={12}>No data found</Typography>
  </View>}
<FlatList
         refreshing={refresh}
           
            onRefresh={()=>getLedger()}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item,index) => item.TRANSACTION_ID+index.toString()}
    />
</View>
    

     
        
       
     
       
       
    </Content>
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


// const mapStateToProps=(state) =>{

//   return {
// stock:state.order.allProducts,
// index:state.order.productIndex
//   }
// }
export default connect(null,{})(memo(showCustomer))