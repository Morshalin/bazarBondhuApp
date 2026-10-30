import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {SET_PRODUCTS} from '../../../../store/frontend/actions/productAction'
import ProductQuickView from '../../Modals/ProductQuickView'
import SingleProduct from './SingleProduct'
import {getActions} from "../../../../Helpers/Utils/Utils";

const PopularProduct = (props) => {
    useEffect(() => {
        let fetched = true

        fetched && getActions(`${process.env.api_url}/get-popular-products`, false)
            .then((res) => {
                if (res.success) {
                    props.setProducts(res.data)
                }
            }).finally(() => fetched = false);
    }, [])


    return (
        <>
            <section className='product-block'>
                <div className='container-fluid'>
                    <div className='row text-center'>
                        <div className='col-md-12'>
                            <h3>Popular Products</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='product-showcase-wrap'>
                                {props.products ? (
                                    props.products.map((product) => (
                                        <SingleProduct product={product} key={product.id}/>
                                    ))
                                ) : (
                                    <h1>No Data Found</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductQuickView/>
        </>
    )
}

const mapStateToProps = (store) => {
    const {products} = store.productStore
    return {products}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products) => dispatch({type: SET_PRODUCTS, payload: {products}}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PopularProduct)
