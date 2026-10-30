import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  POS_CHECKOUT,
  SET_POS_ACCOUNT_ID,
  SET_POS_DUE_AMOUNT,
  SET_PAYMENT_METHOD,
  POS_SET_CUSTOMER,
} from "../../../store/pos/actions/posCartActions";

const AddDuePaymentModal = (props) => {
  const [isDisable, setIsDisable] = useState(false);

  const [amount, setAmount] = useState("");
  const amountHandler = (event) => {
    const value = event.target.value;
    setAmount(value);
    props.setPaymentDueAmount(+value);
  };

  const accountHandler = (account) => {
    if (account) {
      props.setPaymentAccountId(account.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const splitDate = new Date().toISOString().split("T");
    const convertedDate = splitDate[0];
    const convertedTime = splitDate[1].slice(0, 8);
    const fullDateTime = `${convertedDate} ${convertedTime}`;

    let formData = new FormData();
    formData.append("head_id", 7);
    formData.append("receiver_type", "customer");
    formData.append("responsible_id", props.posCart.account_id);
    formData.append("received_from_id", props.posCart.user_id);
    // formData.append("payment_method", props.posCart.payment_method);
    formData.append("amount", props.posCart.amount);
    formData.append("transaction_time_date", fullDateTime);
    formData.append("particular", "Deposit");

    props.posSubmit(`backend/accounts/heads/cash/add`, formData);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const defaultAccount = props.accountOptions.filter(
        (item) => item.default === true
      );

      setIsDisable(false);
      props.setPaymentAccountId(defaultAccount[0].value);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="add_due_payment_modal"
        tabIndex="-1"
        aria-labelledby="add_due_payment_modal_label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add_due_payment_modal_label">
                Add Payment
              </h5>
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                aria-label="Close"
                onClick={props.closeModalHandler}
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
                            <label className="sr-only" htmlFor="amount">
                              amount
                            </label>

                            <div className="input-group">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  * Amount:
                                </div>
                              </div>

                              <input
                                type="text"
                                className={`form-control ${
                                  !amount ? "is-invalid" : ""
                                }`}
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={amountHandler}
                                placeholder=""
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="payment_method">
                              Account
                              <span className="text-danger"> * </span>
                            </label>

                            <Select
                              defaultValue={props.accountOptions.filter(
                                (item) => item.default === true
                              )}
                              options={props.accountOptions}
                              onChange={(account) => {
                                accountHandler(account);
                              }}
                              placeholder="Select Account"
                            />
                          </div>
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
                onClick={submitHandler}
                disabled={isDisable || !amount || props.disabled}
                type="submit"
                className="btn btn-warning btn-lg btn-block"
              >
                {props.loading ? "Please Wait" : "Pay"}
                <i
                  className={`mb-1 ml-2 ${
                    props.loading
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
const mapDispatchToProps = (dispatch) => {
  return {
    setPaymentAccountId: (account_id) =>
      dispatch({ type: SET_POS_ACCOUNT_ID, payload: { account_id } }),
    setPaymentDueAmount: (amount) =>
      dispatch({ type: SET_POS_DUE_AMOUNT, payload: { amount } }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;

  return { posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDuePaymentModal);
