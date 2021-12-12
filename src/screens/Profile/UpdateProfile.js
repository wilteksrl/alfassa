import React,{useState,useCallback} from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import { useFocusEffect } from '@react-navigation/native';
// import SmallBanner from "../../components/Misc/SmallBanner"
import { Divider } from 'react-native-paper'

import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
// import Avatarwithouter from '../../components/List/Avatarwithouter';
// import HollowButton from "../../components/CustomButtons/HollowButton"
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import {Avatar} from "react-native-elements"
import InputField from '../../components/CustomInputs/InputField';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from '../../components/CustomButtons/Button';
import Listitems from "../../components/List/Listitems"
import {connect} from "react-redux"
import Snackbar from 'react-native-snackbar';
import {changeDetails} from "../../redux/actions/Auth"
 function Profile(props) {

const [mob,setMob]=useState(props.details.EMP_MOBILE_NO)
const [resImg,setImg]=useState(null)
const [error, setError] = useState({mob: ''})

useFocusEffect(
  useCallback(() => {
    setMob(props.details.EMP_MOBILE_NO)
    
    setImg(null)
   }, [])
 );
console.log(props.details);

onChangeCall=(res)=>{
if(!res.didCancel){
setImg(res)
}
}

onSave=()=>{
   
  let required=["mob"]  
  let hasErr=false
  err={
    mob: ''}

    required.map(item=>{
      err[item]=""})

      if(mob&&mob.length!==10){
        hasErr=true
        err.mob="Please enter valid mobile number"
      }

      setError(err)
   
      if(!hasErr){
    props.changeDetails(resImg,mob).then(res=>{
        setTimeout(() =>{

            Snackbar.show({
              text: 'Details saved successfully',
              duration: Snackbar.LENGTH_SHORT,
            })
          },1000)
    })
}}


    return (
      <Container>
          <Header>
              <Nav
              centerComponent={<View  style={{marginLeft:"-108%",marginTop:8}}>
              <Typography size={19} type={"bold"} color={"textPrimary"}>Profile</Typography>
              </View> }
              // title={"Profile"}
              />
          </Header>
          <Divider style={{ backgroundColor: 'black', height: 1 }} />

<Content>

<View style={{justifyContent:"center",alignContent:'center',alignItems:'center',marginTop:10}}>
<Avatar
size={130}
overlayContainerStyle={{backgroundColor: 'blue'}}
rounded
title="MT"
 source={{
    uri:
    resImg?resImg.uri:props.details.EMP_IMAGE?"http://apps.insecticidesindia.com:8030/storage/"+props.details.EMP_IMAGE: 'https://www.clearmountainbank.com/wp-content/uploads/2020/04/male-placeholder-image.jpeg',
  }}
>
<Avatar.Accessory brand="FontAwesome" name="edit" onPress={()=>launchImageLibrary({maxWidth:300,maxHeight:300}, onChangeCall)}  size={40}
/>

</Avatar>

<Typography size={26} style={{marginTop:16}} type="bold">{props.details.EMP_NAME}</Typography>
<Typography size={15}>Manager</Typography>
</View>
<View style={{marginTop:24}}>
    
<InputField label="Mobile*" 
        value={mob}
        errorMessage={error.mob}
          keyboardType={"number-pad"}
          placeholder="Enter Mobile Number"
          onChangeText={(value) =>setMob(value)}
          />
</View>
</Content>
<Footer >
    <Button style={{margin:25}} title="Save"
    

    onPress={()=>onSave()}
    
    >

    </Button>
</Footer>

      </Container>
    )
}
const mapStateToProps=(state)=>{
    return {
        details:state.auth.details
    }
}

export default connect(mapStateToProps,{changeDetails})(Profile)