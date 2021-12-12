import api from "../../utils/api";
import axios from "axios";



  export const UpdateModal = (data) => async dispatch => {


dispatch({type:"SET_MODAL",payload:data})





  }




  export const getTeam= () => async ( dispatch,getState ) => {
    return new Promise((resolve,reject) => {
              
   dispatch({type:"SET_MODAL",payload:{show:true}})
       axios.get(`${api.protocol}${api.url}${api.getTeam}id=${getState().auth.id}`).then((response) =>{
              
   dispatch({type:"SET_MODAL",payload:{show:false}})

    if(response.status==200&&response.data.length)
          dispatch({type:"SET_TEAM",payload:response.data})
          
       }).catch(err=>{
                    
   dispatch({type:"SET_MODAL",payload:{show:false}})
          reject(err)
       })
    
    })
  
           }










           export const getAnnouncments= (type=1) => async ( dispatch,getState ) => {


            return new Promise((resolve,reject) => {
                      
      
               axios.get(`${api.protocol}${api.url}${api.getOffers}id=${getState().auth.id}&limit=${20}&offset=${type==1?0:getState().utils.offers.length}`).then((response) =>{
                
            if(response.status==200&&response.data&&response.data.length>0){      
                if(type==1)
                dispatch({type:"SET_OFFER",payload:response.data})
                else
                dispatch({type:"EXTEND_OFFER",payload:response.data})
                 resolve("success")
              }
              else{
                  reject(404)
              }
        
         
                  
               }).catch(err=>{
                  if(err.response&&err.response.status==404){
                     if(type==1)
                     dispatch({type:"SET_OFFER",payload:[]})
                     else
                     dispatch({type:"EXTEND_OFFER",payload:[]})

                  }
        
                  reject(err)
               })
            
            })
          
                   }