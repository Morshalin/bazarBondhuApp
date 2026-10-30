import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
// import { connect } from 'react-redux'
import Storage from '../../../Helpers/Auth/Storage'
// import { SET_AUTHORIZATION } from '../../../store/permission/actions/permissionActions'
import login_style from './css/login.module.css'
import OtpLoginForm from './OtpLoginForm'

const LoginModal = (props) => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errors, setErrors] = useState([])
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})
	const [loginWithOtp, setLoginWithOtp] = useState(true)

	const handleLoginData = (event) => {
		const name = event.target.name
		const value = event.target.value
		setLoginData({ ...loginData, [name]: value })
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		setLoading(true)

		let response = await axios
			.post(`${process.env.api_url}/auth/customers/login`, loginData)
			.then((result) => {
				return result.data
			})
			.catch((exception) => {
				return exception
			})

		// Success Login
		if (response.success) {
			// To hide the modal dialog
			hideModal()

			setLoading(false)
			//Save authentication to cookies
			Storage.store(JSON.stringify(response.data))
			// props.set_authorization(JSON.stringify(response.data))

			if (Storage.isLoggedIn()) {
				// let replaceRoute = localStorage.getItem('login_path')
				let replaceRoute = sessionStorage.getItem('login_path')
				if (replaceRoute) {
					// localStorage.setItem('login_path', '')
					sessionStorage.removeItem('login_path')
					router.replace(replaceRoute)
				} else {
					router.reload()
				}
			}
		}
		// Login Failed
		else {
			setLoading(false)
			setIsError(true)
			response.errors ? setErrors(response.errors) : setErrors(response)
		}
	}

	const hideModal = () => {
		// eslint-disable-next-line no-undef
		$('#signin_modal').modal('hide')
	}

	const handleSocialLoginButton = async () => {
		await axios
			.get(`${process.env.api_url}/auth/oauth/google`)
			.then((responses) => {
				if (responses.data.success) {
					router.replace(responses.data.data.social_url)
				}
			})
			.catch((errors) => {
				console.log(errors)
			})
	}

	return (
		<>
			<div
				className='modal fade'
				id='signin_modal'
				data-backdrop='static'
				tabIndex='-1'
				aria-labelledby='signInModalLevel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='signInModalLevel'>
								Sign In
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<div className='row'>
								<div className='col-12'>
									<button
										type='button'
										className={`btn ${login_style.google_button} p-3 w-100 rounded-0`}
										onClick={handleSocialLoginButton}
									>
										{/* <i className='icon-envelope-regular mr-2 pt-1' /> */}
										<img src='/img/gmail.png' alt='gmail' className={`mr-3 ${login_style['gmail-img']}`} height="25px"/>
										Sign Up or Login with <strong>Gmail</strong>
									</button>

									<button
										type='button'
										className='btn btn-outline-secondary p-3 mt-1 w-100 rounded-0'
										onClick={() => {
											setLoginWithOtp(!loginWithOtp)
											setErrors([])
											setIsError(false)
										}}
									>
										<i
											className={`${
												loginWithOtp ? `icon-envelope-regular` : `fas fa-mobile-alt`
											} mr-2 pt-1`}
										/>
										Login with{' '}
										<strong>
											{loginWithOtp ? `Email` : `Cell Phone Number`}
										</strong>
									</button>
									<div className='text-center position-relative mt-4'>
										<hr />
										<span className={`${login_style['or-word']} bg-white px-4`}>
											or
										</span>
									</div>
								</div>

								{loginWithOtp ? (
									<div className='col-12 mt-4'>
										<OtpLoginForm />
									</div>
								) : (
									<div className='col-12 mt-4'>
										<form>
											<div className='form-group'>
												<label className='sr-only' htmlFor='email'>
													User ID
												</label>

												<div className='input-group'>
													<div className='input-group-prepend'>
														<div className='input-group-text rounded-0'>
															<i className='icon-user-regular' />
														</div>
													</div>

													<input
														type='email'
														className={`form-control ${
															isError && errors
																? errors.email
																	? 'is-invalid'
																	: ''
																: ''
														}`}
														id='email'
														name='email'
														onChange={handleLoginData}
														placeholder='Username or Email'
													/>

													<div
														id='email'
														className={
															isError && errors
																? errors.email
																	? `invalid-feedback`
																	: 'd-none'
																: `d-none`
														}
													>
														{isError && errors
															? errors.email
																? errors.email
																: ''
															: ''}
													</div>
												</div>
											</div>

											<div className='form-group'>
												<label className='sr-only' htmlFor='password'>
													Password
												</label>

												<div className='input-group'>
													<div className='input-group-prepend'>
														<div className='input-group-text rounded-0'>
															<i className='icon-key' />
														</div>
													</div>

													<input
														type='password'
														className={`form-control ${
															isError && errors
																? errors.password
																	? 'is-invalid'
																	: ''
																: ''
														}`}
														id='password'
														name='password'
														onChange={handleLoginData}
														placeholder='Password'
													/>

													<div
														id='password'
														className={
															isError && errors
																? errors.password
																	? `invalid-feedback`
																	: 'd-none'
																: `d-none`
														}
													>
														{isError && errors
															? errors.password
																? errors.password
																: ''
															: ''}
													</div>
												</div>
											</div>

											<div
												id='message'
												className={
													isError && errors
														? errors.message
															? `text-danger`
															: 'd-none'
														: `d-none`
												}
											>
												{isError && errors
													? errors.message
														? errors.message
														: ''
													: ''}
											</div>
										</form>
										<button
											onClick={handleLogin}
											type='submit'
											className='btn btn-warning btn-lg btn-block'
										>
											{loading ? 'Please Wait' : 'Login / SignUp'}
											<i
												className={`mb-1 ml-2 ${
													loading
														? 'spinner-border spinner-border-sm'
														: 'icon-sign-in-alt-solid'
												}`}
											/>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		set_authorization: (permissions) =>
// 			dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
// 	}
// }
export default LoginModal
