import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    ATTACHED_PURCHASE_RETURN_DOCUMENT,
    SET_PURCHASE_RETURN_DATE,
    SET_PURCHASE_RETURN_REFERENCE_NO,
    SET_PURCHASE_RETURN_SHIPPING_COST,
    SET_PURCHASE_RETURN_STATUS,
    SET_PURCHASE_RETURN_TOTAL_DISCOUNT,
    SET_PURCHASE_RETURN_TOTAL_TAX
} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";

const PurchaseReturnLeftBar = (props) => {

    useEffect(() => {
        const bsCustomFileInput = require("bs-custom-file-input");
        bsCustomFileInput.init();
    }, []);

    return (
        <>
            <form>
                <div className="row">
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">

                            <label>Date  <span className="text-danger"> * </span></label>

                            <input type="date"
                                   className={`form-control ${props.errors.return_date_error ? `is-invalid` : ``}`}
                                   value={props.return_date ?? ''}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setReturnDate(event.target.value);
                                   }}
                                   required/>

                            <div
                                className={props.errors.return_date_error ? `invalid-feedback` : `d-none`}>
                                {props.errors.return_date_error}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Reference No  <span className="text-danger"> * </span></label>
                            <input type="text"
                                   className={`form-control ${props.errors.reference_no_error ? `is-invalid` : ``}`}
                                   value={props.reference_no ?? ""}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setReferenceNo(event.target.value);
                                   }}
                                   placeholder="Reference Number"
                                   required/>

                            <div
                                className={props.errors.reference_no_error ? `invalid-feedback` : `d-none`}>
                                {props.errors.reference_no_error}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Status  <span className="text-danger"> * </span></label>
                            <select
                                className={`form-control ${props.errors.status_error ? `is-invalid` : ``}`}
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.setReturnStatus(event.target.value);
                                }}>
                                <option value="">Select one</option>
                                <option value="Received">Received</option>
                                <option value="Refund">Refund</option>
                                <option value="Due">Due</option>
                            </select>

                            <div
                                className={props.errors.status_error ? `invalid-feedback` : `d-none`}>
                                {props.errors.status_error}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">

                            <label>Attach Document</label>
                            <div className="custom-file">
                                <input type="file"
                                       className={`custom-file-input form-control ${props.errors.document_error ? `is-invalid` : ``}`}
                                       name="document"
                                       onChange={(event) => {
                                           event.preventDefault();
                                           props.attachedDocument(event.target.files[0]);
                                       }}
                                       id="customFile"/>
                                <label className="custom-file-label"
                                       htmlFor="customFile">Choose file</label>
                                <div
                                    className={props.errors.document_error ? `invalid-feedback` : `d-none`}>
                                    {props.errors.document_error}
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Order VAT/Tax</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="0.00"
                                   value={props.total_tax ?? ''}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setReturnTax(event.target.value);
                                   }}
                            />
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Total Discount</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="0.00"
                                   value={props.total_discount ?? ''}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setTotalDiscount(event.target.value);
                                   }}
                            />
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Shipping Cost</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="0.00"
                                   value={props.shipping_cost ?? ''}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setShippingCost(event.target.value);
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = (store) => {
    const {
        return_date,
        reference_no,
        status,
        document,
        total_tax,
        total_discount,
        shipping_cost,
        errors
    } = store.purchaseReturnStore;

    return {
        return_date,
        reference_no,
        status,
        document,
        total_tax,
        total_discount,
        shipping_cost,
        errors
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setReturnDate: (return_date) => dispatch({
            type: SET_PURCHASE_RETURN_DATE,
            payload: {return_date}
        }),
        setReferenceNo: (reference_no) => dispatch({
            type: SET_PURCHASE_RETURN_REFERENCE_NO,
            payload: {reference_no}
        }),
        setReturnStatus: (status) => dispatch({
            type: SET_PURCHASE_RETURN_STATUS,
            payload: {status}
        }),
        attachedDocument: (document) => dispatch({
            type: ATTACHED_PURCHASE_RETURN_DOCUMENT,
            payload: {document}
        }),
        setReturnTax: (total_tax) => dispatch({
            type: SET_PURCHASE_RETURN_TOTAL_TAX,
            payload: {total_tax}
        }),
        setTotalDiscount: (total_discount) => dispatch({
            type: SET_PURCHASE_RETURN_TOTAL_DISCOUNT,
            payload: {total_discount}
        }),
        setShippingCost: (shipping_cost) => dispatch({
            type: SET_PURCHASE_RETURN_SHIPPING_COST,
            payload: {shipping_cost}
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnLeftBar);