import React from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {
    ADJUSTMENT_SUCCESS,
    RESET_ADJUSTMENT_STORE,
    SET_ERROR_MESSAGE,
    SET_ERRORS,
    SET_SUCCESS_MESSAGE
} from "../../../../store/admin/actions/adjustment/adjustmentAction";

const SubmitAdjustment = (props) => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        let fromData = new FormData();

        let total_qty = props.products.reduce((initialValue, {qty}) => initialValue + qty, 0);

        fromData.append('products', JSON.stringify(props.products));
        fromData.append('document', props.document);
        fromData.append('note', props.note);
        fromData.append('total_qty', parseFloat(total_qty));
        fromData.append('adjustment_date', props.adjustment_date);
        fromData.append('reference_no', props.reference_no);

        const config = {
            headers: {
                'content-type': 'multipart/form-data;'
            }
        }

        let response = await axios.post(`backend/adjustments`, fromData, config).then((result) => {
            return result.data;
        }).catch((error) => {
            return error;
        });

        if (response.success) {
            props.setSuccessMessage(response.message);
            props.adjustmentSuccess();

        } else {
            props.setErrors(response.errors);
            props.setErrorMessage(response.message);
        }

        setTimeout(() => {
            props.setErrorMessage('');
            props.setSuccessMessage('');
            props.setErrors('');
        }, 5000);
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between final-actions">

                        <button className="btn btn-reset" onClick={props.resetAdjustmentStore}>
                            <i className="icon-cross"/>
                            <span>Reset</span>
                        </button>

                        <button className="btn btn-submit"
                                onClick={handleSubmit}>
                            <i className="icon-checkmark"/>
                            <span>Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = (store) => {
    const {products, document, note, adjustment_date, reference_no} = store.adjustmentProduct;
    return {products, document, note, adjustment_date, reference_no};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setErrors: (errors) => dispatch({type: SET_ERRORS, payload: {errors}}),
        setSuccessMessage: (success_message) => dispatch({type: SET_SUCCESS_MESSAGE, payload: {success_message}}),
        setErrorMessage: (error_message) => dispatch({type: SET_ERROR_MESSAGE, payload: {error_message}}),
        adjustmentSuccess: () => dispatch({type: ADJUSTMENT_SUCCESS}),
        resetAdjustmentStore: () => dispatch({type: RESET_ADJUSTMENT_STORE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitAdjustment);