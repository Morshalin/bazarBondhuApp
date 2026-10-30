import {
    ADD_SHIPPING_PRICE_BY_ADDRESS,
    ADD_TO_CART,
    CART_CHECK_OUT, CHANGE_USER_DATA,
    CHECK_BOX_STATUS,
    DECREASE,
    INCREASE,
    REMOVE,
    REMOVE_COUPON_DETAILS,
    RESET_CHECKOUT_MESSAGE,
    SELECT_DELIVERY_ADDRESS, SET_AUTHENTICATE_USER,
    SET_CHECKOUT_MESSAGE,
    SET_COUPON_DETAILS,
    SET_DELIVERY_DATE,
    SET_SLOT_AND_CHARGE, SET_USER_DATA_ERRORS
} from '../actions/cartAction';

import CartStorage from "../../../Helpers/Cart/CartStorage";
import {SET_PAYMENT_METHOD} from "../../pos/actions/posCartActions";

let authUser = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
}

let initialErrors = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
}

let initialMessage = {
    success: '',
    error: ''
}

let initialStore = {
    cart: [],
    authUser: authUser,
    errors: initialErrors,
    coupon_details: [],
    sale_type: 'ECOM',
    shop_id: 2,
    user_id: 0,
    wallet_balance: 0,
    order_date: new Date().toISOString().slice(0, 10),
    address_id: '',
    slot_id: 0,
    slot_charge: 0,
    coupon_discount: 0,
    delivery_charge: 0,
    sub_total: 0,
    grand_total: 0,
    delivery_date: new Date().toISOString().slice(0, 10),
    payment_method: 'Cash On Delivery',
    message: initialMessage
}

let sub_total = 0;
let grand_total = 0;

let ecommerceStore = (ecommerceState) => {
    CartStorage.setCartItems(ecommerceState);
}

