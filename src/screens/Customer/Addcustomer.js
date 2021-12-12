import React, {useRef, useEffect, useState,useCallback} from 'react';
import { Divider } from 'react-native-paper'

import { useFocusEffect } from '@react-navigation/native';
import Container from '../../components/Layout/container';
import Header from '../../components/Layout/header';
import Content from '../../components/Layout/content';
import Footer from '../../components/Layout/footer';
import Nav from '../../components/Headers/header';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '../../components/Typography/Typography';
import Button from '../../components/CustomButtons/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneNumberInput from '../../components/CustomInputs/PhoneInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import InputField from '../../components/CustomInputs/InputField';
import BSList from '../../components/List/BottomSheetList';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from '../../components/Dropdown';
import {connect} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {getDistrict,addFarmer,getCustomers,addRetailer,addDistributor} from  "../../redux/actions/Customer"
const Addcustomer = (props) => {
  
  const [data, setData] = useState({
    type:"farmer",
    name: '',
    fatherName: '',
    dob: '',
    mob: '',
    village: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    mp1: '',
    mp2: '',
    mp3: '',
    landHolding: '',
    addhar: '',
    bank: '',
    regionId: '',
    PAN:"",
    GST:"",
    IIL:"",
    add1:"",
    add2:"",
    add3:"",
    email:""
  });


  const [error, setError] = useState({
    type:"",
    name: '',
    fatherName: '',
    dob: '',
    mob: '',
    village: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    mp1: '',
    mp2: '',
    mp3: '',
    landHolding: '',
    addhar: '',
    bank: '',
    regionId: '',
    PAN:"",
    GST:"",
    IIL:"",
    add1:"",
    add2:"",
    add3:"",
    email:""
  });


  useFocusEffect(
    useCallback(() =>{

  
  setData({
    type:"farmer",
    name: '',
    fatherName: '',
    dob: '',
    mob: '',
    village: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    mp1: '',
    mp2: '',
    mp3: '',
    landHolding: '',
    addhar: '',
    bank: '',
    regionId: '',
    PAN:"",
    GST:"",
    IIL:"",
    add1:"",
    add2:"",
    add3:"",
    email:""
  })

  setError({
    type:"",
    name: '',
    fatherName: '',
    dob: '',
    mob: '',
    village: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    mp1: '',
    mp2: '',
    mp3: '',
    landHolding: '',
    addhar: '',
    bank: '',
    regionId: '',
    PAN:"",
    GST:"",
    IIL:"",
    add1:"",
    add2:"",
    add3:"",
    email:""
  })


  },[])
  )

  const setState = (val) => {
    setData({...data, ...val});
  };

  const setErrorState = (val) => {
    setError({...error, ...val});
  };
  const [showPicker, setShowPicker] = useState(false);
  const [stateID, setStateID] = useState(1);
  const [districts, setDistricts] = useState([]);

  const [type,setType]=useState("farmer")
  let RBSheetCom = useRef(null);
  let inputRef = useRef(null);


useEffect(() =>{
 
props.getDistrict((data.regionId)).then(item=>{
  let val=item.map(v=>{
    return{
      label:v.AREA_NAME,
      value:v.AREA_ID
    }
  })
  setDistricts(val)
}).catch(err=>{
  setDistricts([])
})

},[data.regionId])




  const handleCloseBS = () => {
    props.navigation.goBack();
  };

  let Regions = [];
  let States =[]

  Regions = props.regions.map((item) => {
    return {
      label: item.REGION_NAME,
      value: item.REGION_ID,
    };
  });

  States = props.states.map((item) => {
    return {
      label: item.STATE_NAME,
      value: item.STATE_ID,
    };
  });


const handleSubmit=()=>{

  let required=["type","name","fatherName","dob","mob","addhar","account","pincode"]
let hasErr=false
  err={
    type:"",
    account:"",
    name: '',
    fatherName: '',
    dob: '',
    mob: '',
    village: '',
    tehsil: '',
    district: '',
    pincode: '',
    state: '',
    mp1: '',
    mp2: '',
    mp3: '',
    landHolding: '',
    addhar: '',
    bank: '',
    regionId: '',
    PAN:"",
    GST:"",
    IIL:"",
    add1:"",
    add2:"",
    add3:"",
    email:""
  }

required.map(item=>{
if(data[item]==null||data[item]==""||data[item]==''){
  hasErr=true
 
  err[item]="This field is mandatory"
}

else{
  err[item]=""
}
})

if(data.mob&&data.mob.length!==10){
  hasErr=true
  err.mob="Please enter valid mobile number"
}

if(data.addhar&&data.addhar.length!==12){
  hasErr=true
  err.addhar="Please enter valid addhar number"
}

setError(err)

if(!hasErr){

  if(type=="farmer"){
    props.addFarmer(data).then(() =>{
      
      props.getCustomers()

      setData({
        type:"farmer",
        name: '',
        fatherName: '',
        dob: '',
        mob: '',
        village: '',
        tehsil: '',
        district: '',
        pincode: '',
        state: '',
        mp1: '',
        mp2: '',
        mp3: '',
        landHolding: '',
        addhar: '',
        bank: '',
        regionId: '',
        PAN:"",
        GST:"",
        IIL:"",
        add1:"",
        add2:"",
        add3:"",
        email:""
      })

      setTimeout(() =>{

        Snackbar.show({
          text: 'Farmer created succesfully',
          duration: Snackbar.LENGTH_SHORT,
        })
      },1000)
    
    props.navigation.goBack()
    
    })
  }



  if(type=="retailer"){
    props.addRetailer(data).then(() =>{
      
      props.getCustomers()

      setData({
        type:"retailer",
        name: '',
        fatherName: '',
        dob: '',
        mob: '',
        village: '',
        tehsil: '',
        district: '',
        pincode: '',
        state: '',
        mp1: '',
        mp2: '',
        mp3: '',
        landHolding: '',
        addhar: '',
        bank: '',
        regionId: '',
        PAN:"",
        GST:"",
        IIL:"",
        add1:"",
        add2:"",
        add3:"",
        email:""
      })

      setTimeout(() =>{

        Snackbar.show({
          text: 'Retailer created succesfully',
          duration: Snackbar.LENGTH_SHORT,
        })
      },1000)
    
    props.navigation.goBack()
    
    })
  }



  if(type=="distributor"){
    props.addDistributor(data).then(() =>{
      
      props.getCustomers()

      setData({
        type:"distributor",
        name: '',
        fatherName: '',
        dob: '',
        mob: '',
        village: '',
        tehsil: '',
        district: '',
        pincode: '',
        state: '',
        mp1: '',
        mp2: '',
        mp3: '',
        landHolding: '',
        addhar: '',
        bank: '',
        regionId: '',
        PAN:"",
        GST:"",
        IIL:"",
        add1:"",
        add2:"",
        add3:"",
        email:""
      })

      setTimeout(() =>{

        Snackbar.show({
          text: 'Distributor created succesfully',
          duration: Snackbar.LENGTH_SHORT,
        })
      },1000)
    
    props.navigation.goBack()
    
    })
  }
}else{

  Snackbar.show({
    text: 'Please fill all required fields',
    duration: Snackbar.LENGTH_SHORT,
  });
}

}






  return (
    <Container>
      <Header>
        <Nav
centerComponent={<View  style={{marginLeft:"-75%",marginTop:8}}>
<Typography size={19} type={"bold"} color={"textPrimary"}>Add Customer</Typography>
</View>}        />
      </Header>
      <Divider style={{ backgroundColor: 'black', height: 1 }} />

      <Content>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            open={true}
            mode={'date'}
            onChange={(e, val) => {
              setShowPicker(false);
              inputRef.current.blur();
              setState({dob: val.toDateString()});
            }}
            display="default"
          />
        )}
        <View style={styles.textFields}>
          <DropDownPicker
            label={'Select Type*'}
            defaultValue={'farmer'}
            errorMessage={error.type}
            items={[
              {label: 'Farmer', value: 'farmer'},
              {label: 'Distributor', value: 'distributor'},
              {label: 'Retailer', value: 'retailer'},
            ]}
            onValueChange={(item) => {setType(item);setState({type:item})}}
          />

          <InputField 
          label="Name*"
           placeholder="Name here"
