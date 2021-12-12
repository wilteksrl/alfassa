import Fuse from "fuse.js"
const initialState = {
    getSales:{},
    quartersale:[],
    monthsale:[],
    chart:[]

}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'TODAY_SALES':

        return { ...state, sales: action.payload }

        case 'QUARTER_SALES':

        return { ...state, quartersale: action.payload }


        case 'MONTH_SALES':

            return { ...state, monthsale: action.payload }

            case 'CHART':

                return { ...state, chart: action.payload }
    



        default :
        return state
    }
}