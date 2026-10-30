import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Error from "../../Notification/Error";
import Success from "../../Notification/Success";
// import {connect} from "react-redux";
// import {SET_AUTHORIZATION} from "../../../../store/permission/actions/permissionActions";
// import Login from '../../../../pages/auth/login'

const AddMenuItem = (props) => {
  let initialMenuData = {
    name: "",
    description: "",
    sort_order: "",
    sent_email: false,
    sent_sms: false,
    icon_class_name: "",
    status: 1,
  };

  let initialValidationErrors = {
    name: "",
    description: "",
    sort_order: "",
    sent_email: "",
    sent_sms: "",
    icon_class_name: "",
    status: "",
  };

  let initialMessage = { success: "", error: "" };

  const [menuItemData, setMenuItemData] = useState(initialMenuData);

  const [menuItemValidation, setMenuItemValidation] = useState(
    initialValidationErrors
  );

  const [message, setMessage] = useState(initialMessage);

  const [loading, setLoading] = useState(false);

  const handleMenuData = (event) => {
    setLoading(false);
    let name = event.target.name;
    let value =
      event.target.type == "checkbox"
        ? event.target.checked
        : event.target.value;
    setMenuItemData({ ...menuItemData, [name]: value });
    setMenuItemValidation({ ...menuItemValidation, [name]: "" });
    setMessage(initialMessage);
  };

  const saveMenuData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const couponFormData = new FormData();
    couponFormData.append("name", menuItemData.name);
    couponFormData.append("description", menuItemData.description);
    couponFormData.append("sort_order", menuItemData.sort_order);
    couponFormData.append("icon_class_name", menuItemData.icon_class_name);
    couponFormData.append("status", menuItemData.status === "1" ? 1 : 0);
    couponFormData.append("sent_email", menuItemData.sent_email ? 1 : 0);
    couponFormData.append("sent_sms", menuItemData.sent_sms ? 1 : 0);
    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    let response = await axios
      .post(`/backend/action-menus`, couponFormData, config)
      .then((result) => result.data)
      .catch((errors) => errors);
    if (response.success) {
      // Need to redirect list page
      await resetMenuData(e);
      setMessage({ ...message, success: response.message });
      // props.set_authorization(response.config.permissions)
    } else {
      setLoading(false);
      setMessage({ ...message, error: response.message });
      console.log(response.errors);
      setMenuItemValidation(response.errors);
    }

    setTimeout(() => {
      setMessage(initialMessage);
    }, 1000);
  };

  const resetMenuData = async (e) => {
    e.preventDefault();
    setMenuItemData(initialMenuData);
    setMenuItemValidation(initialValidationErrors);
    setLoading(false);
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
                    <i className="far fa-plus-square" />
                    <h2>Add Menu Item</h2>
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
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="name">
                                    Menu Item Name
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      menuItemValidation.name
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="name"
                                    name="name"
                                    value={menuItemData.name}
                                    onChange={handleMenuData}
                                    placeholder="Item Name"
                                    required
                                  />

                                  <div
                                    className={
                                      menuItemValidation.name
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {menuItemValidation.name}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="description">
                                    Description
                                  </label>
                                  <textarea
                                    className={`form-control ${
                                      menuItemValidation.description
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="description"
                                    name="description"
                                    value={menuItemData.description}
                                    onChange={handleMenuData}
                                    placeholder="Description"
                                  />
                                  <div
                                    className={
                                      menuItemValidation.description
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {menuItemValidation.description}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="icon_class_name">
                                    Icon Class Name
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      menuItemValidation.icon_class_name
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="icon_class_name"
                                    name="icon_class_name"
                                    value={menuItemData.icon_class_name}
                                    onChange={handleMenuData}
                                    placeholder="Icon Class Name"
                                    required
                                  />

                                  <div
                                    className={
                                      menuItemValidation.icon_class_name
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {menuItemValidation.icon_class_name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="sort_order">Sort Order</label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      menuItemValidation.sort_order
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="sort_order"
                                    name="sort_order"
                                    value={menuItemData.sort_order}
                                    onChange={handleMenuData}
                                    placeholder="1"
                                    required
                                  />
                                  <div
                                    className={
                                      menuItemValidation.sort_order
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {menuItemValidation.sort_order}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="status">
                                    Status
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <div
                                    className={`input-group ${
                                      menuItemValidation.status
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                  >
                                    <select
                                      className="custom-select"
                                      id="status"
                                      name="status"
                                      onChange={handleMenuData}
                                      aria-label="status Select"
                                    >
                                      <option value="1">Enable</option>
                                      <option value="0">Disable</option>
                                    </select>
                                  </div>

                                  <div
                                    className={
                                      menuItemValidation.status
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {menuItemValidation.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    defaultChecked={menuItemData.sent_email}
                                    name="sent_email"
                                    id="sent_email"
                                    onChange={handleMenuData}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="sent_email"
                                  >
                                    Sent Email
                                  </label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    defaultChecked={menuItemData.sent_sms}
                                    name="sent_sms"
                                    id="sent_sms"
                                    onChange={handleMenuData}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="sent_sms"
                                  >
                                    Sent SMS
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12 text-right">
                            <div className="form-group">
                              <Link legacyBehavior href={"/admin/action-menu"}>
                                <a className="btn btn-info mr-2">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />
                                  Back
                                </a>
                              </Link>

                              <button
                                type="submit"
                                onClick={resetMenuData}
                                className="btn btn-danger mr-2"
                              >
                                <i className="icon-reset mr-1" />
                                Reset
                              </button>

                              <button
                                type="submit"
                                onClick={saveMenuData}
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
                                {loading ? `Saving..` : `Save`}
                              </button>
                            </div>
                          </div>
                        </div>
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

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setPermissions: (permissions) =>
// 			dispatch({type: SET_AUTHORIZATION, payload: {permissions}}),
// 		set_authorization: (permissions) =>
// 			dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
// 	}
// }

export default AddMenuItem;
