import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	InstapaperIcon,
	InstapaperShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton
} from 'react-share'
import { ADD_TO_CART } from '../../../store/frontend/actions/cartAction'

const ProductQuickView = (props) => {
	const [count, setCount] = useState(1)

	useEffect(() => {
		setCount(1)
	}, [props.modalProduct])

	return (
		<>
			<div
				className='modal fade'
				id='product_quick_view_modal'
				tabIndex='-1'
				aria-labelledby='productQuickViewLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-xl modal-dialog-centered'>
					<div className='modal-content rounded-0 border-0'>
						<div className='modal-header'>
							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body product-details-main'>
							<div className='product-details-wrap'>
								<div className='pdw-top'>
									<div className='pwdt-left pwdt-grid'>
										<div
											id='productDisplayCarousel'
											className='carousel slide carousel-fade'
											data-ride='carousel'
										>
											<div className='carousel-inner'>
												{props.modalProduct.product_image ? (
													props.modalProduct.product_image.map((image, index) => (
														<div className={`carousel-item ${index ? '' : 'active'}`}>
															<img src={image} className='d-block w-100' alt='Product Name' />
														</div>
													))
												) : (
													<div className='carousel-item active'>
														<img
															src={props.modalProduct.feature_image}
															className='d-block w-100'
															alt='Product Name'
														/>
													</div>
												)}
											</div>
											<ol className='carousel-indicators'>
												{props.modalProduct.product_image ? (
													props.modalProduct.product_image.map((image, index) => (
														<li
															key={++index}
															data-target='#productDisplayCarousel'
															data-slide-to={index}
															className={`${index ? '' : 'active'}`}
														>
															<img className='d-block w-100' src={image} alt='Product Name' />
														</li>
													))
												) : (
													<li data-target='#productDisplayCarousel' className='active'>
														<img
															className='d-block w-100'
															src={props.modalProduct.feature_image}
															alt='Product Name'
														/>
													</li>
												)}
											</ol>
										</div>
									</div>
									<div className='pwdt-right pwdt-grid'>
										<div className='product-title'>
											<h1>{props.modalProduct.name}</h1>
										</div>
										{/*<div className="product-review">*/}
										{/*    <div className="review-summary">*/}
										{/*        <i className="icon-star-full"></i>*/}
										{/*        <i className="icon-star-full"></i>*/}
										{/*        <i className="icon-star-full"></i>*/}
										{/*        <i className="icon-star-half"></i>*/}
										{/*        <i className="icon-star-empty"></i>*/}
										{/*        <span>(5 reviews)</span>*/}
										{/*    </div>*/}
										{/*</div>*/}
										<hr />
										<div className='product-qan-price-off'>
											<div className='product-qan-price'>
												{/* <div className='product-quantity'>
													<span>
														{props.modalProduct.weight}{' '}
														{props.modalProduct.sell_unit ? props.modalProduct.sell_unit.name : ''}
													</span>
												</div> */}
												<div className='product-price'>
													{/* <span className='off-price'>
														৳{' '}
														{isNaN(props.modalProduct.selling_price - props.modalProduct.discount)
															? 0.0
															: props.modalProduct.selling_price - props.modalProduct.discount}
													</span> */}
													<span className=''>৳ {props.modalProduct.selling_price}</span>
													{/* {props.modalProduct.discount ? (
														<span className='original-price'>
															৳ {props.modalProduct.selling_price}
														</span>
													) : (
														''
													)} */}
												</div>
											</div>
											{/*<div className="off-percentage">*/}
											{/*    <span>20% off</span>*/}
											{/*</div>*/}
										</div>
										<div className='product-small-des' style={{ whiteSpace: 'pre-line' }}>
											<p>{props.modalProduct.description}</p>
										</div>
										<div className='availability-sku'>
											<div className='sku'>
												SKU : <span>{props.modalProduct.sku}</span>
											</div>
											{props.modalProduct.in_stock ? (
												<div className='availability'>
													AVAILABILITY :{' '}
													<span className='badge badge-pill badge-primary'>In Stock</span>
												</div>
											) : (
												<div className='availability'>
													AVAILABILITY :{' '}
													<span className='badge badge-pill badge-danger'>Out of Stock</span>
												</div>
											)}
										</div>
										<div className='add-to-cart'>
											<div className='cart-count input-group'>
												<button
													className='decrise'
													onClick={() => {
														if (count > 1) setCount(count - 1)
													}}
												></button>
												<input name='qty' type='text' readOnly value={count} />
												<button className='incrise' onClick={() => setCount(count + 1)}></button>
											</div>
											<div className='acrt-btn'>
												<button
													className='btn btn-atc'
													onClick={(event) => {
														event.preventDefault()
														if (props.modalProduct.selling_price === 0) {
															return false
														}
														props.addToCart(props.modalProduct, count)
													}}
													disabled={props.modalProduct.selling_price === 0 ? `disabled` : ``}
												>
													Add to cart
												</button>
											</div>
										</div>
										<div className='social-share'>
											<div className='share-icon'>
												<FacebookShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<FacebookIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</FacebookShareButton>
												<TwitterShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<TwitterIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</TwitterShareButton>
												<LinkedinShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<LinkedinIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</LinkedinShareButton>
												<WhatsappShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<WhatsappIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</WhatsappShareButton>
												<InstapaperShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<InstapaperIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</InstapaperShareButton>
												<EmailShareButton
													url={'http://localhost:3000/product/honey-dabur-pieces'}
													quote={props.modalProduct.description}
													hashtag='#camperstribe'
												>
													<EmailIcon
														size={30}
														round={true}
														borderRadius={2}
														bgStyle={{ fill: 'white' }}
														iconFillColor={`black`}
													/>
												</EmailShareButton>
											</div>
											{/* <div className='add-to-wishlist'>
												<button className='btn btn-atw'>
													<i className='icon-heart-regular'></i>
													<span>Add to wishlist</span>
												</button>
											</div> */}
										</div>
										<div className='pay-with'>
											<img src='/img/paywith.png' alt='Pay with' />
										</div>
									</div>
								</div>
								<div className='pdw-bottom'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (product, qty) => dispatch({ type: ADD_TO_CART, payload: { product, qty } }),
	}
}

const mapStateToProps = (store) => {
	const { modalProduct } = store.productStore
	return { modalProduct }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuickView)
