import React, {useState} from 'react';


const EditShippingAddress = (props) =>{
    const [area, setArea] = useState(() => {
        if(props.editShippingData){
            // return props.locations.find(location => location.id == props.editShippingData.location_id).areas;
            const selectedLocation = props.locations.find(location => location.id == props.editShippingData.location_id);
            if(selectedLocation)
            {
                return selectedLocation.areas;
            }else{
                return null;
            }
        }
        return null;
    });

    const getAreaFromLocation = (locationId) => {
        const desiredArea = props.locations.find(location => location.id == locationId);
        if(desiredArea){
            setArea(desiredArea.areas);
        }
    }

    return(
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-6">
                        <h5>Shipping Address</h5>
                    </div>


                </div>
                <div className="form-group">

                    <label htmlFor="name">
                        First Name
                        <span className="text-danger"> * </span>
                    </label>

                    <input
                        autoComplete="off"
                        type="text"
                        className={`form-control ${props.editShippingIsSet ? (!props.editShippingData.first_name && `error_border`) : ``}`}
                        id="SA-FirstName107"
                        name="first_name"
                        value={props.editShippingData.first_name}
                        onChange={props.handleEditShippingAddress}
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
                        className={`form-control ${props.editShippingIsSet ? (!props.editShippingData.last_name && `error_border`) : ``}`}
                        id="SA_Last_Name108"
                        name="last_name"
                        value={props.editShippingData.last_name}
                        onChange={props.handleEditShippingAddress}
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
                        className={`form-control ${props.editShippingIsSet ? (!props.editShippingData.phone && `error_border`) : ``}`}
                        id="SA-MobileNumber109"
                        name="phone"
                        value={props.editShippingData.phone}
                        onChange={props.handleEditShippingAddress}
                        placeholder="Mobile Number" required/>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label>Select Location <span className="text-danger">*</span></label>

                    <select
                        name={'location_id'}
                        id="SA-SelectLocation1010"
                        value={props.editShippingData.location_id}
                        onChange={(e) => {
                            props.handleEditShippingAddress(e);
                            getAreaFromLocation(e.target.value);
                        }}
                        className={`form-control rounded-0 ${props.editShippingIsSet ? (!props.editShippingData.location_id && `error_border`) : ``}`}>

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
                        value={props.editShippingData.area_id}
                        onChange={props.handleEditShippingAddress}
                        className={`form-control rounded-0 ${props.editShippingIsSet ? (!props.editShippingData.area_id && `error_border`) : ``}`}>

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
                        value={props.editShippingData.address}
                        onChange={props.handleEditShippingAddress}
                        className={`form-control ${props.editShippingIsSet ? (!props.editShippingData.address && `error_border`) : ``}`}
                        rows="4" cols="50"
                        placeholder="Address Details"
                    />
                </div>
            </div>



                    <div className="col-md-12 text-right mt-2">
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={(e)=>props.handleEditShippingData(e)} >Update </button>
                        </div>
                    </div>



        </div>
    )
}
export default EditShippingAddress;