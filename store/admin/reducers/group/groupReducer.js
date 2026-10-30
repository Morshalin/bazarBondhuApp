import {
    ASSIGN_GROUP_PERMISSION,
    CHANGE_GROUP,
    EDIT_GROUP,
    REMOVE_GROUP,
    RESET_GROUP_DATA,
    RESET_GROUP_PERMISSION,
    RESET_MESSAGE,
    SET_GROUP,
    SET_GROUP_DATA,
    SET_GROUP_ERRORS,
    SET_GROUP_LIST,
    SET_GROUP_PERMISSIONS,
    SET_MESSAGE
} from "../../actions/group/groupAction";

let initialGroup = {
    name: '',
    display_name: '',
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
    groupList: '',
    group: '',
    groupData: initialGroup,
    groupPermissions: [],
    errors: initialErrors,
    message: initialMessage

}

const groupReducer = (state = initialState, action) => {

    let {type, payload} = action;

    switch (type) {

        case SET_GROUP_DATA: {
            return {
                ...state,
                groupData: {
                    ...state.groupData,
                    [payload.e.target.name]: (payload.e.target.type === 'checkbox') ? payload.e.target.checked : payload.e.target.value
                },
                errors: {
                    ...state.errors,
                    [payload.e.target.name]: ''
                }
            }
        }

        case SET_GROUP: {
            return {
                ...state,
                group: payload.group
            }
        }

        case SET_GROUP_ERRORS: {
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

        case RESET_GROUP_DATA: {
            return initialState;
        }

        case SET_GROUP_LIST: {

            let groupList = payload.groupList;

            return {
                ...state,
                groupList: groupList,
                group: (groupList.length > 0) ? groupList[0] : ''
            }
        }

        case CHANGE_GROUP: {

            let group = payload.group;

            let tempGroupList = state.groupList.map((item) => {
                if (item.id === group.id) {
                    return {...item, status: group.status};
                }

                return item;
            });

            return {
                ...state,
                groupList: tempGroupList
            }
        }

        case REMOVE_GROUP: {

            let tempGroupList = state.groupList.filter((group) => group.id !== payload.id);

            return {
                ...state,
                groupList: tempGroupList
            }

        }

        case SET_GROUP_PERMISSIONS: {
            return {
                ...state,
                groupPermissions: payload.groupPermissions
            }
        }

        case ASSIGN_GROUP_PERMISSION: {

            let permission = payload.permission;

            let tempGroupPermissions = [];

            if (!!state.groupPermissions.find(item => item.id === permission.id)) {
                tempGroupPermissions = state.groupPermissions.filter(groupPermission => groupPermission.id !== permission.id);
            } else {
                tempGroupPermissions = [...state.groupPermissions, permission];
            }

            return {
                ...state,
                groupPermissions: tempGroupPermissions
            }
        }

        case RESET_GROUP_PERMISSION: {
            return {
                ...state,
                groupPermissions: []
            }
        }

        case EDIT_GROUP: {

            let group = payload.group;

            return {
                ...state,
                groupData: {
                    ...state.groupData,
                    name: group.name,
                    description: group.description,
                    display_name: group.display_name,
                    active: (group.status === "Active")
                }
            }
        }

        default:
            return state;
    }
}

export default groupReducer;
