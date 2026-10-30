import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import MyError from '../../Notification/MyError'
import MySucces from '../../Notification/MySuccess'

const AddCategory = () => {
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

	const [category, setCategory] = useState({
		name: '',
		sort: '',
		active: '1',
		menu_visibility: '1',
		home_visibility: '1',
		description: '',
		image: '',
		banner_image: '',
		menu_icon: '',
		home_icon: '',
		parent_id: '',
		meta_keywords: '',
		meta_description: '',
	})

	const [imagePreView, setImagePreview] = useState({
		image: '',
		banner_image: '',
		menu_icon: '',
		home_icon: '',
	})

	const [inputErrorFiled, setInputErrorFiled] = useState({
		name: '',
		name_error_message: '',
		image: '',
		image_error_message: '',
		banner_image: '',
		banner_error_message: '',
		menu_icon: '',
		menu_icon_error_message: '',
		home_icon: '',
		home_icon_error_message: '',
	})

	const [loadingData, setLoadingData] = useState(true)
	const [categories, setCategories] = useState([])
	const [savingState, setSavingState] = useState(false)
	const [disabledFiled, setDisabledFiled] = useState('')
	const [isError, setIsError] = useState(true)
	const [message, setMessage] = useState('')

	const router = useRouter()

	const fetchingApiData = async () => {
		const categoryApiUrl = `${process.env.api_backend_url}/categories`
		axios
			.get(categoryApiUrl)
			.then((responses) => {
				if (responses.data.success) {
					let categoriesFilterData = responses.data.data.map(({ id, name }) => {
						return {
							value: id,
							label: name,
						}
					})
					setCategories(categoriesFilterData)
				} else {
					setCategories('')
				}
				setLoadingData(false)
			})
			.catch((errors) => {
				console.log(errors)
				setLoadingData(false)
			})
	}

	useEffect(() => {
		const bsCustomFileInput = require('bs-custom-file-input')
		bsCustomFileInput.init()
		if (loadingData) {
			fetchingApiData()
		}
	}, [])

	const handleCategoryData = (evnet) => {
		let name = evnet.target.name
		let value = evnet.target.value
		if (name === 'name') {
			setInputErrorFiled({ ...inputErrorFiled, [name]: 'was-validated' })
		} else if (name === 'active') {
			value = evnet.target.checked ? '1' : '0'
		} else if (name === 'image') {
			value = evnet.target.files[0]
			setImagePreview({ ...imagePreView, [name]: URL.createObjectURL(value) })
			setInputErrorFiled({ ...inputErrorFiled, [name]: 'was-validated' })
		} else if (name === 'banner_image') {
			value = evnet.target.files[0]
			setImagePreview({ ...imagePreView, [name]: URL.createObjectURL(value) })
			setInputErrorFiled({ ...inputErrorFiled, [name]: 'was-validated' })
		} else if (name === 'menu_icon') {
			value = evnet.target.files[0]
			setImagePreview({ ...imagePreView, [name]: URL.createObjectURL(value) })
			setInputErrorFiled({ ...inputErrorFiled, [name]: 'was-validated' })
		} else if (name === 'home_icon') {
			value = evnet.target.files[0]
			setImagePreview({ ...imagePreView, [name]: URL.createObjectURL(value) })
			setInputErrorFiled({ ...inputErrorFiled, [name]: 'was-validated' })
		}
		setCategory({ ...category, [name]: value })
	}

	const removeImage = (event) => {
		let name = event.target.id
		if (name === 'image') {
			setImagePreview({ ...imagePreView, [name]: '' })
		} else if (name === 'banner_image') {
			setImagePreview({ ...imagePreView, [name]: '' })
		} else if (name === 'menu_icon') {
			setImagePreview({ ...imagePreView, [name]: '' })
		} else if (name === 'home_icon') {
			setImagePreview({ ...imagePreView, [name]: '' })
		}

		setCategory({ ...category, [name]: '' })
	}

	const validation = (name, image, banner, menuIcon, homeIcon) => {
		setInputErrorFiled({
			...inputErrorFiled,
			name: name.length === 0 ? 'is-invalid' : 'was-validated',
			name_error_message: name.length === 0 ? 'Name filed is required.' : '',

			image: image.length === 0 ? 'is-invalid' : 'was-validated',
			image_error_message: image.length === 0 ? 'Image filed is required.' : '',

			banner_image: banner.length === 0 ? 'is-invalid' : 'was-validated',
			banner_error_message: image.length === 0 ? 'Banner image filed is required.' : '',

			menu_icon: menuIcon.length === 0 ? 'is-invalid' : 'was-validated',
			menu_icon_error_message: menuIcon.length === 0 ? 'Menu icon filed is required.' : '',

			home_icon: homeIcon.length === 0 ? 'is-invalid' : 'was-validated',
			home_icon_error_message: homeIcon.length === 0 ? 'Home icon filed is required.' : '',
		})
		if (
			name.length === 0 ||
			image.length === 0 ||
			banner.length === 0 ||
			menuIcon.length === 0 ||
			homeIcon.length === 0
		) {
			return false
		} else {
			return true
		}
	}

	// const imageDimension = (imageFile,name,messageVariable,errorMessage,width,height) => {
	//     const img = new Image();
	//     img.src = URL.createObjectURL(imageFile);
	//     img.onload =  () => {
	//         console.log(img.width)
	//         if(img.width == width && img.height ==height ){
	//             setInputErrorFiled({...inputErrorFiled, [name]: "is-invalid",image_error_message:`Image not matched required width 4000px given ${img.width}`});
	//         }
	//     };
	// }

	const resetAfterSuccess = () => {
		setCategory({
			name: '',
			sort: '',
			active: '0',
			menu_visibility: '1',
			home_visibility: '1',
			description: '',
			image: '',
			banner_image: '',
			menu_icon: '',
			home_icon: '',
			parent_id: '',
			meta_keywords: '',
			meta_description: '',
		})
		setImagePreview({
			image: '',
			banner_image: '',
			menu_icon: '',
			home_icon: '',
		})

		setInputErrorFiled({
			name: '',
			name_error_message: '',
			image: '',
			image_error_message: '',
			banner_image: '',
			banner_error_message: '',
			menu_icon: '',
			menu_icon_error_message: '',
			home_icon: '',
			home_icon_error_message: '',
		})
		document.getElementById('categoryFormInput').reset()
	}

	const submitFormData = async (event) => {
		event.preventDefault()
		let validated = validation(
			category.name,
			category.image,
			category.banner_image,
			category.menu_icon,
			category.home_icon
		)
		if (validated) {
			setSavingState(true)
			setDisabledFiled('disabled')

			const categoryPostApiUrl = `${process.env.api_backend_url}/categories`
			const categoryData = new FormData()

			categoryData.append('name', category.name)
			categoryData.append('sort', category.sort)
			categoryData.append('description', category.description)
			categoryData.append('meta_keywords', category.meta_keywords)
			categoryData.append('meta_description', category.meta_description)
			categoryData.append('active', category.active)
			categoryData.append('menu_visibility', category.menu_visibility ?? '')
			categoryData.append('home_visibility', category.home_visibility ?? '')
			categoryData.append('image', category.image ?? '')
			categoryData.append('banner_image', category.banner_image ?? '')
			categoryData.append('menu_icon', category.menu_icon ?? '')
			categoryData.append('home_icon', category.home_icon ?? '')
			categoryData.append('parent_id', category.parent_id ?? '')

			const config = {
				headers: {
					'content-type': 'multipart/form-data;',
				},
			}

			await axios
				.post(categoryPostApiUrl, categoryData, config)
				.then((res) => {
					if (res.data.success) {
						setDisabledFiled('')
						setSavingState(false)
						// setIsError(false)
						// setMessage(res.data.message)
						setSuccessMessage({
							...successMessage,
							status: true,
							message: res.data.message,
						})
						resetAfterSuccess()
						router.reload()
					} else {
						// setMessage(res.data.message)
						setErrorMessage({
							...errorMessage,
							status: true,
							message: res.data.message,
						})
						setSavingState(false)
						// setIsError(true)
						setDisabledFiled('')
						setInputErrorFiled({
							...inputErrorFiled,
							name: res.data.errors.name[0].length ? 'is-invalid' : 'was-validated',
							name_error_message: res.data.errors.name.length ? res.data.errors.name[0] : '',
						})
					}
				})
				.catch((error) => {
					alert('Some thing goes wrong')
				})
		}
	}

	const resetFormInputFiled = (event) => {
		event.preventDefault()
		setCategory({
			name: '',
			sort: '',
			active: '0',
			menu_visibility: '1',
			home_visibility: '1',
			description: '',
			image: '',
			banner_image: '',
			menu_icon: '',
			home_icon: '',
			parent_id: '',
			meta_keywords: '',
			meta_description: '',
		})
		setImagePreview({
			image: '',
			banner_image: '',
			menu_icon: '',
			home_icon: '',
		})

		setInputErrorFiled({
			name: '',
			name_error_message: '',
			image: '',
			image_error_message: '',
			banner_image: '',
			banner_error_message: '',
			menu_icon: '',
			menu_icon_error_message: '',
			home_icon: '',
			home_icon_error_message: '',
		})
		document.getElementById('categoryFormInput').reset()
	}

	return (
		<>
			{successMessage.status && (
				<MySucces message={successMessage.message} resetSuccesMessage={resetSuccesMessage} />
			)}

			{errorMessage.status && (
				<MyError message={errorMessage.message} resetErrorMessage={resetErrorMessage} />
			)}

			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='far fa-plus-square' />
										<h2>Add Category</h2>
										<Link legacyBehavior href={`/admin/category`}>
											<a className='fbh-btn' title='List Category'>
												<i className='icon-list2' />
											</a>
										</Link>
									</div>
									<div className='fbh-info'>
										<p>
											Please fill in the information below. The field labels marked with * are
											required input fields.
										</p>
									</div>
								</div>
								<div className='custom-card-box-content'>
									<div className='row'>
										<div className='col-lg-12'>
											<form encType='multipart/form-data' id='categoryFormInput'>
												<fieldset disabled={disabledFiled}>
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
																			className={`form-control ${inputErrorFiled.name ?? ''}`}
																			placeholder='name'
																			id='name'
																			name='name'
																			onChange={handleCategoryData}
																			required='required'
																		/>
																		{inputErrorFiled.name && (
																			<div id='nameValidation' className='invalid-feedback'>
																				{inputErrorFiled.name_error_message}
																			</div>
																		)}
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='description'>Description</label>
																		<textarea
																			className='form-control'
																			rows='6'
																			placeholder='description'
																			id='description'
																			name='description'
																			onChange={handleCategoryData}
																		/>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='name'>Meta keyword </label>
																		<input
																			type='text'
																			className='form-control'
																			placeholder='meta keyword'
																			id='metaKeywords'
																			name='meta_keywords'
																			onChange={handleCategoryData}
																			required
																		/>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='description'>Meta Description</label>
																		<textarea
																			className='form-control'
																			rows='6'
																			placeholder='meta description'
																			id='metaDescription'
																			name='meta_description'
																			onChange={handleCategoryData}
																		/>
																	</div>
																</div>
															</div>
														</div>

														<div className='col-lg-6'>
															<div className='row'>
																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='brand'>Parent category</label>
																		<Select
																			instanceId='brand'
																			isClearable={true}
																			defaultValue={{
																				value: 0,
																				label: 'None is selected',
																			}}
																			onChange={(selectedOption) => {
																				setCategory({
																					...category,
																					parent_id: selectedOption ? selectedOption.value : '',
																				})
																			}}
																			options={categories}
																			autoFocus={false}
																			theme={(theme) => ({
																				...theme,
																				borderRadius: 0,
																			})}
																		/>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='menuVisibility'>Menu Visibility</label>
																		<select
																			className='custom-select'
																			id='menuVisibility'
																			name='menu_visibility'
																			onChange={handleCategoryData}
																		>
																			<option value='1'>Show</option>
																			<option value='0'>Hide</option>
																		</select>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='homeVisibility'>Home Visibility</label>
																		<select
																			className='custom-select'
																			id='homeVisibility'
																			name='home_visibility'
																			onChange={handleCategoryData}
																		>
																			<option value='1'>Show</option>
																			<option value='0'>Hide</option>
																		</select>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='form-group'>
																		<label htmlFor='name'>Sort</label>
																		<input
																			type='number'
																			className='form-control'
																			placeholder='sort'
																			id='sort'
																			name='sort'
																			onChange={handleCategoryData}
																		/>
																	</div>
																</div>

																<div className='col-lg-12'>
																	<div className='row'>
																		<div className='col-lg-6'>
																			<div className='form-group'>
																				<label>Menu Icon</label>
																				<div className='custom-file'>
																					<input
																						type='file'
																						className={`custom-file-input ${inputErrorFiled.menu_icon}`}
																						id='menuIcon'
																						name='menu_icon'
																						onChange={handleCategoryData}
																					/>
																					<label className='custom-file-label' htmlFor='menuIcon'>
																						<span className='d-inline-block text-truncate w-75'>
																							choose image
																						</span>
																					</label>
																					{inputErrorFiled.menu_icon && (
																						<div id='nameValidation' className='invalid-feedback'>
																							{inputErrorFiled.menu_icon_error_message}
																						</div>
																					)}
																				</div>
																			</div>
																			<div className='container border' style={{ height: '150px' }}>
																				{imagePreView.menu_icon && (
																					<img
																						className='mx-auto d-flex p-2'
																						id='menu_icon'
																						src={imagePreView.menu_icon}
																						onClick={removeImage}
																						style={{
																							width: '100%',
																							height: '100%',
																						}}
																					/>
																				)}
																			</div>
																		</div>
																		<div className='col-lg-6'>
																			<div className='form-group'>
																				<label>Home Icon</label>
																				<div className='custom-file'>
																					<input
																						type='file'
																						className={`custom-file-input ${inputErrorFiled.home_icon}`}
																						id='homeIcon'
																						name='home_icon'
																						onChange={handleCategoryData}
																					/>
																					<label className='custom-file-label' htmlFor='homeIcon'>
																						<span className='d-inline-block text-truncate w-75'>
																							choose image
																						</span>
																					</label>
																					{inputErrorFiled.image && (
																						<div id='nameValidation' className='invalid-feedback'>
																							{inputErrorFiled.home_icon_error_message}
																						</div>
																					)}
																				</div>
																			</div>
																			<div className='container border' style={{ height: '150px' }}>
																				{imagePreView.home_icon && (
																					<img
																						className='mx-auto d-flex p-2'
																						src={imagePreView.home_icon}
																						id='home_icon'
																						onClick={removeImage}
																						style={{
																							width: '100%',
																							height: '100%',
																						}}
																					/>
																				)}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div className='col-lg-12'>
															<div className='row'>
																<div className='col-lg-6'>
																	<div className='form-group'>
																		<label>Category image</label>
																		<div className='custom-file'>
																			<input
																				type='file'
																				className={`custom-file-input ${inputErrorFiled.image}`}
																				id='image'
																				name='image'
																				onChange={handleCategoryData}
																			/>
																			<label className='custom-file-label' htmlFor='image'>
																				<span className='d-inline-block text-truncate w-75'>
																					choose images
																				</span>
																			</label>
																			{inputErrorFiled.image && (
																				<div id='nameValidation' className='invalid-feedback'>
																					{inputErrorFiled.image_error_message}
																				</div>
																			)}
																		</div>
																	</div>
																	<div className='container border' style={{ height: '200px' }}>
																		{imagePreView.image && (
																			<img
																				className='mx-auto d-flex p-2'
																				id='image'
																				src={imagePreView.image}
																				onClick={removeImage}
																				style={{
																					width: '100%',
																					height: '100%',
																				}}
																			/>
																		)}
																	</div>
																</div>
																<div className='col-lg-6'>
																	<div className='form-group'>
																		<label>Banner image</label>
																		<div className='custom-file'>
																			<input
																				type='file'
																				className={`custom-file-input ${inputErrorFiled.banner_image}`}
																				id='bannerImage'
																				name='banner_image'
																				onChange={handleCategoryData}
																			/>
																			<label className='custom-file-label' htmlFor='bannerImage'>
																				<span className='d-inline-block text-truncate w-75'>
																					choose image
																				</span>
																			</label>
																			{inputErrorFiled.banner_image && (
																				<div id='nameValidation' className='invalid-feedback'>
																					{inputErrorFiled.banner_error_message}
																				</div>
																			)}
																		</div>
																	</div>
																	<div
																		className='container border mb-3'
																		style={{ height: '200px' }}
																	>
																		{imagePreView.banner_image && (
																			<img
																				className='mx-auto d-flex p-2'
																				id='banner_image'
																				src={imagePreView.banner_image}
																				onClick={removeImage}
																				style={{
																					width: '100%',
																					height: '100%',
																				}}
																			/>
																		)}
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className='row'>
														<div className='col-lg-6'>
															<div className='form-group'>
																<div className='custom-control custom-checkbox'>
																	<input
																		type='checkbox'
																		className='custom-control-input'
																		defaultChecked={true}
																		id='active'
																		name='active'
																		onChange={handleCategoryData}
																	/>
																	<label className='custom-control-label' htmlFor='active'>
																		Active
																	</label>
																</div>
															</div>
														</div>
														<div className='col-lg-6 text-right'>
															<Link legacyBehavior href={`/admin/category`}>
																<a className='btn btn-primary mr-1'>
																	<i className='icon-arrow-left-solid mr-1 mr-1 mr-1 mr-1' /> back
																	to list
																</a>
															</Link>
															<button
																type='button'
																className='btn btn-danger mr-1'
																onClick={resetFormInputFiled}
															>
																<i className='icon-reset mr-1 mr-1' /> reset
															</button>

															<button
																type='submit'
																className='btn btn-primary'
																onClick={submitFormData}
															>
																{savingState ? (
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default AddCategory
