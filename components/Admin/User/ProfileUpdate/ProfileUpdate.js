import React, { useEffect, useState } from "react";
import Link from "next/link";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import { connect } from "react-redux";

import {
  CHANGE_AVATAR_IMAGE,
  EDIT_USER,
  RESET_USER_DATA,
  RESET_USER_MESSAGE,
  SET_USER_DATA,
  SET_USER_ERRORS,
  SET_USER_MESSAGE,
  SET_USER_ROLES,
} from "../../../../store/admin/actions/user/userActions";
import {
  ERROR,
  getActions,
  saveFileAction,
  SUCCESS,
  updateFileAction,
} from "../../../../Helpers/Utils/Utils";
// import { useRouter } from "next/router";

const ProfileUpdate = (props) => {
  const [loading, setLoading] = useState(false);

  let id = 0;

  useEffect(() => {
    let mounted = true;

    props.resetUserData();

    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();

    document.getElementById("profile_image").innerHTML =
      "Eg. jpg, png, svg, jpeg";

    getActions(`backend/roles`, false)
      .then((result) => {
        if (mounted && result.success) {
          props.setUserRoles(result.data);
        }
      })
      .finally(() => {
        mounted = false;
      });

    getActions(`/auth/merchant/authUser`, false).then((result) => {
      props.editUser(result.data);
    });
  }, [id]);

  const saveUserData = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userFormData = new FormData();

    userFormData.append("first_name", props.userData.first_name);

    userFormData.append("last_name", props.userData.last_name);

    props.userData.email && userFormData.append("email", props.userData.email);

    userFormData.append("phone", props.userData.phone);

    // props.createCustomer
    //   ? userFormData.append("username", props.userData.phone)
    //   : userFormData.append("username", props.userData.username);

    // props.createCustomer
    //   ? userFormData.append("roles", 5)
    //   : userFormData.append("roles", props.userData.roles);

    userFormData.append("avatar", props.userData.avatar);
    props.userData.password &&
      userFormData.append("password", props.userData.password);
    props.userData.password_confirmation &&
      userFormData.append(
        "password_confirmation",
        props.userData.password_confirmation
      );
    userFormData.append("address", props.userData.address);
    // userFormData.append("active", props.userData.active ? 1 : 0);
    userFormData.append("_method", "PUT");

    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    updateFileAction(
      `/backend/users/${props.userData.id}`,
      userFormData,
      config
    )
      .then((result) => {
        if (result.success) {
          props.setUserMessage(SUCCESS, result.message);
          setLoading(false);
          setTimeout(() => props.resetUserMessage(), 2000);
        } else {
          props.setUserMessage(ERROR, result.message);
          props.setUserErrors(result.errors);
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => props.resetUserMessage(), 2000);
      });
  };

  // console.log(props.userData);

  return (
    <>
      {props.message.success && <Success message={props.message.success} />}
      {props.message.error && <Error message={props.message.error} />}

      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square"></i>
                    <h2>Update Profile</h2>
                  </div>
                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with
                      <span className="text-danger"> * </span>
                      are required input fields.
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <form>
                        <fieldset disabled={loading}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="first_name"
                                      title="Enter First Name"
                                    >
                                      First Name
                                      <span className="text-danger"> * </span>
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="text"
                                      className={`form-control ${
                                        props.errors.first_name
                                          ? `is-invalid`
                                          : ``
                                      }`}
                                      id="first_name"
                                      name="first_name"
                                      value={props.userData?.first_name ?? ""}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      placeholder="First Name"
                                      required
                                    />

                                    <div
                                      className={
                                        props.errors.first_name
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.first_name}
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="phone"
                                      title="Enter Phone Number"
                                    >
                                      Mobile Number
                                      <span className="text-danger"> * </span>
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="phone"
                                      className={`form-control ${
                                        props.errors.phone ? `is-invalid` : ``
                                      }`}
                                      id="phone"
                                      name="phone"
                                      readOnly={true}
                                      value={props.userData?.phone ?? ""}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                        // if (!mobilePhoneValidation(e)) {
                                        //     props.setUserData(e);
                                        // }
                                      }}
                                      placeholder="Mobile Number"
                                    />
                                    <div
                                      className={
                                        props.errors.phone
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.phone}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="last_name"
                                      title="Enter last Name"
                                    >
                                      Last Name
                                      <span className="text-danger"> * </span>
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="text"
                                      className={`form-control ${
                                        props.errors.last_name
                                          ? `is-invalid`
                                          : ``
                                      }`}
                                      id="last_name"
                                      name="last_name"
                                      value={props.userData?.last_name ?? ""}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      placeholder="Last Name"
                                      required
                                    />

                                    <div
                                      className={
                                        props.errors.last_name
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.last_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="username"
                                      title="Enter UserName"
                                    >
                                      Username
                                      <span className="text-danger"> * </span>
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="text"
                                      className={`form-control ${
                                        props.errors.username
                                          ? `is-invalid`
                                          : ``
                                      }`}
                                      id="username"
                                      name="username"
                                      readOnly={true}
                                      value={props.userData?.username ?? ""}
                                      // onChange={(e) => {
                                      //     e.preventDefault();
                                      //     props.setUserData(e);
                                      // }}
                                      placeholder="Username"
                                      required
                                    />

                                    <div
                                      className={
                                        props.errors.username
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.username}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="email"
                                      title="Enter Email Address"
                                    >
                                      Email
                                      {/* {!props.createCustomer && (
                                        <span className="text-danger"> * </span>
                                      )} */}
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="email"
                                      className={`form-control ${
                                        props.errors.email ? `is-invalid` : ``
                                      }`}
                                      id="email"
                                      name="email"
                                      value={props.userData?.email ?? ""}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      placeholder="Email"
                                      // required
                                    />

                                    <div
                                      className={
                                        props.errors.email
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.email}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="password"
                                      title="Enter Your Password"
                                    >
                                      Pin
                                      {props.mode === "edit" ? (
                                        ``
                                      ) : (
                                        <span className="text-danger"> * </span>
                                      )}
                                    </label>

                                    <input
                                      autoComplete="new-password"
                                      type="password"
                                      className={`form-control ${
                                        props.errors.password
                                          ? `is-invalid`
                                          : ``
                                      }`}
                                      id="password"
                                      name="password"
                                      value={props.userData?.password ?? ""}
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      placeholder="Password"
                                      required
                                    />

                                    <div
                                      className={
                                        props.errors.password
                                          ? `invalid-feedback`
                                          : ``
                                      }
                                    >
                                      {props.errors.password}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="confirm_password"
                                      title="Re-Enter Password"
                                    >
                                      Confirm Pin
                                      {props.mode === "edit" ? (
                                        ``
                                      ) : (
                                        <span className="text-danger"> * </span>
                                      )}
                                    </label>

                                    <input
                                      autoComplete="off"
                                      type="password"
                                      className="form-control"
                                      id="confirm_password"
                                      name="password_confirmation"
                                      value={
                                        props.userData?.password_confirmation ??
                                        ""
                                      }
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      placeholder="Confirm Password"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="form-group">
                                    <label
                                      htmlFor="name"
                                      title="Enter Your address"
                                    >
                                      Address
                                    </label>

                                    <textarea
                                      autoComplete="off"
                                      id="address"
                                      name="address"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        props.setUserData(e);
                                      }}
                                      value={props.userData.address ?? ""}
                                      className={`form-control`}
                                      rows="3"
                                      cols="50"
                                      placeholder="Address"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="row">
                                <div
                                  className={
                                    props.createCustomer
                                      ? "col-12 mt-4"
                                      : "col-12"
                                  }
                                >
                                  <div className="card mb-3">
                                    <div className="card-header">
                                      <div className="fbh-title">
                                        <h6>Profile image</h6>
                                      </div>
                                    </div>

                                    <div className="card-body">
                                      <div className="form-group mt-1">
                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              e.preventDefault();
                                              props.setUserData(e);
                                              props.changeAvatarImage(
                                                e.target.files[0]
                                              );
                                            }}
                                            className={`custom-file-input ${
                                              props.errors.avatar
                                                ? `is-invalid`
                                                : ``
                                            }`}
                                            name={`avatar`}
                                            id="avatar"
                                          />

                                          <label
                                            id="profile_image"
                                            className="custom-file-label cfl-left-align"
                                            htmlFor="avatar"
                                          >
                                            Choose Image
                                          </label>
                                          <span className="text-danger">
                                            <small>
                                              Profile image size 100 * 100 px
                                            </small>
                                          </span>
                                          <div
                                            className={
                                              props.errors.avatar
                                                ? `invalid-feedback`
                                                : ``
                                            }
                                          >
                                            {props.errors.avatar}
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        className=" d-flex justify-content-center align-items-center"
                                        style={{ height: "180px" }}
                                      >
                                        {props.userData.avatarImage?.length !==
                                        0 ? (
                                          <img
                                            className=" d-flex p-2"
                                            id="avatar"
                                            src={props.userData.avatarImage}
                                            style={{
                                              width: "100",
                                              height: "100%",
                                              border: "1px solid #ccc",
                                              borderRadius: "50%",
                                            }}
                                          />
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6 text-right">
                              <div className="form-group">
                                <Link legacyBehavior href={"/admin"}>
                                  <a className="btn btn-info mr-2">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    Back
                                  </a>
                                </Link>

                                <button
                                  type="submit"
                                  onClick={saveUserData}
                                  className={`btn btn-success ${
                                    loading ? "disabled" : ""
                                  }`}
                                >
                                  <i
                                    className={
                                      loading
                                        ? `spinner-border spinner-border-sm mr-1`
                                        : `icon-save-regular mr-1`
                                    }
                                  />
                                  {loading ? `Updating..` : `Update`}
                                </button>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </form>
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

const mapStateToProps = (store) => {
  const { roles, errors, userData, message } = store.userStore;
  return { roles, errors, userData, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserRoles: (roles) =>
      dispatch({ type: SET_USER_ROLES, payload: { roles } }),
    setUserData: (e) => dispatch({ type: SET_USER_DATA, payload: { e } }),
    changeAvatarImage: (avatarImage) =>
      dispatch({ type: CHANGE_AVATAR_IMAGE, payload: { avatarImage } }),
    setUserMessage: (message_type, message) =>
      dispatch({ type: SET_USER_MESSAGE, payload: { message_type, message } }),
    setUserErrors: (errors) =>
      dispatch({ type: SET_USER_ERRORS, payload: { errors } }),
    resetUserData: () => dispatch({ type: RESET_USER_DATA }),
    resetUserMessage: () => dispatch({ type: RESET_USER_MESSAGE }),
    editUser: (user) => dispatch({ type: EDIT_USER, payload: { user } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
