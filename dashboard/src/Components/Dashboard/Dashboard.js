import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import {server} from '../../axios';
import {useHistory} from 'react-router-dom';

function Dashboard() {
    const [ cars, setCars ] = useState([]);
    const history = useHistory()
	useEffect(() => {
		server.get('/cars').then((res) => setCars(res.data)).catch((err) => console.log(err));
	}, []);
	return (
		<div>
            <h1>Dashboard</h1>
            <button onClick={() => {localStorage.clear(); history.push('/');}}>Sign Out</button>
            <div className="information">
                <p>Number of Cars in Inventory: {cars.length}</p>
                <p>MSRP Of Inventory: ${cars.reduce((accumulator, item) => {
                    return  accumulator + Number(item.price)
                }, 0).toLocaleString("USD")}</p>
            </div>
        <div className="currentInventory">
                {cars.map(car => {
                    return <p key={car._id}>{car.year}, {car.make},  {car.model}, {car.miles}, {car.color}, {car.vin} <button>Delete</button> <button>Edit</button></p>
                })}
        
        </div>
		</div>
	);
}

export default Dashboard;
