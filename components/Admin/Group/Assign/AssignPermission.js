import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {ERROR, getAllRequest, saveAction, SUCCESS} from "../../../../Helpers/Utils/Utils";
import {
    ASSIGN_GROUP_PERMISSION,
    RESET_GROUP_PERMISSION,
    RESET_MESSAGE,
    SET_GROUP_PERMISSIONS,
    SET_MESSAGE
} from "../../../../store/admin/actions/group/groupAction";
import Link from "next/link";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import axios from "axios";

const AssignPermission = (props) => {

    const router = useRouter();
    const {id} = router.query;

    const [modules, setModules] = useState([]);

    const [loading, setLoading] = useState(false);

    const [allPermissions, setAllPermissions] = useState([]);

    const [groupName, setGroupName] = useState('');

    useEffect(() => {

        let mounted = true;

        mounted && getAllRequest([axios.get(`backend/modules`), axios.get(`backend/permissions`), axios.get(`backend/roles/${id}`)])
            .then(result => {
                (
                    (result[0].data.success && setModules(result[0].data.data))
                    || (result[1].data.success && setAllPermissions(result[1].data.data))
                    || (result[2].data.success && props.setGroupPermissions(result[2].data.data.permissions))
                )

                result[2].data.success && setGroupName(result[2].data.data.name);

            }).finally(() => {
                mounted = false;
            });


    }, [id]);

    const assignPermission = (e) => {
        e.preventDefault();
        setLoading(true);

        const groupPermissionFormData = new FormData();
        let permissions = props.groupPermissions.map(({id}) => id);
        groupPermissionFormData.append('permissions', JSON.stringify(permissions));
        groupPermissionFormData.append("_method", "PUT");

        saveAction(`backend/roles/${id}`, groupPermissionFormData).then((result) => {

            result.success ? props.setMessage(SUCCESS, result.message) : props.setMessage(ERROR, result.message);

        }).finally(() => {
            setLoading(false);
            setTimeout(() => props.resetMessage(), 2000);
        });
    }


    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">

                                    <div className="fbh-title">
                                        <i className="icon-list2"></i>
                                        <h2>Assign {groupName ?? ''} Group
                                            Permissions</h2>
                                    </div>

                                    <div className="fbh-info">
                                        <p>Assign permission to the group bellow</p>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="table-responsive custom-table">
                                                <table className="table table-bordered table-hover">
                                                    <thead className="">
                                                    <tr className="table-info">
                                                        <th scope="col"
                                                            colSpan="6">Assign {groupName ?? ''} Group
                                                            Permissions
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col" rowSpan="2" className="text-left">Module Name
                                                        </th>
                                                        <th scope="col" colSpan="5">Permissions</th>
                                                    </tr>
                                                    <tr>
                                                        <th scope="col">View</th>
                                                        <th scope="col">Add</th>
                                                        <th scope="col">Edit</th>
                                                        <th scope="col">Delete</th>
                                                        <th scope="col">Miscellaneous</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        (modules && modules.length > 0) ? modules.map((module, index) => (
                                                            <tr key={index}>

                                                                <td scope="row" className="font-weight-bold">
                                                                    {module.name}
                                                                </td>


                                                                <td scope="row" className="text-center">

                                                                    {
                                                                        (module.permissions && (module.permissions.length > 0)) && module.permissions.map((permission, viewIndex) => {
                                                                            if (permission.permission_type === "view") {

                                                                                return (
                                                                                    <div key={viewIndex}
                                                                                         className="custom-control custom-checkbox">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               checked={!!props.groupPermissions.find(item => item.name === permission.name)}
                                                                                               onChange={() => {
                                                                                                   props.assignGroupPermission(permission);
                                                                                               }}
                                                                                               id={permission.name}/>

                                                                                        <label
                                                                                            title={permission.display_name}
                                                                                            className="custom-control-label"
                                                                                            htmlFor={permission.name}> </label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }

                                                                </td>

                                                                <td scope="row" className="text-center">

                                                                    {
                                                                        (module.permissions && (module.permissions.length > 0)) && module.permissions.map((permission, addIndex) => {
                                                                            if (permission.permission_type === "add") {

                                                                                return (
                                                                                    <div key={addIndex}
                                                                                         className="custom-control custom-checkbox">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               checked={!!props.groupPermissions.find(item => item.name === permission.name)}
                                                                                               onChange={() => {
                                                                                                   props.assignGroupPermission(permission);
                                                                                               }}
                                                                                               id={permission.name}/>

                                                                                        <label
                                                                                            className="custom-control-label"
                                                                                            title={permission.display_name}
                                                                                            htmlFor={permission.name}> </label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }

                                                                </td>

                                                                <td scope="row" className="text-center">

                                                                    {
                                                                        (module.permissions && (module.permissions.length > 0)) && module.permissions.map((permission, editIndex) => {
                                                                            if (permission.permission_type === "edit") {
                                                                                return (
                                                                                    <div key={editIndex}
                                                                                         className="custom-control custom-checkbox">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               checked={!!props.groupPermissions.find(item => item.name === permission.name)}
                                                                                               onChange={() => {
                                                                                                   props.assignGroupPermission(permission);
                                                                                               }}
                                                                                               id={permission.name}/>

                                                                                        <label
                                                                                            title={permission.display_name}
                                                                                            className="custom-control-label"
                                                                                            htmlFor={permission.name}> </label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }

                                                                </td>

                                                                <td scope="row" className="text-center">

                                                                    {
                                                                        (module.permissions && (module.permissions.length > 0)) && module.permissions.map((permission, deleteIndex) => {
                                                                            if (permission.permission_type === "delete") {
                                                                                return (
                                                                                    <div key={deleteIndex}
                                                                                         className="custom-control custom-checkbox">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               checked={!!props.groupPermissions.find(item => item.name === permission.name)}
                                                                                               onChange={() => {
                                                                                                   props.assignGroupPermission(permission);
                                                                                               }}
                                                                                               id={permission.name}/>

                                                                                        <label
                                                                                            title={permission.display_name}
                                                                                            className="custom-control-label"
                                                                                            htmlFor={permission.name}> </label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }

                                                                </td>


                                                                <td>

                                                                    {
                                                                        (module.permissions && (module.permissions.length > 0)) && module.permissions.map((permission, miscellaneousIndex) => {
                                                                            if (permission.permission_type === "miscellaneous") {
                                                                                return (
                                                                                    <div
                                                                                        key={miscellaneousIndex}
                                                                                        className="custom-control custom-checkbox custom-control-inline">
                                                                                        <input type="checkbox"
                                                                                               className="custom-control-input"
                                                                                               checked={!!props.groupPermissions.find(item => item.name === permission.name)}
                                                                                               onChange={() => {
                                                                                                   props.assignGroupPermission(permission);
                                                                                               }}
                                                                                               id={permission.name}/>
                                                                                        <label
                                                                                            title={permission.display_name}
                                                                                            className="custom-control-label font-weight-bold"
                                                                                            htmlFor={permission.name}> {permission.display_name}</label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }


                                                                </td>
                                                            </tr>

                                                        )) : (
                                                            <tr>
                                                                <td colSpan="7" className="text-center">
                                                                    No Modules Found
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group text-right">

                                                <Link legacyBehavior href={'/admin/group'}>
                                                    <a className="btn btn-info mr-2">
                                                        <i className="icon-arrow-left-solid mr-1 mr-1"/>
                                                        Back
                                                    </a>
                                                </Link>

                                                <button
                                                    type="submit"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.resetGroupPermission();
                                                    }}
                                                    className="btn btn-danger mr-2">
                                                    <i className="fas fa-redo-alt mr-1"/>Reset
                                                </button>

                                                <button
                                                    type="submit"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.setGroupPermissions(allPermissions);
                                                    }}
                                                    className="btn btn-primary mr-2">
                                                    <i className="fas fa-check mr-1"/> All Check
                                                </button>


                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    className={`btn btn-success mr-2`} onClick={assignPermission}>
                                                    <i className="fas fa-lock mr-1"/>
                                                    {loading ? 'Assigning...' : 'Assign'}
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

const mapStateToProps = (store) => {
    const {groupPermissions, message} = store.groupStore;
    return {groupPermissions, message};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGroupPermissions: (groupPermissions) => dispatch({type: SET_GROUP_PERMISSIONS, payload: {groupPermissions}}),
        assignGroupPermission: (permission) => dispatch({type: ASSIGN_GROUP_PERMISSION, payload: {permission}}),
        resetGroupPermission: () => dispatch({type: RESET_GROUP_PERMISSION}),
        setMessage: (message_type, message) => dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_MESSAGE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignPermission);
