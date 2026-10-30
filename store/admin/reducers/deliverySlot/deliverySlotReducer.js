import {
    CHANGE_DELIVERY_DAY_STATUS,
    CHANGE_DELIVERY_SLOT_STATUS,
    EDIT_DELIVERY_SLOT,
    RESET_DELIVERY_MESSAGE,
    RESET_DELIVERY_SLOT_DATA,
    SET_DELIVERY_DAY,
    SET_DELIVERY_DAY_LIST,
    SET_DELIVERY_DAY_MESSAGE,
    SET_DELIVERY_SLOT_DATA,
    SET_DELIVERY_SLOT_ERRORS
} from "../../actions/deliverySlot/deliverySlotAction";

let initialMessage = {
    success: '',
    error: ''
}

let initialDeliverySlotData = {
    delivery_day_id: '',
    start_time: '',
    end_time: '',
    number_of_order: '',
    charge: '',
    sort: '',
    active: true
}

let initialErrors = {
    delivery_day_id: '',
    start_time: '',
    end_time: '',
    number_of_order: '',
    charge: ''
}

let initialState = {
    deliveryDays: '',
    deliveryDay: '',
    deliverySlotData: initialDeliverySlotData,
    errors: initialErrors,
    message: initialMessage
}

const deliverySlotReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_DELIVERY_DAY_LIST: {

            let deliveryDays = payload.deliveryDays;

            return {
                ...state,
                deliveryDays: deliveryDays,
                deliveryDay: (deliveryDays.length > 0) ? deliveryDays[0] : ''
            }
        }

        case SET_DELIVERY_DAY: {
            return {
                ...state,
                deliveryDay: payload.deliveryDay
            }
        }

        case CHANGE_DELIVERY_DAY_STATUS: {

            let deliveryDay = payload.deliveryDay;

            let tempDeliveryDays = state.deliveryDays.map((item) => {
                if (item.id === deliveryDay.id) {
                    return {...item, status: deliveryDay.status}
                }
                return item;
            });

            return {
                ...state,
                deliveryDays: tempDeliveryDays
            };
        }


        case SET_DELIVERY_SLOT_DATA: {
            let name = payload.e.target.name;
            let value = (payload.e.target.type === 'checkbox') ? payload.e.target.checked : payload.e.target.value;

            return {
                ...state,
                deliverySlotData: {
                    ...state.deliverySlotData,
                    [name]: value
                },
                errors: {
                    ...state.errors,
                    [name]: ''
                }
            }
        }

        case SET_DELIVERY_SLOT_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }


        case SET_DELIVERY_DAY_MESSAGE: {
            return {
                ...state,
                message: {
                    ...state.message,
                    [payload.message_type]: payload.message
                }
            }
        }

        case CHANGE_DELIVERY_SLOT_STATUS: {

            let tempSlot = payload.slot;

            let tempSlots = state.deliveryDay.slots.map((slot) => {
                if (slot.id === tempSlot.id) {
                    return {...slot, status: tempSlot.status};
                }
                return slot;
            });

            return {
                ...state,
                deliveryDay: {...state.deliveryDay, slots: tempSlots}
            };

        }

        case EDIT_DELIVERY_SLOT: {
            let slot = payload.slot;

            return {
                ...state,
                deliverySlotData: {
                    ...state.deliverySlotData,
                    delivery_day_id: slot.delivery_day_id,
                    start_time: slot.start_time,
                    end_time: slot.end_time,
                    number_of_order: slot.number_of_order,
                    charge: slot.charge,
                    sort: slot.sort,
                    active: (slot.status === "Active")
                }
            }
        }

        case RESET_DELIVERY_SLOT_DATA: {
            return initialState;
        }

        case RESET_DELIVERY_MESSAGE: {
            return {
                ...state,
                message: initialMessage
            }
        }

        default:
            return state;
    }

}


export default deliverySlotReducer;