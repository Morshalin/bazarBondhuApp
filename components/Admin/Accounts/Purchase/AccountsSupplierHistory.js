import React, { useEffect, useState } from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import Loader from "react-loader";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { options } from "../../../../Helpers/Utils/Utils";

const AccountsSupplierHistory = (props) => {
  const { asPath, route, query } = useRouter();

  const [supplier, setSupplier] = useState("");
  const [balance, setBalance] = useState("");
  const [supplierHistoryList, setSupplierHistoryList] = useState("");
  const [supplierHistoryPerPage, setSupplierHistoryPerPage] = useState("10");
  const [pigantionMeta, setPigantionMeta] = useState("");
  const [searchingKeyWord, setSearchingKeyWord] = useState("");
  const [currenetPageNamuber, setCurrenetPageNamuber] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const debouncedSearch = useDebounce(searchingKeyWord, 1000);

  const [searchingFlag, setSearchingFlag] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchingFlag(false);
      setPigantionMeta("");
      getSupplierHistoryList("", supplierHistoryPerPage);
    }
    if (searchingFlag) {
      setSearchingFlag(false);
      setPigantionMeta("");
      getSupplierHistoryList("", supplierHistoryPerPage);
    }
  }, [debouncedSearch]);

  const getSupplierHistoryList = async (pageNumber, showingNumber) => {
    showingNumber && setSupplierHistoryPerPage(showingNumber);
    pageNumber && setCurrenetPageNamuber(pageNumber);
    try {
      const acountsApiUrl = pageNumber
        ? `${process.env.api_backend_url}/accounts/purchase/${
            query.id
          }?page=${pageNumber}&show=${showingNumber}${
            searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
          }`
        : `${process.env.api_backend_url}/accounts/purchase/${query.id}?show=${
            showingNumber ?? "10"
          }${searchingKeyWord && `&searchKeyword=${searchingKeyWord}`}`;
      const accountsData = await axios.get(acountsApiUrl);
      // const accountsData = await axios.get(`${process.env.api_backend_url}/accounts/purchase/history/${add}`)
      console.log(accountsData.data.data.balance);
      setSupplier(accountsData.data.data.supplier);
      setSupplierHistoryList(accountsData.data.data.history.data);
      setPigantionMeta(accountsData.data.data.history.meta);
      setBalance(accountsData.data.data.balance);
    } catch (error) {
      setSupplierHistoryList("");
      setPigantionMeta("");
      setBalance("");
    }
  };

  useEffect(() => {
    getSupplierHistoryList();
  }, [query.id]);

  const handlePageChange = (pageNumber) => {
    const selected = parseInt(pageNumber.selected + 1);
    getSupplierHistoryList(selected, supplierHistoryPerPage);
  };

  const handleSupplierHistoryShowPerPage = (event) => {
    setPigantionMeta("");
    setCurrenetPageNamuber("");
    getSupplierHistoryList(null, event.target.value);
  };

  const handaleSearch = (event) => {
    event.preventDefault();

    if (event.target.value.length === 0) {
      setSearchingFlag(true);
    }
    setSearchingKeyWord(event.target.value);
  };

  return (
    <>
      {successMessage.status && <Success message={successMessage.message} />}

      {errorMessage.status && <Error message={errorMessage.message} />}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>Supplier's Accounts History</h2>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <Loader
                    loaded={!!pigantionMeta}
                    options={options}
                    className="spinner"
                  >
                    <div className="row mb-4">
                      <div className="offset-md-3 col-md-6">
                        <div className="table-responsive custom-table">
                          <table className="table table-bordered table-hover table-striped table-sm">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col" colSpan="2">
                                  Supplier's Info
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="col">Supplier</th>
                                <td scope="col">{supplier.name}</td>
                              </tr>
                              <tr>
                                <th scope="col">Address</th>
                                <td scope="col">{supplier.address}</td>
                              </tr>
                              <tr>
                                <th scope="col">Telephone Number</th>
                                <td scope="col">{supplier.telephone_number}</td>
                              </tr>
                              <tr>
                                <th scope="col">Mobile Number</th>
                                <td scope="col">{supplier.mobile_number}</td>
                              </tr>
                              <tr>
                                <th scope="col">Email Address</th>
                                <td scope="col">{supplier.email}</td>
                              </tr>
                              <tr>
                                <th scope="col">Website</th>
                                <td scope="col">{supplier.web}</td>
                              </tr>
                              <tr>
                                <th scope="col">Contacts Person</th>
                                <td scope="col">
                                  {supplier.contacts
                                    ? supplier.contacts[0].name &&
                                      supplier.contacts[0].mobile
                                      ? `${supplier.contacts[0].name} : ${supplier.contacts[0].mobile}`
                                      : ""
                                    : ""}
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">Current Balance</th>
                                <td scope="col">{supplier.balance ?? ""}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="row table-top-option mb-3">
                      <div className="col-sm-2">
                        <div className="showing-table-row">
                          <label className="">Show</label>
                          <select
                            className="custom-select"
                            defaultValue={`10`}
                            onChange={handleSupplierHistoryShowPerPage}
                          >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-7 row align-middle">
                        <table className="table">
                          <tr>
                            <td scope="col">
                              Total Expense{" "}
                              <span className="text-danger">
                                <i className="fas fa-arrow-down"></i>{" "}
                                {balance.total_purchase}
                              </span>
                            </td>
                            <td scope="col">
                              Total Deposit{" "}
                              <span className="text-success">
                                <i className="fas fa-arrow-up"></i>{" "}
                                {balance.toal_sales}
                              </span>
                            </td>
                            <td scope="col">
                              Balance{" "}
                              <span className="text-primary">
                                <i className="fas fa-dollar-sign"></i>{" "}
                                {balance.total_purchase - balance.toal_sales}
                              </span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-sm-3">
                        <div className="table-search">
                          <label className="">Search</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="search"
                            onChange={handaleSearch}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive custom-table">
                          <table className="table table-bordered table-hover table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Reference</th>
                                <th scope="col">Particulars</th>
                                <th scope="col">Expense</th>
                                <th scope="col">Deposit</th>
                                <th scope="col">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {supplierHistoryList &&
                                supplierHistoryList.map((history, index) => (
                                  <tr key={index}>
                                    <td className="text-center">
                                      {history.transaction_time_date}
                                    </td>
                                    <td>{history.reference}</td>
                                    <td>{history.type}</td>
                                    <td className="text-right">
                                      {history.debit}
                                    </td>
                                    <td className="text-right">
                                      {history.credit}
                                    </td>
                                    <td className="text-right">
                                      {" "}
                                      {history.balance}{" "}
                                    </td>
                                  </tr>
                                ))}

                              {/*supplierHistoryList &&
                                                    supplierHistoryList.map((head, index) => (
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
                      <div className="col-lg-12">
                        {pigantionMeta && (
                          <nav
                            aria-label="Page navigation example"
                            className="d-flex justify-content-center"
                          >
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              pageCount={pigantionMeta.last_page}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              activeClassName={"active"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              breakClassName={"page-item"}
                              breakLinkClassName={"page-link"}
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
};
export default AccountsSupplierHistory;
