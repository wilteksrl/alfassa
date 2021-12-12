import React, {memo, useState} from 'react';
import {ThemeProvider} from 'react-native-elements';

import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../../components/Typography/Typography';
import TextInput from '../../components/CustomInputs/PasswordField';
import Button from '../../components/CustomButtons/Button';
import InputField from '../../components/CustomInputs/InputField';
import {connect} from "react-redux"
import api from '../../utils/api';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {Login} from "../../redux/actions/Auth"
const LoginScreen = (props) => {
  let [empId, setEmpId] = useState('');


  let [password, setPassword] = useState('');

  
let [err,seterr]=useState({
  Eid:null,
  Pass:null
})
const performLogin=async()=>{


  seterr({...err,Eid:!empId?"Please enter Employee Id":"",Pass:!password?"Please enter Password":""})




if(empId&&password)
  {
  
    props.Login(empId,password).then(res=>{
      if(res==200){
        setTimeout(()=>{Snackbar.show({
          text: 'Login succesfully',
          duration: Snackbar.LENGTH_SHORT,
        });},100)
      }
      else{
        setTimeout(()=>{Snackbar.show({
          text: 'Invalid username or password',
          duration: Snackbar.LENGTH_SHORT,
        });},100)
      }
    }).catch(err=>{
      if(err==404)
      setTimeout(()=>{Snackbar.show({
        text: 'Invalid username or password',
        duration: Snackbar.LENGTH_SHORT,
      });},100)
      else
      setTimeout(()=>{Snackbar.show({
        text: 'Server error',
        duration: Snackbar.LENGTH_SHORT,
      });},100)
    })
  
  }
  else{
    Snackbar.show({
      text: 'Please fill all required fields',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
}



  return (
    <Container>
      <Header />
      <Content>
        <View style={{justifyContent:'flex-start',marginTop:60}}>
          <Image
          style={{width:'100%',height:95}}
          source={require('../../assets/images/logo.png')}
          />
        </View>
        <View style={styles.inputView}>
          <Typography size={24} type={'bold'} style={styles.title}>
            Sign in
          </Typography>
          <Typography
            size={12}
            type={'regular'}
            color={'textSecondary'}
            style={styles.subtitle}>
            Enter your Employee ID and Password
          </Typography>

          <InputField 
          
          label="Employee Id" 
          errorMessage={err.Eid}
     
          placeholder="Enter Employee Id" 
          onChangeText={text => setEmpId(text)}
          
          
          />
          <View style={{marginTop: 0}}>
            <TextInput placeholder="********" label="Password"
                 errorMessage={err.Pass}
                 errorStyle={{marginBottom:16,paddingTop:0,marginTop:10}}
            onChangeText={text => setPassword(text)}
            />
            <View style={styles.forgetPass}>
              <Typography size={12} type={'semiBold'} color={'textSecondary'}>
                Forget Password?
              </Typography>
            </View>
          </View>

          <Button style={{marginTop: 20}} title="Log In" onPress={()=>performLogin()} />
        </View>
      </Content>
      <Footer></Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  inputView: {
    // flex: 1,
    marginTop:80,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
  },
  subtitle: {
    marginBottom: 30,
    marginLeft: 10,
    marginTop: 8,
  },
  forgetPass: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tinyLogo: {
    height: 50,
    marginTop: 40,
    resizeMode: 'contain',
  },
  image: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default connect(null,{Login})(memo(LoginScreen));
