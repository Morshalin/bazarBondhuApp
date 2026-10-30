import React from 'react';
import {connect} from "react-redux";
import {SHOW_CART_MENU} from "../../../store/frontend/actions/productAction";


const CartNav = (props) => {

    return (
        <>
            <div
                className="cart-fixed-menu-open shadow"
                onClick={(event => {
                    event.preventDefault();
                    props.showCartMenu(true);
                })}
                data-menu="#cartNav">

                <div className="cart-items">
                    <i className="icon-shopping-bag-solid"></i>
                    <span className="total-cart-item"> {props.cart.length > 0 ? props.cart.length : 0} Items</span>
                </div>

                <div className="cart-amounts">
                    <i className="icon-coin"></i>
                    <span
                        className="total-cart-amounts">৳ {(props.sub_total ? (props.sub_total + props.delivery_charge + props.slot_charge - props.coupon_discount) : 0)}</span>
                </div>

                <div className="view-cart-btn"><i className="icon-long-arrow-alt-left-solid"></i>
                    <span className="view-cart">View Cart</span>
                </div>
            </div>
        </>

    );
};


const mapStateToPros = (store) => {
    const {cart, sub_total, coupon_discount, delivery_charge, slot_charge} = store.cartStore;
    return {cart, sub_total, coupon_discount, delivery_charge, slot_charge}
}

const mapDispatchToProps = (dispatch) => {
    return {
        showCartMenu: (show) => dispatch({type: SHOW_CART_MENU, payload: {show}}),
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(CartNav)