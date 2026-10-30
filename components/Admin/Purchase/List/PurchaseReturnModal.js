import React from 'react';
import {connect} from "react-redux";
import {
    SET_PURCHASE_ACTION_NOTE,
    SET_PURCHASE_ACTION_QUANTITY,
    SET_PURCHASE_RETURN_ERRORS, UPDATE_PURCHASE
} from "../../../../store/admin/actions/purchase/purchaseListAction";
import {saveAction} from "../../../../Helpers/Utils/Utils";

const PurchaseReturnModal = (props) => {

    const submitPurchaseReturn = (e) => {
        e.preventDefault();

        let mounted = true;

        mounted && saveAction(`backend/purchaseReturn`, props.purchaseItem)
            .then((res) => {
                if (res.success) {
                    props.updatePurchase(res.data);
                    hideModal();
                } else {
                    props.setPurchaseReturnErrors(res.errors);
                }
            }).finally(() => mounted = false);
    }

    const hideModal = () => {
        $('#purchaseReturnModal').modal('hide');
    }


    return (
        <>
            <div className="modal fade" id="purchaseReturnModal" tabIndex="-1"
                 aria-labelledby="purchaseReturnModalLabel"
                 aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0 border-0">

                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="purchaseReturnModalLabel">{props?.purchaseItem?.return_type}</h5>
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
                                                props.setPurchaseActionQuantity(e.target.value);
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
                                                props.setPurchaseActionNote(e.target.value);
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
    const {purchaseItem, errors, purchase} = store.purchaseListStore;
    return {purchaseItem, errors, purchase};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPurchaseActionNote: (note) => dispatch({type: SET_PURCHASE_ACTION_NOTE, payload: {note}}),
        setPurchaseActionQuantity: (return_quantity) => dispatch({
            type: SET_PURCHASE_ACTION_QUANTITY,
            payload: {return_quantity}
        }),
        setPurchaseReturnErrors: (errors) => dispatch({type: SET_PURCHASE_RETURN_ERRORS, payload: {errors}}),
        updatePurchase: (purchase) => dispatch({type: UPDATE_PURCHASE, payload: {purchase}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnModal);
