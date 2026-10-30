import React from 'react';
import {
    SET_PURCHASE_RETURN_RETURN_NOTE,
    SET_PURCHASE_RETURN_STAFF_NOTE
} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";
import {connect} from "react-redux";

const PurchaseReturnCalculation = (props) => {

    return (
        <>
            <div className="pos-form-bottom">
                <div className="cart-summary">
                    <div className="row align-items-center">

                        <div className="col-sm-6">
                            <div className="cs-item-wrap">
                                <span className="cs-items">Items:</span>
                                <span className="cs-items-total">{props.total_qty ?? ''}</span>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="cs-amaount-cal">

                                <div className="csac-total">
                                    <span className="csac-total-title">Total</span>
                                    <span className="csac-total-cal">৳ {props.sub_total ?? ''}</span>
                                </div>

                                <div className="csac-coupon">
                                    <span className="csac-coupon-title">Vat/Tax.</span>
                                    <span className="csac-coupon-cal">৳ {props.total_tax ?? ''}</span>
                                </div>

                                <div className="csac-shipping">
                                    <span className="csac-shipping-title">Shipping</span>
                                    <span className="csac-shipping-cost">৳ {props.shipping_cost ?? ''}</span>
                                </div>

                                <div className="csac-discount">
                                    <span className="csac-discount-title">Discount</span>
                                    <span className="csac-discount-cal">- ৳ {props.total_discount ?? ''}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="grand-total">
                                <span className="grand-total-wrap">

                                    <span className="grand-total-title">Grand Total</span>
                                    <span className="grand-total-amount">৳ {props.grand_total ?? ''}</span>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Staff Note</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={props.staff_note ?? ''}
                            onChange={(event) => {
                                event.preventDefault();
                                props.setStaffNote(event.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Return Note</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            value={props.return_note ?? ''}
                            onChange={(event) => {
                                event.preventDefault();
                                props.setReturnNote(event.target.value);
                            }}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};


const mapStateToProps = (store) => {
    const {
        products,
        staff_note,
        return_note,
        total_qty,
        sub_total,
        grand_total,
        total_discount,
        total_tax,
        shipping_cost
    } = store.purchaseReturnStore;
    return {
        products,
        staff_note,
        return_note,
        total_qty,
        sub_total,
        grand_total,
        total_discount,
        total_tax,
        shipping_cost
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStaffNote: (staff_note) => dispatch({type: SET_PURCHASE_RETURN_STAFF_NOTE, payload: {staff_note}}),
        setReturnNote: (return_note) => dispatch({type: SET_PURCHASE_RETURN_RETURN_NOTE, payload: {return_note}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnCalculation);