import {
    SET_EXPIRED_PRODUCT_LIST,
    SET_PRODUCT_PURCHASE,
    SET_PURCHASE_PRODUCT_HISTORY,
    SET_RETURN_ERRORS,
    SET_RETURN_NOTE,
    SET_RETURN_QUANTITY,
    SET_RETURN_TYPE,
    UPDATE_EXPIRED_PRODUCT_LIST
} from "../../actions/expiredProduct/expiredProductListAction";

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
    expiredProductList: '',
    purchaseProductHistory: '',
    purchaseItem: initialPurchaseItem,
    productPurchase: '',
    errors: initialErrors
}

const expiredProductListReducer = (state = initialState, action) => {

    let {type, payload} = action;
    switch (type) {

        case SET_EXPIRED_PRODUCT_LIST: {

            let expiredProductList = payload?.expiredProductList;
            let purchaseProductHistory = (payload?.expiredProductList?.length > 0) ? expiredProductList[0] : ''

            let name = purchaseProductHistory?.name;
            let product_id = purchaseProductHistory?.id;
            let image = purchaseProductHistory?.feature_image;

            return {
                ...state,
                expiredProductList: expiredProductList,
                purchaseProductHistory: purchaseProductHistory,
                purchaseItem: {
                    ...state.purchaseItem,
                    name: name,
                    product_id: product_id,
                    image: image
                }
            }
        }

        case SET_PURCHASE_PRODUCT_HISTORY: {

            let purchaseProductHistory = payload.purchaseProductHistory;

            return {
                ...state,
                purchaseProductHistory: purchaseProductHistory,
                purchaseItem: {
                    ...state.purchaseItem,
                    name: purchaseProductHistory?.name,
                    product_id: purchaseProductHistory?.id,
                    image: purchaseProductHistory?.feature_image,
                }
            }
        }

        case SET_PRODUCT_PURCHASE: {
            let productPurchase = payload?.productPurchase;
            let purchase_id = productPurchase?.purchase_id;
            let product_purchase_id = productPurchase?.id;
            let purchase_quantity = productPurchase?.purchase_quantity;
            let purchase_price = productPurchase?.purchase_price;

            return {
                ...state,
                productPurchase: productPurchase,
                purchaseItem: {
                    ...state.purchaseItem,
                    purchase_id: purchase_id,
                    product_purchase_id: product_purchase_id,
                    purchase_quantity: purchase_quantity,
                    purchase_price: purchase_price,
                    return_quantity: '',
                    note: ''
                }
            }
        }

        case SET_RETURN_TYPE: {

            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    return_type: payload.return_type
                }
            }

        }

        case SET_RETURN_ERRORS: {
            return {
                ...state,
                errors: payload?.errors ? payload?.errors : initialErrors
            }
        }

        case SET_RETURN_NOTE: {
            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    note: payload?.note
                }
            }
        }

        case SET_RETURN_QUANTITY: {
            return {
                ...state,
                purchaseItem: {
                    ...state.purchaseItem,
                    return_quantity: payload?.return_quantity ? parseFloat(payload?.return_quantity) : '',
                },
                errors: initialErrors
            }
        }

        case UPDATE_EXPIRED_PRODUCT_LIST: {
            let product = payload?.product;

            let productPurchase = product?.productAllPurchase?.filter((item) => item.expiry_notification !== 1);

            let tempExpiredProductList = [];

            let purchaseProductHistory = '';

            if (productPurchase.length !== 0) {
                tempExpiredProductList = state?.expiredProductList?.map((item) => {
                    if (item.id === product.id) {
                        return {...item, purchase_qty: product.purchase_qty, productAllPurchase: productPurchase};
                    }
                    return item;
                });

                purchaseProductHistory = product;

            } else {
                tempExpiredProductList = state?.expiredProductList?.filter((item) => item.id !== product.id);
                purchaseProductHistory = (tempExpiredProductList?.length > 0) ? tempExpiredProductList[0] : '';
            }


            return {
                ...state,
                expiredProductList: tempExpiredProductList,
                purchaseProductHistory: purchaseProductHistory,
                purchaseItem: {
                    ...state.purchaseItem,
                    name: purchaseProductHistory?.name,
                    product_id: purchaseProductHistory?.id,
                    image: purchaseProductHistory?.feature_image,
                }
            }

            // return state;
        }

        default:
            return state;
    }
}

export default expiredProductListReducer;
