import React, { memo,useState } from 'react';
import Selector from "../../components/Misc/Selector"
import {
    Text,
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native';
import Employee from "../../components/List/Employee"
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from "../../components/Typography/Typography";
import { Icon } from 'react-native-elements';
import Cards from "../../components/Misc/DataCard"
import { Divider } from 'react-native-paper'
import PlantSelect from "../CreateOrder/PlantSelect"
const LoginScreen = (props) => {
// const[Employee,setEmployee]=useState("")
let data = { }
data=props.route.params

console.log(data.ASSIGNED_TO);


// console.log(props.employee);
let employeedata=data.ASSIGNED_TO

const renderItem = ({ item }) => {item

  return(

<Employee
           bottomDivider
       name={item.EMP_NAME}


       />
  )
}
    return (
        <Container>
            <Header><Nav
                centerComponent={<View style={{ marginLeft: "-100%", marginTop: 8 }}>
                    <Typography size={19} type={"bold"} color={"textPrimary"}>Assign</Typography>
                </View>}
            /></Header>
            <Divider style={{ backgroundColor: 'black', height: 1 }} />

            <Content>
                <View style={{marginTop:10}}>
                    <Selector
                        leftIcon={
                            <Icon
                                type={"feather"}

                                size={30}
                                name={"user"}
                            />
                        }
                        // value={props.plant?props.plant.PLANT_DESCRIPTION:""}
                        nav="Employee"
                        placeholder={"Select Employee"}
                    />


                </View>
                <Divider style={{ backgroundColor: 'grey', height: 0.7}} />
                <View style={{flex:1}}>
<FlatList
      
      data={employeedata}
      renderItem={renderItem}
      keyExtractor={(item,index) => item.EMP_NAME+index.toString()}
    />
</View>

            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1
        height: 10
    },
    CardContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 32
    },

    dues: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32
    }
});

export default memo(LoginScreen);
