import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../Notification/Error";
import Success from "../../Notification/Success";
import Link from "next/link";

const AddCoupon = () => {
  let initialCouponData = {
    name: "",
    code: "",
    type: "Fixed",
    amount: "",
    use_per_user: "",
    min_purchase_amount: "",
    maximum_discount_amount: "",
    start_time: "",
    end_time: "",
    status: 1,
  };

  let initialValidationErrors = {
    name: "",
    code: "",
    type: "Fixed",
    amount: "",
    use_per_user: "",
    min_purchase_amount: "",
    maximum_discount_amount: "",
    start_time: "",
    end_time: "",
    status: "",
  };

  let initialMessage = { success: "", error: "" };

  const [couponData, setCouponData] = useState(initialCouponData);

  const [couponValidation, setCouponValidation] = useState(
    initialValidationErrors
  );

  const [message, setMessage] = useState(initialMessage);

  const [loading, setLoading] = useState(false);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    let mounted = true;

    fetchedRoles()
      .then((response) => {
        if (mounted) {
          setRoles(response.data);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, []);

  const fetchedRoles = async () => {
    return await axios
      .get("backend/coupons")
      .then((result) => result.data)
      .catch((error) => error);
  };

  const handleUserData = (event) => {
    setLoading(false);

    let name = event.target.name;
    let value = event.target.value;

    setCouponData({ ...couponData, [name]: value });
    setCouponValidation({ ...couponValidation, [name]: "" });
    setMessage(initialMessage);
  };

  const saveCouponData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const couponFormData = new FormData();
    couponFormData.append("name", couponData.name);
    couponFormData.append("code", couponData.code);
    couponFormData.append("type", couponData.type);
    couponFormData.append("amount", couponData.amount);
    couponFormData.append("use_per_user", couponData.use_per_user);
    couponFormData.append(
      "min_purchase_amount",
      couponData.min_purchase_amount
    );
    couponFormData.append(
      "maximum_discount_amount",
      couponData.maximum_discount_amount
    );
    couponFormData.append("start_time", couponData.start_time);
    couponFormData.append("end_time", couponData.end_time);
    couponFormData.append("status", couponData.status);

    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    let response = await axios
      .post(`/backend/coupons`, couponFormData, config)
      .then((result) => result.data)
      .catch((errors) => errors);
    if (response.success) {
      // Need to redirect list page
      await resetUserData(e);

      setMessage({ ...message, success: response.message });
    } else {
      setLoading(false);

      setMessage({ ...message, error: response.message });
      setCouponValidation(response.errors);
    }

    setTimeout(() => {
      setMessage(initialMessage);
    }, 1000);
  };

  const resetUserData = async (e) => {
    e.preventDefault();

    setCouponData(initialCouponData);

    setCouponValidation(initialValidationErrors);

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
                    <h2>Add Coupon</h2>
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
                                    Campaign Name
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      couponValidation.name ? `is-invalid` : ``
                                    }`}
                                    id="name"
                                    name="name"
                                    value={couponData.name}
                                    onChange={handleUserData}
                                    placeholder="Campaign Name"
                                    required
                                  />

                                  <div
                                    className={
                                      couponValidation.name
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.name}
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="code">
                                    Coupon Code
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      couponValidation.code ? `is-invalid` : ``
                                    }`}
                                    id="code"
                                    name="code"
                                    value={couponData.code}
                                    onChange={handleUserData}
                                    placeholder="Coupon Code"
                                  />
                                  <div
                                    className={
                                      couponValidation.code
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.code}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="type">Coupon Type</label>
                                  <select
                                    className="custom-select"
                                    id="type"
                                    name="type"
                                    onChange={handleUserData}
                                    aria-label="type Select"
                                  >
                                    <option value="fixed">Fixed</option>
                                    <option value="percent">Percent</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="amount">
                                    Amount
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control ${
                                      couponValidation.amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="amount"
                                    name="amount"
                                    value={couponData.amount}
                                    onChange={handleUserData}
                                    placeholder="0.00"
                                  />
                                  <div
                                    className={
                                      couponValidation.amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.amount}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="use_per_user">
                                    Use Per User
                                    <span className="text-warning">
                                      {" "}
                                      [-1 or 0 means unlimited]{" "}
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control ${
                                      couponValidation.use_per_user
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="use_per_user"
                                    name="use_per_user"
                                    value={couponData.use_per_user}
                                    onChange={handleUserData}
                                    placeholder="-1"
                                  />
                                  <div
                                    className={
                                      couponValidation.use_per_user
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.use_per_user}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="min_purchase_amount">
                                    Min Purchase Amount
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control ${
                                      couponValidation.min_purchase_amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="min_purchase_amount"
                                    name="min_purchase_amount"
                                    value={couponData.min_purchase_amount}
                                    onChange={handleUserData}
                                    placeholder="0.00"
                                    required
                                  />
                                  <div
                                    className={
                                      couponValidation.min_purchase_amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.min_purchase_amount}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="maximum_discount_amount">
                                    Max. Discount Amount
                                    <span className="text-warning">
                                      {" "}
                                      [-1 or 0 means unlimited]{" "}
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control ${
                                      couponValidation.maximum_discount_amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="maximum_discount_amount"
                                    name="maximum_discount_amount"
                                    value={couponData.maximum_discount_amount}
                                    onChange={handleUserData}
                                    placeholder="0.00"
                                    required
                                  />
                                  <div
                                    className={
                                      couponValidation.maximum_discount_amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.maximum_discount_amount}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="start_time">
                                    Start Time
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="datetime-local"
                                    className={`form-control ${
                                      couponValidation.start_time
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="start_time"
                                    name="start_time"
                                    value={couponData.start_time}
                                    onChange={handleUserData}
                                    placeholder="Start Time"
                                    required
                                  />
                                  <div
                                    className={
                                      couponValidation.start_time
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.start_time}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="end_time">
                                    End Time
                                    <span className="text-danger"> * </span>
                                  </label>
                                  <input
                                    type="datetime-local"
                                    className={`form-control ${
                                      couponValidation.end_time
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="end_time"
                                    name="end_time"
                                    value={couponData.end_time}
                                    onChange={handleUserData}
                                    placeholder="End Time"
                                    required
                                  />
                                  <div
                                    className={
                                      couponValidation.end_time
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.end_time}
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
                                      couponValidation.status
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                  >
                                    <select
                                      className="custom-select"
                                      id="status"
                                      name="status"
                                      onChange={handleUserData}
                                      aria-label="status Select"
                                    >
                                      <option value="">Enable</option>
                                      <option value="">Disable</option>
                                    </select>
                                  </div>

                                  <div
                                    className={
                                      couponValidation.status
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {couponValidation.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12 text-right">
                            <div className="form-group">
                              <Link legacyBehavior href={"/admin/coupon"}>
                                <a className="btn btn-info mr-2">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />
                                  Back
                                </a>
                              </Link>

                              <button
                                type="submit"
                                onClick={resetUserData}
                                className="btn btn-danger mr-2"
                              >
                                <i className="icon-reset mr-1" />
                                Reset
                              </button>

                              <button
                                type="submit"
                                onClick={saveCouponData}
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

export default AddCoupon;
