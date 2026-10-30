import React, {useEffect, useState} from 'react';


const ShippingAddress = (props) =>{
    const [area, setArea] = useState(null);
    const getAreaFromLocation = (locationId) => {
        const desiredArea = props.locations.find(location => location.id == locationId);
        if(desiredArea){
            setArea(desiredArea.areas);
        }
    }

    useEffect(() => {
        if(props.checked && props.billingAddress && props.locations){
            const desiredArea = props.locations.find(location => location.id == props.billingAddress.location_id);
            if(desiredArea){
                setArea(desiredArea.areas);
            }
        }
    },[props.billingAddress.location_id]);

    return(
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-6">
                        <h5>Shipping Address</h5>
                    </div>
                    {
                        props.renderShippingForm ?
                        ""
                            :
                        (
                            <div className="col-6">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        checked={props.checked}
                                        onChange={props.handleChecked}
                                        name="sent_email"
                                        id="sent_email"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="sent_email"
                                    >
                                        Same as Billing
                                    </label>
                                </div>
                            </div>
                        )
                    }

                </div>
                <div className="form-group">

                    <label htmlFor="name">
                        First Name
                        <span className="text-danger"> * </span>
                    </label>

                    <input
                        autoComplete="off"
                        type="text"
                        className={`form-control ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.first_name : props.tempShippingAddress.first_name ) && `error_border`) : ``}`}
                        id="SA-FirstName107"
                        name="first_name"
                        onChange={props.handleShippingAddress}
                        value={props.checked ? props.billingAddress.first_name : props.tempShippingAddress.first_name }
                        placeholder="First Name" required/>

                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label htmlFor="name">
                        Last Name
                        <span className="text-danger"> * </span>
                    </label>

                    <input
                        autoComplete="off"
                        type="text"
                        className={`form-control ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.last_name : props.tempShippingAddress.last_name ) && `error_border`) : ``}`}
                        id="SA_Last_Name108"
                        name="last_name"
                        onChange={props.handleShippingAddress}
                        value={props.checked ? props.billingAddress.last_name : props.tempShippingAddress.last_name }
                        placeholder="Last Name" required/>
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
                        className={`form-control ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.phone : props.tempShippingAddress.phone ) && `error_border`) : ``}`}
                        id="SA-MobileNumber109"
                        name="phone"
                        onChange={props.handleShippingAddress}
                        value={props.checked ? props.billingAddress.phone : props.tempShippingAddress.phone }
                        placeholder="Mobile Number" required/>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label>Select Location <span className="text-danger">*</span></label>

                    <select
                        name={'location_id'}
                        id="SA-SelectLocation1010"
                        onChange={(e) => {
                            props.handleShippingAddress(e);
                            getAreaFromLocation(e.target.value);
                        }}
                        value={props.checked ? props.billingAddress.location_id : props.tempShippingAddress.location_id }
                        className={`form-control rounded-0 ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.location_id : props.tempShippingAddress.location_id ) && `error_border`) : ``}`}>

                        <option value="">Select Location....</option>
                        {
                            props.locations && props.locations.map((location, index) => (
                                <option value={location.id} key={index}>{location.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label>Select Area <span className="text-danger">*</span></label>

                    <select
                        name={'area_id'}
                        id="SA-SelectArea1011"
                        onChange={props.handleShippingAddress}
                        value={props.checked ? props.billingAddress.area_id : props.tempShippingAddress.area_id }
                        className={`form-control rounded-0 ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.area_id : props.tempShippingAddress.area_id ) && `error_border`) : ``}`}>

                        <option value="">Select Area....</option>
                        {
                            area && area.map((area, index) => (
                                <option value={area.id} key={index}>{area.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label htmlFor="name">
                        Enter Your Address
                        <span className="text-danger"> * </span>
                    </label>

                    <textarea
                        autoComplete="off"
                        id="SA-Address1012"
                        name="address"
                        onChange={props.handleShippingAddress}
                        value={props.checked ? props.billingAddress.address : props.tempShippingAddress.address }
                        className={`form-control ${props.createShippingIsSet ? (!( props.checked ? props.billingAddress.address : props.tempShippingAddress.address ) && `error_border`) : ``}`}
                        rows="4" cols="50"
                        placeholder="Address Details"
                    />
                </div>
            </div>
            {
                props.renderShippingForm &&
                (
                    <div className="col-md-12 text-right mt-2">
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={(e)=>props.handleAddShippingData(e)} >Add </button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default ShippingAddress;