const cartReducer = (state = initialStore, action) => {
    let getInitialState = async () => {
        if (!CartStorage.hasCartItems()) {
            CartStorage.setCartItems(state);
        } else {
            state = CartStorage.getCartItems();
        }
    }
    getInitialState().then(result => {
        //console.log(initialStore);
    }).catch(error => {
        // console.log(error);
    })
    sub_total = state.sub_total;

    switch (action.type) {

        // Add item to cart
        case ADD_TO_CART: {
            let id = action.payload.product.id;
            let name = action.payload.product.name;
            let feature_image = action.payload.product.feature_image;
            let image = action.payload.product.feature_image;
            let unit_price = action.payload.product.selling_price;
            let stock_quantity = action.payload.product.product_quantity;
            let weight = action.payload.product.weight;
            let sale_unit = action.payload.product.sale_unit;
            let net_discount = 0;
            let quantity = action.payload.qty ? action.payload.qty : 1;
            let product_discount = action.payload.product.product_discount;
            let discount = net_discount * quantity;
            let price = unit_price * quantity - discount;

            let product = {
                id,
                name,
                feature_image,
                image,
                unit_price,
                net_discount,
                discount,
                price,
                stock_quantity,
                product_discount,
                weight,
                sale_unit,
                quantity,
                checked: true
            }

            let itemExist = false;
            let tempCart = state.cart.map(cartItem => {
                if (cartItem.id === product.id) {
                    itemExist = true;
                    let qty = action.payload.qty ? action.payload.qty : 1;
                    let quantity = cartItem.quantity + qty;
                    let net_price = cartItem.unit_price * quantity;
                    let discount = (cartItem.net_discount * quantity).toFixed(2);
                    let price = (net_price - discount).toFixed(2);
                    if (cartItem.checked)
                        sub_total = sub_total + parseFloat(cartItem.unit_price - cartItem.net_discount) * qty;

                    cartItem = {...cartItem, price, discount, quantity};
                }
                return cartItem;
            });

            let stateData = (itemExist) ? {
                    ...state,
                    cart: tempCart, sub_total, grand_total: sub_total
                } :
                {

                    ...state,
                    cart: [...state.cart, product],
                    sub_total: (sub_total + product.price),
                    grand_total: sub_total + product.price
                };

            // Save Pricing Data to localstorage
            ecommerceStore(stateData);

            return stateData;


        }

        // Check and uncheck a cart item
        case CHECK_BOX_STATUS: {

            let tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    cartItem = {...cartItem, checked: action.payload.checkedValue};
                    sub_total = (action.payload.checkedValue) ? (sub_total + parseFloat((cartItem.unit_price - cartItem.net_discount) * cartItem.quantity)) : (sub_total - parseFloat((cartItem.unit_price - cartItem.net_discount) * cartItem.quantity));

                }
                return cartItem;
            });

            let stateData = {...state, cart: tempCart, sub_total, grand_total: sub_total};

            // Save Pricing Data to localstorage
            ecommerceStore(stateData);

            return stateData;
        }

        // Increase the cart quantity
        case INCREASE: {

            let tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    let quantity = cartItem.quantity + 1;
                    let net_price = cartItem.unit_price * quantity;
                    let discount = (cartItem.net_discount * quantity).toFixed(2);
                    let price = (net_price - discount).toFixed(2);
                    if (cartItem.checked)
                        sub_total = sub_total + parseFloat(cartItem.unit_price - cartItem.net_discount);
                    cartItem = {...cartItem, price, discount, quantity};
                }
                return cartItem;
            });

            let stateData = {...state, cart: tempCart, sub_total, grand_total: sub_total};

            // Save Pricing Data to localstorage
            ecommerceStore(stateData);

            return stateData;
        }

        // Decrease the quantity
        case DECREASE: {

            let tempCart = state.cart.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    let quantity = ((cartItem.quantity - 1) > 0) ? cartItem.quantity - 1 : 1;
                    let net_price = cartItem.unit_price * quantity;
                    let discount = (cartItem.net_discount * quantity).toFixed(2);
                    let price = (net_price - discount).toFixed(2);
                    if (cartItem.checked)
                        sub_total = ((cartItem.quantity - 1) > 0) ? (sub_total - parseFloat(cartItem.unit_price - cartItem.net_discount)) : sub_total;
                    cartItem = {...cartItem, price, discount, quantity};
                }
                return cartItem;
            });

            let stateData = {...state, cart: tempCart, sub_total, grand_total: sub_total};

            // Save Pricing Data to localstorage
            ecommerceStore(stateData);

            return stateData;
        }


        // Remove a cart items
        case REMOVE: {
            state.cart.map(cartItem => {
                sub_total = sub_total - ((cartItem.id === action.payload.id && cartItem.checked) ? parseFloat((cartItem.unit_price - cartItem.net_discount) * cartItem.quantity) : 0);
            });

            let stateData = {
                ...state,
                cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
                sub_total, grand_total: sub_total
            };

            // Save Pricing Data to localstorage
            ecommerceStore(stateData);

            return stateData;
        }

        // Shipping Price Calculation by address distance
        case ADD_SHIPPING_PRICE_BY_ADDRESS: {
            let stateData = '';
            if (state.cart.length) {
                let address = action.payload.address;
                let shipping_price = address.area ? address.area.shipping_price : 0;
                let user_id = address.user ? address.user.id : 1;

                stateData = {
                    ...state,
                    delivery_charge: shipping_price,
                    user_id: user_id,
                    address_id: address ? address.id : 0
                }

                // Save Pricing Data to localstorage
                ecommerceStore(stateData);
            } else {
                stateData = state;
            }

            return stateData;
        }


        // Select a delivery day
        case SET_DELIVERY_DATE : {

            let stateData = '';

            if (state.cart.length) {

                let delivery_date = action.payload.delivery_date;

                stateData = {
                    ...state,
                    delivery_date: delivery_date
                }

                // Save current state to localStorage
                ecommerceStore(stateData);
            } else {
                stateData = state;
            }

            return stateData;
        }

        // Select a delivery address
        case SELECT_DELIVERY_ADDRESS: {
            let stateData = '';

            if (state.cart.length) {

                let address_id = action.payload.address_id;

                stateData = {
                    ...state,
                    address_id: address_id
                }

                ecommerceStore(stateData);
            } else {
                stateData = state;
            }

            return stateData;
        }

        // SET delivery slot and slot charge
        case SET_SLOT_AND_CHARGE: {
            let stateData = '';

            if (state.cart.length) {

                let slot_id = action.payload.slot_id;
                let slot_charge = action.payload.slot_charge;

                stateData = {
                    ...state,
                    slot_id: slot_id,
                    slot_charge: slot_charge,
                }

                ecommerceStore(stateData);
            } else {
                stateData = state;
            }

            return stateData;
        }

        case SET_AUTHENTICATE_USER: {
            let user = action?.payload?.userData;
            let id = user?.id ? user?.id : state?.authUser?.id;
            let first_name = user?.first_name ? user?.first_name : state?.authUser?.first_name;
            let last_name = user?.last_name ? user?.last_name : state?.authUser?.last_name;
            let email = user?.email ? user?.email : state?.authUser?.email;
            let phone = user?.phone ? user?.phone : state?.authUser?.phone;
            let address = user?.address ? user?.address : state?.authUser?.address;

            let userData = {
                id,
                first_name,
                last_name,
                email,
                phone,
                address
            }

            let stateData = {
                ...state,
                authUser: userData,
            }

            ecommerceStore(stateData);

            return stateData;
        }

        case CHANGE_USER_DATA: {

            console.log(action.payload.e.target.name, action.payload.e.target.value);

            let stateData = {
                ...state,
                authUser: {
                    ...state.authUser,
                    [action.payload.e.target.name]: action.payload.e.target.value
                },
                errors: {
                    ...state.errors,
                    [action.payload.e.target.name]: ''
                }
            }

            ecommerceStore(stateData);

            return stateData;
        }

        case SET_USER_DATA_ERRORS: {
            let stateData = {
                ...state,
                errors: action.payload.errors
            }

            ecommerceStore(stateData);

            return stateData;
        }


        //Checkout Message
        case SET_CHECKOUT_MESSAGE: {

            return {
                ...state,
                message: {
                    ...state.message,
                    [action.payload.message_type]: action.payload.message
                }
            }
        }

        case RESET_CHECKOUT_MESSAGE: {
            return {
                ...state,
                message: initialMessage
            }
        }

        case SET_COUPON_DETAILS: {
            let stateData = '';
            let coupon_details = action.payload.coupon;
            let discount_amount;
            let max_amount = coupon_details.maximum_discount_amount;
            if (state.grand_total > coupon_details.min_purchase_amount) {
                if (coupon_details.type === 'Fixed') {
                    discount_amount = coupon_details.amount;
                } else {
                    discount_amount = coupon_details.amount * state.sub_total / 100;
                }

                if (max_amount !== -1 && max_amount !== 0 && discount_amount >= max_amount) {
                    discount_amount = max_amount;
                }

                stateData = {
                    ...state,
                    coupon_details: coupon_details,
                    coupon_discount: discount_amount
                }
                ecommerceStore(stateData);
            } else {
                stateData = state;
            }

            return stateData;
        }
        case REMOVE_COUPON_DETAILS: {
            let stateData = {
                ...state,
                coupon_details: '',
                coupon_discount: 0
            }
            ecommerceStore(stateData);
            return stateData;
        }
        case SET_PAYMENT_METHOD: {
            return {
                ...state,
                payment_method: action.payload.payment_method,
            }
        }
        case CART_CHECK_OUT: {
            ecommerceStore(initialStore);
            return initialStore;
        }

        default:
            return state;
    }
}
export default cartReducer;
