import React from 'react';
import AdjustmentItemList from "./AdjustmentItemList";
import SubmitAdjustment from "./SubmitAdjustment";
import SearchProduct from "./SearchProduct";
import AdjustmentDate from "./AdjustmentDate";

const AddAdjustment = () => {
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
                                        <h2>Add Adjustment</h2>
                                    </div>

                                    <div className="fbh-info">
                                        <p>
                                            Search by product name or barcode for adjustment product.
                                        </p>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="purchase-details shadow-sm">

                                                <AdjustmentDate/>

                                                <SearchProduct/>

                                                <AdjustmentItemList/>

                                                <SubmitAdjustment/>

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


export default AddAdjustment;