import {
    SET_PURCHASE,
    SET_PURCHASE_ACTION_NOTE,
    SET_PURCHASE_ACTION_QUANTITY,
    SET_PURCHASE_ITEM,
    SET_PURCHASE_LIST,
    SET_PURCHASE_RETURN_ERRORS, SET_PURCHASE_RETURN_TYPE,
    UPDATE_PURCHASE
} from "../../actions/purchase/purchaseListAction";

let initialErrors = {
    return_quantity: ''
}

let initialPurchaseItem = {
    product_id: '',
    purchase_id: '',
    product_purchase_id: '',
    purchase_quantity: '',
    return_quantity: '',
    purchase_price: '',
    return_type: "Purchase Return",
    note: '',
    name: '',
    image: ''
}

let initialState = {
    purchaseList: '',
    purchase: '',
    purchaseItem: initialPurchaseItem,
    errors: initialErrors
}

const purchaseListReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case SET_PURCHASE_LIST: {
            let purchaseList = payload.purchaseList;
            return {
                ...state,
                purchaseList: purchaseList,
                purchase: purchaseList && (purchaseList.length > 0) ? purchaseList[0] : [],
            }
        }

        case SET_PURCHASE: {
            return {
                ...state,
                purchase: payload.purchase,
            }
        }

        case SET_PURCHASE_ITEM: {
            let product_id = payload.purchaseItem?.product.id;
            let purchase_id = payload.purchaseItem?.purchase_id;
            let product_purchase_id = payload.purchaseItem?.id;
            let purchase_quantity = payload.purchaseItem?.purchase_quantity
            let return_quantity = '';
            let purchase_price = payload.purchaseItem?.purchase_price;
            let return_type = state.purchaseItem.return_type;
            let note = '';
            let name = payload.purchaseItem?.product.name;
            let image = payload.purchaseItem?.product.feature_image;

            let purchaseItem = {
                product_id,
                purchase_id,
                product_purchase_id,
                purchase_quantity,
                return_quantity,
                purchase_price,
                return_type,
                note,
                name,
                image
            }

            return {
                ...state,
                purchaseItem: purchaseItem
            }
        }

        case SET_PURCHASE_ACTION_NOTE: {
            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    note: payload.note
                }
            }
        }

        case SET_PURCHASE_ACTION_QUANTITY: {
            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    return_quantity: payload?.return_quantity ? parseFloat(payload?.return_quantity) : '',
                },
                errors: {
                    ...state.errors,
                    return_quantity: ''
                }
            }
        }

        case SET_PURCHASE_RETURN_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }

        case UPDATE_PURCHASE: {
            let purchase = payload.purchase;
            let tempPurchaseList = state.purchaseList.map((item) => {
                if (item.id === purchase.id) {
                    return {...item, purchase}
                }

                return item;
            })

            return {
                ...state,
                purchase: purchase,
                purchaseList: tempPurchaseList
            }
        }

        case SET_PURCHASE_RETURN_TYPE: {
            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    return_type: payload.return_type
                }
            }
        }


        default:
            return state;
    }

}

export default purchaseListReducer;
