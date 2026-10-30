import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import uuid from "react-uuid";

const SiteSettings = (props) => {

    const [loading, setLoading] = useState(false);
    const [isValue, setIsValue] = useState(false);

    const { asPath, route, query } = useRouter();

    const [clientErrors, setClientErrors] = useState({
        mobile: '',
        mobile_number: '',
        telephone_number: ''
    });


    const mobilePhoneValidation = (e) => {

        let msg = 'Please enter only number.';

        let isError = false;

        if (typeof e.target.value !== "undefined") {

            let pattern = new RegExp("^[0123456789]*$");

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


    useEffect(() => {
        let isMounted = true;

        const bsCustomFileInput = require("bs-custom-file-input");
        bsCustomFileInput.init();


        const fetchSiteSettings = async () => {
            return await axios
                .get("backend/settings/update")
                .then((result) => result.data)
                .catch((error) => error);
        };

        fetchSiteSettings()
            .then((response) => {
                if (isMounted) {
                    response.success
                        ? setSettingsData({
                            id: response.data.id,
                            site_name: response.data.name,
                            email: response.data.email,
                            phone: response.data.phone,
                            mobile: response.data.mobile,
                            lat: (response.data.lat && response.data.long) ? `${response.data.lat},${response.data.long}`: ``,
                            long: response.data.long,
                            address: response.data.address,
                            city: response.data.city,
                            zip_code: response.data.zip_code,
                            country: response.data.country,
                            currency: response.data.currency,
                            vat_reg: response.data.vat_reg,
                            logo: response.data.logo,
                            social_links: response.data.social_links ? response.data.social_links : [{
                                id: uuid(),
                                name: '',
                                url: ''
                            }]
                        })
                        : () => {
                            throw "Server is not responding";
                        };
                    setImagePreviewData(response.data.logo);

                }
            })
            .catch((error) => {
                console.log(error);
            })

    },[]);

    const appendSocialLink = () => {
        let updatedSocialLinks = [...settingsData.social_links, {
            id: uuid(),
            name: '',
            url: ''
        }];
        // setSettingsData({social_links: updatedSocialLinks});
        setSettingsData({ ...settingsData, social_links: updatedSocialLinks });
    }

    const detachSocialLink = (id) => {
        // setSettingsData({social_links: settingsData.social_links.filter(socialLink => socialLink.id !== id)});
        setSettingsData({ ...settingsData, social_links: settingsData.social_links.filter(socialLink => socialLink.id !== id) });
    }

    const updateSocialLink = (id, type="", val="") => {
        let updatedSocialLinks = settingsData.social_links.map((socialLink) => {
            if(id === socialLink.id )
                if(type === "name"){
                    socialLink.name = val;
                }
                else{
                    socialLink.url = val;
                }
            return socialLink;
        });
        // setSettingsData({social_links: updatedSocialLinks});
        setSettingsData({ ...settingsData, social_links: updatedSocialLinks });
    }

    let initialSettingsData = {
        site_name: "",
        address:'',
        city: "",
        country: "",
        zip_code: "",
        phone:"",
        mobile:"",
        email:'',
        support_time:'',
        currency: "",
        order_prefix: "",
        logo: ""
    };

    let initialValidationErrors = {
        site_name: "",
        address:'',
        city: "",
        country: "",
        zip_code: "",
        phone:"",
        mobile:"",
        email:'',
        support_time:'',
        currency: "",
        order_prefix: "",
        logo: ""
    };

    let initialMessage = { success: "", error: "" };

    const [settingsData, setSettingsData] = useState(initialSettingsData);

    const [settingsValidation, setSettingsValidation] = useState(
        initialValidationErrors
    );

    // image preview image as blob data
    const [imagePreviewData, setImagePreviewData] = useState("");

    const [message, setMessage] = useState(initialMessage);

    const handleSettingsData = (event) => {
        setLoading(false);
        let name = event.target.name;
        let value =
            event.target.type == "checkbox"
                ? event.target.checked
                : event.target.value;

        if(event.target.name === "shop_logo") {
            value = event.target.files[0];
            setImagePreviewData(URL.createObjectURL(value));
        }
        setSettingsData({ ...settingsData, [name]: value });
        setSettingsValidation({ ...settingsValidation, [name]: "" });
        setMessage(initialMessage);
    };

   const resetSettingsData = async (e) => {
        e.preventDefault();
        setSettingsData(initialSettingsData);
        setSettingsValidation(initialValidationErrors);
        setLoading(false);
    };

   const saveSettingsData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const settingsFormData = new FormData();

        settingsData.site_name && settingsFormData.append("site_name", settingsData.site_name);
        settingsData.address && settingsFormData.append("address", settingsData.address);
        settingsData.city && settingsFormData.append("city", settingsData.city);
        settingsData.country && settingsFormData.append("country", settingsData.country);
        settingsData.zip_code && settingsFormData.append("zip_code", settingsData.zip_code);
        settingsData.phone && settingsFormData.append("phone", settingsData.phone);
        settingsData.mobile && settingsFormData.append("mobile", settingsData.mobile);
        settingsData.email && settingsFormData.append("email", settingsData.email);
        settingsData.city && settingsFormData.append("city", settingsData.city);
        settingsData.zip_code && settingsFormData.append("zip_code", settingsData.zip_code);
        settingsData.support_time && settingsFormData.append("support_time", settingsData.support_time);
        settingsData.currency && settingsFormData.append("currency", settingsData.currency);
        settingsData.order_prefix && settingsFormData.append("order_prefix", settingsData.order_prefix);
        // typeof settingsData.shop_logo === "object" && settingsFormData.append("shop_logo", settingsData.shop_logo);
        //settingsFormData.append("_method", "PUT");

        const config = {
            headers: {
                "content-type": "multipart/form-data;",
            },
        };
       console.log(settingsData);

        // let response = await axios
        //     .post(
        //         `/backend/settings/update`,
        //         settingsFormData,
        //         config
        //     )
        //     .then((result) => result.data)
        //     .catch((errors) => errors);
        // if (response.success) {
        //     setSettingsData(response.data);
        //     setSettingsData({...settingsData, lat: (response.data.lat && response.data.long) ? `${response.data.lat},${response.data.long}`: ``});
        //     setMessage({ ...message, success: response.message });
        //     setLoading(false);
        // } else {
        //     setLoading(false);
        //     setMessage({ ...message, error: response.message });
        //     setSettingsValidation(response.errors);
        // }
        //
        // setTimeout(() => {
        //     setMessage(initialMessage);
        // }, 1000);
    };

    return (
        <>
            {message.success && <Success message={message.success} />}
            {message.error && <Error message={message.error} />}

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="fas fa-tools"></i>
                                        <h2>General Settings</h2>
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
                                                                <div className="custom-card-box">
                                                                    <div className="custom-card-box-header">
                                                                        <div className="fbh-title">
                                                                            <h2>Basic Information</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="custom-card-box-content">
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <fieldset disabled={loading}>
                                                                                    <div className="row">

                                                                                        <div className="col-lg-6 border-right">

                                                                                            <div className="row">

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="name" title="Enter Your Site Name">
                                                                                                            Site Name
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>
                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.site_name
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="name"
                                                                                                            name="site_name"
                                                                                                            value={settingsData.site_name}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Site Name" required/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.site_name
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.site_name}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="address" title="Enter Your Shop Address" >
                                                                                                            Address
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <textarea
                                                                                                            autoComplete="off"
                                                                                                            id="address"
                                                                                                            name="address"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.address
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            rows="4" cols="50"
                                                                                                            placeholder="Address"
                                                                                                            value={settingsData.address}
                                                                                                            onChange={handleSettingsData}
                                                                                                        />
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.address
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.address}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="city" title="Enter Your City Name" >
                                                                                                            City
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.city
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="city"
                                                                                                            name="city"
                                                                                                            value={settingsData.city}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="City"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.city
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.city}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="country" title="Enter Your Country Name" >
                                                                                                            Country
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.country
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="country"
                                                                                                            name="country"
                                                                                                            value={settingsData.country}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Country"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.country
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.country}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="zip_code" title="Enter Your Zip Code"  >
                                                                                                            Zip Code
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.zip_code
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="zip_code"
                                                                                                            name="zip_code"
                                                                                                            value={settingsData.zip_code}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Zip Code"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.zip_code
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.zip_code}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </div>

                                                                                        </div>

                                                                                        <div className="col-lg-6">

                                                                                            <div className="row">

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="phone" title="Enter Phone Number" >
                                                                                                            Phone
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.phone
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="phone"
                                                                                                            name="phone"
                                                                                                            value={settingsData.phone}
                                                                                                            onChange={(e) => {
                                                                                                                e.preventDefault();
                                                                                                                handleSettingsData(e);

                                                                                                            }}
                                                                                                            // onChange={handleSettingsData}
                                                                                                            placeholder="Phone"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.phone
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.phone}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="mobile" title="Enter Your Mobile Number" >
                                                                                                            Mobile
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="phone"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.mobile
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="mobile"
                                                                                                            name="mobile"
                                                                                                            value={settingsData.mobile}
                                                                                                            onChange={(e) => {
                                                                                                                e.preventDefault();
                                                                                                                if (!mobilePhoneValidation(e)) {
                                                                                                                    handleSettingsData(e);
                                                                                                                }
                                                                                                            }}

                                                                                                            placeholder="Mobile"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.mobile
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.mobile}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="email" title="Enter Your Email Address">
                                                                                                            Email
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="email"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.email
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="email"
                                                                                                            name="email"
                                                                                                            value={settingsData.email}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Email"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.email
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.email}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="phone" title="Enter Phone Number" >
                                                                                                            Support Time
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.support_time
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="support_time"
                                                                                                            name="support_time"
                                                                                                            value={settingsData.support_time}
                                                                                                            onChange={(e) => {
                                                                                                                e.preventDefault();
                                                                                                                handleSettingsData(e);
                                                                                                            }}
                                                                                                            placeholder="Support Time"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.support_time
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.support_time}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="currency" title="Enter Your Currency" >
                                                                                                            Currency
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.currency
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="currency"
                                                                                                            name="currency"
                                                                                                            value={settingsData.currency}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Currency"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.currency
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.currency}
                                                                                                        </div>

                                                                                                    </div>
                                                                                                </div>

                                                                                                <div className="col-md-12">
                                                                                                    <div className="form-group">

                                                                                                        <label htmlFor="currency" title="Enter Your Currency" >
                                                                                                            Order Prefix
                                                                                                            <span className="text-danger"> * </span>
                                                                                                        </label>

                                                                                                        <input
                                                                                                            autoComplete="off"
                                                                                                            type="text"
                                                                                                            className={`form-control ${
                                                                                                                settingsValidation.order_prefix
                                                                                                                    ? `is-invalid`
                                                                                                                    : ``
                                                                                                            }`}
                                                                                                            id="order_prefix"
                                                                                                            name="order_prefix"
                                                                                                            value={settingsData.order_prefix}
                                                                                                            onChange={handleSettingsData}
                                                                                                            placeholder="Order Prefix"/>
                                                                                                        <div
                                                                                                            className={
                                                                                                                settingsValidation.order_prefix
                                                                                                                    ? `invalid-feedback`
                                                                                                                    : `d-none`
                                                                                                            }
                                                                                                        >
                                                                                                            {settingsValidation.order_prefix}
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
                                                                <div className="custom-card-box mt-4 col-lg-6" style={{paddingLeft:"0"}}>
                                                                    <div className="custom-card-box-header">
                                                                        <div className="fbh-title">
                                                                            <h2>Upload Logo</h2>
                                                                        </div>
                                                                    </div>

                                                                    <div className="custom-card-box-content">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <fieldset disabled={loading}>
                                                                                    <div className="row">
                                                                                        <div className="card-body">
                                                                                            <div className="form-group mt-1">
                                                                                                <div className="custom-file">
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        onChange={handleSettingsData}
                                                                                                        id="logo"
                                                                                                        name="logo"
                                                                                                        className={`custom-file-input ${settingsValidation.logo ? `is-invalid` : ``}`}
                                                                                                        title="Upload Only JPG File"
                                                                                                    />
                                                                                                    <label
                                                                                                        id="custom-file-label"
                                                                                                        className="custom-file-label cfl-left-align"
                                                                                                        htmlFor="logo"

                                                                                                        >
                                                                                                        Choose Image
                                                                                                    </label>
                                                                                                    <div className={settingsValidation.logo ? `invalid-feedback` : ``}>
                                                                                                        {settingsValidation.logo}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="container border">
                                                                                                {settingsData.logo && (
                                                                                                    <img className="mx-auto d-flex p-2"
                                                                                                         id="avatar"
                                                                                                         src={imagePreviewData}
                                                                                                         style={{
                                                                                                             width: '100%',
                                                                                                             height: '100%'
                                                                                                         }}/>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </fieldset>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                {/*<div className="custom-card-box mt-4">*/}
                                                                {/*    <div className="custom-card-box-header">*/}
                                                                {/*        <div className="fbh-title">*/}
                                                                {/*            <h2>Social Links</h2>*/}
                                                                {/*        </div>*/}
                                                                {/*    </div>*/}

                                                                {/*    <div className="custom-card-box-content">*/}
                                                                {/*        <div className="row">*/}
                                                                {/*            <div className="col-lg-12">*/}
                                                                {/*                <fieldset disabled={loading}>*/}
                                                                {/*                    <div className="row">*/}
                                                                {/*                        <div className="col-12">*/}
                                                                {/*                            <div className="form-group">*/}

                                                                {/*                                <div className="row">*/}
                                                                {/*                                    <div className="col-sm-12">*/}
                                                                {/*                                        <div*/}
                                                                {/*                                            className="table-responsive custom-table">*/}
                                                                {/*                                            <table*/}
                                                                {/*                                                className="table table-bordered table-hover">*/}
                                                                {/*                                                <thead className="thead-light">*/}
                                                                {/*                                                <tr>*/}
                                                                {/*                                                    <th scope="col" title="Enter Social Site Name" >Social Site Name</th>*/}
                                                                {/*                                                    <th scope="col" title="Enter Social Site Profile Link" >Social Site Profile Link</th>*/}
                                                                {/*                                                    <th scope="col">Actions</th>*/}
                                                                {/*                                                </tr>*/}
                                                                {/*                                                </thead>*/}
                                                                {/*                                                <tbody>*/}
                                                                {/*                                                {(settingsData.social_links && settingsData.social_links.length > 0) && settingsData.social_links.map((socialLink, index) => (*/}
                                                                {/*                                                    <tr key={index}>*/}
                                                                {/*                                                        <td className="text-center">*/}
                                                                {/*                                                            <input*/}
                                                                {/*                                                                type="text"*/}
                                                                {/*                                                                title="Enter Social Site Name"*/}
                                                                {/*                                                                className={isValue ? (!socialLink.name && `error_border`) : ``}*/}
                                                                {/*                                                                value={socialLink.name}*/}
                                                                {/*                                                                name="name"*/}
                                                                {/*                                                                onChange={(e) => {*/}
                                                                {/*                                                                    e.preventDefault();*/}
                                                                {/*                                                                    updateSocialLink(socialLink.id, "name",e.target.value);*/}
                                                                {/*                                                                }}*/}
                                                                {/*                                                            />*/}
                                                                {/*                                                        </td>*/}

                                                                {/*                                                        <td className="text-center">*/}

                                                                {/*                                                            <input*/}
                                                                {/*                                                                type="text"*/}
                                                                {/*                                                                title="Enter Social Site Profile Link"*/}
                                                                {/*                                                                className={isValue ? (!socialLink.url && `error_border`) : ``}*/}
                                                                {/*                                                                value={socialLink.url}*/}
                                                                {/*                                                                name="url"*/}
                                                                {/*                                                                onChange={(e) => {*/}
                                                                {/*                                                                    e.preventDefault();*/}
                                                                {/*                                                                    updateSocialLink(socialLink.id,"url",e.target.value);*/}
                                                                {/*                                                                }}*/}
                                                                {/*                                                            />*/}
                                                                {/*                                                        </td>*/}

                                                                {/*                                                        <td className="text-center">*/}
                                                                {/*                                                            /!*{settingsData.social_links && (settingsData.social_links.length > 1) && (*!/*/}
                                                                {/*                                                            /!*    <button*!/*/}
                                                                {/*                                                            /!*        className="btn btn-danger mr-2"*!/*/}
                                                                {/*                                                            /!*        onClick={(e) => {*!/*/}
                                                                {/*                                                            /!*            e.preventDefault();*!/*/}
                                                                {/*                                                            /!*            detachSocialLink(socialLink.id);*!/*/}
                                                                {/*                                                            /!*        }}>*!/*/}
                                                                {/*                                                            /!*        <i className="fas fa-trash"/>*!/*/}
                                                                {/*                                                            /!*    </button>*!/*/}
                                                                {/*                                                            /!*)}*!/*/}

                                                                {/*                                                            {settingsData.social_links && ((settingsData.social_links.length-1) === index) && (*/}
                                                                {/*                                                                <button*/}
                                                                {/*                                                                    className="btn btn-primary"*/}
                                                                {/*                                                                    onClick={(e) => {*/}
                                                                {/*                                                                        e.preventDefault();*/}
                                                                {/*                                                                        if (socialLink.name && socialLink.url){*/}
                                                                {/*                                                                            appendSocialLink();*/}
                                                                {/*                                                                            setIsValue(false);*/}
                                                                {/*                                                                        }else{*/}
                                                                {/*                                                                            setIsValue(true);*/}
                                                                {/*                                                                        }*/}
                                                                {/*                                                                    }}>*/}
                                                                {/*                                                                    <i className="fas fa-plus"/>*/}
                                                                {/*                                                                </button>*/}
                                                                {/*                                                            )}*/}
                                                                {/*                                                        </td>*/}
                                                                {/*                                                    </tr>*/}
                                                                {/*                                                ))}*/}
                                                                {/*                                                </tbody>*/}
                                                                {/*                                            </table>*/}
                                                                {/*                                        </div>*/}
                                                                {/*                                    </div>*/}
                                                                {/*                                </div>*/}
                                                                {/*                            </div>*/}
                                                                {/*                        </div>*/}
                                                                {/*                    </div>*/}
                                                                {/*                </fieldset>*/}
                                                                {/*            </div>*/}
                                                                {/*        </div>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}

                                                                <div className="col-lg-6 offset-lg-6 mt-4 text-right">
                                                                    <div className="form-group">

                                                                        <button
                                                                            type="submit"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                resetSettingsData(e);
                                                                            }}
                                                                            className="btn btn-danger mr-2">
                                                                            <i className="icon-reset mr-1"/>
                                                                            Reset
                                                                        </button>

                                                                        <button
                                                                            type="submit"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                saveSettingsData(e);
                                                                            }}
                                                                            className={`btn btn-success ${loading ? 'disabled' : ''}`}>
                                                                            <i className={loading ? `spinner-border spinner-border-sm mr-1` : `icon-save-regular mr-1`}/>
                                                                            {loading ? `Saving..` : `Save`}
                                                                        </button>
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

export default SiteSettings;