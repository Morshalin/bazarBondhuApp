import React, { useState, useEffect, createRef, useRef } from "react";
import { saveFileAction } from "../../../../Helpers/Utils/Utils";

const AddOpeningBalanceModal = (props) => {

    let tempUser = props.user;
    if (tempUser === undefined) {
        tempUser = {
            name: '',
            phone: '',
            email: ''
        }
    }



    const [amount, setAmount] = useState({
        'amount': ''
    });
    const [errors, setError] = useState({
        'amount': ''
    });


    const changeHandelChange = (event) => {
        const { name, value } = event.target
        setAmount({ ...amount, [name]: value })
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data;'
        }
    }

    const saveAmount = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('user_id', props.user.id);
        formData.append('amount', amount.amount);
        formData.append('type', props.type);



        //console.log(formData);


        saveFileAction(`backend/accounts/opening-balance`, formData, config)
            .then((res) => {
                if (res.success) {
                    // props.setMessage(SUCCESS, res.message);
                    //props.msg('SUCCESS', res.message)
                    // props.suppliers(res.data.data);
                    setAmount({ 'amount': '' });

                    props.updateState({
                        'status': 'success',
                        'message': res.message
                    });

                    //console.log(res);
                    // console.log(res);
                    // props.addSelectedSupplier({value: res.data.add, label: res.data.name});
                    // setTimeout(() => props.msg('SUCCESS', res.message), 2000);
                    hideModal();
                } else {
                    // props.setMessage(ERROR, res.message);
                    props.msg('Error', res.message)
                    setError(res.errors);
                    // setTimeout(() => resetMessage(), 2000)
                    setAmount({
                        "amount": ""
                    });

                    props.updateState({
                        'status': 'error',
                        'message': res.message
                    });


                }
            });
    }

    $("#openingBalanceModal").on('shown.bs.modal', function () {
        $('#amount').trigger('focus')
    })

    const hideModal = () => {
        $('#openingBalanceModal').modal('hide');
    }
    return (
        <>
            <div
                className="modal fade"
                id="openingBalanceModal"
                tabIndex="-1"
                aria-labelledby="addCashModal"
                aria-hidden="true">
                <div className="modal-dialog  modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="addCashModal">Opening Balance</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body ">
                            <form className="row" encType="multipart/form-data">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className='col-6'>
                                                <label htmlFor="name">
                                                    Name
                                                </label>

                                                <input
                                                    type="text"
                                                    id="name"
                                                    className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                    value={tempUser.name}
                                                    readOnly
                                                />

                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="phone">
                                                    Phone
                                                </label>

                                                <input
                                                    type="text"
                                                    id="phone"
                                                    className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                    value={tempUser.phone}
                                                    readOnly
                                                />
                                            </div>
                                            <div className='col-12'>
                                                <label htmlFor="email">
                                                    Email
                                                </label>

                                                <input
                                                    type="text"
                                                    id="email"
                                                    className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                    value={tempUser.email}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="amount">
                                                Amount
                                                <span className="text-danger"> * </span>
                                            </label>

                                            <input
                                                type="number"
                                                id="amount"
                                                className={`form-control ${errors.amount ? `is-invalid` : ``}`}
                                                autoComplete="off"
                                                value={amount.amount ?? 0}
                                                name="amount"
                                                autoFocus={true}
                                                onChange={(e) => {
                                                    changeHandelChange(e);
                                                }}
                                                required />

                                            <div
                                                className={errors.amount ? `invalid-feedback` : ``}>
                                                {errors.amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div className="modal-footer">

                            <button
                                data-dismiss="modal"
                                type="submit"
                                className="btn btn-danger">
                                Cancel
                            </button>

                            <button
                                onClick={saveAmount}
                                type="submit"
                                className="btn btn-primary">
                                {'Save'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default AddOpeningBalanceModal;