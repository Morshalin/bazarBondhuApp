import React, {useState} from 'react';


const BillingAddress = (props) =>{
    const [area, setArea] = useState(null);
    const getAreaFromLocation = (locationId) => {
        const desiredArea = props.locations.find(location => location.id == locationId);
        if(desiredArea){
            setArea(desiredArea.areas);
        }
    }

    return(
        <div className="row">
            <div className="col-md-12">
                <h5>Billing Address</h5>
                <div className="form-group">

                    <label htmlFor="name">
                        First Name
                        <span className="text-danger"> * </span>
                    </label>

                    <input
                        autoComplete="off"
                        type="text"
                        className={`form-control ${props.createBillingIsSet ? (!props.billingAddress.first_name && `error_border`) : ``}`}
                        id="BA_First_Name101"
                        name="first_name"
                        onChange={props.handleBillingAddress}
                        value={props.billingAddress.first_name}
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
                        className={`form-control ${props.createBillingIsSet ? (!props.billingAddress.last_name && `error_border`) : ``}`}
                        id="BA_LAst_Name102"
                        name="last_name"
                        onChange={props.handleBillingAddress}
                        value={props.billingAddress.last_name}
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
                        className={`form-control ${props.createBillingIsSet ? (!props.billingAddress.phone && `error_border`) : ``}`}
                        id="BA_Mobile_Number103"
                        name="phone"
                        onChange={props.handleBillingAddress}
                        value={props.billingAddress.phone}
                        placeholder="Mobile Number" required/>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label>Select Location <span className="text-danger">*</span></label>

                    <select
                        name={'location_id'}
                        onChange={(e) => {
                            props.handleBillingAddress(e);
                            getAreaFromLocation(e.target.value);
                        }}
                        className={`form-control rounded-0 ${props.createBillingIsSet ? (!props.billingAddress.location_id && `error_border`) : ``}`}>
                        value={props.billingAddress.location_id}>
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
                        id="BA_SelectArea104"
                        onChange={props.handleBillingAddress}
                        className={`form-control rounded-0 ${props.createBillingIsSet ? (!props.billingAddress.area_id && `error_border`) : ``}`}>
                        value={props.billingAddress.area_id}>
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
                        Enter your Address
                        <span className="text-danger"> * </span>
                    </label>

                    <textarea
                        autoComplete="off"
                        id="BA_Address105"
                        name="address"
                        onChange={props.handleBillingAddress}
                        value={props.billingAddress.address}
                        className={`form-control ${props.createBillingIsSet ? (!props.billingAddress.address && `error_border`) : ``}`}
                        rows="4" cols="50"
                        placeholder="Address Details"
                    />
                </div>
            </div>
        </div>
    )
}
export default BillingAddress;