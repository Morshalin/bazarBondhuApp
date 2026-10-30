import React, {useEffect, useState} from 'react';
import {getActions, saveAction} from "../../../Helpers/Utils/Utils";
import Success from "../Notification/Success";
import Error from "../Notification/Error";

const PaymentGateway = (props) => {

    const [loading, setLoading] = useState(false);

    let initialData = {
        cash_on_delivery: true,
        ssl_commerce: false,
        store_id: '',
        store_password: '',
        api_url: '',
        currency: ''
    };

    let initialMessage = {
        success: '',
        error: ''
    }

    const [settingsData, setSettingsData] = useState(initialData);
    const [errors, setErrors] = useState(initialData);
    const [message, setMessage] = useState(initialMessage);

    useEffect(() => {
        let mounted = true;
        mounted && getActions(`backend/getPaymentGatewaySettings`, false)
            .then((res) => {
                if (res.success) {
                    setSettingsData(res.data);
                } else {
                    setSettingsData(initialData);
                }
            })
            .finally(() => mounted = false);
    }, [])


    const handleChange = (e) => {
        setSettingsData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
            }
        });

        setErrors((prevState) => {
            return {
                ...prevState,
                [e.target.id]: ''
            }
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        saveAction(`backend/paymentGatewaySetting`, settingsData)
            .then((res) => {

                if (res.success) {
                    setMessage((prevState) => {
                        return {
                            ...prevState,
                            success: res.message
                        }
                    });
                } else {
                    setErrors(res.errors);
                    setMessage((prevState) => {
                        return {
                            ...prevState,
                            error: res.message
                        }
                    });

                    let scrollToErrorFiled = document.getElementsByClassName('is-invalid');
                    scrollToErrorFiled[0].scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            }).catch((err) => err)
            .finally(() => setTimeout(() => setMessage(initialMessage), 3000) && setLoading(false));
    }

    return (
        <>
            {message.success && <Success message={message.success}/>}
            {message.error && <Error message={message.error}/>}
            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="fas fa-tools"></i>
                                        <h2>Payment Gateway</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below.
                                            The field labels marked with
                                            <span className="text-danger"> * </span>
                                            are required input fields.</p>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <form>
                                                <section className="custom-card">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="custom-card-box">
                                                                            <div className="custom-card-box-header">
                                                                                <div className="fbh-title">
                                                                                    <div className="col-lg-12">
                                                                                        <div className="row">
                                                                                            <div className="col-lg-6">
                                                                                                <h2 style={{borderLeft: "none"}}>Cash
                                                                                                    On Delivery</h2>
                                                                                            </div>
                                                                                            <div className="col-lg-6">
                                                                                                <div
                                                                                                    className="form-group mt-2">
                                                                                                    <div
                                                                                                        className="custom-control custom-switch">
                                                                                                        <input
                                                                                                            onChange={handleChange}
                                                                                                            checked={settingsData.cash_on_delivery}
                                                                                                            type="checkbox"
                                                                                                            className="custom-control-input"
                                                                                                            id="cash_on_delivery"/>
                                                                                                        <label
                                                                                                            className="custom-control-label"
                                                                                                            htmlFor="cash_on_delivery"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="custom-card-box-content">
                                                                                <div className="row">
                                                                                    <div className="col-lg-12">
                                                                                        <fieldset disabled={loading}>
                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="col-md-12">
                                                                                                    <div
                                                                                                        className="form-group">
                                                                                                        <p>Cash on
                                                                                                            Delivery</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </fieldset>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="custom-card-box">
                                                                            <div className="custom-card-box-header">
                                                                                <div className="fbh-title">
                                                                                    <div className="col-lg-12">
                                                                                        <div className="row">
                                                                                            <div className="col-lg-2">
                                                                                                <h2 style={{borderLeft: "none"}}>SSL</h2>
                                                                                            </div>
                                                                                            <div className="col-lg-6">
                                                                                                <div
                                                                                                    className="form-group mt-2">
                                                                                                    <div
                                                                                                        className="custom-control custom-switch">
                                                                                                        <input
                                                                                                            onChange={handleChange}
                                                                                                            checked={settingsData.ssl_commerce}
                                                                                                            type="checkbox"
                                                                                                            className="custom-control-input"
                                                                                                            id="ssl_commerce"/>
                                                                                                        <label
                                                                                                            className="custom-control-label"
                                                                                                            htmlFor="ssl_commerce"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="custom-card-box-content">
                                                                                <div className="row">
                                                                                    <div className="col-lg-12">
                                                                                        <fieldset disabled={loading}>
                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="col-md-12">
                                                                                                    <div
                                                                                                        className="form-group">

                                                                                                        <label
                                                                                                            htmlFor="store_id">
                                                                                                            Store ID
                                                                                                            <span
                                                                                                                className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${errors?.store_id ? `is-invalid` : ``}`}
                                                                                                            id="store_id"
                                                                                                            value={settingsData.store_id}
                                                                                                            onChange={handleChange}
                                                                                                            placeholder="Store ID"/>

                                                                                                        <div
                                                                                                            className={errors?.store_id ? `invalid-feedback` : ``}>
                                                                                                            {errors?.store_id}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div
                                                                                                    className="col-md-12">
                                                                                                    <div
                                                                                                        className="form-group">

                                                                                                        <label
                                                                                                            htmlFor="store_password">
                                                                                                            Store
                                                                                                            Password
                                                                                                            <span
                                                                                                                className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${errors?.store_password ? `is-invalid` : ``}`}
                                                                                                            id="store_password"
                                                                                                            value={settingsData.store_password}
                                                                                                            onChange={handleChange}
                                                                                                            placeholder="Store Password"/>

                                                                                                        <div
                                                                                                            className={errors?.store_password ? `invalid-feedback` : ``}>
                                                                                                            {errors?.store_password}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div
                                                                                                    className="col-md-12">
                                                                                                    <div
                                                                                                        className="form-group">

                                                                                                        <label
                                                                                                            htmlFor="api_url">
                                                                                                            API URL
                                                                                                            <span
                                                                                                                className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${errors?.api_url ? `is-invalid` : ``}`}
                                                                                                            id="api_url"
                                                                                                            value={settingsData?.api_url}
                                                                                                            onChange={handleChange}
                                                                                                            placeholder="API URL"/>

                                                                                                        <div
                                                                                                            className={errors?.api_url ? `invalid-feedback` : ``}>
                                                                                                            {errors?.api_url}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div
                                                                                                    className="col-md-12">
                                                                                                    <div
                                                                                                        className="form-group">

                                                                                                        <label
                                                                                                            htmlFor="currency">
                                                                                                            Currency
                                                                                                            <span
                                                                                                                className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${errors?.currency ? `is-invalid` : ``}`}
                                                                                                            id="currency"
                                                                                                            value={settingsData.currency}
                                                                                                            onChange={handleChange}
                                                                                                            placeholder="Currency"/>

                                                                                                        <div
                                                                                                            className={errors?.currency ? `invalid-feedback` : ``}>
                                                                                                            {errors?.currency}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </fieldset>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        className="col-lg-6 offset-lg-6 mt-4 text-right">
                                                                        <div className="form-group">

                                                                            <button
                                                                                type="submit"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    setSettingsData(initialData);
                                                                                }}
                                                                                className="btn btn-danger mr-2">
                                                                                <i className="icon-reset mr-1"/>
                                                                                Reset
                                                                            </button>

                                                                            <button
                                                                                onClick={handleSubmit}
                                                                                type="submit"
                                                                                className={`btn btn-success ${loading ? 'disabled' : ''}`}>
                                                                                <i className={loading ? `spinner-border spinner-border-sm mr-1` : `icon-save-regular mr-1`}/>
                                                                                {loading ? `Saving..` : `Save`}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default PaymentGateway;
