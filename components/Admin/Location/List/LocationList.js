import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DELETE,
  deleteAction,
  ERROR,
  getActions,
  options,
  STATUS,
  statusChange,
  SUCCESS,
} from "../../../../Helpers/Utils/Utils";
import LocationHeader from "./LocationHeader";
import { connect } from "react-redux";
import {
  CHANGE_LOCATION_STATUS,
  REMOVE_LOCATION,
  RESET_LOCATION_MESSAGE,
  SELECT_LOCATION,
  SET_LOCATION_MESSAGE,
  SET_LOCATIONS,
} from "../../../../store/admin/actions/location/locationAction";
import Loader from "react-loader";
import LocationActions from "./LocationActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import ReactPaginate from "react-paginate";

const LocationList = (props) => {
  console.log("component location  list");
  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    getActions(
      `backend/get-all-locations?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
      true
    )
      .then((response) => {
        if (mounted && response) {
          setMeta(response.meta);
          props.setLocations(response.data);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, [show, keywords, page, column, orderBy]);

  const actionsLocation = (actions) => {
    let { type, payload } = actions;
    switch (type) {
      case DELETE: {
        deleteAction(`backend/locations/${props.locations[payload.index].id}`)
          .then((res) => {
            if (res.success) {
              props.removeLocation(props.locations[payload.index].id);
              props.setLocationMessage(SUCCESS, res.message);
            } else {
              props.setLocationMessage(ERROR, res.message);
            }
          })
          .finally(() => {
            resetChanges();
          });

        break;
      }

      case STATUS: {
        statusChange(
          `backend/locations/location-active-status/${
            props.locations[payload.index].id
          }`
        )
          .then((result) => {
            if (result.success) {
              props.changeLocationStatus(result.data);
              props.setLocationMessage(SUCCESS, result.message);
            } else {
              props.setLocationMessage(ERROR, result.message);
            }
          })
          .finally(() => {
            resetChanges();
          });

        break;
      }

      default:
        break;
    }
  };

  const resetChanges = () => {
    setTimeout(() => {
      props.resetLocationMessage();
    }, 2000);
  };

  return (
    <>
      {props.message.success && <Success message={props.message.success} />}
      {props.message.error && <Error message={props.message.error} />}

      <div className="col-md-5 mb-3">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2>Location List</h2>
              <Link legacyBehavior href={"/admin/location/add"}>
                <a className="fbh-btn" title="Add Location">
                  <i className="icon-plus-square-regular"></i>
                </a>
              </Link>
            </div>
          </div>

          <div className="custom-card-box-content p-md-3 p-2">
            <div className="row table-top-option mb-md-3 mb-2">
              <div className="col-6">
                <div className="showing-table-row">
                  <label className="">Show</label>
                  <select
                    className="custom-select"
                    defaultValue={`10`}
                    onChange={(e) => {
                      setMeta("");
                      setShow(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="table-search">
                  <label className="">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here ..."
                    onChange={(e) => {
                      setMeta("");
                      setTimeout(() => {
                        setKeywords(e.target.value);
                        setPage(1);
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive custom-table custom-hight-500">
                  <Loader loaded={!!meta} options={options} className="spinner">
                    <table className="table table-bordered table-hover mb-0 carsour-pointer">
                      <thead className="thead-light">
                        <LocationHeader
                          setColumn={setColumn}
                          setOrderBy={setOrderBy}
                          column={column}
                          orderBy={orderBy}
                        />
                      </thead>
                      <tbody>
                        {props.locations && props.locations.length > 0 ? (
                          props.locations.map((location, index) => (
                            <tr
                              onClick={(e) => {
                                e.preventDefault();
                                props.selectLocation(location);
                              }}
                              key={index}
                              className={`text-center ${
                                location.id === props.location.id
                                  ? `bg-warning`
                                  : ``
                              }`}
                            >
                              <td className="nowrap text-center ">
                                {meta.from ? index + meta.from : ""}
                              </td>

                              <td className="nowrap text-center">
                                {location.name}
                              </td>

                              <td className="text-center">
                                {location.sort_order}
                              </td>
                              <td className="text-center">{location.status}</td>
                              <td className="text-center">
                                <LocationActions
                                  locationIndex={index}
                                  location={location}
                                  actions={actionsLocation}
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Location Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Loader>
                </div>
              </div>
            </div>
          </div>

          {meta && (
            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center"
            >
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={meta.last_page}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={(pageNumber) => {
                  setPage(pageNumber.selected + 1);
                }}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                activeClassName={"active"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  let { locations, location, message } = store.locationStore;
  return { locations, location, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocations: (locations) =>
      dispatch({ type: SET_LOCATIONS, payload: { locations } }),
    selectLocation: (location) =>
      dispatch({ type: SELECT_LOCATION, payload: { location } }),
    setLocationMessage: (message_type, message) =>
      dispatch({
        type: SET_LOCATION_MESSAGE,
        payload: { message_type, message },
      }),
    resetLocationMessage: () => dispatch({ type: RESET_LOCATION_MESSAGE }),
    changeLocationStatus: (location) =>
      dispatch({ type: CHANGE_LOCATION_STATUS, payload: { location } }),
    removeLocation: (id) =>
      dispatch({ type: REMOVE_LOCATION, payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