errorMessage={error.name}
value={data.name}
           onChangeText={(value) =>setState({name: value})}
          
          
          />
          <InputField 
          errorMessage={error.fatherName}
          label="Father Name*" 
          value={data.fatherName}
          placeholder="Father Name here"
          onChangeText={(value) =>setState({fatherName: value})}
          />


          <InputField
            ref={inputRef}
            value={data.dob}
            label="Date Of Birth"
            
            errorMessage={error.dob}
            placeholder="Enter Your Date Of Birth"
            onFocus={() => setShowPicker(true)}
            onPress={() => setShowPicker(true)}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <Icon
                  name="calendar-month"
                  type="materialCommunityIcons"
                  size={20}
                />
              </TouchableOpacity>
            }
          />


          <InputField label="Mobile*" 
          errorMessage={error.mob}
          value={data.mob}
          keyboardType={"number-pad"}
          placeholder="Type Your Mobile Number"
          onChangeText={(value) =>setState({mob: value})}
          />


{type!=="farmer"&&<InputField label="Email" 
          errorMessage={error.email}
        value={data.email}
          placeholder="Type your email here"
          onChangeText={(value) =>setState({email: value})}
          />
}

 <InputField  value={data.addhar} label="Aadhaar Id*" placeholder="Aadhaar here"  keyboardType={"number-pad"}   errorMessage={error.addhar}        onChangeText={(item)=>{setState({addhar:item})}} />
          <InputField value={data.account} label="Account Number*" placeholder="Account info here"  keyboardType={"number-pad"} errorMessage={error.account} onChangeText={(item)=>{setState({account:item})}} />

