import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {ADD_PURCHASE_DISCOUNT, ADD_PURCHASE_NOTE} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";

const PurchaseCalculation = (props) => {

    let sub_total = (props.products.length > 0) ? props.products.reduce((sum, {
        unit_price,
        quantity
    }) => sum += (unit_price * quantity), 0) : 0;

    useEffect(() => {
        (!sub_total) && props.addPurchaseDiscount('');
        if (props.total_discount >= sub_total) {
            props.addPurchaseDiscount('');
        }
    }, [sub_total, props.total_discount]);

    return (
        <>
            <div className="pos-form-bottom">
                <div className="cart-summary">
                    <div className="row align-items-center">

                        <div className="col-sm-6">
                            <div className="cs-item-wrap">
                                <span className="cs-items">Items:</span>
                                <span className="cs-items-total">{props.products.length}</span>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="cs-amaount-cal">

                                <div className="csac-total">
                                    <span className="csac-total-title">Total</span>
                                    <span className="csac-total-cal">৳ {sub_total.toFixed(2)}</span>
                                </div>

                                <div className="csac-discount">
                                    <span className="csac-discount-title">Discount</span>
                                    <span className="csac-discount-cal">
                                        <input
                                            readOnly={!sub_total}
                                            type="text"
                                            placeholder="00.00"
                                            value={sub_total ? props.total_discount : ''}
                                            onChange={(event) => {
                                                event.preventDefault();
                                                props.addPurchaseDiscount(event.target.value);
                                            }}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="grand-total">
                                <span className="grand-total-wrap">

                                    <span className="grand-total-title">Grand Total</span>
                                    {
                                        (sub_total > props.total_discount) ? (
                                            <span
                                                className="grand-total-amount">
                                                ৳ {((sub_total && props.total_discount) ? (sub_total - props.total_discount) : sub_total).toFixed(2)}
                                            </span>
                                        ) : (
                                            <span
                                                className="grand-total-amount">
                                                 ৳ {sub_total}
                                            </span>
                                        )
                                    }

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
                        <textarea
                            className="form-control"
                            rows="4"
                            value={props.purchase_note}
                            onChange={(event) => {
                                event.preventDefault();
                                props.addPurchaseNote(event.target.value);
                            }}/>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (store) => {
    const {products, purchase_note, total_discount} = store.uPurchaseCart;
    return {products, purchase_note, total_discount};
}
const mapDispatchToProps = (dispatch) => {

    return {
        addPurchaseNote: (purchase_note) => dispatch({type: ADD_PURCHASE_NOTE, payload: {purchase_note}}),
        addPurchaseDiscount: (total_discount) => dispatch({
            type: ADD_PURCHASE_DISCOUNT,
            payload: {total_discount}
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCalculation);