import React from 'react';
import { connect } from "react-redux";
import { POS_CHANGE_QTY, POS_DECREASE, POS_INCREASE, POS_REMOVE ,POS_SET_CUSTOM_PRODUCT_PRICE } from "../../../store/pos/actions/posCartActions";

const CartItem = (props) => {
    return (
        <>
            <tr>
                <td>
                    <div className="text-center">
                        {props.index + 1}
                    </div>
                </td>
                <td>
                    <div className="cart-product">
                        <img src={props.item.image}
                            alt={props.item.name} />
                        <span>{props.item.name}</span>
                    </div>
                </td>

                <td>
                    <div className="cart-count input-group d-flex justify-content-center">
                        <button className="decrise" onClick={(event) => {
                            event.preventDefault();
                            props.item.quantity > 1 ? props.decrease(props.item.id) : props.remove(props.item.id);
                        }}>
                            <i className="icon-minus-solid" />
                        </button>
                        <input
                            name="qty"
                            autoComplete="off"
                            type="text"
                            placeholder="00"
                            className={(parseFloat(props.item.quantity) > 0) ? `` : `error_border`}
                            value={(props.item.quantity ? props.item.quantity : '')}
                            onChange={(e) => {
                                e.preventDefault();
                                props.changeQty(props.item.id, e.target.value);
                            }} />


                        <button className="incrise" onClick={(event) => {
                            event.preventDefault();
                            props.increase(props.item.id);
                        }}>
                            <i className="icon-plus-solid" />
                        </button>
                    </div>
                </td>
                <td className="pos-unit-price text-center">
                    {
                        (props.item.type === 'general') ? (<>৳{props.item.unit_price.toFixed(2)}</>)
                            :
                            <>
                                <input
                                    name="unit_price"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="00"
                                    style={{ width: "70px" }}
                                    className={(parseFloat(props.item.unit_price) > 0) ? `from-control` : `from-control error_border`}
                                    value={props.item.unit_price}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        props.setPrice(props.item.id, e.target.value);
                                    }} />
                            </>
                    }

                </td>
                <td className="pos-subtotal text-right">
                    ৳{(props.item.quantity * props.item.unit_price).toFixed(2)}
                </td>
                <td className="pos-cart-remove">
                    <button className="btn btn-danger" onClick={(event) => {
                        event.preventDefault();
                        props.remove(props.item.id);
                    }}><i
                            className="icon-trash-alt-regular" />
                    </button>
                </td>
            </tr>
        </>
    );
};

function mapDispatchToProps(dispatch) {

    return {
        increase: (id) => dispatch({ type: POS_INCREASE, payload: { id } }),
        decrease: (id) => dispatch({ type: POS_DECREASE, payload: { id } }),
        changeQty: (id, quantity) => dispatch({ type: POS_CHANGE_QTY, payload: { id, quantity } }),
        setPrice: (id, unit_price) => dispatch({ type: POS_SET_CUSTOM_PRODUCT_PRICE, payload: { id, unit_price } }),
        remove: (id) => dispatch({ type: POS_REMOVE, payload: { id } })
    }
}

export default connect(null, mapDispatchToProps)(CartItem);
