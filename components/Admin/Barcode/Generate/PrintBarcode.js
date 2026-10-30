import React from 'react';
import Barcode from "./Barcode";

const PrintBarcode = (props) => {

    const barcodePrint = () => {
        window.print()
    }

    return (
        <>
            <div className="custom-card-box-content">

                <div className="row">
                    <div className="col-xl-12 mb-3 print-d-none">
                        <button
                            className="btn btn-primary btn-lg btn-block"
                            onClick={() => barcodePrint()}>
                            Print Barcode
                        </button>
                    </div>

                    <div className="col-xl-12 mb-3">
                        <div className="purchase-details shadow-sm barcode-wrap">

                            <div className="paper-a4" id="printDiv">
                                <div className="barcode4">

                                    {
                                        props.products && props.products.map((product, index) => {
                                            if (product.barcode) {
                                                return (<Barcode key={++index} product={product}/>);
                                            } else {
                                                return alert('Please add barcode first.');
                                            }
                                        })
                                    }

                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="col-xl-12 print-d-none">
                        <button
                            className="btn btn-primary btn-lg btn-block"
                            onClick={() => barcodePrint()}>
                            Print Barcode
                        </button>
                    </div>

                </div>

            </div>
        </>
    );
};


export default PrintBarcode;
