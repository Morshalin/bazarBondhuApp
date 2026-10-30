import React, {useEffect, useState} from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";

const AccountsSupplierList = () => {

    const [supplierList, setSuppliersList] = useState('')
    const [supplierPerPage, setSupplierPerPage] = useState('10')
    const [pigantionMeta, setPigantionMeta] = useState('');
    const [searchingKeyWord, setSearchingKeyWord] = useState('');
    const [currenetPageNamuber, setCurrenetPageNamuber] = useState('')


    const [successMessage, setSuccessMessage] = useState({
        status: false,
        message: '',
    })

    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: '',
    })

    const debouncedSearch = useDebounce(searchingKeyWord, 1000)

    const [searchingFlag, setSearchingFlag] = useState(false)

    useEffect(() => {
        if (debouncedSearch) {
            setSearchingFlag(false)
            setPigantionMeta('')
            getSuppliersList('', supplierPerPage)
        }
        if (searchingFlag) {
            setSearchingFlag(false)
            setPigantionMeta('')
            getSuppliersList('', supplierPerPage)
        }
    }, [debouncedSearch])

    const getSuppliersList = async (pageNumber, showingNumber) => {
        showingNumber && setSupplierPerPage(showingNumber)
        pageNumber && setCurrenetPageNamuber(pageNumber)
        try {
            const acountsApiUrl = pageNumber
                ? `${process.env.api_backend_url}/accounts/heads/getAllHead?page=${pageNumber}&show=${showingNumber}${
                    searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
                }`
                : `${process.env.api_backend_url}/accounts/heads/getAllHead?show=${showingNumber ?? '10'}${
                    searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
                }`
            //const dd = "http://localhost/laravel/accounts_api/api/auth/datacheck";
            const accountsData = await axios.get(dd);
            // const accountsData = await axios.get(acountsApiUrl)
            console.log(accountsData.data.data)
            setSuppliersList(accountsData.data.data)
            // setSuppliersList(accountsData.data.data.data)
            // setPigantionMeta(accountsData.data.data.meta)
        } catch (error) {
            setSuppliersList('')
            setPigantionMeta('')
        }
    }

    useEffect(() => {
        getSuppliersList()
    }, [])


    const handlePageChange = (pageNumber) => {
        const selected = parseInt(pageNumber.selected + 1)
        getSuppliersList(selected, unitPerPage)
    }

    const handleSupplierShowPerPage = (event) => {
        setPigantionMeta('')
        setCurrenetPageNamuber('')
        getSuppliersList(null, event.target.value)
    }

    const handaleSearch = (event) => {
        event.preventDefault()

        if (event.target.value.length === 0) {
            setSearchingFlag(true)
        }
        setSearchingKeyWord(event.target.value)
    }

    return (
        <>
            {successMessage.status && <Success message={successMessage.message}/>}

            {errorMessage.status && <Error message={errorMessage.message}/>}
            <section className='custom-card'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='custom-card-box'>
                                <div className='custom-card-box-header'>
                                    <div className='fbh-title'>
                                        <i className='icon-list2'/>
                                        <h2>Account's Of Supplier's</h2>
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
                                                    onChange={handleSupplierShowPerPage}
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
                                                        <th colSpan="2"></th>
                                                        <th scope='col' colSpan="2">Receivable</th>
                                                        <th scope='col' colSpan="2">Payable</th>
                                                        <th scope='col'></th>
                                                    </tr>
                                                    <tr>
                                                        <th scope='col'>SL</th>
                                                        <th scope='col'>Supplier</th>
                                                        <th scope='col'>Due</th>
                                                        <th scope='col'>Received</th>
                                                        <th scope='col'>Unpaid</th>
                                                        <th scope='col'>Paid</th>
                                                        <th scope='col'>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center">1</td>
                                                        <td>
                                                            Supplier Name
                                                        </td>
                                                        <td className="text-right">0.00</td>
                                                        <td className="text-right">0.00</td>
                                                        <td className="text-right">0.00</td>
                                                        <td className="text-right">0.00</td>
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
                                                                    <Link legacyBehavior href={`accounts-supplier/history/1`}>
                                                                        <a className='dropdown-item'>
                                                                            <i className="fas fa-history text-success"></i> History
                                                                        </a>
                                                                    </Link>

                                                                    <a
                                                                        className='dropdown-item'
                                                                        href='#'
                                                                        onClick={(event) => {
                                                                            event.preventDefault()
                                                                            console.log()
                                                                            // deleteUnit(account.id)
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-money-check-alt text-warning"></i>
                                                                        {' '}
                                                                        Make Payment
                                                                    </a>

                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>



                                                    {/*supplierList &&
                                                    supplierList.map((head, index) => (
                                                        <tr key={head.id}>
                                                            <td scope='row'>
                                                                {pigantionMeta.from ? index + pigantionMeta.from : ''}
                                                            </td>
                                                            <td className='nowrap'>
                                                                <Link
                                                                    href={`accounts-bank/view/${head.id}`}>{head.name ?? ''}</Link>
                                                            </td>
                                                            <td className='nowrap'>{head.account_code ?? ''}</td>
                                                            <td className='nowrap'>{head.account_number ?? ''}</td>
                                                            <td className='nowrap'>{head.bank_name ?? ''}</td>
                                                            <td className='nowrap text-right'>৳
                                                                {
                                                                    (head.current_balance ? parseFloat(head.current_balance) : 0).toFixed(2)
                                                                }
                                                            </td>

                                                            <td className='text-center'>
                                                            	<i
                                                            		className={
                                                            			head.status === 'Active'
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
                                                                        <Link href={`unit/edit/?id=${head.id}`}>
                                                                            <a className='dropdown-item'>
                                                                                <i className='icon-pencil-alt text-primary'/> Edit
                                                                            </a>
                                                                        </Link>

                                                                        <a
                                                                            className='dropdown-item'
                                                                            href='#'
                                                                            onClick={(event) => {
                                                                                event.preventDefault()
                                                                                console.log()
                                                                                // deleteUnit(head.id)
                                                                            }}
                                                                        >
                                                                            <i className='icon-trash-alt-regular text-danger'/>{' '}
                                                                            Delete
                                                                        </a>
                                                                        <div className='dropdown-divider'/>
                                                                        <a
                                                                            className='dropdown-item'
                                                                            href='#'
                                                                            onClick={(event) => {
                                                                                event.preventDefault()
                                                                                // publidhUnpublishUnit(head.id)
                                                                            }}
                                                                        >
                                                                            <i
                                                                                className={`icon-sphere ${
                                                                                    head.status === 'Active'
                                                                                        ? 'text-danger'
                                                                                        : 'text-success'
                                                                                }`}
                                                                            />
                                                                            {head.status === 'Active' ? 'Unpublish' : 'Publish'}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))*/}
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
export default AccountsSupplierList;