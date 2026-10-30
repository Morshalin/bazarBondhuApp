/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Storage from '../../../Helpers/Auth/Storage'

const OtpLoginForm = (props) => {
	const router = useRouter()
	const initialLoginCredential = {
		number: '',
		otp: '',
	}
	const initialResetPinData = {
		password: '',
		password_confirmation: '',
	}

	const initialLoginError = {
		number: '',
		otp: '',
		others: '',
	}

	const [clientErrors, setClientErrors] = useState({
		mobile: '',
		mobile_number: '',
		telephone_number: '',
	})

	const mobilePhoneValidation = (e) => {
		let msg = 'Please enter only number.'

		let isError = false

		if (typeof e.target.value !== 'undefined') {
			let pattern = new RegExp('^[0123456789]*$')
			// let pattern = new RegExp("^(01[15-9]\\d{8}*$");

			if (!pattern.test(e.target.value)) {
				setClientErrors((oldErrors) => {
					return {
						...oldErrors,
						[e.target.name]: msg,
					}
				})
				isError = true
			} else {
				setClientErrors((oldErrors) => {
					return {
						...oldErrors,
						[e.target.name]: '',
					}
				})

				isError = false
			}
		}

		return isError
	}

	const [loginCredential, setLoginCredential] = useState(initialLoginCredential)
	const [resetPinData, setResetPinData] = useState(initialResetPinData)
	const [loginError, setLoginError] = useState(initialLoginError)
	const [loading, setLoading] = useState(false)
	const [otpFieldEnable, setOtpFieldEnable] = useState(false)
	const [pinForm, setPinForm] = useState(false)

	const [counter, setCounter] = useState(0)

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
	}, [counter])

	const handleLoginData = (event) => {
		const name = event.target.name
		const value = event.target.value
		setLoginCredential({ ...loginCredential, [name]: value })
		setLoginError({ ...loginError, [name]: '' })
	}

	const handlePinResetData = (event) => {
		const name = event.target.name
		const value = event.target.value
		setResetPinData({ ...resetPinData, [name]: value })
		// setLoginError({ ...loginError, [name]: '' })
	}

	const handlePinReset = async (event) => {
		event.preventDefault()
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/merchant/set-pin`, {
				password: resetPinData.password,
				password_confirmation: resetPinData.password_confirmation,
			})
			.then((responses) => {
				if (responses.data.success) {
					if (Storage.isLoggedIn()) {
						let replaceRoute = sessionStorage.getItem('login_path')
						if (replaceRoute) {
							sessionStorage.removeItem('login_path')
							router.replace(replaceRoute)
						} else {
							router.reload()
						}
					}
				} else {
					responses.data.errors
						? setLoginError(responses.data.errors)
						: setLoginError({
							...loginError,
							others: responses.data.message,
						})
				}
			})
			.catch((errors) => {
				console.log(errors)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/merchant/login`, {
				number: loginCredential.number,
				reset_pin: 1,
				signature: Math.random().toString(36).substr(2, 5)
			})
			.then((responses) => {
				if (responses.data.success) {
					setOtpFieldEnable(true)
					setLoginError(initialLoginError)
					setCounter(30)
				} else {
					responses.data.errors
						? setLoginError(responses.data.errors)
						: setLoginError({
							...loginError,
							others: responses.data.message,
						})
				}
			})
			.catch((errors) => {
				console.log(errors)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleOtpLogin = async (event) => {
		event.preventDefault()
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/merchant/verifyOtp`, {
				number: loginCredential.number,
				otp: loginCredential.otp,
			})
			.then((responses) => {
				if (responses.data.success) {
					// setOtpFieldEnable(true)
					setLoginError(initialLoginError)
					hideModal()
					//Save authentication to cookies
					Storage.store(JSON.stringify(responses.data.data))
					localStorage.setItem('permissions', responses.data.config.permissions);
					if (Storage.isLoggedIn()) {
						setPinForm(true)
						setOtpFieldEnable(false)

						// let replaceRoute = localStorage.getItem('login_path')
						let replaceRoute = sessionStorage.getItem('login_path')

						// if (replaceRoute) {
						// 	sessionStorage.removeItem('login_path')
						// 	router.replace(replaceRoute)
						// } else {
						// 	router.reload()
						// }
					}
				} else {
					responses.data.errors
						? setLoginError(responses.data.errors)
						: setLoginError({
							...loginError,
							others: responses.data.message,
						})
				}
			})
			.catch((errors) => {
				console.log(errors)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleResendOtp = async (event) => {
		event.preventDefault()
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/customers/resendOtp`, {
				number: loginCredential.number,
				otp: loginCredential.otp,
			})
			.then((responses) => {
				if (responses.data.success) {
					setOtpFieldEnable(true)
					setLoginError(initialLoginError)
					setCounter(30)
				} else {
					responses.data.errors
						? setLoginError(responses.data.errors)
						: setLoginError({
							...loginError,
							others: responses.data.message,
						})
				}
			})
			.catch((errors) => {
				console.log(errors)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const hideModal = () => {
		// eslint-disable-next-line no-undef
		$('#signin_modal').modal('hide')
	}

	return (
		<>
			{
				!pinForm && (
					<fieldset disabled={loading ? 'disabled' : ''}>
						{!otpFieldEnable && (
							<div className='row'>
								<div className='col-sm-12'>
									<p className='log-in-text text-center'>Your cell phone number</p>
									<div className='input-group'>
										<div className='input-group-prepend'>
											<div
												className={`input-group-text rounded-0 ${loginError.number ? 'border-danger' : ''
													}`}
											>
												+88
											</div>
										</div>
										<input
											type='text'
											className={`form-control rounded-0 ${loginError.number ? 'is-invalid' : ''
												}`}
											id='inlineFormInputGroupUsername'
											placeholder='e.g. 01913800800'
											name='number'
											value={loginCredential.number}
											onChange={(e) => {
												e.preventDefault()
												if (!mobilePhoneValidation(e)) {
													handleLoginData(e)
												}
											}}
										// onChange={handleLoginData}
										/>
									</div>
									{loginError.number && (
										<p className='text-danger mb-0'>
											<small>{loginError.number}</small>
										</p>
									)}
									{loginError.others && (
										<p className='text-danger mb-0'>
											<small>{loginError.others}</small>
										</p>
									)}
								</div>
							</div>
						)}
						{otpFieldEnable && (
							<div className='row'>
								<div className='col-sm-12'>
									<p className='log-in-text text-center mb-1'>
										We've sent a 4-digit OTP in your phone
									</p>
									<p className='log-in-text text-center'>
										<strong>+88{loginCredential.number}</strong>
									</p>
									<div className='input-group'>
										<input
											type='text'
											className='form-control'
											placeholder='Please enter 4-digit PIN'
											name='otp'
											value={loginCredential.otp}
											onChange={handleLoginData}
										/>
									</div>
									{loginError.otp && (
										<p className='text-danger mb-0'>
											<small>{loginError.otp}</small>
										</p>
									)}
									{loginError.others && (
										<p className='text-danger mb-0'>
											<small>{loginError.others}</small>
										</p>
									)}
									<p className='mb-0 mt-1 text-center'>
										<a
											className={`resend-pin ${counter !== 0 ? 'isDisabledLink' : ''
												}`}
											href='#'
											onClick={(event) => {
												if (counter !== 0) {
													return false
												}
												handleResendOtp(event)
											}}
										>
											Resend PIN again({counter})
										</a>
									</p>
								</div>
							</div>
						)}
						{/* {pinForm && (
							<div className='row'>
								<div className='col-sm-12'>
									<div className='mb-3'>
										<label className='form-label' htmlFor='password'>
											Password
										</label>
										<input
											type='password'
											className='form-control'
											placeholder='Please enter 4-digit PIN'
											name='password'
											value={loginCredential.otp}
											onChange={handleLoginData}
										/>
									</div>
								</div>
								<div className='col-sm-12'>
									<div className='mb-3'>
										<label className='form-label' htmlFor='password'>
											Confirm Password
										</label>
										<input
											type='password'
											className='form-control'
											placeholder='Please enter 4-digit PIN'
											name='confirm_password'
											value={loginCredential.otp}
											onChange={handleLoginData}
										/>
									</div>
								</div>
							</div>
						)} */}


						{!otpFieldEnable && (
							<button
								onClick={handleLogin}
								type='submit'
								className='btn btn-warning btn-lg btn-block mt-3'
							>
								{loading ? 'Please Wait' : 'Send OTP'}
								<i
									className={`mb-1 ml-2 ${loading
										? 'spinner-border spinner-border-sm'
										: 'icon-sign-in-alt-solid'
										}`}
								/>
							</button>
						)}
						{otpFieldEnable && (
							<button
								type='submit'
								className='btn btn-warning btn-lg btn-block mt-3'
								onClick={handleOtpLogin}
							>
								ENTER
							</button>
						)}
					</fieldset>
				)
			}
			{
				pinForm && (
					<div className='row'>
						<div className='col-sm-12'>
							<div className='mb-3'>
								<label className='form-label' htmlFor='password'>
									Pin
								</label>
								<input
									type='password'
									className='form-control'
									placeholder='Please enter 4-digit PIN'
									name='password'
									value={resetPinData.password}
									onChange={handlePinResetData}
								/>
							</div>
						</div>
						<div className='col-sm-12'>
							<div className='mb-3'>
								<label className='form-label' htmlFor='password'>
									Re-type Pin
								</label>
								<input
									type='password'
									className='form-control'
									placeholder='Please enter 4-digit PIN'
									name='password_confirmation'
									value={resetPinData.password_confirmation}
									onChange={handlePinResetData}
								/>
							</div>
						</div>
						<div className='col-sm-12'>
							<div className='mb-3'>
								<button
									type='submit'
									className='btn btn-warning btn-lg btn-block mt-3'
									onClick={handlePinReset}
								>
									ENTER
								</button>
							</div>
						</div>
					</div>
				)
			}
		</>
	)
}

export default OtpLoginForm
