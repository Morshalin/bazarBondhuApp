import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Error from '../Notification/Error'
import Success from '../Notification/Success'

const LanguageList = () => {
	const [show, setShow] = useState(10)
	const [keywords, setKeywords] = useState('')
	const [meta, setMeta] = useState('')
	const [page, setPage] = useState(0)
	const [languageList, setLanguageList] = useState('')
	let initialMessage = { success: '', error: '' }
	const [message, setMessage] = useState(initialMessage)
	useEffect(() => { (async () => {
		await loadCoupon()
	})(); }, [show, keywords, page])

	const loadCoupon = async () => {
		let response = await axios
			.get(`/backend/translations?page=${page}&show=${show}&keywords=${keywords}`)
			.then((result) => {
				return result.data
			})
			.catch((error) => {
				return error
			})
		if (response.success) {
			setLanguageList(response.data.data)
			setMeta(response.data.meta)
		}
	}

	const deleteCoupon = async (coupon_id) => {
		await axios
			.delete(`/backend/coupons/${coupon_id}`)
			.then((result) => {
				if (result.data.success) {
					setMessage({ ...message, success: result.data.message })
					setCouponList(couponList.filter((coupon) => coupon.id !== coupon_id))
					if (!couponList) {
						loadCoupon()
					}
				} else {
					setMessage({ ...message, error: result.data.message })
				}
			})
			.catch((error) => {
				setMessage({ ...message, error: error })
			})

		resetChanges()
	}

	const disableEnable = async (coupon_id) => {
		await axios
			.post(`/backend/coupons/change-status/${coupon_id}`)
			.then((result) => {
				if (result.data.success) {
					loadCoupon()
					setMessage({ ...message, success: result.data.message })
				} else {
					setMessage({ ...message, error: result.data.message })
				}
			})
			.catch((error) => {
				setMessage({ ...message, error: error })
			})

		resetChanges()
	}

	const resetChanges = () => {
		setTimeout(() => {
			setMessage({ ...message, success: '' })
		}, 2000)
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
										<i className='icon-list2' />
										<h2>Language List</h2>
										<Link legacyBehavior href={`/admin/settings/translation/add`}>
											<a className='fbh-btn' title='Add new Language'>
												<i className='icon-plus-square-regular' />
											</a>
										</Link>
									</div>
								</div>
								<div className='custom-card-box-content'>
									<div className='row table-top-option mb-3'>
										<div className='col-sm-6'>
											<div className='showing-table-row'>
												<label className=''>Show</label>
												<select
													className='custom-select'
													defaultValue={`10`}
													onChange={(event) => {
														setMeta('')
														setShow(event.target.value)
													}}
												>
													<option value='10'>10</option>
													<option value='25'>25</option>
													<option value='50'>50</option>
													<option value='100'>100</option>
												</select>
											</div>
										</div>
										<div className='col-sm-6'>
											<div className='table-search'>
												<label className=''>Search</label>
												<input
													type='text'
													className='form-control'
													placeholder='type your need'
													onChange={(event) => {
														setTimeout(() => {
															setMeta('')
															setKeywords(event.target.value)
															setPage(1)
														}, 500)
													}}
												/>
											</div>
										</div>
									</div>
									<div className='row'>
										<div className='col-lg-12'>
											<div className='table-responsive custom-table'>
												<table className='table table-bordered table-hover table-striped'>
													<thead className='thead-light'>
														<tr>
															<th scope='col'>SL</th>
															<th scope='col'>Name</th>
															<th scope='col'>Code</th>
															<th scope='col'>Active</th>
															<th scope='col'>Default</th>
															<th scope='col'>Action</th>
														</tr>
													</thead>
													<tbody id='table'>
														{languageList &&
														languageList.map((language, index) => (
																<tr key={language.id} className='text-center'>
																	<td scope='row'>
																		{meta.from ? index + meta.from : index}
																	</td>
																	<td className='nowrap'>
																		{language.language_name ?? '-'}
																	</td>
																	<td className='nowrap'>
																		{language.short_code ?? '-'}
																	</td>
																	<td className='nowrap'>
																		{language.is_active ?? '-'}
																	</td>
																	<td className='text-center'>
																		<i
																			className={
																				language.is_default === 1
																					? `fas fa-circle text-success`
																					: `fas fa-circle text-danger`
																			}
																			id={`permission_status_${language.id}`}
																		/>
																	</td>
																	<td className='text-center'>
																		<div className='dropdown action-btn-group'>
																			<button
																				className='btn btn-outline-primary rounded-0 btn-sm dropdown-toggle'
																				type='button'
																				data-toggle='dropdown'
																				aria-haspopup='true'
																				aria-expanded='false'
																			>
																				Actions
																			</button>
																			<div className='dropdown-menu'>
																				<Link legacyBehavior href={`settings/translation/${language.id}`}>
																					<a className='dropdown-item'>
																						<i className='icon-pencil-alt text-primary' />
																						Edit
																					</a>
																				</Link>
																				<a
																					className='dropdown-item'
																					href='#'
																					onClick={(event) => {
																						event.preventDefault()
																						deleteCoupon(language.id)
																					}}
																				>
																					<i className='icon-trash-alt-regular text-danger' />
																					Delete
																				</a>
																				<div className='dropdown-divider'></div>
																				<a
																					className='dropdown-item'
																					href='#'
																					onClick={(event) => {
																						event.preventDefault()
																						disableEnable(language.id)
																					}}
																				>
																					<i
																						className={`icon-sphere ${
																							language.status === 1
																								? 'text-danger'
																								: 'text-success'
																						}`}
																					/>
																					{language.status === 1
																						? 'Disabled'
																						: 'Enabled'}
																				</a>
																			</div>
																		</div>
																	</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
										<div className='col-lg-12'>
											{meta && (
												<nav
													aria-label='Page navigation example'
													className='d-flex justify-content-center'
												>
													<ReactPaginate
														previousLabel={'Previous'}
														nextLabel={'Next'}
														breakLabel={'...'}
														pageCount={meta.last_page}
														marginPagesDisplayed={2}
														pageRangeDisplayed={2}
														onPageChange={(pageNumber) => {
															setPage(pageNumber.selected + 1)
														}}
														containerClassName={'pagination'}
														pageClassName={'page-item'}
														pageLinkClassName={'page-link'}
														activeClassName={'active'}
														previousClassName={'page-item'}
														previousLinkClassName={'page-link'}
														nextClassName={'page-item'}
														nextLinkClassName={'page-link'}
														breakClassName={'page-item'}
														breakLinkClassName={'page-link'}
													/>
												</nav>
											)}
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

export default LanguageList
