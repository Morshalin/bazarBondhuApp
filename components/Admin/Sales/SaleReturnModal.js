import React from 'react';
import {connect} from "react-redux";
import {
    SET_SALE_RETURN_ERRORS,
    SET_SALE_RETURN_NOTE,
    SET_SALE_RETURN_QUANTITY,
    UPDATE_SALE
} from "../../../store/admin/actions/sale/saleListAction";
import {saveAction} from "../../../Helpers/Utils/Utils";

const SaleReturnModal = (props) => {

    const submitSaleReturn = (e) => {
        e.preventDefault();

        saveAction(`backend/saleReturn`, props.saleItem)
            .then((res) => {
                if (res.success) {
                    props.updateSale(res.data);
                    hideModal();
                } else {
                    props.setSaleReturnErrors(res.errors);
                }
            }).catch((err) => {
            console.log(err);
        });
    }

    const hideModal = () => {
        $('#saleReturnModal').modal('hide');
    }

    return (
        <>
            <div className="modal fade" id="saleReturnModal" tabIndex="-1"
                 aria-labelledby="saleReturnModalLabel"
                 aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0 border-0">

                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="saleReturnModalLabel">{props?.saleItem?.return_type}</h5>
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
                                                    src={props?.saleItem?.image}
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
                                                    Name: {props?.saleItem?.name}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Selling Price:
                                                    ৳{props?.saleItem?.selling_price}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Selling
                                                    Quantity: {props?.saleItem?.selling_quantity}
                                                </h6>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <h6>
                                                    Customer Name: {props?.saleItem?.customer_name}
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
                                            value={isNaN(props?.saleItem?.return_quantity) ? '' : props?.saleItem?.return_quantity}
                                            className={`form-control ${props?.errors?.return_quantity ? `is-invalid` : ``}`}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                props.setSaleReturnQuantity(e.target.value);
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
                                                props.setSaleReturnNote(e.target.value);
                                            }}
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
                                onClick={submitSaleReturn}
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
    const {saleItem, errors} = store.saleListStore;
    return {saleItem, errors};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSaleReturnQuantity: (return_quantity) => dispatch({
            type: SET_SALE_RETURN_QUANTITY,
            payload: {return_quantity}
        }),
        setSaleReturnNote: (note) => dispatch({type: SET_SALE_RETURN_NOTE, payload: {note}}),
        setSaleReturnErrors: (errors) => dispatch({type: SET_SALE_RETURN_ERRORS, payload: {errors}}),
        updateSale: (sale) => dispatch({type: UPDATE_SALE, payload: {sale}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnModal);
