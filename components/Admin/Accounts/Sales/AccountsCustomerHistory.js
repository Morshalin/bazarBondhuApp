import React, { useEffect, useState } from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactPaginate from 'react-paginate'
import { options } from "../../../../Helpers/Utils/Utils";
import Loader from 'react-loader'

const AccountsCustomerHistory = (props) => {

    const router = new useRouter();

    const { asPath, route, query } = useRouter();

    const [customer, setCustomer] = useState({})
    const [balance, setBalance] = useState(0)
    const [customerHistoryList, setCustomerHistoryList] = useState([])
    const [customerHistoryPerPage, setCustomerHistoryPerPage] = useState(10)
    const [paginationMeta, setPaginationMeta] = useState('');
    const [searchingKeyword, setSearchingKeyWord] = useState('');
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [isLoaded, setLoaded] = useState(false);
    const [balanceSummary, setBalanceSummary] = useState({
        balance: 0,
        totalSales: 0,
        totalPaid: 0
    });


    const [successMessage, setSuccessMessage] = useState({
        status: false,
        message: '',
    })

    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: '',
    })

    const debouncedSearch = useDebounce(searchingKeyword, 1000)

    const [searchingFlag, setSearchingFlag] = useState(false)

    const getCustomerHistoryList = async (pageNumber = 1, showingNumber = 10) => {
        setCustomerHistoryPerPage(showingNumber)
        setCurrentPageNumber(pageNumber)

        try {
            //const accountsApiUrl = `${process.env.api_backend_url}/accounts/sales-history/${query.id}?page=${pageNumber}&show=${showingNumber}&searchKeyword=${searchingKeyword}`;
            const accountsApiUrl = `${process.env.api_backend_url}/accounts/sales-history/`;

            const data = {
                sale_id: query.id,
            }

            const accountsData = await axios.post(accountsApiUrl, data)
                .then((res) => {
                    setLoaded(true);
                    setCustomer(res.data.customerInfo);
                    setBalanceSummary(res.data.balanceSummary);
                    setCustomerHistoryList(res.data.salesHistory);
                })
        } catch (error) {
            setCustomerHistoryList('');
            setPaginationMeta('');
            setBalance(0);
            setCustomerHistoryList([]);
        }
    }

    useEffect(() => {
        query.id && getCustomerHistoryList()
    }, [query.id])


    const handlePageChange = (pageNumber) => {
        const selected = parseInt(pageNumber.selected + 1)
        getCustomerHistoryList(selected, customerHistoryPerPage)
    }

    const handleCustomerHistoryShowPerPage = (event) => {
        setPaginationMeta('')
        setCurrentPageNumber('')
        getCustomerHistoryList(null, event.target.value)
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
                                        <h2>Customer's Accounts History</h2>
                                        <div className="fbh-btn" onClick={() => { router.back() }}>
                                            <i className="icon-list2 text-primary" />
                                        </div>
                                    </div>
                                </div>
                                <div className='custom-card-box-content'>
                                    <Loader loaded={isLoaded} options={options} className='spinner'>
                                        <div className="row mb-4">
                                            <div className="offset-md-3 col-md-6">
                                                <div className='table-responsive custom-table'>
                                                    <table
                                                        className='table table-bordered table-hover table-striped table-sm'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th scope='col' colSpan="2">Customer's Info</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope='col'>Name</th>
                                                                <td scope='col'>{customer?.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope='col'>Address</th>
                                                                <td scope='col'>{customer?.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope='col'>Mobile Number</th>
                                                                <td scope='col'>{customer?.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope='col'>Email Address</th>
                                                                <td scope='col'>{customer?.email}</td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row table-top-option mb-3'>
                                            <div className='col-sm-2'>
                                                <div className='showing-table-row'>
                                                    <label className=''>Show</label>
                                                    <select
                                                        className='custom-select'
                                                        defaultValue={`10`}
                                                        onChange={handleCustomerHistoryShowPerPage}
                                                    >
                                                        <option value='10'>10</option>
                                                        <option value='25'>25</option>
                                                        <option value='50'>50</option>
                                                        <option value='100'>100</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-sm-7 row align-middle'>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td scope='col'>
                                                                Total Sales <span className="text-danger">
                                                                    <i className="fas fa-arrow-up"></i> {balanceSummary?.totalSales}</span>
                                                            </td>
                                                            <td scope='col'>
                                                                Total Paid <span className="text-success"><i
                                                                    className="fas fa-arrow-down"></i> {balanceSummary?.totalPaid}</span>
                                                            </td>
                                                            <td scope='col'>
                                                                Balance <span className="text-primary">
                                                                    BDT {balanceSummary?.balance}</span>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </div>
                                            <div className='col-sm-3'>
                                                <div className='table-search'>
                                                    <label className=''>Search</label>
                                                    <input
                                                        type='text'
                                                        className='form-control'
                                                        placeholder='search'
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
                                                                <th scope='col'>Date</th>
                                                                <th scope='col'>Reference</th>
                                                                <th scope='col'>Particulars</th>
                                                                <th scope='col'>Debit</th>
                                                                <th scope='col'>Credit</th>
                                                                <th scope='col'>Balance</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                customerHistoryList &&
                                                                customerHistoryList.map((history, index) => (
                                                                    <tr key={index}>
                                                                        <td className="text-center">{history?.date}</td>
                                                                        <td className="text-center">{history?.reference}</td>
                                                                        <td className="text-center">{history?.particulars}</td>
                                                                        <td className="text-right">{history?.debit}</td>
                                                                        <td className="text-right">{history?.credit}</td>
                                                                        <td className="text-right">{history?.balance}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className='col-lg-12'>
                                                {paginationMeta && (
                                                    <nav
                                                        aria-label='Page navigation example'
                                                        className='d-flex justify-content-center'
                                                    >
                                                        <ReactPaginate
                                                            previousLabel={'prev'}
                                                            nextLabel={'next'}
                                                            breakLabel={'...'}
                                                            pageCount={paginationMeta.last_page}
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
                                    </Loader>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
export default AccountsCustomerHistory;