import {SET_MODAL_PRODUCT, SET_PRODUCTS, SHOW_CART_MENU} from "../actions/productAction";

let initialState = {
    products: [],
    modalProduct: '',
    show: false
}


const productReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_PRODUCTS: {

            return {
                ...state,
                products: payload.products
            }
        }

        case SET_MODAL_PRODUCT : {
            return {
                ...state,
                modalProduct: payload.modalProduct
            }
        }

        case SHOW_CART_MENU: {

            let show = payload.show;

            return {
                ...state,
                show: show
            }
        }

        default :
            return state;
    }
}

export default productReducer;