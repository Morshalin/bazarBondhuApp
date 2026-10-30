import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DELETE,
  deleteAction,
  ERROR,
  getActions,
  options,
  STATUS,
  statusChange,
  SUCCESS,
} from "../../../../Helpers/Utils/Utils";
import { connect } from "react-redux";
import {
  CHANGE_USER_STATUS,
  REMOVE_USER,
  RESET_USER_MESSAGE,
  SET_USER,
  SET_USER_LIST,
  SET_USER_MESSAGE,
} from "../../../../store/admin/actions/user/userActions";
import Loader from "react-loader";
import ReactPaginate from "react-paginate";
import UserHeader from "./UserHeader";
import UserActions from "./UserActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const UserList = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoaded(false);
    let mounted = true;

    getActions(
      `backend/getAllUsers?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
      true
    )
      .then((response) => {
        if (mounted && response) {
          setIsLoaded(true);
          setMeta(response.meta);
          props.setUserList(response.data);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, [show, keywords, page, column, orderBy]);

  const actionsUser = (actions) => {
    let { type, payload } = actions;

    switch (type) {
      case DELETE: {
        deleteAction(`backend/users/${props.userList[payload.index].id}`)
          .then((result) => {
            result.success
              ? props.removeUser(props.userList[payload.index].id) &&
                props.setUserMessage(SUCCESS, result.message)
              : props.setUserMessage(ERROR, result.message);
          })
          .finally(() => {
            resetChanges();
          });

        break;
      }

      case STATUS: {
        statusChange(
          `backend/users/user-active-status/${props.userList[payload.index].id}`
        )
          .then((result) => {
            result.success
              ? props.changeUserStatus(result.data) &&
                props.setUserMessage(SUCCESS, result.message)
              : props.setUserMessage(ERROR, result.message);
          })
          .finally(() => {
            resetChanges();
          });

        break;
      }
      default:
        break;
    }
  };

  const resetChanges = () => {
    setTimeout(() => {
      props.resetUserMessage();
    }, 2000);
  };

  return (
    <>
      {props.message.success && <Success message={props.message.success} />}
      {props.message.error && <Error message={props.message.error} />}

      <div className="col-md-12 mb-3">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2>User List</h2>
              <Link legacyBehavior href={"/admin/user/add"}>
                <a className="fbh-btn" title="Add User">
                  <i className="icon-plus-square-regular"></i>
                </a>
              </Link>
            </div>
          </div>

          <div className="custom-card-box-content p-md-3 p-2">
            <div className="row table-top-option mb-md-3 mb-2">
              <div className="col-6">
                <div className="showing-table-row">
                  <label className="">Show</label>
                  <select
                    className="custom-select"
                    defaultValue={`10`}
                    onChange={(e) => {
                      setMeta("");
                      setShow(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="table-search">
                  <label className="">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here ..."
                    onChange={(e) => {
                      setMeta("");
                      setTimeout(() => {
                        setKeywords(e.target.value);
                        setPage(1);
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive custom-table custom-hight-500">
                  <Loader
                    loaded={isLoaded}
                    options={options}
                    className="spinner"
                  >
                    <table className="table table-bordered table-hover mb-0 carsour-pointer">
                      <thead className="thead-light">
                        <UserHeader
                          setColumn={setColumn}
                          setOrderBy={setOrderBy}
                          column={column}
                          orderBy={orderBy}
                        />
                      </thead>
                      <tbody>
                        {props.userList && props.userList.length > 0 ? (
                          props.userList.map((user, index) => (
                            <tr
                              className={`text-center ${
                                user.id === props.user.id ? `bg-selected` : ``
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                props.setUser(user);
                              }}
                              key={index}
                            >
                              <td className="nowrap text-center ">
                                {meta.from ? index + meta.from : ""}
                              </td>

                              <td className="nowrap text-center">
                                {user.name}
                              </td>

                              <td className="text-center text-nowrap">
                                {user.username}
                              </td>

                              <td className="text-center">{user.email}</td>
                              <td className="text-center">
                                {user.roles ? user.roles.name : "-"}
                              </td>

                              <td className="text-center">{user.status}</td>

                              <td className="text-center">
                                <UserActions
                                  userIndex={index}
                                  user={user}
                                  actions={actionsUser}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No User Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Loader>
                </div>
              </div>
            </div>
          </div>

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
    </>
  );
};

const mapStateToProps = (store) => {
  const { userList, user, message } = store.userStore;
  return { userList, user, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserList: (userList) =>
      dispatch({ type: SET_USER_LIST, payload: { userList } }),
    setUser: (user) => dispatch({ type: SET_USER, payload: { user } }),
    setUserMessage: (message_type, message) =>
      dispatch({ type: SET_USER_MESSAGE, payload: { message_type, message } }),
    resetUserMessage: () => dispatch({ type: RESET_USER_MESSAGE }),
    changeUserStatus: (user) =>
      dispatch({ type: CHANGE_USER_STATUS, payload: { user } }),
    removeUser: (id) => dispatch({ type: REMOVE_USER, payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
