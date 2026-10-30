import React from 'react';
import PurchaseReturnLeftBar from "./PurchaseReturnLeftBar";
import PurchaseReturnSearch from "./PurchaseReturnSearch";
import PurchaseReturnSupplier from "./PurchaseReturnSupplier";
import PurchaseReturnItemList from "./PurchaseReturnItemList";
import PurchaseReturnCalculation from "./PurchaseReturnCalculation";
import PurchaseReturnSubmit from "./PurchaseReturnSubmit";

const AddPurchaseReturn = () => {
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
                                        <h2>Add Purchase Return</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below. The field labels marked with  <span className="text-danger"> * </span> are
                                            required input fields.
                                        </p>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">
                                    <div className="row">
                                        <div className="col-xl-3 mb-4">
                                            <div className="purchase-options shadow-sm">
                                                <PurchaseReturnLeftBar/>
                                            </div>
                                        </div>
                                        <div className="col-xl-9">
                                            <div className="purchase-details shadow-sm">
                                                <PurchaseReturnSupplier/>
                                                <PurchaseReturnSearch/>
                                                <PurchaseReturnItemList/>
                                                <PurchaseReturnCalculation/>
                                                <PurchaseReturnSubmit/>

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

export default AddPurchaseReturn;