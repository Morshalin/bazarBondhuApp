import React from 'react';
import SearchBarcode from "./SearchBarcode";
import PrintItemList from "./PrintItemList";
import SubmitPrint from "./SubmitPrint";
import PrintBarcode from "../Generate/PrintBarcode";
import {connect} from "react-redux";

const AddBarcode = (props) => {
    return (
        <>
            <section className="custom-card add-purchase">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">

                                <div className="custom-card-box-header print-d-none">

                                    <div className="fbh-title">
                                        <i className="icon-plus-square-regular"/>
                                        <h2>Print Barcode</h2>
                                    </div>

                                    <div className="fbh-info">
                                        <p>
                                            Search by product name or barcode to print barcode.
                                        </p>
                                    </div>
                                </div>


                                <div className="custom-card-box-content print-d-none">

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="purchase-details shadow-sm">


                                                <SearchBarcode/>
                                                <PrintItemList/>
                                                <SubmitPrint/>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {(props.products.length > 0) ? <PrintBarcode products={props.products}/> : ''}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (store) => {
    const {
        products,
    } = store.printBarcodeStore;

    return {
        products,
    };
}


export default connect(mapStateToProps, null)(AddBarcode)
