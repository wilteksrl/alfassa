import api from "../../utils/api";
import axios from "axios";







export const getClaims = (type=1) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

 

      
        axios.get(`${api.protocol}${api.url}${api.getClaims}id=${getState().auth.id}&limit=${20}&offset=${type==1?0:getState().claims.claims.length}`).then((response) =>{

         

            if(response.status==200&&response.data&&response.data.length>0){
    if(type==1)
              dispatch({type:"INIT_CLAIMS",payload:response.data})
              else
              dispatch({type:"EXTEND_CLAIMS",payload:response.data})
               resolve("success")
            }
            else{
                reject(404)
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                if(type==1)
                dispatch({type:"INIT_CLAIMS",payload:[]})
                else
                dispatch({type:"EXTEND_CLAIMS",payload:[]})
             }
            reject(err)
          
        })


    })
   
  };


  export const getClaimsLimit = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.get(`${api.protocol}${api.url}${api.getClaimsLevel}id=${getState().auth.id}`).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"INIT_LEVEL",payload:response.data[0]})
               
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"INIT_LEVEL",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })


    })
   
  };


  export const getClaimsGlobal = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

     

      
        axios.get(`${api.protocol}${api.url}${api.getGlobalSettings}`).then((response) =>{

         

           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"SET_MAX_CLAIM_DAYS_LIMIT",payload:response.data[0].MAX_CLAIM_DAYS_LIMIT})
               
            }
            else{
                reject(404)
               
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"SET_MAX_CLAIM_DAYS_LIMIT",payload:0})
             }
          
            reject(err)
        
        })


    })
   
  };







  export const setClaimVal=(data) => async ( dispatch,getState)=>{

      dispatch({type:"UPDATE_NEW_CLAIM",payload:data})
  }


  export const createClaim = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      console.log("create"+data);
        axios.post(`${api.protocol}${api.url}${api.createClaim}id=${getState().auth.id}`,
    {...data}).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           console.log(response.data);
            if(response.status==200){
              resolve("success")
               dispatch({type:"INIT_ADD_CLAIM"})
            }
            // else{
            //     reject("err")
        
            
        }).catch(err=>{
           console.log(err);
            reject(err)
        
        })


    })
   
  };



  export const createZeroClaim = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      console.log(`${api.protocol}${api.url}${api.zeroClaim}id=${getState().auth.id}`);
        axios.post(`${api.protocol}${api.url}${api.zeroClaim}id=${getState().auth.id}`,
    {...data}).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200){
              resolve("success")
               dispatch({type:"ZERO_CLAIM"})
            }
            // else{
            //     reject("err")
        
            // }
        }).catch(err=>{
           
            reject(err)
        
        })


    })
   
  };


  export const delelteZeroClaim = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})
        axios.get(`${api.protocol}${api.url}${api.deleteClaim}id=${data}`,
    ).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200&&response.data&&response.data.status==true){
              resolve("success")
               dispatch({type:"DELETE_ZERO_CLAIM"})
            }
            else{
                reject("err")
        
            }
        }).catch(err=>{
           
            reject(err)
        
        })


    })
   
  };




  export const claimCycle = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.get(`${api.protocol}${api.url}${api.getClaimCycle}id=${getState().auth.id}`).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           console.log(response.data);
            if(response.status==200){
              dispatch({type:"CLAIM_CYCLE",payload:response.data})
               
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"CLAIM_CYCLE",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })


    })
   
  };


  export const getRoles = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      console.log(`${api.protocol}${api.url}${api.getRole}?id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.getRole}?id=${getState().auth.id}`).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

            if(response.status==200){
              dispatch({type:"GET_ROLE",payload:response.data})
                                                              
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"GET_ROLE",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })


    })
   
  };