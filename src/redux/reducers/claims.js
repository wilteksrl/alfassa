import Fuse from "fuse.js"
const initialState = {
  level: null,
  claimCycle: {},
  MAX_CLAIM_DAYS_LIMIT: 0,
  zeroClaim: {},
  deleteClaim: {},
  claims: [],
  roles:[],
  newClaim: {
    "DA_RATES_LOCAL": 0,
    "DA_RATES_OUTST": 0,
    "EXP_PER_KM_RATE": 0,
    "EXP_BUS_TRAIN": 0,
    "EXP_PLANE": 0,
    "EXP_TAXI_AUTO": 0,
    "EXP_VEH_REPAIR": 0,
    "EXP_HOTEL": 0,
    "EXP_STATIONARY": 0,
    "EXP_MOBILE_INTERNET": 0,
    "EXP_MISC": 0,
    "START_KM": 0,
    "EXP_FUEL": 0,
    "END_KM": 0,
    "MISC_COMMENTS": " ",
    "TOTAL_CLAIMED_AMOUNT": 0
  },
  claimIndex: null





}


export default function (state = initialState, action) {
  var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "CLAIM_ID",
      "CLAIM_DATE",
      // "MISC_COMMENTS",
      "TOTAL_CLAIMED_AMOUNT",
      "date",
      "badgeText",


    ]
  };
  switch (action.type) {
    case 'INIT_LEVEL':



      return { ...state, level: action.payload }

      case 'CLAIM_CYCLE':
 
        return { ...state, cycle: action.payload }
        case 'GET_ROLE':
 var ref_ids = []
 let roleData=action.payload;

roleData.forEach(ELE => {
 ref_ids.push( ELE.REF_ID)
});
console.log(ref_ids);
          return { ...state, roles: ref_ids }



    case 'INIT_CLAIMS':


      let dataRefined = action.payload.map(item => {
        return ({
          ...item,
          date: new Date(item.CLAIM_DATE).toDateString(),
          badgeText: item.APPROVAL_STATUS == "1" ? "Approved" : "Pending"

        })
      })

      var fuse = new Fuse(dataRefined, options)

      return { ...state, claims: dataRefined, claimIndex: fuse }

    case 'EXTEND_CLAIMS':

      let dataRefined2 = action.payload.map(item => {
        return ({
          ...item,
          date: new Date(item.CLAIM_DATE).toDateString(),
          badgeText: item.APPROVAL_STATUS == "1" ? "Approved" : "Pending"

        })
      })


      var fuse = new Fuse([...state.claims, ...dataRefined2], options)

      return { ...state, claims: [...state.claims, ...dataRefined2], claimIndex: fuse }


    case 'UPDATE_NEW_CLAIM':



      return { ...state, newClaim: { ...state.newClaim, ...action.payload } }
    case 'INIT_ADD_CLAIM':



      return {
        ...state,
        newClaim: {
          "DA_RATES_LOCAL": 0,
          "DA_RATES_OUTST": 0,
          "EXP_PER_KM_RATE": 0,
          "EXP_BUS_TRAIN": 0,
          "EXP_PLANE": 0,
          "EXP_TAXI_AUTO": 0,
          "EXP_VEH_REPAIR": 0,
          "EXP_HOTEL": 0,
          "EXP_STATIONARY": 0,
          "EXP_MOBILE_INTERNET": 0,
          "EXP_MISC": 0,
          "START_KM": 0,
          "END_KM": 0,
          "EXP_FUEL": 0,
          "MISC_COMMENTS": " ",
          "TOTAL_CLAIMED_AMOUNT": 0
        }
      }

    case 'ZERO_CLAIM':

      return {
        ...state,
        zeroClaim: {}
      }

    case 'DELETE_ZERO_CLAIM':

      return {
        ...state,
        deleteClaim: {
        }
      }



    case "CLEAR_CLAIMS":
      return {
        level: null,
        claims: [],
        newClaim: {
          "DA_RATES_LOCAL": 0,
          "DA_RATES_OUTST": 0,
          "EXP_PER_KM_RATE": 0,
          "EXP_BUS_TRAIN": 0,
          "EXP_PLANE": 0,
          "EXP_TAXI_AUTO": 0,
          "EXP_VEH_REPAIR": 0,
          "EXP_HOTEL": 0,
          "EXP_STATIONARY": 0,
          "EXP_MOBILE_INTERNET": 0,
          "EXP_MISC": 0,
          "START_KM": 0,
          "EXP_FUEL": 0,
          "END_KM": 0,
          "MISC_COMMENTS": " ",
          "TOTAL_CLAIMED_AMOUNT": 0
        },
        claimIndex: null
      }

    case "SET_MAX_CLAIM_DAYS_LIMIT":
      return {
        ...state,
        MAX_CLAIM_DAYS_LIMIT: action.payload
      }

    default:
      return state
  }

}