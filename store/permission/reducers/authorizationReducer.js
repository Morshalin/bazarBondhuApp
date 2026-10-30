// import {SET_AUTHORIZATION} from "../actions/permissionActions";

// let initialState = {
//     permissions: []
// }

// let getInitialState = async () => {
//     if (localStorage.getItem('permissions')) {
//         initialState.permissions = JSON.parse(localStorage.getItem('permissions'))
//     } else {

//     }
// }

// getInitialState().then(res => {
//     //console.log(res);
// }).catch((error) => {
//     //console.log(error);
// });

// const authorizationReducer = (state = initialState, action) => {

//     let {type, payload} = action;

//     switch (type) {

//         case SET_AUTHORIZATION:
//             let permissions = payload.permissions;
//             let module = ''
//             let permission_type = ''
//             let permission = {
//                 module,
//                 permission_type
//             }
//             let tempPermissions = permissions && permissions.map(perm => {

//                 permission = {
//                     module: perm.module.name,
//                     permission_type: perm.permission_type !== 'miscellaneous' ? perm.permission_type : perm.name
//                 }
//                 return permission
//             })

//             localStorage.setItem('permissions', JSON.stringify(tempPermissions));
//             return {
//                 permissions: tempPermissions
//             }


//         default :
//             return state;
//     }
// }


// export default authorizationReducer;
