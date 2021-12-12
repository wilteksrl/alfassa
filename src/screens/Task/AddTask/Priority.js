import React,{useEffect,useState,useCallback} from 'react'
import Container from '../../../components/Layout/container';
import Header from '../../../components/Layout/header';
import Content from '../../../components/Layout/content';
import Footer from '../../../components/Layout/footer';
import Nav from "../../../components/Headers/header"
import InputField from '../../../components/CustomInputs/InputField';
import DropDownPicker from '../../../components/Dropdown';
import {View, StyleSheet,TextInput,FlatList} from 'react-native';
import {connect} from 'react-redux'
import Snackbar from 'react-native-snackbar';
import { useFocusEffect } from '@react-navigation/native';
import {getComponents,addTicket,getPriorityList} from "../../../redux/actions/Ticket"
import Button from '../../../components/CustomButtons/Button';
import Typography from '../../../components/Typography/Typography';
import {setTaskVal} from '../../../redux/actions/Task'
const Priority=(props)=> {

   const items=[
    {label: 'High', value: "0"},
    {label: 'Medium', value: "1"},
    {label: 'Low', value: "2"}

  ];

  const  [taskData,setTaskData]=useState({
    PRIORITY:props.taskData.PRIORITY,
  })
  useFocusEffect(
    useCallback(() =>{
      setTaskData({ 
  PRIORITY:props.taskData.PRIORITY,


})
  },[])
  )
console.log(props.level);

  const setTaskVal=(data)=>{
    setTaskData({...taskData,...data})
  }

  const onClickDone=()=>{
    props.setTaskVal({
    
    
      PRIORITY:taskData.PRIORITY,
    
    })
    props.navigation.goBack()
        }




  const [value, setValue] = useState(null);

    return (
        <Container>
            <Header><Nav
            centerComponent={<View  style={{marginLeft:"-105%",marginTop:8}}>
            <Typography size={19} type={"bold"} color={"textPrimary"}>Priority</Typography>
            </View> }
            /></Header><Content>
         
        <View style={{marginTop:15}}>
       
        <DropDownPicker
            label={'Select Priority*'}
            defaultValue={"1"}
            // value={1}
            items={items}
           onValueChange={(item) => setTaskVal({PRIORITY:item})}
          />
          


        </View></Content>
        <Footer>

<Button style={{margin:24}} onPress={() =>onClickDone()} title="Done" />
</Footer>
        
        </Container>
    )
}

const mapStateToProps =(state)=>{

  
    return{
      taskData:state.task.newTask,
    }
  }
      export default connect(mapStateToProps,{setTaskVal})(Priority)
