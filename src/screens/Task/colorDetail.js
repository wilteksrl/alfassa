import React,{useEffect,useState,useCallback} from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import InputField from '../../components/CustomInputs/InputField';
import DropDownPicker from '../../components/Dropdown';
import {View, StyleSheet,TextInput,FlatList} from 'react-native';
import {connect} from 'react-redux'
import Snackbar from 'react-native-snackbar';
import { useFocusEffect } from '@react-navigation/native';
import {getComponents,addTicket,getPriorityList} from "../../redux/actions/Ticket"
import Button from '../../components/CustomButtons/Button';
import Typography from '../../components/Typography/Typography';
import {setTaskVal} from '../../redux/actions/Task'
const Color=(props)=> {
  let data = { }
  data=props.route.params
   const items=[
    {label: 'Red', value: 11},
    {label: 'Green', value: 12},
    {label: 'Blue', value: 13},
    {label: 'Yellow', value: 14},
    {label: 'Aqua', value: 15},
    {label: 'Grey', value: 16},

  ];

  const  [taskData,setTaskData]=useState({
    COLOR:props.taskData.COLOR,
  })
  useFocusEffect(
    useCallback(() =>{
      setTaskData({ 
        COLOR:props.taskData.COLOR,


})
  },[])
  )
// console.log(props.level);

  const setTaskVal=(data)=>{
    setTaskData({...taskData,...data})
  }

  const onClickDone=()=>{
    props.setTaskVal({
    
    
        COLOR:taskData.COLOR,
    
    })
    props.navigation.goBack()
        }




  const [value, setValue] = useState(null);

    return (
        <Container>
            <Header><Nav
            centerComponent={<View  style={{marginLeft:"-105%",marginTop:8}}>
            <Typography size={19} type={"bold"} color={"textPrimary"}>Labels</Typography>
            </View> }
            /></Header><Content>
         
        <View style={{marginTop:15}}>
       
        <DropDownPicker
            label={'Select Label'}
            defaultValue={"1"}
            value={Number(data.COLOR)}
            items={items}
           onValueChange={(item) => setTaskVal({COLOR:item})}
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
      export default connect(mapStateToProps,{setTaskVal})(Color)
