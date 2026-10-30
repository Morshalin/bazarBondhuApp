/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import process from '../../../next.config'
import Select from "react-select";
import {
    ADD_CUSTOMER_SHIPPING_ADDRESS,
    EDIT_CUSTOMER_SHIPPING_ADDRESS,
    SET_AREAS,
    UPDATE_CUSTOMER_SHIPPING_ADDRESS
} from '../../../store/frontend/actions/deliveryActions'
import {saveAction, updateAction} from "../../../Helpers/Utils/Utils";

const AddDeliveryAddress = (props) => {
    const api_url = process.env.api_url;

    const [errors, setErrors] = useState({})

    const [allLocations, setAllLocations] = useState([]);

    let initialLocation = {
        value: '',
        label: 'Select a location'
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const [allAreas, setAllAreas] = useState([]);

    let initialSelectedArea = {
        value: '',
        label: 'Select an area'
    };

    const [selectedArea, setSelectedArea] = useState(initialSelectedArea);

    useEffect(() => {
        let locationData = props?.locations?.map(({id, name}) => {
            return {
                value: id,
                label: name
            }
        });

        setAllLocations(locationData);
    }, [props.locations])

    const [addressFormData, setAddressFormData] = useState({
        order_id: '',
        shop_id: 1,
        // name: '',
        first_name: '',
        last_name: '',
        phone: '',
        location_id: '',
        area_id: '',
        address: '',
    });

    useEffect(() => {
        setAddressFormData({
            order_id: props.editableShippingAddress.order_id ?? '',
            shop_id: props.editableShippingAddress.shop_id ?? 1,
            // name: props.editableShippingAddress.name ?? '',
            first_name: props.editableShippingAddress.first_name ?? '',
            last_name: props.editableShippingAddress.last_name ?? '',
            phone: props.editableShippingAddress.phone ?? '',
            location_id: props.editableShippingAddress.location_id ?? '',
            area_id: props.editableShippingAddress.area_id ?? '',
            address: props.editableShippingAddress.address ?? '',
        });

        if (props.editableShippingAddress) {

            setSelectedLocation({
                value: props?.editableShippingAddress?.location?.id,
                label: props?.editableShippingAddress?.location?.name,
            });

            let areaData = props?.areas?.filter((item) => item.location_id === props?.editableShippingAddress?.location?.id);

            let areaByLocation = areaData?.map(({id, name}) => {
                return {
                    value: id,
                    label: name
                }
            });

            setAllAreas(areaByLocation);

            setSelectedArea({
                value: props?.editableShippingAddress?.area?.id,
                label: props?.editableShippingAddress?.area?.name,
            });
        }

    }, [props.editableShippingAddress]);


    const handleChange = (e) => {
        e.preventDefault()

        let name = e.target.name
        let value = e.target.value

        setAddressFormData({
            ...addressFormData,
            [name]: value,
        })

        setErrors({
            ...errors,
            [name]: '',
        });
    }

    const changeLocation = (location) => {

        setErrors({
            ...errors,
            location_id: '',
            area_id: ''
        });

        setSelectedLocation(location);

        setAddressFormData((prevState) => {
            return {
                ...prevState,
                location_id: location.value
            }
        });

        let areaData = props?.areas?.filter((item) => item.location_id === location.value);

        let areaByLocation = areaData?.map(({id, name}) => {
            return {
                value: id,
                label: name
            }
        });

        setSelectedArea(initialSelectedArea);
        setAllAreas(areaByLocation);
    }

    const handleSubmit = async (e, type) => {
        e.preventDefault()

        if (type === 'add') {

            saveAction(`${api_url}/customer-addresses`, addressFormData)
                .then((res) => {
                    if (res.success) {
                        props.addCustomerShippingAddress(res.data);
                        resetFormData();
                    } else {
                        setErrors(res.errors);
                    }
                }).catch((err) => err);

        }

        if (type === 'update') {

            updateAction(`${api_url}/customer-addresses/${props.editableShippingAddress.id}`, addressFormData)
                .then((res) => {
                    if (res.success) {
                        // For reset Customer Shipping Address
                        props.editCustomerShippingAddress()

                        // After edit a set the updated customer shipping address
                        props.updateCustomerShippingAddress(res.data)
                        resetFormData()
                    } else {
                        setErrors(res.errors);
                    }
                });
        }
    }

    const validate = () => {
        let errors = {}

        if (isEmpty(addressFormData.first_name)) {
            errors.first_name = 'The first name field is required.'
        }

        if (isEmpty(addressFormData.last_name)) {
            errors.last_name = 'The last name field is required.'
        }
        if (isEmpty(addressFormData.phone)) {
            errors.phone = 'Mobile number is required.'
        }

        if (addressFormData.phone.length !== 11) {
            errors.phone = 'Mobile number must be 11 characters.';
        }

        if (isEmpty(addressFormData.location_id)) {
            errors.location_id = 'The location field is required.'
        }
        if (isEmpty(addressFormData.area_id)) {
            errors.area_id = 'The area field is required.'
        }
        if (isEmpty(addressFormData.address)) {
            errors.address = 'The address field is required.'
        }
        setErrors(errors)

        return Object.keys(errors).length === 0 && errors.constructor === Object
            ? {
                success: true,
                message: '',
                errors: '',
            }
            : {
                success: false,
                message: 'Please fix the following issues',
                errors: errors,
            }
    }

    const isEmpty = (value) => value === null || value === '';

    const resetFormData = () => {
        setAddressFormData({
            order_id: '',
            shop_id: 2,
            first_name: '',
            last_name: '',
            phone: '',
            location_id: '',
            area_id: '',
            address: '',
        });

        setSelectedLocation(initialLocation);
        setSelectedArea(initialSelectedArea);
    }

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
            <form className='delevery-address-form'>

                <div className='form-group'>
                    <label>
                        First Name <span className='text-danger'>*</span>
                    </label>

                    <input
                        name={'first_name'}
                        onChange={handleChange}
                        value={addressFormData?.first_name}
                        type='text'
                        className={`form-control rounded-0 ${errors?.first_name && `is-invalid`}`}
                        placeholder='First Name'
                    />

                    <div id='first_name' className={errors?.first_name && `invalid-feedback`}>
                        {errors?.first_name}
                    </div>
                </div>

                <div className='form-group'>
                    <label>
                        Last Name <span className='text-danger'>*</span>
                    </label>

                    <input
                        name={'last_name'}
                        onChange={handleChange}
                        value={addressFormData?.last_name}
                        type='text'
                        className={`form-control rounded-0 ${errors?.last_name && `is-invalid`}`}
                        placeholder='Last Name'
                    />

                    <div id='last_name' className={errors?.last_name && `invalid-feedback`}>
                        {errors?.last_name}
                    </div>
                </div>

                <div className='form-group'>
                    <label className='form-group'>
                        Mobile Number <span className='text-danger'>*</span>
                    </label>

                    <div className='input-group mb-3'>
                        <div className='input-group-prepend rounded-0'>
							<span className='input-group-text rounded-0' id='basic-addon1'>
								+88
							</span>
                        </div>

                        <input
                            name={'phone'}
                            value={addressFormData?.phone}
                            onChange={(e) => {
                                e.preventDefault();
                                if (!mobilePhoneValidation(e)) {
                                    handleChange(e)
                                }
                            }}
                            type='text'
                            className={`form-control rounded-0 ${
                                errors?.phone && `is-invalid` || clientErrors?.phone && `is-invalid`
                            }`}
                            placeholder='e.g. 01913800877'
                        />

                        <div id='phone'
                             className={errors?.phone && `invalid-feedback` || clientErrors?.phone && `invalid-feedback`}>
                            {errors?.phone || clientErrors?.phone}
                        </div>
                    </div>
                </div>

                <div className='form-group'>
                    <label>
                        Select Location <span className='text-danger'>*</span>
                    </label>

                    <Select
                        className={`form-control border-0 custom-height ${
                            errors?.location_id ? `is-invalid` : ``
                        }`}
                        onChange={(selectedOption) => {
                            changeLocation(selectedOption);
                        }}
                        value={selectedLocation}
                        options={allLocations ?? selectedLocation}
                        autoFocus={false}
                        isClearable={false}/>


                    <div
                        id='location_id'
                        className={errors?.location_id ? `invalid-feedback` : ``}
                    >
                        {errors?.location_id}
                    </div>
                </div>

                <div className='form-group'>
                    <label>
                        Select Area <span className='text-danger'>*</span>
                    </label>

                    <Select
                        className={`form-control border-0 custom-height ${
                            errors?.area_id ? `is-invalid` : ``
                        }`}
                        onChange={(selectedOption) => {
                            setSelectedArea(selectedOption);
                            setAddressFormData((prevState) => {
                                return {
                                    ...prevState,
                                    area_id: selectedOption.value
                                }
                            })
                        }}
                        value={(allAreas?.length > 0) ? selectedArea : initialSelectedArea}
                        options={allAreas}
                        autoFocus={false}
                        isClearable={false}/>


                    <div id='area_id' className={errors?.area_id ? `invalid-feedback` : ``}>
                        {errors?.area_id}
                    </div>
                </div>

                <div className='form-group'>
                    <label>
                        Address Details <span className='text-danger'>*</span>
                    </label>

                    <textarea
                        placeholder="Eg. Peyarabag, Boro Mogbazar, Dhaka-1217, Bangladesh"
                        name={'address'}
                        className={`form-control rounded-0 ${
                            errors?.address && `is-invalid`
                        }`}
                        onChange={handleChange}
                        value={addressFormData?.address}
                        rows='3'/>

                    <div id='address' className={errors?.address && `invalid-feedback`}>
                        {errors?.address}
                    </div>
                </div>

                <div className='form-group d-flex justify-content-end text-center'>
                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            // eslint-disable-next-line no-unused-expressions
                            validate().success
                                ? handleSubmit(
                                event,
                                props.editableShippingAddress ? 'update' : 'add'
                                )
                                : ''
                        }}
                        className='btn btn-add-update'
                    >
                        {props.editableShippingAddress ? `Update` : `Add`}
                    </button>
                </div>
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAreas: (areas) =>
            dispatch({
                type: SET_AREAS,
                payload: {areas},
            }),

        addCustomerShippingAddress: (address) =>
            dispatch({
                type: ADD_CUSTOMER_SHIPPING_ADDRESS,
                payload: {address},
            }),

        editCustomerShippingAddress: (address) =>
            dispatch({
                type: EDIT_CUSTOMER_SHIPPING_ADDRESS,
                payload: {address},
            }),

        updateCustomerShippingAddress: (address) =>
            dispatch({
                type: UPDATE_CUSTOMER_SHIPPING_ADDRESS,
                payload: {address},
            }),
    }
}

const mapStateToProps = (store) => {
    const {editableShippingAddress, locations, areas, allAreas} =
        store.deliveryStore

    return {editableShippingAddress, locations, areas, allAreas}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeliveryAddress)
