import React, { useState, useEffect } from "react";

const Success = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = () => setTimeout(() => setShow(false), 5000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  }, [show]);

  const handleCloseButton = (event) => {
    event.preventDefault();
    setShow(!show);
  };

  return (
    <>
      <div
        className={`body-notification shadow-lg border border-success ${
          show ? "d-none" : ""
        }`}
      >
        <div className="body-notification-wrap text-success">
          <i className="icon-clipboard-check-solid" />
          <p className="text-success">{props.message}</p>
          <button
            onClick={handleCloseButton}
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

export default Success;
