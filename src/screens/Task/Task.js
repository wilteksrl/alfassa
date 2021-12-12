// import React, { memo, useRef, useState, useCallback } from 'react';
// import { Divider } from 'react-native-paper'
// import Container from '../../components/Layout/container';
// import Header from '../../components/Layout/header';
// import Content from '../../components/Layout/content'
// import Footer from '../../components/Layout/footer';
// import Nav from "../../components/Headers/header"
// import Typography from '../../components/Typography/Typography';
// import { Icon } from 'react-native-elements';
// import SmallButton from "../../components/CustomButtons/smallButton";
// import { Text, View, StyleSheet, Image, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
// import TaskList from "../../components/List/TaskList"
// import {connect} from "react-redux"
// import { useFocusEffect } from '@react-navigation/native';

// const Task=(props)=> {
//     const [searchKey,setSearch]=useState(null)
//     useFocusEffect(
//       useCallback(() => {
//         setSearch("")
//        }, [])
//      );

//      let taskData=searchKey&&props.index?
//      props.index.search(searchKey):props.tasks


//      const renderItem = ({ item }) => {
//         item=searchKey?item.item:item


//         return(




//     <TaskList
//                  bottomDivider
//              name={item.CREATED_BY_NAME}


//              />
//         )
//       }


// console.log(props.index);
//     return (
//         <Container>
//             <Header style={{ flexDirection: 'row' }}>
//                 <Nav

//                     centerComponent={<View style={{ marginLeft: "-105%", marginTop: 8 }}>
//                         <Typography size={19} type={"bold"} color={"textPrimary"}>Tasks</Typography>
//                     </View>}
//                     rightComponent={
//                         <View style={{ marginLeft: -30, marginTop: 9 }}>
//                             <SmallButton
//                                 onPress={() => props.navigation.navigate("Add Task")}
//                                 title="Add Task" type={"outline"} /></View>
//                     } />
//             </Header>
//             <Divider style={{ backgroundColor: 'black', height: 1 }} />
//             <Content>
//                 {/* <TaskList
//                     onPress={() => props.navigation.navigate("Task Detail")}
//                     bottomDivider />
//                 {/* <TaskList
//                 bottomDivider/> */} */
//                 <View style={{flex:1}}>

//                 <FlatList

//       data={taskData}
//       renderItem={renderItem}
//       keyExtractor={(item,index) => item.CREATED_BY_NAME+index.toString()}
//     /></View>
//             </Content>
//             <Divider style={{ backgroundColor: 'black', height: 1 }} />
//             <Footer>

//             </Footer>
//         </Container>
//     )
// }

// const style = StyleSheet.create({
//     addCust: {
//         lineHeight: 40,
//         marginLeft: 70
//     },
// })


// const mapStateToProps=(state) =>{

//     return {
//   tasks:state.task.getTask,
//   index:state.task.getTaskIndex
//     }
//   }
//   export default connect(mapStateToProps,{})(memo(Task))


import React, { memo, useState, useCallback } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Background from '../../components/Background';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import { Icon } from 'react-native-elements';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, FlatList, ScrollView } from 'react-native';
import StockList from '../../components/List/StockList';
import Employee from "../../components/List/Employee";
import AvatarWithMore from '../../components/List/AvatarWithMore';
import Search from '../../components/CustomInputs/SearchField';
import Typography from '../../components/Typography/Typography';
import Nav from "../../components/Headers/header"
import { connect } from "react-redux"
import { Divider } from 'react-native-paper'
import TaskList from "../../components/List/TaskList"
import SmallButton from "../../components/CustomButtons/smallButton";
import { getTask } from "../../redux/actions/Task"
const showCustomer = (props) => {
  const [refresh, setRefresh] = useState(false)

  const [searchKey, setSearch] = useState(null)
  useFocusEffect(
    useCallback(() => {
      getTaskList(1)
      setSearch("")
    }, [])
  );
  // console.log(props.index);

  // console.log("employee"+props.employee);
  let taskData = searchKey && props.index ?
    props.index.search(searchKey) : props.getTasks

  console.log("screen" + props.getTasks);

  const getTaskList = (type = 1) => {
    setRefresh(true)
    props.getTask(type).then(() => setRefresh(false)).catch(() => setRefresh(false))
  }

  const renderItem = ({ item }) => {
    item = searchKey ? item.item : item


    return (



      <TaskList
        onPress={() => props.navigation.navigate("Task Detail", { ...item })}
        bottomDivider
        name={"Task ID : " + item.TASK_ID}
        assign={item.ASSIGNED_TO[0].EMP_NAME}
        more={Number(item.ASSIGNED_TO.length - 1) + " More"}
        date={"End Date : " + new Date(item.DUE_DATE).toDateString()}
        badgeText={item.COLOR == "11" ? "Red" : item.COLOR == "12" ? "Green" : item.COLOR == "13" ? "Blue" : item.COLOR == "14" ? "Yellow" : item.COLOR == "15" ? "Aqua":"Grey"}
        badgeColor={item.COLOR == "11" ? "red" : item.COLOR == "12" ? "green" : item.COLOR == "13" ? "blue" : item.COLOR == "14" ? "yellow" : item.COLOR == "15" ? "#17a2b8": "grey"}
      />
    )
  }


  // console.log(props.getTask[0].ASSIGNED_TO.length);
  return (
    <Container>
      <Header >
        <Nav
          centerComponent={<View style={{ marginLeft: "-115%", marginTop: 8 }}>
            <Typography size={19} type={"bold"} color={"textPrimary"}>Tasks</Typography>
          </View>}

          rightComponent={
            <View style={{ marginLeft: -30, marginTop: 9 }}>
              <SmallButton
                onPress={() => props.navigation.navigate("Add Task")}
                title="Add Task" type={"outline"} /></View>
          }
        />
      </Header>
      <Divider style={{ backgroundColor: 'black', height: 1 }} />

      <Content fixed>


        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Search
            placeholder="Search Task"
            value={searchKey}
            onChangeText={txt => setSearch(txt)} />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            key={"1"}
            refreshing={refresh}
            onRefresh={() => getTaskList(1)}
            onEndReached={(info) => getTaskList(2)}
            data={taskData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.TASK_ID + index.toString()}
          />
        </View>

      </Content>
      <Footer></Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    lineHeight: 40,
    marginLeft: 5,

  },
  addCust: {
    lineHeight: 40,
    marginLeft: 70
  },

})


const mapStateToProps = (state) => {

  return {
    getTasks: state.task.getTask,
    index: state.task.getTaskIndex
  }
}
export default connect(mapStateToProps, { getTask })(memo(showCustomer))