import React from 'react';
import {connect} from "react-redux";
import {SET_SALE_RETURN_NOTE} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";

const SaleReturnCalculation = (props) => {
    return (
        <>
            <div className="pos-form-bottom">
                <div className="cart-summary">
                    <div className="row align-items-center">

                        <div className="col-sm-6">
                            <div className="cs-item-wrap">
                                <span className="cs-items">Items:</span>
                                <span className="cs-items-total">Total Item</span>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="cs-amaount-cal">

                                <div className="csac-total">
                                    <span className="csac-total-title">Total</span>
                                    <span className="csac-total-cal">৳ {props.saleReturnCart.sub_total}</span>
                                </div>

                                <div className="csac-coupon">
                                    <span className="csac-coupon-title">Vat/Tax.</span>
                                    <span className="csac-coupon-cal">৳ {props.saleReturnCart.total_tax}</span>
                                </div>

                                <div className="csac-shipping">
                                    <span className="csac-shipping-title">Shipping</span>
                                    <span className="csac-shipping-cost">৳ {props.saleReturnCart.shipping_cost}</span>
                                </div>
                                <div className="csac-discount">
                                    <span className="csac-discount-title">Discount</span>
                                    <span className="csac-discount-cal">- ৳ {props.saleReturnCart.total_discount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="grand-total">
                                <span className="grand-total-wrap">

                                    <span className="grand-total-title">Grand Total</span>
                                    <span className="grand-total-amount">৳ {props.saleReturnCart.grand_total}</span>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <label>Note (if any)</label>
                        <textarea className="form-control"
                                  rows="4"
                                  value={props.saleReturnCart.staff_note}
                                  onChange={(event) => {
                                      event.preventDefault();
                                      props.setNote(event.target.value)
                                  }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

function mapDispatchToProps(dispatch) {

    return {
        setNote: (sale_return_note) => dispatch({type: SET_SALE_RETURN_NOTE, payload: {sale_return_note}}),
    }
}

const mapStateToProps = (store) => {
    const saleReturnCart = store.saleReturnCart;
    return {saleReturnCart};
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnCalculation);