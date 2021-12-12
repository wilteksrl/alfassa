import React, { memo, useRef, useState, useCallback } from 'react';
import { Divider } from 'react-native-paper'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
import { Icon } from 'react-native-elements';
import SmallButton from "../../components/CustomButtons/smallButton";
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,FlatList,TouchableOpacity} from 'react-native';
import TaskList from "../../components/List/TaskList"
export default function activity(props) {
    return (
        <Container>
            <Header style={{ flexDirection: 'row' }}>
                <Nav

                    centerComponent={<View  style={{marginLeft:"-90%",marginTop:8}}>
                    <Typography size={19} type={"bold"} color={"textPrimary"}>Activities</Typography>
                    </View> }
                    rightComponent={
                        <View style={{ marginLeft: -50, marginTop: 9 }}>
                            <SmallButton
                                onPress={() => props.navigation.navigate("Add Activity")}
                                title="Add Activity" type={"outline"} /></View>
                        }
                />
            </Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Content>
                <TaskList
                onPress={()=>props.navigation.navigate("Activity Detail")}
                bottomDivider/>
               
            </Content>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />
            <Footer>

            </Footer>
        </Container>
    )
}

const style = StyleSheet.create({
    addCust:{
        lineHeight:40,
        marginLeft:70
        },
})
    