import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MyError from '../../Admin/Notification/MyError'
import MySucces from '../../Admin/Notification/MySuccess'

const CustomOrderForm = (props) => {
	let initialStateOfInputFiled = {
		customer_name: '',
		customer_email: '',
		customer_phone: '',
		customer_address: '',
		'shopping_item_file[]': '',
		shopping_item: '',
	}

	let initialStateOfErrors = {
		customer_name: '',
		customer_email: '',
		customer_phone: '',
		customer_address: '',
		shopping_item_file: '',
		shopping_item: '',
	}

	const [customOrder, setCustomOrder] = useState(initialStateOfInputFiled)
	const [errorsBag, setErrorsBag] = useState(initialStateOfErrors)
	const [disableState, setDisableState] = useState('')
	const form = useRef(null)

	const [successMessage, setSuccessMessage] = useState({
		status: false,
		message: '',
	})

	const [errorMessage, setErrorMessage] = useState({
		status: false,
		message: '',
	})

	const resetSuccesMessage = () => {
		setSuccessMessage({
			...successMessage,
			status: false,
			message: '',
		})
	}

	const resetErrorMessage = () => {
		setErrorMessage({
			...errorMessage,
			status: false,
			message: '',
		})
	}

	useEffect(() => {
		const bsCustomFileInput = require('bs-custom-file-input')
		bsCustomFileInput.init()
		axios
			.get('/auth/customers/authUser')
			.then((response) => {
				console.log(response)
				if (response.data.success) {
					setCustomOrder({
						...customOrder,
						customer_name: response.data.data.name,
						customer_email: response.data.data.email,
						customer_phone: response.data.data.phone,
						customer_address: response.data.data.address,
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	console.log(customOrder)

	const handleOnChangeInput = (event) => {
		event.preventDefault()
		let message = ''
		switch (event.target.name) {
			// for phone number validation
			case 'coustomer_phone':
				let phoneNumber = event.target.value
					? Number(event.target.value)
					: event.target.value
				if (isNaN(phoneNumber)) {
					message = 'Please enter a valid phone number'
					phoneNumber = ''
				} else {
					message = ''
					phoneNumber = event.target.value
				}
				setCustomOrder({
					...customOrder,
					[event.target.name]: phoneNumber,
				})
				setErrorsBag({
					...errorsBag,
					[event.target.name]: message,
				})
				break

			case 'shopping_item_file[]':
				setCustomOrder({
					...customOrder,
					[event.target.name]: event.target.files,
				})
				break

			default:
				setCustomOrder({
					...customOrder,
					[event.target.name]: event.target.value,
				})
				setErrorsBag({
					...errorsBag,
					[event.target.name]: '',
				})
				break
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setDisableState('disabled')
		let customOrderPostedData = new FormData(form.current)
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		}
		await axios
			.post('custom-order', customOrderPostedData, config)
			.then(({ data }) => {
				if (data.success) {
					document.getElementById('resetForm').reset()
					setCustomOrder({
						...customOrder,
						'shopping_item_file[]': '',
						shopping_item: '',
					})
					setSuccessMessage({
						...successMessage,
						status: true,
						message: data.message,
					})
				} else {
					setErrorMessage({
						...errorMessage,
						status: true,
						message: data.message,
					})
					setErrorsBag(data.errors)
				}
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				setDisableState('')
			})
	}

	return (
		<>
			{successMessage.status && (
				<MySucces
					message={successMessage.message}
					resetSuccesMessage={resetSuccesMessage}
				/>
			)}

			{errorMessage.status && (
				<MyError
					message={errorMessage.message}
					resetErrorMessage={resetErrorMessage}
				/>
			)}
			<section className='container mt-5 mb-5'>
				<div className='row'>
					<div className='col-lg-6 offset-lg-3'>
						<form
							ref={form}
							id='resetForm'
							className='inverse-color-form'
							onSubmit={handleSubmit}
						>
							<fieldset disabled={disableState ? 'disabled' : ''}>
								<div className='row'>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='shopping_item_file'>
												Shopping Item List
											</label>
											<textarea
												rows='7'
												cols='50'
												className={`form-control ${
													errorsBag.shopping_item && `is-invalid`
												}`}
												placeholder='Shopping Item'
												id='shopping_item'
												name='shopping_item'
												value={customOrder.shopping_item}
												onFocus={(e) => {
													e.target.placeholder = ''
												}}
												onBlur={(e) => {
													e.target.placeholder = 'Shopping Item'
												}}
												onChange={handleOnChangeInput}
											/>
											<div className='invalid-feedback'>
												{errorsBag.shopping_item}
											</div>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='shopping_item_file'>
												Upload item list
											</label>
											<div className='custom-file'>
												<input
													type='file'
													className='custom-file-input'
													id='shopping_item_file'
													name='shopping_item_file[]'
													onChange={handleOnChangeInput}
													multiple
												/>
												<label
													className='custom-file-label cfl-left-align'
													htmlFor='customFile'
												>
													<span className='d-inline-block text-truncate w-75 text-black-50'>
														image or pdf or doc
													</span>
												</label>
											</div>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='customer_name'>Name *</label>
											<input
												type='text'
												className={`form-control ${
													errorsBag.customer_name && `is-invalid`
												}`}
												placeholder='Name'
												id='customer_name'
												name='customer_name'
												value={customOrder.customer_name}
												onChange={handleOnChangeInput}
											/>
											<div className='invalid-feedback'>
												{errorsBag.customer_name}
											</div>
										</div>
									</div>

									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='customer_phone'>Phone *</label>
											<input
												type='text'
												className={`form-control ${
													errorsBag.customer_phone && `is-invalid`
												}`}
												placeholder='phone'
												id='customer_phone'
												name='customer_phone'
												value={customOrder.customer_phone}
												onChange={handleOnChangeInput}
											/>
											<div className='invalid-feedback'>
												{errorsBag.customer_phone}
											</div>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='customer_email'>Email *</label>
											<input
												type='email'
												className={`form-control ${
													errorsBag.customer_email && `is-invalid`
												}`}
												placeholder='email'
												id='customer_email'
												name='customer_email'
												value={customOrder.customer_email}
												onChange={handleOnChangeInput}
											/>
											<div className='invalid-feedback'>
												{errorsBag.customer_email}
											</div>
										</div>
									</div>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='customer_address'>Address *</label>
											<textarea
												rows='3'
												cols='50'
												className={`form-control ${
													errorsBag.customer_address && `is-invalid`
												}`}
												id='customer_address'
												placeholder='Address'
												name='customer_address'
												value={customOrder.customer_address}
												onChange={handleOnChangeInput}
											/>
											<div className='invalid-feedback'>
												{errorsBag.customer_address}
											</div>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<button
											className='btn text-center submit-button w-100'
											type='submit'
										>
											{disableState === 'disabled' ? (
												<>
													<span
														className='spinner-border spinner-border-sm'
														role='status'
														aria-hidden='true'
													/>{' '}
													submitting...
												</>
											) : (
												<>submit</>
											)}
										</button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default CustomOrderForm
