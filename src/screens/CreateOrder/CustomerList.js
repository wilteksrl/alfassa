import React, {memo} from 'react';
import {ThemeProvider} from 'react-native-elements';

import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {Icon,Divider} from 'react-native-elements';
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList} from 'react-native';
import AvatarList from '../../components/List/AvatarList';
import AvatarWithMore from '../../components/List/AvatarWithMore';
import  Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import {connect} from "react-redux"

const showCustomer = ({navigation,customers}) => {
  

let dictio={
  FAR:"green",
  RET:"primary",
  DIS:"yellow",
}

  const renderItem = ({ item }) => (
    <AvatarList
    onPress={() =>navigation.navigate("Customer Details",{...item})}
    bottomDivider
    name={item.CUSTOMER_NAME}
    subtitle={item.CUSTOMER_CITY}
    badgeText={item.TYPE}
    badgeColor={dictio[item.TYPE_CODE]}

    />
  );

  
  
  return(
     <Container>
    <Header >
<Nav 

  
/>
    </Header>
    <Content fixed >
    <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Customers </Typography>
        <Typography size={12} style={styles.addCust} color={"primary"}>Add Customer </Typography>
        </View>
      
         <View style= {{marginTop:16,marginBottom:16}}>
         <Search/>
         </View>
<View  style= {{flexDirection:"column",flex:1}}>
         <FlatList
      
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.CUSTOMER_ID}
      />
   
   </View>  
    </Content>
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
    customers:state.cutomers.customers
  }
}
export default connect(mapStateToProps,{})(memo(showCustomer));