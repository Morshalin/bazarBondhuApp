import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  SET_POS_AMOUNT,
  SET_POS_DISCOUNT,
  SET_POS_SHIPPING,
  SET_SEND_INVOICE_LINK,
  SET_WALLET_ADJUSTMENT,
} from "../../../store/pos/actions/posCartActions";

import { useKeyPress } from "../../../Helpers/Utils/Utils";
import { useRouter } from "next/router";

const CartCalculation = (props) => {
  const router = useRouter();
  const orderNumber = router.query?.order_number ?? null;

  let sub_total = 0;
  let total_vat = 0;
  let discount = 0;
  props.cart.length > 0 &&
    props.cart.map((item, index) => {
      sub_total += item.quantity * item.unit_price;
      total_vat += item.quantity * item.vat;
      discount += item.product_discount * item.quantity;
    });

  let delivery_charge = props.delivery_charge ? props.delivery_charge : 0;

  let grand_total = sub_total + delivery_charge - discount;

  useEffect(() => {
    props.setPosAmount(grand_total);
    props.setDiscount(discount);
  }, [grand_total]);

  return (
    <>
      <div className="pos-form-bottom">
        <div className="cart-summary">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <span className="cs-items">Items:</span>
              <span className="cs-items-total"> {props.cart.length}</span>
              <br />
              <span className="cs-items">Wallet: </span>
              <span className="cs-items-total">
                {" "}
                ৳{" "}
                {props.wallet_balance
                  ? props.wallet_balance.toFixed(2)
                  : "0.00"}
              </span>
            </div>

            <div className="col-sm-6">
              <div className="cs-amaount-cal">
                <div className="csac-total">
                  <span className="csac-total-title">Total</span>
                  <span className="csac-total-cal">
                    ৳ {sub_total.toFixed(2)}
                  </span>
                </div>

                <div className="csac-shipping">
                  <span className="csac-shipping-title">Shipping</span>
                  <span className="csac-shipping-cost">
                    <input
                      type="text"
                      placeholder="00.00"
                      value={props.delivery_charge ? props.delivery_charge : ""}
                      onChange={(event) => {
                        event.preventDefault();
                        props.setShipping(event.target.value);
                      }}
                      readOnly={orderNumber}
                    />
                  </span>
                </div>
                <div className="csac-discount">
                  <span className="csac-discount-title">Vat(Included)</span>
                  <span className="csac-discount-cal">
                    <input
                      type="text"
                      placeholder="00.00"
                      value={total_vat.toFixed(2)}
                      disabled={true}
                    />
                  </span>
                </div>
                <div className="csac-discount">
                  <span className="csac-discount-title">Discount</span>
                  <span className="csac-discount-cal">
                    <input
                      type="text"
                      placeholder="00.00"
                      //  value={props.discount ? props.discount : ''}
                      //   value={discount}
                      onChange={(event) => {
                        event.preventDefault();
                        props.setDiscount(event.target.value);
                      }}
                      readOnly={true}
                      value={props.discount ? props.discount : ""}
                    />
                  </span>
                </div>
                <div className="csac-discount">
                  <span className="grand-total-title">Grand Total</span>
                  <span className="grand-total-amount">
                    {grand_total.toFixed(2)}
                  </span>
                </div>
                <div className="csac-discount">
                  <span className="csac-discount-title">Total Paying</span>
                  <span className="csac-discount-cal">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={props.pos_amount ? props.pos_amount : ""}
                      onChange={(event) => {
                        event.preventDefault();
                        props.setPosAmount(event.target.value);
                      }}
                      readOnly={orderNumber}
                    />
                  </span>
                </div>
                <div className="csac-discount">
                  <span className="csac-discount-title">Send Invoice Link</span>
                  <span className="csac-discount-cal">
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={props.send_invoice_link}
                      name="send_invoice_link"
                      id="send_invoice_link"
                      onChange={(event) => {
                        props.setInvoiceLink(!props.send_invoice_link);
                      }}
                      disabled={orderNumber}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-sm-6">
                            <div className="grand-total">
                              <span className="grand-total-wrap" style={{width: "auto"}}>
                                <span className="grand-total-title">Wallet Adjustment: </span>
                                <span
                                    className="grand-total-amount">৳ {(props.pos_amount - grand_total).toFixed(2)}</span>
                                  <input
                                      type="checkbox"
                                      className="ml-2"
                                      checked={props.wallet_adjustment}
                                      name="wallet_balance"
                                      id="wallet_balance"
                                      onChange={(event) => {
                                          props.setWalletAdjustment(!props.wallet_adjustment);
                                      }}
                                  />
                              </span>
                            </div>
                        </div> */}
            <div className="col-sm-12">
              <div className="grand-total">
                <span className="grand-total-wrap">
                  <span className="grand-total-title">
                    {grand_total - props.pos_amount > 0 ? "Due" : "Return"}
                  </span>
                  <span className="grand-total-amount">
                    ৳ {(grand_total - props.pos_amount).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  const {
    cart,
    sub_total,
    delivery_charge,
    discount,
    pos_amount,
    grand_total,
    wallet_balance,
    send_invoice_link,
    wallet_adjustment,
  } = store.posCart;
  return {
    cart,
    sub_total,
    delivery_charge,
    discount,
    pos_amount,
    grand_total,
    wallet_balance,
    send_invoice_link,
    wallet_adjustment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPosAmount: (pos_amount) =>
      dispatch({ type: SET_POS_AMOUNT, payload: { pos_amount } }),
    setDiscount: (discount) =>
      dispatch({ type: SET_POS_DISCOUNT, payload: { discount } }),
    setShipping: (delivery_charge) =>
      dispatch({ type: SET_POS_SHIPPING, payload: { delivery_charge } }),
    setWalletAdjustment: (wallet_adjustment) =>
      dispatch({
        type: SET_WALLET_ADJUSTMENT,
        payload: { wallet_adjustment },
      }),
    setInvoiceLink: (send_invoice_link) =>
      dispatch({
        type: SET_SEND_INVOICE_LINK,
        payload: { send_invoice_link },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCalculation);
