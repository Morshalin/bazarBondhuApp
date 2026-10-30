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
import Select from "react-select";

const PaymentModal = (props) => {


    const [supplierData, setSupplierData] = useState(
        {
            'date': new Date().toISOString().slice(0, 10),
            'attach': '',
            'payment_method' : "Cash"

        });
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [{alt, src}, setImg] = useState({src: '', alt: ''});

    const [errors, setError] = useState([]);

    const addAttachment = (event) => {
        // console.log(event)
        // setSelectedFile(event.target.files[0]);
        setSelectedFile(event.file);
        // if (event.file) {
        //     setImg({
        //         src: URL.createObjectURL(event.file),
        //         alt: event.file.name
        //     });
        // }
        setIsFilePicked(true);

    };

    const changeHandelChange = (event) => {
        const {name, value} = event.target
        setSupplierData({...supplierData, [name]: value})
    }

    const saveSupplier = (e) => {
        e.preventDefault();
        if (isFilePicked) {
            setSupplierData({...supplierData, ['attach']: selectedFile});
        }
        // setSupplierData({...supplierData, ['supplier_id']: props.supplier.add});
        let formData = new FormData();
        supplierData.date && formData.append('date', supplierData.date);
        supplierData.reference && formData.append('reference', supplierData.reference);
        supplierData.amount && formData.append('amount', supplierData.amount);
        supplierData.payment_method && formData.append('payment_method', supplierData.payment_method);
        supplierData.payment_note && formData.append('payment_note', supplierData.payment_note);
        props.supplier.id && formData.append('supplier_id', props.supplier.id);

        // supplierData['supplier_id'] = props.supplier.id;

        saveAction(`backend/accounts/purchase`, formData)
            .then((res) => {
                if (res.success) {
                    props.setMessage(SUCCESS, res.message);
                    props.msg('SUCCESS', res.message)
                    props.suppliers(res.data.data);
                    setSupplierData([]);
                    // console.log(res);
                    // props.addSelectedSupplier({value: res.data.add, label: res.data.name});
                    // setTimeout(() => props.msg('SUCCESS', res.message), 2000);
                    hideModal();
                } else {
                    props.setMessage(ERROR, res.message);
                    // props.setErrors(res.errors);
                    // setTimeout(() => props.resetMessage(), 2000)
                    setSupplierData([]);
                }
            }).finally(hideModal);
        // props.setSupplier('');

    }


    const hideModal = () => {
        $('#add_supplier_modal').modal('hide');
    }
    const options = [
        {value: 'bkash', label: 'Bkash'},
        {value: 'nagod', label: 'Nagod'},
        {value: 'bank', label: 'Bank'},
        {value: 'card_payment', label: 'Card Payment'}
    ];

    // console.log(props);
    // console.log(props.supplier);
    // console.log(supplierData);

    return (
        <>
            <div
                className="modal fade"
                id="add_supplier_modal"
                tabIndex="-1"
                aria-labelledby="addPaymentModal"
                aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="addPaymentModal">Add
                                Payment {props.supplier ? `For ${props.supplier.name}` : ``}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">

                            <div className="custom-card-box-content">

                                <div className="row">

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Total Purchase
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control form-control-sm`}
                                                value={props.supplier.debit ?? 0} readOnly/>

                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Total Paid
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control form-control-sm`}
                                                value={props.supplier.credit ?? 0} readOnly/>

                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Due Balance
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control form-control-sm`}
                                                value={props.supplier.debit - props.supplier.credit ?? 0} readOnly/>

                                        </div>
                                    </div>
                                </div>
                                <from className="row" enctype="multipart/form-data">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Payment Date
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="date"
                                                className={`form-control ${errors.date ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="date"
                                                name="date"
                                                value={supplierData.date ? supplierData.date : new Date().toISOString().slice(0, 10)}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                // placeholder=""
                                                required/>

                                            <div
                                                className={errors.date ? `invalid-feedback` : ``}>
                                                {errors.date}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Voucher No
                                                {/*<span className="text-danger"> * </span>*/}
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.reference ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="reference"
                                                name="reference"
                                                value={supplierData.reference ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Reference No"/>

                                            <div
                                                className={errors.reference ? `invalid-feedback` : ``}>
                                                {errors.reference}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Amount
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="amount"
                                                name="amount"
                                                value={supplierData.amount ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Amount"
                                                required/>

                                            <div
                                                className={errors.amount ? `invalid-feedback` : ``}>
                                                {errors.amount}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Payment Method
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <select className="custom-select"
                                                    id="payment_method"
                                                    name="payment_method"
                                                    value={supplierData.payment_method ?? ''}
                                                    onChange={(e) => {
                                                        changeHandelChange(e);
                                                    }}
                                                    options={options}
                                                    autoFocus={false}
                                                    isClearable={true}
                                                // isLoading={isLoading}
                                                // isDisabled={isDisabled}

                                                    required
                                            >
                                                <option>Payment Method</option>
                                                <option value="Cash">Cash</option>
                                                <option value="check">Check</option>
                                                <option value="transfer">Transfer</option>
                                            </select>


                                            <div
                                                className={errors.payment_method ? `invalid-feedback` : ``}>
                                                {errors.payment_method}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Attach Document</label>
                                            <div className="custom-file">
                                                <input type="file"
                                                       className={`custom-file-input ${props?.errors?.attach ? `is-invalid` : ``}`}
                                                       name="attach"
                                                       onChange={(e) => {
                                                           e.preventDefault();
                                                           addAttachment(e.target.files[0]);
                                                       }}
                                                       id="attach"/>
                                                <label className="custom-file-label"
                                                       htmlFor="attach">
                                                        <span className="d-inline-block text-truncate w-75"
                                                              id="attach_text">
                                                            doc, pdf, xls, csv or image
                                                        </span>
                                                </label>

                                                <div
                                                    className={props?.errors?.attach ? `invalid-feedback` : ``}>
                                                    {props?.errors?.attach}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Payment Note <small>( Please include all details of Bank Check /
                                                Bank Transfer )</small></label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                id="payment_note"
                                                name="payment_note"
                                                value={supplierData.payment_note}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}/>

                                            <div
                                                className={errors.payment_note ? `invalid-feedback` : ``}>
                                                {errors.payment_note}
                                            </div>

                                        </div>
                                    </div>


                                </from>


                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                data-dismiss="modal"
                                type="submit"
                                className="btn btn-danger">
                                Cancel
                            </button>

                            <button
                                onClick={saveSupplier}
                                type="submit"
                                className="btn btn-primary">
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
        // setSupplierData: (e) => dispatch({type: SET_SUPPLIER_DATA, payload: {e}}),
        // addSupplierContact: () => dispatch({type: SET_SUPPLIER_CONTACTS}),
        // removeContact: (add) => dispatch({type: REMOVE_CONTACT_ITEMS, payload: {add}}),
        // updateContact: (add, e) => dispatch({type: UPDATE_SUPPLIER_CONTACT, payload: {add, e}}),
        // resetSupplierData: () => dispatch({type: RESET_SUPPLIER_DATA}),
        setErrors: (errors) => dispatch({type: SET_SUPPLIER_ERRORS, payload: {errors}}),
        setMessage: (message_type, message) => dispatch({type: SET_SUPPLIER_MESSAGE, payload: {message_type, message}}),
        // resetMessage: () => dispatch({type: RESET_SUPPLIER_MESSAGE}),
        // editSupplier: (supplier) => dispatch({type: EDIT_SUPPLIER, payload: {supplier}}),
        // addSelectedSupplier: (selectedSupplier) => dispatch({type: ADD_SELECTED_SUPPLIER, payload: {selectedSupplier}})
    }
}

const mapStateToProps = (store) => {
    const {message, errors} = store.supplierStore;
    return {message, errors};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

// export default PaymentModal;