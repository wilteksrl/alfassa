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
import { Divider } from 'react-native-paper'

function Priority(props) {
  //  console.log(props.priorities);
   const [Priority,setPriority]=useState()
// console.log(Priority);
let data = { }
data=props.route.params
   const items=[
    {label: 'Started', value: 0},
    {label: 'In Progress (25% Completed)', value: 25},
    {label: 'In Progress (50% Completed)', value: 50},
    {label: 'In Progress (75% Completed)', value: 75},
    {label: 'Completed', value: '100'},

  ];
  const [value, setValue] = useState(null);

// console.log(data.COMPLETION_STATUS);
    return (
        <Container>
            <Header><Nav
            centerComponent={<View  style={{marginLeft:"-105%",marginTop:8}}>
            <Typography size={19} type={"bold"} color={"textPrimary"}>Progress</Typography>
            </View> }
            /></Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />

            <Content>
         
        <View style={{marginTop:15}}>
       
        <DropDownPicker
            label={'Select Progress'}
            defaultValue={"1"}
            value={Number(data.COMPLETION_STATUS)}
            items={items}
           onValueChange={(item) => {setPriority(item)}}
          />
          


        </View></Content></Container>
    )
}

const mapStateToProps =(state)=>{

  
    return{
      components:state.ticket.components,
      priorities:state.ticket.priorities
    }
  }
      export default connect(mapStateToProps,{getComponents,addTicket,getPriorityList})(Priority)
