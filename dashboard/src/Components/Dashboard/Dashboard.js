import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import { server } from '../../axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import {useToggle} from '../../hooks';

function Dashboard(props) {
    const [initial, setInitial] = useState(false)
	console.log(props);
	const { carList, setCarList } = props;
	const [ cars, setCars ] = useState([]);
    const history = useHistory();
    const [toggle, setToggle] = useToggle();

    console.log(carList, 'carList');
    console.log(cars, 'cars')
	useEffect(
		() => {
			server
				.get('/cars')
				.then((res) => {
					setCars(res.data);
					setCarList(res.data);
				})
				.catch((err) => console.log(err));
		},
		[ setCarList],
    );
    
    const handleDelete = (id) => {
		server
			.delete(`/cars/${id}`)
			.then((res) => console.log(res))
			.then(() => {
				const filtered = cars.filter((car) => {
					return car._id !== id;
				});
				setCars(filtered);
			})
			.catch((err) => console.log(err));
    };
    
    const sort = (column) => {
        const sorted = cars.sort((a,b) => {
            console.log(a[column], b[column])
             a = parseInt(a[column])
             b = parseInt(b[column])
             setToggle()
             return toggle ? a-b : b-a
        })
        setCars([...sorted])
        setCarList([...sorted])
    }
	return (
		<div className="dash-wrapper">
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
				<Table dark className='table'>
					<thead>
						<tr className='table-row'>
							<th onClick={() => sort("year")}>Year</th>
							<th>Make</th>
                            <th>Model</th>
                            <th onClick = {() => sort("price")}>Price</th>
							<th>Miles</th>
							<th>Color</th>
							<th>Vin</th>
						</tr>
                    </thead>
                    
					{cars.map((car) => {
						return (
							<React.Fragment>
								<tbody>
									<tr className='table-row' key={car._id}>
										<th scope='row'>{car.year}</th>
										<td>{car.make}</td>
                                        <td>{car.model}</td>
                                        <td>${car.price.toLocaleString("USD")}</td>
										<td>{car.miles.toLocaleString()}</td>
										<td>{car.color}</td>
										<td>{car.vin}</td>
									</tr>
								</tbody>
							</React.Fragment>
						);
					})}
				</Table>
			</div>
		</div>
	);
}

export default Dashboard;
