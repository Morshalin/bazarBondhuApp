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
import AreaHeader from "./AreaHeader";
import Loader from "react-loader";
import { connect } from "react-redux";
import {
  CHANGE_AREA_STATUS,
  REMOVE_AREA,
  RESET_AREA_MESSAGE,
  SET_AREA,
  SET_AREA_MESSAGE,
  SET_AREAS,
} from "../../../../store/admin/actions/location/locationAction";
import LocationAreaActions from "../../Location/List/LocationAreaActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import ReactPaginate from "react-paginate";
// import { SET_AUTHORIZATION } from "../../../../store/permission/actions/permissionActions";

const AreaList = (props) => {
  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let mounted = true;

    getActions(
      `backend/getAllAreas?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
      true
    )
      .then((response) => {
        if (mounted && response) {
          setMeta(response.meta);
          props.setAreas(response.data);
          // props.set_authorization(response.config.permissions);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, [show, keywords, page, column, orderBy]);

  const actionsArea = (actions) => {
    let { type, payload } = actions;
    switch (type) {
      case DELETE: {
        deleteAction(`backend/areas/${props.areas[payload.index].id}`)
          .then((res) => {
            if (res.success) {
              props.removeArea(props.areas[payload.index].id);
              props.setAreaMessage(SUCCESS, res.message);
            } else {
              props.setAreaMessage(ERROR, res.message);
            }
          })
          .finally(() => {
            resetChanges();
          });

        break;
      }

      case STATUS: {
        statusChange(
          `backend/areas/area-active-status/${props.areas[payload.index].id}`
        )
          .then((result) => {
            if (result.success) {
              props.changeAreaStatus(result.data);
              props.setAreaMessage(SUCCESS, result.message);
            } else {
              props.setAreaMessage(ERROR, result.message);
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
      props.resetAreaMessage();
    }, 2000);
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
                    <i className="icon-list2" />
                    <h2>Area List</h2>
                    <Link legacyBehavior href={`/admin/area/add`}>
                      <a className="fbh-btn" title="Add Area">
                        <i className="icon-plus-square-regular"></i>
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row table-top-option mb-3">
                    <div className="col-sm-6">
                      <div className="showing-table-row">
                        <label className="">Show</label>
                        <select
                          className="custom-select"
                          value={show ?? 10}
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
                    <div className="col-sm-6">
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
                      <div className="table-responsive custom-table">
                        <Loader
                          loaded={!!meta}
                          options={options}
                          className="spinner"
                        >
                          <table className="table table-bordered table-hover table-striped carsour-pointer">
                            <thead className="thead-light">
                              <AreaHeader
                                setColumn={setColumn}
                                setOrderBy={setOrderBy}
                                column={column}
                                orderBy={orderBy}
                              />
                            </thead>

                            <tbody>
                              {props.areas && props.areas.length > 0 ? (
                                props.areas.map((area, index) => (
                                  <tr
                                    key={index}
                                    onClick={() => {
                                      props.setArea(area);
                                    }}
                                    className={`text-center ${
                                      area.id === props.area.id
                                        ? `bg-warning`
                                        : ``
                                    }`}
                                  >
                                    <td scope="row">
                                      {meta.from ? index + meta.from : ""}
                                    </td>
                                    <td className="nowrap">{area.name}</td>
                                    <td className="nowrap">
                                      {area.shipping_price}
                                    </td>
                                    <td className="nowrap">{area.location}</td>

                                    <td className="text-center">
                                      {area.status}
                                    </td>
                                    <td className="text-center">
                                      <LocationAreaActions
                                        areaIndex={index}
                                        area={area}
                                        actions={actionsArea}
                                      />
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    No Area Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </Loader>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (store) => {
  let { areas, area, message } = store.locationStore;
  return { areas, area, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAreas: (areas) => dispatch({ type: SET_AREAS, payload: { areas } }),
    setArea: (area) => dispatch({ type: SET_AREA, payload: { area } }),
    setAreaMessage: (message_type, message) =>
      dispatch({ type: SET_AREA_MESSAGE, payload: { message_type, message } }),
    resetAreaMessage: () => dispatch({ type: RESET_AREA_MESSAGE }),
    changeAreaStatus: (area) =>
      dispatch({ type: CHANGE_AREA_STATUS, payload: { area } }),
    removeArea: (id) => dispatch({ type: REMOVE_AREA, payload: { id } }),
    // set_authorization: (permissions) =>
    //   dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaList);
