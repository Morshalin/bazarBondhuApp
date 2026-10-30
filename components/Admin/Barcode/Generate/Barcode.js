import React from 'react';
import BarcodeGenerator from "./BarcodeGenerator";
import {connect} from "react-redux";

const Barcode = (props) => {

    const productBarcode = () => {
        let barcode = new Map();
        for (let i = 0; i < parseInt(props.product.qty); i++) {
            barcode.set(
                <div className="barcode-item" key={props.product.id}>
                    <p className="bc-site-name">{props.company_name_active ? props.product.shop_name : ``}</p>
                    <p className="bc-product-name">{props.product_name_active ? props.product.name : ``}</p>

                    <BarcodeGenerator barcode={props.product.barcode}/>

                    <p className="product-code-price">
                        <span
                            className="product-code">{props.product_barcode_active ? props.product.barcode : ``}</span>
                        <span
                            className="product-price">{props.product_price_active ? `৳${props.product.price}` : ``} </span>
                    </p>
                </div>
            )
        }
        return barcode;
    }


    return (
        <>
            {(props.product.qty > 0) ? productBarcode() : ''}
        </>
    );
};

const mapStateToProps = (store) => {
    const {
        product_name_active,
        product_price_active,
        product_barcode_active,
        company_name_active
    } = store.printBarcodeStore;

    return {
        product_name_active,
        product_price_active,
        product_barcode_active,
        company_name_active
    };
}


export default connect(mapStateToProps, null)(Barcode);
