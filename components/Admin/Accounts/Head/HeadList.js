import React, { useEffect, useState } from "react";
import useDebounce from "../../Unit/CustomHook/use-debounce";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import Rows from "./Rows";
import {
  deleteAction,
  ERROR,
  getActions,
  options,
  SUCCESS,
} from "../../../../Helpers/Utils/Utils";
import Loader from "react-loader";
import MySuccess from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";
import PaymentModal from "../Purchase/PaymentModal";
import ExpenseModal from "./ExpenseModal";
import CashModal from "./CashModal";

const HeadList = () => {
  const displayNodeName = {
    bottom: "19px",
    right: "-6px",
    paddingTop: "14px",
    borderBottom: "1px solid #adadad",
    position: "relative",
    paddingBottom: "12px",
    borderLeft: "1px solid #adadad",
  };

  const [head, setHead] = useState("");
  const [headsList, setHeadsList] = useState("");
  const [headPerPage, setHeadPerPage] = useState("10");
  const [pigantionMeta, setPigantionMeta] = useState("");
  const [searchingKeyWord, setSearchingKeyWord] = useState("");
  const [currenetPageNamuber, setCurrenetPageNamuber] = useState("");
  const [users, setUsers] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [customers, setCustomers] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const resetSuccessMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      ...errorMessage,
      status: false,
      message: "",
    });
  };

  const debouncedSearch = useDebounce(searchingKeyWord, 1000);

  const [searchingFlag, setSearchingFlag] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchingFlag(false);
      setPigantionMeta("");
      getHeadsList("", headPerPage);
    }
    if (searchingFlag) {
      setSearchingFlag(false);
      setPigantionMeta("");
      getHeadsList("", headPerPage);
    }
  }, [debouncedSearch]);

  const getHeadsList = async (pageNumber, showingNumber) => {
    showingNumber && setHeadPerPage(showingNumber);
    pageNumber && setCurrenetPageNamuber(pageNumber);
    try {
      const acountsApiUrl = pageNumber
        ? `${
            process.env.api_backend_url
          }/accounts/heads?page=${pageNumber}&show=${showingNumber}${
            searchingKeyWord && `&searchKeyword=${searchingKeyWord}`
          }`
        : `${process.env.api_backend_url}/accounts/heads?show=${
            showingNumber ?? "10"
          }${searchingKeyWord && `&searchKeyword=${searchingKeyWord}`}`;
      // const d = "http://localhost/laravel/accounts_api/api/auth/datacheck";
      // const accountsData = await axios.get(d)
      //     .then(responce => {
      //         if(responce.success) {
      //             console.log(responce.data)
      //             setHeadsList(responce.data)
      //             setPigantionMeta([])
      //         }
      //     })

      const accountsData = await axios.get(acountsApiUrl);
      console.log(
        "hello",
        !accountsData.data.data.data.length,
        !accountsData.data.data.data
      );
      setHeadsList(accountsData.data.data.data);
      // setHeadsList(accountsData.data.data.data)
      setPigantionMeta(accountsData.data.data.meta);
    } catch (error) {
      setHeadsList("");
      setPigantionMeta("");
    }
  };

  useEffect(() => {
    let mounted = true;
    getHeadsList();
    getActions(`backend/users`, false)
      .then((result) => {
        if (mounted && result.success) {
          setUsers(result.data);
        }
      })
      .finally(() => {
        getActions(`backend/suppliers`, false)
          .then((result) => {
            if (mounted && result.success) {
              setSuppliers(result.data);
            }
          })
          .finally(() => {
            getActions(`backend/get-all-customers`, false)
              .then((result) => {
                if (mounted && result.success) {
                  setCustomers(result.data.data);
                }
              })
              .finally(() => {
                mounted = false;
              });
          });
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    const selected = parseInt(pageNumber.selected + 1);
    getHeadsList(selected, headPerPage);
  };

  const handleHeadShowPerPage = (event) => {
    setPigantionMeta("");
    setCurrenetPageNamuber("");
    getHeadsList(null, event.target.value);
  };

  const handaleSearch = (event) => {
    event.preventDefault();

    if (event.target.value.length === 0) {
      setSearchingFlag(true);
    }
    setSearchingKeyWord(event.target.value);
  };

  const returnMessage = (status, data) => {
    setTimeout(() => {
      if (status == "SUCCESS") {
        setSuccessMessage({
          status: true,
          message: data,
        });
      } else {
        setErrorMessage({
          status: true,
          message: data,
        });
      }
    }, 2000);
  };

  const deletHead = (d_id) => {
    deleteAction(`${process.env.api_backend_url}/accounts/heads/${d_id}`)
      .then((result) => {
        if (result.success) {
          setSuccessMessage({
            ...successMessage,
            status: true,
            message: result.message,
          });
        }
      })
      .finally(() => {
        // getHeadsList();
      });
  };
  const getAndSetHead = ($head) => {
    setHead($head);
  };
  // const returnMessage = (status, data) => {
  //     setTimeout(() => {
  //         if (status == "SUCCESS") {
  //             setSuccessMessage({
  //                 status: true,
  //                 message: data,
  //             })
  //         } else {
  //             setErrorMessage({
  //                 status: true,
  //                 message: data,
  //             })
  //         }
  //     }, 2000);
  // }

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

      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>হিসাবের খাত সমূহ</h2>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <Loader
                    loaded={!!pigantionMeta}
                    options={options}
                    className="spinner"
                  >
                    <div className="row table-top-option mb-3">
                      <div className="col-sm-6">
                        <div className="showing-table-row">
                          <label className="">Show</label>
                          <select
                            className="custom-select"
                            defaultValue={`10`}
                            onChange={handleHeadShowPerPage}
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
                          <label className="">অনুসন্ধান</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="খাত"
                            onChange={handaleSearch}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive custom-table">
                          <table className="table  table-hover ">
                            <thead className="thead-light">
                              <tr>
                                <th width="2%">ক্রমিক নং</th>
                                <th className="border">খাত</th>
                                <th>কোড</th>
                                <th>প্রযোজ্য</th>
                                <th width="25%" className="border">
                                  বিবরণ
                                </th>
                                {/*<th scope='col' className="border">Type</th>*/}
                                {/*  <th>মূল খাত</th> */}
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <Rows
                                heads={headsList}
                                c={-1}
                                deletHead={deletHead}
                                setHead={getAndSetHead}
                              />
                              {/*<tr>*/}
                              {/*    <td></td>*/}
                              {/*    <td>*/}
                              {/*        <i className="far fa-folder-open"></i>&nbsp;*/}
                              {/*        Abc</td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*</tr>*/}

                              {/*<tr>*/}
                              {/*    <td></td>*/}
                              {/*    <td>*/}
                              {/*        <span*/}
                              {/*            style={displayNodeName}> &nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;*/}
                              {/*        <i className="far fa-folder"></i>&nbsp;*/}
                              {/*        Def*/}
                              {/*    </td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*    <td></td>*/}
                              {/*</tr>*/}

                              {/*headsList &&
                                                    headsList.map((head, index) => (
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
                  </Loader>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExpenseModal
          head={head}
          // suppliers={updateItem}
          users={users}
          suppliers={suppliers}
          customers={customers}
          msg={returnMessage}
        />
        <CashModal
          head={head}
          // suppliers={updateItem}
          msg={returnMessage}
        />
      </section>
    </>
  );
};

export default HeadList;
