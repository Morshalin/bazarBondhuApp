import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import {
  EDIT_LOCATION,
  RESET_ALL_DATA,
  RESET_LOCATION_MESSAGE,
  SET_LOCATION_DATA,
  SET_LOCATION_MESSAGE,
  SET_LOCATIONS_ERRORS,
} from "../../../../store/admin/actions/location/locationAction";
import {
  ERROR,
  saveAction,
  showActions,
  SUCCESS,
  updateAction,
} from "../../../../Helpers/Utils/Utils";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const AddLocation = (props) => {
  console.log("component add location");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    props.resetData();

    let mounted = true;

    mounted &&
      id &&
      showActions(`backend/locations/${id}`)
        .then((result) => result.success && props.editLocation(result.data))
        .finally(() => (mounted = false));
  }, [id]);

  const saveLocationData = (e) => {
    e.preventDefault();

    setLoading(true);

    if (props.mode === "edit") {
      updateAction(`backend/locations/${id}`, props.locationData)
        .then((res) => {
          if (res.success) {
            props.setLocationMessage(SUCCESS, res.message);
          } else {
            props.setLocationMessage(ERROR, res.message);
            props.setLocationErrors(res.errors);
          }
        })
        .finally(() => {
          setTimeout(() => props.resetLocationMessage(), 2000);
          setLoading(false);
        });
    } else {
      saveAction(`backend/locations`, props.locationData)
        .then((res) => {
          console.log(res);
          if (res.success) {
            props.setLocationMessage(SUCCESS, res.message);
            setTimeout(() => props.resetData(), 2000);
          } else {
            props.setLocationMessage(ERROR, res.message);
            props.setLocationErrors(res.errors);
            setTimeout(() => props.resetLocationMessage(), 2000);
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
                    <h2>{props.mode === "edit" ? "Edit" : "Add"} Location</h2>
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
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="name">
                                  Location Name
                                  <span className="text-danger"> * </span>
                                </label>

                                <input
                                  type="text"
                                  className={`form-control ${
                                    props.locationErrors.name
                                      ? `is-invalid`
                                      : ``
                                  }`}
                                  id="name"
                                  name="name"
                                  autoComplete="off"
                                  value={props.locationData.name}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    props.setLocationData(e);
                                  }}
                                  placeholder="Location Name"
                                  required
                                />

                                <div
                                  className={
                                    props.locationErrors.name
                                      ? `invalid-feedback`
                                      : ``
                                  }
                                >
                                  {props.locationErrors.name}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="sort_order">Sort Order</label>

                                <input
                                  type="number"
                                  className={`form-control`}
                                  id="sort_order"
                                  name="sort_order"
                                  autoComplete="off"
                                  value={props.locationData.sort_order}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    props.setLocationData(e);
                                  }}
                                  placeholder="Sort Order"
                                  required
                                />

                                {/* <div
                                  className={
                                    props.locationErrors.name
                                      ? `invalid-feedback`
                                      : ``
                                  }
                                >
                                  {props.locationErrors.name}
                                </div> */}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  checked={props.locationData.active}
                                  onChange={(e) => props.setLocationData(e)}
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
                                <Link legacyBehavior href={"/admin/location"}>
                                  <a className="btn btn-info mr-2">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    Back
                                  </a>
                                </Link>

                                <button
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    props.resetData();
                                  }}
                                  className="btn btn-danger mr-2"
                                >
                                  <i className="fas fa-redo-alt mr-1" />
                                  Reset
                                </button>

                                <button
                                  disabled={loading}
                                  type="submit"
                                  onClick={saveLocationData}
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
  let { locationData, message, locationErrors } = store.locationStore;
  return { locationData, message, locationErrors };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocationData: (e) =>
      dispatch({ type: SET_LOCATION_DATA, payload: { e } }),
    resetData: () => dispatch({ type: RESET_ALL_DATA }),
    setLocationErrors: (locationErrors) =>
      dispatch({ type: SET_LOCATIONS_ERRORS, payload: { locationErrors } }),
    setLocationMessage: (message_type, message) =>
      dispatch({
        type: SET_LOCATION_MESSAGE,
        payload: { message_type, message },
      }),
    resetLocationMessage: () => dispatch({ type: RESET_LOCATION_MESSAGE }),
    editLocation: (location) =>
      dispatch({ type: EDIT_LOCATION, payload: { location } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
