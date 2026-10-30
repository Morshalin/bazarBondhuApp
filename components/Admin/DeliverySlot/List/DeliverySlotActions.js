import React from 'react';
import {STATUS} from "../../../../Helpers/Utils/Utils";
import Link from "next/link";

const DeliverySlotActions = (props) => {

    return (
        <>
            <div className="dropdown action-btn-group">
                <button
                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id={`action_button_${props.slot.id}`}>
                    Actions
                </button>
                <div className="dropdown-menu">
                    <Link legacyBehavior
                        href={`delivery-slots/edit/${props.slot.id}`}>
                        <a className="dropdown-item">
                            <i className="icon-pencil-alt text-primary"/>
                            Edit
                        </a>
                    </Link>

                    {/*<button*/}
                    {/*    className="dropdown-item"*/}
                    {/*    onClick={(event) => {*/}
                    {/*        event.preventDefault();*/}
                    {/*        props.actions({type: DELETE, payload: {index: props.dayIndex}});*/}
                    {/*    }}>*/}
                    {/*    <i className="icon-trash-alt-regular text-danger"/>*/}
                    {/*    Delete*/}
                    {/*</button>*/}

                    <div className="dropdown-divider"/>

                    <button
                        className="dropdown-item"
                        onClick={(event) => {
                            event.preventDefault();
                            props.actions({type: STATUS, payload: {index: props.slotIndex}});
                        }}>
                        <i
                            id={`status_icon_${props.slot.id}`}
                            className={`icon-sphere ${
                                props.slot.status === "Active"
                                    ? "text-danger"
                                    : "text-success"
                            }`}
                        />
                        <span
                            id={`status_name_${props.slot.id}`}>
                        {props.slot.status === "Active"
                            ? "Unpublish"
                            : "Publish"}
                            </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeliverySlotActions;