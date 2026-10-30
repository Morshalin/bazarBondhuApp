import React from 'react';
import {RESET_SALE_RETURN} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";
import {connect} from "react-redux";
import axios from "axios";

const SaleReturnSubmit = (props) => {
    const submit = async () => {
        console.log('submit data',props.saleReturnCart)
        let response = await axios.post(`backend/sale_returns`, props.saleReturnCart, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        })
            .then((result) => {
                return result.data;
            }).catch((error) => {
                return error;
            });

        if (response.success) {
            props.reSetDate()
        } else {

        }
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between final-actions">
                        <button className="btn btn-reset"
                                onClick={(event) => {
                                    event.preventDefault();
                                    props.reSetDate()
                                }}
                        >
                            <i className="icon-cross"/>
                            <span>Reset</span>
                        </button>
                        <button className="btn btn-submit"
                                onClick={(event) => {
                                    event.preventDefault();
                                    submit()
                                }}>
                            <i className="icon-checkmark"/>
                            <span>Submit</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

function mapDispatchToProps(dispatch) {

    return {
        reSetDate: () => dispatch({type: RESET_SALE_RETURN, payload: {}}),
    }
}
const mapStateToProps = (store) => {
    const saleReturnCart = store.saleReturnCart;
    return {saleReturnCart};
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnSubmit);