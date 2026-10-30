import React, {useEffect, useState} from 'react';
import AddDeliveryAddress from "./AddDeliveryAddress";
import DeliveryAddresses from "./Addresses";
import {connect} from "react-redux";
import axios from "axios";
import {ADD_SHIPPING_PRICE_BY_DATE, SET_DELIVERY_DATE} from "../../../store/frontend/actions/cartAction";
import process from "../../../next.config";
import DeliverySlots from "./DeliverySlots";
import {getActions} from "../../../Helpers/Utils/Utils";
import {SELECT_DELIVERY_DAY, SET_DELIVERY_DAYS} from "../../../store/frontend/actions/deliveryActions";

const DeliveryDetails = (props) => {

    const api_url = process.env.api_url;

    const [message, setMessage] = useState('');

    const addDeliveryCharge = async (e) => {

        setMessage('');

        let deliveryDate = new Date(e.target.value);

        let presentDate = new Date(Date.now());

        let dayCount = Math.ceil((deliveryDate - presentDate) / (1000 * 60 * 60 * 24));

        if (dayCount > 0) {

            let response = await axios.get(`${api_url}/delivery-price/${dayCount}`)
                .then((result) => {
                    return result.data;
                }).catch((exception) => {
                    return exception;
                });

            if (response.success) {
                let shipping_charge = response.data;
                props.addShippingPriceByDate(shipping_charge.charge);
                props.setDeliveryDate(deliveryDate);
            } else {
                setMessage(response.message);
                props.addShippingPriceByDate(0);
            }
        } else {
            setMessage('Delivery time must be greater than 1 day..');

            props.addShippingPriceByDate(0);
        }

    }

    useEffect(() => {

        let fetched = true;

        fetched && getActions(`${api_url}/get-delivery-days`, false)
            .then((res) => {
                if (res.success) {
                    props.setDeliveryDays(res.data);
                }
            }).finally(() => {
                fetched = false;
            })

    }, [])

    return (
        <>
            <div className="card-header">
                <span className="badge">01</span>
                Delivery Slots
            </div>

            <div className="card-body">

                <DeliverySlots selectDeliveryDay={props.selectDay}/>

                {/*<div className="delivery-address">*/}

                {/*    <DeliveryAddresses/>*/}

                {/*    {props.deliveryStore.expandAddDelivery && <AddDeliveryAddress/>}*/}

                {/*</div>*/}

            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addShippingPriceByDate: (shipping_price) => dispatch({
            type: ADD_SHIPPING_PRICE_BY_DATE,
            payload: {shipping_price}
        }),

        setDeliveryDate: (delivery_date) => dispatch({
            type: SET_DELIVERY_DATE,
            payload: {delivery_date}
        }),

        setDeliveryDays: (deliveryDays) => dispatch({type: SET_DELIVERY_DAYS, payload: {deliveryDays}}),
        selectDay: (selectedDeliveryDay) => dispatch({type: SELECT_DELIVERY_DAY, payload: {selectedDeliveryDay}})
    }
}

const mapStateToProps = (store) => {
    const {deliveryStore, cartStore} = store;


    return {deliveryStore, cartStore};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails);