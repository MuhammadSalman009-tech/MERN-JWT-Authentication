import * as actionTypes from "../Actions/actionTypes";

const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case actionTypes.AUTH:
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            return {...state,authData:action.payload};
        case actionTypes.LOGOUT:
            localStorage.clear();
            return {...state,authData:null};
        default:
            return state;

    }
}
export default authReducer;