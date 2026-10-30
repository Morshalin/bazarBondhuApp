import React, {useEffect} from 'react';
import Link from "next/link";
import DayHeader from "./DayHeader";
import {
    CHANGE_DELIVERY_DAY_STATUS,
    RESET_DELIVERY_MESSAGE,
    SET_DELIVERY_DAY,
    SET_DELIVERY_DAY_LIST,
    SET_DELIVERY_DAY_MESSAGE
} from "../../../../store/admin/actions/deliverySlot/deliverySlotAction";
import {connect} from "react-redux";
import {DELETE, ERROR, getActions, STATUS, statusChange, SUCCESS} from "../../../../Helpers/Utils/Utils";
import DayActions from "./DayActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const DayList = (props) => {

    useEffect(() => {

        let mounted = true;

        getActions(`backend/delivery-days`, false).then((response) => {
            if (mounted && response) {
                props.setDeliveryDayList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });

    }, []);


    const actionsDeliveryDay = (actions) => {

        let {type, payload} = actions;

        switch (type) {

            case DELETE: {
                console.log(type, payload);
                break;
            }

            case STATUS: {
                statusChange(`backend/delivery-days/active-status/${props.deliveryDays[payload.index].id}`).then(result => {
                    if (result.success) {
                        props.changeDeliveryDayStatus(result.data);
                        props.setDeliveryDayMessage(SUCCESS, result.message);
                    } else {
                        props.setDeliveryDayMessage(ERROR, result.message);
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
        }, 3000);
    }

    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}
            <div className="col-md-5 mb-3">
                <div className="custom-card-box">
                    <div className="custom-card-box-header">
                        <div className="fbh-title">
                            <i className="icon-list2"/>
                            <h2>Delivery Day List</h2>

                        </div>
                    </div>

                    <div className="custom-card-box-content p-md-3 p-2">
                        <div className="row table-top-option mb-md-3 mb-2">
                            <div className="col-6">
                                <div className="showing-table-row">
                                    <label className="">Show</label>
                                    <select
                                        className="custom-select">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="table-search">
                                    <label className="">Search</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search here ..."
                                    />

                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive custom-table custom-hight-500">

                                    <table className="table table-bordered table-hover mb-0 carsour-pointer">

                                        <thead className="thead-light">

                                        <DayHeader/>

                                        </thead>

                                        <tbody>

                                        {
                                            (props.deliveryDays && props.deliveryDays.length > 0) ? props.deliveryDays.map((item, index) => (
                                                <tr
                                                    onClick={() => {
                                                        props.setDeliveryDay(item);
                                                    }}
                                                    key={item.id}
                                                    className={`text-center ${(item.id === props.deliveryDay.id) ? `bg-warning` : ``}`}>
                                                    <td className="nowrap text-center ">{++index}</td>

                                                    <td className="nowrap text-center">
                                                        {item.day_name}
                                                    </td>

                                                    <td className="text-center text-nowrap">
                                                        {item.slots.length}
                                                    </td>

                                                    <td className="text-center">
                                                        {item.status}
                                                    </td>

                                                    <td className="text-center">
                                                        <DayActions
                                                            deliveryDay={item}
                                                            dayIndex={(index - 1)}
                                                            actions={actionsDeliveryDay}/>
                                                    </td>

                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No Day Found</td>
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

            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDeliveryDayList: (deliveryDays) => dispatch({type: SET_DELIVERY_DAY_LIST, payload: {deliveryDays}}),
        setDeliveryDay: (deliveryDay) => dispatch({type: SET_DELIVERY_DAY, payload: {deliveryDay}}),
        changeDeliveryDayStatus: (deliveryDay) => dispatch({type: CHANGE_DELIVERY_DAY_STATUS, payload: {deliveryDay}}),
        setDeliveryDayMessage: (message_type, message) => dispatch({
            type: SET_DELIVERY_DAY_MESSAGE,
            payload: {message_type, message}
        }),
        resetDeliveryDayMessage: () => dispatch({type: RESET_DELIVERY_MESSAGE})
    }
}

const mapStateToProps = (store) => {
    let {deliveryDays, deliveryDay, message} = store.deliverySlotStore;
    return {deliveryDays, deliveryDay, message};
}

export default connect(mapStateToProps, mapDispatchToProps)(DayList);