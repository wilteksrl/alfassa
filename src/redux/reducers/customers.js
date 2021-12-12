import Fuse from "fuse.js"
const initialState = {
   customers:[],
   regions:[],
   state:[],
   customerIndex:null

   

 }


export default function(state = initialState, action) {

  switch (action.type) {
    case 'INIT_CUSTOMERS':
      
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "CUSTOMER_NAME",
          "CUSTOMER_MOB",
          "CUSTOMER_CITY",
          "TYPE"
        ]
      };
     ; // "list" is the item array
     

      var fuse = new Fuse(action.payload, options)
   
    return {...state,customers:action.payload,customerIndex:fuse}

    case "INIT_REGIONS":

    return {...state,regions:action.payload}

    case "INIT_STATES":

      return {...state,state:action.payload}


      case "CLEAR_CUST":
        return{
          customers:[],
          regions:[],
          state:[],
          customerIndex:null
       
          
       
        }
   
default :
return state
}

}