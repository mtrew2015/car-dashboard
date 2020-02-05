import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './EditCar.scss';
import { useHistory, useParams } from 'react-router-dom';
import { server } from '../../axios';

export default function EditCar(props) {
	const { carList } = props;
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();
	const { id } = useParams();
	const [ car, setCar ] = useState({});

	useEffect(
		() => {
			const car = carList.find((car) => {
				return car._id === id;
			});
			setCar(car);
		},
		[ carList, id ],
	);

	const onSubmit = (data) => {
		const car = data;
		console.log(car);
		server
			.put(`/cars/${id}`, car)
			.then((res) => console.log(res))
			.then(history.push('/dashboard'))
			.catch((err) => console.log(err));
	};

	if (!car) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='edit-container'>
			<h1>Edit Car</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<span>
					Year<input
						placeholder='Year'
						type='number'
						name='year'
						ref={register({ required: true, pattern: /[0-9]{4}/ })}
						defaultValue={car.year}
					/>
				</span>

				<span>
					Make<input defaultValue={car.make} placeholder='Make' name='make' ref={register({ required: true })} />
				</span>

				<span>
					Model<input defaultValue={car.model} placeholder='Model' name='model' ref={register({ required: true })} />
				</span>

				<span>
					Miles<input
						defaultValue={car.miles}
						placeholder='Miles'
						type='number'
						name='miles'
						ref={register({ required: true })}
					/>
				</span>

				<span className='third'>
					Price<input
						defaultValue={car.price}
						placeholder='Price'
						type='number'
						name='price'
						ref={register({ required: true })}
					/>
				</span>

				<span className='third'>
					Vin<input defaultValue={car.vin} placeholder='vin' name='vin' ref={register({ required: true })} />
				</span>

				<span className='third'>
					Color
					<input defaultValue={car.color} placeholder='Color' name='color' ref={register({ required: true })} />
				</span>

				<input className='btn' type='submit' />
			</form>
			{errors.year && 'Year Must A 4 Digit Number'}
			{errors.color && 'Enter The Color Please'}
			{errors.vin && 'Enter The Vin Number'}
			{errors.miles && 'Accurate Miles Are Required'}
			{errors.model && 'Model is Required'}
			{errors.price && 'Enter Selling Price'}
			{errors.make && 'Make is Required'}
		</div>
	);
}
