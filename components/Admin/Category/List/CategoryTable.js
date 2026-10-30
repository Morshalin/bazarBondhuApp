import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loader from 'react-loader'
import ReactPaginate from 'react-paginate'
import { options } from '../../../../Helpers/Utils/Utils'
import MyError from '../../Notification/MyError'
import MySucces from '../../Notification/MySuccess'
import useDebounce from './custom-hook/use-debounce'

const CategoryTable = () => {
	const [categoryList, setCategoryList] = useState('')
	const [isLoadedData, setIsLoadedData] = useState(false)
	const [pigantionMeta, setPigantionMeta] = useState('')
	const [listPerPage, setListPerPage] = useState('')
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

	useEffect(() => {
		if (!isLoadedData) {
			getCategoryList(null, 10)
		}
		return () => {
			setIsLoadedData(true)
		}
	}, [])

	const debouncedSearch = useDebounce(searchingKeyWord, 1000)

	const [searchingFlag, setSearchingFlag] = useState(false)

	useEffect(() => {
		if (debouncedSearch) {
			setSearchingFlag(false)
			setPigantionMeta('')
			getCategoryList('', listPerPage)
		}
		if (searchingFlag) {
			setSearchingFlag(false)
			setPigantionMeta('')
			getCategoryList('', listPerPage)
		}
	}, [debouncedSearch])

	const handaleSearch = (event) => {
		event.preventDefault()
		if (event.target.value.length === 0) {
			setSearchingFlag(true)
		}
		setSearchingKeyWord(event.target.value)
	}

	const getCategoryList = async (pageNumber = null, showingNumber = null) => {
		showingNumber && setListPerPage(showingNumber)
		try {
			const cateoryApiUrl = pageNumber
				? `${process.env.api_backend_url}/getAllCategory?page=${pageNumber}&show=${showingNumber}${
						searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
				  }`
				: `${process.env.api_backend_url}/getAllCategory?show=${showingNumber ?? listPerPage}${
						searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
				  }`
			const listOfCatgeory = await axios.get(cateoryApiUrl)
			setCategoryList(listOfCatgeory.data.data.data)
			setPigantionMeta(listOfCatgeory.data.data.meta)
		} catch (error) {
			setCategoryList('')
			setPigantionMeta('')
		}
	}

	const handleListShowPerPage = (event) => {
		event.preventDefault()
		setPigantionMeta('')
		getCategoryList(null, event.target.value)
	}

	const handlePageChange = (pageNumber) => {
		const selected = parseInt(pageNumber.selected + 1)
		getCategoryList(selected, listPerPage)
	}

	const publishUnpublishBrand = async (categoryId) => {
		const actionButton = document.getElementById(`action_button_${categoryId}`)
		const status = document.getElementById(`status_${categoryId}`)
		const statusIcon = document.getElementById(`status_icon_${categoryId}`)
		const statusName = document.getElementById(`status_name_${categoryId}`)
		try {
			actionButton.disabled = true
			const categoryApiRequest = await axios.post(
				`${process.env.api_backend_url}/categories/category-active-status/${categoryId}`
			)
			const categoryStatus = await categoryApiRequest.data
			if (categoryStatus.success) {
				setSuccessMessage({
					...successMessage,
					status: true,
					message: categoryStatus.message,
				})
				status.classList.remove(status.classList[1].toString())
				status.classList.add(categoryStatus.data.status ? 'text-success' : 'text-danger')
				statusIcon.classList.add(categoryStatus.data.status ? 'text-success' : 'text-danger')
				statusIcon.classList.remove(statusIcon.classList[1].toString())
				statusIcon.classList.add(categoryStatus.data.status ? 'text-danger' : 'text-success')
				statusName.textContent = categoryStatus.data.status ? 'Unpublish' : 'Publish'
			} else {
				throw 'some thing goe wrong on server reqest'
			}
		} catch (errors) {
			throw errors
		} finally {
			actionButton.disabled = false
		}
	}

	const deleteCategory = async (index, categoryId) => {
		const categoryRow = document.getElementById(`category_row_${categoryId}`)
		if (window.confirm('Are you sure to delete this record?')) {
			try {
				// categoryRow.classList.add("bg-danger");
				const postData = new FormData()
				postData.append('_method', 'DELETE')
				const deleteApiUrl = await axios.post(
					`${process.env.api_backend_url}/categories/${categoryId}`,
					postData
				)
				const deletedCategory = deleteApiUrl.data
				if (deletedCategory.success) {
					categoryList.splice(index, 1)
					const updateCategoryList = JSON.parse(JSON.stringify(categoryList))
					if (!updateCategoryList.length) {
						setPigantionMeta('')
						getCategoryList(null, listPerPage)
					} else {
						setCategoryList(updateCategoryList)
					}
					setSuccessMessage({
						...successMessage,
						status: true,
						message: deletedCategory.message,
					})
				} else {
					throw `Deleted not successfull.${deletedCategory.message}`
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
				<MySucces message={successMessage.message} resetSuccesMessage={resetSuccesMessage} />
			)}

			{errorMessage.status && (
				<MyError message={errorMessage.message} resetErrorMessage={resetErrorMessage} />
			)}
			<section className='custom-card'>
				<Loader loaded={!!categoryList} options={options} className='spinner'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-md-12'>
								<div className='custom-card-box'>
									<div className='custom-card-box-header'>
										<div className='fbh-title'>
											<i className='icon-list2' />
											<h2>Category List</h2>
											<Link legacyBehavior href={`/admin/category/add`}>
												<a className='fbh-btn' title='Add Catgeory'>
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
														onChange={handleListShowPerPage}
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
														placeholder='search category name'
														onChange={handaleSearch}
														style={{ width: '200px' }}
													/>
												</div>
											</div>
										</div>
										<div className='row'>
											<div className='col-lg-12'>
												<div className='table-responsive custom-table'>
													{categoryList && (
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
																{categoryList.map((category, index) => (
																	<tr key={category.id} id={`category_row_${category.id}`}>
																		<td scope='row'>
																			{pigantionMeta.from ? index + pigantionMeta.from : ''}
																		</td>
																		<td>
																			<img src={category.image} alt={category.name} />
																		</td>
																		<td className='nowrap'>{category.name}</td>
																		<td>
																			<i
																				className={`icon-check-circle-solid ${
																					category.status === 'Active'
																						? `text-success`
																						: `text-danger`
																				}`}
																				id={`status_${category.id}`}
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
																					id={`action_button_${category.id}`}
																				>
																					Actions
																				</button>
																				<div className='dropdown-menu'>
																					<Link legacyBehavior href={`category/edit/${category.id}`}>
																						<a className='dropdown-item'>
																							<i className='icon-pencil-alt text-primary' /> Edit
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
																							deleteCategory(index, category.id)
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
																							publishUnpublishBrand(category.id)
																						}}
																					>
																						<i
																							id={`status_icon_${category.id}`}
																							className={`icon-sphere ${
																								category.status === 'Active'
																									? 'text-danger'
																									: 'text-success'
																							}`}
																						/>
																						<span id={`status_name_${category.id}`}>
																							{category.status === 'Active'
																								? 'Unpublish'
																								: 'Publish'}
																						</span>
																					</a>
																				</div>
																			</div>
																		</td>
																	</tr>
																))}
															</tbody>
														</table>
													)}
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
export default CategoryTable
