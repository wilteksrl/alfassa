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
import {setActivityVal} from '../../redux/actions/Task'
import {connect} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

const ActivityNotes=(props)=> {
    const [activitytext, onChangeText] = useState("");

    const  [activityData,setActivityData]=useState({
        ACTIVITY_DESCRIPTION:props.activityData.ACTIVITY_DESCRIPTION,
      })
      useFocusEffect(
        useCallback(() =>{
            setActivityData({ 
                ACTIVITY_DESCRIPTION:props.activityData.ACTIVITY_DESCRIPTION,
    
    
    })
      },[])
      )
    // console.log(props.level);
    
      const setActivityVal=(data)=>{
        setActivityData({...activityData,...data})
      }
    
      const onClickDone=()=>{
        props.setActivityVal({
        
        
            ACTIVITY_DESCRIPTION:activityData.ACTIVITY_DESCRIPTION,
        
        })
        props.navigation.goBack()
            }
    
        return (
        <Container>
            <Header>
                <Nav
                    centerComponent={<View  style={{marginLeft:"-90%",marginTop:8}}>
                    <Typography size={19} type={"bold"} color={"textPrimary"}>Description</Typography>
                    </View>}
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                <View>
                    <TextInput
                        multiline
                        numberOfLines={30}
                        editable
                        placeholder={"Enter Activity Notes Here"}
                        style={styles.input}
                        onChangeText={(value)=>setActivityVal({ACTIVITY_DESCRIPTION:value})}
                        // value={activitytext}
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
      activityData:state.task.newActivity,
    }
  }
      export default connect(mapStateToProps,{setActivityVal})(ActivityNotes)