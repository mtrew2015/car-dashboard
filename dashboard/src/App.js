import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AddCar from './Components/AddCar/AddCar';

function App(props) {
    const [carList, setCarList] = useState([]);
	return (
		<div className='App'>
			<Route path='/' exact>
				<SignIn />
            </Route>
            <Route path="/dashboard">
                <Dashboard carList={carList} setCarList={setCarList}/>
            </Route>
            <Route path="/add">
                <AddCar carList={carList} setCarList={setCarList}/>
            </Route>
		</div>
	);
}

export default App;
