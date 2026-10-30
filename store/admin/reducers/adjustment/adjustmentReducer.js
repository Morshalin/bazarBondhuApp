import {
    ADD_ADJUSTMENT,
    ADJUSTMENT_SUCCESS,
    ATTACHED_DOCUMENT,
    CHANGE_ACTION,
    CHANGE_QUANTITY,
    REMOVE_ADJUSTMENT,
    RESET_ADJUSTMENT_STORE,
    SET_ADJUSTMENT_DATE,
    SET_ERROR_MESSAGE,
    SET_ERRORS,
    SET_NOTE,
    SET_REFERENCE_NO,
    SET_SUCCESS_MESSAGE
} from "../../actions/adjustment/adjustmentAction";

let initialState = {
    products: [],
    document: '',
    note: '',
    adjustment_date: new Date().toISOString().slice(0, 10),
    reference_no: '',
    errors: '',
    success_message: '',
    error_message: '',
}

const adjustmentReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case ADD_ADJUSTMENT : {

            let id = payload.product.id;
            let name = payload.product.name;
            let barcode = payload.product.barcode;
            let image = payload.product.feature_image;
            let purchase_qty = payload.product.purchase_qty;
            let selling_qty = payload.product.selling_qty;
            let stock = parseFloat(purchase_qty) - parseFloat(selling_qty);
            let action = "Subtraction";
            let qty = 0;


            let product = {id, name, barcode, image, purchase_qty, selling_qty, stock, action, qty};

            let itemExist = false;

            let quantityExit = false;

            let tempProducts = state.products.map(item => {
                if (item.id === id) {
                    itemExist = true;
                    let qty = parseFloat(item.qty) + 1;

                    if ((item.action === "Subtraction")) {
                        if (item.stock > qty) {
                            item = {...item, qty};
                        } else {
                            quantityExit = true;
                        }

                    } else {
                        item = {...item, qty};
                    }

                }

                return item;
            });

            if (quantityExit) {
                alert('Subtraction of adjustment quantity must be less than purchase quantity.');
            }

            return itemExist ? {...state, products: tempProducts} : {...state, products: [...state.products, product]}
        }

        case CHANGE_QUANTITY : {

            let quantityExit = false;

            let tempProducts = state.products.map(item => {
                if (item.id === payload.id) {

                    let qty = (payload.qty > 0) ? payload.qty : 0;

                    if ((item.action === "Subtraction")) {
                        if (item.stock > qty) {
                            item = {...item, qty};
                        } else {
                            quantityExit = true;
                        }

                    } else {
                        item = {...item, qty};
                    }
                }

                return item;
            });

            if (quantityExit) {
                alert('Subtraction of adjustment quantity must be less than purchase quantity.');
            }

            return {
                ...state,
                products: tempProducts
            }
        }

        case CHANGE_ACTION : {

            let quantityExit = false;

            let tempProducts = state.products.map(item => {
                if (item.id === payload.id) {

                    let action = payload.action;

                    if ((action === "Subtraction")) {
                        if (item.stock > item.qty) {
                            item = {...item, action};
                        } else {
                            quantityExit = true;
                        }
                    } else {
                        item = {...item, action};
                    }

                }

                if (quantityExit) {
                    alert('Subtraction of adjustment quantity must be less than purchase quantity.');
                }

                return item;
            });

            return {
                ...state,
                products: tempProducts
            }
        }


        case REMOVE_ADJUSTMENT: {
            return {
                ...state,
                products: state.products.filter(item => item.id !== payload.id)
            };
        }

        case ATTACHED_DOCUMENT: {
            let document_file = payload.attached_file;

            return {
                ...state,
                document: document_file
            }
        }

        case SET_NOTE : {

            return {
                ...state,
                note: payload.note
            }
        }

        case SET_ADJUSTMENT_DATE : {
            return {
                ...state,
                adjustment_date: payload.adjustment_date
            }
        }

        case SET_REFERENCE_NO: {
            return {
                ...state,
                reference_no: payload.reference_no
            }
        }

        case SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                success_message: payload.success_message
            }
        }

        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                error_message: payload.error_message
            }
        }

        case SET_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }

        case ADJUSTMENT_SUCCESS: {

            document.getElementById("document_input_field").innerHTML = 'doc, pdf, or image';

            return {
                ...state,
                products: [],
                document: '',
                note: '',
                total_qty: '',
                reference_no: '',
                adjustment_date: new Date().toISOString().slice(0, 10)
            }
        }

        case RESET_ADJUSTMENT_STORE: {
            document.getElementById("document_input_field").innerHTML = 'doc, pdf, or image';
            return initialState;
        }


        default:
            return state;
    }
}

export default adjustmentReducer;