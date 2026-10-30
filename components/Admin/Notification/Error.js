import React, { useState, useEffect } from "react";

const Error = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = () => setTimeout(() => setShow(false), 5000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  }, [show]);

  return (
    <>
      <div
        className={`body-notification shadow-lg border border-danger ${
          show ? "d-none" : ""
        }`}
      >
        <div className="body-notification-wrap text-danger">
          <i className="icon-bug-solid" />
          <p className="text-danger">{props.message}</p>
          <button
            onClick={(event) => {
              event.preventDefault();
              setShow(!show);
            }}
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

export default Error;
