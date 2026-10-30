import React from 'react';
import CartItem from "./CartItem";
import {connect} from "react-redux";

const CartProducts = ({cart = []}) => {

    return (
        <>
            <div className="pos-form-center">
                <table className="table table-bordered">
                    <thead className="thead-light text-center">
                    <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Product</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 && cart.map((item,index) => (<CartItem index={index} key={item.id} item={item}/>))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {

    const {cart} = store.posCart;

    return {cart};
}

export default connect(mapStateToProps)(CartProducts);
