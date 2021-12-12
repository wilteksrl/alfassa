import React ,{memo,useEffect,useState,useCallback}from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import InputField from '../../components/CustomInputs/InputField';
import {View, StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
import Typography from '../../components/Typography/Typography';
import  Search from '../../components/CustomInputs/SearchField';
import TicketList from '../../components/List/TicketList'
import {getTickets} from "../../redux/actions/Ticket"
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper'
import SmallButton from "../../components/CustomButtons/smallButton";

import {connect} from "react-redux"

function SupportTicket(props) {

    const [refresh,setRefresh]=useState(false)
    const [searchKey,setSearch]=useState(null)
    useFocusEffect(
      useCallback(() => {
        getTicketsList()
        setSearch("")
       }, [])
     );


    const getTicketsList=(type=1)=>{
        setRefresh(true)
        props.getTickets(type).then(() =>setRefresh(false)).catch(() =>setRefresh(false))
      }
    
      const renderItem=({ item }) => {
        item=searchKey?item.item:item

      return(  <TicketList
        onPress={() =>props.navigation.navigate("Ticket Detail",{...item})}
                    
                     TicketID={item.TICKET_ID}
                     date={item.CREATED_ON}
                     status={item.STATUS_DESC}
                 />)
      }

      let ticketsData=searchKey&&props.index?
  props.index.search(searchKey):props.tickets

          

    return (
       <Container>
           <Header>
               <Nav
               centerComponent={<View style={{marginLeft:"-70%",marginTop:8}}>
               <Typography size={19} type={"bold"} color={"textPrimary"}>Support Tickets</Typography>
               </View>}
                  rightComponent={
                   <View style={{marginLeft:-50,marginTop:9}}>
                  <SmallButton 
        onPress={() =>props.navigation.navigate("Create Support Ticket")}
                    
                       title="Raise Ticket" type={"outline"}/></View>
                   }
               />
           </Header>
           <Divider style={{ backgroundColor: 'black', height: 1 }} />

            {props.tickets&&props.tickets.length>0?<Content fixed>
            {/* <View style= {{flexDirection:'row',justifyContent:"space-between",alignItems: "center",marginRight:5}}>
        <Typography size={24} style={styles.header} type={"bold"} color={"textPrimary"}>Support Tickets </Typography>
        <TouchableOpacity
        onPress={() =>props.navigation.navigate("Create Support Ticket")}
        
        >
            <Typography size={12} style={styles.addCust} color={"primary"}>Raise Ticket </Typography>
            </TouchableOpacity>
        </View> */}
        <View style= {{marginTop:16,marginBottom:16}}>
         <Search placeholder="Search Ticket ID"
          
           value={searchKey}
           onChangeText={txt=>setSearch(txt)}
         
         />
         </View>
<View style= {{flexDirection:'column',flex:1}}>
         <FlatList
         key={"1"}
         refreshing={refresh}
onRefresh={()=>getTicketsList(1)}
onEndReached={(info)=>getTicketsList(2)}
        data={ticketsData}
        renderItem={renderItem}
        keyExtractor={item => item.TICKET_ID}
      />
</View>
       



            </Content>:<Content><View style={{marginTop:"5%"}}><Image
style={{flex:1,alignSelf:'center',resizeMode:'contain',width:"40%",marginLeft:-15}}
source={require('../../assets/gif/Ticket.png')}
/><View style={{alignItems:'center',marginTop:-35}}><Typography size={17}>No Ticket Found</Typography></View></View></Content>}

       </Container>
    )
}

const styles = StyleSheet.create({
    header:{
  lineHeight:40,
  marginLeft:5,
  
    },
      addCust:{
  lineHeight:40,
  marginLeft:70
  },
  
  })

  const mapStateToProps=(state)=>{
 
    return {
      tickets:state.ticket.tickets,
      index:state.ticket.ticketIndex
    }
  }
  export default connect(mapStateToProps,{getTickets})(SupportTicket)