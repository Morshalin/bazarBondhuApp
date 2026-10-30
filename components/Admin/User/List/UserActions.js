import React from 'react';
import Link from "next/link";
import {DELETE, STATUS} from "../../../../Helpers/Utils/Utils";

const UserActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">
                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.user.id}`}>
                    Actions
                </button>
                <div className="dropdown-menu">
                    <Link legacyBehavior
                        href={`user/edit/${props.user.id}`}>
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
                                props.actions({type: DELETE, payload: {index: props.userIndex}});
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
                                props.actions({type: STATUS, payload: {index: props.userIndex}});
                            }

                        }}>
                        <i
                            id={`status_icon_${props.user.id}`}
                            className={`icon-sphere ${
                                props.user.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.user.id}`}>
                        {props.user.status === "Active"
                            ? "Unpublish"
                            : "Publish"}
                            </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserActions;