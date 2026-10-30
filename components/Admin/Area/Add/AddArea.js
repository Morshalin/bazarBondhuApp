import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ERROR,
  getActions,
  saveAction,
  showActions,
  SUCCESS,
  updateAction,
} from "../../../../Helpers/Utils/Utils";
import { connect } from "react-redux";
import {
  EDIT_AREA,
  RESET_ALL_DATA,
  RESET_AREA_MESSAGE,
  SET_AREA_DATA,
  SET_AREA_ERRORS,
  SET_AREA_MESSAGE,
  SET_LOCATIONS,
} from "../../../../store/admin/actions/location/locationAction";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import { useRouter } from "next/router";
// import { SET_AUTHORIZATION } from "../../../../store/permission/actions/permissionActions";

const AddArea = (props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    let mounted = true;

    mounted &&
      getActions(`backend/locations`, false)
        .then((response) => {
          console.log(response);
          if (response.success) {
            props.setLocations(response.data);
            // props.set_authorization(response.config.permissions);
          }
        })
        .finally(() => {
          mounted = false;
        });

    id &&
      showActions(`areas/${id}`)
        .then((res) => {
          res.success && props.editArea(res.data);
        })
        .finally(() => (mounted = false));
  }, [id]);

  const saveArea = (e) => {
    e.preventDefault();

    setLoading(true);

    if (props.mode === "edit") {
      updateAction(`backend/areas/${id}`, props.areaData)
        .then((res) => {
          if (res.success) {
            props.setAreaMessage(SUCCESS, res.message);
          } else {
            props.setAreaMessage(ERROR, res.message);
            props.setAreaErrors(res.errors);
          }
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => props.resetAreaMessage(), 2000);
        });
    } else {
      saveAction(`backend/areas`, props.areaData)
        .then((res) => {
          if (res.success) {
            props.setAreaMessage(SUCCESS, res.message);
            setTimeout(() => props.resetAllData(), 2000);
          } else {
            props.setAreaMessage(ERROR, res.message);
            props.setAreaErrors(res.errors);
            setTimeout(() => props.resetAreaMessage(), 2000);
          }
        })
        .finally(() => setLoading(false));
    }
  };

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
                    <h2>{props.mode === "edit" ? "Edit" : "Add"} Area</h2>
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
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="location">
                                  Select Location
                                  <span className="text-danger"> * </span>
                                </label>

                                <select
                                  className={`custom-select ${
                                    props.areaErrors.location_id
                                      ? `is-invalid`
                                      : ``
                                  }`}
                                  id="location"
                                  required={true}
                                  name="location_id"
                                  onChange={(e) => {
                                    props.setAreaData(e);
                                  }}
                                  value={props.areaData.location_id ?? ""}
                                  aria-label="Location"
                                >
                                  <option value="">Choose Location..</option>
                                  {props.locations &&
                                    props.locations.length > 0 &&
                                    props.locations.map((location, index) => (
                                      <option value={location.id} key={index}>
                                        {location.name}
                                      </option>
                                    ))}
                                </select>

                                <div
                                  className={
                                    props.areaErrors.location_id
                                      ? `invalid-feedback`
                                      : ``
                                  }
                                >
                                  {props.areaErrors.location_id}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="shipping_price">
                                  Shipping Price
                                </label>

                                <input
                                  type="number"
                                  className="form-control"
                                  id="shipping_price"
                                  name="shipping_price"
                                  autoComplete="off"
                                  value={props.areaData.shipping_price}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    props.setAreaData(e);
                                  }}
                                  placeholder="Shipping Price"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="description">
                                  Area Name{" "}
                                  <span className="text-danger"> * </span>
                                </label>

                                <input
                                  type="text"
                                  className={`custom-select ${
                                    props.areaErrors.name ? `is-invalid` : ``
                                  }`}
                                  id="name"
                                  name="name"
                                  autoComplete="off"
                                  value={props.areaData.name}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    props.setAreaData(e);
                                  }}
                                  required={true}
                                  placeholder="Area Name"
                                />

                                <div
                                  className={
                                    props.areaErrors.name
                                      ? `invalid-feedback`
                                      : ``
                                  }
                                >
                                  {props.areaErrors.name}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  checked={props.areaData.active}
                                  onChange={(e) => {
                                    props.setAreaData(e);
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

                            <div className="col-lg-12 text-right">
                              <div className="form-group">
                                <Link legacyBehavior href={"/admin/area"}>
                                  <a className="btn btn-info mr-2">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    Back
                                  </a>
                                </Link>

                                <button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    props.resetAllData();
                                  }}
                                  className="btn btn-danger mr-2"
                                >
                                  <i className="fas fa-redo-alt mr-1" />
                                  Reset
                                </button>

                                <button
                                  disabled={loading}
                                  type="submit"
                                  onClick={saveArea}
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

const mapStateToProps = (store) => {
  let { locations, areaData, areaErrors, message } = store.locationStore;
  return { locations, areaData, areaErrors, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocations: (locations) =>
      dispatch({ type: SET_LOCATIONS, payload: { locations } }),
    setAreaData: (e) => dispatch({ type: SET_AREA_DATA, payload: { e } }),
    resetAllData: () => dispatch({ type: RESET_ALL_DATA }),
    setAreaErrors: (areaErrors) =>
      dispatch({ type: SET_AREA_ERRORS, payload: { areaErrors } }),
    setAreaMessage: (message_type, message) =>
      dispatch({ type: SET_AREA_MESSAGE, payload: { message_type, message } }),
    resetAreaMessage: () => dispatch({ type: RESET_AREA_MESSAGE }),
    editArea: (area) => dispatch({ type: EDIT_AREA, payload: { area } }),
    // set_authorization: (permissions) =>
    //   dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArea);
