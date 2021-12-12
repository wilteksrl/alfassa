import Fuse from "fuse.js"
const initialState = {
    allProducts:[],
    allPlants:[],
    products:[],
    customer:null,
    plant:null,
    remarks:null,
    allOrders:[],
    productIndex:null,
    plantIndex:null,
    orderIndex:null
  }
 export default function(state = initialState, action) {
   switch (action.type) {
     case 'SELECT_CUSTOMER':
     return {...state,customer:action.payload}
 case "GET_PLANTS":
  var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "PLANT_DESCRIPTION",
      "PLANT_ID",
      "REGION_NAME",
    
    ]
  };
 ; // "list" is the item array
 

  var fuse2 = new Fuse(action.payload, options)
   return {...state,allPlants:action.payload,plantIndex:fuse2}

   case "GET_PRODUCTS":
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "PLANT_DESCRIPTION",
        "SKU_ID",
        "SKU_DESCRIPTION",
        "CATEGORY_NAME"
      ]
    };
   ; // "list" is the item array
   

    var fuse1 = new Fuse(action.payload, options)
 

    return {...state,allProducts:action.payload,productIndex:fuse1}

    case "SET_PLANT":
    return {...state,plant:action.payload}

    case "SELECT_REMARK":
      return {...state,remarks:action.payload}

    case "UPDATE_PRODUTS":
      return {...state,products:[...action.payload]}

    case "GET_STOCKS":
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "PLANT_DESCRIPTION",
          "SKU_ID",
          "SKU_DESCRIPTION",
          "CATEGORY_NAME"
        ]
      };
     ; // "list" is the item array
     
    
  
      var fuse3 = new Fuse(action.payload, options)
    return {...state,allProducts:action.payload,productIndex:fuse3}

    case "GET_ORDERS":
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "ORDER_ID",
          "CUSTOMER_NAME",
          "TOTAL_ORDER_VALUE",
          "PLANT_NAME",
          "ORDER_DATE"
        ]
      };
      var fuse3 = new Fuse(action.payload, options)
      return {...state,allOrders:action.payload,orderIndex:fuse3}

      case "EXTEND_ORDERS":
        var options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "ORDER_ID",
            "CUSTOMER_NAME",
            "TOTAL_ORDER_VALUE",
            "PLANT_NAME",
            "ORDER_DATE"
          ]
        };
        var fuse3 = new Fuse([...state.allOrders,...action.payload], options)
        return {...state,allOrders:[...state.allOrders,...action.payload,]}

        case "CLEAR_CART":
          return {...state,
            products:[],
          }




    case "REINITORDER":
      return {...state,
        products:[],
        customer:null,
        plant:{}
      }

      case "CLEAR_ORDERS":
        return{
          allProducts:[],
    allPlants:[],
    products:[],
    customer:null,
    plant:null,
    allOrders:[],
    productIndex:null,
    plantIndex:null,
    orderIndex:null
        }
    
 default :
 return state
 }
 
 }