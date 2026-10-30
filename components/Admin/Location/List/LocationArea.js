import React from "react";
import { connect } from "react-redux";
import {
  DELETE,
  deleteAction,
  ERROR,
  STATUS,
  statusChange,
  SUCCESS,
} from "../../../../Helpers/Utils/Utils";
import LocationAreaActions from "./LocationAreaActions";
import Link from "next/link";
import {
  CHANGE_AREA_STATUS,
  REMOVE_AREA,
  RESET_AREA_MESSAGE,
  SET_AREA_MESSAGE,
} from "../../../../store/admin/actions/location/locationAction";

const LocationArea = (props) => {
  console.log("component location areas");

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
        console.log(payload.index);

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
      <div className="custom-card-box mb-3">
        <div className="custom-card-box-header">
          <div className="fbh-title">
            <i className="fas fa-map-marker-alt"></i>
            <h2>Location Area</h2>
            <Link legacyBehavior href={`/admin/area/add`}>
              <a className="fbh-btn" title="Add Area">
                <i className="icon-plus-square-regular"></i>
              </a>
            </Link>
          </div>
        </div>
        <div className="custom-card-box-content p-md-3 p-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive custom-table custom-hight-320">
                <table className="table table-bordered table-hover mb-0 table-order-details">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Name</th>
                      <th scope="col">Shipping Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.areas && props.areas.length > 0 ? (
                      props.areas.map((area, index) => (
                        <tr key={index} className="text-center">
                          <td scope="row">{index + 1}</td>

                          <td className="text-center">{area.name}</td>
                          <td className="text-center">{area.shipping_price}</td>

                          <td className="text-center">{area.status}</td>

                          <td className="text-center text-nowrap">
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
                        <td colSpan="5" className="text-center">
                          No Area Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  let { areas, area, message } = store.locationStore;
  return { areas, area, message };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAreaMessage: (message_type, message) =>
      dispatch({ type: SET_AREA_MESSAGE, payload: { message_type, message } }),
    resetAreaMessage: () => dispatch({ type: RESET_AREA_MESSAGE }),
    changeAreaStatus: (area) =>
      dispatch({ type: CHANGE_AREA_STATUS, payload: { area } }),
    removeArea: (id) => dispatch({ type: REMOVE_AREA, payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationArea);
