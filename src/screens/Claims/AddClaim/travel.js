import React, {memo,useRef,useState,useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../../components/CustomButtons/Button';
import Container from '../../../components/Layout/container';
import Header from '../../../components/Layout/header';
import Content from '../../../components/Layout/content';
import Footer from '../../../components/Layout/footer';
import RBSheet from "react-native-raw-bottom-sheet";
import {Icon, Divider} from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import ClaimTab from '../../../components/Misc/ClaimTabs';
import Typography from '../../../components/Typography/Typography';
import Nav from '../../../components/Headers/header';
import NumericInput from 'react-native-numeric-input'
import {setClaimVal} from "../../../redux/actions/Claims"
import SmallButton from "../../../components/CustomButtons/smallButton";
import BSList from "../../../components/List/BottomSheetList"
import {connect} from "react-redux"
const showCustomer = (props) => {
    

console.log(props.details.VEHICLE_OWNERSHIP);
const  [claimData,setClaimData]=useState({

    START_KM:props.claimData.START_KM,
    EXP_FUEL:props.claimData.EXP_FUEL,
    END_KM: props.claimData.END_KM,
    EXP_TAXI_AUTO: props.claimData.EXP_TAXI_AUTO,
    EXP_BUS_TRAIN: props.claimData.EXP_BUS_TRAIN,
    EXP_PLANE: props.claimData.EXP_PLANE
  })


  useFocusEffect(
    useCallback(() =>{
setClaimData({  START_KM:props.claimData.START_KM,
  EXP_FUEL: props.claimData.EXP_FUEL,
  END_KM: props.claimData.END_KM,
  EXP_TAXI_AUTO: props.claimData.EXP_TAXI_AUTO,
  EXP_BUS_TRAIN: props.claimData.EXP_BUS_TRAIN,
  EXP_PLANE: props.claimData.EXP_PLANE})
  },[])
  )


  const setClaimVal=(data)=>{
setClaimData({...claimData,...data})
  }

    let RBSheetCom=useRef(null)


    let Total=((claimData.END_KM-claimData.START_KM)>0?(claimData.END_KM-claimData.START_KM)*props.level.EXP_PER_KM_RATE:0)+claimData.EXP_TAXI_AUTO+claimData.EXP_PLANE+claimData.EXP_FUEL+claimData.EXP_BUS_TRAIN



    let disabled=()=>{
      if(Number(claimData.EXP_TAXI_AUTO)>Number(props.level.EXP_TAXI_AUTO)){
        return true
      }
      if(Number(claimData.EXP_FUEL)>Number(props.level.LEFT_MAX_ALLOWED_FUEL)){
        return true
      }

      if(Number(claimData.EXP_BUS_TRAIN)>Number(props.level.EXP_BUS_TRAIN)){
        return true
      }

      if(Number(claimData.EXP_PLANE)>Number(props.level.EXP_PLANE)){
        return true
      }

      if(Number((claimData.END_KM-claimData.START_KM))>Number(props.level.LEFT_MAX_ALLOWED_KM)){
        return true
      }
    }

   const onClickDone=()=>{
props.setClaimVal({

  EXP_FUEL:claimData.EXP_FUEL,
  START_KM:claimData.START_KM,
  END_KM: claimData.END_KM,
  EXP_TAXI_AUTO: claimData.EXP_TAXI_AUTO,
  EXP_BUS_TRAIN: claimData.EXP_BUS_TRAIN,
  EXP_PLANE:claimData.EXP_PLANE

})
props.navigation.goBack()
    }
    
    return(
  <Container>
    <Header>
      <Nav />
    </Header>
    <Content>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginRight: 5,
        }}>

            <View>
        <Typography
          size={24}
          style={{marginLeft: 5}}
          type={'bold'}
          color={'textPrimary'}>
          Add Claim
        </Typography>
       
        </View>
        

        {/* <View style={{flexDirection: 'row',marginLeft:5}}>
          <Icon type="feather" name="calendar" size={18} />
          <Typography size={12} style={{marginLeft: 5}} color={'textSecondary'}>
          {new Date().toDateString()}
          </Typography>
        </View> */}
      </View>

     
<View style={{padding:8,paddingBottom:0}}>
    <ClaimTab noBg  iconType="material"  iconName="airplanemode-active"  title="Travel" price={"₹ "+Total}   />
    </View>

{props.details.VEHICLE_OWNERSHIP==2 &&<View style={styles.section1}>

<Typography style={{backgroundColor:"#E0E0E0",padding:8,paddingLeft:16}} type="bold" size={16}>Personal Vehicle</Typography>

<View style={{padding:16}}>
 

    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center"}}>

    <Typography bold  size={12}>From km</Typography>
    <NumericInput 
    
    type='up-down' 
    totalWidth={320}
  inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
    totalHeight={40}
    iconSize={10}
    minValue={0}
    initValue={claimData.START_KM}
    containerStyle={{width:300}}
    value={claimData.START_KM}
    onChange={value =>setClaimVal({START_KM:value})} 
    
    />

    </View>




    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center",marginTop:16}}>

<Typography bold size={12}>To km</Typography>
<NumericInput 

type='up-down' 
totalWidth={320}
inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
totalHeight={40}
iconSize={10}
minValue={claimData.START_KM}
containerStyle={{width:300}}
initValue={claimData.END_KM}
value={claimData.END_KM}
onChange={value => setClaimVal({END_KM:value})}
  />

</View>





<View style={{flexDirection:'row',justifyContent:'space-between',flex:1,marginTop:16}}>
<View style={{justifyContent:"center",alignItems: "center",marginBottom:16}}>
<Typography bold color="textPrimary" >Remaining Km</Typography> 
{/* <Typography color="red" size={10}>max ₹ </Typography> */}
<Typography bold color="textPrimary" size={14} color={"green"} > {props.level.LEFT_MAX_ALLOWED_KM} Km</Typography> 
<Typography color="red" size={10}>Max  {Number(props.level.MAX_ALLOWED_KM)} Km</Typography>


</View>


<View style={{justifyContent:"center",alignItems: "center",marginBottom:16}}>
<Typography bold color="textPrimary" >Total Amount</Typography> 
{/* <Typography color="red" size={10}>max ₹ </Typography> */}
<Typography bold color="textPrimary" size={14} color={"green"} >₹ {(claimData.END_KM-claimData.START_KM)>0?(claimData.END_KM-claimData.START_KM)*props.level.EXP_PER_KM_RATE:0}</Typography> 
<Typography color="red" size={10}>Total {Number((claimData.END_KM-claimData.START_KM)>0?(claimData.END_KM-claimData.START_KM):0)} Km</Typography>
</View>
</View>
</View>

</View>}



{props.details.VEHICLE_OWNERSHIP==1 &&<View style={[styles.section1,{marginTop:16}]}>

<Typography style={{backgroundColor:"#E0E0E0",padding:8,paddingLeft:16}} type="bold" size={16}>Company Vehicle</Typography>

<View style={{padding:16}}>
 

    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center"}}>

    <Typography bold  size={12}>Fuel</Typography>
    <NumericInput 
    
    type='up-down' 
    totalWidth={320}
  inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
    totalHeight={40}
    iconSize={10}
    minValue={0}
    initValue={claimData.EXP_FUEL}
    containerStyle={{width:300}}
    value={claimData.EXP_FUEL}
    onChange={value =>setClaimVal({EXP_FUEL:value})}
    />
    </View>

<View style={{justifyContent:"center",alignItems: "center",marginTop:16}}>
<Typography bold color="textPrimary" >Total Amount</Typography> 
<Typography bold color="textPrimary" size={14} color={"green"} >₹ {props.level.EXP_FUEL}</Typography> 
<Typography color="red" size={10}>Remaining amount ₹ {props.level.LEFT_MAX_ALLOWED_FUEL} </Typography>
</View>
</View>
</View>}
<View style={[styles.section1,{marginTop:16}]}>
<Typography style={{backgroundColor:"#E0E0E0",padding:8,paddingLeft:16}} type="bold" size={16}>Public Transport</Typography>
<View style={{padding:16}}>

    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center"}}>
<View>
    <Typography bold  size={12}>Taxi + Ricksaw + Auto</Typography>
    <Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_TAXI_AUTO)}</Typography>
    </View>
    <NumericInput 
    
    type='up-down' 
    totalWidth={320}
   
  inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
    totalHeight={40}
    iconSize={10}
    containerStyle={{width:300}}
    initValue={Number(claimData.EXP_TAXI_AUTO)}
    value={Number(claimData.EXP_TAXI_AUTO)}
    onChange={value => setClaimVal({EXP_TAXI_AUTO:value})} />

    </View>




    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center",marginTop:16}}>
