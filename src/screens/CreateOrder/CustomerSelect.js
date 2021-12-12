import React, {memo} from 'react';
import Selector from "../../components/Misc/Selector"
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import Typography from "../../components/Typography/Typography";
import {Icon} from 'react-native-elements';
import Cards from "../../components/Misc/DataCard"
import { Dimensions } from "react-native";
import {

  BarChart,

} from "react-native-chart-kit";
const LoginScreen = (props) => {
  
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
  
  
      let data=props.customer
  
  
      if(data&&data.CUSTOMER_BAL&&data.CUSTOMER_BAL.length>0){
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
  return(
  <View style={styles.container}>
   <Selector 
   leftIcon={
   <Icon
    type={"feather"}
    
    size={30}
    name={"user"}
    
    />
  }
  nav="showCustomer"
value={props.customer?props.customer.CUSTOMER_NAME:""}
  placeholder={"Select customer"}
   />

  {data&& <View style={styles.CardContainer}>
<Cards value={`₹ ${fin_details.CLOSING_BALANCE}`} title={"Closing Balance"} />
<Cards value={data&&data.EMP_NAME} title={"Sales Rep."} />
   </View>}


{data&&<View style={styles.dues}>
   <Typography color="red" size={24} bold type={"bold"} >
   Imm Dues: ₹ {fin_details.IMM_DUES}
       </Typography>
       <Typography style={{marginTop:8}} color="textPrimary" size={12}  >
       (Total outstanding :₹ {fin_details.TOTAL_OUTSTANDING})
       </Typography>
       </View>
}

       {  showGraph&&<BarChart
  
  data={barData}
  width={screenWidth-64}
  height={300}
  yAxisLabel="₹"
  fromZero
  chartConfig={chartConfig}
  verticalLabelRotation={40}
/>}
  </View>

  
)}

const styles = StyleSheet.create({
    container:{
flex:1
    },
    CardContainer:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:32
    },

    dues:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        marginTop:32
    }
});

export default memo(LoginScreen);
