import React from "react";

const ShippingCard = (props) => {
    // console.log(props);
    return (

        <>
            <div className="card-body border bg-linear-active mt-2 mb-3">
                <div className="da-card-wrap ">
                    <div className= "da-card d-flex justify-content-between ">
                        <div>
                            <h5 className="da-card-area-title">{props.data.first_name} {props.data.last_name}</h5>
                            <p>{props.data.address}</p>
                        </div>
                        <div className="dac-action ">

                            <i
                                className="icon-pencil"
                                style={{color:"blue"}}
                                onClick={(e)=>props.handleShippingEditButton(e, props.data.id)}
                            > </i>


                            <i
                                className="icon-trash-alt-regular"
                                style={{color:"red"}}
                                onClick={()=>props.handleShippingDeleteButton(props.data.id)}
                            > </i>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ShippingCard