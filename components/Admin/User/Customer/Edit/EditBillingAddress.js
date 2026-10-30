import React, {useState} from 'react';


const EditBillingAddress = (props) =>{
    const [area, setArea] = useState(() => {
        if(props.editBillingData){
            // return props.locations.find(location => location.id == props.editBillingData.location_id).areas;
            const selectedLocation = props.locations.find(location => location.id == props.editBillingData.location_id);
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
        if(desiredArea)
        {
            setArea(desiredArea.areas);
        }

    }


    return(
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-6">
                        <h5>Billing Address</h5>
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
                        className={`form-control ${props.editBillingIsSet ? (!props.editBillingData.first_name && `error_border`) : ``}`}
                        id="SA-FirstName107"
                        name="first_name"
                        value={props.editBillingData.first_name}
                        onChange={props.handleEditBillingAddress}
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
                        className={`form-control ${props.editBillingIsSet ? (!props.editBillingData.last_name && `error_border`) : ``}`}
                        id="SA_Last_Name108"
                        name="last_name"
                        value={props.editBillingData.last_name}
                        onChange={props.handleEditBillingAddress}
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
                        className={`form-control ${props.editBillingIsSet ? (!props.editBillingData.phone && `error_border`) : ``}`}
                        id="SA-MobileNumber109"
                        name="phone"
                        value={props.editBillingData.phone}
                        onChange={props.handleEditBillingAddress}
                        placeholder="Mobile Number" required/>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">

                    <label>Select Location <span className="text-danger">*</span></label>

                    <select
                        name={'location_id'}
                        id="SA-SelectLocation1010"
                        value={props.editBillingData.location_id}
                        onChange={(e) => {
                            props.handleEditBillingAddress(e);
                            getAreaFromLocation(e.target.value);
                        }}
                        className={`form-control rounded-0 ${props.editBillingIsSet ? (!props.editBillingData.location_id && `error_border`) : ``}`}>

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
                        value={props.editBillingData.area_id}
                        onChange={props.handleEditBillingAddress}
                        className={`form-control rounded-0 ${props.editBillingIsSet ? (!props.editBillingData.area_id && `error_border`) : ``}`}>

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
                        value={props.editBillingData.address}
                        onChange={props.handleEditBillingAddress}
                        className={`form-control ${props.editBillingIsSet ? (!props.editBillingData.address && `error_border`) : ``}`}
                        rows="4" cols="50"
                        placeholder="Address Details"
                    />
                </div>
            </div>



            <div className="col-md-12 text-right mt-2">
                <div className="form-group">
                    <button className="btn btn-primary" onClick={(e)=>props.handleEditBillingData(e)} >Update </button>
                </div>
            </div>



        </div>
    )
}
export default EditBillingAddress;