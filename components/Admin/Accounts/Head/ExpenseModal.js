import React, { useEffect, useState } from 'react';

import { connect } from "react-redux";
import { ERROR, getActions, saveAction, saveFileAction, SUCCESS, updateAction } from "../../../../Helpers/Utils/Utils";

const ExpenseModal = (props) => {


    useEffect(() => {

        let mounted = true;


        const bsCustomFileInput = require("bs-custom-file-input");
        bsCustomFileInput.init();

        document.getElementById("profile_image").innerHTML = "Eg. csv,txt,xlx,xls,pdf, jpg,png, jpeg, doc, docx";

    }, []);

    const [headData, setHeadData] = useState(
        {
            'date': new Date().toISOString().slice(0, 10),
            "voucher_no": "",
            'amount': 0,
            'payment_method': "Cash",
            'cashBook': "",
            'ledgerBook': "",
            'attach': '',
            'payment_note': '',
            'to_pay_type': 'others',
            'to_pay_other_user': '',
            'to_pay_user_id': '',

        });
    const [selectedFile, setSelectedFile] = useState("");
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [userType, setUserType] = useState('others');
    const [{ alt, src }, setImg] = useState({ src: '', alt: '' });

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
        const { name, value } = event.target
        setHeadData({ ...headData, [name]: value })
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
        if (!headData['date']) {
            // headData['date'] = new Date().toISOString().slice(0, 10);
            formData.append('date', new Date().toISOString().slice(0, 10));
        } else {
            formData.append('date', headData.date);
        }
        props.head.id && formData.append('head_id', props.head.id);
        headData.voucher_no && formData.append('voucher_no', headData.voucher_no);
        formData.append('to_pay', headData.to_pay);
        headData.amount && formData.append('amount', headData.amount);
        headData.payment_method && formData.append('payment_method', headData.payment_method);
        headData.cashBook && formData.append('cashBook', headData.cashBook);
        headData.ledgerBook && formData.append('ledgerBook', headData.ledgerBook);
        headData.payment_note && formData.append('payment_note', headData.payment_note);
        headData.to_pay_type && formData.append('to_pay_type', headData.to_pay_type);
        headData.to_pay_other_user && formData.append('to_pay_other_user', headData.to_pay_other_user);
        headData.to_pay_user_id && formData.append('to_pay_user_id', headData.to_pay_user_id);



        // console.log(headData);

        saveFileAction(`backend/accounts/heads/expense/add`, formData, config)
            .then((res) => {
                if (res.success) {
                    // props.setMessage(SUCCESS, res.message);
                    props.msg('SUCCESS', res.message)
                    // props.suppliers(res.data.data);
                    setHeadData({
                        'date': new Date().toISOString().slice(0, 10),
                        "voucher_no": "",
                        'amount': 0,
                        'payment_method': "Cash",
                        'cashBook': "",
                        'ledgerBook': "",
                        'attach': '',
                        'payment_note': '',
                        'to_pay_type': 'others',
                        'to_pay_other_user': '',
                        'to_pay_user_id': '',

                    });
                    setSelectedFile('');
                    setUserType('others');
                    setError([]);
                    document.getElementById("profile_image").innerHTML = "Eg. csv,txt,xlx,xls,pdf, jpg,png, jpeg, doc, docx"
                    // console.log(res);
                    // props.addSelectedSupplier({value: res.data.add, label: res.data.name});
                    // setTimeout(() => props.msg('SUCCESS', res.message), 2000);
                    hideModal();
                } else {
                    // props.setMessage(ERROR, res.message);
                    props.msg('Error', res.message)
                    setError(res.errors);
                    // setTimeout(() => props.resetMessage(), 2000)
                    setHeadData({
                        'date': new Date().toISOString().slice(0, 10),
                        "voucher_no": "",
                        'amount': 0,
                        'payment_method': "Cash",
                        'cashBook': "",
                        'ledgerBook': "",
                        'attach': '',
                        'payment_note': '',
                        'to_pay_type': 'others',
                        'to_pay_other_user': '',
                        'to_pay_user_id': '',

                    });
                }
            });

        // props.setSupplier('');

    }


    const hideModal = () => {
        $('#add_expense_modal').modal('hide');
    }
    const options = [
        { value: 'bkash', label: 'Bkash' },
        { value: 'nagod', label: 'Nagod' },
        { value: 'bank', label: 'Bank' },
        { value: 'card_payment', label: 'Card Payment' }
    ];

    // console.log(props);
    // console.log(props.supplier);
    // console.log(headData);

    return (
        <>
            <div
                className="modal fade"
                id="add_expense_modal"
                tabIndex="-1"
                aria-labelledby="addExpenseModal"
                aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="addExpenseModal">Expense Voucher</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="custom-card-box-content">

                                <form className="row" encType="multipart/form-data">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                AC Head
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control`}
                                                autoComplete="off"
                                                value={props.head.name ?? ""}
                                                required readOnly />
                                        </div>
                                    </div>

                                    {/*<div className="col-md-12">*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <label htmlFor="name">*/}
                                    {/*            To*/}
                                    {/*            <span className="text-danger"> * </span>*/}
                                    {/*        </label>*/}

                                    {/*        <input*/}
                                    {/*            type="text"*/}
                                    {/*            className={`form-control`}*/}
                                    {/*            name={'to_pay'}*/}
                                    {/*            autoComplete="off"*/}
                                    {/*            value={headData.to ?? ""}*/}
                                    {/*            required/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="col-md-12">
                                        <label htmlFor="name">
                                            Paid To
                                            <span className="text-danger"> * </span>
                                        </label>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <select className="custom-select"
                                                        id="to_pay_type"
                                                        name="to_pay_type"
                                                        value={headData.to_pay_type ?? ''}
                                                        onChange={(e) => {
                                                            changeHandelChange(e);
                                                            setUserType(e.target.value);
                                                        }}
                                                        autoFocus={false}
                                                        isclearable={true}
                                                        // isLoading={isLoading}
                                                        // isDisabled={isDisabled}

                                                        required
                                                    >
                                                        <option>User Type</option>
                                                        <option value="user">User</option>
                                                        <option value="supplier">Supplier</option>
                                                        <option value="customer">Customer</option>
                                                        <option value="others">Others</option>
                                                    </select>


                                                    <div
                                                        className={errors.to_pay_type ? `invalid-feedback` : ``}>
                                                        {errors.to_pay_type}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                {userType === 'others' ? (
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.to_pay_other_user ? `is-invalid` : ``}`}
                                                            autoComplete="off"
                                                            id="to_pay_other_user"
                                                            name="to_pay_other_user"
                                                            value={headData.to_pay_other_user ?? ''}
                                                            onChange={(e) => {
                                                                changeHandelChange(e);
                                                            }}
                                                            disabled={userType !== 'others' ? 'disabled' : ''}
                                                            placeholder="Receiver Name" />

                                                        <div
                                                            className={errors.to_pay_other_user ? `invalid-feedback` : ``}>
                                                            {errors.to_pay_other_user}
                                                        </div>

                                                    </div>
                                                ) : (
                                                    <div className="form-group">
                                                        <select className="custom-select"
                                                            id="to_pay_user_id"
                                                            name="to_pay_user_id"
                                                            value={headData.to_pay_user_id ?? ''}
                                                            onChange={(e) => {
                                                                changeHandelChange(e);
                                                            }}
                                                            autoFocus={false}
                                                            isClearable={true}
                                                            disabled={((userType !== 'user' && userType !== 'supplier' && userType !== 'customer') || ((!(props.users) || !(props.suppliers) || !(props.customers) || !(props.users.length > 0) || !(props.suppliers.length > 0) || !(props.customers.length > 0)))) ? 'disabled' : ''}
                                                            required
                                                        >
                                                            {
                                                                (props.users && props.suppliers && props.customers && (props.users.length > 0) && (props.suppliers.length > 0) && (props.customers.length > 0)) && ((
                                                                    userType === 'user' && props.users.map((user, index) => {

                                                                        return (
                                                                            <option value={user.id}
                                                                                key={index}>{user.name}
                                                                            </option>
                                                                        )
                                                                    })
                                                                ) || (
                                                                        userType === 'supplier' && props.suppliers.map((supplier, index) => {

                                                                            return (
                                                                                <option value={supplier.id}
                                                                                    key={index}>{supplier.name}
                                                                                </option>
                                                                            )
                                                                        })
                                                                    ) || (
                                                                        userType === 'customer' && props.customers.map((customer, index) => {

                                                                            return (
                                                                                <option value={customer.id}
                                                                                    key={index}>{customer.name}
                                                                                </option>
                                                                            )
                                                                        })
                                                                    ))
                                                            }
                                                        </select>


                                                        <div
                                                            className={errors.to_pay_user_id ? `invalid-feedback` : ``}>
                                                            {errors.to_pay_user_id}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

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
                                                value={headData.date ? headData.date : new Date().toISOString().slice(0, 10)}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                // placeholder=""
                                                required />

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
                                                className={`form-control ${errors.voucher_no ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="voucher_no"
                                                name="voucher_no"
                                                value={headData.voucher_no ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Voucher No" />

                                            <div
                                                className={errors.voucher_no ? `invalid-feedback` : ``}>
                                                {errors.voucher_no}
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
                                                required />

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


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Cash Book / Folio
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.date ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="cashBook"
                                                name="cashBook"
                                                value={headData.cashBook}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Cash Book / Folio"
                                            />

                                            <div
                                                className={errors.cashBook ? `invalid-feedback` : ``}>
                                                {errors.cashBook}
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                Ledger Book / Folio
                                                {/*<span className="text-danger"> * </span>*/}
                                            </label>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.voucher_no ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                id="ledgerBook"
                                                name="ledgerBook"
                                                value={headData.ledgerBook ?? ''}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                placeholder="Ledger Book / Folio" />

                                            <div
                                                className={errors.ledgerBook ? `invalid-feedback` : ``}>
                                                {errors.ledgerBook}
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
                                                        // addAttachment(e.target.files[0]);
                                                        setSelectedFile(e.target.files[0]);
                                                        // addAttachment(e);
                                                        setIsFilePicked(true);
                                                    }}
                                                    id="attach" />
                                                <label
                                                    id="profile_image"
                                                    className="custom-file-label cfl-left-align"
                                                    htmlFor="avatar">
                                                    Choose File
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
                                                value={headData.payment_note}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }} />

                                            <div
                                                className={errors.payment_note ? `invalid-feedback` : ``}>
                                                {errors.payment_note}
                                            </div>

                                        </div>
                                    </div>
                                </form>
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




export default ExpenseModal;

// export default ExpenseModal;
