import React from 'react';
import Link from "next/link";
import {DELETE, STATUS} from "../../../../Helpers/Utils/Utils";

const PermissionActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">
                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.permission.id}`}>
                    Actions
                </button>
                <div className="dropdown-menu">
                    <Link legacyBehavior
                        href={`permission/edit/${props.permission.id}`}>
                        <a className="dropdown-item">
                            <i className="icon-pencil-alt text-primary"/>{" "}
                            Edit
                        </a>
                    </Link>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm('Are you sure?')) {
                                props.actions({type: DELETE, payload: {index: props.permissionIndex}});
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
                                props.actions({type: STATUS, payload: {index: props.permissionIndex}});
                            }

                        }}>
                        <i
                            id={`status_icon_${props.permission.id}`}
                            className={`icon-sphere ${
                                props.permission.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.permission.id}`}>
                        {props.permission.status === "Active"
                            ? "Unpublished"
                            : "Published"}
                            </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default PermissionActions;