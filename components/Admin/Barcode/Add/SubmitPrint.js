import React from 'react';
import {connect} from "react-redux";
import {CHANGE_ACTIVE_OPTION, RESET_PRINT_BARCODE} from "../../../../store/admin/actions/barcode/printBarcodeAction";

const SubmitPrint = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group custom-sr-box d-flex">
                        <label className="mr-3">Print Options: </label>
                        <div className="form-group d-flex">

                            <div className="custom-control custom-checkbox mr-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="product_name_active"
                                    name="product_name_active"
                                    onChange={(e) => {
                                        props.changeActiveOption(e.currentTarget.name, e.currentTarget.checked);
                                    }}
                                    defaultChecked={props.printBarcodeStore.product_name_active}/>
                                <label
                                    className="custom-control-label"
                                    htmlFor="product_name_active">
                                    Product Name
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox mr-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="product_barcode_active"
                                    name="product_barcode_active"
                                    onChange={(e) => {
                                        props.changeActiveOption(e.currentTarget.name, e.currentTarget.checked);
                                    }}
                                    defaultChecked={props.printBarcodeStore.product_barcode_active}/>
                                <label
                                    className="custom-control-label"
                                    htmlFor="product_barcode_active">
                                    Barcode
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox mr-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="product_price_active"
                                    name="product_price_active"
                                    onChange={(e) => {
                                        props.changeActiveOption(e.currentTarget.name, e.currentTarget.checked);
                                    }}
                                    defaultChecked={props.printBarcodeStore.product_price_active}/>
                                <label
                                    className="custom-control-label"
                                    htmlFor="product_price_active">
                                    Price
                                </label>
                            </div>

                            <div className="custom-control custom-checkbox mr-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="company_name_active"
                                    name="company_name_active"
                                    onChange={(e) => {
                                        props.changeActiveOption(e.currentTarget.name, e.currentTarget.checked);
                                    }}
                                    defaultChecked={props.printBarcodeStore.company_name_active}/>
                                <label
                                    className="custom-control-label"
                                    htmlFor="company_name_active">
                                    Shop Name
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {printBarcodeStore} = store;

    return {printBarcodeStore};
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeActiveOption: (name, value) => dispatch({type: CHANGE_ACTIVE_OPTION, payload: {name, value}}),
        resetPrintBarcode: () => dispatch({type: RESET_PRINT_BARCODE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPrint);