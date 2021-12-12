import { combineReducers } from 'redux';
import cutomers from "./customers"
import auth from "./auth"
import utils from "./utils"
import claims from "./claims"
import order from "./order"
import ticket from "./ticket"
import task from "./task"
import dashboard from './dashboard';
export default combineReducers({
    cutomers:cutomers,
    auth:auth,
    utils:utils,
    claims:claims,
    order:order,
    ticket:ticket,
    dashboard:dashboard,
    task:task
})