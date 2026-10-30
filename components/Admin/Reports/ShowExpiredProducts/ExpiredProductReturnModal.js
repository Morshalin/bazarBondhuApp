import React from 'react';
import {connect} from "react-redux";
import {
    SET_RETURN_ERRORS,
    SET_RETURN_NOTE,
    SET_RETURN_QUANTITY,
    UPDATE_EXPIRED_PRODUCT_LIST
} from "../../../../store/admin/actions/expiredProduct/expiredProductListAction";
import {saveAction} from "../../../../Helpers/Utils/Utils";

const ExpiredProductReturnModal = (props) => {

    const submitPurchaseReturn = (e) => {
        e.preventDefault();

        let mounted = true;

        mounted && saveAction(`backend/removeExpiredProduct`, props.purchaseItem)
            .then((res) => {
                if (res.success) {
                    console.log(res.data);
                    props.updateExpiredProductList(res.data);
                    hideModal();
                } else {
                    props.setErrors(res.errors);
                }
            }).finally(() => mounted = false);
    }

    const hideModal = () => {
        $('#expiredProductReturnModal').modal('hide');
    }

    return (
        <>
            <div className="modal fade" id="expiredProductReturnModal" tabIndex="-1"
                 aria-labelledby="expiredProductReturnModalLabel"
                 aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0 border-0">

                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="expiredProductReturnModalLabel">{props?.purchaseItem?.return_type}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="row">

                                <div className="col-xl-6 col-lg-6 col-md-6  mb-2">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">

                                                <img
                                                    src={props?.purchaseItem?.image}
                                                    height="auto"
                                                    width="100%"
                                                    alt="Product Img"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 mt-3">
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Item
                                                    Name: {props?.purchaseItem?.name}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Purchase Price:
                                                    ৳ {props?.purchaseItem?.purchase_price}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Purchase
                                                    Quantity: {props?.purchaseItem?.purchase_quantity}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    <div className="form-group">

                                        <label>Quantity *</label>

                                        <input
                                            type="text"
                                            value={isNaN(props?.purchaseItem?.return_quantity) ? '' : props?.purchaseItem?.return_quantity}
                                            className={`form-control ${props?.errors?.return_quantity ? `is-invalid` : ``}`}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                props.setReturnQuantity(e.target.value);
                                            }}
                                            required/>

                                        <div
                                            className={props?.errors?.return_quantity ? `invalid-feedback` : ``}>
                                            {props?.errors?.return_quantity}
                                        </div>

                                    </div>
                                </div>


                                <div className="col-xl-12 col-lg-12 col-md-12">

                                    <div className="form-group">
                                        <label htmlFor="notePurchaseAction">Note</label>

                                        <textarea
                                            onChange={(e) => {
                                                e.preventDefault();
                                                props.setReturnNote(e.target.value);
                                            }}
                                            value={props?.purchaseItem?.note}
                                            className="form-control"
                                            id="notePurchaseAction"
                                            rows="3"/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-danger rounded-0"
                                data-dismiss="modal">
                                Cancel
                            </button>

                            <button
                                onClick={submitPurchaseReturn}
                                type="button"
                                className="btn btn-primary rounded-0">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {purchaseItem, errors} = store.expiredProductListStore;
    return {purchaseItem, errors};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setReturnNote: (note) => dispatch({type: SET_RETURN_NOTE, payload: {note}}),
        setReturnQuantity: (return_quantity) => dispatch({type: SET_RETURN_QUANTITY, payload: {return_quantity}}),
        setErrors: (errors) => dispatch({type: SET_RETURN_ERRORS, payload: {errors}}),
        updateExpiredProductList: (product) => dispatch({type: UPDATE_EXPIRED_PRODUCT_LIST, payload: {product}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExpiredProductReturnModal);
