
import React, {memo,useRef,useCallback,useState} from 'react';
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
  const  [claimData,setClaimData]=useState({
    EXP_VEH_REPAIR:props.claimData.EXP_VEH_REPAIR,
      EXP_STATIONARY: props.claimData.EXP_STATIONARY,
      EXP_MISC: props.claimData.EXP_MISC,
  })

  useFocusEffect(
    useCallback(() =>{
setClaimData({ 
  EXP_VEH_REPAIR:props.claimData.EXP_VEH_REPAIR,
  EXP_STATIONARY: props.claimData.EXP_STATIONARY,
  EXP_MISC: props.claimData.EXP_MISC,
 


})
  },[])
  )


  const setClaimVal=(data)=>{
setClaimData({...claimData,...data})
  }

  const onClickDone=()=>{
    props.setClaimVal({
      EXP_VEH_REPAIR:claimData.EXP_VEH_REPAIR,
      EXP_STATIONARY: claimData.EXP_STATIONARY,
      EXP_MISC: claimData.EXP_MISC,
    
    
    })
    props.navigation.goBack()
        }

    let RBSheetCom=useRef(null)

    let disabled=()=>{
      if(Number(claimData.EXP_VEH_REPAIR)>Number(props.level.EXP_VEH_REPAIR)){
        return true
      }

      if(Number(claimData.EXP_STATIONARY)>Number(props.level.EXP_STATIONARY)){
        return true
      }

      if(Number(claimData.EXP_MISC)>Number(props.level.LEFT_MAX_MISC)){
        return true
      }

     
    }
    let Total=claimData.EXP_VEH_REPAIR+claimData.EXP_STATIONARY+claimData.EXP_MISC
    
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
    <ClaimTab noBg  iconType="entypo"  iconName="colours"  title="Miscellaneous"  price={"₹ "+Total} />
    </View>

<View style={styles.section1}>

<Typography style={{backgroundColor:"#E0E0E0",padding:8,paddingLeft:16}} type="bold" size={16}>Miscellaneous bills</Typography>

<View style={{padding:16}}>


    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center"}}>
<View>
    <Typography bold  size={12}>Vehicle repair</Typography>
    <Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_VEH_REPAIR)}</Typography>
    </View>
    <NumericInput 
    
    type='up-down' 
    totalWidth={320}
  inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
    totalHeight={40}
    iconSize={10}
    minValue={0}
    initValue={claimData.EXP_VEH_REPAIR}
    containerStyle={{width:300}}

    value={claimData.EXP_VEH_REPAIR}
    onChange={value => setClaimVal({EXP_VEH_REPAIR:value})} 
    
    />

    </View>




    <View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center",marginTop:16}}>
    <View>
<Typography bold size={12}>Stationary</Typography>
<Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_STATIONARY)}</Typography>
</View>
<NumericInput 

type='up-down' 
totalWidth={320}
inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
totalHeight={40}
iconSize={10}
minValue={0}
containerStyle={{width:300}}
initValue={claimData.EXP_STATIONARY}
value={claimData.EXP_STATIONARY}
onChange={value => setClaimVal({EXP_STATIONARY:value})}
  />

</View>


<View style={{flexDirection: 'row',flex:1,justifyContent: 'space-between',alignItems: "center",marginTop:16}}>
<View>
<Typography bold size={12}>Others</Typography>
<Typography color="red" size={10}>Max ₹ {Number(props.level.EXP_MISC)}</Typography>
<Typography color="red" size={10}>Remaining ₹ {Number(props.level.LEFT_MAX_MISC)}</Typography>
</View>
<NumericInput 

type='up-down' 
totalWidth={320}
inputStyle={{width:"100%",textAlign:"left",borderWidth:0,height:28,width:80,paddingLeft:8,borderRadius:10,backgroundColor:"#fff"}}
totalHeight={40}
iconSize={10}
minValue={0}
containerStyle={{width:300}}
initValue={claimData.EXP_MISC}
value={claimData.EXP_MISC}
onChange={value => setClaimVal({EXP_MISC:value})}
  />

</View>

</View>



</View>





    </Content>












    
    <Footer>

        <Button style={{margin:24}} onPress={() =>onClickDone()} disabled={disabled()} title="Done" next/>
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
    claimData: state.claims.newClaim
}
}
export default connect(mapStateToProps,{setClaimVal})(memo(showCustomer));
