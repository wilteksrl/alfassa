import React from 'react'
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import LillBanner from "../../components/Misc/LillBanner"
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from "../../components/Headers/header"
import Typography from '../../components/Typography/Typography';
import Avatarwithouter from '../../components/List/Avatarwithouter';
import HollowButton from "../../components/CustomButtons/HollowButton"
import {Text, View, StyleSheet,Image,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import Cards from "../../components/Misc/DataCard"
import { Dimensions } from "react-native";
import { Divider } from 'react-native-paper'

import SmallButton from "./../../components/CustomButtons/smallButton";
import {

    BarChart,
  
  } from "react-native-chart-kit";
export default function CustomerDetail(props) {
    const screenWidth = Dimensions.get("window").width;
let showGraph=false

    let fin_details=  {
      
        "CLOSING_BALANCE": "0.00",
        "OPENING_BALANCE": "0.00",
        "OPENING_BALANCE_TIME": "2020-12-01 13:19:47",
        "IMM_DUES": "0.00",
        "TOTAL_OUTSTANDING": "0.00",
        "ADVANCE": "0.00",
        "UPTO30_DAYS": "166.00",
        "UPTO60_DAYS": "356.00",
        "UPTO90_DAYS": "654.00",
        "UPTO120_DAYS": "754.00",
        "UPTO180_DAYS": "876.00",
        "ABOVE180_DAYS": "987.00",
        "TOTAL_CREDIT_LIMIT": "6789.00",
        "REMAINING_CREDIT_LIMIT": "4567.00",
        "UPDATED_AT": "2020-12-18 13:19:47"
    }


    let data=props.route.params


    if(data.CUSTOMER_BAL&&data.CUSTOMER_BAL&&data.CUSTOMER_BAL.length>0){
        showGraph=true
        fin_details={
            ...data.CUSTOMER_BAL[0]
        }
    }
   

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        barPercentage: 0.5,
        
        useShadowColorFromDataset: false // optional
      };

      const barData = {
        labels: ["0-30", "31-60", "61-90", "91-120", "121-180", "above 180"],

        datasets: [
          {
            data: [ fin_details.UPTO30_DAYS, fin_details.UPTO60_DAYS, fin_details.UPTO90_DAYS, fin_details.UPTO120_DAYS, fin_details.UPTO180_DAYS, fin_details.ABOVE180_DAYS]

          }
        ]
      };
console.log(data.EMP_NAME);
    return (
     <Container>
         <Header>
<Nav
centerComponent={<View style={{marginLeft:"-70%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Customer Details</Typography>
</View>}
   rightComponent={
    <View style={{marginLeft:-50,marginTop:9}}>
   <SmallButton 
        onPress={() =>props.navigation.navigate("Ledger",{id:data.CUSTOMER_ID,code:data.TYPE_CODE})}
     
        title="View Ledger" type={"outline"}/></View>
    }
/>
         </Header>
         <Divider style={{ backgroundColor: 'black', height: 1 }} />

<Content>

{/* 
<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: 5,
        }}>

            <View>
        <Typography
          size={20}
          style={{marginLeft: 5}}
          type={'bold'}
          color={'textPrimary'}>
          Customer Details
        </Typography>
       
        </View>
        <SmallButton 
        onPress={() =>props.navigation.navigate("Ledger",{id:data.CUSTOMER_ID,code:data.TYPE_CODE})}
     
        title="View Ledger" type={"outline"}/>


      </View> */}







<View style={styles.container}>
<Avatarwithouter
         name={data.CUSTOMER_NAME}
         subtitle={data.CUSTOMER_MOB}
      
         />

   <View style={styles.CardContainer}>
<Cards value={`₹ ${fin_details.CLOSING_BALANCE}`} title={"Closing Balance"} />
<Cards value={data.EMP_NAME} title={"Sales Rep."} />
   </View>


<View style={styles.dues}>
   <Typography color="red" size={24} bold type={"bold"} >
Imm Dues: ₹ {fin_details.IMM_DUES}
       </Typography>
       <Typography style={{marginTop:8}} color="textPrimary" size={12}  >
(Total outstanding :₹ {fin_details.TOTAL_OUTSTANDING})
       </Typography>
       </View>


  </View>


{  showGraph&&<BarChart
  
  data={barData}
  width={screenWidth-64}
  height={300}
  yAxisLabel="₹"
  fromZero
  chartConfig={chartConfig}
  verticalLabelRotation={40}
/>}

{/* <View style={{flexDirection:"row"}}> 
<View style={{marginTop:10}}>
<Typography size={20} type={"extraBold"}>Customer Details</Typography>
</View>
<View style={{marginLeft:59}}>
<HollowButton 
title="View Ledger"
size={11}
/>
</View>
</View>
{/* <Avatarwithouter
         name={"Taylor Swift"}
         subtitle={"7387637284"}
      
         /> */}





{/* 
<View style={{alignItems:'center',marginTop:10}}>
<Typography size={20} type="extraBold" color="red">Imm Dues : $45600</Typography>
<Typography size={20} type="bold">(Total Outstanding : $45600)</Typography>
</View>  */}
</Content>
<Footer></Footer>

     </Container>

    )
}
const styles = StyleSheet.create({
    container:{
flex:1
    },
    CardContainer:{
      
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:32
    },

    dues:{
      
        justifyContent:"center",
        alignItems: "center",
        marginTop:32
    }
});