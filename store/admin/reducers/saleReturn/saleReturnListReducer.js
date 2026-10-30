import {SET_SALE_RETURN, SET_SALE_RETURN_LIST} from "../../actions/saleReturn/saleReturnListAction";

let initialState = {
    saleReturnList: '',
    saleReturn: ''
}

const saleReturnListReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case SET_SALE_RETURN_LIST: {

            let saleReturnList = payload.saleReturnList;

            return {
                ...state,
                saleReturnList: saleReturnList,
                saleReturn: ((saleReturnList) && (saleReturnList.length > 0)) ? saleReturnList[0] : ''
            }
        }

        case SET_SALE_RETURN: {
            let saleReturn = payload.saleReturn;
            return {
                ...state,
                saleReturn: saleReturn
            }
        }

        default:
            return state;
    }
}

export default saleReturnListReducer;