import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {ERROR, getActions, saveAction, showActions, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";
import {
    EDIT_DELIVERY_SLOT,
    RESET_DELIVERY_MESSAGE,
    RESET_DELIVERY_SLOT_DATA,
    SET_DELIVERY_DAY_LIST,
    SET_DELIVERY_DAY_MESSAGE,
    SET_DELIVERY_SLOT_DATA,
    SET_DELIVERY_SLOT_ERRORS
} from "../../../../store/admin/actions/deliverySlot/deliverySlotAction";
import {connect} from "react-redux";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import {useRouter} from "next/router";

const AddDeliverySlot = (props) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    useEffect(() => {

        props.resetDeliverySlotData();

        let mounted = true;

        getActions(`backend/delivery-days`, false).then((response) => {
            if (mounted && response) {
                props.setDeliveryDayList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });

        (id && showActions(`backend/delivery-slots/${id}`).then((response) => {
            if (response.success) {
                props.editDeliverySlot(response.data);
            }
        }))


    }, [id]);


    const saveDeliverySlots = (e) => {
        e.preventDefault();

        setLoading(true);

        (props.mode === "edit") ? updateAction(`backend/delivery-slots/${id}`, props.deliverySlotData)
                .then((response) => {
                    if (response.success) {
                        props.setDeliverySlotMessage(SUCCESS, response.message);
                    } else {
                        props.setDeliverySlotErrors(response.errors);
                        props.setDeliverySlotMessage(ERROR, response.message);
                    }

                    setTimeout(() => props.resetDeliveryMessage(), 2000);
                }).finally(() => setLoading(false)) :
            saveAction(`backend/delivery-slots`, props.deliverySlotData).then((response) => {
                if (response.success) {
                    props.setDeliverySlotMessage(SUCCESS, response.message);
                    setTimeout(() => props.resetDeliverySlotData(), 2000);
                } else {
                    props.setDeliverySlotErrors(response.errors);
                    props.setDeliverySlotMessage(ERROR, response.message);
                    setTimeout(() => props.resetDeliveryMessage(), 2000);
                }
            }).finally(() => setLoading(false));
    }

    return (
        <>

            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="far fa-plus-square"></i>
                                        <h2>{(props.mode === "edit") ? "Edit" : "Add"} Delivery Slot</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below.
                                            The field labels marked with
                                            <span className="text-danger"> * </span>
                                            are required input fields.</p>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <form>
                                                <fieldset disabled={loading}>


                                                    <div className="row">

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="delivery_day_id">
                                                                    Delivery Day
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <select
                                                                    title="Select Day"
                                                                    className={`custom-select ${props.errors.delivery_day_id ? `is-invalid` : ``}`}
                                                                    id="delivery_day_id"
                                                                    name="delivery_day_id"
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    value={props.deliverySlotData.delivery_day_id ?? ''}
                                                                    aria-label="Day Select">
                                                                    <option value="">Select Day</option>

                                                                    {
                                                                        (props.deliveryDays && (props.deliveryDays.length > 0)) && props.deliveryDays.map((deliveryDay, index) => (
                                                                            <option value={deliveryDay.id}
                                                                                    key={index}>{deliveryDay.day_name}</option>
                                                                        ))
                                                                    }

                                                                </select>

                                                                <div
                                                                    className={props.errors.delivery_day_id ? `invalid-feedback` : ``}>
                                                                    {props.errors.delivery_day_id}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="number_of_order">
                                                                    Number of Order
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    title="Number of Order"
                                                                    type="text"
                                                                    className={`form-control ${props.errors.number_of_order ? `is-invalid` : ``}`}
                                                                    id="number_of_order"
                                                                    name="number_of_order"
                                                                    autoComplete="off"
                                                                    value={props.deliverySlotData.number_of_order ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    placeholder="Number of Order"/>

                                                                <div
                                                                    className={props.errors.number_of_order ? `invalid-feedback` : ``}>
                                                                    {props.errors.number_of_order}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="row">

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="start_time">
                                                                    Start Time
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    title="Start Time"
                                                                    type="time"
                                                                    className={`form-control ${props.errors.start_time ? `is-invalid` : ``}`}
                                                                    id="start_time"
                                                                    name="start_time"
                                                                    autoComplete="off"
                                                                    value={props.deliverySlotData.start_time ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    placeholder="Start Time"
                                                                    required/>

                                                                <div
                                                                    className={props.errors.start_time ? `invalid-feedback` : ``}>
                                                                    {props.errors.start_time}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="end_time">
                                                                    End Time
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    title="End Time"
                                                                    type="time"
                                                                    className={`form-control ${props.errors.end_time ? `is-invalid` : ``}`}
                                                                    id="end_time"
                                                                    name="end_time"
                                                                    autoComplete="off"
                                                                    value={props.deliverySlotData.end_time ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    placeholder="End Time"/>

                                                                <div
                                                                    className={props.errors.end_time ? `invalid-feedback` : ``}>
                                                                    {props.errors.end_time}
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="row">


                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="charge">
                                                                    Charge
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    title="Charge"
                                                                    type="text"
                                                                    className={`form-control ${props.errors.charge ? `is-invalid` : ``}`}
                                                                    id="charge"
                                                                    name="charge"
                                                                    autoComplete="off"
                                                                    value={props.deliverySlotData.charge ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    placeholder="Charge"/>


                                                                <div
                                                                    className={props.errors.charge ? `invalid-feedback` : ``}>
                                                                    {props.errors.charge}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="sort">
                                                                    Sort
                                                                </label>

                                                                <input
                                                                    title="Sort Order"
                                                                    type="text"
                                                                    className={`form-control`}
                                                                    id="sort"
                                                                    name="sort"
                                                                    autoComplete="off"
                                                                    value={props.deliverySlotData.sort ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    placeholder="Sort Order"/>

                                                            </div>
                                                        </div>


                                                    </div>


                                                    <div className="row">


                                                        <div className="col-lg-6">

                                                            <div className="custom-control custom-checkbox">

                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    checked={props.deliverySlotData.active}
                                                                    onChange={(e) => {
                                                                        props.setDeliveryData(e);
                                                                    }}
                                                                    name="active"
                                                                    id="active"/>

                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="active">
                                                                    Active
                                                                </label>
                                                            </div>

                                                        </div>


                                                        <div className="col-lg-6 text-right">
                                                            <div className="form-group">

                                                                <Link legacyBehavior href={'/admin/delivery-slots'}>
                                                                    <a className="btn btn-info mr-2">
                                                                        <i className="icon-arrow-left-solid mr-1 mr-1"/>
                                                                        Back
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    type="submit"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.resetDeliverySlotData();
                                                                    }}
                                                                    className="btn btn-danger mr-2">
                                                                    <i className="fas fa-redo-alt mr-1"/>Reset
                                                                </button>

                                                                <button
                                                                    disabled={loading}
                                                                    type="submit"
                                                                    onClick={saveDeliverySlots}
                                                                    className={`btn btn-success mr-2`}>
                                                                    <i className={loading ? `spinner-border spinner-border-sm mr-1` : `icon-save-regular mr-1`}/>
                                                                    {loading ? ((props.mode === 'edit') ? 'Updating...' : 'Saving..') : ((props.mode === 'edit') ? 'Update' : 'Save')}

                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (store) => {
    let {deliveryDays, deliveryDay, message, errors, deliverySlotData} = store.deliverySlotStore;
    return {deliveryDays, deliveryDay, message, errors, deliverySlotData};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDeliveryDayList: (deliveryDays) => dispatch({type: SET_DELIVERY_DAY_LIST, payload: {deliveryDays}}),
        setDeliveryData: (e) => dispatch({type: SET_DELIVERY_SLOT_DATA, payload: {e}}),
        setDeliverySlotErrors: (errors) => dispatch({type: SET_DELIVERY_SLOT_ERRORS, payload: {errors}}),
        setDeliverySlotMessage: (message_type, message) => dispatch({
            type: SET_DELIVERY_DAY_MESSAGE,
            payload: {message_type, message}
        }),
        resetDeliveryMessage: () => dispatch({type: RESET_DELIVERY_MESSAGE}),
        resetDeliverySlotData: () => dispatch({type: RESET_DELIVERY_SLOT_DATA}),
        editDeliverySlot: (slot) => dispatch({type: EDIT_DELIVERY_SLOT, payload: {slot}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeliverySlot);