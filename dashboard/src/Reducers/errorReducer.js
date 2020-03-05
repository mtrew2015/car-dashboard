import {ERROR} from '../Actions/index';

const initialState = {
    error: false
}

export default ((state = initialState, action) => { 
    switch(action.type){
        case ERROR: 
        return {...state, error: action.message}

        default: return state;
    }

} )