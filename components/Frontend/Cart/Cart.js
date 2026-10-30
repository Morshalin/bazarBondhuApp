import React from 'react'
import { connect } from 'react-redux'
import { SHOW_CART_MENU } from '../../../store/frontend/actions/productAction'
import CartCheckout from './CartCheckout'
import ShopCartItem from './ShopCartItem'
import Link from "next/link";

const Cart = (props) => {
	return (
		<>
			<div
				className={`cart-menu-wrap shadow ${
					props.show ? 'cart-nemu__expanded' : ''
				}`}
			>
				<div
					id='cartNav'
					className={`cart-nemu cart-nemu--right ${
						props.show ? 'cart-nemu__expanded' : ''
					}`}
				>
					<div className='total-cart-item-summary'>
						<span
							className='cart-fixed-menu-close'
							onClick={(event) => {
								event.preventDefault()
								props.showCartMenu(false)
							}}
						>
							✕
						</span>

						<span className='cart-item-total'>
							<Link legacyBehavior href='/custom-order'>
								<a className="mr-3">
									<span>Custom Order</span>
								</a>
							</Link>
							<i className='icon-shopping-bag-solid' />
							<span>{props.cart.length > 0 ? props.cart.length : 0} Items</span>
						</span>
					</div>

					<div className='cart-offer-notification'>
						<i className='icon-info-circle-solid' />
						<span>Delivery charge FREE! from order tk.999</span>
					</div>

					<div className='cart-list'>
						{props.cart.length > 0 ? (
							props.cart.map((item) => (
								<ShopCartItem key={item.id} item={item} />
							))
						) : (
							<img
								src='/img/0 items.png'
								style={{ width: '100%', padding: '10%' }}
								alt='0 Items'
							/>
						)}
					</div>
					<CartCheckout />
				</div>
			</div>
		</>
	)
}

const mapStateToPros = (store) => {
	const { cart, sub_total, grand_total } = store.cartStore
	const { show } = store.productStore
	return { cart, grand_total, sub_total, show }
}

const mapDispatchToProps = (dispatch) => {
	return {
		showCartMenu: (show) =>
			dispatch({ type: SHOW_CART_MENU, payload: { show } }),
	}
}

export default connect(mapStateToPros, mapDispatchToProps)(Cart)
