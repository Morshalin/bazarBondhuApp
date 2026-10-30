import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loader from 'react-loader'
import ReactPaginate from 'react-paginate'
import { options } from '../../../../Helpers/Utils/Utils'
import MyError from '../../Notification/MyError'
import MySucces from '../../Notification/MySuccess'
import useDebounce from './custom-hook/use-debounce'
const BrandTable = ({ brands }) => {
	const [pigantionMeta, setPigantionMeta] = useState(brands.meta)
	const [listPerPage, setListPerPage] = useState(brands.meta.per_page)
	const [searchingKeyWord, setSearchingKeyWord] = useState('')

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

	const [brandList, setBrandList] = useState(brands.data)

	const debouncedSearch = useDebounce(searchingKeyWord, 1000)

	const [searchingFlag, setSearchingFlag] = useState(false)

	useEffect(() => {
		if (debouncedSearch) {
			setSearchingFlag(false)
			setPigantionMeta('')
			getBrandList('', listPerPage)
		}
		if (searchingFlag) {
			setSearchingFlag(false)
			setPigantionMeta('')
			getBrandList('', listPerPage)
		}
	}, [debouncedSearch])

	const getBrandList = async (pageNumber, showingNumber) => {
		showingNumber && setListPerPage(showingNumber)
		try {
			const brandApiUrl = pageNumber
				? `${
						process.env.api_backend_url
				  }/getAllBrand?page=${pageNumber}&show=${showingNumber}${
						searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
				  }`
				: `${process.env.api_backend_url}/getAllBrand?show=${
						showingNumber ?? listPerPage
				  }${searchingKeyWord && `&searchKeyword=${searchingKeyWord}`}`
			const listOfBrand = await axios.get(brandApiUrl)
			setBrandList(listOfBrand.data.data.data)
			setPigantionMeta(listOfBrand.data.data.meta)
		} catch (error) {
			setBrandList('')
			setPigantionMeta('')
		}
	}

	const handaleSearch = (event) => {
		event.preventDefault()
		if (event.target.value.length === 0) {
			setSearchingFlag(true)
		}
		setSearchingKeyWord(event.target.value)
	}

	const handleProductShowPerPage = (event) => {
		event.preventDefault()
		setPigantionMeta('')
		getBrandList(null, event.target.value)
	}

	const handlePageChange = (pageNumber) => {
		const selected = parseInt(pageNumber.selected + 1)
		getBrandList(selected, listPerPage)
	}

	const publishUnpublishBrand = async (brandId) => {
		const actionButton = document.getElementById(`action_button_${brandId}`)
		const status = document.getElementById(`status_${brandId}`)
		const statusIcon = document.getElementById(`status_icon_${brandId}`)
		const statusName = document.getElementById(`status_name_${brandId}`)
		try {
			actionButton.disabled = true
			const brandApiCalling = await axios.post(
				`${process.env.api_backend_url}/brands/brand-active-status/${brandId}`
			)
			const brandStatus = await brandApiCalling.data
			if (brandStatus.success) {
				setSuccessMessage({
					...successMessage,
					status: true,
					message: brandStatus.message,
				})
				status.classList.remove(status.classList[1].toString())
				status.classList.add(
					brandStatus.data.status ? 'text-success' : 'text-danger'
				)
				statusIcon.classList.add(
					brandStatus.data.status ? 'text-success' : 'text-danger'
				)
				statusIcon.classList.remove(statusIcon.classList[1].toString())
				statusIcon.classList.add(
					brandStatus.data.status ? 'text-danger' : 'text-success'
				)
				statusName.textContent = brandStatus.data.status
					? 'Unpublish'
					: 'Publish'
			} else {
				throw 'some thing goe wrong on server request'
			}
		} catch (errors) {
			throw errors
		} finally {
			actionButton.disabled = false
		}
	}

	const deleteBrand = async (index, brandId) => {
		const brandRows = document.getElementById(`brand_row_${brandId}`)
		if (window.confirm('Are you sure to delete this record?')) {
			try {
				brandRows.classList.add('bg-danger')
				const postData = new FormData()
				postData.append('_method', 'DELETE')
				const deleteApiUrl = await axios.post(
					`${process.env.api_backend_url}/brands/${brandId}`,
					postData
				)
				const deletedBrand = deleteApiUrl.data
				if (deletedBrand.success) {
					brandList.splice(index, 1)
					const updateBrandList = JSON.parse(JSON.stringify(brandList))
					if (!updateBrandList.length) {
						setPigantionMeta('')
						getBrandList(null, listPerPage)
					} else {
						setBrandList(updateBrandList)
					}
					setSuccessMessage({
						...successMessage,
						status: true,
						message: deletedBrand.message,
					})
				} else {
					throw 'deleted not successfull'
				}
			} catch (errors) {
				setErrorMessage({
					...errorMessage,
					status: true,
					message: errors,
				})
			} finally {
			}
		}
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
			<section className='custom-card'>
				<Loader loaded={!!brandList} options={options} className='spinner'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-md-12'>
								<div className='custom-card-box'>
									<div className='custom-card-box-header'>
										<div className='fbh-title'>
											<i className='icon-list2' />
											<h2>Brand List</h2>
											<Link legacyBehavior href={`/admin/brand/add`}>
												<a className='fbh-btn' title='Add Brand'>
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
														placeholder='search brand name'
														onChange={handaleSearch}
													/>
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-lg-12'>
												<div className='table-responsive custom-table'>
													<table className='table table-bordered table-hover table-striped text-center'>
														<thead className='thead-light'>
															<tr>
																<th scope='col'>SL</th>
																<th scope='col'>Image</th>
																<th scope='col'>Name</th>
																<th scope='col'>Status</th>
																<th scope='col'>Action</th>
															</tr>
														</thead>
														<tbody>
															{brandList &&
																brandList.map((brand, index) => (
																	<tr
																		key={brand.id}
																		id={`brand_row_${brand.id}`}
																	>
																		<td scope='row'>
																			{pigantionMeta.from
																				? index + pigantionMeta.from
																				: ''}
																		</td>
																		<td>
																			<img src={brand.logo} alt={brand.name} />
																		</td>
																		<td className='nowrap'>{brand.name}</td>
																		<td>
																			<i
																				id={`status_${brand.id}`}
																				className={`icon-check-circle-solid ${
																					brand.status === 'Active'
																						? `text-success`
																						: `text-danger`
																				}`}
																			/>
																		</td>
																		<td>
																			<div className='dropdown action-btn-group'>
																				<button
																					className='btn btn-outline-primary rounded-0 btn-sm dropdown-toggle'
																					type='button'
																					data-toggle='dropdown'
																					aria-haspopup='true'
																					aria-expanded='false'
																					id={`action_button_${brand.id}`}
																					disabled={''}
																				>
																					Actions
																				</button>
																				<div className='dropdown-menu'>
																					<Link legacyBehavior
																						href={`brand/edit/${brand.id}`}
																					>
																						<a className='dropdown-item'>
																							<i className='icon-pencil-alt text-primary' />{' '}
																							Edit
																						</a>
																					</Link>
																					{/* <a className="dropdown-item" href="#">
                                          <i className="icon-image" /> View
                                        </a> */}
																					<a
																						className='dropdown-item'
																						href='#'
																						onClick={(event) => {
																							event.preventDefault()
																							deleteBrand(index, brand.id)
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
																							publishUnpublishBrand(brand.id)
																						}}
																					>
																						<i
																							id={`status_icon_${brand.id}`}
																							className={`icon-sphere ${
																								brand.status === 'Active'
																									? 'text-danger'
																									: 'text-success'
																							}`}
																						/>
																						<span
																							id={`status_name_${brand.id}`}
																						>
																							{`${
																								brand.status === 'Active'
																									? 'Unpublish'
																									: 'Publish'
																							}`}
																						</span>
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
												{pigantionMeta && (
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
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Loader>
			</section>
		</>
	)
}
export default BrandTable