<View>
<Typography bold  size={12}>Bus + Train</Typography>
<Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_BUS_TRAIN)}</Typography>
</View>
<NumericInput 

type='up-down' 
totalWidth={320}
inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
totalHeight={40}
iconSize={10}
initValue={Number(claimData.EXP_BUS_TRAIN)}
containerStyle={{width:300}}
value={Number(claimData.EXP_BUS_TRAIN)}
onChange={value => setClaimVal({EXP_BUS_TRAIN:value})} />

</View>



<View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center",marginTop:16}}>
<View>
<Typography bold  size={12}>Air</Typography>
<Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_PLANE)}</Typography>
</View>
<NumericInput 

type='up-down' 
totalWidth={320}
inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
totalHeight={40}
iconSize={10}
containerStyle={{width:300}}
initValue={Number(claimData.EXP_PLANE)}
value={Number(claimData.EXP_PLANE)}
onChange={value => setClaimVal({EXP_PLANE:value})}/>

</View>


</View>

</View>



    </Content>












    
    <Footer>

        <Button style={{margin:24}} disabled={disabled()} onPress={() =>onClickDone()} title="Done" next/>
    </Footer>
  </Container>
);}

const styles = StyleSheet.create({


    section1:{

        margin:8,
        backgroundColor:"#F2F2F2",
        borderTopEndRadius:10,
        borderBottomLeftRadius:5,
        borderTopLeftRadius:10,
        borderBottomEndRadius:5,
        overflow:"hidden"
    },




  infoCard: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  infoChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  border: {
    borderLeftWidth: 2,
    borderColor: '#e2e2e2',
  },

  addCust: {
    lineHeight: 40,
    marginLeft: 70,
  },
  table: {
    margin: 16,
    marginTop: 8,
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    paddingLeft: 12,
  },
  row: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  tabs:{
      marginTop:32
  }
});

const mapStateToProps=(state)=>{
return{
  level:state.claims.level,
    claimData: state.claims.newClaim,
    details: state.auth.details,

}
}
export default connect(mapStateToProps,{setClaimVal})(memo(showCustomer));
