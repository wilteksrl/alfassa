
const initialState = {
    isAuth:false,
    id:null,
    details:{},
    
  
 
    
 
  }
 
 
 export default function(state = initialState, action) {
 
   switch (action.type) {
     case 'LOGIN_EMP':
     
      
 
           return {...state,...action.payload}

case "LOGOUT":
    return {...state, 
        isAuth:false,
        id:null,
        details:{},
    }




    
 default :
 return state
 }
 
 }