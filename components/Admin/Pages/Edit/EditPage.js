import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Error from '../../Notification/Error'
import Success from '../../Notification/Success'

const EditPage = () => {
	const { asPath, route, query } = useRouter()

	let initialMenuData = {
		post_type: 'Post',
		name: '',
		slug: '',
		content: '',
		meta_keyword: '',
		meta_description: '',
		sort_order: '',
		status: 1,
	}

	let initialValidationErrors = {
		post_type: '',
		name: '',
		slug: '',
		content: '',
		meta_keyword: '',
		meta_description: '',
		sort_order: '',
		status: '',
	}

	let initialMessage = { success: '', error: '' }

	const [itemData, setItemData] = useState(initialMenuData)

	const [itemValidation, setItemValidation] = useState(initialValidationErrors)

	const [message, setMessage] = useState(initialMessage)

	const [loading, setLoading] = useState(false)

	// slugify helper function
	const slugify = (toConvertText) => {
		toConvertText = toConvertText.replace(/^\s+|\s+$/g, '')

		// Make the string lowercase
		toConvertText = toConvertText.toLowerCase()

		// Remove accents, swap ñ for n, etc
		var from =
			'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
		var to =
			'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
		for (var i = 0, l = from.length; i < l; i++) {
			toConvertText = toConvertText.replace(
				new RegExp(from.charAt(i), 'g'),
				to.charAt(i)
			)
		}

		// Remove invalid chars
		toConvertText = toConvertText
			.replace(/[^a-z0-9 -]/g, '')
			// Collapse whitespace and replace by -
			.replace(/\s+/g, '-')
			// Collapse dashes
			.replace(/-+/g, '-')

		return toConvertText
	}

	useEffect(() => {
		let isMounted = true

		const fetchedActionMenu = async (post_id) => {
			return await axios
				.get(`backend/posts/${post_id}`)
				.then((result) => result.data)
				.catch((error) => error)
		}

		if (asPath !== route) {
			fetchedActionMenu(query.post_id)
				.then((response) => {
					if (isMounted) {
						// eslint-disable-next-line no-unused-expressions
						response.success
							? setItemData(response.data)
							: () => {
									// eslint-disable-next-line no-throw-literal
									throw 'Server is not responding'
							  }
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}

		return () => (isMounted = false)
	}, [asPath, route, query])

	const handleMenuData = (event) => {
		setLoading(false)
		let name = event.target.name
		let value =
			event.target.type == 'checkbox'
				? event.target.checked
				: event.target.value

		if (event.target.name === 'name') {
			itemData.slug = slugify(event.target.value)
		} else if (event.target.name === 'slug') {
			value = slugify(event.target.value)
		}
		setItemData({ ...itemData, [name]: value })
		setItemValidation({ ...itemValidation, [name]: '' })
		setMessage(initialMessage)
	}

	const saveMenuData = async (e) => {
		e.preventDefault()
		setLoading(true)

		const postFormData = new FormData()

		postFormData.append('name', itemData.name)
		postFormData.append('slug', itemData.slug)
		postFormData.append('post_type', itemData.post_type)
		postFormData.append('meta_keyword', itemData.meta_keyword)
		postFormData.append('meta_description', itemData.meta_description)
		postFormData.append('content', itemData.content)
		postFormData.append('sort_order', itemData.sort_order)
		postFormData.append('status', itemData.status)
		postFormData.append('_method', 'PUT')

		const config = {
			headers: {
				'content-type': 'multipart/form-data;',
			},
		}

		let response = await axios
			.post(`/backend/posts/${query.post_id}`, postFormData, config)
			.then((result) => result.data)
			.catch((errors) => errors)
		if (response.success) {
			setItemData(response.data)
			setMessage({ ...message, success: response.message })
			setLoading(false)
		} else {
			setLoading(false)
			setMessage({ ...message, error: response.message })
			setItemValidation(response.errors)
		}

		setTimeout(() => {
			setMessage(initialMessage)
		}, 1000)
	}

	const resetMenuData = async (e) => {
		e.preventDefault()
		setItemData(initialMenuData)
		setItemValidation(initialValidationErrors)
		setLoading(false)
	}

	return (
		<>
			{message.success && <Success message={message.success} />}
			{message.error && <Error message={message.error} />}
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='icon-pencil-alt' />
										<h2>Edit Page</h2>
									</div>
									<div className='fbh-info'>
										<p>
											Please fill in the information below. The field labels
											marked with
											<span className='text-danger'> * </span>
											are required input fields.
										</p>
									</div>
								</div>
								<div className='custom-card-box-content'>
									<div className='row'>
										<div className='col-lg-12'>
											<form>
												<div className='row'>
													<div className='col-lg-6'>
														<div className='row'>
															<div className='col-md-12'>
																<div className='form-group'>
																	<label htmlFor='name'>
																		Name
																		<span className='text-danger'> * </span>
																	</label>
																	<input
																		type='text'
																		className={`form-control ${
																			itemValidation.name ? `is-invalid` : ``
																		}`}
																		id='name'
																		name='name'
																		value={itemData.name}
																		onChange={handleMenuData}
																		placeholder='Item Name'
																		required
																	/>

																	<div
																		className={
																			itemValidation.name
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.name}
																	</div>
																</div>
															</div>
															<div className='col-md-12'>
																<div className='form-group'>
																	<label htmlFor='post_type'>
																		Item Type
																		<span className='text-danger'> * </span>
																	</label>
																	<div
																		className={`input-group ${
																			itemValidation.post_type
																				? `is-invalid`
																				: ``
																		}`}
																	>
																		<select
																			className='custom-select'
																			id='post_type'
																			name='post_type'
																			onChange={handleMenuData}
																			aria-label='post_type Select'
																		>
																			<option
																				value='post'
																				selected={itemData.post_type === 'post'}
																			>
																				Post
																			</option>
																			<option
																				value='page'
																				selected={itemData.post_type === 'page'}
																			>
																				Page
																			</option>
																			<option
																				value='help'
																				selected={itemData.post_type === 'help'}
																			>
																				help
																			</option>
																		</select>
																	</div>

																	<div
																		className={
																			itemValidation.post_type
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.post_type}
																	</div>
																</div>
															</div>
															<div className='col-12'>
																<div className='form-group'>
																	<label htmlFor='description'>
																		Meta Keyword
																	</label>
																	<input
																		type='text'
																		className={`form-control ${
																			itemValidation.meta_keyword
																				? `is-invalid`
																				: ``
																		}`}
																		id='meta_keyword'
																		name='meta_keyword'
																		value={itemData.meta_keyword}
																		onChange={handleMenuData}
																		placeholder='Meta Keyword'
																	/>
																	<div
																		className={
																			itemValidation.meta_keyword
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.meta_keyword}
																	</div>
																</div>
															</div>
															<div className='col-12'>
																<div className='form-group'>
																	<label htmlFor='description'>
																		Meta Description
																	</label>
																	<textarea
																		className={`form-control ${
																			itemValidation.meta_description
																				? `is-invalid`
																				: ``
																		}`}
																		id='meta_description'
																		name='meta_description'
																		value={itemData.meta_description}
																		onChange={handleMenuData}
																		placeholder='Meta Description'
																	/>
																	<div
																		className={
																			itemValidation.meta_description
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.meta_description}
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div className='col-lg-6'>
														<div className='row'>
															<div className='col-md-12'>
																<div className='form-group'>
																	<label htmlFor='sort_order'>Slug</label>
																	<span className='text-danger'> * </span>
																	<input
																		type='text'
																		className={`form-control ${
																			itemValidation.slug ? `is-invalid` : ``
																		}`}
																		id='slug'
																		name='slug'
																		value={itemData.slug}
																		onChange={handleMenuData}
																		placeholder='slug'
																		required
																	/>
																	<div
																		className={
																			itemValidation.slug
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.slug}
																	</div>
																</div>
															</div>
															<div className='col-md-12'>
																<div className='form-group'>
																	<label htmlFor='sort_order'>Sort Order</label>
																	<input
																		type='text'
																		className={`form-control ${
																			itemValidation.sort_order
																				? `is-invalid`
																				: ``
																		}`}
																		id='sort_order'
																		name='sort_order'
																		value={itemData.sort_order}
																		onChange={handleMenuData}
																		placeholder='1'
																		required
																	/>
																	<div
																		className={
																			itemValidation.sort_order
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.sort_order}
																	</div>
																</div>
															</div>
															<div className='col-12'>
																<div className='form-group'>
																	<label htmlFor='status'>
																		Status
																		<span className='text-danger'> * </span>
																	</label>
																	<div
																		className={`input-group ${
																			itemValidation.status ? `is-invalid` : ``
																		}`}
																	>
																		<select
																			className='custom-select'
																			id='status'
																			name='status'
																			onChange={handleMenuData}
																			aria-label='status Select'
																		>
																			<option
																				value='1'
																				selected={itemData.status === 1}
																			>
																				Enable
																			</option>
																			<option
																				value='0'
																				selected={itemData.status === 0}
																			>
																				Disable
																			</option>
																		</select>
																	</div>

																	<div
																		className={
																			itemValidation.status
																				? `invalid-feedback`
																				: `d-none`
																		}
																	>
																		{itemValidation.status}
																	</div>
																</div>
															</div>
														</div>
													</div>

													{/*<div className="col-lg-6">*/}
													{/*  <div className="row">*/}
													{/*    <div className="col-md-12">*/}
													{/*      <div className="form-group">*/}
													{/*        <label htmlFor="sort_order">Sort Order</label>*/}
													{/*        <input*/}
													{/*          type="text"*/}
													{/*          className={`form-control ${*/}
													{/*            itemValidation.sort_order*/}
													{/*              ? `is-invalid`*/}
													{/*              : ``*/}
													{/*          }`}*/}
													{/*          id="sort_order"*/}
													{/*          name="sort_order"*/}
													{/*          value={menuItemData.sort_order}*/}
													{/*          onChange={handleMenuData}*/}
													{/*          placeholder="1"*/}
													{/*          required*/}
													{/*        />*/}
													{/*        <div*/}
													{/*          className={*/}
													{/*            itemValidation.sort_order*/}
													{/*              ? `invalid-feedback`*/}
													{/*              : `d-none`*/}
													{/*          }*/}
													{/*        >*/}
													{/*          {itemValidation.sort_order}*/}
													{/*        </div>*/}
													{/*      </div>*/}
													{/*    </div>*/}
													{/*  </div>*/}
													{/*  <div className="row">*/}
													{/*    <div className="col-md-12">*/}
													{/*      <div className="form-group">*/}
													{/*        <label htmlFor="status">*/}
													{/*          Status*/}
													{/*          <span className="text-danger"> * </span>*/}
													{/*        </label>*/}
													{/*        <div*/}
													{/*          className={`input-group ${*/}
													{/*            itemValidation.status*/}
													{/*              ? `is-invalid`*/}
													{/*              : ``*/}
													{/*          }`}*/}
													{/*        >*/}
													{/*          <select*/}
													{/*            className="custom-select"*/}
													{/*            id="status"*/}
													{/*            name="status"*/}
													{/*            onChange={handleMenuData}*/}
													{/*            aria-label="status Select"*/}
													{/*          >*/}
													{/*            <option value="1">Enable</option>*/}
													{/*            <option value="0">Disable</option>*/}
													{/*          </select>*/}
													{/*        </div>*/}

													{/*        <div*/}
													{/*          className={*/}
													{/*            itemValidation.status*/}
													{/*              ? `invalid-feedback`*/}
													{/*              : `d-none`*/}
													{/*          }*/}
													{/*        >*/}
													{/*          {itemValidation.status}*/}
													{/*        </div>*/}
													{/*      </div>*/}
													{/*    </div>*/}
													{/*  </div>*/}
													{/*  <div className="row">*/}
													{/*    <div className="col-md-12">*/}
													{/*      <div className="custom-control custom-checkbox ">*/}
													{/*        <input*/}
													{/*          type="checkbox"*/}
													{/*          className="custom-control-input"*/}
													{/*          checked={menuItemData.sent_email == "1"}*/}
													{/*          name="sent_email"*/}
													{/*          id="sent_email"*/}
													{/*          onChange={handleMenuData}*/}
													{/*        />*/}
													{/*        <label*/}
													{/*          className="custom-control-label"*/}
													{/*          htmlFor="sent_email"*/}
													{/*        >*/}
													{/*          Sent Email*/}
													{/*        </label>*/}
													{/*      </div>*/}
													{/*      <div className="custom-control custom-checkbox">*/}
													{/*        <input*/}
													{/*          type="checkbox"*/}
													{/*          className="custom-control-input"*/}
													{/*          checked={menuItemData.sent_sms == "1"}*/}
													{/*          name="sent_sms"*/}
													{/*          id="sent_sms"*/}
													{/*          onChange={handleMenuData}*/}
													{/*        />*/}
													{/*        <label*/}
													{/*          className="custom-control-label"*/}
													{/*          htmlFor="sent_sms"*/}
													{/*        >*/}
													{/*          Sent SMS*/}
													{/*        </label>*/}
													{/*      </div>*/}
													{/*    </div>*/}
													{/*  </div>*/}
													{/*</div>*/}
													<div className='col-12'>
														<div className='form-group'>
															<label htmlFor='content'>Content</label>
															<textarea
																className={`form-control ${
																	itemValidation.content ? `is-invalid` : ``
																}`}
																id='description'
																name='content'
																value={itemData.content}
																onChange={handleMenuData}
																placeholder='content'
															/>
															<div
																className={
																	itemValidation.content
																		? `invalid-feedback`
																		: `d-none`
																}
															>
																{itemValidation.content}
															</div>
														</div>
													</div>
												</div>

												<div className='row'>
													<div className='col-lg-12 text-right'>
														<div className='form-group'>
															<Link legacyBehavior href={'/admin/pages'}>
																<a className='btn btn-info mr-2'>
																	<i className='icon-arrow-left-solid mr-1 mr-1' />
																	Back
																</a>
															</Link>

															<button
																type='submit'
																onClick={resetMenuData}
																className='btn btn-danger mr-2'
															>
																<i className='icon-reset mr-1' />
																Reset
															</button>

															<button
																type='submit'
																onClick={saveMenuData}
																className={`btn btn-success ${
																	loading ? 'disabled' : ''
																}`}
															>
																<i
																	className={
																		loading
																			? `spinner-border spinner-border-sm mr-1`
																			: `icon-save-regular mr-1`
																	}
																/>
																{loading ? `Saving..` : `Save`}
															</button>
														</div>
													</div>
												</div>
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

export default EditPage
