import React from 'react';
import {connect} from "react-redux";
import {SET_ADJUSTMENT_DATE, SET_REFERENCE_NO} from "../../../../store/admin/actions/adjustment/adjustmentAction";

const AdjustmentDate = (props) => {
    return (
        <>
            <div className="row">
                <div className="col-sm-12">

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Adjustment Date</label>
                                <input
                                    type="date"
                                    name="adjustment_date"
                                    value={props.adjustment_date}
                                    onChange={(e) => {
                                        props.setAdjustmentDate(e.currentTarget.value);
                                    }}
                                    className="form-control rounded-0"/>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Reference No.</label>
                                <input
                                    name="reference_no"
                                    type="text"
                                    value={props.reference_no}
                                    className={`form-control rounded-0`}
                                    onChange={(e) => {
                                        props.setReferenceNo(e.currentTarget.value);
                                    }}
                                    placeholder="Reference No."/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {adjustment_date, reference_no} = store.adjustmentProduct;
    return {adjustment_date, reference_no};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAdjustmentDate: (adjustment_date) => dispatch({type: SET_ADJUSTMENT_DATE, payload: {adjustment_date}}),
        setReferenceNo: (reference_no) => dispatch({type: SET_REFERENCE_NO, payload: {reference_no}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdjustmentDate);