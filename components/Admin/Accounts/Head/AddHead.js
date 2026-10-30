import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import process from "../../../../next.config";
// import process from "../../../next.config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { options } from "../../../../Helpers/Utils/Utils";
import Loader from "react-loader";
import { useRouter } from "next/router";

const AddHead = (props) => {
  const { asPath, route, query } = useRouter();
  const id = query.id;
  const [head, setHead] = useState({
    id: "",
    name: "",
    head_code: "",
    base_unit: "",
    parent: "",
    applicable_for: "",
    applicable_for_active: "",
    head_details: "",
    active: "",
  });

  const [headError, setHeadError] = useState({
    name: "",
    name_error: "",
    head_code: "",
    head_code_error: "",
    base_unit: "",
    base_unit_error: "",
    parent: "",
    parent_error: "",
    applicable_for: "",
    applicable_for_error: "",
    head_details: "",
    head_details_error: "",
    active: "",
    active_error: "",
  });

  const [headsList, setHeadsList] = useState("");
  const [setter, setSetter] = useState(false);

  const getHeadsList = async () => {
    try {
      const acountsApiUrl = `${process.env.api_backend_url}/accounts/heads/head-list`;
      const accountsData = await axios
        .get(acountsApiUrl)
        .then((response) => {
          if (response.data.success) {
            setHeadsList(response.data.data.data);
            setSetter(true);
          }
        })
        .finally(() => {
          setSetter(true);
        });
    } catch (error) {
      setHeadsList("");
      setSetter(false);
    }
  };

  const getHeadData = async () => {
    try {
      const headApiUrl = `${process.env.api_backend_url}/accounts/heads/${id}`;
      await axios
        .get(headApiUrl)
        .then((response) => {
          if (response.data.success) {
            setHead(response.data.data);
            if (props.headType == "addHead") {
              setHead((head) => {
                return {
                  ...head,
                  name: "",
                };
              });
            }
            //setHead({ ...head, [name]: value });
          }
        })
        .finally(() => {
          // setSetter(true);
        });
    } catch (error) {
      setHeadsList("");
      setSetter(false);
    }
  };

  useEffect(() => {
    if (props.headType == "editHead") {
      getHeadData();
    }
    getHeadData();
    getHeadsList();
  }, []);

  const [disabledFiled, setDisabledFiled] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const handleHeadData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "active") {
      value = event.target.checked ? "1" : "0";
    }
    setHead({ ...head, [name]: value });
    setHeadError({ ...headError, [name]: "", [name + "_error"]: "" });
  };

  const submitHeadData = (event) => {
    event.preventDefault();
    setDisabledFiled("disabled");
    const headFormData = new FormData();
    head.name && headFormData.append("name", head.name);
    head.head_code && headFormData.append("head_code", head.head_code);
    head.base_unit && headFormData.append("base_unit", head.base_unit);
    head.applicable_for &&
      headFormData.append(
        "applicable_for",
        head.applicable_for_active ?? head.applicable_for
      );
    let parent;
    if (props.headType == "editHead") {
      headFormData.append("parent", head.parent);
    } else if (props.headType == "addHead") {
      headFormData.append("parent", id);
    } else {
      head.parent && headFormData.append("parent", head.parent);
    }

    head.head_details && headFormData.append("head_details", head.head_details);
    headFormData.append("active", head.active);
    let headApiUrl = `${process.env.api_backend_url}/accounts/heads`;
    if (props.headType == "editHead") {
      headFormData.append("id", id);
      headFormData.append("_method", "PUT");
      headApiUrl = `${process.env.api_backend_url}/accounts/heads/${id}`;
    }

    // const headApiUrl = `${process.env.api_backend_url}/accounts/heads`;
    axios
      .post(headApiUrl, headFormData)
      .then((apiResponses) => {
        if (apiResponses.data.success) {
          setSuccessMessage({
            ...successMessage,
            status: true,
            message: apiResponses.data.message,
          });
          resetHeadFormData(event);
          if (apiResponses.data.data.submit_type == "edit") {
            getHeadData();
          }
        } else {
          setHeadError({
            ...headError,
            name:
              typeof apiResponses.data.errors.name != "undefined"
                ? "is-invalid"
                : "",
            name_error:
              typeof apiResponses.data.errors.name != "undefined"
                ? apiResponses.data.errors.name.join()
                : "",
            applicable_for:
              typeof apiResponses.data.errors.applicable_for != "undefined"
                ? "is-invalid"
                : "",

            applicable_for_error:
              typeof apiResponses.data.errors.applicable_for != "undefined"
                ? apiResponses.data.errors.applicable_for.join()
                : "",
            head_code:
              typeof apiResponses.data.errors.head_code != "undefined"
                ? "is-invalid"
                : "",
            head_code_error:
              typeof apiResponses.data.errors.head_code != "undefined"
                ? apiResponses.data.errors.head_code.join()
                : "",
            base_unit:
              typeof apiResponses.data.errors.base_unit != "undefined"
                ? "is-invalid"
                : "",
            base_unit_error:
              typeof apiResponses.data.errors.base_unit != "undefined"
                ? apiResponses.data.errors.base_unit.join()
                : "",
            parent:
              typeof apiResponses.data.errors.parent != "undefined"
                ? "is-invalid"
                : "",
            parent_error:
              typeof apiResponses.data.errors.parent != "undefined"
                ? apiResponses.data.errors.parent.join()
                : "",
            head_details:
              typeof apiResponses.data.errors.head_details != "undefined"
                ? "is-invalid"
                : "",
            head_details_error:
              typeof apiResponses.data.errors.head_details != "undefined"
                ? apiResponses.data.errors.head_details.join()
                : "",
            active:
              typeof apiResponses.data.errors.active != "undefined"
                ? "is-invalid"
                : "",
            active_error:
              typeof apiResponses.data.errors.active != "undefined"
                ? apiResponses.data.errors.active.join()
                : "",
          });
          setDisabledFiled("");
          setErrorMessage({
            ...errorMessage,
            status: true,
            message: apiResponses.data.message,
          });
          setTimeout(
            () =>
              setErrorMessage({
                ...errorMessage,
                status: false,
                message: "",
              }),
            5000
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetHeadFormData = (event) => {
    event.preventDefault();
    document.getElementById("headFormData").reset();

    setHead({
      name: "",
      head_code: "",
      base_unit: "",
      head_details: "",
      active: "1",
    });

    setHeadError({
      name: "",
      name_error: "",
      head_code: "",
      head_code_error: "",
      base_unit: "",
      base_unit_error: "",
      head_details: "",
      head_details_error: "",
      active: "",
      active_error: "",
    });
    setDisabledFiled("");
    setTimeout(
      () =>
        setSuccessMessage({ ...successMessage, status: false, message: "" }),
      5000
    );
  };

  return (
    <>
      {successMessage.status && <Success message={successMessage.message} />}
      {errorMessage.status && <Error message={errorMessage.message} />}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square" />
                    <h2>
                      {props.headType == "editHead" ? "Edit" : "Add"} Head
                    </h2>
                    <Link legacyBehavior href={`/admin/accounts/accounts-head/`}>
                      <a className="fbh-btn" title="Head List">
                        <i className="icon-list2" />
                      </a>
                    </Link>
                  </div>
                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with * are required input fields.
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <Loader
                    loaded={!!setter}
                    options={options}
                    className="spinner"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <form id="headFormData" method="POST">
                          <fieldset disabled={disabledFiled ?? ""}>
                            <div className="row">
                              <div
                                className={
                                  props.headType == "editHead"
                                    ? "col-lg-6"
                                    : "col-lg-4"
                                }
                              >
                                <div className="form-group">
                                  <label htmlFor="name">
                                    {" "}
                                    খাত <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    type="text"
                                    className={`form-control ${headError.name}`}
                                    placeholder=" খাত"
                                    id="name"
                                    name="name"
                                    defaultValue={
                                      props.headType == "editHead"
                                        ? head.name
                                        : ""
                                    }
                                    onChange={handleHeadData}
                                    required
                                  />
                                  {headError.name && (
                                    <div className="invalid-feedback">
                                      {headError.name_error}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {props.headType == "editHead" ? (
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="head_code"> কোড</label>
                                    <input
                                      type="text"
                                      className={`form-control ${headError.head_code}`}
                                      placeholder=" কোড"
                                      id="head_code"
                                      name="head_code"
                                      defaultValue={head.code}
                                      onChange={handleHeadData}
                                      required
                                      disabled={
                                        props.headType == "addHead" ||
                                        props.headType == "editHead"
                                          ? true
                                          : false
                                      }
                                    />
                                    {headError.head_code && (
                                      <div className="invalid-feedback">
                                        {headError.head_code_error}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {/*<div className="col-lg-4">*/}
                              {/*    <div className="form-group">*/}
                              {/*        <label htmlFor="name"> Base unit</label>*/}
                              {/*        <input*/}
                              {/*            type="text"*/}
                              {/*            className={`form-control ${headError.base_unit}`}*/}
                              {/*            placeholder="base unit"*/}
                              {/*            add="base_unit"*/}
                              {/*            name="base_unit"*/}
                              {/*            onChange={handleHeadData}*/}
                              {/*            required*/}
                              {/*        />*/}
                              {/*        {headError.base_unit && (*/}
                              {/*            <div className="invalid-feedback">*/}
                              {/*                {headError.base_unit_error}*/}
                              {/*            </div>*/}
                              {/*        )}*/}
                              {/*    </div>*/}
                              {/*</div>*/}

                              <div
                                className={
                                  props.headType == "editHead"
                                    ? "col-lg-6"
                                    : "col-lg-4"
                                }
                              >
                                <div className="form-group">
                                  <label htmlFor="parent">
                                    {" "}
                                    মূল খাত
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <select
                                    className={`custom-select mr-sm-2 ${headError.parent}`}
                                    id="parent"
                                    name="parent"
                                    defaultValue={
                                      props.headType == "editHead"
                                        ? head.parent
                                        : props.headType == "addHead"
                                        ? id
                                        : ""
                                    }
                                    onChange={handleHeadData}
                                    disabled={
                                      props.headType == "addHead" ||
                                      props.headType == "editHead"
                                        ? true
                                        : false
                                    }
                                  >
                                    <option>নির্বাচন করুন...</option>
                                    {headsList
                                      ? headsList.map((h_data, index) => (
                                          <option value={h_data.id}>
                                            {h_data.name}{" "}
                                            {h_data.root
                                              ? `(${h_data.root.name})`
                                              : ""}
                                          </option>
                                        ))
                                      : ""}
                                  </select>
                                  {headError.parent && (
                                    <div className="invalid-feedback">
                                      {headError.parent_error}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div
                                className={
                                  props.headType == "editHead"
                                    ? "col-lg-6"
                                    : "col-lg-4"
                                }
                              >
                                <div className="form-group">
                                  <label htmlFor="parent">
                                    প্রযোজ্য
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <select
                                    /* defaultValue={
                                      props.headType == "editHead"
                                        ? head.applicable_for_active
                                        : head.applicable_for_active
                                    } */
                                    defaultValue={head.applicable_for_active}
                                    className={`form-control ${headError.applicable_for}`}
                                    id="applicable_for"
                                    name="applicable_for"
                                    onChange={handleHeadData}
                                    required
                                    disabled={id == 1 || id == 2 ? false : true}
                                  >
                                    <option>নির্বাচন করুন...</option>
                                    <option value="customer"> কাস্টমার </option>
                                    <option value="supplier">সাপ্লায়ার</option>
                                    <option value="user"> মালিক পক্ষ </option>
                                  </select>
                                  {headError.applicable_for_error && (
                                    <div className="invalid-feedback">
                                      {headError.applicable_for_error}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="head_details"> Details</label>
                                  <textarea
                                    className={`form-control ${headError.head_details}`}
                                    rows="3"
                                    id="head_details"
                                    name="head_details"
                                    onChange={handleHeadData}
                                    defaultValue={
                                      props.headType == "editHead"
                                        ? head.details
                                        : ""
                                    }
                                  />

                                  {headError.head_details && (
                                    <div className="invalid-feedback">
                                      {headError.head_details_error}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="head_details"> Details</label>
                                  <input
                                    type="text"
                                    className={`form-control ${headError.head_details}`}
                                    placeholder=" operation value"
                                    id="head_details"
                                    name="head_details"
                                    onChange={handleHeadData}
                                    defaultValue={head.details}
                                  />
                                  {headError.head_details && (
                                    <div className="invalid-feedback">
                                      {headError.head_details_error}
                                    </div>
                                  )}
                                </div>
                              </div> */}
                            </div>

                            <div className="row">
                              <div className="col-lg-6 text-left">
                                <div className="form-group">
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="active"
                                      name="active"
                                      defaultChecked={
                                        props.headType == "editHead"
                                          ? head.active == "Active"
                                            ? true
                                            : false
                                          : true
                                      }
                                      onClick={handleHeadData}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="active"
                                    >
                                      Active
                                    </label>
                                    {headError.active && (
                                      <div className="invalid-feedback">
                                        {headError.active_error}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 text-right">
                                <Link legacyBehavior href={"/admin/accounts/accounts-head"}>
                                  <a className="btn btn-info mr-1">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    back to list
                                  </a>
                                </Link>

                                <button
                                  className="btn btn-danger mr-1"
                                  onClick={resetHeadFormData}
                                >
                                  <i className="icon-reset mr-1 mr-1" />
                                  reset
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={submitHeadData}
                                >
                                  {disabledFiled === "disabled" ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      />{" "}
                                      saving...
                                    </>
                                  ) : (
                                    <>
                                      <i className="icon-save-regular mr-1" />{" "}
                                      save
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </Loader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddHead;
