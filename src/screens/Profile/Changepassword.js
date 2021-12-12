import React,{useState} from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Nav from "../../components/Headers/header"
import Content from '../../components/Layout/content';
import Typography from '../../components/Typography/Typography';
import {View} from 'react-native';
import InputField from "../../components/CustomInputs/InputField";
import TextInput from '../../components/CustomInputs/PasswordField';
import Footer from '../../components/Layout/footer';
import Button from '../../components/CustomButtons/Button';
import Snackbar from 'react-native-snackbar';
import {changePassword} from "../../redux/actions/Auth"
import { Divider } from 'react-native-paper'

import {connect} from "react-redux"
 function Changepassword(props) {

const [currentPassword,setCurrentPassword]=useState("")
const [newPassword,setNewPassword]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")
const [errmsg,setErrMessage]=useState("")

const submit=()=>{
setErrMessage("")
let hasError=false
  if(newPassword!==confirmPassword){
setErrMessage("Password does not match")
hasError=true
  }

  if(!hasError){
    props.changePassword(currentPassword,newPassword).then(res=>{
      if(res==200)

     { 
       props.navigation.goBack()
      setTimeout(()=>{
        Snackbar.show({
          text: 'Password Updated succesfully',
          duration: Snackbar.LENGTH_SHORT,
        })

      },200)}
      else
      setErrMessage("Current password does not match with new password")
    }).catch(err=>{

      setTimeout(()=>{
        Snackbar.show({
          text: 'Caught some error , Please try again later!',
          duration: Snackbar.LENGTH_SHORT,
        })

      },200)

    })
  }
}

    return (
      <Container>
        <Header>
        <Nav/>
        </Header>
        <Divider style={{ backgroundColor: 'black', height: 1 }} />

        <Content>
        <View style={{marginTop:32}}>
        <Typography size={24} type="extraBold" >Reset Password</Typography>
        <View style={{marginTop:20}}>
        <TextInput placeholder="Current Password" onChangeText={(txt)=>setCurrentPassword(txt)}/>
        <TextInput placeholder="New Password" onChangeText={(txt)=>setNewPassword(txt)}/>
        <TextInput placeholder="Confirm Password" onChangeText={(txt)=>setConfirmPassword(txt)}/>
        </View>
        </View>

        <Typography style={{marginLeft:12}} size={12} color="red">{errmsg}</Typography>
        </Content>
     <Footer actionButton>
         <Button title="Reset Password" disabled={currentPassword==""||newPassword==""||confirmPassword==""} onPress={()=>submit()} />
     </Footer>
      </Container>
    )
}


export default connect(null,{changePassword})(Changepassword)