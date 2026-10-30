import React from 'react';
import {connect} from "react-redux";
import {SELECT_DELIVERY_SLOT} from "../../../store/frontend/actions/deliveryActions";
import {SET_DELIVERY_DATE, SET_SLOT_AND_CHARGE} from "../../../store/frontend/actions/cartAction";

const DeliverySlots = (props) => {

    return (
        <>
            <div className="delivery-slots">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {
                        ((props.deliveryStore.deliveryDays && props.deliveryStore.deliveryDays.length > 0)
                            && props.deliveryStore.deliveryDays.map((day, index) => (
                                <li className="nav-item"
                                    role="presentation"
                                    key={index}
                                    onClick={() => {
                                        props.selectDeliveryDay(day) && props.setDeliveryDate(day.f_current_date);
                                    }}>
                                    <a className={`nav-link ${(props.deliveryStore.selectedDeliveryDay.id === day.id) ? `active` : ``}`}
                                       id="home-tab" data-toggle="tab" href="#home"
                                       role="tab"
                                       aria-controls="home" aria-selected="true">
                                        <div
                                            className="delivery-day">
                                            {day.day_name}
                                        </div>
                                        <div className="delivery-date">
                                            <span>{new Date(day.current_date).getDate()}</span>{props.deliveryStore.month[(new Date(day.current_date).getMonth())]}
                                        </div>
                                    </a>
                                </li>
                            )))
                    }


                </ul>

                <div className="tab-content" id="myTabContent">

                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <ul className="list-group">

                            {
                                ((props.deliveryStore.selectedDeliveryDay && props.deliveryStore.selectedDeliveryDay.slots && props.deliveryStore.selectedDeliveryDay.slots.length > 0) &&
                                    props.deliveryStore.selectedDeliveryDay.slots.map((slot, slotIndex) => {

                                            if (((new Date(props.deliveryStore.selectedDeliveryDay.current_date).getDate() === new Date().getDate()))) {
                                                if ((new Date().getHours() < slot.start_time_h)) {
                                                    return (
                                                        <li className="list-group-item" key={slotIndex}>
                                                            <div className="dslot-time">
                                                                <p>{slot.f_start_time} - {slot.f_end_time}</p>
                                                            </div>
                                                            <div className="dslot-book">
                                                                <button
                                                                    disabled={(slot.id == props.deliveryStore.slot_id) ? true : false}
                                                                    className={`btn btn-book ${(slot.id == props.deliveryStore.slot_id) ? `btn-disable` : ``}`}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.setSlotCharge(slot.id, slot.charge);
                                                                        props.selectSlot(slot.id);
                                                                        // console.log(slot.id, slot.charge);
                                                                    }}>
                                                                    Book delivery
                                                                </button>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <li className="list-group-item" key={slotIndex}>
                                                        <div className="dslot-time">
                                                            <p>{slot.f_start_time} - {slot.f_end_time}</p>
                                                        </div>
                                                        <div className="dslot-book">
                                                            <button
                                                                disabled={(slot.id == props.deliveryStore.slot_id) ? true : false}
                                                                className={`btn btn-book ${(slot.id == props.deliveryStore.slot_id) ? `btn-disable` : ``}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    props.setSlotCharge(slot.id, slot.charge);
                                                                    props.selectSlot(slot.id);

                                                                    // console.log(slot.id, slot.charge);
                                                                }}>
                                                                Book Delivery
                                                            </button>
                                                        </div>
                                                    </li>
                                                )
                                            }

                                        }
                                    ))
                            }


                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {deliveryStore} = store;
    return {deliveryStore};
}


const mapDispatchToProps = (dispatch) => {
    return {
        selectSlot: (slot_id) => dispatch({type: SELECT_DELIVERY_SLOT, payload: {slot_id}}),
        setDeliveryDate: (delivery_date) => dispatch({type: SET_DELIVERY_DATE, payload: {delivery_date}}),
        setSlotCharge: (slot_id, slot_charge) => dispatch({type: SET_SLOT_AND_CHARGE, payload: {slot_id, slot_charge}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeliverySlots);