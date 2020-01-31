import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import SignIn from './Components/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
	return (
		<div className='App'>
			<Route path='/' exact>
				<SignIn />
			</Route>
			<PrivateRoute exact path='/dashboard' component={Dashboard} />
		</div>
	);
}

export default App;
