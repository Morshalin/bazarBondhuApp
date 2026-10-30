import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  EDIT_SUPPLIER,
  REMOVE_CONTACT_ITEMS,
  RESET_SUPPLIER_DATA,
  RESET_SUPPLIER_MESSAGE,
  SET_SUPPLIER_CONTACTS,
  SET_SUPPLIER_DATA,
  SET_SUPPLIER_ERRORS,
  SET_SUPPLIER_MESSAGE,
  UPDATE_SUPPLIER_CONTACT,
} from "../../../../store/admin/actions/supplier/supplierActions";
import Link from "next/link";
import {
  ERROR,
  saveAction,
  showActions,
  SUCCESS,
  updateAction,
} from "../../../../Helpers/Utils/Utils";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import { useRouter } from "next/router";

import { pattern } from "../../../../Helpers/Utils/phoneNumberValidation";

const AddSupplier = (props) => {
  const [loading, setLoading] = useState(false);
  const [isValue, setIsValue] = useState(false);

  const [clientErrors, setClientErrors] = useState({
    mobile: [],
    mobile_number: "",
    telephone_number: "",
  });

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    props.resetSupplierData();

    let mounted = true;

    mounted &&
      id &&
      showActions(`backend/suppliers/${id}`)
        .then((result) => result.success && props.editSupplier(result.data))
        .finally(() => (mounted = false));
  }, [id]);

  const saveSupplier = (e) => {
    e.preventDefault();

    let isSubmit = true;

    if (props.supplierData.mobile_number.length === 0) {
      isSubmit = false;
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile_number: "Please enter a number.",
        };
      });
    } else if (!pattern.test(props.supplierData.mobile_number)) {
      isSubmit = false;
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile_number: "Please enter a valid number.",
        };
      });
    }

    if (isSubmit) {
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile_number: "",
        };
      });

      setLoading(true);
      if (props.mode === "edit") {
        updateAction(`backend/suppliers/${id}`, props.supplierData)
          .then((res) => {
            if (res.success) {
              props.setMessage(SUCCESS, res.message);
              setTimeout(() => props.resetMessage(), 2000);
            } else {
              props.setMessage(ERROR, res.message);
              props.setErrors(res.errors);
              setTimeout(() => props.resetMessage(), 2000);
            }
          })
          .finally(() => setLoading(false));
      } else {
        saveAction(`backend/suppliers`, props.supplierData)
          .then((res) => {
            if (res.success) {
              props.setMessage(SUCCESS, res.message);
              setTimeout(() => props.resetSupplierData(), 2000);
            } else {
              props.setMessage(ERROR, res.message);
              props.setErrors(res.errors);
              setTimeout(() => props.resetMessage(), 2000);
            }
          })
          .finally(() => setLoading(false));
      }
    }
  };

  const mobileIsValidForAddField = (index, mobile) => {
    // console.log([...Array(5)]);
    // console.log([index, mobile]);

    if (mobile.length === 0) {
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile: [...Array(+index + 1)].map((item, indexMap) =>
            index === indexMap
              ? mobile.length === 0
                ? "Please enter a number."
                : "Please enter a valid number."
              : ""
          ),
        };
      });
      return false;
    } else if (pattern.test(mobile)) {
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile: [],
        };
      });
      return true;
    } else {
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          mobile: [...Array(+index + 1)].map((item, indexMap) =>
            index === indexMap
              ? mobile.length === 0
                ? "Please enter a number."
                : "Please enter a valid number."
              : ""
          ),
        };
      });
      return false;
    }
    return false;
  };

  console.log(clientErrors);
  return (
    <>
      {props.message.success && <Success message={props.message.success} />}
      {props.message.error && <Error message={props.message.error} />}

      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square"></i>
                    <h2>{props.mode === "edit" ? "Edit" : "Add"} Supplier</h2>

                    <Link legacyBehavior href={`/admin/supplier`}>
                      <a className="fbh-btn" title="List Suppliers">
                        <i className="icon-list2"></i>
                      </a>
                    </Link>
                  </div>

                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with
                      <span className="text-danger"> * </span>
                      are required input fields.
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <form>
                        <fieldset disabled={loading}>
                          <div className="row">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-header">
                                  <div className="fbh-title">
                                    <h6>Contacts</h6>
                                  </div>
                                </div>

                                <div className="card-body">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="table-responsive custom-table">
                                          <table className="table table-bordered table-hover">
                                            <thead className="thead-light">
                                              <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Designation</th>
                                                <th scope="col">Mobile</th>
                                                <th scope="col">Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {(
                                                props.supplierData.contacts ||
                                                []
                                              ).map((contact, index) => (
                                                <tr key={index}>
                                                  <td className="text-center">
                                                    <input
                                                      type="text"
                                                      title="Enter Name"
                                                      className={
                                                        isValue
                                                          ? contact.name
                                                              .length === 0
                                                            ? `error_border`
                                                            : ""
                                                          : ``
                                                      }
                                                      value={contact.name ?? ""}
                                                      name="name"
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        props.updateContact(
                                                          contact.id,
                                                          e
                                                        );
                                                      }}
                                                    />
                                                  </td>

                                                  <td className="text-center">
                                                    <input
                                                      type="text"
                                                      title="Enter Designation"
                                                      value={
                                                        contact.designation ??
                                                        ""
                                                      }
                                                      name="designation"
                                                      onChange={(e) => {
                                                        e.preventDefault();
                                                        props.updateContact(
                                                          contact.id,
                                                          e
                                                        );
                                                      }}
                                                    />
                                                  </td>

                                                  <td className="text-center">
                                                    <input
                                                      autoComplete="off"
                                                      type="text"
                                                      title="Enter Mobile"
                                                      className={
                                                        isValue
                                                          ? contact.mobile
                                                              .length === 0
                                                            ? `error_border`
                                                            : ""
                                                          : ``
                                                      }
                                                      value={contact.mobile}
                                                      name="mobile"
                                                      onChange={(e) => {
                                                        e.preventDefault();

                                                        props.updateContact(
                                                          contact.id,
                                                          e
                                                        );
                                                      }}
                                                    />

                                                    <small className="text-danger d-block">
                                                      {
                                                        clientErrors.mobile[
                                                          index
                                                        ]
                                                      }
                                                    </small>
                                                  </td>

                                                  <td className="text-center">
                                                    {props.supplierData
                                                      .contacts &&
                                                      props.supplierData
                                                        .contacts.length >
                                                        1 && (
                                                        <button
                                                          className="btn btn-danger mr-2"
                                                          onClick={(e) => {
                                                            e.preventDefault();
                                                            props.removeContact(
                                                              contact.id
                                                            );
                                                          }}
                                                        >
                                                          <i className="fas fa-trash" />
                                                        </button>
                                                      )}

                                                    {props.supplierData
                                                      .contacts &&
                                                      props.supplierData
                                                        .contacts.length -
                                                        1 ===
                                                        index && (
                                                        <button
                                                          className="btn btn-primary"
                                                          onClick={(e) => {
                                                            e.preventDefault();
                                                            if (
                                                              contact.name
                                                                .length !== 0 &&
                                                              mobileIsValidForAddField(
                                                                index,
                                                                contact.mobile
                                                              )
                                                            ) {
                                                              props.addSupplierContact();
                                                              setIsValue(false);
                                                            } else {
                                                              setIsValue(true);
                                                            }
                                                          }}
                                                        >
                                                          <i className="fas fa-plus" />
                                                        </button>
                                                      )}
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-12">
                              <div className="card">
                                <div className="card-header">
                                  <div className="fbh-title">
                                    <h6>Supplier Details</h6>
                                  </div>
                                </div>

                                <div className="card-body">
                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="name">
                                            Company or Supplier Name
                                            <span className="text-danger">
                                              {" "}
                                              *{" "}
                                            </span>
                                          </label>

                                          <input
                                            type="text"
                                            className={`form-control ${
                                              props.errors.name
                                                ? `is-invalid`
                                                : ``
                                            }`}
                                            autoComplete="off"
                                            id="name"
                                            name="name"
                                            value={
                                              props.supplierData.name ?? ""
                                            }
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Company or Supplier Name"
                                            required
                                          />

                                          <div
                                            className={
                                              props.errors.name
                                                ? `invalid-feedback`
                                                : ``
                                            }
                                          >
                                            {props.errors.name}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="address">
                                            Address
                                          </label>

                                          <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={
                                              props.supplierData.address ?? ""
                                            }
                                            onChange={(e) => {
                                              e.preventDefault();
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Address"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="telephone_number">
                                            Telephone Number
                                          </label>

                                          <input
                                            type="text"
                                            className={`form-control`}
                                            autoComplete="off"
                                            id="telephone_number"
                                            name="telephone_number"
                                            value={
                                              props.supplierData
                                                .telephone_number ?? ""
                                            }
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Telephone Number"
                                          />

                                          <p className="text-danger">
                                            {clientErrors.telephone_number}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="mobile_number">
                                            Mobile Number
                                            <span className="text-danger">
                                              {" "}
                                              *{" "}
                                            </span>
                                          </label>

                                          <input
                                            type="text"
                                            className={`form-control ${
                                              props.errors.mobile_number
                                                ? `is-invalid`
                                                : ``
                                            }`}
                                            id="mobile_number"
                                            name="mobile_number"
                                            value={
                                              props.supplierData
                                                .mobile_number ?? ""
                                            }
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Mobile Number"
                                          />

                                          <div
                                            className={
                                              props.errors.mobile_number
                                                ? `invalid-feedback`
                                                : ``
                                            }
                                          >
                                            {props.errors.mobile_number}
                                          </div>

                                          <p className="text-danger">
                                            {clientErrors.mobile_number}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="email">Email</label>

                                          <input
                                            type="text"
                                            className={`form-control ${
                                              props.errors.email
                                                ? `is-invalid`
                                                : ``
                                            }`}
                                            autoComplete="off"
                                            id="email"
                                            name="email"
                                            value={
                                              props.supplierData.email ?? ""
                                            }
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Email"
                                          />

                                          <div
                                            className={
                                              props.errors.email
                                                ? `invalid-feedback`
                                                : ``
                                            }
                                          >
                                            {props.errors.email}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <div className="form-group">
                                          <label htmlFor="web">Web</label>

                                          <input
                                            type="text"
                                            className={`form-control ${
                                              props.errors.web
                                                ? `is-invalid`
                                                : ``
                                            }`}
                                            id="web"
                                            name="web"
                                            value={props.supplierData.web ?? ""}
                                            onChange={(e) => {
                                              e.preventDefault();
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="https://example.com"
                                          />

                                          <div
                                            className={
                                              props.errors.web
                                                ? `invalid-feedback`
                                                : ``
                                            }
                                          >
                                            {props.errors.web}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-lg-12">
                                        <div className="form-group">
                                          <label htmlFor="email">
                                            Products
                                          </label>

                                          <input
                                            type="text"
                                            className="form-control"
                                            autoComplete="off"
                                            id="products"
                                            name="products"
                                            value={
                                              props.supplierData.products ?? ""
                                            }
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            placeholder="Supplier Products"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            checked={props.supplierData.active}
                                            onChange={(e) => {
                                              props.setSupplierData(e);
                                            }}
                                            name="active"
                                            id="active"
                                          />

                                          <label
                                            className="custom-control-label"
                                            htmlFor="active"
                                          >
                                            Active
                                          </label>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 text-right">
                                        <div className="form-group">
                                          <Link legacyBehavior href={"/admin/supplier"}>
                                            <a className="btn btn-info mr-2">
                                              <i className="icon-arrow-left-solid mr-1 mr-1" />
                                              Back
                                            </a>
                                          </Link>

                                          <button
                                            type="submit"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              props.resetSupplierData();
                                            }}
                                            className={`btn btn-danger mr-2 ${
                                              props.mode === "edit"
                                                ? `d-none`
                                                : ``
                                            }`}
                                          >
                                            <i className="fas fa-redo-alt mr-1" />
                                            Reset
                                          </button>

                                          <button
                                            disabled={loading}
                                            type="submit"
                                            onClick={saveSupplier}
                                            className={`btn btn-success mr-2`}
                                          >
                                            <i
                                              className={
                                                loading
                                                  ? `spinner-border spinner-border-sm mr-1`
                                                  : `icon-save-regular mr-1`
                                              }
                                            />
                                            {loading
                                              ? props.mode === "edit"
                                                ? "Updating..."
                                                : "Saving.."
                                              : props.mode === "edit"
                                              ? "Update"
                                              : "Save"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSupplierData: (e) =>
      dispatch({ type: SET_SUPPLIER_DATA, payload: { e } }),
    addSupplierContact: () => dispatch({ type: SET_SUPPLIER_CONTACTS }),
    removeContact: (id) =>
      dispatch({ type: REMOVE_CONTACT_ITEMS, payload: { id } }),
    updateContact: (id, e) =>
      dispatch({ type: UPDATE_SUPPLIER_CONTACT, payload: { id, e } }),
    resetSupplierData: () => dispatch({ type: RESET_SUPPLIER_DATA }),
    setErrors: (errors) =>
      dispatch({ type: SET_SUPPLIER_ERRORS, payload: { errors } }),
    setMessage: (message_type, message) =>
      dispatch({
        type: SET_SUPPLIER_MESSAGE,
        payload: { message_type, message },
      }),
    resetMessage: () => dispatch({ type: RESET_SUPPLIER_MESSAGE }),
    editSupplier: (supplier) =>
      dispatch({ type: EDIT_SUPPLIER, payload: { supplier } }),
  };
};

const mapStateToProps = (store) => {
  const { supplierData, message, errors } = store.supplierStore;
  return { supplierData, message, errors };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSupplier);
