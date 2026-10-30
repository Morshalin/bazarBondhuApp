import axios from 'axios'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
    ADD_SHIPPING_PRICE_BY_ADDRESS,
    SELECT_DELIVERY_ADDRESS
} from '../../../store/frontend/actions/cartAction'
import {
    EDIT_CUSTOMER_SHIPPING_ADDRESS,
    EXPAND_ADD_DELIVERY,
    SET_CUSTOMER_ALL_ADDRESSES,
    SET_CUSTOMER_SHIPPING_ADDRESS
} from '../../../store/frontend/actions/deliveryActions'

const Addresses = (props) => {
    const api_url = process.env.api_url

    const deleteAddress = async (index) => {
        let response = await axios
            .delete(
                `${api_url}/customer-addresses/${props.customerAllAddresses[index].id}`
            )
            .then((result) => {
                return result.data
            })
            .catch((error) => {
                return error
            })

        if (response.success) {
            props.customerAllAddresses.splice(index, 1)

            props.setCustomerAllAddresses(props.customerAllAddresses)
        }
    }

    useEffect(() => {
        props.addShippingPriceByAddress(props.customerShippingAddress)
    }, [props.customerShippingAddress])

    return (
        <>
            <h4 className='da-title-add mb-2'>
				<span className='da-title'>
					{' '}
                    {props.customerAllAddresses && props.customerAllAddresses.length > 0
                        ? 'Delivery Address'
                        : ''}
				</span>
                <span className='add-new'>
					<a
                        onClick={(e) => {
                            e.preventDefault()

                            // For reset delivery details in from
                            props.editCustomerShippingAddress()

                            //To expand Add Address form
                            props.expandAddDelivery()
                        }}
                        href='#'
                    >
						<i className='icon-plus-square-regular'></i>
						<span> Add New</span>
					</a>
				</span>
            </h4>

            <div className='da-card-wrap'>
                {props.customerAllAddresses &&
                props.customerAllAddresses.map((address, index) => (
                    <div
                        key={index}
                        onClick={(event) => {
                            event.preventDefault()

                            // For setting default selected customer address
                            props.setCustomerShippingAddress(address)

                            props.selectDeliveryAddress(address.id)

                            //To expand Add Address form
                            // props.expandAddDelivery()
                        }}
                        className={`da-card ${
                            props.customerShippingAddress.id === address.id ? `bg-linear-active` : ``
                        }`}
                    >
                        <h5 className='da-card-area-title'>
                            {address.first_name ?? ''}
                            {` `}
                            {address.last_name ?? ''}
                        </h5>

                        <p>
                            {address?.area?.name},{address?.location?.name}.
                        </p>

                        <div className='dac-action'>
                            <i
                                className='icon-pencil'
                                onClick={(event) => {
                                    event.preventDefault()

                                    //To expand Add Address form
                                    props.expandAddDelivery()

                                    // For edit customer shipping address
                                    props.editCustomerShippingAddress(address)
                                }}
                            ></i>

                            <i
                                className='icon-trash-alt-regular'
                                onClick={(event) => {
                                    event.preventDefault()
                                    if (window.confirm('Delete the Address?')) {
                                        // To delete a customer shipping address
                                        deleteAddress(index)
                                    }
                                }}
                            ></i>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCustomerAllAddresses: (addresses) =>
            dispatch({type: SET_CUSTOMER_ALL_ADDRESSES, payload: {addresses}}),
        setCustomerShippingAddress: (address) =>
            dispatch({type: SET_CUSTOMER_SHIPPING_ADDRESS, payload: {address}}),
        editCustomerShippingAddress: (address) =>
            dispatch({type: EDIT_CUSTOMER_SHIPPING_ADDRESS, payload: {address}}),
        addShippingPriceByAddress: (address) =>
            dispatch({type: ADD_SHIPPING_PRICE_BY_ADDRESS, payload: {address}}),
        expandAddDelivery: () => dispatch({type: EXPAND_ADD_DELIVERY}),
        selectDeliveryAddress: (address_id) =>
            dispatch({type: SELECT_DELIVERY_ADDRESS, payload: {address_id}}),
    }
}

const mapStateToProps = (store) => {
    const {customerAllAddresses, customerShippingAddress} = store.deliveryStore

    return {customerAllAddresses, customerShippingAddress}
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses)
