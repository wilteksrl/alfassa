import React, {memo,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/Background';
import { Divider } from 'react-native-paper'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon} from 'react-native-elements';
import SmallButton from "../../components/CustomButtons/smallButton";
import {setCustomer} from "../../redux/actions/Order"
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import AvatarList from '../../components/List/AvatarList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {getCustomers} from "../../redux/actions/Customer"
import {connect} from "react-redux"

const showCustomer = (props) => {
  const [searchKey,setSearch]=useState(null)
const [refresh,setRefresh] = useState(false)
let dictio={
  FAR:"green",
  RET:"primary",
  DIS:"yellow",
}
console.log(props.customers);
useFocusEffect(
  useCallback(() => {
    setSearch("")
   }, [])
 );

const selectCust=(item)=>{
  if(props.route.params&&props.route.params.selectMode){
    props.setCustomer(item)
    props.navigation.goBack()
  }
  else
  {
    props.navigation.navigate("Customer Details",{...item})
  }
}

const loadCustomer=() =>{
  setRefresh(true)
  props.getCustomers().then((customers)=>{
    setRefresh(false)
  }).catch((err)=>{
    setRefresh(false)
  })
}

  const renderItem = ({ item }) => {

     item=searchKey?item.item:item
    return(
    <AvatarList
    onPress={() =>selectCust(item)}
    bottomDivider
    name={item.CUSTOMER_NAME}
    subtitle={item.REGION}
    subtitle1={item.CUSTOMER_ID}
    badgeText={item.TYPE}
    badgeColor={dictio[item.TYPE_CODE]}

    />
  )}


  let customersData=searchKey&& props.index?
  props.index.search(searchKey):props.customers
  


  
  return(
     <Container>
    <Header >
<Nav 
centerComponent={<View style={{marginLeft:"-97%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Customers</Typography>
</View>}
   rightComponent={
    <View style={{marginLeft:-70,marginTop:9}}>
    <SmallButton 
onPress={()=> props.navigation.navigate("Add customer")} 
    title="Add Customer" type={"outline"}/></View>
    }
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

 {props.customers&&props.customers.length>0?   <Content fixed >
    {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Customers </Typography>

        <TouchableOpacity onPress={()=> props.navigation.navigate("Add customer")}>
        <Typography size={12} style={styles.addCust} color={"primary"}>Add Customer </Typography>
        </TouchableOpacity>
      
        </View> */}
      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         value={searchKey}
         onChangeText={txt=>setSearch(txt)}
         
         />
         </View>
         {/* <Divider style={{ backgroundColor: 'black', height: 0.8 }} /> */}

<View  style= {{flexDirection:"column",flex:1}}>
         <FlatList
       refreshing={refresh}
       onRefresh={()=>loadCustomer()}
        data={customersData}
        renderItem={renderItem}
        keyExtractor={(item,index) => item.CUSTOMER_ID+index.toString()}
      />
   
   </View>  
    </Content>:<Content style={{backgroundColor:"white"}}><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/customer.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Customer Found</Typography></View></View></Content>}
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
    customers:state.cutomers.customers,
    index:state.cutomers.customerIndex
  }
}
export default connect(mapStateToProps,{setCustomer,getCustomers})(memo(showCustomer));