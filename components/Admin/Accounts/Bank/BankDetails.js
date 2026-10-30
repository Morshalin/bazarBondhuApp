import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Loader from 'react-loader';
import { options } from "../../../../Helpers/Utils/Utils";

const BankDetails = () => {

    const { query } = useRouter();
    const [history, setHistory] = useState([]);
    const [show, setShow] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [paginationMeta, setPaginationMeta] = useState({});
    const [orderByDesc, setOrderByDesc] = useState(true);
    const [balance, setBalance] = useState(0.00);
    const [isLoaded, setIsLoaded] = useState(false);

    const getHistory = async () => {
        await axios.get(`backend/accounts/banks/transfer?fromId=${query.id}&show=${show}&page=${pageNumber}&orderBy=${orderByDesc ? 'desc' : 'asc'}`)
            .then((response) => {
                setHistory(response.data.data.data);
                setBalance(Number(response.data.data.balance).toFixed(2))
                setPaginationMeta(response.data.data.meta);
                setIsLoaded(true);
            })
    }

    const [selectedUser, setSelectedUser] = useState({
        value: "",
        label: "",
    });



    useEffect(() => {
        getHistory();
        console.log(query)
    }, [])

    useEffect(() => {
        getHistory();
        console.log(orderByDesc)

    }, [show, pageNumber, orderByDesc])

    useEffect(() => {
        setPageNumber(1)
    }, [show])
    const [successMessage, setSuccessMessage] = useState({
        status: false,
        message: '',
    })

    const [errorMessage, setErrorMessage] = useState({
        status: false,
        message: '',
    })


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
                                    <div className="fbh-title">
                                        <h2>Single Account Details<small><br />Current Balance {balance}</small></h2>
                                        <Link legacyBehavior href="../">
                                            <a className="fbh-btn" title="Accounts History">
                                                <i className="icon-list2" />
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className='custom-card-box-content'>
                                    <div className='row table-top-option mb-3'>
                                        <div className='col-sm-6 pb-3'>
                                            <div className='showing-table-row'>
                                                <label className=''>Show</label>
                                                <select
                                                    className='custom-select'
                                                    defaultValue={`10`}
                                                    onChange={(event) => {
                                                        setShow(event.target.value);
                                                        setIsLoaded(false);
                                                    }}
                                                >
                                                    <option value='10'>10</option>
                                                    <option value='25'>25</option>
                                                    <option value='50'>50</option>
                                                    <option value='100'>100</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-sm-6 pb-3'>
                                            <div className='table-search'>
                                                <label className=''>Search</label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='search unit name'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-lg-12'>
                                            <div className='table-responsive custom-table'>
                                                <Loader loaded={isLoaded}
                                                    options={options}
                                                    className='spinner'>
                                                    <table className='table table-bordered table-hover'>
                                                        <thead className='thead-light'>
                                                            <tr>
                                                                <th scope='col'
                                                                    onClick={() => setOrderByDesc((orderBy) => !orderBy)}>
                                                                    {
                                                                        orderByDesc ?
                                                                            <i className="icon-long-arrow-alt-down-solid mr-1 text-primary" />
                                                                            :

                                                                            <i className="icon-long-arrow-alt-up-solid mr-1 text-primary" />
                                                                    }
                                                                    #
                                                                </th>
                                                                <th scope='col'> তারিখ ও সময় </th>
                                                                <th scope='col'>From</th>
                                                                <th scope='col'>To</th>
                                                                <th scope='col'> (Dr.)</th>
                                                                <th scope='col'> (Cr.) </th>
                                                                <th scope='col'>ব্যালেন্স</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                history &&
                                                                history.map((his, index) => (
                                                                    < tr key={index}>
                                                                        <td className="text-center">{paginationMeta?.from + index}</td>
                                                                        <td className="text-center">{his?.dateTime}</td>
                                                                        <td className="text-center">{his?.from}</td>
                                                                        <td className="text-center">{his?.to}</td>
                                                                        <td className="text-center"> {Number(his?.debit).toFixed(2)} </td>
                                                                        <td className="text-center"> {Number(his?.credit).toFixed(2)} </td>
                                                                        <td className="text-center"> {Number(his?.balance).toFixed(2)} </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </Loader>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            {
                                                paginationMeta && (
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
                                                            onPageChange={(pageNumber) => {
                                                                setPageNumber(parseInt(pageNumber.selected + 1))
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
                                                )
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default BankDetails;
