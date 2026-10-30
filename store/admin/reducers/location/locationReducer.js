import {
  CHANGE_AREA_STATUS,
  CHANGE_LOCATION_STATUS,
  EDIT_AREA,
  EDIT_LOCATION,
  REMOVE_AREA,
  REMOVE_LOCATION,
  RESET_ALL_DATA,
  RESET_AREA_MESSAGE,
  RESET_LOCATION_MESSAGE,
  SELECT_LOCATION,
  SET_AREA,
  SET_AREA_DATA,
  SET_AREA_ERRORS,
  SET_AREA_MESSAGE,
  SET_AREAS,
  SET_LOCATION_DATA,
  SET_LOCATION_MESSAGE,
  SET_LOCATIONS,
  SET_LOCATIONS_ERRORS,
} from "../../actions/location/locationAction";

let initialLocation = {
  name: "",
  sort_order: "",
  active: true,
};

let initialMessage = {
  success: "",
  error: "",
};

let initialLocationErrors = {
  name: "",
};

let initialArea = {
  location_id: "",
  name: "",
  shipping_price: "",
  active: true,
};

let initialAreaErrors = {
  location_id: "",
  name: "",
  shipping_price: "",
};

let initialState = {
  locationData: initialLocation,
  locationErrors: initialLocationErrors,
  areaData: initialArea,
  areaErrors: initialAreaErrors,
  message: initialMessage,
  locations: [],
  location: "",
  areas: [],
  area: "",
};

const locationReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_LOCATION_DATA: {
      return {
        ...state,
        locationData: {
          ...state.locationData,
          [payload.e.target.name]:
            payload.e.target.type === "checkbox"
              ? payload.e.target.checked
              : payload.e.target.value,
        },
        locationErrors: {
          ...state.locationErrors,
          [payload.e.target.name]: "",
        },
      };
    }

    case SET_LOCATION_MESSAGE: {
      return {
        ...state,
        message: {
          ...state.message,
          [payload.message_type]: payload.message,
        },
      };
    }

    case RESET_LOCATION_MESSAGE: {
      return {
        ...state,
        message: initialMessage,
      };
    }

    case SET_LOCATIONS_ERRORS: {
      return {
        ...state,
        locationErrors: payload.locationErrors,
      };
    }

    case SET_LOCATIONS: {
      let locations = payload.locations;

      return {
        ...state,
        locations: locations,
        location: locations.length > 0 ? locations[0] : "",
        areas: locations.length > 0 ? locations[0].areas : "",
      };
    }

    case SELECT_LOCATION: {
      console.log();
      return {
        ...state,
        location: payload.location,
        areas: payload.location.areas,
      };
    }

    case CHANGE_LOCATION_STATUS: {
      let location = payload.location;

      let tempLocations = state.locations.map((item) => {
        if (item.id === location.id) {
          return { ...item, status: location.status };
        }
        return item;
      });

      return {
        ...state,
        locations: tempLocations,
      };
    }

    case REMOVE_LOCATION: {
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== payload.id
        ),
      };
    }

    case EDIT_LOCATION: {
      let location = payload.location;
      return {
        ...state,
        locationData: {
          ...state.locationData,
          name: location.name,
          sort_order: location.sort_order,
          active: location.status === "Active" ? true : false,
        },
      };
    }

    case SET_AREAS: {
      let areas = payload.areas;
      return {
        ...state,
        areas: areas,
        area: areas.length > 0 ? areas[0] : "",
      };
    }

    case SET_AREA: {
      return {
        ...state,
        area: payload.area,
      };
    }

    case SET_AREA_DATA: {
      return {
        ...state,
        areaData: {
          ...state.areaData,
          [payload.e.target.name]:
            payload.e.target.type === "checkbox"
              ? payload.e.target.checked
              : payload.e.target.value,
        },
        areaErrors: {
          ...state.areaErrors,
          [payload.e.target.name]: "",
        },
      };
    }

    case SET_AREA_ERRORS: {
      return {
        ...state,
        areaErrors: payload.areaErrors,
      };
    }

    case SET_AREA_MESSAGE: {
      return {
        ...state,
        message: {
          ...state.message,
          [payload.message_type]: payload.message,
        },
      };
    }

    case RESET_AREA_MESSAGE: {
      return {
        ...state,
        message: initialMessage,
      };
    }

    case EDIT_AREA: {
      let area = payload.area;
      return {
        ...state,
        areaData: {
          ...state.areaData,
          name: area.name,
          shipping_price: area.shipping_price,
          location_id: area.location_id,
          active: area.status === "Active" ? true : false,
        },
      };
    }

    case CHANGE_AREA_STATUS: {
      let area = payload.area;

      return {
        ...state,
        areas: state.areas.map((item) =>
          item.id === area.id ? { ...item, status: area.status } : item
        ),
      };
    }

    case REMOVE_AREA: {
      return {
        ...state,
        areas: state.areas.filter((area) => area.id !== payload.id),
      };
    }

    case RESET_ALL_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};

export default locationReducer;
