import React, {useState} from 'react';
import {
    EDIT_SUPPLIER,
    REMOVE_CONTACT_ITEMS,
    RESET_SUPPLIER_DATA,
    RESET_SUPPLIER_MESSAGE,
    SET_SUPPLIER_CONTACTS,
    SET_SUPPLIER_DATA,
    SET_SUPPLIER_ERRORS,
    SET_SUPPLIER_MESSAGE,
    UPDATE_SUPPLIER_CONTACT
} from "../../../../store/admin/actions/supplier/supplierActions";
import {connect} from "react-redux";
import {ERROR, saveAction, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";
import {ADD_SELECTED_SUPPLIER} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";

const AddSupplierModal = (props) => {

    const [isValue, setIsValue] = useState(false);

    const [clientErrors, setClientErrors] = useState({
        mobile: '',
        mobile_number: '',
        telephone_number: ''
    });

    const saveSupplier = (e) => {
        e.preventDefault();

        if (props.supplier_id) {
            updateAction(`backend/suppliers/${props.supplier_id}`, props.supplierData)
                .then((res) => {
                    if (res.success) {
                        props.setMessage(SUCCESS, res.message);
                        props.addSelectedSupplier({value: res.data.id, label: res.data.name});
                        setTimeout(() => props.resetSupplierData(), 2000);
                        hideModal();
                    } else {
                        props.setMessage(ERROR, res.message);
                        props.setErrors(res.errors);
                        setTimeout(() => props.resetMessage(), 2000)
                    }
                })
        } else {
            saveAction(`backend/suppliers`, props.supplierData)
                .then((res) => {
                    if (res.success) {
                        props.setMessage(SUCCESS, res.message);
                        props.addSelectedSupplier({value: res.data.id, label: res.data.name});
                        setTimeout(() => props.resetSupplierData(), 2000);
                        hideModal();
                    } else {
                        props.setMessage(ERROR, res.message);
                        props.setErrors(res.errors);
                        setTimeout(() => props.resetMessage(), 2000)
                    }
                });
        }
    }

    const mobilePhoneValidation = (e) => {

        let msg = 'Please enter only number.';

        let isError = false;

        if (typeof e.target.value !== "undefined") {

            let pattern = new RegExp("^[0-9-]*$");

            if (!pattern.test(e.target.value)) {
                setClientErrors((oldErrors) => {
                    return {
                        ...oldErrors,
                        [e.target.name]: msg
                    }
                });
                isError = true;
            } else {
                setClientErrors((oldErrors) => {
                    return {
                        ...oldErrors,
                        [e.target.name]: ''
                    }
                });

                isError = false;
            }
        }

        return isError;
    }

    const hideModal = () => {
        $('#add_supplier_modal').modal('hide');
    }

    return (
        <>
            <div
                className="modal fade"
                id="add_supplier_modal"
                tabIndex="-1"
                aria-labelledby="addSupplierModal"
                aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="addSupplierModal">{props.supplier_id ? `Edit` : `Add`} Supplier</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-0">

                            <div className="custom-card-box-content">


                                <div className="card">

                                    <div className="card-header">
                                        <div className="fbh-title">
                                            <h6>Contacts</h6>
                                        </div>

                                    </div>

                                    <div className="card-body">
                                        <div className="form-group">

                                            <div className="row">
                                                <div
                                                    className="col-sm-12">
                                                    <div
                                                        className="table-responsive custom-table">
                                                        <table
                                                            className="table table-bordered table-hover">
                                                            <thead
                                                                className="thead-light">
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Designation</th>
                                                                <th scope="col">Mobile</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>

                                                            {
                                                                (props.supplierData.contacts
                                                                    && props.supplierData.contacts.length > 0)
                                                                && props.supplierData.contacts.map((contact, index) => (
                                                                    <tr key={index}>
                                                                        <td className="text-center">
                                                                            <input
                                                                                style={{
                                                                                    width: "90%",
                                                                                    textAlign: "left"
                                                                                }}
                                                                                type="text"
                                                                                title="Enter Name"
                                                                                className={isValue ? (!contact.name && `error_border`) : ``}
                                                                                value={contact.name ?? ''}
                                                                                name="name"
                                                                                onChange={(e) => {
                                                                                    e.preventDefault();
                                                                                    props.updateContact(contact.id, e);
                                                                                }}
                                                                            />

                                                                        </td>

                                                                        <td className="text-center">

                                                                            <input
                                                                                style={{
                                                                                    width: "90%",
                                                                                    textAlign: "left"
                                                                                }}
                                                                                type="text"
                                                                                title="Enter Designation"
                                                                                value={contact.designation ?? ''}
                                                                                name="designation"
                                                                                onChange={(e) => {
                                                                                    e.preventDefault();
                                                                                    props.updateContact(contact.id, e);
                                                                                }}
                                                                            />

                                                                        </td>


                                                                        <td className="text-center">

                                                                            <input
                                                                                style={{
                                                                                    width: "90%",
                                                                                    textAlign: "left"
                                                                                }}
                                                                                autoComplete="off"
                                                                                type="text"
                                                                                title="Enter Mobile"
                                                                                className={isValue ? (!contact.mobile && `error_border`) : ``}
                                                                                value={contact.mobile ?? ''}
                                                                                name="mobile"
                                                                                onChange={(e) => {
                                                                                    e.preventDefault();
                                                                                    if (!mobilePhoneValidation(e)) {
                                                                                        props.updateContact(contact.id, e);
                                                                                    }
                                                                                }}
                                                                            />

                                                                            {/*<p className="text-danger">*/}
                                                                            {/*    {clientErrors.mobile}*/}
                                                                            {/*</p>*/}

                                                                        </td>


                                                                        <td className="text-center">

                                                                            {
                                                                                props.supplierData.contacts && (props.supplierData.contacts.length > 1) && (
                                                                                    <button
                                                                                        className="btn btn-danger mr-2"
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            props.removeContact(contact.id);
                                                                                        }}>
                                                                                        <i className="fas fa-trash"/>
                                                                                    </button>
                                                                                )
                                                                            }


                                                                            {
                                                                                props.supplierData.contacts && ((props.supplierData.contacts.length - 1) === index) && (
                                                                                    <button
                                                                                        className="btn btn-primary"
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            if (contact.name && contact.mobile) {
                                                                                                props.addSupplierContact();
                                                                                                setIsValue(false);
                                                                                            } else {
                                                                                                setIsValue(true);
                                                                                            }
                                                                                        }}>
                                                                                        <i className="fas fa-plus"/>
                                                                                    </button>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>


                                <div className="row mt-4">
                                    <div className="col-12">

                                        <div className="card">

                                            <div className="card-header">
                                                <div className="fbh-title">
                                                    <h6>Supplier Details</h6>
                                                </div>

                                            </div>

                                            <div className="card-body">
                                                <div className="form-group">

                                                    <div className="row">

                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">

                                                                <label
                                                                    htmlFor="name">
                                                                    Company or Supplier Name
                                                                    <span
                                                                        className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors.name ? `is-invalid` : ``}`}
                                                                    autoComplete="off"
                                                                    id="name"
                                                                    name="name"
                                                                    value={props.supplierData.name ?? ''}
                                                                    onChange={(e) => {
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    placeholder="Company or Supplier Name"
                                                                    required/>

                                                                <div
                                                                    className={props.errors.name ? `invalid-feedback` : ``}>
                                                                    {props.errors.name}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">

                                                                <label
                                                                    htmlFor="address">
                                                                    Address
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="address"
                                                                    name="address"
                                                                    value={props.supplierData.address ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    placeholder="Address"/>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="row">
                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">

                                                                <label
                                                                    htmlFor="telephone_number">
                                                                    Telephone
                                                                    Number
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control`}
                                                                    autoComplete="off"
                                                                    id="telephone_number"
                                                                    name="telephone_number"
                                                                    value={props.supplierData.telephone_number ?? ''}
                                                                    onChange={(e) => {
                                                                        if (!mobilePhoneValidation(e)) {
                                                                            props.setSupplierData(e);
                                                                        }
                                                                    }}
                                                                    placeholder="Telephone Number"/>
                                                                <p className="text-danger">{clientErrors.telephone_number}</p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">

                                                                <label htmlFor="mobile_number">Mobile Number <span
                                                                    className="text-danger"> * </span></label>

                                                                <input
                                                                    autoComplete="off"
                                                                    type="text"
                                                                    className={`form-control ${props.errors.mobile_number ? `is-invalid` : ``}`}
                                                                    id="mobile_number"
                                                                    name="mobile_number"
                                                                    value={props.supplierData.mobile_number ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        if (!mobilePhoneValidation(e)) {
                                                                            props.setSupplierData(e);
                                                                        }
                                                                    }}
                                                                    placeholder="Mobile Number"/>

                                                                <div
                                                                    className={props.errors.mobile_number ? `invalid-feedback` : ``}>
                                                                    {props.errors.mobile_number}
                                                                </div>

                                                                <p className="text-danger">{clientErrors.mobile_number}</p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">
                                                                <label
                                                                    htmlFor="email">
                                                                    Email
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors.email ? `is-invalid` : ``}`}
                                                                    autoComplete="off"
                                                                    id="email"
                                                                    name="email"
                                                                    value={props.supplierData.email ?? ''}
                                                                    onChange={(e) => {
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    placeholder="Email"/>

                                                                <div
                                                                    className={props.errors.email ? `invalid-feedback` : ``}>
                                                                    {props.errors.email}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="form-group">

                                                                <label
                                                                    htmlFor="web">
                                                                    Web
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors.web ? `is-invalid` : ``}`}
                                                                    id="web"
                                                                    name="web"
                                                                    value={props.supplierData.web ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    placeholder="https://example.com"/>

                                                                <div
                                                                    className={props.errors.web ? `invalid-feedback` : ``}>
                                                                    {props.errors.web}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div
                                                            className="col-lg-12">
                                                            <div
                                                                className="form-group">
                                                                <label
                                                                    htmlFor="email">
                                                                    Products
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    autoComplete="off"
                                                                    id="products"
                                                                    name="products"
                                                                    value={props.supplierData.products ?? ''}
                                                                    onChange={(e) => {
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    placeholder="Supplier Products"/>

                                                            </div>
                                                        </div>


                                                    </div>


                                                    <div className="row">


                                                        <div
                                                            className="col-lg-6">
                                                            <div
                                                                className="custom-control custom-checkbox">

                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    checked={props.supplierData.active}
                                                                    onChange={(e) => {
                                                                        props.setSupplierData(e);
                                                                    }}
                                                                    name="active"
                                                                    id="active"/>

                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="active">
                                                                    Active
                                                                </label>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>


                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                data-dismiss="modal"
                                type="submit"
                                className="btn btn-danger btn-lg">
                                Cancel
                            </button>

                            <button
                                onClick={saveSupplier}
                                type="submit"
                                className="btn btn-primary btn-lg">
                                {props.supplier_id ? 'Update' : 'Save'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        setSupplierData: (e) => dispatch({type: SET_SUPPLIER_DATA, payload: {e}}),
        addSupplierContact: () => dispatch({type: SET_SUPPLIER_CONTACTS}),
        removeContact: (id) => dispatch({type: REMOVE_CONTACT_ITEMS, payload: {id}}),
        updateContact: (id, e) => dispatch({type: UPDATE_SUPPLIER_CONTACT, payload: {id, e}}),
        resetSupplierData: () => dispatch({type: RESET_SUPPLIER_DATA}),
        setErrors: (errors) => dispatch({type: SET_SUPPLIER_ERRORS, payload: {errors}}),
        setMessage: (message_type, message) => dispatch({type: SET_SUPPLIER_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_SUPPLIER_MESSAGE}),
        editSupplier: (supplier) => dispatch({type: EDIT_SUPPLIER, payload: {supplier}}),
        addSelectedSupplier: (selectedSupplier) => dispatch({type: ADD_SELECTED_SUPPLIER, payload: {selectedSupplier}})
    }
}

const mapStateToProps = (store) => {
    const {supplierData, message, errors} = store.supplierStore;
    return {supplierData, message, errors};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplierModal);