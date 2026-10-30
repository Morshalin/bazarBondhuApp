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
  SET_POS_AMOUNT,
} from "../../../store/pos/actions/posCartActions";
import { ACTION_MENU } from "../../../Helpers/ActionMenu/ActionMenuConstant";
import { PAYMENT_METHODS } from "../../../Helpers/Pos/PaymentMethodsConstant";

const SalePaymentModal = (props) => {
  const [isDisable, setIsDisable] = useState(false);

  const [amount, setAmount] = useState("");
  const amountHandler = (event) => {
    const value = event.target.value;
    setAmount(value);
    props.setPosAmount(+value);
  };

  const accountHandler = (account) => {
    if (account) {
      setIsDisable(false);
      props.setPaymentAccountId(account.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.submitPaymentHandler({
      sale_id: props.sale.id,
      payment_method: PAYMENT_METHODS.CARD,
      user_id: props.sale.customer_id,
      account_id: props.posCart.account_id,
      order_status: ACTION_MENU.COMPLETED,
      pos_amount: props.posCart.pos_amount,
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && props?.accountOptions?.length > 0) {
      const defaultAccount = props?.accountOptions.filter(
        (item) => item.default === true
      );

      setIsDisable(false);
      props.setPaymentAccountId(defaultAccount[0].value);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // console.log(["SalePaymentModal", props]);

  return (
    <>
      <div
        className="modal fade"
        id="sale_payment_modal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="sale_payment_modal_label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="sale_payment_modal_label">
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
                disabled={isDisable}
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
    setPaymentAccountId: (account_id) =>
      dispatch({ type: SET_POS_ACCOUNT_ID, payload: { account_id } }),
    setPosAmount: (pos_amount) =>
      dispatch({ type: SET_POS_AMOUNT, payload: { pos_amount } }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;
  const { sale } = store.saleListStore;

  return { posCart, sale };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalePaymentModal);
