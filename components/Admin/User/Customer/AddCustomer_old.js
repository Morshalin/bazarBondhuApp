import React, {useEffect, useState} from 'react';
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const AddCustomer = (props) => {

    


    return (
        <>

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="far fa-plus-square"></i>
                                        <h2>Add Customer</h2>
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

                                                <fieldset>
                                                    
                                                      
                                                            
                                                </fieldset>


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



export default AddCustomer;