import {
    ATTACHED_PURCHASE_RETURN_DOCUMENT,
    CHANGE_PURCHASE_RETURN_QUANTITY,
    PURCHASE_RETURN_CART,
    PURCHASE_RETURN_CART_REMOVE,
    PURCHASE_RETURN_SET_SUPPLIER,
    RESET_PURCHASE_RETURN,
    SAVE_PURCHASE_RETURN,
    SET_PURCHASE_RETURN_DATE, SET_PURCHASE_RETURN_ERROR_MESSAGE, SET_PURCHASE_RETURN_ERRORS,
    SET_PURCHASE_RETURN_REFERENCE_NO,
    SET_PURCHASE_RETURN_RETURN_NOTE,
    SET_PURCHASE_RETURN_SHIPPING_COST,
    SET_PURCHASE_RETURN_STAFF_NOTE,
    SET_PURCHASE_RETURN_STATUS, SET_PURCHASE_RETURN_SUCCESS_MESSAGE,
    SET_PURCHASE_RETURN_TOTAL_DISCOUNT,
    SET_PURCHASE_RETURN_TOTAL_TAX
} from "../../actions/purchaseReturn/purchaseReturnAction";


let errors = {
    document_error: '',
    products_error: '',
    reference_no_error: '',
    return_date_error: '',
    status_error: '',
    supplier_id_error: ''
}

let initialState = {
    products: [],
    reference_no: '',
    warehouse_id: 1,
    supplier_id: '',
    total_qty: 0,
    total_discount: 0,
    total_tax: 0,
    shipping_cost: 0,
    sub_total: 0,
    grand_total: 0,
    return_note: '',
    staff_note: '',
    document: '',
    status: '',
    return_date: new Date().toISOString().slice(0, 10),
    errors,
    success_message: '',
    error_message: ''
}

const purchaseReturnReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case PURCHASE_RETURN_CART: {

            let id = payload.product.id;
            let name = payload.product.name;
            let code = payload.product.barcode;
            let image = payload.product.feature_image;
            let purchase_unit_id = payload.product.purchase_unit ? payload.product.purchase_unit.id : '';
            let purchase_price = payload.product.purchase_price;
            let selling_price = payload.product.selling_price;
            let item_tax = 0;
            let product_vat = 0;
            let promotional_discount = 0;
            let discount = 0;
            let purchase_quantity = payload.product.purchase_qty;
            let selling_quantity = payload.product.selling_qty;
            let return_quantity = 0;
            let sub_total = 0.00;
            let grand_total = 0.00;
            let status = 'Received';

            let product = {
                id,
                name,
                code,
                image,
                purchase_unit_id,
                purchase_price,
                selling_price,
                item_tax,
                product_vat,
                promotional_discount,
                discount,
                sub_total,
                grand_total,
                purchase_quantity,
                selling_quantity,
                return_quantity,
                status
            };

            let itemExist = false;

            let tempProducts = state.products.map((item) => {
                if (item.id === product.id) {
                    itemExist = true;
                }

                return item;
            });

            return (itemExist) ? {
                ...state,
                products: tempProducts,
                errors: {...state.errors, products_error: ''}
            } : {
                ...state,
                products: [...state.products, product],
                errors: {...state.errors, products_error: ''}
            };


        }

        case CHANGE_PURCHASE_RETURN_QUANTITY: {

            let tempProducts = state.products.map((item) => {
                if (item.id === payload.id) {
                    let return_quantity = Math.abs(parseFloat(payload.return_quantity)) > 0 ? Math.abs(parseFloat(payload.return_quantity)) : 0;
                    let sub_total = (return_quantity * item.purchase_price).toFixed(2);
                    let grand_total = sub_total;
                    item = {...item, return_quantity, sub_total, grand_total};
                }

                return item;
            });

            let total_qty = tempProducts.reduce((initialValue, {return_quantity}) => initialValue + return_quantity, 0);
            let new_sub_total = tempProducts.reduce((initialValue, {sub_total}) => initialValue + parseFloat(sub_total), 0);

            let sub_total = parseFloat(state.sub_total);

            let temp_grand_total = parseFloat(state.grand_total) - sub_total + new_sub_total;

            return {
                ...state,
                products: tempProducts,
                total_qty: total_qty,
                sub_total: new_sub_total,
                grand_total: temp_grand_total
            };
        }

        case PURCHASE_RETURN_CART_REMOVE: {

            let tempProducts = state.products.filter((item) => (item.id !== payload.id));

            let total_qty = tempProducts.reduce((initialValue, {return_quantity}) => initialValue + return_quantity, 0);
            let new_sub_total = tempProducts.reduce((initialValue, {sub_total}) => initialValue + parseFloat(sub_total), 0);
            let sub_total = parseFloat(state.sub_total);
            let temp_grand_total = parseFloat(state.grand_total) - parseFloat(sub_total) + parseFloat(new_sub_total);

            return {
                ...state,
                products: tempProducts,
                total_qty: total_qty,
                sub_total: new_sub_total,
                grand_total: temp_grand_total
            }
        }

        case PURCHASE_RETURN_SET_SUPPLIER: {
            return {
                ...state,
                supplier_id: payload.supplier_id,
                errors: {...state.errors, supplier_id_error: ''}
            }
        }

        case SET_PURCHASE_RETURN_DATE: {
            return {
                ...state,
                return_date: payload.return_date,
                errors: {...state.errors, return_date_error: ''}
            }
        }

        case SET_PURCHASE_RETURN_REFERENCE_NO: {
            return {
                ...state,
                reference_no: payload.reference_no,
                errors: {...state.errors, reference_no_error: ''}
            }
        }

        case SET_PURCHASE_RETURN_STATUS: {
            return {
                ...state,
                status: payload.status,
                errors: {...state.errors, status_error: ''}
            }
        }

        case ATTACHED_PURCHASE_RETURN_DOCUMENT: {
            return {
                ...state,
                document: payload.document,
                errors: {...state.errors, document_error: ''}
            }
        }

        case SET_PURCHASE_RETURN_TOTAL_TAX: {

            let temp_total_tax = Math.abs(parseFloat(payload.total_tax)) > 0 ? Math.abs(parseFloat(payload.total_tax)) : 0.00;

            let temp_grand_total = temp_total_tax + parseFloat(state.grand_total) - parseFloat(state.total_tax);

            return {
                ...state,
                total_tax: temp_total_tax,
                grand_total: temp_grand_total
            }
        }

        case SET_PURCHASE_RETURN_TOTAL_DISCOUNT: {

            let temp_total_discount = Math.abs(parseFloat(payload.total_discount)) > 0 ? Math.abs(parseFloat(payload.total_discount)) : 0.00;

            let temp_grand_total = parseFloat(state.grand_total) + parseFloat(state.total_discount) - temp_total_discount;

            return {
                ...state,
                total_discount: temp_total_discount,
                grand_total: temp_grand_total
            }
        }

        case SET_PURCHASE_RETURN_SHIPPING_COST: {

            let temp_shipping_cost = Math.abs(parseFloat(payload.shipping_cost)) > 0 ? Math.abs(parseFloat(payload.shipping_cost)) : 0.00;

            let temp_grand_total = temp_shipping_cost + parseFloat(state.grand_total) - parseFloat(state.shipping_cost);

            return {
                ...state,
                shipping_cost: temp_shipping_cost,
                grand_total: temp_grand_total
            }
        }

        case SET_PURCHASE_RETURN_STAFF_NOTE: {
            return {
                ...state,
                staff_note: payload.staff_note
            }
        }

        case SET_PURCHASE_RETURN_RETURN_NOTE: {
            return {
                ...state,
                return_note: payload.return_note
            }
        }

        case SET_PURCHASE_RETURN_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }

        case SET_PURCHASE_RETURN_SUCCESS_MESSAGE: {
            return {
                ...state,
                success_message: payload.success_message
            }
        }

        case SET_PURCHASE_RETURN_ERROR_MESSAGE: {
            return {
                ...state,
                error_message: payload.error_message
            }
        }

        case SAVE_PURCHASE_RETURN: {
            return initialState;
        }

        case RESET_PURCHASE_RETURN: {
            return initialState;
        }

        default:
            return state;
    }
}

export default purchaseReturnReducer;

