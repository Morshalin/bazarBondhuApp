import {SET_PURCHASE_RETURN, SET_PURCHASE_RETURN_LIST} from "../../actions/purchaseReturn/purchaseReturnListAction";

let initialState = {
    purchaseReturnList: '',
    purchaseReturn: ''
}

const purchaseReturnListReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case SET_PURCHASE_RETURN_LIST: {

            let purchaseReturnList = payload.purchaseReturnList;

            return {
                ...state,
                purchaseReturnList: purchaseReturnList,
                purchaseReturn: ((purchaseReturnList) && (purchaseReturnList.length > 0)) ? purchaseReturnList[0] : ''
            }
        }

        case SET_PURCHASE_RETURN: {

            let purchaseReturn = payload.purchaseReturn;

            return {
                ...state,
                purchaseReturn: purchaseReturn
            }
        }

        default:
            return state;
    }
}

export default purchaseReturnListReducer;