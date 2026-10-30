import {
    CHANGE_PERMISSION_DATA,
    CHANGE_PERMISSION_STATUS,
    EDIT_PERMISSION,
    REMOVE_PERMISSION,
    RESET_PERMISSION_DATA,
    RESET_PERMISSION_MESSAGE,
    SET_PERMISSION,
    SET_PERMISSION_DATA,
    SET_PERMISSION_ERRORS,
    SET_PERMISSION_LIST,
    SET_PERMISSION_MESSAGE,
    SET_PERMISSION_MODULES
} from "../../actions/permission/permissionAction";

let permissionTypes = [
    {value: "add", label: "Add"},
    {value: "edit", label: "Edit"},
    {value: "delete", label: "Delete"},
    {value: "view", label: "View"},
    {value: "miscellaneous", label: "Miscellaneous"},
];

let initialPermissionData = {
    name: '',
    display_name: '',
    description: '',
    permission_type: '',
    module_id: '',
    active: true
}

let initialPermissionErrors = {
    name: '',
    permission_type: '',
    module_id: ''
}

let initialMessage = {
    success: '',
    error: ''
}

let initialState = {
    modules: [],
    permissionTypes: permissionTypes,
    permissionData: initialPermissionData,
    errors: initialPermissionErrors,
    message: initialMessage,
    permissionList: '',
    permission: ''
}


const permissionReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case SET_PERMISSION_MODULES: {
            return {
                ...state,
                modules: payload.modules
            }
        }

        case SET_PERMISSION_DATA: {

            return {
                ...state,
                permissionData: {
                    ...state.permissionData,
                    [payload.e.target.name]: (payload.e.target.type === 'checkbox') ? payload.e.target.checked : payload.e.target.value
                },
                errors: {
                    ...state.errors,
                    [payload.e.target.name]: ''
                }
            }
        }

        case CHANGE_PERMISSION_DATA: {
            return {
                ...state,
                permissionData: {
                    ...state.permissionData,
                    module_id: payload?.module?.value
                },
                errors: {
                    ...state.errors,
                    module_id: ''
                }
            }
        }

        case SET_PERMISSION_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }

        case SET_PERMISSION_MESSAGE: {
            return {
                ...state,
                message: {
                    ...state.message,
                    [payload.message_type]: payload.message
                }
            }
        }

        case SET_PERMISSION_LIST: {

            let permissionList = payload.permissionList;

            return {
                ...state,
                permissionList: permissionList,
                permission: (permissionList.length > 0) ? permissionList[0] : ''
            }
        }

        case SET_PERMISSION: {
            return {
                ...state,
                permission: payload.permission
            }
        }

        case CHANGE_PERMISSION_STATUS: {

            let permission = payload.permission;

            let tempPermissionList = state.permissionList.map((item) => {
                if (item.id === permission.id) {
                    return {...item, status: permission.status};
                }

                return item;
            });

            return {
                ...state,
                permissionList: tempPermissionList
            }
        }

        case REMOVE_PERMISSION: {

            let tempPermissionList = state.permissionList.filter((permission) => permission.id !== payload.id);

            return {
                ...state,
                permissionList: tempPermissionList
            }
        }

        case RESET_PERMISSION_DATA: {
            return {
                ...state,
                permissionData: {...initialPermissionData, module_id: state.permissionData.module_id}
            }
        }

        case RESET_PERMISSION_MESSAGE: {
            return {
                ...state,
                message: initialMessage
            }
        }

        case EDIT_PERMISSION: {
            let permission = payload.permission;

            return {
                ...state,
                permissionData: {
                    ...state.permissionData,
                    name: permission.name,
                    display_name: permission.display_name,
                    description: permission.description,
                    permission_type: permission.permission_type,
                    module_id: permission.module ? permission.module.id : '',
                    active: (permission.status === "Active")
                }
            }
        }


        default:
            return state;
    }
}

export default permissionReducer;
