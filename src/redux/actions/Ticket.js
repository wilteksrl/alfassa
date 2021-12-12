import api from "../../utils/api";
import axios from "axios";



 









  export const addTicket = (data) => async ( dispatch,getState ) => {

    return new Promise((resolve, reject) =>{

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
      
        axios.post(`${api.protocol}${api.url}${api.createTicket}id=${getState().auth.id}`,{
          ...data


        }).then((response) =>{

            dispatch({type:"SET_MODAL",payload:{show:false}})

           
            if(response.status==200){
              resolve("success")
               
            }
        }).catch(err=>{
        
            reject(err)
          
        })


    })
   
  }


  
export const getTickets = (type=1) => async ( dispatch,getState ) => {

  return new Promise((resolve, reject) =>{
   

    


    
      axios.get(`${api.protocol}${api.url}${api.getTickets}id=${getState().auth.id}&limit=${20}&offset=${type==1?0:getState().ticket.tickets.length}`).then((response) =>{

       

          if(response.status==200&&response.data&&response.data.length>0){
  if(type==1)
            dispatch({type:"INIT_TICKETS",payload:response.data})
            else
            dispatch({type:"EXTEND_TICKETS",payload:response.data})
             resolve("success")
          }
          else{
            reject(404)
          }
      }).catch(err=>{
     
        if(err.response&&err.response.status==404){
          if(type==1)
            dispatch({type:"INIT_TICKETS",payload:[]})
            else
            dispatch({type:"EXTEND_TICKETS",payload:[]})
       }
          reject(err)
        
      })


  })
 
};


export const getComponents=()=>async ( dispatch,getState )=>{
  return new Promise((resolve, reject) =>{
   
 
    
        
          axios.get(`${api.protocol}${api.url}${api.getComponents}`).then((response) =>{
    
           
    
              if(response.status==200&&response.data&&response.data.length>0){

                dispatch({type:"SET_COMPONENTS",payload:response.data})
               
                 resolve("success")
              }
              else{
                reject(404)
              }
          }).catch(err=>{
            if(err.response&&err.response.status==404){
              dispatch({type:"SET_COMPONENTS",payload:[]})
           }
            
              reject(err)
            
          })
    
    
      })
     
}


export const getPriorityList=()=>async ( dispatch,getState )=>{
  return new Promise((resolve, reject) =>{
   
 
    
        
          axios.get(`${api.protocol}${api.url}${api.getPriorityList}`).then((response) =>{
    
           
    
              if(response.status==200&&response.data&&response.data.length>0){

                dispatch({type:"SET_PRIORITIES",payload:response.data})
              
                 resolve("success")
              }
              else{
                reject(404)
              }
          }).catch(err=>{
            if(err.response&&err.response.status==404){
              dispatch({type:"SET_PRIORITIES",payload:[]})
           }
           
              reject(err)
            
          })
    
    
      })
     
}