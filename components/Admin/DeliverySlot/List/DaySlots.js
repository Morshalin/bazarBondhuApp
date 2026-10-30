import React from 'react';
import {connect} from "react-redux";
import DeliverySlotActions from "./DeliverySlotActions";
import {DELETE, ERROR, STATUS, statusChange, SUCCESS} from "../../../../Helpers/Utils/Utils";
import {
    CHANGE_DELIVERY_SLOT_STATUS,
    RESET_DELIVERY_MESSAGE,
    SET_DELIVERY_DAY_MESSAGE
} from "../../../../store/admin/actions/deliverySlot/deliverySlotAction";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";

const DaySlots = (props) => {


    const deliverySlotActions = (actions) => {

        let {type, payload} = actions;

        switch (type) {

            case DELETE: {
                console.log(type, payload);
                break;
            }

            case STATUS: {

                statusChange(`backend/delivery-slots/active-status/${props.deliveryDay.slots[payload.index].id}`).then(result => {
                    if (result.success) {
                        props.setDeliverySlotMessage(SUCCESS, result.message);
                        props.changeDeliverySlotStatus(result.data);
                    } else {
                        props.setDeliverySlotMessage(ERROR, result.message);
                    }
                }).finally(() => resetChanges());

                break;
            }

            default:
                break;
        }

    }

    const resetChanges = () => {
        setTimeout(() => {
            props.resetDeliveryDayMessage();
        }, 2000);
    }

    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}

            <div className="custom-card-box mb-3">
                <div className="custom-card-box-header">
                    <div className="fbh-title">
                        <i className="icon-eye-regular"/>
                        <h2>Delivery Slots</h2>
                        <Link legacyBehavior href={'/admin/delivery-slots/add'}>
                            <a className="fbh-btn"
                               title="Add Delivery Slot">
                                <i className="icon-plus-square-regular"></i>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="custom-card-box-content p-md-3 p-2">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive custom-table custom-hight-320">
                                <table className="table table-bordered table-hover mb-0 table-order-details">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">SL</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        <th scope="col">Order</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        (props.deliveryDay && props.deliveryDay.slots && props.deliveryDay.slots.length) ? props.deliveryDay.slots.map((item, index) => (
                                            <tr key={index} className="text-center">
                                                <td scope="row">
                                                    {++index}
                                                </td>

                                                <td className="text-center">
                                                    {item.f_start_time}
                                                </td>
                                                <td className="text-center">
                                                    {item.f_end_time}
                                                </td>

                                                <td className="text-center">
                                                    {item.number_of_order}
                                                </td>


                                                <td className="text-center text-nowrap">
                                                    {item.charge}
                                                </td>

                                                <td className="text-center text-nowrap">
                                                    {item.status}
                                                </td>

                                                <td className="text-center text-nowrap">
                                                    <DeliverySlotActions
                                                        slot={item}
                                                        slotIndex={(index - 1)}
                                                        actions={deliverySlotActions}
                                                    />
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">No Slot Found</td>
                                            </tr>
                                        )
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    let {deliveryDay, message} = store.deliverySlotStore;
    return {deliveryDay, message};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDeliverySlotMessage: (message_type, message) => dispatch({
            type: SET_DELIVERY_DAY_MESSAGE,
            payload: {message_type, message}
        }),

        resetDeliveryDayMessage: () => dispatch({type: RESET_DELIVERY_MESSAGE}),
        changeDeliverySlotStatus: (slot) => dispatch({type: CHANGE_DELIVERY_SLOT_STATUS, payload: {slot}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DaySlots);