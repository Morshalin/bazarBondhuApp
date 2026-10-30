import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
import {
    EDIT_GROUP,
    RESET_GROUP_DATA,
    RESET_MESSAGE,
    SET_GROUP_DATA,
    SET_GROUP_ERRORS,
    SET_MESSAGE,
} from "../../../../store/admin/actions/group/groupAction";
import {ERROR, saveAction, showActions, SUCCESS, updateAction} from "../../../../Helpers/Utils/Utils";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import {useRouter} from "next/router";

const AddGroup = (props) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {id} = router.query;

    useEffect(() => {

        props.resetGroupData();

        let mounted = true;

        (mounted && id) && showActions(`backend/roles/${id}`)
            .then(result => (result.success && props.editGroup(result.data)))
            .finally(() => (mounted = false));

    }, [id]);


    const saveGroup = (e) => {

        e.preventDefault();

        setLoading(true);

        (props.mode === "edit") ? (updateAction(`backend/roles/${id}`, props.groupData)
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
            saveAction(`backend/roles`, props.groupData).then(response => ((response.success) ? (
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
                                        <h2>{(props.mode === "edit") ? "Edit" : "Add"} Group</h2>
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
                                                                    Group Name
                                                                    <span className="text-danger"> * </span>
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${props.errors.name ? `is-invalid` : ``}`}
                                                                    id="name"
                                                                    autoComplete="off"
                                                                    name="name"
                                                                    value={props.groupData.name}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();

                                                                        props.setGroupData(e);
                                                                    }}
                                                                    placeholder="Group Name"
                                                                    required/>

                                                                <div
                                                                    className={props.errors.name ? `invalid-feedback` : ``}>
                                                                    {props.errors.name}
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
                                                                    autoComplete="off"
                                                                    name="display_name"
                                                                    value={props.groupData.display_name}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setGroupData(e);
                                                                    }}
                                                                    placeholder="Display Name"/>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <label>Group Description</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    rows="8"
                                                                    name="description"
                                                                    autoComplete="off"
                                                                    placeholder="Group Description"
                                                                    value={props.groupData.description}
                                                                    onChange={(e) => {
                                                                        e.preventDefault();
                                                                        props.setGroupData(e);
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
                                                                    onChange={(e) => {
                                                                        props.setGroupData(e);
                                                                    }}
                                                                    checked={props.groupData.active}
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
                                                                        props.resetGroupData();
                                                                    }}
                                                                    className="btn btn-danger mr-2">
                                                                    <i className="fas fa-redo-alt mr-1"/>Reset
                                                                </button>

                                                                <button
                                                                    type="submit"
                                                                    onClick={saveGroup}
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
};

const mapDispatchToProps = (dispatch) => {

    return {
        setGroupData: (e) => dispatch({type: SET_GROUP_DATA, payload: {e}}),
        setMessage: (message_type, message) => dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        setErrors: (errors) => dispatch({type: SET_GROUP_ERRORS, payload: {errors}}),
        resetGroupData: () => dispatch({type: RESET_GROUP_DATA}),
        resetMessage: () => dispatch({type: RESET_MESSAGE}),
        editGroup: (group) => dispatch({type: EDIT_GROUP, payload: {group}})
    }

}


const mapStateToProps = (store) => {
    const {groupData, errors, message} = store.groupStore;
    return {groupData, errors, message};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);