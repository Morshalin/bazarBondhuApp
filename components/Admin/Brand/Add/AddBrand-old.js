import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Error from '../../Notification/Error'
import Success from '../../Notification/Success'

const EmptyCardBody = (props) => {
	return (
		<>
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='icon-plus-square-regular' />
										<h2>Add Brand</h2>
										<Link legacyBehavior href={`/admin/brand`}>
											<a className='fbh-btn' title='Add Unit'>
												<i className='icon-list2' />
											</a>
										</Link>
									</div>
									<div className='fbh-info'>
										<p>
											Please fill in the information below. The field labels
											marked with * are required input fields.
										</p>
									</div>
								</div>

								<div className='custom-card-box-content'>{props.children}</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

const AddBrand = () => {
	useEffect(() => {
		let cleanUp = true
		const bsCustomFileInput = require('bs-custom-file-input')
		bsCustomFileInput.init()
		return () => {
			cleanUp = false
		}
	}, [])
	// declare brand state data
	const [brand, setBrand] = useState({
		name: '',
		description: '',
		image: '',
		active: '1',
	})

	// error handling
	const [brandError, setBrandError] = useState({
		name: '',
		name_error: '',
		description: '',
		description_error: '',
		image: '',
		image_error: '',
	})

	const [disabledFiled, setDisabledFiled] = useState('')

	const [successMessage, setSuccessMessage] = useState({
		status: false,
		message: '',
	})

	const [errorMessage, setErrorMessage] = useState({
		status: false,
		message: '',
	})

	// image preview image as blob data
	const [imagePreviewData, setImagePreviewData] = useState('')

	// saving data on state
	const handleBrandData = (event) => {
		let name = event.target.name
		let value = event.target.value
		if (name === 'image') {
			value = event.target.files[0]
			setImagePreviewData(URL.createObjectURL(value))
		} else if (name === 'active') {
			value = event.target.checked ? '1' : '0'
		}
		setBrand({ ...brand, [name]: value })
		setBrandError({ ...brandError, [name]: '', [name + '_error']: '' })
	}

	// for removing image
	const removeImage = () => {
		setBrand({ ...brand, image: '' })
		setImagePreviewData('')
	}

	// reset form data and remove from state
	const resetBrandData = (event) => {
		event.preventDefault()
		document.getElementById('brandFormData').reset()

		setBrand({
			name: '',
			description: '',
			image: '',
			active: '1',
		})

		setBrandError({
			name: '',
			name_error: '',
			description: '',
			description_error: '',
			image: '',
			image_error: '',
		})

		setDisabledFiled('')

		setTimeout(
			() =>
				setSuccessMessage({ ...successMessage, status: false, message: '' }),
			5000
		)
	}

	const submitBrandData = (event) => {
		event.preventDefault()
		if (brand.name.length === 0) {
			setBrandError({
				...brandError,
				name: 'is-invalid',
				name_error: 'Name field is required',
			})
		} else {
			setDisabledFiled('disabled')
			const brandFormData = new FormData()
			brand.name && brandFormData.append('name', brand.name)
			brand.image && brandFormData.append('image', brand.image)
			brand.description &&
				brandFormData.append('description', brand.description)
			brandFormData.append('active', brand.active)
			const brandApiUrl = `${process.env.api_backend_url}/brands`
			axios
				.post(brandApiUrl, brandFormData, {
					headers: { 'content-type': 'multipart/form-data' },
				})
				.then((apiResponses) => {
					if (apiResponses.data.success) {
						setDisabledFiled('disabled')
						resetBrandData(event)
						setSuccessMessage({
							...successMessage,
							status: true,
							message: apiResponses.data.message,
						})
					} else {
						setBrandError({
							...brandError,
							name:
								typeof apiResponses.data.errors.name != 'undefined'
									? 'is-invalid'
									: '',
							name_error:
								typeof apiResponses.data.errors.name != 'undefined'
									? apiResponses.data.errors.name.join()
									: '',
							image:
								typeof apiResponses.data.errors.image != 'undefined'
									? 'is-invalid'
									: '',
							image_error:
								typeof apiResponses.data.errors.image != 'undefined'
									? apiResponses.data.errors.image.join()
									: '',
							description:
								typeof apiResponses.data.errors.description != 'undefined'
									? 'is-invalid'
									: '',
							description_error:
								typeof apiResponses.data.errors.description != 'undefined'
									? apiResponses.data.errors.description.join()
									: '',
						})
						setDisabledFiled('')
						setErrorMessage({
							...errorMessage,
							status: true,
							message: apiResponses.data.message,
						})
						setTimeout(
							() =>
								setErrorMessage({
									...errorMessage,
									status: false,
									message: '',
								}),
							5000
						)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	return (
		<>
			{successMessage.status && <Success message={successMessage.message} />}

			{errorMessage.status && <Error message={errorMessage.message} />}
			<EmptyCardBody>
				<div className='row'>
					<div className='col-lg-12'>
						<form
							id='brandFormData'
							method='POST'
							encType='multipart/form-data'
						>
							<fieldset disabled={disabledFiled ?? ''}>
								<div className='row'>
									<div className='col-lg-6'>
										<div className='row'>
											<div className='col-lg-12'>
												<div className='form-group'>
													<label htmlFor='name'>
														Name <span className='text-danger'>*</span>
													</label>
													<input
														type='text'
														className={`form-control ${brandError.name ?? ''}`}
														placeholder='name'
														id='name'
														name='name'
														onChange={handleBrandData}
														required
													/>
													<div className='invalid-feedback'>
														{brandError.name_error ?? ''}
													</div>
												</div>
											</div>
											<div className='col-lg-12'>
												<div className='form-group'>
													<label>Brand Image</label>
													<div className='custom-file'>
														<input
															type='file'
															className={`custom-file-input ${
																brandError.image ?? ''
															}`}
															id='image'
															name='image'
															onChange={handleBrandData}
														/>
														<label
															className='custom-file-label'
															htmlFor='image'
														>
															<span className='d-inline-block text-truncate w-75'>
																choose images
															</span>
														</label>
														{brandError.image && (
															<div className='invalid-feedback'>
																{brandError.image_error ?? ''}
															</div>
														)}
													</div>
												</div>
												<div className='container mb-2'>
													{brand.image && (
														<img
															className='mx-auto d-block'
															src={imagePreviewData}
															width='100px'
															height='100px'
															onClick={removeImage}
															alt='no brand image found'
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className='col-lg-6'>
										<div className='row'>
											<div className='col-lg-12'>
												<div className='form-group'>
													<label htmlFor='description'>Description</label>
													<textarea
														className={`form-control ${
															brandError.description ?? ''
														}`}
														id='description'
														name='description'
														onChange={handleBrandData}
														rows='6'
														placeholder='description'
													/>
													{brandError.description && (
														<div className='invalid-feedback'>
															{brandError.description_error ?? ''}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className='row'>
									<div className='col-lg-6 text-left'>
										<div className='form-group'>
											<div className='custom-control custom-checkbox'>
												<input
													type='checkbox'
													className='custom-control-input'
													id='active'
													name='active'
													defaultChecked={true}
													onChange={handleBrandData}
												/>
												<label
													className='custom-control-label'
													htmlFor='active'
												>
													Active
												</label>
											</div>
										</div>
									</div>
									<div className='col-lg-6 text-right'>
										<Link legacyBehavior href={'/admin/brand'}>
											<a className='btn btn-info mr-1'>
												<i className='icon-arrow-left-solid mr-1 mr-1' /> back
												to list
											</a>
										</Link>

										<button
											className='btn btn-danger mr-1'
											onClick={resetBrandData}
										>
											<i className='icon-reset mr-1 mr-1' /> reset
										</button>
										<button
											className='btn btn-primary'
											type='submit'
											onClick={submitBrandData}
										>
											{disabledFiled === 'disabled' ? (
												<>
													<span
														className='spinner-border spinner-border-sm'
														role='status'
														aria-hidden='true'
													/>{' '}
													saving...
												</>
											) : (
												<>
													<i className='icon-save-regular mr-1' /> save
												</>
											)}
										</button>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</EmptyCardBody>
		</>
	)
}
export default AddBrand
