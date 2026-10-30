import React from "react";

const PersonalDetailsForm = (props) => {
    // console.log(props);
    return (

        <>
            <div className="custom-card-box">
                <div className="custom-card-box-header">
                    <div className="fbh-title">
                        <span className="badge">01</span>
                        <h2>Personal Details</h2>
                    </div>
                </div>
                <div className="custom-card-box-content">
                    <div className="row">
                        <div className="col-lg-12">
                            <fieldset disabled={props.loading}>
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <label htmlFor="name">
                                                        Email Address
                                                    </label>

                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        className={`form-control ${
                                                            props.customerValidation.email
                                                                ? `is-invalid`
                                                                : ``
                                                        }`}
                                                        id="email_address101"
                                                        name="email"
                                                        onChange={props.handlePersonalAddress}
                                                        value={props.personalAddress.email}
                                                        placeholder="Email Address" required/>
                                                    <div
                                                        className={
                                                            props.customerValidation.email
                                                                ? `invalid-feedback`
                                                                : `d-none`
                                                        }
                                                    >
                                                        {props.customerValidation.email}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <label htmlFor="name">
                                                        Mobile Number
                                                        <span className="text-danger"> * </span>
                                                    </label>

                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        className={`form-control ${
                                                            props.customerValidation.phone
                                                                ? `is-invalid`
                                                                : ``
                                                        }`}
                                                        id="phone102"
                                                        name="phone"
                                                        onChange={props.handlePersonalAddress}
                                                        value={props.personalAddress.phone}
                                                        placeholder="Mobile Number" required/>
                                                    <div
                                                        className={
                                                            props.customerValidation.phone
                                                                ? `invalid-feedback`
                                                                : `d-none`
                                                        }
                                                    >
                                                        {props.customerValidation.phone}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <label htmlFor="name">
                                                        Password
                                                        <span className="text-danger"> * </span>
                                                    </label>

                                                    <input
                                                        autoComplete="off"
                                                        type="password"
                                                        className={`form-control ${
                                                            props.customerValidation.password
                                                                ? `is-invalid`
                                                                : ``
                                                        }`}
                                                        id="password103"
                                                        name="password"
                                                        onChange={props.handlePersonalAddress}
                                                        value={props.personalAddress.password}
                                                        placeholder="Password" required/>
                                                    <div
                                                        className={
                                                            props.customerValidation.password
                                                                ? `invalid-feedback`
                                                                : `d-none`
                                                        }
                                                    >
                                                        {props.customerValidation.password}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <label htmlFor="name">
                                                        Re-enter Password
                                                        <span className="text-danger"> * </span>
                                                    </label>

                                                    <input
                                                        autoComplete="off"
                                                        type="password"
                                                        className={`form-control ${
                                                            props.customerValidation.password_confirmation
                                                                ? `is-invalid`
                                                                : ``
                                                        }`}
                                                        id="re_enter_password104"
                                                        name="password_confirmation"
                                                        onChange={props.handlePersonalAddress}
                                                        value={props.personalAddress.password_confirmation}
                                                        placeholder="Re-enter Password" required/>
                                                    <div
                                                        className={
                                                            props.customerValidation.password_confirmation
                                                                ? `invalid-feedback`
                                                                : `d-none`
                                                        }
                                                    >
                                                        {props.customerValidation.password_confirmation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default PersonalDetailsForm

