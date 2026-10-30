import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import {
  POS_CHECKOUT,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_NOTE,
  SET_POS_ACCOUNT_ID,
  POS_SET_CUSTOMER,
} from "../../../store/pos/actions/posCartActions";

const OtherPaymentModal = (props) => {
  const [isDisable, setIsDisable] = useState(false);

  const accountHandler = (account) => {
    if (account) {
      setIsDisable(false);
      props.setPaymentAccountId(account.value);
    }
  };

  const paymentNoteHandler = (event) => {
    props.setPaymentNote(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.posSubmit();
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
        id="other_payment_modal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="other_payment_modal_label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="other_payment_modal_label">
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

                          <div className="form-group">
                            <label htmlFor="payment_note">Payment Note</label>
                            <textarea
                              className="form-control"
                              id="payment_note"
                              rows="3"
                              onChange={paymentNoteHandler}
                            ></textarea>
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
                disabled={isDisable || props.disabled}
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
    posCheckOut: () => dispatch({ type: POS_CHECKOUT }),

    setPaymentNote: (payment_note) =>
      dispatch({ type: SET_PAYMENT_NOTE, payload: { payment_note } }),
    setPaymentAccountId: (account_id) =>
      dispatch({ type: SET_POS_ACCOUNT_ID, payload: { account_id } }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;

  return { posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPaymentModal);
