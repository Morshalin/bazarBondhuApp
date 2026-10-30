import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  CLEAR_QUICK_CASH_NOTE,
  POS_CHECKOUT,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_NOTE,
  SET_PAYMENT_STATUS,
  SET_POS_AMOUNT,
  SET_QUICK_CASH_NOTE,
  SET_STAFF_NOTE,
} from "../../../store/pos/actions/posCartActions";
import axios from "axios";
import { useRouter } from "next/router";

const PosModal = (props) => {
  const router = useRouter();

  let flag = false;
  useEffect(() => {
    const posSubmit = (event) => {
      if (event.code === "NumpadEnter") {
        event.preventDefault();
        if (flag) {
          checkOut();
          flag = true;
        }
      }
    };
    document.addEventListener("keydown", posSubmit);
    return () => {
      document.removeEventListener("keydown", posSubmit);
    };
  }, [flag]);

  const checkOut = async () => {
    let response = await axios
      .post(`backend/sales`, props.posCart)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });

    if (response.success) {
      props.posCheckOut();
      $("#checkOutModal").modal("hide");
      router.push(`/admin/pos/invoice/?id=${response.data.id}`);
    }
  };

  return (
    <>
      <div
        className="modal fade pos-custom-modal"
        id="checkOutModal"
        tabIndex="-1"
        aria-labelledby="checkOutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="checkOutModalLabel">
                POS Sale
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-10 col-sm-9 col-9 pr-md-2 pr-1">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={props.posCart.grand_total}
                          value={
                            props.posCart.pos_amount > 0
                              ? props.posCart.pos_amount
                              : ""
                          }
                          onChange={(event) => {
                            event.preventDefault();
                            props.setPosAmount(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Paying On</label>
                        <select
                          className="custom-select"
                          onChange={(event) => {
                            event.preventDefault();
                            props.setPaymentMethod(event.target.value);
                          }}
                          defaultValue={props.posCart.payment_method}
                        >
                          <option value="Cash">Cash</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="bKash">bKash</option>
                          <option value="Rocket">Rocket</option>
                          <option value="Nagad">Nagad</option>
                          <option value="Gift Card">Gift Card</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Payment Status</label>
                        <select
                          className="custom-select"
                          onChange={(event) => {
                            event.preventDefault();
                            props.setPaymentStatus(event.target.value);
                          }}
                          defaultValue={props.posCart.payment_status}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Due">Due</option>
                          <option value="Partial Paid">Partial Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Staff Note"
                      onChange={(event) => {
                        event.preventDefault();
                        props.setStaffNote(event.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Note</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Payment Note"
                      onChange={(event) => {
                        event.preventDefault();
                        props.setPaymentNote(event.target.value);
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table table-bordered checkout_summery">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Total Items</strong>
                              </td>
                              <td className="text-right">
                                <strong>{props.posCart.cart.length}</strong>
                              </td>
                              <td className="text-right">
                                <strong>Total Payable</strong>
                              </td>
                              <td className="text-right">
                                <strong>{props.posCart.grand_total}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total Paying</strong>
                              </td>
                              <td className="text-right">
                                <strong>{props.posCart.pos_amount}</strong>
                              </td>
                              <td className="text-right">
                                <strong>Change Return</strong>
                              </td>
                              <td className="text-right">
                                <strong>{props.posCart.change_return}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-3 col-3 pl-md-2 pl-1">
                  <div className="form-group">
                    <label>Quick Cash</label>
                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                    >
                      <button type="button" className="btn btn-warning">
                        {props.posCart.grand_total}
                      </button>
                      {props.posCart.quick_cash_note &&
                        props.posCart.quick_cash_note.map(
                          (quick_cash, index) => (
                            <button
                              key={index}
                              type="button"
                              className="btn btn-secondary"
                              onClick={(event) => {
                                event.preventDefault();
                                props.setQuickCash(quick_cash.note_amount);
                              }}
                            >
                              {quick_cash.note_amount}
                              {quick_cash.counter > 0 ? (
                                <span className="badge badge-light">
                                  {quick_cash.counter}
                                </span>
                              ) : (
                                ""
                              )}
                            </button>
                          )
                        )}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(event) => {
                          event.preventDefault();
                          props.posCart.grand_total > 0
                            ? props.clearQuickCash()
                            : "";
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary d-block w-100"
                onClick={() => checkOut()}
              >
                Submit
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
    setPosAmount: (pos_amount) =>
      dispatch({ type: SET_POS_AMOUNT, payload: { pos_amount } }),
    setPaymentMethod: (payment_method) =>
      dispatch({ type: SET_PAYMENT_METHOD, payload: { payment_method } }),
    setPaymentStatus: (payment_status) =>
      dispatch({ type: SET_PAYMENT_STATUS, payload: { payment_status } }),
    setStaffNote: (staff_note) =>
      dispatch({ type: SET_STAFF_NOTE, payload: { staff_note } }),
    setPaymentNote: (payment_note) =>
      dispatch({ type: SET_PAYMENT_NOTE, payload: { payment_note } }),
    setQuickCash: (note_amount) =>
      dispatch({ type: SET_QUICK_CASH_NOTE, payload: { note_amount } }),
    clearQuickCash: () => dispatch({ type: CLEAR_QUICK_CASH_NOTE }),
    posCheckOut: () => dispatch({ type: POS_CHECKOUT }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;

  return { posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosModal);
