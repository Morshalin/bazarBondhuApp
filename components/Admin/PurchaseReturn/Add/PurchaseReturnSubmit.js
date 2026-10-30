import React from 'react';
import {connect} from "react-redux";
import {
    RESET_PURCHASE_RETURN,
    SAVE_PURCHASE_RETURN,
    SET_PURCHASE_RETURN_ERROR_MESSAGE,
    SET_PURCHASE_RETURN_ERRORS,
    SET_PURCHASE_RETURN_SUCCESS_MESSAGE
} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";
import axios from "axios";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const PurchaseReturnSubmit = (props) => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('products', JSON.stringify(props.products));
        formData.append('reference_no', props.reference_no);
        formData.append('warehouse_id', props.warehouse_id);
        formData.append('supplier_id', props.supplier_id);
        formData.append('total_qty', props.total_qty);
        formData.append('total_discount', props.total_discount);
        formData.append('total_tax', props.total_tax);
        formData.append('shipping_cost', props.shipping_cost);
        formData.append('sub_total', props.sub_total);
        formData.append('grand_total', props.grand_total);
        formData.append('return_note', props.return_note);
        formData.append('staff_note', props.staff_note);
        formData.append('document', props.document);
        formData.append('status', props.status);
        formData.append('return_date', props.return_date);

        const config = {
            headers: {
                'content-type': 'multipart/form-data;'
            }
        }

        let response = await axios.post(`backend/purchase_returns`, formData, config)
            .then((response) => response.data).catch(errors => errors);

        console.log(response);

        if (response.success) {
            props.resetPurchaseReturn();
            props.setSuccessMessage(response.message);
        } else {
            props.setErrors(response.errors);
            props.setErrorMessage(response.message);
        }

        setTimeout(() => {
            props.setErrorMessage('');
            props.setSuccessMessage('');
        }, 5000);
    }

    return (
        <>

            {props.success_message && <Success message={props.success_message}/>}
            {props.error_message && <Error message={props.error_message}/>}

            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between final-actions">
                        <button className="btn btn-reset"
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.resetPurchaseReturn();
                                }}>
                            <i className="icon-cross"/>
                            <span>Reset</span>
                        </button>

                        <button className="btn btn-submit"
                                onClick={handleSubmit} disabled={(props.sub_total > 0) ? false : true}>
                            <i className="icon-checkmark"/>
                            <span>Submit</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setErrors: (errors) => dispatch({type: SET_PURCHASE_RETURN_ERRORS, payload: {errors}}),
        setSuccessMessage: (success_message) => dispatch({
            type: SET_PURCHASE_RETURN_SUCCESS_MESSAGE,
            payload: {success_message}
        }),
        setErrorMessage: (error_message) => dispatch({
            type: SET_PURCHASE_RETURN_ERROR_MESSAGE,
            payload: {error_message}
        }),
        resetPurchaseReturn: () => dispatch({type: RESET_PURCHASE_RETURN})
    }
}

const mapStateToProps = (store) => {
    const {
        products,
        reference_no,
        warehouse_id,
        supplier_id,
        total_qty,
        total_discount,
        total_tax,
        shipping_cost,
        sub_total,
        grand_total,
        return_note,
        staff_note,
        document,
        status,
        return_date,
        success_message,
        error_message
    } = store.purchaseReturnStore;

    return {
        products,
        reference_no,
        warehouse_id,
        supplier_id,
        total_qty,
        total_discount,
        total_tax,
        shipping_cost,
        sub_total,
        grand_total,
        return_note,
        staff_note,
        document,
        status,
        return_date,
        success_message,
        error_message
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnSubmit);