import React from 'react';
import {STATUS} from "../../../../Helpers/Utils/Utils";

const DayActions = (props) => {
    return (
        <>
            <div className="dropdown action-btn-group">
                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.deliveryDay.id}`}>
                    Actions
                </button>
                <div className="dropdown-menu">
                    {/*<Link*/}
                    {/*    href={`module/edit/${props.deliveryDay.id}`}>*/}
                    {/*    <a className="dropdown-item">*/}
                    {/*        <i className="icon-pencil-alt text-primary"/>*/}
                    {/*        Edit*/}
                    {/*    </a>*/}
                    {/*</Link>*/}

                    {/*<button*/}
                    {/*    className="dropdown-item"*/}
                    {/*    onClick={(event) => {*/}
                    {/*        event.preventDefault();*/}
                    {/*        props.actions({type: DELETE, payload: {index: props.dayIndex}});*/}
                    {/*    }}>*/}
                    {/*    <i className="icon-trash-alt-regular text-danger"/>*/}
                    {/*    Delete*/}
                    {/*</button>*/}

                    {/*<div className="dropdown-divider"/>*/}

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.actions({type: STATUS, payload: {index: props.dayIndex}});
                        }}>
                        <i
                            id={`status_icon_${props.deliveryDay.id}`}
                            className={`icon-sphere ${
                                props.deliveryDay.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.deliveryDay.id}`}>
                        {props.deliveryDay.status === "Active"
                            ? "Unpublish"
                            : "Publish"}
                            </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DayActions;