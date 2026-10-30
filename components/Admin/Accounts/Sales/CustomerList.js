import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import ReactPaginate from "react-paginate";

const AccountsSalesCustomerList = () => {

    const initialFormState = {
        "filter_customer": 0,
        "filter_form_date": new Date().toISOString().slice(0, 10),
        "filted_end_date": new Date().toISOString().slice(0, 10),

        "action_for": "customers",
        "filterLedger": "all",
        "page": 1,
        "show": 10,
    };

    const [filted, setFilter] = useState(initialFormState);

    const [customersList, setCustomersList] = useState('')
    const [paginationMeta, setPaginationMeta] = useState('');
    const [customerLedgers, setCustomerLedgers] = useState([]);

    const getLedgers = async () => {
        try {
            const url = `${process.env.api_backend_url}/accounts/sales/get-ledgers`;
            const accountsData = await axios.post(url, filted)
                .then((res) => {
                    setCustomerLedgers(res.data.data.data);
                    setPaginationMeta(res.data.data.meta);
                });
        } catch (error) {
        }
    }

    const getAllCustomers = async () => {
        axios.get(`${process.env.api_backend_url}/accounts/sales/customer-list`)
            .then((response) => {
                setCustomersList(response.data.data);
            });
    }

    const handlePageChange = (pageNumber) => {
        let selected = parseInt(pageNumber.selected + 1);
        setFilter({
            ...filted,
            "page": selected,
        })
    }

    useEffect(() => {
        getAllCustomers();
    }, [])

    useEffect(() => {
        getLedgers();
    }, [filted])

    const changeFiltered = (event) => {
        const { name, value } = event.target
        setFilter({ ...filted, [name]: value })
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
                                        <h2>Account's Of Customer</h2>
                                    </div>
                                </div>
                                <div className='custom-card-box-content'>
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-sm-12">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group pt-1">
                                                        <label htmlFor="name">
                                                            Customer
                                                            <span className="text-danger"> * </span>
                                                        </label>

                                                        <select className="form-control"
                                                            id="filter_customer"
                                                            name="filter_customer"
                                                            value={filted.filter_customer ?? ''}
                                                            onChange={(e) => {
                                                                changeFiltered(e)
                                                            }}
                                                            required
                                                        >
                                                            <option value="0">Select All Customers</option>
                                                            {
                                                                customersList && customersList.map((customer, index) => (
                                                                    <option key={index} value={customer.id}>{customer.name}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-7 col-sm-12">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="col-form-label">
                                                            From Date
                                                            <span className="text-danger"> * </span>
                                                        </label>

                                                        <input
                                                            type="date"
                                                            className={`form-control`}
                                                            autoComplete="off"
                                                            id="filter_form_date"
                                                            name="filter_form_date"
                                                            value={filted.filter_form_date ? filted.filter_form_date : new Date().toISOString().slice(0, 10)}
                                                            onChange={(e) => {
                                                                changeFiltered(e);
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="col-form-label">
                                                            To Date
                                                            <span className="text-danger"> * </span>
                                                        </label>

                                                        <input
                                                            type="date"
                                                            className={`form-control`}
                                                            autoComplete="off"
                                                            id="filted_end_date"
                                                            name="filted_end_date"
                                                            value={filted.filted_end_date ? filted.filted_end_date : new Date().toISOString().slice(0, 10)}
                                                            onChange={(e) => {
                                                                changeFiltered(e);
                                                            }}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-md-2 col-sm-12'>
                                            <div className='form-group showing-table-row'>
                                                <label className="col-form-label">Show</label>
                                                <select
                                                    name="show"
                                                    id="show"
                                                    className='custom-select rounded-0'
                                                    value={filted.show}
                                                    onChange={(event) => {
                                                        changeFiltered(event);
                                                    }}
                                                >
                                                    <option value='10'>10</option>
                                                    <option value='25'>25</option>
                                                    <option value='50'>50</option>
                                                    <option value='100'>100</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        customersList ?
                                            <>
                                                {/* <div className='row table-top-option mb-3'>
                                                    <div className='col-sm-6'>
                                                        <div className='showing-table-row'>
                                                            <label className=''>Show</label>
                                                            <select
                                                                name="show"
                                                                id="show"
                                                                className='custom-select'
                                                                value={filted.show}
                                                                onChange={(event) => {
                                                                    changeFiltered(event);
                                                                }}
                                                            >
                                                                <option value='10'>10</option>
                                                                <option value='25'>25</option>
                                                                <option value='50'>50</option>
                                                                <option value='100'>100</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className='row'>
                                                    <div className='col-lg-12'>
                                                        <div className='table-responsive custom-table'>
                                                            <table
                                                                className='table table-bordered table-hover table-striped'>
                                                                <thead className='thead-light'>
                                                                    <tr>
                                                                        <th scope='col'>SL</th>
                                                                        <th scope='col'>Customer</th>
                                                                        <th scope='col'>Contact</th>
                                                                        <th scope='col'>Debit</th>
                                                                        <th scope='col'>Credit</th>
                                                                        <th scope='col'>Balance</th>
                                                                        <th scope='col'>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        customerLedgers &&
                                                                        customerLedgers.map((ledger, index) => (
                                                                            <tr key={index}>
                                                                                <td className="text-center">{index + 1}</td>
                                                                                <td className="text-center"> {ledger.name} </td>
                                                                                <td className="text-center"> {ledger.mobile} </td>
                                                                                <td className="text-center"> {ledger.debit} </td>
                                                                                <td className="text-center"> {ledger.credit} </td>
                                                                                <td className="text-center"> {ledger.balance} </td>
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
                                                                                                href={`accounts-sales/history/${ledger.id}`}>
                                                                                                <a className='dropdown-item'>
                                                                                                    <i className="fas fa-history text-success"></i> History
                                                                                                </a>
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-12'>
                                                        <nav
                                                            aria-label='Page navigation example'
                                                            className='d-flex justify-content-center'
                                                        >
                                                            <ReactPaginate
                                                                previousLabel={'prev'}
                                                                nextLabel={'next'}
                                                                breakLabel={'...'}
                                                                pageCount={paginationMeta?.last_page}
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
                                                    </div>
                                                </div>
                                            </> : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AccountsSalesCustomerList;
