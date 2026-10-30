import {
    ADD_PRODUCT_TO_PRINT_BARCODE,
    CHANGE_ACTIVE_OPTION,
    CHANGE_PRINT_QTY,
    REMOVE_PRODUCT,
    RESET_PRINT_BARCODE
} from "../../actions/barcode/printBarcodeAction";

let initialState = {
    products: [],
    product_name_active: 1,
    product_price_active: 1,
    product_barcode_active: 1,
    company_name_active: 0,
}


const printBarcodeReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case ADD_PRODUCT_TO_PRINT_BARCODE: {
            let id = payload.product.id;
            let name = payload.product.name;
            let barcode = payload.product.barcode;
            if(!barcode){
                alert("This product does not have barcode ! Add barcode first.");
                return state;
            }

            let image = payload.product.feature_image;
            let price = payload.product.selling_price;
            let shop_name = payload.product.shop_name ? payload.product.shop_name : '';
            let qty = 0;

            let product = {id, name, barcode, image, price, qty, shop_name};

            let itemExist = false;

            let tempProducts = state.products.map(item => {
                if (item.id === id) {
                    itemExist = true;
                    let qty = parseFloat(item.qty) + 1;
                    item = {...item, qty};
                }

                return item;
            });


            return itemExist ? {...state, products: tempProducts} : {...state, products: [...state.products, product]}
        }

        case CHANGE_PRINT_QTY: {

            let tempProducts = state.products.map(item => {
                if (item.id === payload.id) {
                    let qty = (payload.qty > 0) ? payload.qty : 0;
                    item = {...item, qty};
                }

                return item;
            });

            return {
                ...state,
                products: tempProducts
            };
        }

        case REMOVE_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(item => item.id !== payload.id)
            }
        }

        case CHANGE_ACTIVE_OPTION: {

            return {
                ...state,
                [payload.name]: payload.value ? 1 : 0
            }
        }

        case RESET_PRINT_BARCODE: {
            return initialState;
        }

        default:
            return state;
    }
}

export default printBarcodeReducer;
