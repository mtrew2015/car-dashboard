import {GET_CARS, ERROR, LOADING, ADD_CAR} from '../Actions/index'; 

const initialState = {
    cars: [], 
    user: {},
    loading: false, 
    loggedIn: false, 
}

export default (state = initialState, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_CARS:
            return {...state, cars: action.payload, loading: false}
        case ADD_CAR: 
            return {...state, loading: false}
        default: return state
    }
}
