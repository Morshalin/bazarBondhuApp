import React, { useState, useEffect } from "react";

const MessageNotification = (props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const closeHandler = (event) => {
    event.preventDefault();
    setShow(false);
    props.onClick();
  };

  return (
    <>
      <div
        className={`body-notification shadow-lg border ${
          props.error ? "border-danger" : "border-success"
        } border-success ${show ? "" : "d-none"}`}
      >
        <div
          className={`body-notification-wrap ${
            props.error ? "text-danger" : "text-success"
          }`}
        >
          <i
            className={`${
              props.error ? "icon-bug-solid" : "icon-clipboard-check-solid"
            }`}
          />
          <p className={`${props.error ? "text-danger" : "text-success"}`}>
            {props.message}
          </p>
          <button
            onClick={closeHandler}
            type="button"
            className="close body-notification-close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageNotification;
