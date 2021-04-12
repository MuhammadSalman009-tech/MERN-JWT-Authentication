import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from './Reducer/authReducer';
import thunk from "redux-thunk";
export const configureStore=()=>{
    const store=createStore(
        combineReducers({
            authReducer
        }),
        applyMiddleware(
            thunk
        )
    );
    return store;
}