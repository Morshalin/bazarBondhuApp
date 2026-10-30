import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {SET_PRODUCTS} from "../../../store/pos/actions/posProductActions";
import SingleProduct from "./SingleProduct";
import Loader from "react-loader";
import {options} from "../../../Helpers/Utils/Utils";

const PosProducts = (props) => {
    const [loaded, setLoaded] = useState(false);


    useEffect(() => { (async () => {
        let fetched = true;

        fetched && fetchedPopularProducts().then((res) => {
            props.setProducts(res.data);
            setLoaded(true);
        }).finally(() => {
            fetched = false;
        })

    })(); }, []);

    const fetchedPopularProducts = async () => {

        return await axios.get(`backend/get-popular-products`).then(res => res.data).catch(err => err);
    }


    return (
        <>
            <Loader loaded={loaded} options={options} className="spinner">
                <div className="row">
                    {props.products && props.products.map((product, index) => (
                        <SingleProduct product={product} key={++index}/>
                    ))}
                </div>
            </Loader>
        </>
    );
};

const mapStateToProps = (store) => {

    const {products} = store.posProduct;

    return {products};
}


const mapDispatchToProps = (dispatch) => {

    return {
        setProducts: (products) => dispatch({type: SET_PRODUCTS, payload: {products}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PosProducts);