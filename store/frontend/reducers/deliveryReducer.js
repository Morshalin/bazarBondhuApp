import DeliveryStorage from '../../../Helpers/Delivery/DeliveryStorage'
import {
    ADD_CUSTOMER_SHIPPING_ADDRESS,
    CHANGE_AUTH_USER,
    EDIT_CUSTOMER_SHIPPING_ADDRESS,
    EXPAND_ADD_DELIVERY,
    SELECT_DELIVERY_DAY,
    SELECT_DELIVERY_SLOT,
    SET_ALL_AREAS,
    SET_AREAS,
    SET_AUTH_USER,
    SET_CUSTOMER_ALL_ADDRESSES,
    SET_CUSTOMER_SHIPPING_ADDRESS,
    SET_DELIVERY_DAYS,
    SET_DELIVERY_TYPE,
    SET_LOCATIONS,
    UPDATE_CUSTOMER_SHIPPING_ADDRESS
} from '../actions/deliveryActions'

let authUser = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
}

let initialState = {
    locations: '',
    areas: '',
    allAreas: '',
    customerAllAddresses: '',
    customerShippingAddress: '',
    editableShippingAddress: '',
    authUser: authUser,
    expandAddDelivery: false,
    deliveryDays: '',
    selectedDay: '',
    selectedDeliveryDay: '',
    month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    slot_id: 0,
    delivery_type: 'cash_on_delivery',
}

let setDeliverySlotId = (slot_id) => {
    DeliveryStorage.setDeliverySlot(slot_id)
}

const deliveryReducer = (state = initialState, action) => {
    let getDeliverySlot = async () => {
        state = {...state, slot_id: DeliveryStorage.getDeliverySlot()}
    }

    getDeliverySlot()
        .then((res) => res)
        .catch((e) => e)

    let {type, payload} = action

    switch (type) {
        case SET_CUSTOMER_ALL_ADDRESSES: {
            let addresses = payload.addresses

            let defaultSelectedAddress =
                (addresses.length &&
                    addresses.find((address) => address.selected == 1)) ||
                (addresses.length && addresses[0])

            return {
                ...state,
                customerAllAddresses: addresses,
                customerShippingAddress: defaultSelectedAddress,
            }
        }

        case SET_LOCATIONS: {
            return {
                ...state,
                locations: payload.locations,
            }
        }

        case SET_AREAS: {
            return {
                ...state,
                areas: payload.areas,
            }
        }

        case SET_ALL_AREAS: {
            return {
                ...state,
                allAreas: payload.allAreas,
            }
        }

        case SET_CUSTOMER_SHIPPING_ADDRESS: {
            return {
                ...state,
                customerShippingAddress: payload.address,
            }
        }

        case EDIT_CUSTOMER_SHIPPING_ADDRESS: {
            return {
                ...state,
                editableShippingAddress: payload.address ? payload.address : '',
            }
        }

        case ADD_CUSTOMER_SHIPPING_ADDRESS: {
            return {
                ...state,
                customerAllAddresses: [payload.address, ...state.customerAllAddresses],
                customerShippingAddress: payload.address,
            }
        }

        case UPDATE_CUSTOMER_SHIPPING_ADDRESS: {
            let updatedAddress = payload.address

            let updatedAllAddress = state.customerAllAddresses.map((address) => {
                if (address.id === updatedAddress.id) {
                    return updatedAddress
                } else {
                    return address
                }
            })

            return {
                ...state,
                customerAllAddresses: updatedAllAddress,
            }
        }

        case SET_AUTH_USER: {
            let user = payload.userData ? payload.userData : payload.authUser;
            let id = user.id ? user.id : state.authUser.id;
            let first_name = user.first_name ? user.first_name : state.authUser.first_name;
            let last_name = user.last_name ? user.last_name : state.authUser.last_name;
            let email = user.email ? user.email : state.authUser.email;
            let phone = user.phone ? user.phone : state.authUser.phone;
            let address = user.address ? user.address : state.authUser.address;

            let userData = {
                id,
                first_name,
                last_name,
                email,
                phone,
                address
            }

            return {
                ...state,
                authUser: userData,
            }
        }

        case CHANGE_AUTH_USER: {
            let user = payload.userData

            let id = user.id ? user.id : state.authUser.id
            let first_name = user.first_name
                ? user.first_name
                : state.authUser.first_name
            let last_name = user.last_name ? user.last_name : state.authUser.last_name
            let email = user.email ? user.email : state.authUser.email
            let phone = user.phone ? user.phone : state.authUser.phone

            let userData = {
                id,
                first_name,
                last_name,
                email,
                phone,
            }

            return {
                ...state,
                authUser: userData,
            }
        }

        case EXPAND_ADD_DELIVERY: {
            return {
                ...state,
                expandAddDelivery: true,
            }
        }

        case SET_DELIVERY_TYPE: {
            return {
                ...state,
                delivery_type: payload.delivery_type,
            }
        }

        case SET_DELIVERY_DAYS: {
            return {
                ...state,
                deliveryDays: payload.deliveryDays,
                selectedDeliveryDay:
                    payload.deliveryDays && payload.deliveryDays.length > 0
                        ? payload.deliveryDays[0]
                        : 0,
            }
        }

        case SELECT_DELIVERY_DAY: {
            return {
                ...state,
                selectedDeliveryDay: payload.selectedDeliveryDay,
            }
        }

        case SELECT_DELIVERY_SLOT: {
            setDeliverySlotId(payload.slot_id)

            return {
                ...state,
                slot_id: payload.slot_id,
            }
        }

        default:
            return state
    }
}

export default deliveryReducer
