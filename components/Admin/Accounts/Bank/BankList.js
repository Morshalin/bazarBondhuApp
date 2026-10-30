import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import TransferModal from "./TransferModal";

const BankList = () => {
  const [accounts, setAccountsList] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [accountPerPage, setAccountPerPage] = useState("10");
  const [pigantionMeta, setPigantionMeta] = useState("");
  const [searchingKeyWord, setSearchingKeyWord] = useState("");
  const [currenetPageNamuber, setCurrenetPageNamuber] = useState("");
  const [fromAccount, setFromAccount] = useState({
    id: "",
    name: "",
  });

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
      getAccountsList("", accountPerPage);
    }
    if (searchingFlag) {
      setSearchingFlag(false);
      setPigantionMeta("");
      getAccountsList("", accountPerPage);
    }
  }, [debouncedSearch]);

  const getAccountsList = async (pageNumber, showingNumber) => {
    showingNumber && setAccountPerPage(showingNumber);
    pageNumber && setCurrenetPageNamuber(pageNumber);
    try {
      const acountsApiUrl = pageNumber
        ? `${
            process.env.api_backend_url
          }/accounts/banks/getAllAccount?page=${pageNumber}&show=${showingNumber}${
            searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
          }`
        : `${process.env.api_backend_url}/accounts/banks/getAllAccount?show=${
            showingNumber ?? "10"
          }${searchingKeyWord && `&searchKeyword=${searchingKeyWord}`}`;
      const accountssData = await axios.get(acountsApiUrl);
      setAccountsList(accountssData.data.data.data);
      setPigantionMeta(accountssData.data.data.meta);
      let sum =
        accountssData.data.data.data.length &&
        accountssData.data.data.data.reduce(
          (sum, account) => sum + parseFloat(account.current_balance),
          0
        );
      setTotalBalance(sum);
    } catch (error) {
      setAccountsList("");
      setPigantionMeta("");
    }
  };

  useEffect(() => {
    getAccountsList();
  }, []);

  const handlePageChange = (pageNumber) => {
    const selected = parseInt(pageNumber.selected + 1);
    getAccountsList(selected, accountPerPage);
  };

  const handleAccountShowPerPage = (event) => {
    setPigantionMeta("");
    setCurrenetPageNamuber("");
    getAccountsList(null, event.target.value);
  };

  const handaleSearch = (event) => {
    event.preventDefault();

    if (event.target.value.length === 0) {
      setSearchingFlag(true);
    }
    setSearchingKeyWord(event.target.value);
  };

  const setAsDefault = (account_id) => {
    axios
      .get(`backend/accounts/banks/bank-default-status/${account_id}`)
      .then((resp) => {
        getAccountsList();
        console.log(resp);
      });
  };

  const publishUnpublish = (account_id) => {
    axios
      .get(`backend/accounts/banks/bank-active-status/${account_id}`)
      .then((resp) => {
        getAccountsList();
        console.log(resp);
      });
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
                    <h2>Account List</h2>
                    <Link legacyBehavior href={`/admin/accounts/bank-accounts/add`}>
                      <a className="fbh-btn" title="Add Bank Account">
                        <i className="icon-plus-square-regular" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <div className="row table-top-option mb-3">
                    <div className="col-sm-6">
                      <div className="showing-table-row">
                        <label className="">Show</label>
                        <select
                          className="custom-select"
                          defaultValue={`10`}
                          onChange={handleAccountShowPerPage}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="table-search">
                        <label className="">Search</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Account name"
                          onChange={handaleSearch}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table mb-4">
                        <table className="table table-bordered table-hover mb-4">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">SL</th>
                              <th scope="col">Account Name</th>
                              <th scope="col">Details</th>
                              <th scope="col">Status</th>
                              <th scope="col">Current Balance</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accounts &&
                              accounts.map((account, index) => (
                                <tr key={account.id}>
                                  <td scope="row">
                                    {pigantionMeta.from
                                      ? index + pigantionMeta.from
                                      : ""}
                                  </td>
                                  <td className="nowrap">
                                    {account.name ?? ""}
                                  </td>
                                  <td className="nowrap">
                                    {account.description ?? ""}
                                  </td>
                                  <td className="nowrap">
                                    {account.active ? (
                                      <>
                                        <span className="badge badge-success">
                                          Active
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="badge badge-danger">
                                          Inactive
                                        </span>
                                      </>
                                    )}
                                    {account.default && (
                                      <>
                                        <span className="badge badge-primary ml-2">
                                          Cash Drawer
                                        </span>
                                      </>
                                    )}
                                  </td>
                                  <td className="nowrap text-right">
                                    ৳
                                    {(account.current_balance
                                      ? parseFloat(account.current_balance)
                                      : 0
                                    ).toFixed(2)}
                                  </td>

                                  {/*<td className='text-center'>*/}
                                  {/*	<i*/}
                                  {/*		className={*/}
                                  {/*			account.status === 'Active'*/}
                                  {/*				? `icon icon-check-circle-solid text-success`*/}
                                  {/*				: `icon icon-check-circle-solid text-danger`*/}
                                  {/*		}*/}
                                  {/*	/>*/}
                                  {/*</td>*/}
                                  <td className="text-center">
                                    <div className="dropdown action-btn-group">
                                      <button
                                        className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Actions
                                      </button>
                                      <div className="dropdown-menu">
                                        <Link legacyBehavior
                                          href={`bank-accounts/view/${account.id}`}
                                        >
                                          <a className="dropdown-item">
                                            <i className="fas fa-eye text-success"></i>{" "}
                                            View
                                          </a>
                                        </Link>
                                        {account.system_defined === false && (
                                          <>
                                            <Link legacyBehavior
                                              href={`bank-accounts/edit/${account.id}`}
                                            >
                                              <a className="dropdown-item">
                                                <i className="icon-pencil-alt text-primary" />{" "}
                                                Edit
                                              </a>
                                            </Link>
                                          </>
                                        )}

                                        <div className="dropdown-divider" />

                                        {account.default == false && (
                                          <>
                                            {account.system_defined ===
                                              false && (
                                              <>
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  onClick={(event) => {
                                                    event.preventDefault();
                                                    publishUnpublish(
                                                      account.id
                                                    );
                                                  }}
                                                >
                                                  <i
                                                    className={`icon-sphere ${
                                                      account.active === true
                                                        ? "text-danger"
                                                        : "text-success"
                                                    }`}
                                                  />
                                                  {account.active === true
                                                    ? "Inactive"
                                                    : "Active"}
                                                </a>
                                              </>
                                            )}

                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              onClick={(event) => {
                                                event.preventDefault();
                                                setAsDefault(account.id);
                                              }}
                                            >
                                              <i
                                                className={`icon-sphere text-success'}`}
                                              />
                                              Set as Cash Drawer
                                            </a>
                                          </>
                                        )}
                                        <a
                                          className="dropdown-item"
                                          data-toggle="modal"
                                          href="#"
                                          data-target="#transferModal"
                                          data-whatever="@getbootstrap"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            setFromAccount({
                                              id: account.id,
                                              name: account.name,
                                            });
                                          }}
                                        >
                                          <i className="fas fa-paper-plane text-info"></i>{" "}
                                          Transfer
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            <tr>
                              <td colSpan={4} className="nowrap text-right">
                                মোট
                              </td>
                              <td className="nowrap text-right">
                                {totalBalance.toFixed(2)}
                              </td>
                              <td></td>
                            </tr>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TransferModal
        fromAccount={fromAccount}
        accountList={accounts}
        getAccountsList={getAccountsList}
      />
    </>
  );
};

export default BankList;
