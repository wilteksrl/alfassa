import React from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import InputField from '../../components/CustomInputs/InputField';
import {View, StyleSheet} from 'react-native';
import Typography from '../../components/Typography/Typography';
import  Search from '../../components/CustomInputs/SearchField';
import TicketList from '../../components/List/TicketList'
import {Icon} from 'react-native-elements';
import { Divider } from 'react-native-paper'

import Timeline from 'react-native-timeline-flatlist'
import { useFocusEffect } from '@react-navigation/native';
import {connect} from "react-redux"
import {theme } from "../../config/theme"
function TicketDetail(props) {
    let data=props.route.params
    const data2 = [
        {time: '', title: props.name, description: 'Issue Raised',  descriptionStyle:{color:theme.colors.green,fontFamily:"Nunito"},titleStyle:{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}},
        {time: '', title: data.APPROVER_NAME?data.APPROVER_NAME:"N/A", description: data.STATUS_DESC,
        descriptionStyle:{color:data.CURRENT_STATUS=="1"?theme.colors.yellow:data.CURRENT_STATUS=="2"?theme.colors.green:theme.colors.red,fontFamily:"Nunito"},titleStyle:{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}
    
    },
      
      ]
      let comp=props.components.find(i=>i.COMPONENT_ID==data.TICKET_COMPONENT_ID)
 
    return (
       <Container>
           <Header><Nav
           centerComponent={<View  style={{marginLeft:"-85%",marginTop:8}}>
           <Typography size={19} type={"bold"} color={"textPrimary"}>Ticket Detail</Typography>
           </View> }
           /></Header>
           <Divider style={{ backgroundColor: 'black', height: 1 }} />

           <Content>
               {/* <View>
                   <Typography size={24} type="extraBold" >Ticket Detail</Typography>
               </View> */}
               <View style= {{marginTop:10,justifyContent:"flex-start",flexDirection:"row"}}>
         <Icon
         type="feather"
         name="calendar"
         size={18}
         />
         <Typography size={12} style={{marginLeft:5}} color={"textSecondary"} >{new Date(data.CREATED_ON).toDateString()}</Typography>
         </View>
               <View style={{flexDirection:'row',marginTop:32,justifyContent:"space-between"}}>
               <View >
                   <Typography size={18} type="bold" >Component </Typography>
                   <Typography size={14}>{comp&&comp.COMPONENT_NAME}</Typography>
               </View>
               <View>
                   <Typography size={18} type="bold" >Ticket ID</Typography>
                   <Typography size={14}>#{data.TICKET_ID}</Typography>
               </View>
               </View>
               <View style={{flexDirection:'row',marginTop:32,justifyContent:"space-between"}}>
                   <View >
                   <Typography size={18} type="bold" >Subject</Typography>
                   <Typography style={{width:"80%"}}>{data.TICKET_SUBJECT}</Typography>
                   </View>
                   <View>
                   <Typography size={18} type="bold" >Processor name</Typography>
                   <Typography style={{textAlign:"center"}}>{data.PROCESSOR_NAME?data.PROCESSOR_NAME:"N/A"}</Typography>
                   </View>
               </View>
               <View style={styles.table}>
               <View style={styles.header}>
<Typography size={12} color={"textPrimary"} type="bold" >Details</Typography>
</View>
<View style={styles.bottom}>
    <Typography size={12} color={"textSecondary"}>{data.TICKET_DESCRIPTION}</Typography>
</View>
</View>
<View style= {{marginTop:24,marginBottom:16,marginLeft:10,justifyContent:"flex-start",alignItems: "center",flexDirection:"row"}}>
         <Icon
         type="entypo"
         name="back-in-time"
         size={18}
         />
         <Typography size={18} style={{marginLeft:10}} type={"bold"} >Timeline</Typography>
         </View>
         <View>

<Timeline
lineColor={theme.colors.green}
circleColor={theme.colors.green}
titleStyle={{color: theme.colors.textPrimary,fontFamily:"Nunito",fontWeight:"bold"}}
          data={data2}
          
        />
</View>
           </Content>
       </Container>
    )
}


const styles = StyleSheet.create({
    header:{
        backgroundColor:"#E0E0E0",
        padding:8,
        paddingLeft:12
    },
    table:{
        marginTop:'10%',
        marginBottom:0,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    overflow:"hidden"
    },
    bottom:{
        backgroundColor:"#F2F2F2",
        flexDirection:"row",
        padding:12,
        height:120,
        justifyContent:"space-between",
        borderBottomWidth:1,
        borderBottomColor:"#e2e2e2",
    }

})
const mapStateToProps=(state)=>{
    return {
    name:state.auth.details.EMP_NAME,
    components:state.ticket.components
    }
}
export default connect(mapStateToProps,{})(TicketDetail);