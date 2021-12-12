import Fuse from "fuse.js"
const initialState = {
  tickets:[],
 components:[],
 priorities:[],
ticketIndex:null
    
 
  }
 
 
 export default function(state = initialState, action) {
  var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "TICKET_ID",
      "CREATED_ON",
      "STATUS_DESC",
      "date"
  

     
    ]
  };


   switch (action.type) {
   


    case 'INIT_TICKETS':

      let dataRefined=action.payload.map(item=>{
        return({
          ...item,
          date:new Date(item.CREATED_ON).toDateString(), 
         
       
        })
      })
     
      var fuse = new Fuse(dataRefined, options)

 
return {...state,tickets:dataRefined,ticketIndex:fuse}

    case 'EXTEND_TICKETS':
      let dataRefined2=action.payload.map(item=>{
        return({
          ...item,
          date:new Date(item.CREATED_ON).toDateString(), 
         
       
        })
      })
     
      var fuse = new Fuse(dataRefined2, options)


       return {...state,tickets:[...state.tickets,...dataRefined2],ticketIndex:fuse}

case "SET_COMPONENTS":
    return {...state,components:[...action.payload]}

    case "SET_PRIORITIES":
      return {...state,priorities:[...action.payload]}
   
    case "CLEAR_TICKETS":
      return{
        tickets:[],
 components:[],
 priorities:[]
      }


 default :
 return state
 }
 
 }