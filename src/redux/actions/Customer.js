import api from "../../utils/api";
import axios from "axios";

export const getCustomers = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

  //  console.log(`${api.protocol}${api.url}${api.getCustomers}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.getCustomers}id=${getState().auth.id}`).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

          //  console.log("customer"+response.data);
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"INIT_CUSTOMERS",payload:response.data})
               resolve(200)
            }
            else{
              reject(404)
            }
        }).catch(err=>{
          if(err.response&&err.response.status==404){
            dispatch({type:"INIT_CUSTOMERS",payload:[]})
         }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
          
        })


    })
   
  };


  export const getRegion = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

      
        axios.get(`${api.protocol}${api.url}${api.getRegion}`).then((response) =>{

       

           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"INIT_REGIONS",payload:response.data})
               
            }
            else{
              reject(404)
            }
        }).catch(err=>{
          if(err.response&&err.response.status==404){
            dispatch({type:"INIT_REGIONS",payload:[]})
         }
            reject(err)
        
        })


    })
   
  };



  export const getStates = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

      
        axios.get(`${api.protocol}${api.url}${api.getState}`).then((response) =>{

       

           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"INIT_STATES",payload:response.data})
               
            }
            else{
              reject(404)
            }
        }).catch(err=>{
          if(err.response&&err.response.status==404){
            dispatch({type:"INIT_STATES",payload:[]})
         }
            reject(err)
      
        })


    })
   
  };


  export const getDistrict = (id) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     
        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.get(`${api.protocol}${api.url}${api.getDistrict}id=${id}`).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})


           
            if(response.status==200&&response.data&&response.data.length&&response.data.length>0){
              resolve(response.data)
               
            }
            else{
              resolve([])
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})

            reject(err)
            
        })


    })
   
  };


  export const addFarmer = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.post(`${api.protocol}${api.url}${api.createFarmer}`,{
          "FARMER_NAME":data.name,
          "FARMER_FATHER_NAME":data.fatherName,
           "FARMER_DOB": data.dob,
           "FARMER_MOB": data.mob,
           "FARMER_VILLAGE":data.village,
         
           "FARMER_TEHSIL":data.tehsil,
           "FARMER_DISTRICT":data.district,
            "FARMER_PINCODE":data.pincode,
             "FARMER_STATE":data.state,
           
              "MAJOR_CROP_1":data.mp1,
               "MAJOR_CROP_2":data.mp2,
               "MAJOR_CROP_3":data.mp3,
               "LAND_HOLDING":data.landHolding,
               
                "FARMER_AADHAR_ID":data.addhar,
                "FARMER_BANK_ACC_NO":data.bank,
                "REGION_ID":data.regionId,
                "UPDATED_BY":getState().auth.id


        }).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200){
              resolve("success")
               
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
          
        })


    })
   
  };




  export const addRetailer = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.post(`${api.protocol}${api.url}${api.createRetails}`,{
          "RETAILER_NAME":data.name,
          "RETAILER_FATHER_NAME":data.fatherName,
           "RETAILER_DOB": data.dob,
           "RETAILER_MOB": data.mob,
           "RETAILER_VILLAGE":data.village,
           "RETAILER_PAN":data.PAN,
           "RETAILER_EMAIL_ID":data.email,
           "RETAILER_GSTIN":data.GST,
       
           "RETAILER_DISTRICT":data.district,
            "RETAILER_PINCODE":data.pincode,
             "RETAILER_STATE":data.state,
             "RETAILER_ADDRESS1":data.add1,
             "RETAILER_ADDRESS2":data.add2,
             "RETAILER_ADDRESS3":data.add3,
            
                "RETAILER_AADHAR_ID":data.addhar,
                "RETAILER_BANK_ACC_NO":data.bank,
                "REGION_ID":data.regionId,
                "UPDATED_BY":getState().auth.id


        }).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200){
              resolve("success")
               
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
          
        })


    })
   
  }


  export const addDistributor = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.post(`${api.protocol}${api.url}${api.createDistributor}`,{
          "DISTRIBUTOR_NAME":data.name,
        
           "DISTRIBUTOR_DOB": data.dob,
           "DISTRIBUTOR_MOB_NO": data.mob,
           "DISTRIBUTOR_PAN":data.PAN,
           "DISTRIBUTOR_EMAIL_ID":data.email,
           "DISTRIBUTOR_GSTIN":data.GST,
           "IIL_LICENCE_NO":data.IIL,
           "DISTRIBUTOR_DISTRICT":data.district,
            "DISTRIBUTOR_PINCODE":data.pincode,
             "DISTRIBUTOR_STATE":data.state,
           
             "DISTRIBUTOR_ADDRESS1":data.add1,
             "DISTRIBUTOR_ADDRESS2":data.add2,
             "DISTRIBUTOR_ADDRESS3":data.add3,
               
                "DISTRIBUTOR_AADHAR_ID":data.addhar,
                "DISTRIBUTOR_BANK_ACC_NO":data.bank,
                "REGION_ID":data.regionId,
                "UPDATED_BY":getState().auth.id


        }).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200){
              resolve("success")
               
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
          
        })


    })
   
  }
