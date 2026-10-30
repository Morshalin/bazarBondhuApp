import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import ActionMenuHeader from "./ActionMenuHeader";
// import {SET_AUTHORIZATION} from "../../../store/permission/actions/permissionActions";
// import {connect} from "react-redux";

const ActionMenuLIst = (props) => {
  const [show, setShow] = useState(10);
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(0);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("asc");
  const [menuList, setMenuList] = useState("");
  let initialMessage = { success: "", error: "" };
  const [message, setMessage] = useState(initialMessage);
  
  useEffect(() => {
    loadMenuItem();
  }, [show, keywords, page, orderBy, column]);

  const loadMenuItem = async () => {
    let response = await axios
      .get(
        `/backend/action-menus?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`
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
      // props.set_authorization(response.config.permissions)
    }
  };

  const deleteCoupon = async (action_menu_id) => {
    await axios
      .delete(`/backend/action-menus/${action_menu_id}`)
      .then((result) => {
        if (result.data.success) {
          setMessage({ ...message, success: result.data.message });
          setMenuList(menuList.filter((menu) => menu.id !== action_menu_id));
          if (!menuList) {
            loadMenuItem();
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

  const disableEnable = async (action_menu_id) => {
    await axios
      .post(`/backend/action-menus/active-status/${action_menu_id}`)
      .then((result) => {
        if (result.data.success) {
          loadMenuItem();
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
                    <h2>Action Menu List</h2>
                    <Link legacyBehavior href={`/admin/action-menu/add`}>
                      <a className="fbh-btn" title="Add new Menu Item">
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
                            setMeta("");
                            setShow(event.target.value);
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
                        <table className="table table-bordered table-hover mb-0 carsour-pointer">
                          <thead className="thead-light">
                            <ActionMenuHeader
                              setColumn={setColumn}
                              setOrderBy={setOrderBy}
                              column={column}
                              orderBy={orderBy}
                            />
                          </thead>
                          <tbody id="table">
                            {menuList &&
                              menuList.map((menuitem, index) => (
                                <tr key={index} className="text-center">
                                  <td scope="row">{index + 1}</td>
                                  <td className="nowrap">
                                    {menuitem.name ?? "-"}
                                  </td>
                                  <td className="nowrap">
                                    {menuitem.description ?? "-"}
                                  </td>

                                  <td className="text-center">
                                    <i
                                      className={
                                        menuitem.sent_email
                                          ? `fas fa-circle text-success`
                                          : `fas fa-circle text-danger`
                                      }
                                    />
                                  </td>
                                  <td className="text-center">
                                    <i
                                      className={
                                        menuitem.sent_sms
                                          ? `fas fa-circle text-success`
                                          : `fas fa-circle text-danger`
                                      }
                                    />
                                  </td>

                                  <td className="nowrap">
                                    {menuitem.sort_order ?? "-"}
                                  </td>
                                  <td className="text-center">
                                    <i
                                      className={
                                        menuitem.status
                                          ? `fas fa-circle text-success`
                                          : `fas fa-circle text-danger`
                                      }
                                      id={`permission_status_${menuitem.id}`}
                                    />
                                  </td>
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
                                          href={`action-menu/edit/${menuitem.id}`}
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
                                            deleteCoupon(menuitem.id);
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
                                              menuitem.status
                                                ? "text-danger"
                                                : "text-success"
                                            }`}
                                          />
                                          {menuitem.status
                                            ? "Disabled"
                                            : "Enabled"}
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
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
                              setPage(pageNumber.selected + 1);
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPermissions: (permissions) =>
//             dispatch({type: SET_AUTHORIZATION, payload: {permissions}}),
//         set_authorization: (permissions) =>
//             dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
//     }
// }

export default ActionMenuLIst;
