import Fuse from "fuse.js"
const initialState = {
   employee:[],
   employeeIndex:null,
   getTask:[],
   deletetask:[],
   newActivity:{
    "TASK_ID":"" ,
    "ACTIVITY_HEADER":"",
   "ACTIVITY_DESCRIPTION":"",
    "ACTIVITY_OWNER":"",
    "START_DATE":"",
    "DUE_DATE":""
   },
   getTaskIndex:null,
   newTask:{
    "TASK_NAME":" ",
    "PRIORITY":"1",
    "COLOR":"16",
    "CREATED_BY":" ",
    "START_DATE":" ",
    "DUE_DATE":" ",
    "NOTES":" ",
    "ASSIGNED_TO":["1231","123123"]
   }

}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_TEAM':
            var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                  "EMP_NAME",
                  
                ]
              };
             ; // "list" is the item array

             var fuse = new Fuse(action.payload, options)
            //  console.log("reducer"+employee);

    return {...state,employee:action.payload,employeeIndex:fuse}
        // return { ...state, employee: action.payload }

        case 'DELETE_TASK':

          return {
            ...state,
            deletetask: {
            }
          }

        case 'UPDATE_NEW_TASK':



            return { ...state, newTask: { ...state.newTask, ...action.payload } }
          case 'INIT_ADD_TASK':
      
      
      
            return {
              ...state,
              newTask: {
                "TASK_NAME":" ",
                "PRIORITY":"1",
                "COLOR":"16",
                "CREATED_BY":" ",
                "START_DATE":" ",
                "DUE_DATE":" ",
                "NOTES":" ",
                "ASSIGNED_TO":["1231","123123"]
              }
            }
            case 'UPDATE_NEW_ACTIVITY':



              return { ...state, newActivity: { ...state.newActivity, ...action.payload } }
            case 'INIT_ADD_ACTIVITY':
        
        
        
              return {
                ...state,
                newActivity: {
                  "TASK_ID":"" ,
                  "ACTIVITY_HEADER":"",
                 "ACTIVITY_DESCRIPTION":"",
                  "ACTIVITY_OWNER":"",
                  "START_DATE":"",
                  "DUE_DATE":""
                }
              }
  
  

            case 'GET_TASK':
              var task = {
                  shouldSort: true,
                  threshold: 0.6,
                  location: 0,
                  distance: 100,
                  maxPatternLength: 32,
                  minMatchCharLength: 1,
                  keys: [
                    "TASK_ID",
                    "TASK_NAME",
                    "START_DATE",
                    "DUE_DATE",
                    "PRIORITY",
                    "COLOR",
                    
                  ]
                };
               ; // "list" is the item array
  
               var fuse = new Fuse(action.payload, task)
              //  console.log("reducer"+employee);
  console.log(action.payload);
      return {...state,getTask:action.payload,getTaskIndex:fuse}

  
  

        default :
        return state
    }
}


