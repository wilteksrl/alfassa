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

export default function AddActivity(props) {
    const [Task, setTask] = useState("")
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [resImg,setImg]=useState(null)
    const [text, onChangeText] = useState("");

    button=()=> {
        Alert.alert(
          'Delete',
          'Are You Sure To Delete',
          [
            {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => console.warn('YES Pressed')},
          ],
          { cancelable: true }
        );
        };
    // console.log(date);
    onChangeCall=(res)=>{
        if(!res.didCancel){
        setImg(res)
        }
        }

        
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
                        <Typography size={19} type={"bold"} color={"textPrimary"}>Activity 1</Typography>
                    </View>
                </View>}
                    // centerComponent={<View  style={{marginLeft:"-80%",marginTop:8}}>
                    // <Typography size={19} type={"bold"} color={"textPrimary"}>Add Activity</Typography>
                    // </View> }
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                {/* <View style={{ marginTop: -40 }}>
                    <InputField
                        value={Task} placeholder="Enter Activity Name"
                        onChangeText={(value) => setTask(value)} />
                </View> */}
                <TouchableOpacity onPress={()=>props.navigation.navigate("Assign")}>
                <View style={{ marginTop: 25, flexDirection: 'row',marginBottom:15 }}>
                    <Icon
                        name={"person-add-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Assign</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
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
                    <View style={{ flexDirection: 'row', marginTop: 15,marginBottom:15 }}>
                        <Icon
                            name={"calendar"}
                            type={"feather"}
                            style={{ alignItems: 'flex-start', marginLeft: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>
                            <View style={{ marginLeft: 15 }}>
                                <Typography size={18}>Due Date</Typography>
                            </View>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignContent: 'flex-end', marginLeft: '39%' }}>
                                <Typography>{date.toDateString()}</Typography>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <View style={{ marginTop: 15, flexDirection: 'row',marginBottom:15 }}>
                    <Icon
                        name={"slash"}
                        type={"feather"}
                        style={{ alignItems: 'flex-start', marginLeft: 10,transform: [{rotate:'-45deg'}] }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Progress</Typography>
                    </View></View>
                <Divider style={{ backgroundColor: 'grey', height: 0.5, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={()=>props.navigation.navigate("Activity Notes")}>
                <View style={{ marginTop: 15, flexDirection: 'row',marginBottom:15 }}>
                    <Icon
                        name={"clipboard-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10}}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Notes</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={()=>launchImageLibrary({maxWidth:300,maxHeight:300}, onChangeCall)}>
                <View style={{ marginTop: 15, flexDirection: 'row',marginBottom:15 }}>
                    <Icon
                        name={"attach-outline"}
                        type={"ionicon"}
                        style={{ alignItems: 'flex-start', marginLeft: 10 }}
                    /><View style={{ marginLeft: 15 }}>
                        <Typography size={18}>Add Attachments</Typography>
                    </View></View></TouchableOpacity>
                <Divider style={{ backgroundColor: 'grey', height: 1, width: '88%', marginLeft: '12%', marginTop: 3 }} />
                <TouchableOpacity onPress={()=>button()}>
                <View style={{ marginTop: 15, flexDirection: 'row',marginBottom:15 }}>
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