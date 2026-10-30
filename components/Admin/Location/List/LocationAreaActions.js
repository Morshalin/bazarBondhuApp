import React from 'react';
import Link from "next/link";
import {DELETE, STATUS} from "../../../../Helpers/Utils/Utils";

const LocationAreaActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">

                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.area.id}`}>
                    Actions
                </button>

                <div className="dropdown-menu">

                    <Link legacyBehavior
                        href={`area/edit/${props.area.id}`}>
                        <a className="dropdown-item">
                            <i className="icon-pencil-alt text-primary"/>{" "}
                            Edit
                        </a>
                    </Link>

                    <div className="dropdown-divider"/>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm('Are you sure?')) {
                                props.actions({type: STATUS, payload: {index: props.areaIndex}});
                            }

                        }}>
                        <i
                            id={`status_icon_${props.area.id}`}
                            className={`icon-sphere ${
                                props.area.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.area.id}`}>
                        {props.area.status === "Active"
                            ? "Unpublish"
                            : "Publish"}
                            </span>
                    </button>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm('Are you sure?')) {
                                props.actions({type: DELETE, payload: {index: props.areaIndex}});
                            }

                        }}>
                        <i className="icon-trash-alt-regular text-danger"/>
                        Delete
                    </button>

                </div>
            </div>
        </>
    );
};

export default LocationAreaActions;