import {
    ATTACHED_SALE_RETURN_DOCUMENT,
    RESET_SALE_RETURN,
    SALE_RETURN_ADD_QUANTITY,
    SALE_RETURN_ADD_TO_CART,
    SALE_RETURN_CART,
    SALE_RETURN_REMOVE,
    SALE_RETURN_SET_CUSTOMER,
    SET_SALE_RETURN_DATE,
    SET_SALE_RETURN_NOTE,
    SET_SALE_RETURN_REFERENCE_NO,
    SET_SALE_RETURN_SHIPPING_COST,
    SET_SALE_RETURN_STATUS,
    SET_SALE_RETURN_TOTAL_DISCOUNT,
    SET_SALE_RETURN_TOTAL_TAX
} from "../../actions/saleReturn/saleReturnCartAction";

let initialState = {
    products: [],
    reference_no: '',
    return_date: new Date().toISOString().slice(0, 10),
    shop_id: '',
    customer_id: '',
    staff_note: '',
    document: '',
    status: '',
    total_qty: 0,
    sub_total: 0,
    grand_total: 0,
    total_tax: 0.00,
    total_discount: 0.00,
    shipping_cost: 0.00,
}

const saleReturnCartReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case SALE_RETURN_SET_CUSTOMER: {

            let customer_id = action.payload.user_id

            return {
                ...state,
                customer_id
            }
        }
        case SALE_RETURN_ADD_TO_CART: {

            let id = action.payload.product.id;
            let name = action.payload.product.name;
            let image = action.payload.product.feature_image;
            let unit_price = action.payload.product.selling_price;
            let stock_quantity = action.payload.product.stock;
            let weight = action.payload.product.weight;
            let sale_unit = action.payload.product.sale_unit;
            let net_discount = 0;
            let quantity = 0;
            let sub_total = 0;
            let discount = net_discount * quantity;
            let price = unit_price * quantity - discount;

            let product = {
                id,
                name,
                image,
                unit_price,
                net_discount,
                discount,
                price,
                stock_quantity,
                weight,
                sale_unit,
                quantity,
                sub_total

            }

            let itemExist = false;
            let temp_sub_total = 0;

            let tempCart = state.products.map(cartItem => {

                if (cartItem.id === product.id) {
                    itemExist = true;
                    let quantity = cartItem.quantity + 1;
                    let net_price = cartItem.unit_price * quantity;
                    let discount = (cartItem.net_discount * quantity).toFixed(2);
                    let price = (net_price - discount).toFixed(2);

                    sub_total = sub_total + parseFloat(cartItem.unit_price - cartItem.net_discount);
                    temp_sub_total = (state.sub_total - cartItem.sub_total) + price;
                    cartItem = {...cartItem, price, discount, quantity};


                }
                return cartItem;
            });

            let temp_grand_total = temp_sub_total;
            let stateData = (itemExist) ? {
                    ...state,
                    products: tempCart,
                    sub_total: temp_grand_total,
                    grand_total: temp_grand_total,
                    pos_amount: temp_grand_total,
                    change_return: 0

                } :
                {
                    ...state,
                    products: [...state.products, product],
                };

            // //To store in localstorage
            // posStore(stateData);

            return stateData;

        }

        case SALE_RETURN_ADD_QUANTITY: {
            let temp_sub_total = 0;
            let tempCart = state.products.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    let quantity = action.payload.quantity;
                    let net_price = cartItem.unit_price * quantity;
                    let discount = (cartItem.net_discount * quantity).toFixed(2);
                    let price = parseFloat((net_price - discount).toFixed(2));
                    temp_sub_total = parseFloat(state.sub_total - cartItem.sub_total + price);
                    cartItem = {...cartItem, price, discount, quantity, sub_total: price};

                }


                return cartItem;
            });

            let temp_grand_total = parseFloat(temp_sub_total + state.total_tax + state.shipping_cost - state.total_discount);
            console.log('test', state)
            let stateData = {
                ...state,
                products: tempCart,
                sub_total: temp_sub_total,
                grand_total: temp_grand_total,
                pos_amount: temp_grand_total,
            };

            //To store in localstorage
            //posStore(stateData);

            return stateData;
        }

        case  SALE_RETURN_REMOVE: {
            let sub_total = state.sub_total;
            state.products.map(cartItem => {
                sub_total = sub_total - ((cartItem.id === action.payload.id) ? parseFloat(cartItem.sub_total) : 0);
            });
            let temp_grand_total = parseFloat(sub_total + state.total_tax + state.shipping_cost - state.total_discount);
            let stateData = {
                ...state,
                products: state.products.filter(cartItem => cartItem.id !== action.payload.id),
                sub_total,
                grand_total: temp_grand_total,
            };

            //To store in localstorage
            //posStore(stateData);

            return stateData;
        }

        case SET_SALE_RETURN_DATE: {
            return {
                ...state,
                return_date: action.payload.date
            }
        }
        case SET_SALE_RETURN_TOTAL_TAX: {
            let tax = Math.abs(parseFloat(payload.total_tax)) > 0 ? Math.abs(parseFloat(payload.total_tax)) : 0.00
            let temp_grand_total = state.grand_total - state.total_tax + tax
            console.log('grand', action.payload.total_tax)
            return {
                ...state,
                grand_total: temp_grand_total,
                total_tax: tax
            }
        }

        case SET_SALE_RETURN_TOTAL_DISCOUNT: {
            let discount = Math.abs(parseFloat(payload.total_discount)) > 0 ? Math.abs(parseFloat(payload.total_discount)) : 0.00
            let temp_grand_total = state.grand_total + state.total_discount - discount
            return {
                ...state,
                grand_total: temp_grand_total,
                total_discount: discount
            }
        }

        case SET_SALE_RETURN_SHIPPING_COST: {
            let shipping = Math.abs(parseFloat(payload.shipping_cost)) > 0 ? Math.abs(parseFloat(payload.shipping_cost)) : 0.00
            let temp_grand_total = state.grand_total - state.shipping_cost + shipping
            return {
                ...state,
                grand_total: temp_grand_total,
                shipping_cost: shipping
            }
        }
        case SET_SALE_RETURN_REFERENCE_NO: {
            return {
                ...state,
                reference_no: payload.reference_no
            }
        }
        case SET_SALE_RETURN_STATUS: {
            return {
                ...state,
                status: payload.status
            }
        }

        case ATTACHED_SALE_RETURN_DOCUMENT: {
            return {
                ...state,
                document: payload.document
            }
        }

        case RESET_SALE_RETURN: {
            return initialState;
        }

        case SET_SALE_RETURN_NOTE: {

            return {
                ...state,
                staff_note: action.payload.sale_return_note

            };
        }

        case SALE_RETURN_CART: {
            let id = payload.product.id;
            let name = payload.product.name;
            let code = payload.product.barcode;
            let image = payload.product.feature_image;
            let quantity = 1;

            let product = {id, name, code, image, quantity}

            let itemExist = false;

            return state;
        }
        default:
            return state;
    }
}

export default saleReturnCartReducer;