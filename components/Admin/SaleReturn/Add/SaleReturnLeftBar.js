import React, {useEffect} from 'react';
import {
    SET_SALE_RETURN_DATE, SET_SALE_RETURN_REFERENCE_NO,
    SET_SALE_RETURN_SHIPPING_COST,
    SET_SALE_RETURN_TOTAL_DISCOUNT,
    SET_SALE_RETURN_TOTAL_TAX
} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";
import {connect} from "react-redux";


const SaleReturnLeftBar = (props) => {
    console.log(props.saleReturnCart)
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

                            <label>Date *</label>

                            <input type="date"
                                   className="form-control"
                                   defaultValue={props.saleReturnCart.return_date}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setDate(event.target.value)
                                   }}
                                   required/>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Reference No *</label>
                            <input type="text"
                                   className="form-control"
                                   value={props.saleReturnCart.reference_no}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setReference(event.target.value)
                                   }}
                                   placeholder="Invoice Number"
                                   required/>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Status *</label>
                            <select className="form-control"
                                value = {props.saleReturnCart.status}
                                onChange={(event) => {
                                    event.preventDefault();
                                    props.setStatus(event.target.value)
                                }}
                            >
                                <option value="">Select one</option>
                                <option value="Received">Received</option>
                                <option value="Pending">Pending</option>
                                <option value="Ordered">Ordered</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Attach Document</label>
                            <div className="custom-file">
                                <input type="file"
                                       className="custom-file-input"
                                       name="image"
                                       onChange={(event) => {
                                           event.preventDefault();
                                           props.setDocument(event.target.value)
                                       }}
                                       id="customFile"/>
                                <label className="custom-file-label"
                                       htmlFor="customFile">Choose file</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Order VAT/Tax</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="0.00"
                                   value={props.saleReturnCart.total_tax}
                                   onChange={(event) => {
                                       event.preventDefault();
                                      props.setTax(event.target.value)
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
                                   value={props.saleReturnCart.total_discount}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setDiscount(event.target.value)
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
                                   value={props.saleReturnCart.shipping_cost}
                                   onChange={(event) => {
                                       event.preventDefault();
                                       props.setShipping(event.target.value)
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};


function mapDispatchToProps(dispatch) {

    return {
        setDate: (date) => dispatch({type: SET_SALE_RETURN_DATE, payload: {date}}),
        setTax: (total_tax) => dispatch({type: SET_SALE_RETURN_TOTAL_TAX, payload: {total_tax}}),
        setDiscount: (total_discount) => dispatch({type: SET_SALE_RETURN_TOTAL_DISCOUNT, payload: {total_discount}}),
        setShipping: (shipping_cost) => dispatch({type: SET_SALE_RETURN_SHIPPING_COST, payload: {shipping_cost}}),
        setReference: (reference_no) => dispatch({type: SET_SALE_RETURN_REFERENCE_NO, payload: {reference_no}}),
        setStatus: (status) => dispatch({type: SET_SALE_RETURN_REFERENCE_NO, payload: {status}}),
        setDocument: (document) => dispatch({type: SET_SALE_RETURN_REFERENCE_NO, payload: {document}}),
    }
}
const mapStateToProps = (store) => {
    const saleReturnCart = store.saleReturnCart;
    return {saleReturnCart};
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnLeftBar);