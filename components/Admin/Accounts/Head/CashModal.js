import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {ERROR, getActions, saveAction, saveFileAction, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";



const CashModal = (props) => {

    useEffect(() => {

        let mounted = true;


        const bsCustomFileInput = require("bs-custom-file-input");
        bsCustomFileInput.init();

        document.getElementById("profile_image").innerHTML = "Eg. csv,txt,xlx,xls,pdf, jpg,png, jpeg, doc, docx";

    }, []);

    const [headData, setHeadData] = useState(
        {
            'date': new Date().toISOString().slice(0, 10),
            "deposit_no" : "",
            'amount' : 0,
            'payment_method' : "Cash",
            'reason' : "",
            'received_from' : "",
            'attach': '',
            'payment_note' : ''

        });
    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [{alt, src}, setImg] = useState({src: '', alt: ''});

    const [errors, setError] = useState([]);

    const addAttachment = (event) => {
        console.log(event)
        // setHeadData({...headData, ['attach']: event.target.files[0]})
        // setSelectedFile(event.target.files[0]);
        setSelectedFile(event);
        // setSelectedFile(event.file);
        // alert(event.file.name)
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
        setHeadData({...headData, [name]: value})
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data;'
        }
    }

    const saveSupplier = (e) => {
        e.preventDefault();

        let formData = new FormData();

        if (isFilePicked) {
            // setHeadData({...headData, ['attach']: selectedFile});
            formData.append('attach', selectedFile);
            // alert("Data found")
            // headData['attach'] = selectedFile
            // console.log(selectedFile)
        }
        // setHeadData({...headData, ['supplier_id']: props.supplier.add});
        // headData['head_id'] = props.head.id;
        if(!headData['date']) {
            // headData['date'] = new Date().toISOString().slice(0, 10);
            formData.append('date', new Date().toISOString().slice(0, 10));
        }
        formData.append('head_id', props.head.id);
        formData.append('deposit_no', headData.deposit_no);
        formData.append('amount', headData.amount);
        formData.append('payment_method', headData.payment_method);
        formData.append('reason', headData.reason);
        formData.append('received_from', headData.received_from);
        formData.append('payment_note', headData.payment_note);




// console.log(headData);

        saveFileAction(`backend/accounts/heads/cash/add`, formData, config)
            .then((res) => {
                if (res.success) {
                    // props.setMessage(SUCCESS, res.message);
                    props.msg('SUCCESS', res.message)
                    // props.suppliers(res.data.data);
                    setHeadData([]);
                    console.log(res);
                    // console.log(res);
                    // props.addSelectedSupplier({value: res.data.add, label: res.data.name});
                    // setTimeout(() => props.msg('SUCCESS', res.message), 2000);
                    hideModal();
                } else {
                    // props.setMessage(ERROR, res.message);
                    props.msg('Error', res.message)
                    setError(res.errors);
                    // setTimeout(() => resetMessage(), 2000)
                    setHeadData({
                        'date': new Date().toISOString().slice(0, 10),
                        "deposit_no" : "",
                        'amount' : 0,
                        'payment_method' : "Cash",
                        'reason' : "",
                        'received_from' : "",
                        'attach': '',
                        'payment_note' : ''

                    });
                }
            });

        // props.setSupplier('');

    }


    const hideModal = () => {
        $('#add_cash_modal').modal('hide');
    }
    const options = [
        {value: 'bkash', label: 'Bkash'},
        {value: 'nagod', label: 'Nagod'},
        {value: 'bank', label: 'Bank'},
        {value: 'card_payment', label: 'Card Payment'}
    ];

    // console.log(props);
    // console.log(props.supplier);
    // console.log(headData);

    return (
        <>
            <div
                className="modal fade"
                id="add_cash_modal"
                tabIndex="-1"
                aria-labelledby="addCashModal"
                aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="addCashModal">Money Receipt</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">

                            <div className="custom-card-box-content">

                                <from className="row" encType="multipart/form-data">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Deposit Number
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.deposit_no ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                value={headData.deposit_no ?? ""}
                                                name="deposit_no"
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                required />

                                            <div
                                                className={errors.deposit_no ? `invalid-feedback` : ``}>
                                                {errors.deposit_no}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Date
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="date"
                                                className={`form-control ${errors.date ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="date"
                                                name="date"
                                                value={headData.date ? headData.date : new Date().toISOString().slice(0, 10)}
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
                                               Received From
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.received_from ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="received_from"
                                                name="received_from"
                                                value={headData.received_from ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Received From"/>

                                            <div
                                                className={errors.received_from ? `invalid-feedback` : ``}>
                                                {errors.received_from}
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
                                                type="number"
                                                className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="amount"
                                                name="amount"
                                                value={headData.amount ?? ''}
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
                                                Reason
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.reason ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="reason"
                                                name="reason"
                                                value={headData.reason ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Reason"
                                                required/>


                                            <div
                                                className={errors.reason ? `invalid-feedback` : ``}>
                                                {errors.reason}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Payment Type
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <select className="custom-select"
                                                    id="payment_method"
                                                    name="payment_method"
                                                    value={headData.payment_method ?? ''}
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
                                                <option>Payment Type</option>
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
                                            <label>Attachment</label>
                                            <div className="custom-file">
                                                <input type="file"
                                                       className={`custom-file-input ${errors.attach ? `is-invalid` : ``}`}
                                                       name="attach"
                                                       onChange={(e) => {
                                                           e.preventDefault();
                                                           // addAttachment(e.target.files[0]);
                                                           setSelectedFile(e.target.files[0]);
                                                           // addAttachment(e);
                                                           setIsFilePicked(true);
                                                       }}
                                                       id="attach"/>
                                                <label
                                                    id="profile_image"
                                                    className="custom-file-label cfl-left-align"
                                                    htmlFor="avatar">
                                                    Choose File
                                                </label>

                                                <div
                                                    className={errors.attach ? `invalid-feedback` : ``}>
                                                    {errors.attach}
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
                                                value={headData.payment_note ?? ''}
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




export default CashModal;

// export default CashModal;