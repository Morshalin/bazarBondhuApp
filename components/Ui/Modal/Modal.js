import React from "react";

function Modal(props) {
  const { id } = props;
  return (
    <div
      className="modal fade"
      id={`${id ?? "id"}_modal`}
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${id ?? "id"}_modal`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id ?? "id"}_modal`}>
              {props.title ?? "title"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {props.body && <div className="modal-body">{props.body}</div>}
          {props.footer && <div className="modal-footer">{props.footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
