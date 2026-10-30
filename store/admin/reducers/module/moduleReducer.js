import {
    CHANGE_MODULE,
    EDIT_MODULE,
    REMOVE_MODULE,
    RESET_MESSAGE,
    RESET_MODULE_DATA,
    SET_MESSAGE,
    SET_MODULE,
    SET_MODULE_DATA,
    SET_MODULE_ERRORS,
    SET_MODULE_LIST
} from "../../actions/module/moduleActions";

let initialModule = {
    name: '',
    description: '',
    active: true
}

let initialErrors = {
    name: ''
}

let initialMessage = {
    success: '',
    error: ''
}

let initialState = {
    moduleList: '',
    module: '',
    moduleData: initialModule,
    errors: initialErrors,
    message: initialMessage
}

const moduleReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case SET_MODULE_DATA: {

            return {
                ...state,
                moduleData: {
                    ...state.moduleData,
                    [payload.e.target.name]: (payload.e.target.type === 'checkbox') ? payload.e.target.checked : payload.e.target.value
                },
                errors: {
                    ...state.errors,
                    [payload.e.target.name]: ''
                }
            }
        }

        case SET_MODULE_ERRORS: {
            return {
                ...state,
                errors: payload.errors
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

        case RESET_MESSAGE: {
            return {
                ...state,
                message: initialMessage
            }
        }

        case RESET_MODULE_DATA: {
            return initialState;
        }


        case SET_MODULE_LIST: {

            let moduleList = payload.moduleList;

            return {
                ...state,
                moduleList: moduleList,
                module: (moduleList.length > 0) ? moduleList[0] : ''
            }
        }

        case SET_MODULE: {

            let module = payload.module;

            return {
                ...state,
                module: module
            }
        }

        case CHANGE_MODULE: {

            let module = payload.module;

            let tempModuleList = state.moduleList.map((item) => {
                if (item.id === module.id) {
                    return {...item, status: module.status}
                }

                return item;
            });

            return {
                ...state,
                moduleList: tempModuleList
            }
        }

        case REMOVE_MODULE: {

            let tempModuleList = state.moduleList.filter((module) => module.id !== payload.id);

            return {
                ...state,
                moduleList: tempModuleList
            };
        }

        case EDIT_MODULE: {

            let module = payload.module;

            return {
                ...state,
                moduleData: {
                    ...state.moduleData,
                    name: module.name,
                    description: module.description,
                    active: (module.status === "Active") ? true : false
                }
            }
        }

        default:
            return state;
    }
}

export default moduleReducer;