/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import React from 'react'
import {connect} from 'react-redux'
import {ADD_TO_CART} from '../../../../store/frontend/actions/cartAction'
import {SET_MODAL_PRODUCT} from '../../../../store/frontend/actions/productAction'
import ReactImageFallback from "react-image-fallback";


const SingleProduct = (props) => {
    return (
        <>
            <div className='product-box-grid'>
                <div className='product-box'>
                    <div className='product-box-wrap'>
                        <div className='product-box-image'>

                            <ReactImageFallback
                                src={props.product.feature_image}
                                fallbackImage={process.env.base_url + '/images/image_not_found.png'}
                                initialImage="/processing-loder/loader.gif"
                                alt={props.product.name}/>

                            {/*<img src={props.product.feature_image} alt={props.product.name}/>*/}
                        </div>
                        <div className='product-details'>
                            <h6 className='product-title'>{props.product.name}</h6>
                            {/* <p className='product-unit'>
								{props.product.weight} {props.product.product_sell_unit}
							</p> */}
                            <p className='product-price'>৳ {props.product.selling_price}</p>
                        </div>
                        <div className='pbw-hover'>
                            <div className='cart'>
                                <a
                                    href='#'
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if (props.product.selling_price === 0) {
                                            return false
                                        }
                                        props.addToCart(props.product)
                                    }}
                                    className={props.product.selling_price === 0 ? `product-button-disabled` : ``}
                                >
                                    <i className='icon-shopping-basket'/> Add to Cart
                                </a>
                            </div>
                            <div className='view-option'>
                                <a
                                    href='#'
                                    data-toggle='modal'
                                    data-target='#product_quick_view_modal'
                                    onClick={(event) => {
                                        event.preventDefault()
                                        props.setModalProduct(props.product)
                                    }}
                                >
                                    <i className='icon-eye'> </i>Quick View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='product-cart'>
                        <Link legacyBehavior
                            href={{
                                pathname: '/product/[slug]',
                                query: {slug: props.product.slug},
                            }}
                        >
                            <a>
                                <i className='icon-eye'/> View
                            </a>
                        </Link>

                        <a
                            href='#'
                            onClick={(event) => {
                                event.preventDefault()
                                if (props.product.selling_price === 0) {
                                    return false
                                }
                                props.addToCart(props.product)
                            }}
                            className={props.product.selling_price === 0 ? `product-button-disabled` : ``}
                        >
                            <i className='icon-shopping-basket'/>
                            Cart
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product) => dispatch({type: ADD_TO_CART, payload: {product}}),
        setModalProduct: (modalProduct) =>
            dispatch({type: SET_MODAL_PRODUCT, payload: {modalProduct}}),
    }
}

export default connect(null, mapDispatchToProps)(SingleProduct)
