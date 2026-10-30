import React from 'react';
import {POS_ADD_TO_CART} from "../../../store/pos/actions/posCartActions";
import {connect} from "react-redux";

const SingleProduct = (props) => {

    return (
        <>
            <div className="col-3" onClick={event => {
                event.preventDefault();
                (props.product.stock > 0) ? props.posAddToCart(props.product) : '';
            }}>
                <div className={`product-card ${(props.product.stock > 0) ? `` : `out-stock`}`}
                     title={props.product.name}>

                    <img src={props.product.feature_image}
                         alt={props.product.name}
                         className="pc-image img-fluid"/>
                    {
                        (props.product.stock <=0) ? (
                            <div className="out-stock-text">Out of Stock</div>
                        ) : ''
                    }


                    <div className="pc-name">
                        <h6>{props.product.name}</h6>
                    </div>
                    <div className="pc-id-stock">
                        <span className="pc-id">#{props.product.barcode}</span>
                        <span className="pc-stock">IS: {props.product.stock}</span>
                    </div>
                    <div className="pc-info">
                        <span className="pc-price">৳ {props.product.selling_price}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {search_keywords} = store.posProduct;
    return {search_keywords}
}

const mapDispatchToProps = (dispatch) => {
    return {
        posAddToCart: (product) => dispatch({type: POS_ADD_TO_CART, payload: {product}}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);