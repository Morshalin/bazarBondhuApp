import {
    RESET_ORDER_INFO,
    RESET_REPORT_ISSUE_DATA,
    SELECT_ORDER,
    SET_ALL_REPORT_ISSUES,
    SET_CUSTOMER_ORDERS, SET_MESSAGE,
    SET_REPORT_DESCRIPTION,
    SET_REPORT_ISSUE_DATA
} from "../actions/customerOrderActions";

let reportIssueData = {
    sale_id: '',
    report_issue: [],
    description: ''
}

let initialMessage = {
    success: '',
    error: ''
}

let initialState = {
    orderList: [],
    order: '',
    allReportIssues: [],
    reportIssueData: reportIssueData,
    message: initialMessage
}


const customerOrderReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_CUSTOMER_ORDERS: {
            let orderList = payload.orderList;
            let order = (orderList && orderList.length > 0) ? orderList[0] : '';
            return {
                ...state,
                orderList: orderList,
            }
            // return {
            //     ...state,
            //     orderList: orderList,
            //     order: order,
            //     reportIssueData: {
            //         ...state.reportIssueData,
            //         sale_id: order ? order.id : '',
            //         report_issue: (order && order.saleReport) ? JSON.parse(order.saleReport.report_issue) : [],
            //         description: (order && order.saleReport) ? order.saleReport.description : ''
            //     }
            // }
        }

        case SELECT_ORDER: {
            let order = payload.order;
            return {
                ...state,
                order: order,
                reportIssueData: {
                    ...state.reportIssueData,
                    sale_id: order.id,
                    report_issue: (order && order.saleReport) ? JSON.parse(order.saleReport.report_issue) : [],
                    description: (order && order.saleReport) ? order.saleReport.description : ''
                }
            }
        }

        case RESET_ORDER_INFO: {
            return initialState;
        }

        case SET_ALL_REPORT_ISSUES: {
            return {
                ...state,
                allReportIssues: payload.allReportIssues
            }
        }

        case SET_REPORT_DESCRIPTION: {
            return {
                ...state,
                reportIssueData: {
                    ...state.reportIssueData,
                    description: payload.description
                }
            }
        }

        case SET_REPORT_ISSUE_DATA: {

            let id = parseInt(payload.e.target.id);
            let name = payload.e.target.name;

            let reportIssueItem = {id, name};

            let itemExit = false;

            let tempReportIssue = payload.e.target.checked ? state.reportIssueData.report_issue.map((item) => {
                if (item.id === reportIssueItem.id) {
                    item = true;
                    return item;
                }
            }) : state.reportIssueData.report_issue.filter((item) => item.id !== id);

            return itemExit ? {
                ...state,
                reportIssueData: {
                    ...state.reportIssueData,
                    report_issue: tempReportIssue
                }
            } : {
                ...state,
                reportIssueData: {
                    ...state.reportIssueData,
                    report_issue: [...state.reportIssueData.report_issue, reportIssueItem]
                }
            }
        }

        case SET_MESSAGE: {
            return {
                ...state,
                message: {
                    ...state.message,
                    [payload.message_type]: payload.message
                }
            }
        }

        case RESET_REPORT_ISSUE_DATA: {
            $('#reportOrderModal').modal('hide');
            return initialState;
        }


        // case SET_GROUP_ERRORS: {
        //     return {
        //         ...state,
        //         errors: payload.errors
        //     }
        // }
        //
        // case SET_MESSAGE: {
        //
        //     return {
        //         ...state,
        //         message: {
        //             ...state.message,
        //             [payload.message_type]: payload.message
        //         }
        //     }
        // }
        //
        // case RESET_MESSAGE: {
        //     return {
        //         ...state,
        //         message: initialMessage
        //     }
        // }
        //
        // case RESET_GROUP_DATA: {
        //     return initialState;
        // }

        default:
            return state;
    }
}

export default customerOrderReducer;