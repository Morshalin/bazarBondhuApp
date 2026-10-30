import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Storage from '../../../Helpers/Auth/Storage'

const OtpLoginModal = (props) => {
	const router = useRouter()
	const intialLoginCridential = {
		number: '',
		otp: '',
	}

	const intialLoginError = {
		number: '',
		otp: '',
		others: '',
	}
	const [loginCredential, setLoginCredential] = useState(intialLoginCridential)
	const [loginError, setLoginError] = useState(intialLoginError)
	const [loading, setLoading] = useState(false)
	const [otpFieldEnable, setOtpFieldEnable] = useState(false)

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

	const handleLogin = async (event) => {
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/customers/login`, { number: loginCredential.number })
			.then((responses) => {
				if (responses.data.success) {
					setOtpFieldEnable(true)
					setLoginError(intialLoginError)
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
		setLoading(true)
		axios
			.post(`${process.env.api_url}/auth/customers/verifyOtp`, {
				number: loginCredential.number,
				otp: loginCredential.otp,
			})
			.then((responses) => {
				if (responses.data.success) {
					setOtpFieldEnable(true)
					setLoginError(intialLoginError)
					hideModal()
					//Save authentication to cookies
					Storage.store(JSON.stringify(responses.data.data))
					if (Storage.isLoggedIn()) {
						let replaceRoute = localStorage.getItem('login_path')
						if (replaceRoute) {
							localStorage.setItem('login_path', '')
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

	const handleResndOtp = async (event) => {
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
					setLoginError(intialLoginError)
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
		$('#signin_modal').modal('hide')
	}

	return (
		<>
			<div
				className='modal fade'
				id='signin_modal'
				tabIndex='-1'
				aria-labelledby='signInModalLevel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<fieldset disabled={loading ? 'disabled' : ''}>
							<div className='modal-header border-0'>
								<h5 className='modal-title' id='signInModalLevel'>
									Sign In
								</h5>
								<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body border-0'>
								{!otpFieldEnable && (
									<div className='row'>
										<div className='col-sm-12'>
											<p className='log-in-text'>Please enter mobile phone number</p>
											<label className='sr-only' htmlFor='inlineFormInputGroupUsername'>
												Username
											</label>
											<div className='input-group'>
												<div className='input-group-prepend'>
													<div
														className={`input-group-text ${
															loginError.number ? 'border-danger' : ''
														}`}
													>
														+88
													</div>
												</div>
												<input
													type='text'
													className={`form-control ${loginError.number ? 'is-invalid' : ''}`}
													id='inlineFormInputGroupUsername'
													placeholder='e.g. 01913800800'
													name='number'
													value={loginCredential.number}
													onChange={handleLoginData}
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
												<a href='#' onClick={handleResndOtp}>
													Resend PIN again({counter})
												</a>
											</p>
										</div>
									</div>
								)}
							</div>

							<div className='modal-footer border-0'>
								{!otpFieldEnable && (
									<button
										onClick={handleLogin}
										type='button'
										className='btn btn-warning btn-lg btn-block'
									>
										{loading ? 'Please Wait' : 'Login / SignUp'}
										<i
											className={`mb-1 ml-2 ${
												loading ? 'spinner-border spinner-border-sm' : 'icon-sign-in-alt-solid'
											}`}
										/>
									</button>
								)}
								{otpFieldEnable && (
									<button
										type='button'
										className='btn btn-warning btn-lg btn-block'
										onClick={handleOtpLogin}
									>
										ENTER
									</button>
								)}
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</>
	)
}

export default OtpLoginModal
