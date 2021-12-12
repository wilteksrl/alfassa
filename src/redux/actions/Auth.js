import api from "../../utils/api";
import axios from "axios";

export const Login = (id, password) => async dispatch => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.post(`${api.protocol}${api.url}${api.empLogin}`,
        {
            EMP_ID:id,
            EMP_PWD:password
        }).then((response) =>{


            dispatch({type:"SET_MODAL",payload:{show:false}})
            if(response.status==200&&response.data&&response.data.length>0){
              resolve(200)
              console.log(response.data[0].EMP_CODE);
                dispatch({type:"LOGIN_EMP",payload:{
                  isAuth:true,
                  id:response.data[0].EMP_ID,
                  details:response.data[0]
                }})
            }
            else{
                resolve(409)
                dispatch({type:"SET_MODAL",payload:{show:false}})
            }
        }).catch(err=>{
          
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err.response.status)
           
        })


    })
   
  };



  export const changePassword = (old, newPassword) => async (dispatch,getState) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

      
        axios.put(`${api.protocol}${api.url}${api.changePassword}id=${getState().auth.id}`,
        {
          CURRENT_PASSWORD:old,
          NEW_PASSWORD:newPassword
        }).then((response) =>{


         
            dispatch({type:"SET_MODAL",payload:{show:false}})
            if(response.status==200&&response.data&&response.data.message){
              resolve(200)
               
            }
            else{
                resolve(409)
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
           
        })


    })
   
  };



  export const changeDetails = (resImg,mob) => async (dispatch,getState) => {

    return new Promise((resolve, reject) =>{
     

        dispatch({type:"SET_MODAL",payload:{show:true}})

var formData = new FormData();
if(resImg)
formData.append('user_image', {
  name: resImg.fileName,
    type: resImg.type,
    uri:resImg.uri
});
formData.append('EMP_MOBILE_NO', mob);
        axios.post(`${api.protocol}${api.url}${api.changeDetails}id=${getState().auth.id}`,
        
          formData
        , {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) =>{

         
            dispatch({type:"SET_MODAL",payload:{show:false}})
            if(response.status==200&&response.data&&response.data.message){
              resolve(200)
               dispatch({type:"LOGIN_EMP",payload:{details:{...getState().auth.details,EMP_MOBILE_NO:mob,EMP_IMAGE:resImg.uri}}})
            }
            else{
                resolve(409)
            }
        }).catch(err=>{
            dispatch({type:"SET_MODAL",payload:{show:false}})
            reject(err)
           
        })


    })
   
  };



  export const Logout = () => async dispatch => {



dispatch({type:"CLEAR_CUST"})
dispatch({type:"CLEAR_CLAIMS"})
dispatch({type:"CLEAR_ORDERS"})
dispatch({type:"CLEAR_TICKETS"})
dispatch({type:"LOGOUT"})


  }