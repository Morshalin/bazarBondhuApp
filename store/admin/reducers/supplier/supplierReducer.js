import uuid from "react-uuid";

import {
  CHANGE_SUPPLIER_STATUS,
  EDIT_SUPPLIER,
  REMOVE_CONTACT_ITEMS,
  REMOVE_SUPPLIER,
  RESET_SUPPLIER_DATA,
  RESET_SUPPLIER_MESSAGE,
  SET_SUPPLIER,
  SET_SUPPLIER_CONTACTS,
  SET_SUPPLIER_DATA,
  SET_SUPPLIER_ERRORS,
  SET_SUPPLIER_LIST,
  SET_SUPPLIER_MESSAGE,
  UPDATE_SUPPLIER_CONTACT,
} from "../../actions/supplier/supplierActions";

let initialContacts = {
  id: uuid(),
  name: "",
  designation: "",
  mobile: "",
};

let initialSupplierData = {
  name: "",
  address: "",
  telephone_number: "",
  mobile_number: "",
  email: "",
  products: "",
  web: "",
  contacts: [initialContacts],
  active: true,
};

let initialMessage = {
  success: "",
  error: "",
};

let initialErrors = {
  name: "",
  email: "",
  contacts: "",
  web: "",
  mobile_number: "",
};

let initialState = {
  supplierData: initialSupplierData,
  suppliers: [],
  supplier: "",
  errors: initialErrors,
  message: initialMessage,
};

const supplierReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_SUPPLIER_DATA: {
      return {
        ...state,
        supplierData: {
          ...state.supplierData,
          [payload.e.target.name]:
            payload.e.target.type === "checkbox"
              ? payload.e.target.checked
              : payload.e.target.value,
        },
        errors: {
          ...state.errors,
          [payload.e.target.name]: "",
        },
      };
    }

    case SET_SUPPLIER_CONTACTS: {
      return {
        ...state,
        supplierData: {
          ...state.supplierData,
          contacts: [
            ...state.supplierData.contacts,
            { ...initialContacts, id: uuid() },
          ],
        },
        errors: {
          ...state.errors,
          contacts: "",
        },
      };
    }

    case SET_SUPPLIER_ERRORS: {
      return {
        ...state,
        errors: payload.errors,
      };
    }

    case SET_SUPPLIER_MESSAGE: {
      return {
        ...state,
        message: {
          ...state.message,
          [payload.message_type]: payload.message,
        },
      };
    }

    case RESET_SUPPLIER_MESSAGE: {
      return {
        ...state,
        message: initialMessage,
      };
    }

    case UPDATE_SUPPLIER_CONTACT: {
      let contacts = state.supplierData.contacts.map((contact) => {
        if (contact.id === payload.id) {
          return {
            ...contact,
            [payload.e.target.name]: payload.e.target.value,
          };
        }
        return contact;
      });

      return {
        ...state,
        supplierData: {
          ...state.supplierData,
          contacts: contacts,
        },
      };
    }

    case REMOVE_CONTACT_ITEMS: {
      return {
        ...state,
        supplierData: {
          ...state.supplierData,
          contacts: state.supplierData.contacts.filter(
            (contact) => contact.id !== payload.id
          ),
        },
      };
    }

    case SET_SUPPLIER_LIST: {
      let suppliers = payload.suppliers;

      return {
        ...state,
        suppliers: suppliers,
        supplier: suppliers.length > 0 ? suppliers[0] : "",
      };
    }

    case SET_SUPPLIER: {
      return {
        ...state,
        supplier: payload.supplier,
      };
    }

    case EDIT_SUPPLIER: {
      let supplier = payload.supplier;
      return {
        ...state,
        supplierData: {
          ...state.supplierData,
          name: supplier.name,
          address: supplier.address,
          telephone_number: supplier.telephone_number,
          mobile_number: supplier.mobile_number,
          email: supplier.email,
          products: supplier.products,
          web: supplier.web,
          contacts: supplier.contacts,
          active: supplier.active === "Active" ? true : false,
        },
      };
    }

    case REMOVE_SUPPLIER: {
      let suppliers = state.suppliers.filter(
        (supplier) => supplier.id !== payload.id
      );
      return {
        ...state,
        suppliers: suppliers,
      };
    }

    case CHANGE_SUPPLIER_STATUS: {
      let supplier = payload.supplier;
      let suppliers = state.suppliers.map((item) => {
        if (item.id === supplier.id) {
          return { ...item, active: supplier.active };
        }
        return item;
      });

      return {
        ...state,
        suppliers: suppliers,
      };
    }

    case RESET_SUPPLIER_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};

export default supplierReducer;
