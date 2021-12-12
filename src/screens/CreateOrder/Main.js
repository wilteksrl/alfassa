import React, {memo,useState} from 'react';
import {connect} from "react-redux"
import {ThemeProvider} from 'react-native-elements';
import SearchField from '../../components/CustomInputs/SearchField';
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import CustomerSelect from "./CustomerSelect"
import PlantSelect from "./PlantSelect"
import AddSku from "./AddSku"
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import SmallButton from "./../../components/CustomButtons/smallButton";
import { Divider } from 'react-native-paper'

import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../components/Typography/Typography';
import TextInput from '../../components/CustomInputs/PasswordField';
import IconButton from '../../components/CustomButtons/IconButton';
import {Icon} from 'react-native-elements';
import {theme} from '../../config/theme';
import Nav from '../../components/Headers/header';
import {BlurView} from '@react-native-community/blur';
import PhoneNumberInput from '../../components/CustomInputs/PhoneInput';
import {BoxShadow} from 'react-native-shadow';
import Button from '../../components/CustomButtons/Button';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {reinit,createOrder} from "../../redux/actions/Order"
import Preview from "./Preview"
import Snackbar from 'react-native-snackbar';
const LoginScreen = (props) =>{ 
const [active,setActive]=useState(0)
const handleNext=()=>{
  if(active<3){
    setActive(active+1)
  }
  else{
    props.createOrder().then(()=>{
      
      props.navigation.navigate("My Order")
      setTimeout(() =>{

        Snackbar.show({
          text: 'Order Created Successfully',
          duration: Snackbar.LENGTH_SHORT,
        })
      },1000)

      setActive(0)
    }).catch(err =>{
      Snackbar.show({
        text: 'Unable to create order.Try again!',
        duration: Snackbar.LENGTH_SHORT,
      })
    })
  }
}

const handleBack=()=>{
  if(active>0){
    setActive(active-1)
  }

}

let disabled=()=>{
  if(active==0&&props.customer){
    return false
  }
  else if(active==1&&props.plant){
    return false
  }
  else if(active==2&&props.cart.length){
    return false
  }
  else if(active==3){
    return false
  }
  else
  return true
}



  return(
  <Container>
    <Header>
      <Nav
       
       centerComponent={<View style={{marginLeft:"-80%",marginTop:8}}>
        <Typography size={19} type={"bold"} color={"textPrimary"}>Create Order</Typography>
        </View>}
       
        rightComponent={
        //   <TouchableOpacity onPress={()=>{props.reinit();setActive(0)}}>
        //   <Typography
        //  style={{width:63}}
        //     size={14}
          
        //   >
        //       Cancel
        //       </Typography>
        //       </TouchableOpacity>
        <View style={{marginLeft:-10,marginTop:9}}>
        <SmallButton 
        onPress={() =>{props.reinit();setActive(0)}}
     
        title="Cancel" type={"outline"}/></View>
        }
       
       
      />
    </Header>
    <Divider style={{ backgroundColor: 'black', height: 1 }} />

    <Content fixed>

   

      <View style={{flex: 1}}>
        <ProgressSteps

         topOffset={16}
          activeStepIconBorderColor={theme.colors.primary}
          completedProgressBarColor={theme.colors.primary}
          completedStepIconColor={theme.colors.primary}
          activeLabelColor={theme.colors.textPrimary}
          labelFontSize={10}
          activeStep={active}
          marginBottom={40}
          >
          <ProgressStep label="Select Customer" removeBtnRow>

            <ScrollView contentContainerStyle={{alignItems: 'center',flex:1,flexDirection: 'row'}}>
           <CustomerSelect customer={props.customer}/>

            </ScrollView>
          </ProgressStep>
          <ProgressStep label="Select Plant" removeBtnRow>
            <View style={{alignItems: 'center',flex:1,flexDirection: 'row'}}>

            <PlantSelect plant={props.plant}/>

            </View>
          </ProgressStep>
          <ProgressStep label="Add Products" removeBtnRow>
            <View style={{alignItems: 'center',flex:1,flexDirection: 'row'}}>
        <AddSku/>
            </View>
          </ProgressStep>
          <ProgressStep label="Review" removeBtnRow>
            <View >

<Preview plant={props.plant} customer={props.customer} cart={props.cart}/>

            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </Content>
 <Footer >
   <View style={{flexDirection: 'row',margin:24}}>
    {active!==0&& <View style={{flex:1,marginRight:8}}>
     <Button    type="outline"  titleStyle={{color: theme.colors.primary}} title="Back" onPress={()=>{handleBack()}}/>

     </View>}
      <View style={{flex:1,marginLeft:8}}>
      <Button title={active==3?"Confirm":"Next" } onPress={()=>handleNext()} disabled={disabled()}/>
      </View>

 
 
   </View>

 </Footer>
  </Container>
);
}
const styles = StyleSheet.create({
  ProductList: {
    flex: 1,
  },

  inputView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    lineHeight: 40,
    marginLeft: 10,
    marginTop: 20,
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomButton: {
    width: '100%',
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'flex-end',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  buttonCard: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  recentProducts: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 45,
    marginLeft: 5,
  },
  recent: {
    marginBottom: 10,
  },
  listFlat: {
    paddingBottom: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const mapStateToProps=(state)=>{
  return{
    customer:state.order.customer,
    plant:state.order.plant,
    cart:state.order.products
  }
}

export default connect(mapStateToProps,{reinit,createOrder})(memo(LoginScreen));
