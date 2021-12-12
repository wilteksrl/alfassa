import React,{useEffect,useState,useCallback} from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import InputField from '../../components/CustomInputs/InputField';
import DropDownPicker from '../../components/Dropdown';
import {View, StyleSheet,TextInput} from 'react-native';
import {connect} from 'react-redux'
import Snackbar from 'react-native-snackbar';
import { Divider } from 'react-native-paper'
import Typography from '../../components/Typography/Typography';

import { useFocusEffect } from '@react-navigation/native';
import {getComponents,addTicket,getPriorityList} from "../../redux/actions/Ticket"
import Button from '../../components/CustomButtons/Button';
function CreateTicket(props) {

const [Subject,setSubject]=useState("")
const [Component,setComponent]=useState()
const [Details,setDetails]=useState("")
const [Priority,setPriority]=useState()

const [error,setError]=useState({
  priority:"",
  component:"",
  subject:"", 
  details:""
})

useFocusEffect(
  useCallback(() => {
    props.getComponents()
    props.getPriorityList()
    setError({
      subject:'',
      details:''
    })
   }, [])
 );


const createTicket=()=>{
  let required=["priority","component","subject","details"]
let hasErr=false
// const error={
//   priority:"",
//   component:"",
//   subject:"", 
//   details:""
// }
err={
  subject: '',
  details:'',
  priority:'',
  component:''
}
required.map(item=>{
  err[item]=""})
if(!Component){
   hasErr=true
err.component="Please select a component"
}

if(!Priority){
   hasErr=true
err.priority="Please select a priority"
}

if(!Subject){
   hasErr=true
err.subject="Please enter subject"
}

if(!Details){
   hasErr=true
err.details="Please enter detais"
}
setError(err)
if(!hasErr)
  {props.addTicket({
    "TICKET_COMPONENT_ID":Component,
    "TICKET_PRIORITY_ID":Priority,
    "CURRENT_STATUS":"1",	
    "TICKET_SUBJECT":Subject,
    "TICKET_DESCRIPTION":Details
  }).then((response) =>{
    props.navigation.goBack()

    setTimeout(() =>{
      Snackbar.show({
        text: 'Ticket added succesfully',
        duration: Snackbar.LENGTH_SHORT,
      });

      setPriority()
      setComponent()
      setSubject("")
      setDetails("")
    },1000)
   
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
<Header><Nav
centerComponent={<View  style={{marginLeft:"-50%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Create Support Ticket</Typography>
</View> }
/> 
</Header>
<Divider style={{ backgroundColor: 'black', height: 1 }} />

<Content>
        <View style={styles.textFields}>
            
            <DropDownPicker
            label={'Select Componant*'}
            defaultValue={'1'}
            
            items={  props.components.map(item=>{
              return({
                label: item.COMPONENT_NAME,
                value:item.COMPONENT_ID
              })
            })}
           
            onValueChange={(item) => {
           
              setComponent(item)}}
          />

{props.priorities&&<DropDownPicker
            label={'Select Priority*'}
            
            defaultValue={"1"}
            
            items={
              
             props.priorities.map(item=>{
                return({
                  label: item.TICKET_PRIORITY_DESC,
                  value:item.TICKET_PRIORITY_ID
                })
              })
           }
           onValueChange={(item) => {setPriority(item)}}
          />}
            <InputField label="Subject*"   
            value={Subject} placeholder="Type your Subject here" 
            errorMessage={error.subject}  
            onChangeText={(value) =>setSubject(value)}/>

            <InputField label="Details*" 
            multiline={true} 
            placeholder="Type your Details here"  
            numberOfLines={5} 
            errorMessage={error.details}
            value={Details}
            onChangeText={(value) =>setDetails(value)} />

         
            




        </View>

</Content>
<Footer >
<Button style={{margin:25}} title="Submit"
        onPress={() =>createTicket()}
        
        />
</Footer>

      </Container>
    )
}

const styles = StyleSheet.create({
    textFields: {
      marginTop: 30,
    }});

const mapStateToProps =(state)=>{

  
  return{
    components:state.ticket.components,
    priorities:state.ticket.priorities
  }
}
    export default connect(mapStateToProps,{getComponents,addTicket,getPriorityList})(CreateTicket)