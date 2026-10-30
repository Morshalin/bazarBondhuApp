/* eslint-disable prettier/prettier */
import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Storage from '../../../Helpers/Auth/Storage'
import {
	CART_CHECK_OUT,
	REMOVE_COUPON_DETAILS,
	SET_COUPON_DETAILS
} from '../../../store/frontend/actions/cartAction'
import Link from "next/link";

const CartCheckout = (props) => {
	const api_url = process.env.api_url

	const [couponCode, setCouponCode] = useState('')

	const [isLogin, setIsLogin] = useState(false)

	const [message, setMessage] = useState()

	useEffect(() => {
		if (Storage.isLoggedIn()) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	})

	const checkOut = async () => {
		await Router.push('/cart/checkout')
	}
	const couponSubmitRemove = () => {
		props.cartStore.coupon_details.code
			? props.removeCouponDetails()
			: couponSubmit()
	}
	const couponSubmit = async () => {
		let response = await axios
			.post(`${api_url}/coupons/apply`, { coupon_code: couponCode })
			.then((result) => {
				return result.data
			})
			.catch((err) => {
				return err
			})

		if (response.success) {
			props.setCouponDetails(response.data)

			setMessage('')
		} else {
			setMessage(response.message)
		}
	}

	return (
		<>
			<div className='apply-coupon'>
				<div className='accordion' id='accordionCoupon'>
					<div className='card'>
						<div className='card-header' id='headingOne'>
							<h2 className='mb-0'>
								<button
									className='btn btn-link btn-block'
									type='button'
									data-toggle='collapse'
									data-target='#accordionCouponBtn'
									aria-expanded='false'
									aria-controls='accordionCouponBtn'
								>
									<span>Apply Special Code</span>{' '}
									<i className='icon-sign-out-alt-solid' />
								</button>
							</h2>
						</div>

						<div
							id='accordionCouponBtn'
							className='collapse'
							aria-labelledby='headingOne'
							data-parent='#accordionCoupon'
						>
							<div className='card-body'>
								<form className='form-inline'>
									<div className='form-group'>
										<label className='sr-only'>Special Code</label>
										{props.cartStore.coupon_details &&
										props.cartStore.coupon_details.code ? (
											<span>
												{' '}
												<span className='text-warning'>
													{props.cartStore.coupon_details.code}
												</span>{' '}
												- ৳ {props.cartStore.coupon_discount} Applied{' '}
											</span>
										) : (
											<input
												type='text'
												className='form-control-plaintext'
												onChange={(event) => {
													event.preventDefault()
													setCouponCode(event.target.value)
												}}
												placeholder='Coupon Code'
												readOnly={
													props.cartStore.coupon_details &&
													props.cartStore.coupon_details.code
												}
											/>
										)}
									</div>

									<button
										type='button'
										className='btn coupon-apply rounded-0'
										onClick={(event) => {
											event.preventDefault()
											couponSubmitRemove()
										}}
									>
										{props.cartStore.coupon_details &&
										props.cartStore.coupon_details.code
											? 'Change'
											: 'Apply'}
									</button>
									<p className='text-danger'>{message}</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='cart-checkout'>
				{(props.cartStore.grand_total > 0)?
					(<>
					<button
						data-toggle={!isLogin ? `modal` : ``}
						data-target={!isLogin ? `#signin_modal` : ``}
						onClick={(event) => {
							event.preventDefault()
							sessionStorage.setItem('login_path', '/cart/checkout');
							isLogin ? (props.cartStore.grand_total > 0 ? checkOut() : '') : ''
						}}
					>
					<span className='check-out-text'>
						<i className='fas fa-shield-alt' /> Check Out
					</span>
					<span className='cart-total'>
						৳{' '}
						{props.cartStore.coupon_details &&
						props.cartStore.grand_total >props.cartStore.coupon_details.min_purchase_amount
							? props.cartStore.grand_total -
							  props.cartStore.coupon_discount +
							  props.cartStore.delivery_charge +
							  props.cartStore.slot_charge
							: props.cartStore.sub_total
							? props.cartStore.grand_total +
							  props.cartStore.delivery_charge +
							  props.cartStore.slot_charge
							: 0}
					</span>

					</button>
					</>)
						:(
						<button>
							<Link legacyBehavior
								href="/">
								<a>
									<span className='continue-text'>
										<i className='fas fa-shopping-cart' /> Continue Shopping
									</span>
								</a>
							</Link>
						</button>
						)
					}
			</div>
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		cartCheckout: () => dispatch({ type: CART_CHECK_OUT }),
		setCouponDetails: (coupon) =>
			dispatch({ type: SET_COUPON_DETAILS, payload: { coupon } }),
		removeCouponDetails: () => dispatch({ type: REMOVE_COUPON_DETAILS }),
	}
}

const mapStateToProps = (store) => {
	const cartStore = store.cartStore
	return { cartStore }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCheckout)
