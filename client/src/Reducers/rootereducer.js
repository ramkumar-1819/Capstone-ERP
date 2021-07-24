import { combineReducers } from "redux";
import loginReducer from "./loginreducer";
import userReducer from "./UserReducer";

const rootReducer=combineReducers({
    auth:loginReducer, //auth - hold who is loggin in [Admin,Student,Librarian,Faculty]
    user:userReducer,  //user - hold the logged in user datas ie ID.
})
export default rootReducer;