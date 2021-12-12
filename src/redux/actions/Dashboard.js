import api from "../../utils/api";
import axios from "axios";


export const getSales = () => async ( dispatch,getState ) => {

   return new Promise((resolve, reject) =>{
    

       dispatch({type:"SET_MODAL",payload:{show:true}})

     
       axios.get(`${api.protocol}${api.url}${api.dashboard}id=${getState().auth.id}`).then((response) =>{

           dispatch({type:"SET_MODAL",payload:{show:false}})

          
           if(response.status==200&&response.data&&response.data.length>0){
             dispatch({type:"TODAY_SALES",payload:response.data[0]})
              
           }
           else{
               reject(404)
               dispatch({type:"SET_MODAL",payload:{show:false}})
           }
       }).catch(err=>{
           if(err.response&&err.response.status==404){
               dispatch({type:"TODAY_SALES",payload:null})
            }
           dispatch({type:"SET_MODAL",payload:{show:false}})
           reject(err)
       
       })


   })
  
 }

 export const quarterSale = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     
 
        dispatch({type:"SET_MODAL",payload:{show:true}})
 
      // console.log("api",`${api.protocol}${api.url}${api.quarterSale}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.quarterSale}id=${getState().auth.id}`).then((response) =>{
 
            dispatch({type:"SET_MODAL",payload:{show:false}})
 
           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"QUARTER_SALES",payload:response.data})
               
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"QUARTER_SALES",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })
 
 
    })
   
  }

  export const monthSale = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     
 
        dispatch({type:"SET_MODAL",payload:{show:true}})
 
      // console.log("api",`${api.protocol}${api.url}${api.monthSale}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.monthSale}id=${getState().auth.id}`).then((response) =>{
 
            dispatch({type:"SET_MODAL",payload:{show:false}})
 
           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"MONTH_SALES",payload:response.data})
               
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"MONTH_SALES",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })
 
 
    })
   
  }

  export const chart = () => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{
     
 
        dispatch({type:"SET_MODAL",payload:{show:true}})
 
      // console.log("api",`${api.protocol}${api.url}${api.chart}id=${getState().auth.id}`);
        axios.get(`${api.protocol}${api.url}${api.chart}id=${getState().auth.id}`).then((response) =>{
 
            dispatch({type:"SET_MODAL",payload:{show:false}})
 
           
            if(response.status==200&&response.data&&response.data.length>0){
              dispatch({type:"CHART",payload:response.data})
               
            }
            else{
                reject(404)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
            if(err.response&&err.response.status==404){
                dispatch({type:"CHART",payload:null})
             }
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
        
        })
 
 
    })
   
  }