import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { pattern } from "../../../Helpers/Utils/phoneNumberValidation";

const AddCustomerModal = (props) => {
  const router = useRouter();
  // slugify helper function
  const slugify = (toConvertText) => {
    toConvertText = toConvertText.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    toConvertText = toConvertText.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      toConvertText = toConvertText.replace(
        new RegExp(from.charAt(i), "g"),
        to.charAt(i)
      );
    }

    // Remove invalid chars
    toConvertText = toConvertText
      .replace(/[^a-z0-9 -]/g, "")
      // Collapse whitespace and replace by -
      .replace(/\s+/g, "-")
      // Collapse dashes
      .replace(/-+/g, "-");

    return toConvertText;
  };

  const api_url = process.env.api_backend_url;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleSubmitData = (event) => {
    const { name, value } = event.target;

    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let slug = slugify(customerData.first_name + " " + customerData.last_name);
    let formData = new FormData();
    formData.append("username", slug);
    formData.append("slug", slug);
    formData.append("first_name", customerData.first_name);
    formData.append("last_name", customerData.last_name);
    // formData.append('email', customerData.email);
    formData.append("password", "password");
    formData.append("password_confirmation", "password");
    formData.append("roles", 8);
    if (pattern.test(customerData.phone)) {
      formData.append("phone", customerData.phone);
    }

    let response = await axios
      .post(`${api_url}/users`, formData)
      .then((result) => {
        return result.data;
      })
      .catch((exception) => {
        return exception;
      });

    // Success Login
    if (response.success) {
      let phone_number = "";
      response.data.phone && (phone_number = " (" + response.data.phone + ")");
      let customerFilterData = {
        value: response.data.id,
        label: response.data.name + phone_number,
      };
      props.setSelectedCustomer(customerFilterData);
      props.setCustomer(response.data.id, response.data.wallet_balance);
      hideModal();
      setLoading(false);
    } else {
      setLoading(false);
      setErrors(response.errors);
    }
  };

  const hideModal = () => {
    $("#add_customer_modal").modal("hide");

    setTimeout(() => {
      setCustomerData({
        first_name: "",
        last_name: "",
        phone: "",
      });
    }, 500);
  };

  return (
    <>
      <div
        className="modal fade"
        id="add_customer_modal"
        tabIndex="-1"
        aria-labelledby="add_customer_modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add_customer_modal">
                Add Customer
              </h5>
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                aria-label="Close"
                onClick={hideModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12 mt-4">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="v-pills-email-login"
                      role="tabpanel"
                      aria-labelledby="v-pills-email-login-tab"
                    >
                      <div className="login-form">
                        <form>
                          <div className="form-group">
                            <label className="sr-only" htmlFor="first_name">
                              First Name
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  * First Name:
                                </div>
                              </div>

                              <input
                                type="text"
                                className={`form-control ${
                                  !customerData.first_name ? "is-invalid" : ""
                                }`}
                                id="first_name"
                                name="first_name"
                                value={customerData.first_name}
                                onChange={handleSubmitData}
                                placeholder=""
                              />

                              {/*<div id="first_name"*/}
                              {/*     className={errors ? `invalid-feedback` : 'd-none' >*/}
                              {/*    {errors.username_error&&}*/}
                              {/*</div>*/}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="sr-only" htmlFor="last_name">
                              amount
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  * Last Name:
                                </div>
                              </div>

                              <input
                                type="text"
                                className={`form-control ${
                                  !customerData.last_name ? "is-invalid" : ""
                                }`}
                                id="last_name"
                                name="last_name"
                                value={customerData.last_name}
                                onChange={handleSubmitData}
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="sr-only" htmlFor="phone">
                              First Name
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  Phone No :
                                </div>
                              </div>

                              <input
                                type="text"
                                className={`form-control ${
                                  !customerData.phone ? "is-invalid" : ""
                                }`}
                                id="phone"
                                name="phone"
                                value={customerData.phone}
                                onChange={handleSubmitData}
                                placeholder=""
                              />
                            </div>
                            <span
                              id="email"
                              className={
                                errors && errors.phone
                                  ? `text-danger`
                                  : "d-none"
                              }
                            >
                              {errors && errors.phone ? errors.phone[0] : ""}
                            </span>
                          </div>

                          {/* <div className="form-group">

                                                        <label
                                                            className="sr-only"
                                                            htmlFor="email">
                                                            E-mail
                                                        </label>

                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    E-mail:
                                                                </div>
                                                            </div>

                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                className={`form-control`}
                                                                value={customerData.email}
                                                                onChange={handleSubmitData}
                                                                placeholder=""/>


                                                        </div>
                                                        <span id="email"
                                                              className={(errors&&errors.email) ? `text-danger` : 'd-none'}
                                                        >
                                                                {errors&&errors.email ? errors.email[0] : ''}
                                                        </span>

                                                    </div> */}
                        </form>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="v-pills-phone-login"
                      role="tabpanel"
                      aria-labelledby="v-pills-phone-login-tab"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={handleSubmit}
                disabled={!(customerData.first_name && customerData.last_name)}
                type="submit"
                className="btn btn-warning btn-lg btn-block"
              >
                {loading ? "Please Wait" : "Save"}
                <i
                  className={`mb-1 ml-2 ${
                    loading
                      ? "spinner-border spinner-border-sm"
                      : "icon-sign-in-alt-solid"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomerModal;
