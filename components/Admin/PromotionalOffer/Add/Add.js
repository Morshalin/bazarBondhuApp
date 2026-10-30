import React, { useEffect, useState } from "react";
import axios from "axios";
import Error from "../../Notification/Error";
import Success from "../../Notification/Success";
import Link from "next/link";

const AddPromotionalOffer = () => {
  let initialOfferData = {
    name: "",
    delivery_charge_free: 0,
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
    delivery_charge_free:"",
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

  const [offerData, setOfferData] = useState(initialOfferData);

  const [offerValidation, setOfferValidation] = useState(
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
      .get("backend/promotional-offers")
      .then((result) => result.data)
      .catch((error) => error);
  };

  const handleOfferData = (event) => {
    setLoading(false);

    let name = event.target.name;
    let value =  event.target.type == 'checkbox' ? event.target.checked : event.target.value;
    setOfferData({ ...offerData, [name]: value });
    setOfferValidation({ ...offerValidation, [name]: "" });
    setMessage(initialMessage);
  };

  const saveOfferData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const offerFormData = new FormData();
    offerFormData.append("name", offerData.name);
    offerFormData.append("delivery_charge_free", offerData.delivery_charge_free ? 1 : 0);
    offerData.delivery_charge_free ? offerFormData.append("type", "Fixed") : offerFormData.append("type", offerData.type);
    offerData.delivery_charge_free ? offerFormData.append("amount", 0.00) : offerFormData.append("amount", offerData.amount);
    offerData.delivery_charge_free ? offerFormData.append("use_per_user", 0) : offerFormData.append("use_per_user", offerData.use_per_user);
    offerFormData.append(
      "min_purchase_amount",
        offerData.min_purchase_amount
    );
    offerData.delivery_charge_free ? offerFormData.append(
      "maximum_discount_amount",
        0.00
    ) : offerFormData.append(
        "maximum_discount_amount",
        offerData.maximum_discount_amount
    );
    offerFormData.append("start_time", offerData.start_time);
    offerFormData.append("end_time", offerData.end_time);
    offerFormData.append("status", offerData.status);

    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    let response = await axios
      .post(`/backend/promotional-offers`, offerFormData, config)
      .then((result) => result.data)
      .catch((errors) => errors);
    if (response.success) {
      // Need to redirect list page
      await resetOfferData(e);

      setMessage({ ...message, success: response.message });
    } else {
      setLoading(false);

      setMessage({ ...message, error: response.message });
      setOfferValidation(response.errors);
    }

    setTimeout(() => {
      setMessage(initialMessage);
    }, 1000);
  };

  const resetOfferData = async (e) => {
    e.preventDefault();

    setOfferData(initialOfferData);

    setOfferValidation(initialValidationErrors);

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
                    <h2>Add Promotional Offer</h2>
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
                                      offerValidation.name ? `is-invalid` : ``
                                    }`}
                                    id="name"
                                    name="name"
                                    value={offerData.name}
                                    onChange={handleOfferData}
                                    placeholder="Campaign Name"
                                    required
                                  />

                                  <div
                                    className={
                                      offerValidation.name
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.name}
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <div className="custom-control custom-checkbox">

                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        onChange={(e) => {
                                          handleOfferData(e);
                                        }}
                                        checked={offerData.delivery_charge_free}
                                        name="delivery_charge_free"
                                        id="active"/>

                                    <label
                                        className="custom-control-label"
                                        htmlFor="active">
                                      Delivery Charge Free
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="type">Offer Type</label>
                                  <select
                                    className="custom-select"
                                    id="type"
                                    name="type"
                                    onChange={handleOfferData}
                                    aria-label="type Select"
                                    value={offerData.delivery_charge_free ? "fixed" : offerData.type}
                                    disabled={offerData.delivery_charge_free}
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
                                    {!offerData.delivery_charge_free && <span className="text-danger"> * </span>}
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control ${
                                      offerValidation.amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="amount"
                                    name="amount"
                                    value={offerData.delivery_charge_free ? "0.00" :offerData.amount}
                                    onChange={handleOfferData}
                                    placeholder="0.00"
                                    disabled = {offerData.delivery_charge_free}
                                  />
                                  <div
                                    className={
                                      offerValidation.amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.amount}
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
                                      offerValidation.use_per_user
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="use_per_user"
                                    name="use_per_user"
                                    value={offerData.delivery_charge_free ? "0" :offerData.use_per_user}
                                    onChange={handleOfferData}
                                    placeholder="-1"
                                    disabled={offerData.delivery_charge_free}
                                  />
                                  <div
                                    className={
                                      offerValidation.use_per_user
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.use_per_user}
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
                                      offerValidation.min_purchase_amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="min_purchase_amount"
                                    name="min_purchase_amount"
                                    value={offerData.min_purchase_amount}
                                    onChange={handleOfferData}
                                    placeholder="0.00"
                                    required
                                  />
                                  <div
                                    className={
                                      offerValidation.min_purchase_amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.min_purchase_amount}
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
                                        offerValidation.maximum_discount_amount
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="maximum_discount_amount"
                                    name="maximum_discount_amount"
                                    value={offerData.delivery_charge_free ? "0.00" :offerData.maximum_discount_amount}
                                    onChange={handleOfferData}
                                    placeholder="0.00"
                                    disabled={offerData.delivery_charge_free}
                                    required
                                  />
                                  <div
                                    className={
                                      offerValidation.maximum_discount_amount
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.maximum_discount_amount}
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
                                        offerValidation.start_time
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="start_time"
                                    name="start_time"
                                    value={offerData.start_time}
                                    onChange={handleOfferData}
                                    placeholder="Start Time"
                                    required
                                  />
                                  <div
                                    className={
                                      offerValidation.start_time
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.start_time}
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
                                        offerValidation.end_time
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                    id="end_time"
                                    name="end_time"
                                    value={offerData.end_time}
                                    onChange={handleOfferData}
                                    placeholder="End Time"
                                    required
                                  />
                                  <div
                                    className={
                                      offerValidation.end_time
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.end_time}
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
                                        offerValidation.status
                                        ? `is-invalid`
                                        : ``
                                    }`}
                                  >
                                    <select
                                      className="custom-select"
                                      id="status"
                                      name="status"
                                      onChange={handleOfferData}
                                      aria-label="status Select"
                                    >
                                      <option value="">Enable</option>
                                      <option value="">Disable</option>
                                    </select>
                                  </div>

                                  <div
                                    className={
                                      offerValidation.status
                                        ? `invalid-feedback`
                                        : `d-none`
                                    }
                                  >
                                    {offerValidation.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12 text-right">
                            <div className="form-group">
                              <Link legacyBehavior href={"/admin/promotional-offer"}>
                                <a className="btn btn-info mr-2">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />
                                  Back
                                </a>
                              </Link>

                              <button
                                type="submit"
                                onClick={resetOfferData}
                                className="btn btn-danger mr-2"
                              >
                                <i className="icon-reset mr-1" />
                                Reset
                              </button>

                              <button
                                type="submit"
                                onClick={saveOfferData}
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

export default AddPromotionalOffer;
