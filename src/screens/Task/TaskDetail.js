import React, { memo, useRef, useState, useCallback } from 'react';
import { Divider } from 'react-native-paper'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Typography from '../../components/Typography/Typography';
import { Icon } from 'react-native-elements';
import { Text, View, Alert, StyleSheet, Image, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/CustomButtons/Button';
import {connect} from "react-redux"
import Snackbar from 'react-native-snackbar';
import DocumentPicker from 'react-native-document-picker';

import {deleteTask} from "../../redux/actions/Task"
const TaskDetail=(props)=> {

openDocument=async()=>{
    try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
        });
        for (const res of results) {
          console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
          );
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
}


    // let priority = data.PRIORITY="0"?"High":data.PRIORITY="1"?"Medium":"Low"
    let data = { }
    data=props.route.params

    const handleSubmit=()=>{
        props.deleteTask(
            data.TASK_ID
        ).then((res) => {
            setTimeout(() => {
              Snackbar.show({
                text: 'Task Delete Succesfully',
                duration: Snackbar.LENGTH_SHORT,
              });
            }, 200);
        
            props.navigation.goBack();
        
            // props.getClaims(1);
          })
              }

              const activity=()=>{
                  if(Number(data.NO_OF_ACTIVITIES)<1){
                    props.navigation.navigate("activity",props.route.params)
                  }
                  else{props.navigation.navigate("Add Activity",props.route.params)}
              }
              
    button = () => {
        Alert.alert(
            'Delete',
            'Are You Sure To Delete',
            [
                { text: 'NO', onPress: ()=>{}, style: 'cancel' },
                { text: 'YES', onPress: () => handleSubmit() },
            ],
            { cancelable: true }
        );
    };
    // console.log(date);
    onChangeCall = (res) => {
        if (!res.didCancel) {
            setImg(res)
        }
    }
// console.log("params "+);
console.log(props.route.params);
    // console.log(Task);
    return (

        <Container>
            <Header>
                <Nav

                    leftComponent={<View style={{ marginTop: 8, flexDirection: 'row', marginRight: '-100%' }}><Icon onPress={() => {
                        props.navigation.goBack();
                    }}
                        name="chevron-left" type={"feather"} size={30} style={{ marginLeft: 10 }} />
                        <View style={{ marginTop: 3, marginLeft: 2 }}>
                            <Typography size={19} type={"bold"} color={"textPrimary"}>Task Detail</Typography>
                        </View>
                    </View>}
                // centerComponent={<View style={{ marginLeft: "-90%", marginTop: 8 }}>
                //     <Typography size={19} type={"bold"} color={"textPrimary"}>Task 1</Typography>
                // </View>}
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                {/* <View style={{ marginTop: -40 }}>
                    <InputField
                        value={Task} placeholder="Enter Task Name"
                        onChangeText={(value) => setTask(value)} />
                </View> */}
                <View style={{ marginTop: 25, flexDirection: 'row', marginBottom: 15,marginLeft:-2 }}>
                    <Icon
                        name={"document-text-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>{data.TASK_NAME}</Typography>
                    </View></View>
                <Divider style={{ backgroundColor: 'grey', height: 0.7, width: '88%', marginLeft: '12%', marginTop: 3 }} />

                <TouchableOpacity onPress={() => props.navigation.navigate("Assigndetail",props.route.params)}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"person-add-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Assign</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end'}}>
                            <Typography>{Number(data.ASSIGNED_TO.length)} Employee</Typography>
                        </View>
                    </View>
                        </View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.7, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                    <Icon
                        name={"calendar"}
                        type={"feather"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Start Date</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end'}}>
                            <Typography>{new Date(data.START_DATE).toDateString()}</Typography>
                        </View>
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'grey', height: 0.7, width: '88%', marginLeft: '12%', marginTop: 3 }} />


                {/* <TouchableOpacity onPress={() => setShowPicker(true)}> */}
                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                    <Icon
                        name={"calendar"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Due Date</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end'}}>
                            <Typography>{new Date(data.DUE_DATE).toDateString()}</Typography>
                        </View>
                    </View>
                </View>
                {/* </TouchableOpacity> */}
                <Divider style={{ backgroundColor: 'grey', height: 0.7, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={() => props.navigation.navigate("PriorityDetail",props.route.params)}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"alert-circle-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Priority</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end'}}>
                            <Typography>{data.PRIORITY==="0"?"High":data.PRIORITY==="1"?"Medium":"Low"}</Typography>
                        </View>
                    </View>
                        </View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={()=>props.navigation.navigate("Progress",props.route.params)}>
                <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                    <Icon
                        name={"slash"}
                        type={"feather"}
                        style={{ alignItems: 'flex-start', marginLeft: 10, transform: [{ rotate: '-45deg' }] }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' ,flex:1}}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Progress</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end' }}>
                            <Typography>{data.COMPLETION_STATUS==="0"?"Started":data.COMPLETION_STATUS==="100"?"Completed":"In Progress"}</Typography>
                        </View>
                    </View>
                    </View>
                    </TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.8, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={() => props.navigation.navigate("notesDetail",props.route.params)}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"clipboard-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        /><View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Notes</Typography>
                        </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 0.5, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={() => activity()}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"list-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' ,flex:1}}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Activity</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end' }}>
                            <Typography>{Number(data.NO_OF_ACTIVITIES)}</Typography>
                        </View>
                    </View>
                        </View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={() => openDocument()}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"attach-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        /><View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Add Attachments</Typography>
                        </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={()=>props.navigation.navigate("colorDetail",props.route.params)}>
                    <View style={{ marginTop: 15, flexDirection: 'row', marginBottom: 15 }}>
                        <Icon
                            name={"pricetag-outline"}
                            type={"ionicon"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between',flex:1 }}>
                        <View style={{ marginLeft: 15 }}>
                            <Typography size={18}>Label</Typography>
                        </View>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end'}}>
                            <Typography>{data.COLOR==11?"Red":data.COLOR==12?"Green":data.COLOR==13?"Blue":data.COLOR==14?"Yellow":data.COLOR==15?"Aqua":"Grey"}</Typography>
                        </View>
                    </View>
                        </View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={() => button()}>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Icon
                            name={"trash-outline"}
                            type={"ionicon"}
                            color={"red"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        /><View style={{ marginLeft: 15 }}>
                            <Typography size={18} color={"red"}>Delete</Typography>
                        </View></View></TouchableOpacity>
                {/* <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} /> */}
            </Content>

            <Footer>
                <Button style={{ margin: 25 }} title="Save">
                    {/* // onPress={() => onSave()} */}

                </Button>
            </Footer>
        </Container>
    )
}


const mapStateToProps=(state)=>{
    return {
    delete:state.task.deletetask,
    }
}
export default connect(mapStateToProps,{deleteTask})(memo(TaskDetail));
