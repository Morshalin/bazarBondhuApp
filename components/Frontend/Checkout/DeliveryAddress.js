import React from 'react'
import { connect } from 'react-redux'
import AddDeliveryAddress from './AddDeliveryAddress'
import Addresses from './Addresses'

const DeliveryAddress = (props) => {
	return (
		<>
			<div className='card-header'>
				<span className='badge'>02</span>
				Delivery Address
			</div>

			<div className='card-body'>
				<div className='delivery-address'>
					<Addresses />

					{props.deliveryStore.expandAddDelivery && <AddDeliveryAddress />}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (store) => {
	const { deliveryStore, cartStore } = store

	return { deliveryStore, cartStore }
}

export default connect(mapStateToProps, null)(DeliveryAddress)
