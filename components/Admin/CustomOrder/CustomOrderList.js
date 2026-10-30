import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const CustomOrderList = () => {
	const [show, setShow] = useState(10)
	const [keywords, setKeywords] = useState('')
	const [meta, setMeta] = useState('')
	const [page, setPage] = useState(0)
	const [customOrderLists, setCustomOrderLists] = useState('')
	const [customOrderDetail, setCustomOrderDetail] = useState('')

	useEffect(() => { (async () => {
		await loadCutsomOrderList()
	})(); }, [show, keywords, page])

	useEffect(() => {}, [])

	const loadCutsomOrderList = async () => {
		let response = await axios
			.get(
				`/backend/custom-orderlist?page=${page}&show=${show}&keywords=${keywords}`
			)
			.then((result) => {
				return result.data
			})
			.catch((error) => {
				return error
			})
		if (response.success) {
			setCustomOrderLists(response.data.data)
			setMeta(response.data.meta)
		}
	}

	const loadCutsomOrderDetail = async (customOrderListId) => {
		let response = await axios
			.get(`/backend/custom-orderdetail/${customOrderListId}`)
			.then((result) => {
				return result.data
			})
			.catch((error) => {
				return error
			})
		if (response.success) {
			setCustomOrderDetail(response.data)
		}
	}

	const modalResponse = (customOrder) => {
		setCustomOrderDetail(customOrder)
		$('#myModal').modal('show')
	}

	return (
		<>
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='icon-list2' />
										<h2>Custom Order List</h2>
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
													placeholder='search by name/phone/email/address'
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
															<th scope='col'>Phone Number</th>
															<th scope='col'>Email</th>
															<th scope='col'>Action</th>
														</tr>
													</thead>
													<tbody id='table'>
														{customOrderLists.length ? (
															customOrderLists.map((customOrder, index) => (
																<tr
																	key={customOrder.id}
																	className='text-center'
																>
																	<td scope='row'>
																		{meta.from ? index + meta.from : ''}
																	</td>
																	<td scope='row'>
																		{customOrder.customer_name}
																	</td>
																	<td scope='row'>
																		{customOrder.customer_phone}
																	</td>
																	<td scope='row'>
																		{customOrder.customer_email}
																	</td>
																	<td>
																		<button
																			className='btn btn-outline-primary rounded-0 btn-sm'
																			type='button'
																			onClick={(event) => {
																				event.preventDefault()
																				modalResponse(customOrder)
																			}}
																		>
																			View
																		</button>
																	</td>
																</tr>
															))
														) : (
															<tr>
																<td colSpan='5' className='text-center'>
																	no custom order list found
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
										</div>
										{customOrderLists.length ? (
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
										) : (
											''
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className='modal fade bd-example-modal-lg'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='myLargeModalLabel'
					aria-hidden='true'
					id='myModal'
				>
					<div className='modal-dialog modal-xl'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Custom Order Details</h5>
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
									<div className='col-lg-4'>
										{customOrderDetail.shopping_item_file &&
											customOrderDetail.shopping_item_file.map(
												(customOrderFile, index) => (
													<img
														key={index++}
														src={`${customOrderDetail.file_url}/${customOrderFile}`}
														alt='no preview of'
														className='border w-100 mb-1'
													/>
												)
											)}
									</div>
									<div className='col-lg-8'>
										<div className='table-responsive'>
											<table className='table table-bordered table-striped table-hover'>
												<tbody>
													<tr className='text-center'>
														<td className='text-right w-50'>Customer Name</td>
														<td className='font-weight-bolder'>
															{customOrderDetail.customer_name}
														</td>
													</tr>

													<tr className='text-center'>
														<td className='text-right w-50'>
															Customer Cell Phone
														</td>
														<td className='font-weight-bolder'>
															{customOrderDetail.customer_phone}
														</td>
													</tr>
													<tr className='text-center'>
														<td className='text-right w-50'>Customer Email</td>
														<td className='font-weight-bolder'>
															{customOrderDetail.customer_email}
														</td>
													</tr>
													<tr className='text-center'>
														<td className='text-right w-50'>
															Customer Address
														</td>
														<td className='font-weight-bolder'>
															{customOrderDetail.customer_address}
														</td>
													</tr>
													<tr className='text-center'>
														<td className='text-right w-50'>
															Customer Shopping Item
														</td>
														<td className='font-weight-bolder'>
															{customOrderDetail.shopping_item}
														</td>
													</tr>

													<tr className='text-center'>
														<td className='text-right w-50'>
															Customer Uploaded Files
														</td>
														<td className='font-weight-bolder'>
															<ul className='list-group'>
																{customOrderDetail.shopping_item_file &&
																	customOrderDetail.shopping_item_file.map(
																		(customOrderFile, index) => (
																			<li
																				key={index++}
																				className='list-group-item'
																			>
																				<a
																					download
																					href={`${customOrderDetail.file_url}/${customOrderFile}`}
																					target='_blank'
																					rel='noreferrer'
																				>
																					{customOrderFile}
																				</a>
																			</li>
																		)
																	)}
															</ul>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default CustomOrderList
