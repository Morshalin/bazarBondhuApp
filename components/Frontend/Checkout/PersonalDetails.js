import React, {useState} from 'react';
import {connect} from "react-redux";
import {CHANGE_USER_DATA, SET_AUTHENTICATE_USER} from "../../../store/frontend/actions/cartAction";

const PersonalDetails = (props) => {

    console.log(props.errors);

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
            <div className="card-header">
                <span className="badge">01</span>
                Personal Details
            </div>

            <div className="card-body">
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

                </form>
            </div>
        </>
    );
};

const mapStateToProps = store => {
    const {authUser, errors} = store.cartStore;
    return {authUser, errors};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUser: (userData) => dispatch({type: SET_AUTHENTICATE_USER, payload: {userData}}),
        changeUserData: (e) => dispatch({type: CHANGE_USER_DATA, payload: {e}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
