import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Select from "react-select";
import Loader from "react-loader";
import { options } from "../../../../Helpers/Utils/Utils";

const Ledger = () => {
  const initialFormState = {
    filter_customer: null,
    filter_form_date: new Date().toISOString().slice(0, 10),
    filted_end_date: new Date().toISOString().slice(0, 10),

    action_for: "customers",
    page: 1,
    show: 10,
  };
  const [filted, setFilter] = useState(initialFormState);

  const [pageNo, setPageNo] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [customerLedgers, setCustomerLedgers] = useState([]);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [balanceSummary, setBalanceSummary] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [errors, setErrors] = useState(null);


  const selectedUserRef = useRef();

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const getLedgers = async () => {
    filted.filter_customer && setIsLoaded(false);
    try {
      const url = `${process.env.api_backend_url}/accounts/sales/get-ledgers`;
      const accountsData = filted.filter_customer && await axios.post(url, filted).then((res) => {
        setErrors(res.data.errors);
        setCustomerLedgers(res.data.data);
        setPersonalDetails(res.data.userInfo);
        setPaginationMeta(res.data.meta);
        setBalanceSummary(res.data.balanceSummary);
        setIsLoaded(true);
      });
    } catch (errors) {
      setIsLoaded(true);
    }
  };

  const handlePageChange = (pageNumber) => {
    let selected = parseInt(pageNumber.selected + 1);
    setPageNo(pageNumber.selected);
    setFilter({
      ...filted,
      page: selected,
    });
  };

  const changeFiltered = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filted, [name]: value });
  };

  let [users, setUsers] = useState({
    "": "",
  });

  const updateUser = (key, data) => {
    setUsers((users) => {
      return {
        ...users,
        [key]: data,
      };
    });
  };

  const resetPageNumber = () => {
    setFilter((filted) => {
      return {
        ...filted,
        page: 1,
      }
    });
  };

  const getList = () => {
    const userType = filted.action_for;
    if (userType == "users") {
      axios
        .get(
          `${process.env.api_backend_url}/accounts/sales/user-list/?keyword=${filted.keyword}`
        )
        .then((response) => {
          updateUser("users", response.data.data);
        });
    } else if (userType == "customers")
      axios
        .get(
          `${process.env.api_backend_url}/accounts/sales/customer-list/?keyword=${filted.keyword}`
        )
        .then((response) => {
          updateUser("customers", response.data.data);
        });
    else if (userType == "suppliers")
      axios
        .get(
          `${process.env.api_backend_url}/accounts/sales/supplier-list/?keyword=${filted.keyword}`
        )
        .then((response) => {
          updateUser("suppliers", response.data.data);
        });
  };

  useEffect(() => {
    resetPageNumber();
  }, [filted.action_for]);

  useEffect(() => {
    if (filted.keyword) {
      const timerId = setTimeout(() => getList(), 500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [filted.keyword]);

  const resetAllState = () => {
    setFilter((filted) => {
      return {
        ...filted,
        filter_customer: null,
      };
    });
    setPersonalDetails(null);
    setCustomerLedgers(null);
    setBalanceSummary(null);
  };

  useEffect(() => {
    resetAllState();
    selectedUserRef.current?.clearValue();
  }, [filted.action_for]);

  useEffect(() => {
    getLedgers();
  }, [filted.page])

  useEffect(() => {
    resetPageNumber();
    getLedgers();
  }, [filted.show])


  return (
    <>
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2> লেজারবুক </h2>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <div className="row mb-4 no-gutters justify-content-around align-content-center">
                    <div className="col-md-3 px-2">
                      <div className="form-group">
                        <label htmlFor="action_for" className="col-form-label">
                          লেজারের ধরণ
                          <span className="text-danger"> * </span>
                        </label>
                        <select
                          className={`form-control ${errors?.action_for ? `is-invalid` : ``
                            }`}
                          id="action_for"
                          name="action_for"
                          value={filted.action_for}
                          onChange={(event) => {
                            changeFiltered(event);
                          }}
                          required
                        >
                          <option value="customers"> কাস্টমার </option>
                          <option value="suppliers"> সাপ্লায়ার </option>
                          <option value="users"> মালিক পক্ষ </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-3  px-2">
                      <div className="form-group">
                        <label htmlFor="user_search" className="col-form-label">
                          হিসাবের নাম
                          <span className="text-danger"> * </span>
                        </label>
                        <Select
                          id="user_search"
                          ref={selectedUserRef}
                          onInputChange={(selectedOption) => {
                            setFilter((filted) => {
                              return {
                                ...filted,
                                keyword: selectedOption,
                              };
                            });
                          }}
                          onChange={(selectedOption) => {
                            setFilter((filted) => {
                              return {
                                ...filted,
                                filter_customer: selectedOption?.id,
                              };
                            });
                          }}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.id}
                          options={users[filted.action_for]}
                          autoFocus={true}
                          isClearable={true}
                          placeholder={"Search here"}
                          required={true}
                        />
                        <div
                          className={
                            errors?.filter_customer[0] ? `invalid-feedback` : ``
                          }
                        >
                          {errors?.filter_customer[0]}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-2 px-2">
                      <div className="form-group">
                        <label
                          htmlFor="filter_form_date"
                          className="col-form-label"
                        >
                          শুরু
                          <span className="text-danger"> * </span>
                        </label>

                        <input
                          className={` form-control ${errors?.filter_form_date ? `is-invalid` : ``
                            }`}
                          type="date"
                          autoComplete="off"
                          id="filter_form_date"
                          name="filter_form_date"
                          value={
                            filted.filter_form_date
                              ? filted.filter_form_date
                              : new Date().toISOString().slice(0, 10)
                          }
                          onChange={(e) => {
                            changeFiltered(e);
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-2 px-2">
                      <div className="form-group">
                        <label
                          htmlFor="filted_end_date"
                          className=" col-form-label"
                        >
                          শেষ
                          <span className="text-danger"> * </span>
                        </label>

                        <input
                          type="date"
                          className={`form-control`}
                          autoComplete="off"
                          id="filted_end_date"
                          name="filted_end_date"
                          value={
                            filted.filted_end_date
                              ? filted.filted_end_date
                              : new Date().toISOString().slice(0, 10)
                          }
                          onChange={(e) => {
                            changeFiltered(e);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-2 px-2 text-center">
                      <div className="mt-md-3">
                        <button
                          className="btn btn-primary btn-sm mt-md-4"
                          disabled={!filted.filter_customer}
                          onClick={() => getLedgers()}
                        >
                          অনুসন্ধান
                        </button>
                      </div>
                    </div>
                  </div>

                  {personalDetails && (
                    <>
                      <div className="row mb-4 justify-content-center">
                        <div className="col-md-12">
                          <div className="table-responsive custom-table">
                            <table className="table table-sm table-bordered">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">নাম</th>
                                  <th scope="col">মোবাইল</th>
                                  <th scope="col">ইমেইল</th>
                                  <th scope="col">ঠিকানা</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td scope="col" className="text-center">
                                    {personalDetails?.name}
                                  </td>
                                  <td scope="col" className="text-center">
                                    {personalDetails?.phone}
                                  </td>
                                  <td scope="col" className="text-center">
                                    {personalDetails?.email}
                                  </td>
                                  <td scope="col" className="text-center">
                                    {personalDetails?.address}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="w-100">
                          <tbody>
                            <tr>
                              <td scope="col" className="text-center">
                                <div className="form-group mb-0">
                                  <label className="mr-md-2">সংখ্যা </label>
                                  <select
                                    className="custom-select w-50"
                                    id="show"
                                    name="show"
                                    value={filted.show}
                                    onChange={(event) => {
                                      changeFiltered(event);
                                    }}
                                  >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                  </select>
                                </div>
                              </td>
                              <td scope="col" className="text-center">
                                <span className="d-block">পূর্বের জের</span>

                                <span className="text-danger d-block">
                                  {`৳${balanceSummary?.previousBalance?.toFixed(2) ?? "0.00"
                                    }`}
                                </span>
                              </td>
                              <td scope="col" className="text-center">
                                <span className="d-block">
                                  মোট খরচ(Dr.)
                                  <span className="text-danger pl-2">
                                    <i className="fas fa-arrow-up"></i>
                                  </span>
                                </span>

                                <span className="text-danger d-block">
                                  {`৳${balanceSummary?.totalSales?.toFixed(2) ??
                                    "0.00"
                                    }`}
                                </span>
                              </td>
                              <td scope="col" className="text-center">
                                <span className="d-block">
                                  মোট জমা(Cr.)
                                  <span className="text-success pl-2">
                                    <i className="fas fa-arrow-down"></i>
                                  </span>
                                </span>
                                <span className="text-success d-block">
                                  {`৳${balanceSummary?.totalPaid?.toFixed(2) ??
                                    "0.00"
                                    }`}
                                </span>
                              </td>
                              <td scope="col" className="text-center">
                                <span className="d-block"> ব্যালেন্স</span>

                                <span className="text-primary d-block">
                                  {`৳${balanceSummary?.balance?.toFixed(2) ??
                                    "0.00"
                                    }`}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table">
                        <Loader
                          loaded={isLoaded}
                          options={options}
                          className="spinner"
                        >
                          <table className="table table-bordered margin-top-0">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col"> # </th>
                                <th scope="col"> তারিখ ও সময় </th>
                                <th scope="col"> ভাউচার নং </th>
                                <th scope="col"> বিবরণ </th>
                                <th scope="col"> খরচ(Dr.) </th>
                                <th scope="col"> জমা(Cr.) </th>
                                <th scope="col"> ব্যালেন্স </th>
                              </tr>
                            </thead>
                            <tbody>
                              {customerLedgers &&
                                customerLedgers.map((ledger, index) => (
                                  <tr key={index}>
                                    <td className="text-center">{paginationMeta.from + index}</td>
                                    <td className="text-center">
                                      {ledger?.time}
                                    </td>
                                    <td className="text-">
                                      {ledger?.reference}
                                    </td>
                                    <td className="text-center">
                                      {ledger?.particulars?.map((data, index) => (
                                        <React.Fragment key={index}>
                                          &#x2611; {data.particular} ৳
                                          {data.amount}
                                          <br />
                                        </React.Fragment>
                                      ))}
                                    </td>
                                    <td className="text-center">
                                      {" "}
                                      {ledger?.debit?.toFixed(2)}{" "}
                                    </td>
                                    <td className="text-center">
                                      {" "}
                                      {ledger?.credit?.toFixed(2)}{" "}
                                    </td>
                                    <td className="text-center">
                                      {" "}
                                      {ledger?.balance?.toFixed(2)}{" "}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </Loader>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <nav
                        aria-label="Page navigation example"
                        className="d-flex justify-content-center"
                      >
                        {paginationMeta && (
                          <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            pageCount={paginationMeta?.last_page}
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
                        )}
                      </nav>
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
};

export default Ledger;
