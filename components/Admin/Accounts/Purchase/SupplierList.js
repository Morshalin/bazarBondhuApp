import React, {useEffect, useState} from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import ReactPaginate from 'react-paginate'
import PaymentModal from "./PaymentModal";
import MySuccess from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";
import Select from "react-select";
import {ERROR, getActions, saveAction, SUCCESS} from "../../../../Helpers/Utils/Utils";

const AccountsPurchaseSupplierList = () => {

    const initialFormState = {"filter_supplier": 0, "filter_form_date":new Date().toISOString().slice(0, 10), "filted_end_date":new Date().toISOString().slice(0, 10)};
    const [filted, SetFilter] = useState(initialFormState);

    const [supplierList, setSuppliersList] = useState('')
    const [supplierPerPage, setSupplierPerPage] = useState('10')
    const [pigantionMeta, setPigantionMeta] = useState('');
    const [searchingKeyWord, setSearchingKeyWord] = useState('');
    const [currenetPageNamuber, setCurrenetPageNamuber] = useState('')
    const [suppliers, setSuppliers] = useState([]);

    const [supplier, setSupplier] = useState('');


    const [successMessage, setSuccessMessage] = useState({
        status: false,
        message: '',
    })

    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: '',
    })

    const resetSuccessMessage = () => {
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
                ? `${process.env.api_backend_url}/accounts/purchase?page=${pageNumber}&show=${showingNumber}${
                    searchingKeyWord && `&searchKeyword=${searchingKeyWord}` && `&filter=${filted}`
                }`
                : `${process.env.api_backend_url}/accounts/purchase?show=${showingNumber ?? '10'}${
                    searchingKeyWord && `&searchKeyword=${searchingKeyWord}` && `&filter=${filted}`
                }`
            const accountsData = await axios.get(acountsApiUrl)
            console.log(accountsData.data);
            setSuppliersList(accountsData.data.data.data)
            setPigantionMeta(accountsData.data.data.meta)
        } catch (error) {
            setSuppliersList('')
            setPigantionMeta('')
        }
    }

    const getAllSuppliers = async () => {
        try {
            const sup = await axios.get(`${process.env.api_backend_url}/accounts/purchase/supplier-list`)
            setSuppliers(sup.data.data);
        } catch (error) {
            setSuppliers(['']);
        }
    }

    useEffect(() => {
        // getSuppliersList()
        getAllSuppliers()
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

    const changeFiltered = (event) => {
        const {name, value} = event.target
        SetFilter({...filted, [name]: value})
    }

    const serchFiltured = () => {
        saveAction(`backend/accounts/purchase/supplierPayment`, filted)
            .then((res) => {
                // console.log(res)
                if (res.success) {
                    setSuppliersList(res.data.data)
                    setPigantionMeta(res.data.meta)
                    // props.setMessage(SUCCESS, res.message);
                    // props.msg('SUCCESS', res.message)
                    // props.suppliers(res.data.data);


                } else {
                    // props.setMessage(ERROR, res.message);

                }
            });
    }

    const handaleSearch = (event) => {
        event.preventDefault()

        if (event.target.value.length === 0) {
            setSearchingFlag(true)
        }
        setSearchingKeyWord(event.target.value)
    }

    const updateItem = (updatedItem) => {
        setSuppliersList(updatedItem)
    }

    const returnMessage = (status, data) => {
        setTimeout(() => {
            if (status == "SUCCESS") {
                setSuccessMessage({
                    status: true,
                    message: data,
                })
            } else {
                setErrorMessage({
                    status: true,
                    message: data,
                })
            }
        }, 2000);
    }



// console.log(supplier)
    return (
        <>
            {/*{successMessage.status && <Success message={successMessage.message}/>}*/}

            {/*{errorMessage.status && <Error message={errorMessage.message}/>}*/}

            {successMessage.status && (
                <MySuccess
                    message={successMessage.message}
                    resetSuccesMessage={resetSuccessMessage}
                />
            )}

            {errorMessage.status && (
                <MyError
                    message={errorMessage.message}
                    resetErrorMessage={resetErrorMessage}
                />
            )}

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

                                    <div className="row mb-4">
                                        <div className="col-md-11 row col-sm-12">

                                            <div className="col-md-4 col-sm-12">
                                                <div className="row">
                                                    <label htmlFor="name" className="col-md-4 pl-0 pr-0">
                                                        Supplier
                                                        <span className="text-danger"> * </span>
                                                    </label>

                                                    <select className="form-control col-md-8"
                                                        id="filter_supplier"
                                                        name="filter_supplier"
                                                        value={filted.filter_supplier ?? ''}
                                                        onChange={(e) => {
                                                            // changeHandelChange(e);
                                                            changeFiltered(e)
                                                        }}
                                                            required
                                                    >
                                                        <option value="">Select All Suppliers</option>
                                                        {
                                                            suppliers && suppliers.map((suplier, index) => (
                                                                <option value={suplier.id}>{suplier.name}</option>
                                                            ))
                                                        }

                                                    </select>


                                                    {/*<div*/}
                                                    {/*    className={errors.payment_method ? `invalid-feedback` : ``}>*/}
                                                    {/*    {errors.payment_method}*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>

                                            <div className="col-md-8 row col-sm-12">
                                                <div className="col-md-6">
                                                    <div className=" row">
                                                        <label htmlFor="name" className="col-md-5 col-form-label">
                                                            From Date
                                                            <span className="text-danger"> * </span>
                                                        </label>

                                                        <input
                                                            type="date"
                                                            className={`form-control col-md-7`}
                                                            autoComplete="off"
                                                            id="filter_form_date"
                                                            name="filter_form_date"
                                                            value={filted.filter_form_date ? filted.filter_form_date : new Date().toISOString().slice(0, 10)}
                                                            // value={new Date().toISOString().slice(0, 10)}
                                                            onChange={(e) => {
                                                                // changeHandelChange(e);
                                                                changeFiltered(e);
                                                            }}
                                                            required/>


                                                        {/*<div*/}
                                                        {/*    className={errors.payment_method ? `invalid-feedback` : ``}>*/}
                                                        {/*    {errors.payment_method}*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <label htmlFor="name" className="col-md-5 col-form-label">
                                                            To Date
                                                            <span className="text-danger"> * </span>
                                                        </label>

                                                        <input
                                                            type="date"
                                                            className={`form-control col-md-7`}
                                                            autoComplete="off"
                                                            id="filted_end_date"
                                                            name="filted_end_date"
                                                            value={filted.filted_end_date ? filted.filted_end_date : new Date().toISOString().slice(0, 10)}
                                                            // value={new Date().toISOString().slice(0, 10)}
                                                            onChange={(e) => {
                                                                // changeHandelChange(e);
                                                                changeFiltered(e);
                                                            }}
                                                            required/>


                                                        {/*<div*/}
                                                        {/*    className={errors.payment_method ? `invalid-feedback` : ``}>*/}
                                                        {/*    {errors.payment_method}*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1 col-sm-12">
                                            <button className="btn btn-primary btn-sm mt-1"
                                                    onClick={serchFiltured}
                                            >Search</button>
                                        </div>

                                    </div>

                                    {
                                        supplierList ?
                                            <>
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
                                                            <table
                                                                className='table table-bordered table-hover table-striped'>
                                                                <thead className='thead-light'>
                                                                <tr>
                                                                    <th scope='col'>SL</th>
                                                                    <th scope='col'>Supplier</th>

                                                                    <th scope='col'>Contact</th>
                                                                    <th scope='col'>Expense</th>
                                                                    <th scope='col'>Deposit</th>
                                                                    <th scope='col'>Balance</th>
                                                                    <th scope='col'>Action</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    supplierList &&
                                                                    supplierList.map((supplier, index) => (
                                                                        <tr key={index}>
                                                                            <td className="text-center">
                                                                                {pigantionMeta.from
                                                                                    ? index + pigantionMeta.from
                                                                                    : ''}
                                                                            </td>
                                                                            <td>
                                                                                {supplier.name}
                                                                            </td>
                                                                            <td className="text-center">{supplier.mobile}</td>
                                                                            <td className="text-right">{supplier.debit ?? 0}</td>
                                                                            <td className="text-right">{supplier.credit ?? 0}</td>
                                                                            <td className="text-right">{supplier.balance ?? 0}</td>
                                                                            <td className='text-center'>
                                                                                <div
                                                                                    className='dropdown action-btn-group'>
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
                                                                                        <Link legacyBehavior
                                                                                            href={`accounts-purchase/history/${supplier.id}`}>
                                                                                            <a className='dropdown-item'>
                                                                                                <i className="fas fa-history text-success"></i> History
                                                                                            </a>
                                                                                        </Link>

                                                                                        <a
                                                                                            className='dropdown-item'
                                                                                            href='#'
                                                                                            onClick={(event) => {
                                                                                                event.preventDefault()
                                                                                                setSupplier(supplier);
                                                                                                // props.addSupplier(supplier);
                                                                                                // props.resetSupplierData();
                                                                                            }}
                                                                                            data-toggle="modal"
                                                                                            data-target="#add_supplier_modal"
                                                                                        >
                                                                                            <i className="fas fa-money-check-alt text-warning"></i>
                                                                                            {' '}
                                                                                            Make Payment
                                                                                        </a>
                                                                                        {/*<button*/}
                                                                                        {/*    onClick={() => {*/}
                                                                                        {/*        setSupplierId('')*/}
                                                                                        {/*        props.resetSupplierData();*/}
                                                                                        {/*    }}*/}
                                                                                        {/*    className="input-group-text"*/}
                                                                                        {/*    data-toggle="modal"*/}
                                                                                        {/*    data-target="#add_supplier_modal"*/}
                                                                                        {/*    type="button">*/}
                                                                                        {/*    <i className="icon-plus-square-regular"/>*/}
                                                                                        {/*    Make Payment*/}
                                                                                        {/*</button>*/}


                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                }


                                                                {/*supplierList &&
                                                    supplierList.map((head, index) => (
                                                        <tr key={head.add}>
                                                            <td scope='row'>
                                                                {pigantionMeta.from ? index + pigantionMeta.from : ''}
                                                            </td>
                                                            <td className='nowrap'>
                                                                <Link
                                                                    href={`accounts-bank/view/${head.add}`}>{head.name ?? ''}</Link>
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
                                                                        <Link href={`unit/edit/?add=${head.add}`}>
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
                                                                                // deleteUnit(head.add)
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
                                                                                // publidhUnpublishUnit(head.add)
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
                                                        {pigantionMeta && (
                                                            <nav
                                                                aria-label='Page navigation example'
                                                                className='d-flex justify-content-center'
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
                                            </> : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PaymentModal supplier={supplier} suppliers={updateItem} msg={returnMessage}/>
            </section>


        </>
    );
}

export default AccountsPurchaseSupplierList;