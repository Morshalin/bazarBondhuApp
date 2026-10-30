import React from 'react';
import Link from "next/link";
import {DELETE, STATUS} from "../../../../Helpers/Utils/Utils";

const ModuleActions = (props) => {

    return (
        <>
            <div className="dropdown action-btn-group">
                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.module.id}`}>
                    Actions
                </button>
                <div className="dropdown-menu">
                    <Link legacyBehavior
                        href={`module/edit/${props.module.id}`}>
                        <a className="dropdown-item">
                            <i className="icon-pencil-alt text-primary"/>
                            Edit
                        </a>
                    </Link>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();

                            if (window.confirm('Are you sure to delete?')) {
                                props.actions({type: DELETE, payload: {index: props.moduleIndex}});
                            }


                        }}>
                        <i className="icon-trash-alt-regular text-danger"/>
                        Delete
                    </button>

                    <div className="dropdown-divider"/>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm('Are you sure?')) {
                                props.actions({type: STATUS, payload: {index: props.moduleIndex}});
                            }

                        }}>
                        <i
                            id={`status_icon_${props.module.id}`}
                            className={`icon-sphere ${
                                props.module.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.module.id}`}>
                        {props.module.status === "Active"
                            ? "Unpublish"
                            : "Publish"}
                            </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModuleActions;