import Success from '../../Notification/Success'
import Error from '../../Notification/Error'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'
import React, { useState } from 'react'

const PartnerList = () => {

	const [successMessage, setSuccessMessage] = useState({
		status: false,
		message: '',
	})

	const [errorMessage, setErrorMessage] = useState({
		status: false,
		message: '',
	})

	const handlePageChange = (pageNumber) => {
		const selected = parseInt(pageNumber.selected + 1)
		// getUnitList(selected, unitPerPage)
	}

	const handleProductShowPerPage = (event) => {
		// setPigantionMeta('')
		// setCurrenetPageNamuber('')
		// getUnitList(null, event.target.value)
	}

	const handaleSearch = (event) => {
		event.preventDefault()

		if (event.target.value.length === 0) {
			// setSearchingFlag(true)
		}
		// setSearchingKeyWord(event.target.value)
	}
	return (
		<>
			{successMessage.status && <Success message={successMessage.message} />}

			{errorMessage.status && <Error message={errorMessage.message} />}
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='icon-list2' />
										<h2>Partner List</h2>
										<Link legacyBehavior href={`/admin/accounts/accounts-partner/add`}>
											<a className='fbh-btn' title='Add Unit'>
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
													onChange={handleProductShowPerPage}
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
													placeholder='search unit name'
													onChange={handaleSearch}
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
														{/* <th scope="col">Code</th>
                              <th scope="col">Base Unit</th>
                              <th scope="col">Operator</th>
                              <th scope="col">Operation Value</th> */}
														<th scope='col'>Status</th>
														<th scope='col'>Action</th>
													</tr>
													</thead>
													<tbody>
													{/* unitList &&
													unitList.map((unit, index) => (
														<tr key={unit.id}>
															<td scope='row'>
																{pigantionMeta.from ? index + pigantionMeta.from : ''}
															</td>
															<td className='nowrap'>{unit.name ?? '-'}</td>

															<td className='text-center'>
																<i
																	className={
																		unit.status === 'Active'
																			? `icon icon-check-circle-solid text-success`
																			: `icon icon-check-circle-solid text-danger`
																	}
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
																		<Link href={`unit/edit/?id=${unit.id}`}>
																			<a className='dropdown-item'>
																				<i className='icon-pencil-alt text-primary' /> Edit
																			</a>
																		</Link>

																		<a
																			className='dropdown-item'
																			href='#'
																			onClick={(event) => {
																				event.preventDefault()
																				console.log()
																				deleteUnit(unit.id)
																			}}
																		>
																			<i className='icon-trash-alt-regular text-danger' />{' '}
																			Delete
																		</a>
																		<div className='dropdown-divider' />
																		<a
																			className='dropdown-item'
																			href='#'
																			onClick={(event) => {
																				event.preventDefault()
																				publidhUnpublishUnit(unit.id)
																			}}
																		>
																			<i
																				className={`icon-sphere ${
																					unit.status === 'Active'
																						? 'text-danger'
																						: 'text-success'
																				}`}
																			/>
																			{unit.status === 'Active' ? 'Unpublish' : 'Publish'}
																		</a>
																	</div>
																</div>
															</td>
														</tr>
													)) */}
													</tbody>
												</table>
											</div>
										</div>
										<div className='col-lg-12'>
											{/* pigantionMeta && (
												<nav
													aria-label='Page navigation example'
													className='d-flex justify-content-end'
												>
													<ReactPaginate
														previousLabel={'previous'}
														nextLabel={'next'}
														breakLabel={'...'}
														pageCount={pigantionMeta.last_page}
														marginPagesDisplayed={2}
														pageRangeDisplayed={2}
														onPageChange={handlePageChange}
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
											)*/}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default PartnerList;