
const initialState = {
   modal:{
       show:false
   },
  team:[],
 offers:[]
    
 
  }
 
 
 export default function(state = initialState, action) {
 
   switch (action.type) {
  

case "SET_MODAL":
    return {...state, 
        modal:{
            ...action.payload
        }
      
    }


case "SET_TEAM":
    return {...state,
        team:[...action.payload]}


        case "SET_OFFER":
            return {...state,
            
            offers:[...action.payload]
        
        }

            case "EXTEND_OFFER":
                return {...state,
                
                offers:[...state.offers,...action.payload]}

    
 default :
 return state
 }
 
 }