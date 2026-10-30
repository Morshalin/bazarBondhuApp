import React from 'react';
import SaleReturnLeftBar from "./SaleReturnLeftBar";
import SaleReturnCustomer from "./SaleReturnCustomer";
import SaleReturnSearch from "./SaleReturnSearch";
import SaleReturnItemList from "./SaleReturnItemList";
import SaleReturnCalculation from "./SaleReturnCalculation";
import SaleReturnSubmit from "./SaleReturnSubmit";

const AddSaleReturn = () => {
    return (
        <>
            <section className="custom-card add-purchase">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-plus-square-regular"/>
                                        <h2>Add Sale Return</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>
                                            Please fill in the information below. The field labels marked with * are
                                            required input fields.
                                        </p>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">
                                    <div className="row">
                                        <div className="col-xl-3 mb-4">
                                            <div className="purchase-options shadow-sm">
                                                <SaleReturnLeftBar/>
                                            </div>
                                        </div>
                                        <div className="col-xl-9">
                                            <div className="purchase-details shadow-sm">
                                                <SaleReturnCustomer/>
                                                <SaleReturnSearch/>
                                                <SaleReturnItemList/>
                                                <SaleReturnCalculation/>
                                                <SaleReturnSubmit/>
                                            </div>
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
};

export default AddSaleReturn;