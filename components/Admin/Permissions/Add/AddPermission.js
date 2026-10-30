import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {ERROR, getActions, saveAction, showActions, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";
import {connect} from "react-redux";
import {
    CHANGE_PERMISSION_DATA,
    EDIT_PERMISSION,
    RESET_PERMISSION_DATA,
    RESET_PERMISSION_MESSAGE,
    SET_PERMISSION_DATA,
    SET_PERMISSION_ERRORS,
    SET_PERMISSION_MESSAGE,
    SET_PERMISSION_MODULES
} from "../../../../store/admin/actions/permission/permissionAction";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import {useRouter} from "next/router";
import Select from "react-select";

const AddPermission = (props) => {

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [selectedModule, setSelectedModule] = useState({
        value: '',
        label: 'Select Module'
    });

    const router = useRouter();

    const {id} = router.query;

    useEffect(() => {

        props.resetPermissionData();

        let allModules = props.modules;

        let mounted = true;

        getActions(`backend/modules`, false)
            .then((res) => {
                allModules = mounted && res.success && res.data.map(({id, name}) => {
                    return {
                        value: id,
                        label: name
                    }
                });
            })
            .finally(() => {
                mounted = false;
                props.setPermissionModules(allModules);
                setIsLoading(!isLoading);
                setIsDisabled(!isDisabled);
            });

        (mounted && id) && showActions(`backend/permissions/${id}`)
            .then((res) => {
                if (res.success) {
                    props.editPermission(res.data);

                    setSelectedModule({
                        value: res?.data?.module?.id,
                        label: res?.data?.module?.name
                    })
                }
            })


    }, [id]);


    const savePermission = (e) => {
        e.preventDefault();

        setLoading(true);

        props.mode === "edit" ? updateAction(`backend/permissions/${id}`, props.permissionData).then(response =>
            (response.success) ? (
                props.setPermissionMessage(SUCCESS, response.message)
                && setTimeout(() => props.resetPermissionMessage(), 2000)
            ) : (
                props.setPermissionMessage(ERROR, response.message)
                && props.setPermissionErrors(response.errors)
                && setTimeout(() => props.resetPermissionMessage(), 2000)
            )
        ).finally(() => setLoading(false)) : saveAction(`backend/permissions`, props.permissionData).then(response =>
            (response.success) ? (
                props.setPermissionMessage(SUCCESS, response.message)
                && setTimeout(() => props.resetPermissionData(), 2000)
                && setTimeout(() => props.resetPermissionMessage(), 2000)
            ) : (
                props.setPermissionMessage(ERROR, response.message)
                && props.setPermissionErrors(response.errors)
                && setTimeout(() => props.resetPermissionMessage(), 2000)
            )
        ).finally(() => setLoading(false));
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
                                        <i className="far fa-plus-square"/>
                                        <h2>{(props.mode === "edit") ? "Edit" : "Add"} Permission</h2>
                                    </div>
                                    <div className="fbh-info">
                                        <p>Please fill in the information below.
                                            The field labels marked with
                                            <span className="text-danger"> * </span>
                                            are required input fields.</p>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <form>
                                                <fieldset disabled={loading}>

                                                    <div className="row">

                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor="module">
                                                                    Module <span className="text-danger"> * </span>
                                                                </label>
                                                                <div
                                                                    className={`custom-height`}>

                                                                    <Select
                                                                        className={`${props?.errors?.module_id ? `is-invalid` : ''}`}
                                                                        onChange={(selectedOption) => {
                                                                            setSelectedModule(selectedOption);
                                                                            props.changePermissionData(selectedOption);
                                                                        }}
                                                                        value={selectedModule}
                                                                        options={props.modules}
                                                                        autoFocus={false}
                                                                        isClearable={false}
                                                                        isLoading={isLoading}
                                                                        isDisabled={isDisabled}/>


                                                                    <div
                                                                        className={props?.errors?.module_id ? `invalid-feedback` : ``}>
                                                                        {props?.errors?.module_id}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label htmlFor="permission_type">
                                                                    Permission Type <span
                                                                    className="text-danger"> * </span>
                                                                </label>
                                                                <div
                                                                    className={`input-group`}>

                                                                    <select
                                                                        className={`custom-select ${props.errors?.permission_type ? `is-invalid` : ``}`}
                                                                        id="permission_type"
                                                                        name="permission_type"
                                                                        onChange={(e) => {
                                                                            props.setPermissionData(e);
                                                                        }}
                                                                        value={props.permissionData.permission_type ?? ''}
                                                                        aria-label="Permission Type">
                                                                        <option value="">Select Type</option>
                                                                        {
                                                                            props.permissionTypes.map((type, index) => (
                                                                                <option value={type.value}
                                                                                        key={index}>{type.label}</option>
                                                                            ))
                                                                        }

                                                                    </select>

                                                                    <div
                                                                        className={props.errors?.permission_type ? `invalid-feedback` : ``}>
                                                                        {props.errors?.permission_type}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="name">
                                                                    Permission Name
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors?.name ? `is-invalid` : ``}`}
                                                                    autoComplete="off"
                                                                    id="name"
                                                                    name="name"
                                                                    value={props.permissionData.name}
                                                                    onChange={(e) => {
                                                                        props.setPermissionData(e);
                                                                    }}
                                                                    placeholder="Permission Name"
                                                                    required/>

                                                                <div
                                                                    className={props.errors?.name ? `invalid-feedback` : ``}>
                                                                    {props.errors?.name}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="display_name">
                                                                    Display Name
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="display_name"
                                                                    name="display_name"
                                                                    value={props.permissionData.display_name ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setPermissionData(e);
                                                                    }}
                                                                    placeholder="Display Name"/>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label htmlFor="description">
                                                                    Description
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="8"
                                                                    name="description"
                                                                    autoComplete="off"
                                                                    placeholder="Description"
                                                                    value={props.permissionData.description ?? ''}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setPermissionData(e);
                                                                    }}/>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="row">


                                                        <div className="col-lg-6">

                                                            <div className="custom-control custom-checkbox">

                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    checked={props.permissionData.active}
                                                                    onChange={(e) => {
                                                                        props.setPermissionData(e);
                                                                    }}
                                                                    name="active"
                                                                    id="active"/>

                                                                <label
                                                                    className="custom-control-label"
                                                                    htmlFor="active">
                                                                    Active
                                                                </label>
                                                            </div>

                                                        </div>


                                                        <div className="col-lg-6 text-right">
                                                            <div className="form-group">

                                                                <Link legacyBehavior href={'/admin/permission'}>
                                                                    <a className="btn btn-info mr-2">
                                                                        <i className="icon-arrow-left-solid mr-1 mr-1"/>
                                                                        Back
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    type="submit"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.resetPermissionData();
                                                                    }}
                                                                    className="btn btn-danger mr-2">
                                                                    <i className="fas fa-redo-alt mr-1"/>Reset
                                                                </button>

                                                                <button
                                                                    type="submit"
                                                                    onClick={savePermission}
                                                                    className={`btn btn-success mr-2 ${loading ? 'disabled' : ''}`}>
                                                                    <i className={loading ? `spinner-border spinner-border-sm mr-1` : `icon-save-regular mr-1`}/>
                                                                    {loading ? ((props.mode === 'edit') ? 'Updating...' : 'Saving..') : ((props.mode === 'edit') ? 'Update' : 'Save')}

                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                            </form>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setPermissionData: (e) => dispatch({type: SET_PERMISSION_DATA, payload: {e}}),
        changePermissionData: (module) => dispatch({type: CHANGE_PERMISSION_DATA, payload: {module}}),
        setPermissionModules: (modules) => dispatch({type: SET_PERMISSION_MODULES, payload: {modules}}),
        setPermissionErrors: (errors) => dispatch({type: SET_PERMISSION_ERRORS, payload: {errors}}),
        setPermissionMessage: (message_type, message) => dispatch({
            type: SET_PERMISSION_MESSAGE,
            payload: {message_type, message}
        }),
        resetPermissionData: () => dispatch({type: RESET_PERMISSION_DATA}),
        resetPermissionMessage: () => dispatch({type: RESET_PERMISSION_MESSAGE}),
        editPermission: (permission) => dispatch({type: EDIT_PERMISSION, payload: {permission}})
    }
}

const mapStateToProps = (store) => {
    const {modules, permissionTypes, permissionData, errors, message} = store.permissionStore;
    return {modules, permissionTypes, permissionData, errors, message};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPermission);
