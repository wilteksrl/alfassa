import React, { useState,useCallback } from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
import { Divider } from 'react-native-paper'
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import { View } from 'react-native';
import Button from '../../components/CustomButtons/Button';
import InputField from '../../components/CustomInputs/InputField';
import {setTaskVal} from '../../redux/actions/Task'
import {connect} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const notes=(props)=> {

    let data = { }
    data=props.route.params

    const [text, onChangeText] = useState(data.NOTES);

    const  [taskData,setTaskData]=useState(data.NOTES)
    //   useFocusEffect(
    //     useCallback(() =>{
    //       setTaskData({ 
    //         NOTES:props.taskData.NOTES,
    
    
    // })
    //   },[])
    //   )
    // console.log(props.level);
    console.log(data.NOTES);
      // const setTaskVal=(data)=>{
      //   setTaskData({...taskData,...data})
      // }
    
      const onClickDone=()=>{
        props.setTaskVal({
        
        
            NOTES:taskData.NOTES,
        
        })
        props.navigation.goBack()
            }
    
            console.log("taskdata    "+taskData);


    // console.log(text);
    return (
        <Container>
            <Header>
                <Nav
                    centerComponent={<View  style={{marginLeft:"-100%",marginTop:8}}>
                    <Typography size={19} type={"bold"} color={"textPrimary"}>Notes</Typography>
                    </View>}
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                <View>
                    <TextInput
                        multiline
                        numberOfLines={30}
                        // editable
                        placeholder={"Enter Notes Here"}
                        style={styles.input}
                        value={data.NOTES}
                        onChangeText={(value)=>onChangeText({NOTES:value})}
                    />
                </View>
            </Content>
            <Footer>
            <Button style={{margin:24}} onPress={() =>onClickDone()} title="Done" />

            </Footer>
        </Container>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 500,
        marginLeft: -10,
        marginRight: -10,
        flex: 1,
        justifyContent:'flex-start',
        textAlignVertical:'top'
        //   borderWidth: 1,
    },
});


const mapStateToProps =(state)=>{

  
    return{
      taskData:state.task.newTask,
    }
  }
      export default connect(mapStateToProps,{setTaskVal})(notes)
