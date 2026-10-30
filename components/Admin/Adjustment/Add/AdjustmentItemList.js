import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    ATTACHED_DOCUMENT,
    CHANGE_ACTION,
    CHANGE_QUANTITY,
    REMOVE_ADJUSTMENT,
    SET_ERROR_MESSAGE,
    SET_ERRORS,
    SET_NOTE,
    SET_SUCCESS_MESSAGE,
} from "../../../../store/admin/actions/adjustment/adjustmentAction";
import Error from "../../Notification/Error";
import Success from "../../Notification/Success";

const AdjustmentItemList = (props) => {


    useEffect(() => {
        const bsCustomFileInput = require("bs-custom-file-input");
        bsCustomFileInput.init();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;

        if (name === "document") {
            props.attachedDocument(e.currentTarget.files[0]);
        } else {
            props.addNote(e.target.value);
        }
    }

    return (
        <>
            {props.success_message && <Success message={props.success_message}/>}
            {props.error_message && <Error message={props.error_message}/>}

            <div className="row">
                <div className="col-sm-12">
                    <div className="table-responsive custom-table mb-2">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">
                                    Product (Name - Code){" "}
                                    <i className="fas fa-sort-amount-up-alt"/>
                                </th>
                                <th scope="col">Purchase Qty</th>
                                <th scope="col">Selling Qty</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                                <th scope="col">
                                    <i className="fas fa-trash"></i>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.products &&
                            props.products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={product.image} alt=""/>
                                    </td>

                                    <td className="nowrap">
                                        {product.name} ({product.barcode})
                                    </td>

                                    <td className="text-center">{product.purchase_qty}</td>

                                    <td className="text-center">{product.selling_qty}</td>

                                    <td className="text-center">{product.stock}</td>

                                    <td className={`text-center`}>
                                        <input
                                            type="number"
                                            placeholder={'00'}
                                            value={product.qty ? product.qty : ''}
                                            onChange={(event) => {
                                                props.changeQty(product.id, event.target.value);
                                            }}
                                        />

                                    </td>

                                    <td>
                                        <select
                                            value={product.action}
                                            onChange={(event) => {
                                                event.preventDefault();
                                                props.changeAction(product.id, event.currentTarget.value);
                                            }}
                                            className="custom-select">
                                            <option value="Subtraction">Subtraction</option>
                                            <option value="Addition">Addition</option>
                                        </select>
                                    </td>

                                    <td className="actions">
                                        <div className="action-wrap">
                                            <button
                                                className="action-delete"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    props.removeAdjustment(product.id);
                                                }}>
                                                <i className="icon-bin"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Attach Document</label>
                        <div className="custom-file">

                            <input
                                type="file"
                                className={`custom-file-input`}
                                onChange={handleChange}
                                name={"document"}/>

                            <label className="custom-file-label" htmlFor="document">
                                <span className="d-inline-block text-truncate w-75" id={'document_input_field'}>
                                    doc, pdf, or image
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="form-group">

                        <label htmlFor="note">
                            Note
                        </label>

                        <textarea
                            className={`form-control`}
                            id="note"
                            onChange={handleChange}
                            name="note"
                            rows="6"
                            value={props.note}
                            placeholder="Note"/>
                    </div>
                </div>

            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAdjustment: (id) => dispatch({type: REMOVE_ADJUSTMENT, payload: {id}}),
        changeQty: (id, qty) => dispatch({type: CHANGE_QUANTITY, payload: {id, qty}}),
        changeAction: (id, action) => dispatch({type: CHANGE_ACTION, payload: {id, action}}),
        attachedDocument: (attached_file) => dispatch({type: ATTACHED_DOCUMENT, payload: {attached_file}}),
        addNote: (note) => dispatch({type: SET_NOTE, payload: {note}}),
        setErrors: (errors) => dispatch({type: SET_ERRORS, payload: {errors}}),
        setSuccessMessage: (success_message) => dispatch({type: SET_SUCCESS_MESSAGE, payload: {success_message}}),
        setErrorMessage: (error_message) => dispatch({type: SET_ERROR_MESSAGE, payload: {error_message}}),
    };
};

const mapStateToProps = (store) => {
    const {products, document, note, success_message, error_message, errors} = store.adjustmentProduct;
    return {products, document, note, success_message, error_message, errors};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdjustmentItemList);
