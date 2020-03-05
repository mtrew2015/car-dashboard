import React, { useEffect } from 'react';
import './Dashboard.scss';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { useToggle } from '../../hooks';
import {  useSelector, useDispatch } from 'react-redux';
import { getCars } from '../../Actions';

function Dashboard(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
    const { cars, loading } = state.carReducer;
    const {error} = state.errorReducer; 

	useEffect(() => {
		dispatch(getCars());
	}, []);

	// const handleDelete = (id) => {
	// 	server
	// 		.delete(`/cars/${id}`)
	// 		.then((res) => console.log(res))
	// 		.then(() => {
	// 			const filtered = cars.filter((car) => {
	// 				return car._id !== id;
	// 			});
	// 			setCars(filtered);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// const sort = (column) => {
	//     const sorted = cars.sort((a,b) => {
	//         console.log(a[column], b[column])
	//          a = parseInt(a[column])
	//          b = parseInt(b[column])
	//          setToggle()
	//          return toggle ? a-b : b-a
	//     })
	//     setCars([...sorted])
	//     setCarList([...sorted])
    // }
	return (
		<div className='dash-wrapper'>
			<h1>Dashboard</h1>
			<Link to='/add'>Add Car</Link>
			<button
				onClick={() => {
					localStorage.clear();
					history.push('/');
				}}>
				Sign Out
			</button>
			<div className='information'>
				<p>Number of Cars in Inventory: {cars.length}</p>
				<p>
					MSRP Of Inventory: ${cars
						.reduce((accumulator, item) => {
							return accumulator + Number(item.price);
						}, 0)
						.toLocaleString('USD')}
				</p>
			</div>
            <div className='currentInventory'>
                {error && <p>{error}</p>}
				<Table dark className='table'>
					<thead>
						<tr className='table-row'>
							<th>Year</th>
							<th>Make</th>
							<th>Model</th>
							<th>Price</th>
							<th>Miles</th>
							<th>Color</th>
							<th>Vin</th>
						</tr>
					</thead>
					<tbody>
						{cars.map((car) => {
							return (
								<tr key={car._id} className='table-row'>
									<th scope='row'>{car.year}</th>
									<td>{car.make}</td>
									<td>{car.model}</td>
									<td>${car.price.toLocaleString('USD')}</td>
									<td>{car.miles.toLocaleString()}</td>
									<td>{car.color}</td>
									<td>{car.vin}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default Dashboard;