{    type!=="farmer"&& <InputField label="GSTIN" placeholder="Enter GSTIN" value={data.GST}  onChangeText={(item)=>{setState({GST:item})}} />
}
{    type!=="farmer"&& <InputField label="PAN" placeholder="Enter PAN here" value={data.PAN}  onChangeText={(item)=>{setState({PAN:item})}} />
}
{    type=="distributor"&& <InputField label="IIL LICENCE NO*" placeholder="Enter Licence No" value={data.IIL} keyboardType={"number-pad"} onChangeText={(item)=>{setState({IIL:item})}} />
}
          <DropDownPicker label={'Select State'} 
             defaultValue={null}
          items={Regions}
          onValueChange={(item)=>{setState({regionId:item})}}
          />


 <DropDownPicker label={'Select District'} 
          defaultValue={null}
          items={districts}
          onValueChange={(item)=>{setState({district:item})}}
          
          
          />
              {type=="farmer"?<>
          <InputField label="Village" placeholder="Village Name here" value={data.village}       onChangeText={(item)=>{setState({village:item})}} />
          <InputField label="Taluka" placeholder="Taluka Name here" value={data.tehsil} onChangeText={(item)=>{setState({tehsil:item})}} />
        </>:<>
                 <InputField label="Address 1" placeholder="Enter Address here"    value={data.add1}    onChangeText={(item)=>{setState({add1:item})}} />
                 <InputField label="Address 2" placeholder="Enter Address here" value={data.add2} onChangeText={(item)=>{setState({add2:item})}} />
                 <InputField label="Address 3" placeholder="Enter Address here" value={data.add3} onChangeText={(item)=>{setState({add3:item})}} />
                 </>
        
        }





              <InputField 
              label="Pincode*"
                  keyboardType={"number-pad"}
               placeholder="Enter Pincode"
               errorMessage={error.pincode} 
               value={data.pincode}
               onChangeText={(item)=>{setState({pincode:item})}}/>
        
       


        {type=="farmer"&&<>
          <InputField label="Major Crop 1" placeholder="Enter Major Crop 1"        onChangeText={(item)=>{setState({mp1:item})}} value={data.mp1}/>
          <InputField label="Major Crop 2" placeholder="Enter Major Crop 2" onChangeText={(item)=>{setState({mp2:item})}}   value={data.mp2} />
          <InputField label="Major Crop 3" placeholder="Enter Major Crop 3"        onChangeText={(item)=>{setState({mp3:item})}}  value={data.mp3}/>
          <InputField label="Land holding (In Acres)" placeholder="" onChangeText={(item)=>{setState({landHolding:item})}}  value={data.landHolding}/>
</>
      }

       
        </View>

        <Button title="Save"
        onPress={() =>handleSubmit()}
        
        />
      </Content>
   

      <RBSheet
        ref={(ref) => {
          RBSheetCom = ref;
        }}
        open={true}
        height={300}
        closeOnPressBack={true}
        onClose={() => handleCloseBS()}
        closeOnPressMask={false}
        openDuration={250}
        customStyles={{
          container: {
            padding: 24,
            flex: 1,
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <BSList
          iconType="material"
          iconName="airplanemode-active"
          title="Travel"
          price="₹450"
        />
      </RBSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  textFields: {
    marginTop: 30,
  },
  linear: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  linearChild: {
    flexDirection: 'row',

    flex: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    regions: state.cutomers.regions,
    states: state.cutomers.state,
  };
};

export default connect(mapStateToProps, {getDistrict,addFarmer,getCustomers,addRetailer,addDistributor})(Addcustomer);
