import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import CustomerMenuHeader from "./CustomerMenuHeader";

import ReactPlaceholder from "../../../../components/Ui/placeholder/placeholder";

const CustomerMenuList = () => {
  const [show, setShow] = useState(10);
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [menuList, setMenuList] = useState([]);
  let initialMessage = { success: "", error: "" };
  const [message, setMessage] = useState(initialMessage);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, [show, keywords, page, orderBy, column]);

  const loadCustomer = async () => {
    setIsLoading(false);
    let response = await axios
      .get(
        `/backend/get-all-customers?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        return error;
      });
    if (response.success) {
      setMenuList(response.data.data);
      setMeta(response.data.meta);
      setIsLoading(true);
    }
  };

  const deleteCustomer = async (customer_id) => {
    await axios
      .delete(`/backend/users/${customer_id}`)
      .then((result) => {
        if (result.data.success) {
          setMessage({ ...message, success: result.data.message });
          setMenuList(menuList.filter((menu) => menu.id !== customer_id));
          if (!menuList) {
            loadCustomer();
          }
        } else {
          setMessage({ ...message, error: result.data.message });
        }
      })
      .catch((error) => {
        setMessage({ ...message, error: error });
      });
    resetChanges();
  };

  const disableEnable = async (customer_id) => {
    await axios
      .post(`/backend/users/user-active-status/${customer_id}`)
      .then((result) => {
        if (result.data.success) {
          loadCustomer();
          setMessage({ ...message, success: result.data.message });
        } else {
          setMessage({ ...message, error: result.data.message });
        }
      })
      .catch((error) => {
        setMessage({ ...message, error: error });
      });
    resetChanges();
  };

  const resetChanges = () => {
    setTimeout(() => {
      setMessage({ ...message, success: "", error: "" });
    }, 2000);
  };

  return (
    <>
      {message.success && <Success message={message.success} />}
      {message.error && <Error message={message.error} />}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>Customer List</h2>
                    <Link legacyBehavior href={`/admin/customer/add`}>
                      <a className="fbh-btn" title="Add new Customer">
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
                          onChange={(event) => {
                            setPage(1);
                            setMeta("");
                            setShow(+event.target.value);
                          }}
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
                          placeholder="Search..."
                          onChange={(event) => {
                            setTimeout(() => {
                              setMeta("");
                              setKeywords(event.target.value);
                              setPage(1);
                            }, 500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table">
                        <table className="table table-bordered table-hover carsour-pointer">
                          <thead className="thead-light">
                            <CustomerMenuHeader
                              setColumn={setColumn}
                              setOrderBy={setOrderBy}
                              column={column}
                              orderBy={orderBy}
                            />
                          </thead>
                          <tbody id="table">
                            {!isLoading ? (
                              <tr>
                                <td colSpan={6}>
                                  <ReactPlaceholder
                                    showLoadingAnimation={true}
                                    type={"textRow"}
                                    rows={show}
                                    ready={isLoading}
                                    className="my-2"
                                    style={{ height: "24px" }}
                                  />
                                </td>
                              </tr>
                            ) : menuList.length !== 0 ? (
                              menuList.map((menuitem, index) => (
                                <tr key={index} className="text-center">
                                  <td scope="row">
                                    {page * show - show + index + 1}
                                  </td>
                                  <td className="nowrap">
                                    {menuitem.name ?? "-"}
                                  </td>
                                  <td className="nowrap">
                                    {menuitem.phone ?? "-"}
                                  </td>

                                  <td className="nowrap">
                                    {menuitem.wallet_balance ?? "-"}
                                  </td>

                                  <td className="text-center">
                                    <i
                                      className={
                                        menuitem.status === "Active"
                                          ? `fas fa-circle text-success`
                                          : `fas fa-circle text-danger`
                                      }
                                      id={`permission_status_${menuitem.id}`}
                                    />
                                  </td>
                                  {/* <td className="text-center">
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
                                        <Link
                                          href={`customer/edit/${menuitem.id}`}
                                        >
                                          <a className="dropdown-item">
                                            <i className="icon-pencil-alt text-primary" />
                                            Edit
                                          </a>
                                        </Link>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            if (
                                              window.confirm(
                                                "Are you sure you want to delete this customer?"
                                              )
                                            ) {
                                              deleteCustomer(menuitem.id);
                                            }
                                          }}
                                        >
                                          <i className="icon-trash-alt-regular text-danger" />
                                          Delete
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            disableEnable(menuitem.id);
                                          }}
                                        >
                                          <i
                                            className={`icon-sphere ${
                                              menuitem.status === "Active"
                                                ? "text-danger"
                                                : "text-success"
                                            }`}
                                          />
                                          {menuitem.status === "Active"
                                            ? "Disabled"
                                            : "Enabled"}
                                        </a>
                                      </div>
                                    </div>
                                  </td> */}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="text-center">
                                  No Customer found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {meta && (
                        <nav
                          aria-label="Page navigation example"
                          className="d-flex justify-content-center"
                        >
                          <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={meta.last_page}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={(pageNumber) => {
                              setPage(+pageNumber.selected + 1);
                            }}
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
    </>
  );
};

export default CustomerMenuList;
