import {SET_ADJUSTMENT, SET_ADJUSTMENT_LIST} from "../../actions/adjustment/adjustmentListAction";

let initialState = {
    adjustmentList: '',
    adjustment: ''
}

const adjustmentListReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_ADJUSTMENT_LIST: {
            let adjustmentList = payload.adjustmentList;
            return {
                ...state,
                adjustmentList: adjustmentList,
                adjustment: (adjustmentList.length > 0) ? adjustmentList[0].adjusted_lists : ''
            }
        }

        case SET_ADJUSTMENT: {
            return {
                ...state,
                adjustment: payload.adjustment
            }
        }

        default:
            return state;
    }

}

export default adjustmentListReducer;