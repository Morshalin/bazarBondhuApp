import React, {useEffect, useState} from 'react';
import uuid from "react-uuid";
import axios from "axios";
import {useRouter} from "next/router";
import ShippingAddress from "./ShippingAddress";
import ShippingCard from "./ShippingCard";
import BillingCard from "./BillingCard";
import PersonalDetailsForm from "./PersonalDetailsForm";
import EditShippingAddress from "./EditShippingAddress";
import EditBillingAddress from "./EditBillingAddress";
import Success from "../../../Notification/Success";
import Error from "../../../Notification/Error";
import Link from "next/link";
import {deleteAction} from "../../../../../Helpers/Utils/Utils";

const EditCustomer = (props) => {
    let initialMessage = { success: "", error: "" };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(initialMessage);
    const [location, setLocation] = useState();
    const { asPath, route, query } = useRouter();

    let initialValidationErrors = {
        email: "",
        phone:'',
        password: "",
        password_confirmation: "",
    };

    let initialPersonalAddress = {
        email: "",
        phone:'',
        password: "",
        password_confirmation: "",
    };

    let initialBillingAddress = {
        first_name:"",
        last_name:"",
        phone:"",
        location_id:"",
        area_id:"",
        address:"",
    }

    //formValidationState
    const [createBillingIsSet, setCreateBillingIsSet] = useState(false);
    const [createShippingIsSet, setCreateShippingIsSet] = useState(false);
    const [editBillingIsSet, setEditBillingIsSet] = useState(false);
    const [editShippingIsSet, setEditShippingIsSet] = useState(false);
    const [billingAddress, SetBillingAddress] = useState(initialBillingAddress);
    const [shippingAddress, setShippingAddress] = useState([]);
    const [clicked, setClicked] = useState(false);


    const [customerValidation, setCustomerValidation] = useState(
        initialValidationErrors
    );
    useEffect(() => {
        let isMounted = true;

        const fetchedCustomerData = async (user_id) => {
            return await axios
                .get(`backend/get-single-customer/${user_id}`)
                .then((result) => result.data)
                .catch((error) => error);
        };

        if (asPath !== route) {
            fetchedCustomerData(query.user_id)
                .then((response) => {
                    if (isMounted) {
                        if(response.success){
                            setPersonalAddress({
                                email: response.data.email,
                                phone: response.data.phone,
                            });
                            SetBillingAddress(response.data.billing_address);
                            setShippingAddress(response.data.shipping_address);
                            setClicked(true);
                        } else {
                            throw "Server is not responding";
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return () => (isMounted = false);
    }, [asPath, route, query]);


    // send customer data to backend when form is submitted
    const saveCustomerData = async (e) => {
        e.preventDefault()
        setLoading(true);
        const customerFormData = new FormData();
        customerFormData.append('username', personalAddress.phone);
        personalAddress.email && customerFormData.append('email', personalAddress.email);
        personalAddress.password && customerFormData.append('password', personalAddress.password);
        personalAddress.password_confirmation && customerFormData.append('password_confirmation', personalAddress.password_confirmation);
        personalAddress.phone && customerFormData.append('phone', personalAddress.phone);
        customerFormData.append('first_name', billingAddress.first_name);
        customerFormData.append('last_name', billingAddress.last_name);
        customerFormData.append('billing_address_phone', billingAddress.phone);
        customerFormData.append('location_id', billingAddress.location_id);
        customerFormData.append('area_id', billingAddress.area_id);
        customerFormData.append('address', billingAddress.address);
        customerFormData.append('shipping_address', JSON.stringify(shippingAddress));
        customerFormData.append("_method", "PUT");
        const config = {
            headers: {
                'content-type': 'multipart/form-data;',
            },
        }


        let response = await axios
            .post(`/backend/update-customer/${query.user_id}`, customerFormData, config)
            .then((result) => result.data)
            .catch((errors) => errors)
        if (response.success) {
            setPersonalAddress({
                email: response.data.email,
                phone: response.data.phone,
            });
            SetBillingAddress(response.data.billing_address);
            setMessage({ ...message, success: response.message });
            setLoading(false);
        } else {
            setLoading(false);
            setMessage({ ...message, error: response.message });
            setCustomerValidation(response.errors);
            let scrollToErrorFiled = document.getElementsByClassName('is-invalid')
            scrollToErrorFiled &&
            scrollToErrorFiled[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

        setTimeout(() => {
            setMessage(initialMessage)
        }, 1000)
    }

    const handleShippingAddDeleteButtonAPIRequest = (id) => {
        console.log(id);
    }

    //PersonalAddress
    const [personalAddress, setPersonalAddress] = useState(initialPersonalAddress);
    const handlePersonalAddress = (event) => {
        const {name, value} = event.target;
        if(name==="phone"){
            let latest_value = '';
            const pattern = new RegExp(/^[0-9\b]+$/)
            if (value === '' || pattern.test(value)) {
                latest_value = value
            } else {
                latest_value = personalAddress.phone
            }

            setPersonalAddress({...personalAddress, [name]:latest_value});
        } else {

            setPersonalAddress({...personalAddress, [name]:value});
        }
    }

    //Billing Address
    useEffect(()=>{
        if(checked){
            setTempShippingAddress({id: uuid(), ...billingAddress});
        }
    }, [billingAddress]);

    const handleBillingAddress = (event) => {

        const {name, value} = event.target;
        SetBillingAddress({...billingAddress, [name]: value});
    }


    //Shipping Address
    const [tempShippingAddress, setTempShippingAddress] = useState("");
    const handleShippingAddress = (event) => {
        const {name, value} = event.target;

        setTempShippingAddress({...tempShippingAddress, [name]: value});
    }


    //CheckBox
    const [checked, setChecked] = useState(false);
    const handleChecked = () =>{
        setChecked(false);
        setTempShippingAddress(billingAddress);
    }



    //handleAddButton
    const handleAddButton = (e) => {
        if (billingAddress.first_name && billingAddress.last_name && billingAddress.phone && billingAddress.location_id && billingAddress.area_id && billingAddress.address && tempShippingAddress.first_name && tempShippingAddress.last_name && tempShippingAddress.phone && tempShippingAddress.location_id && tempShippingAddress.area_id && tempShippingAddress.address ){
            setClicked(!clicked);
            setShippingAddress([...shippingAddress, {id:uuid(), ...tempShippingAddress}]);
            setTempShippingAddress("");
            setCreateBillingIsSet(false);
            setCreateShippingIsSet(false);
        }else{
            setCreateBillingIsSet(true);
            setCreateShippingIsSet(true);
        }
        e.preventDefault();
    }


    //handleAddNewButton
    const [renderShippingForm, setRenderShippingForm] = useState(false)
    const handleAddNewButton = (e) => {
        setRenderShippingForm(!renderShippingForm);
        setRenderEditBillingData(false);
        setRenderEditShippingData(false);
        setChecked(false);
        e.preventDefault();
    }


    //handleAddShippingDada
    const [newShippingData, setNewShippingData] = useState(false);
    const handleAddShippingData = (e) => {
        if (tempShippingAddress.first_name && tempShippingAddress.last_name && tempShippingAddress.phone && tempShippingAddress.location_id && tempShippingAddress.area_id && tempShippingAddress.address ){
            setRenderShippingForm(false);
            setShippingAddress([...shippingAddress, {id:uuid(), ...tempShippingAddress}]);
            setTempShippingAddress("");
            setCreateShippingIsSet(false);
        }
        else{

            setCreateShippingIsSet(true);
        }

        e.preventDefault();
    }



    //deleteShippingData
    const handleShippingDeleteButton = (id) => {

        const deleteShippingCard = shippingAddress.filter(shippingData => shippingData.id != id);
        if (window.confirm('Are you sure you want to delete shipping data?')) {
            setShippingAddress(deleteShippingCard);
            handleShippingAddDeleteButtonAPIRequest(id);
            setLoading(true);
            let response = deleteAction(`shipping-addresses/${id}`)
                .then((result) => result.data)
                .catch((errors) => errors);
            if (response.success) {
                // Need to redirect list page
                setLoading(false);
                setMessage({ ...message, success: response.message });
            } else {
                setLoading(false);
                setMessage({ ...message, error: response.message });
                console.log(response.errors);
            }
        }
        setRenderEditShippingData(false);
        setEditShippingData("");
    }


    //editShippingButton
    const [renderEditShippingData, setRenderEditShippingData] = useState(false);
    const [editShippingData, setEditShippingData] = useState({});
    const handleShippingEditButton = (e,id) => {
        e.preventDefault();
        setRenderShippingForm(false);
        setRenderEditBillingData(false);
        setRenderEditShippingData(!renderEditShippingData);
        const editShippingCard = shippingAddress.find(shippingData => shippingData.id == id);
        setEditShippingData(editShippingCard);
    }

    const handleEditShippingAddress = (event) => {

        const {name, value} = event.target;
        setEditShippingData({...editShippingData, [name]: value});

    }


    //handleEditShippingData
    const handleEditShippingData = (e) => {
        e.preventDefault();
        if (editShippingData.first_name && editShippingData.last_name && editShippingData.phone && editShippingData.location_id && editShippingData.area_id && editShippingData.address ){

            const updateData = shippingAddress.map(data => {
                if (data.id === editShippingData.id){
                    data.first_name = editShippingData.first_name;
                    data.last_name = editShippingData.last_name;
                    data.phone = editShippingData.phone;
                    data.location_id = editShippingData.location_id;
                    data.area_id =  editShippingData.area_id;
                    data.address =  editShippingData.address;
                }
                return data;
            });

            setRenderEditShippingData(false);
            setShippingAddress(updateData);
            setEditShippingIsSet(false);
        }
        else{

            setEditShippingIsSet(true);
        }
    }



    //handleBillingEditButton
    const [renderEditBillingData, setRenderEditBillingData] = useState(false);
    const handleBillingEditButton = (event) => {
        event.preventDefault();
        setRenderShippingForm(false);
        setRenderEditShippingData(false);
        setRenderEditBillingData(!renderEditBillingData);
        setEditBillingData(billingAddress);
    }

    const [editBillingData, setEditBillingData] = useState();
    const handleEditBillingAddress = (event) => {
        const {name, value} = event.target;
        setEditBillingData({...editBillingData, [name]: value});
    }



    //handleEditBillingData
    const handleEditBillingData = (e) =>{
        e.preventDefault();
        if (editBillingData.first_name && editBillingData.last_name && editBillingData.phone && editBillingData.location_id && editBillingData.area_id && editBillingData.address ){
            setRenderEditBillingData(false);
            SetBillingAddress(editBillingData);
            setEditBillingData();
            setEditBillingIsSet(false);
        }
        else{

            setEditBillingIsSet(true);
        }
    }

    // reset customer form

    const resetCustomerData = async (e) => {
        e.preventDefault();
        setPersonalAddress(initialPersonalAddress);
        SetBillingAddress(initialBillingAddress);
        setShippingAddress([]);
        setTempShippingAddress("");
        setChecked(false);
        setClicked(false);
        setRenderShippingForm(false);
        setNewShippingData(false);
        setRenderEditShippingData(false);
        setEditShippingData({});
        setRenderEditBillingData(false);
        setEditBillingData();
        setCustomerValidation(initialValidationErrors);
        setLoading(false);
    }

    useEffect(() => {
        let isMounted = true;

        const fetchedLocations = async () => {
            return await axios
                .get(`locations`)
                .then((result) => result.data)
                .catch((error) => error);
        };

        fetchedLocations()
            .then((response) => {
                if (isMounted) {
                    response.success
                        ? setLocation(response.data)
                        : () => {
                            throw "Server is not responding";
                        };
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return () => (isMounted = false);
    }, []);


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
                                        <i className="far fa-plus-square"></i>
                                        <h2>Edit Customer</h2>
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

                                                                <PersonalDetailsForm personalAddress={personalAddress} customerValidation={customerValidation} loading={loading} handlePersonalAddress={handlePersonalAddress} > </PersonalDetailsForm>

                                                                <div className="custom-card-box mt-4">
                                                                    <div className="custom-card-box-header">
                                                                        <div className="fbh-title">
                                                                            <span className="badge">02</span>
                                                                            <h2>Addresses</h2>
                                                                            <div className="ml-auto">
                                                                                {
                                                                                    clicked &&
                                                                                    (
                                                                                        <a href="#"  onClick={(e)=>handleAddNewButton(e)}>
                                                                                            <i className="far fa-plus-square"></i> Add New
                                                                                        </a>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="custom-card-box-content">
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <fieldset disabled={loading}>
                                                                                    <div className="row">
                                                                                        {
                                                                                            clicked ?
                                                                                                (
                                                                                                    <>
                                                                                                        <div className="col-sm-6">
                                                                                                            <h3 className="text-center mb-2" >Billing Information</h3>
                                                                                                            <BillingCard billingAddress={billingAddress} handleBillingEditButton={handleBillingEditButton} ></BillingCard>
                                                                                                        </div>
                                                                                                        <div className="col-sm-6">
                                                                                                            <h3 className="text-center mb-2" >Shipping Information</h3>

                                                                                                            {
                                                                                                                shippingAddress.map(data => data.first_name && data.last_name && data.address && <ShippingCard key = {data.id}  data={data} checked={checked} billingAddress={billingAddress} handleShippingDeleteButton={handleShippingDeleteButton} handleShippingEditButton={handleShippingEditButton} ></ShippingCard>)
                                                                                                            }

                                                                                                        </div>
                                                                                                    </>
                                                                                                )
                                                                                                :
                                                                                                ''
                                                                                        }
                                                                                        {
                                                                                            renderShippingForm &&
                                                                                            (
                                                                                                <div className="col-lg-12">
                                                                                                    <ShippingAddress locations={location} handleShippingAddress={handleShippingAddress} handleChecked={handleChecked} checked={checked}  billingAddress={billingAddress} shippingAddress={shippingAddress} renderShippingForm={renderShippingForm} handleAddShippingData={handleAddShippingData} createShippingIsSet={createShippingIsSet} tempShippingAddress={tempShippingAddress}></ShippingAddress>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            renderEditShippingData &&
                                                                                            (
                                                                                                <div className="col-lg-12">
                                                                                                    <EditShippingAddress locations={location} editShippingData={editShippingData} renderEditShippingData={renderEditShippingData} handleEditShippingAddress={handleEditShippingAddress} handleEditShippingData={handleEditShippingData} editShippingIsSet={editShippingIsSet}></EditShippingAddress>
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                        {
                                                                                            renderEditBillingData &&
                                                                                            (
                                                                                                <div className="col-lg-12" >
                                                                                                    <EditBillingAddress locations={location} billingAddress={billingAddress} handleEditBillingData={handleEditBillingData} handleEditBillingAddress={handleEditBillingAddress} editBillingData={editBillingData} editBillingIsSet={editBillingIsSet}></EditBillingAddress>
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                    </div>
                                                                                </fieldset>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-6 offset-lg-6 mt-4 text-right">
                                                                    <div className="form-group">
                                                                        <Link legacyBehavior href={'/admin/customer'}>
                                                                            <a className='btn btn-info mr-2'>
                                                                                <i className='icon-arrow-left-solid mr-1 mr-1' />
                                                                                Back
                                                                            </a>
                                                                        </Link>

                                                                        <button
                                                                            type="submit"
                                                                            onClick={resetCustomerData}
                                                                            className="btn btn-danger mr-2">
                                                                            <i className="icon-reset mr-1"/>
                                                                            Reset
                                                                        </button>

                                                                        <button
                                                                            type="submit"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                saveCustomerData(e);
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

export default EditCustomer;