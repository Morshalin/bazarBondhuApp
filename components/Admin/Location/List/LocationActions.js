import React from "react";
import Link from "next/link";
import { DELETE, STATUS } from "../../../../Helpers/Utils/Utils";

const LocationActions = (props) => {
  return (
    <>
      <div className="dropdown action-btn-group">
        <button
          className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id={`action_button_${props.location.id}`}
        >
          Actions
        </button>

        <div className="dropdown-menu">
          <Link legacyBehavior href={`location/edit/${props.location.id}`}>
            <a className="dropdown-item">
              <i className="icon-pencil-alt text-primary" /> Edit
            </a>
          </Link>

          <div className="dropdown-divider" />

          <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              if (window.confirm("Are you sure?")) {
                props.actions({
                  type: STATUS,
                  payload: { index: props.locationIndex },
                });
              }
            }}
          >
            <i
              id={`status_icon_${props.location.id}`}
              className={`icon-sphere ${
                props.location.status === "Active"
                  ? "text-danger"
                  : "text-success"
              }`}
            />
            <span id={`status_name_${props.location.id}`}>
              {props.location.status === "Active" ? "Unpublish" : "Publish"}
            </span>
          </button>

          <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              if (window.confirm("Are you sure?")) {
                props.actions({
                  type: DELETE,
                  payload: { index: props.locationIndex },
                });
              }
            }}
          >
            <i className="icon-trash-alt-regular text-danger" />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default LocationActions;
