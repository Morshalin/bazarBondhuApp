import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import MySucces from "../../Admin/Notification/MySuccess";
import MyError from "../../Admin/Notification/MyError";

const ContactUsForm = () => {
  let initialStateOfInputFiled = {
    sender_name: "",
    sender_mail: "",
    message: "",
  };

  let initialStateOfErrors = {
    sender_name: "",
    sender_mail: "",
    message: "",
  };

  const [contactInfo, setContactInfo] = useState(initialStateOfInputFiled);
  const [errorsBag, setErrorsBag] = useState(initialStateOfErrors);
  const [disableState, setDisableState] = useState("");
  const form = useRef(null);

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const resetSuccesMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      ...errorMessage,
      status: false,
      message: "",
    });
  };

  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
  }, []);

  const handleOnChangeInput = (event) => {
    event.preventDefault();
    setContactInfo({
      ...contactInfo,
      [event.target.name]: event.target.value,
    });
    setErrorsBag({
      ...errorsBag,
      [event.target.name]: "",
    });
  };

  const handaleSubmit = async (event) => {
    event.preventDefault();
    setDisableState("disabled");
    let customOrderPostedData = new FormData(form.current);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    await axios
      .post(
        "https://posapi.desktopit.org/api/v1/contacus-mail-send",
        customOrderPostedData,
        config
      )
      .then(({ data }) => {
        if (data.success) {
          document.getElementById("resetForm").reset();
          setContactInfo(initialStateOfInputFiled);
          setSuccessMessage({
            ...successMessage,
            status: true,
            message: data.message,
          });
        } else {
          setErrorMessage({
            ...errorMessage,
            status: true,
            message: data.message,
          });
          setErrorsBag(data.errors);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisableState("");
      });
  };

  return (
    <>
      {successMessage.status && (
        <MySucces
          message={successMessage.message}
          resetSuccesMessage={resetSuccesMessage}
        />
      )}

      {errorMessage.status && (
        <MyError
          message={errorMessage.message}
          resetErrorMessage={resetErrorMessage}
        />
      )}
      <section className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <form
              ref={form}
              id="resetForm"
              className="inverse-color-form"
              onSubmit={handaleSubmit}
            >
              <fieldset disabled={disableState ? "disabled" : ""}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="sender_name" className="contact-label" title="Enter Your Message" >
                        Message *
                      </label>
                      <textarea
                        rows="7"
                        cols="50"
                        className={`form-control shadow-sm ${
                          errorsBag.message && `is-invalid`
                        }`}
                        placeholder="Message"
                        id="message"
                        name="message"
                        value={contactInfo.message}
                        onFocus={(e) => {
                          e.target.placeholder = "";
                        }}
                        onBlur={(e) => {
                          e.target.placeholder = "Message";
                        }}
                        onChange={handleOnChangeInput}
                      />
                      <div className="invalid-feedback">
                        {errorsBag.message}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="sender_name" className="contact-label" title="Enter Your Name" >
                        Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control border-0 shadow-sm ${
                          errorsBag.sender_name && `is-invalid`
                        }`}
                        placeholder="Name"
                        id="sender_name"
                        name="sender_name"
                        value={contactInfo.sender_name}
                        onChange={handleOnChangeInput}
                      />
                      <div className="invalid-feedback">
                        {errorsBag.sender_name}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="sender_mail"className="contact-label" title="Enter Your Email" >
                        Email *
                      </label>
                      <input
                        type="email"
                        className={`form-control border-0 shadow-sm ${
                          errorsBag.sender_mail && `is-invalid`
                        }`}
                        placeholder="email"
                        id="sender_mail"
                        name="sender_mail"
                        value={contactInfo.sender_mail}
                        onChange={handleOnChangeInput}
                      />
                      <div className="invalid-feedback">
                        {errorsBag.sender_mail}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn text-center submit-button contact-submit w-100"
                      type="submit"
                    >
                      {disableState === "disabled" ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          submiting...
                        </>
                      ) : (
                        <>submit</>
                      )}
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUsForm;
