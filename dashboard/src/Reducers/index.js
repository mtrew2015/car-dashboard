import {combineReducers} from 'redux';
import carReducer from './carReducer'; 
import errorReducer from './errorReducer'


export default combineReducers({
    carReducer, errorReducer
})