import React from "react";

const BillingCard = (props) => {
    // console.log(props);
    return (

        <>
            <div className="card-body bg-linear-active border mt-2 mb-3">
                <div className="da-card-wrap">
                    <div className= "da-card d-flex justify-content-between">
                        <div>
                            <h5 className="da-card-area-title">{props.billingAddress.first_name} {props.billingAddress.last_name}</h5>
                            <p>{props.billingAddress.address}</p>
                        </div>
                        <div className="dac-action">

                            <i
                                className="icon-pencil"
                                style={{color:"blue"}}
                                onClick={(e)=> props.handleBillingEditButton(e)}
                            ></i>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
export default BillingCard