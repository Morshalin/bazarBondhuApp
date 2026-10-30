import {SET_PRODUCTS,} from "../actions/posProductActions";
import {SET_SEARCH_KEYWORDS} from "../actions/posCartActions";

const initialState = {
    products: [],
    search_keywords: ''
}

const posProductReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_PRODUCTS:
            const products = payload.products;
            return {
                ...state,
                products: products
            }

        case SET_SEARCH_KEYWORDS: {

            return {
                ...state,
                search_keywords: payload.keyword
            }
        }

        default :
            return state;
    }
}


export default posProductReducer;