import React, { memo, useRef, useState, useCallback } from 'react';
import { Divider } from 'react-native-paper'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Typography from '../../components/Typography/Typography';
import { Icon } from 'react-native-elements';
import { Text, View,Alert, StyleSheet, Image,TextInput, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/CustomButtons/Button';
import InputField from '../../components/CustomInputs/InputField';
import { connect } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {createActivity} from '../../redux/actions/Task'

const AddActivity=(props) =>{
    const [Activity, setActivity] = useState("")
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker1, setShowPicker1] = useState(false);
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());

    let data = { }
    data=props.route.params
    // console.log(date);
    onChangeCall=(res)=>{
        if(!res.didCancel){
        setImg(res)
        }
        }
// console.log(data.TASK_ID);
        const handleSubmit = () => {
            props
              .createActivity({
                ...props.activityData,
                ACTIVITY_HEADER: Activity,
                TASK_ID:data.TASK_ID,
                START_DATE: date,
                DUE_DATE:date1,
                ACTIVITY_OWNER:"",
              })
              .then((res) => {
                setTimeout(() => {
                  Snackbar.show({
                    text: 'Activity created succesfully',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                }, 200);
    
                props.navigation.goBack();
    
              })
              .catch((err) => {
                setTimeout(() => {
                  Snackbar.show({
                    text: 'Unable to create Activity',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                }, 200);
              });
         
      };
        
    // console.log(Task);
    return (

        <Container>
            <Header>
                <Nav
                    centerComponent={<View  style={{marginLeft:"-80%",marginTop:8}}>
                    <Typography size={19} type={"bold"} color={"textPrimary"}>Add Activity</Typography>
                    </View> }
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                <View style={{marginTop:15}}>
                    <InputField
                        value={Activity} placeholder="Enter Activity Name"
                        onChangeText={(value) => setActivity(value)} />
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate("Assign")}>
                <View style={{ marginTop: -5, flexDirection: 'row',marginBottom:15,marginLeft:-10 }}>
                    <Icon
                        name={"person-add-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Assign</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.8, width: '118%', marginLeft: '10%', marginTop: 3 }} />
                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        open={true}
                        minimumDate={new Date()}
                        // maximumDate={new Date()+30}
                        mode={'date'}
                        onChange={(e, val) => {
                            setShowPicker(false);

                            val && setDate(val);
                        }}
                        display="default"
                    />
                )}
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <View style={{ flexDirection: 'row',marginLeft:-11, marginTop: 15,marginBottom:15 }}>
                        <Icon
                            name={"calendar"}
                            type={"feather"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                            <View style={{ marginLeft: 15 }}>
                                <Typography size={18}>Start Date</Typography>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end' }}>
                                <Typography>{date.toDateString()}</Typography>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.7, width: '110%', marginLeft: '10%', marginTop: 3 }} />
                
                {showPicker1 && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date1}
                        open={true}
                        minimumDate={date}
                        // maximumDate={new Date()+30}
                        mode={'date'}
                        onChange={(e, val1) => {
                            setShowPicker1(false);

                            val1 && setDate1(val1);
                        }}
                        display="default"
                    />
                )}
                <TouchableOpacity onPress={() => setShowPicker1(true)}>
                    <View style={{ flexDirection: 'row',marginLeft:-10, marginTop: 15,marginBottom:15 }}>
                        <Icon
                            name={"calendar"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                            <View style={{ marginLeft: 15 }}>
                                <Typography size={18}>Due Date</Typography>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end' }}>
                                <Typography>{date1.toDateString()}</Typography>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.8, width: '118%', marginLeft: '10%', marginTop: 3 }} />
     
                <TouchableOpacity onPress={()=>props.navigation.navigate("Activity Notes")}>
                <View style={{ marginTop: 15, flexDirection: 'row',marginLeft:-10,marginBottom:15 }}>
                    <Icon
                        name={"clipboard-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10}}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Description</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '110%', marginLeft: '10%', marginTop: 3 }} />
                {/* <TouchableOpacity onPress={()=>launchImageLibrary({maxWidth:300,maxHeight:300}, onChangeCall)}>
                <View style={{ marginTop: 15, flexDirection: 'row',marginLeft:-10,marginBottom:15 }}>
                    <Icon
                        name={"attach-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Add Attachments</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.8, width: '110%', marginLeft: '10%', marginTop: 3 }} /> */}
                {/* <TouchableOpacity onPress={()=>button()}>
                <View style={{ marginTop: 10, flexDirection: 'row',marginBottom:5 }}>
                    <Icon
                        name={"trash-outline"}
                        type={"ionicon"}
                        color={"red"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18} color={"red"}>Delete</Typography>
                    </View></View></TouchableOpacity> */}
                {/* <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} /> */}
                </Content>
            <Footer>
            <Button
          style={{ margin: 24 }}
          title="Create Activity"
          
          onPress={() => handleSubmit()}/>
            </Footer>
        </Container>
    )
}
const styles = StyleSheet.create({
    input: {
        height: 100,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10,
        flex: 1,
        justifyContent:'flex-start',
        textAlignVertical:'top',
          borderWidth: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        activityData:state.task.newActivity,

    };
  };
  export default connect(mapStateToProps, { createActivity })(memo(AddActivity),);