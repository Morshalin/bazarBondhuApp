import {
  CHANGE_AVATAR_IMAGE,
  CHANGE_USER_STATUS,
  EDIT_USER,
  REMOVE_USER,
  RESET_USER_DATA,
  RESET_USER_MESSAGE,
  SET_USER,
  SET_USER_DATA,
  SET_USER_ERRORS,
  SET_USER_LIST,
  SET_USER_MESSAGE,
  SET_USER_ROLES,
} from "../../actions/user/userActions";

let initialUserData = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  phone: "",
  address: "",
  roles: "",
  priority: 0,
  avatar: "",
  comapny_id: [],
  password: "",
  password_confirmation: "",
  active: true,
};

let initialErrors = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  address: "",
  phone: "",
  roles: "",
  avatar: "",
  avatarImage: "",
  password: "",
};

let initialMessage = { success: "", error: "" };

let initialState = {
  userList: "",
  user: "",
  roles: "",
  userData: initialUserData,
  message: initialMessage,
  errors: initialErrors,
};

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_USER_LIST: {
      let userList = payload.userList;

      return {
        ...state,
        userList: userList,
        user: userList?.length > 0 ? userList[0] : "",
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: payload.user,
      };
    }

    case SET_USER_DATA: {
      let name = payload.e.target.name;
      let value =
        payload.e.target.type === "checkbox"
          ? payload.e.target.checked
          : payload.e.target.type === "file"
          ? payload.e.target.files[0]
          : payload.e.target.value;
      if (name === "phone") {
        const pattern = new RegExp(/^[0-9\b]+$/);
        if (value !== "" && !pattern.test(value)) {
          value = state.userData.phone;
        }
      }
      return {
        ...state,
        userData: {
          ...state.userData,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: "",
        },
      };
    }

    case CHANGE_AVATAR_IMAGE: {
      return {
        ...state,
        userData: {
          ...state.userData,
          avatarImage: URL.createObjectURL(payload.avatarImage),
        },
      };
    }

    case SET_USER_MESSAGE: {
      return {
        ...state,
        message: {
          ...state.message,
          [payload.message_type]: payload.message,
        },
      };
    }

    case SET_USER_ERRORS: {
      return {
        ...state,
        errors: payload.errors,
      };
    }

    case RESET_USER_DATA: {
      document.getElementById("profile_image").innerHTML =
        "Eg. jpg, png, svg, jpeg";

      return initialState;
    }

    case RESET_USER_MESSAGE: {
      return {
        ...state,
        message: initialMessage,
      };
    }

    case SET_USER_ROLES: {
      return {
        ...state,
        roles: payload.roles,
      };
    }

    case CHANGE_USER_STATUS: {
      let user = payload.user;
      let tempUserList = state.userList.map((item) => {
        if (item.id === user.id) {
          return { ...user, user };
        }

        return item;
      });

      return {
        ...state,
        userList: tempUserList,
      };
    }

    case REMOVE_USER: {
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== payload.id),
      };
    }

    case EDIT_USER: {
      let user = payload.user;

      return {
        ...state,
        userData: {
          ...state.userData,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          roles: user.roles ? user.roles.id : "",
          priority: user.roles ? user.roles.priority : 0,
          comapny_id: user.comapny_id,
          avatarImage: user.image,
          active: user.status === "Active",
        },
      };
    }

    default:
      return state;
  }
};

export default userReducer;
