import React, {memo,useState,useCallback} from 'react';
import {ThemeProvider} from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../../components/Background';
import Container from '../../../components/Layout/container';
import Header from '../../../components/Layout/header';
import Content from '../../../components/Layout/content';
import Footer from '../../../components/Layout/footer';
import {Icon} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import StockList from '../../../components/List/StockList';
import Employee from "../../../components/List/Employee";
import AvatarWithMore from '../../../components/List/AvatarWithMore';
import  Search from '../../../components/CustomInputs/SearchField';
import Typography from '../../../components/Typography/Typography';
import Nav from "../../../components/Headers/header"
import {connect} from "react-redux"
import { Divider } from 'react-native-paper'
import MultiSelect from 'react-native-multiple-select';

const showCustomer = (props) =>{ 
  const [searchKey,setSearch]=useState(null)
  useFocusEffect(
    useCallback(() => {
      setSearch("")
     }, [])
   );
// console.log(props.index);

  console.log(props.employee);
  let employeeData=searchKey&&props.index?
  props.index.search(searchKey):props.employee

  const renderItem = ({ item }) => {
    item=searchKey?item.item:item
 
  
    return(
    


    
<Employee
             bottomDivider
         name={item.EMP_NAME}


         />
    )
  }

  // const item=[renderItem]

// console.log((item,index) => item.EMP_NAME+index.toString());
  return(
     <Container>
    <Header >
<Nav 
centerComponent={<View  style={{marginLeft:"-95%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Employee</Typography>
</View>}
/>
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

  <Content fixed>

      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search
         placeholder="Search Employee"
         value={searchKey}
         onChangeText={txt=>setSearch(txt)}/>
         </View>
<View style={{flex:1}}>
<FlatList
      
      data={employeeData}
      renderItem={renderItem}
      keyExtractor={(item,index) => item.EMP_NAME+index.toString()}
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


const mapStateToProps=(state) =>{

  return {
employee:state.task.employee,
index:state.task.employeeIndex
  }
}
export default connect(mapStateToProps,{})(memo(showCustomer))