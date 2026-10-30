import React, {useEffect, useState} from 'react';
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import {ERROR, saveAction, showActions, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";
import {connect} from "react-redux";
import {
    EDIT_MODULE,
    RESET_MESSAGE,
    RESET_MODULE_DATA,
    SET_MESSAGE,
    SET_MODULE_DATA,
    SET_MODULE_ERRORS
} from "../../../../store/admin/actions/module/moduleActions";
import {useRouter} from "next/router";

const AddModule = (props) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    useEffect(() => {

        props.resetModuleData();

        let mounted = true;

        (mounted && id) && showActions(`backend/modules/${id}`)
            .then(result => (result.success && props.editModule(result.data)))
            .finally(() => (mounted = false));

    }, [id]);


    const saveModuleData = async (e) => {
        e.preventDefault();

        setLoading(true);

        (props.mode === "edit") ? (updateAction(`backend/modules/${id}`, props.moduleData)
                .then(response => ((response.success) ? (
                            props.setMessage(SUCCESS, response.message)
                            && setTimeout(() => props.resetMessage(), 2000)
                        ) : (
                        props.setMessage(ERROR, response.message)
                        && props.setErrors(response.errors))
                        && setTimeout(() => props.resetMessage(), 2000)
                    )
                ).finally(() => setLoading(false))
        ) : (
            saveAction(`backend/modules`, props.moduleData).then(response => ((response.success) ? (
                    props.setMessage(SUCCESS, response.message)
                    && setTimeout(() => props.resetModuleData(), 2000)
                ) : (
                    props.setMessage(ERROR, response.message)
                    && props.setErrors(response.errors)
                    && setTimeout(() => props.resetMessage(), 2000)
                )
            )).finally(() => setLoading(false))
        );

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
                                        <i className="far fa-plus-square"></i>
                                        <h2>{(props.mode === "edit") ? "Edit" : "Add"} Module</h2>
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

                                                                <label htmlFor="name">
                                                                    Module Name
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors.name ? `is-invalid` : ``}`}
                                                                    id="name"
                                                                    name="name"
                                                                    autoComplete="off"
                                                                    value={props.moduleData.name}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setModuleData(e);
                                                                    }}
                                                                    placeholder="Module Name"
                                                                    required/>

                                                                <div
                                                                    className={props.errors.name ? `invalid-feedback` : ``}>
                                                                    {props.errors.name}
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">

                                                                <label htmlFor="description">
                                                                    Description
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="description"
                                                                    name="description"
                                                                    autoComplete="off"
                                                                    value={props.moduleData.description}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setModuleData(e);
                                                                    }}
                                                                    placeholder="Description"/>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="row">


                                                        <div className="col-lg-6">

                                                            <div className="custom-control custom-checkbox">

                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    checked={props.moduleData.active}
                                                                    onChange={(e) => {
                                                                        props.setModuleData(e);
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

                                                                <Link legacyBehavior href={'/admin/module'}>
                                                                    <a className="btn btn-info mr-2">
                                                                        <i className="icon-arrow-left-solid mr-1 mr-1"/>
                                                                        Back
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    type="submit"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.resetModuleData();
                                                                    }}
                                                                    className="btn btn-danger mr-2">
                                                                    <i className="fas fa-redo-alt mr-1"/>Reset
                                                                </button>

                                                                <button
                                                                    disabled={loading}
                                                                    type="submit"
                                                                    onClick={saveModuleData}
                                                                    className={`btn btn-success mr-2`}>
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
}

const mapStateToProps = (store) => {
    const {moduleData, message, errors} = store.moduleStore;
    return {moduleData, message, errors};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setModuleData: (e) => dispatch({type: SET_MODULE_DATA, payload: {e}}),
        setErrors: (errors) => dispatch({type: SET_MODULE_ERRORS, payload: {errors}}),
        setMessage: (message_type, message) => dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_MESSAGE}),
        resetModuleData: () => dispatch({type: RESET_MODULE_DATA}),
        editModule: (module) => dispatch({type: EDIT_MODULE, payload: {module}})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddModule);