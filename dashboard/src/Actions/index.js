import { server } from '../axios';

export const GET_CARS = 'GET_CARS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const ADD_CAR = 'ADD_CAR';
export const getCars = () => (dispatch) => {
	console.log('running');
	dispatch({ type: LOADING });
	server
		.get('/cars')
		.then((res) => {
			console.log(res);
            dispatch({ type: GET_CARS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: ERROR, message: err.message });
		});
};

export const addCar = (car) => (dispatch) => {
    dispatch({ type: LOADING });
    console.log(car, 'car from actions')
	server
		.post('/carss', car)
		.then((res) => {
            dispatch({ type: ADD_CAR, payload: res.data });
            dispatch({type: ERROR, message: false})
        })
		.catch((err) => {
			dispatch({ type: ERROR, message: err.message });
        });
};
