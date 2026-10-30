import React, {useState} from 'react'
import {connect} from 'react-redux'
import process from '../../../next.config'
import {
    CHANGE_USER_DATA,
    RESET_CHECKOUT_MESSAGE,
    SET_CHECKOUT_MESSAGE,
    SET_USER_DATA_ERRORS
} from "../../../store/frontend/actions/cartAction";
import {ERROR, saveAction, SUCCESS} from "../../../Helpers/Utils/Utils";

const ProfileInfo = (props) => {

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        saveAction(`${process.env.api_url}/auth/customers/update`, props?.authUser)
            .then((res) => {
                if (res.success) {
                    setLoading(false);
                    props.setCheckoutMessage(SUCCESS, res.message);
                } else {
                    setLoading(false);
                    props.setCheckoutMessage(ERROR, res.message);
                    props.setUserErrors(res.errors);
                }
            }).finally(() => setTimeout(() => props.resetCheckoutMessage(), 3000));
    }


    const validate = () => {
        let errors = {}

        if (isEmpty(props?.authUser?.first_name)) {
            errors.first_name = 'The first name field is required.'
        }

        if (isEmpty(props?.authUser?.last_name)) {
            errors.last_name = 'The last name field is required.'
        }
        if (isEmpty(props?.authUser?.phone)) {
            errors.phone = 'Mobile number is required.'
        }

        props.setUserErrors(errors);

        return Object.keys(errors).length === 0 && errors.constructor === Object
            ? {
                success: true,
                message: '',
                errors: '',
            }
            : props.setCheckoutMessage(ERROR, 'Profile Information update fail.') && {
            success: false,
            message: 'Please fix the following issues',
            errors: errors,
        } && setTimeout(() => props.resetCheckoutMessage(), 2000);
    }

    const isEmpty = (value) => value === null || value === '';

    const [clientErrors, setClientErrors] = useState({
        phone: ''
    });

    const mobilePhoneValidation = (e) => {

        let msg = 'Please enter valid mobile number.';

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


    return (
        <>
            <div className='card checkout-details-card rounded-0 mb-4'>
                <div className='card-header'>
                    <span className='badge'>01</span>
                    Personal Details
                </div>

                <div className='card-body'>
                    <form>
                        <div className="form-group">
                            <label>First Name <span className='text-danger'>*</span></label>

                            <input
                                name={`first_name`}
                                type="text"
                                value={props?.authUser?.first_name ?? ''}
                                onChange={(e) => props.changeUserData(e)}
                                className={`form-control rounded-0 ${props?.errors?.first_name ? `is-invalid` : ``}`}
                                placeholder="First Name"/>

                            <div id='first_name' className={props?.errors?.first_name ? `invalid-feedback` : ``}>
                                {props?.errors?.first_name}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Last Name <span className='text-danger'>*</span></label>

                            <input
                                name={`last_name`}
                                type="text"
                                value={props?.authUser?.last_name ?? ''}
                                onChange={(e) => props.changeUserData(e)}
                                className={`form-control rounded-0 ${props?.errors?.last_name ? `is-invalid` : ``}`}
                                placeholder="Last Name"/>

                            <div id='last_name' className={props?.errors?.last_name ? `invalid-feedback` : ``}>
                                {props?.errors?.last_name}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address <span className='text-danger'>*</span></label>

                            <input
                                className={`form-control rounded-0 ${props?.errors?.email ? `is-invalid` : ``}`}
                                name={'email'}
                                type="email"
                                onChange={(e) => props.changeUserData(e)}
                                defaultValue={props?.authUser?.email ?? ''}
                                placeholder="e.g. email@gmail.com"/>

                            <div id='email' className={props?.errors?.email ? `invalid-feedback` : ``}>
                                {props?.errors?.email}
                            </div>
                        </div>

                        <div className="form-group">

                            <label>Mobile Number <span className='text-danger'>*</span></label>

                            <div className="input-group mb-3">

                                <div className="input-group-prepend rounded-0">

                                <span
                                    className="input-group-text rounded-0"
                                    id="basic-addon1">
                                    +880
                                </span>

                                </div>

                                <input
                                    name={'phone'}
                                    type="text"
                                    value={props?.authUser?.phone ?? ''}
                                    onChange={(e) => {
                                        if (!mobilePhoneValidation(e)) {
                                            props.changeUserData(e);
                                        }
                                    }}
                                    className={`form-control rounded-0 ${props?.errors?.phone || clientErrors.phone ? `is-invalid` : ``}`}
                                    placeholder="e.g. 1913800877"/>

                                <div id='phone'
                                     className={props?.errors?.phone || clientErrors.phone ? `invalid-feedback` : ``}>
                                    {props?.errors?.phone || clientErrors.phone}
                                </div>
                            </div>
                        </div>

                        <div className='form-group'>
                            <label>
                                Address Details
                            </label>

                            <textarea
                                placeholder="House 83, Road 14, Block C, Bashundhara R/A, Dhaka - 1216"
                                name={'address'}
                                className={`form-control rounded-0`}
                                onChange={(e) => props.changeUserData(e)}
                                value={props?.authUser?.address ?? ''}
                                rows='3'/>
                        </div>

                        <div className='form-group d-flex justify-content-end text-center'>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (validate().success) {
                                    handleSubmit(e).then(r => r);
                                }
                            }} type='submit' className={`btn btn-primary`}>
                                {loading ? `Updating...` : `Update`}
                                <i className={loading ? `spinner-border spinner-border-sm` : ''}/>
                            </button>
                        </div>
                    </form>

                    <div className={`${props?.message?.error ? 'text-danger' : 'text-success'} text-left`}>
                        {props?.message?.error ? props?.message?.error : props?.message?.success}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (store) => {
    const {authUser, errors, message} = store.cartStore
    return {authUser, errors, message}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserData: (e) => dispatch({type: CHANGE_USER_DATA, payload: {e}}),
        setUserErrors: (errors) => dispatch({type: SET_USER_DATA_ERRORS, payload: {errors}}),
        setCheckoutMessage: (message_type, message) =>
            dispatch({
                type: SET_CHECKOUT_MESSAGE,
                payload: {message_type, message},
            }),
        resetCheckoutMessage: () => dispatch({type: RESET_CHECKOUT_MESSAGE}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)
