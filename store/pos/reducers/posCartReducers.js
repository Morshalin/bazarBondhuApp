import {
  CLEAR_QUICK_CASH_NOTE,
  POS_ADD_TO_CART,
  POS_CANCEL_ORDER,
  POS_CHANGE_QTY,
  POS_CHECKOUT,
  POS_DECREASE,
  POS_INCREASE,
  POS_REMOVE,
  POS_SET_CUSTOMER,
  SET_ECOMMERCE_INFORMATION,
  SET_ORDER_DATE,
  SET_ORDER_NUMBER,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_NOTE,
  SET_PAYMENT_STATUS,
  SET_POS_AMOUNT,
  SET_POS_DISCOUNT,
  SET_POS_SHIPPING,
  SET_QUICK_CASH_NOTE,
  SET_SEND_INVOICE_LINK,
  SET_STAFF_NOTE,
  SET_WALLET_ADJUSTMENT,
  POS_ADD_CUSTOM_PRODUCT,
  POS_SET_CUSTOM_PRODUCT_PRICE,
  SET_POS_ACCOUNT_ID,
  SET_POS_DUE_AMOUNT,
  SET_POS_SALE_TYPE,
} from "../actions/posCartActions";
import PosStorage from "../../../Helpers/Pos/PosStorage";
import { v4 as uuidv4 } from "uuid";

let quick_cash_note = [
  {
    note_amount: 5,
    counter: 0,
  },
  {
    note_amount: 10,
    counter: 0,
  },

  {
    note_amount: 20,
    counter: 0,
  },
  {
    note_amount: 50,
    counter: 0,
  },

  {
    note_amount: 100,
    counter: 0,
  },
  {
    note_amount: 200,
    counter: 0,
  },

  {
    note_amount: 500,
    counter: 0,
  },
  {
    note_amount: 1000,
    counter: 0,
  },
];
let initialState = {
  cart: [],
  account_id: null,
  amount: 0,
  sale_type: "",
  shop_id: 2,
  user_id: "",
  wallet_balance: 0,
  order_number: "",
  order_date: new Date().toISOString().slice(0, 10),
  payment_method: "",
  payment_status: "",
  staff_note: "",
  payment_note: "",
  quick_cash_amount: 0.0,
  quick_cash_note,
  pos_amount: 0,
  change_return: 0,
  delivery_charge: 0,
  discount: 0,
  coupon_discount: 0,
  grand_total: 0,
  send_invoice_link: false,
  wallet_adjustment: false,
  orderInformation: "",
};

const posCartReducers = (state = initialState, action) => {
  switch (action.type) {
    case POS_SET_CUSTOMER: {
      let user_id = action.payload.user_id;
      let wallet_balance = action.payload.wallet_balance
        ? parseFloat(action.payload.wallet_balance)
        : 0.0;

      return {
        ...state,
        user_id,
        wallet_balance,
      };
    }

    case SET_ORDER_DATE: {
      let order_date = action.payload.order_date;

      return {
        ...state,
        order_date,
      };
    }

    case SET_ORDER_NUMBER: {
      let order_number = action.payload.order_number;

      return {
        ...state,
        order_number,
      };
    }
    case SET_ECOMMERCE_INFORMATION: {
      let orderInformation = action.payload.orderInformation;

      return {
        ...state,
        orderInformation,
      };
    }
    case SET_WALLET_ADJUSTMENT: {
      let wallet_adjustment = action.payload.wallet_adjustment;

      return {
        ...state,
        wallet_adjustment,
      };
    }
    case SET_SEND_INVOICE_LINK: {
      let send_invoice_link = action.payload.send_invoice_link;

      return {
        ...state,
        send_invoice_link,
      };
    }
    case POS_ADD_TO_CART: {
      if (!action.payload.product.status) {
        alert("Product status Inactive");
        return state;
      }
      if (!action.payload.product.pos_sale_status) {
        alert("Product POS sell status Inactive");
        return state;
      }
      if (action.payload.product.stock > 0) {
        let id = action.payload.product.id;
        let name = action.payload.product.name;
        let image = action.payload.product.feature_image;
        let unit_price = action.payload.product.selling_price;
        let stock_quantity = action.payload.product.stock;
        let weight = action.payload.product.weight;
        let sale_unit = action.payload.product.sale_unit;
        let product_discount = action.payload.product.product_discount;
        let quantity = stock_quantity >= 1 ? 1 : stock_quantity;
        let vat = action.payload.product.product_vat;
        let type = "general";

        let product = {
          id,
          name,
          image,
          unit_price,
          product_discount,
          stock_quantity,
          weight,
          sale_unit,
          quantity,
          vat,
          type,
        };

        let itemExist = false;

        let tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === product.id) {
            itemExist = true;
            if (cartItem.stock_quantity > cartItem.quantity) {
              let quantity = cartItem.quantity + 1;
              cartItem = { ...cartItem, quantity };
            } else {
              alert("Out of Stock");
            }
          }
          return cartItem;
        });

        let stateData = itemExist
          ? {
              ...state,
              cart: tempCart,
            }
          : {
              ...state,
              cart: [...state.cart, product],
            };

        return stateData;
      } else {
        alert("Out of Stock");
        return state;
      }
    }

    case POS_ADD_CUSTOM_PRODUCT: {
      let id = uuidv4();
      let name = action.payload.product_name;
      let image = process.env.base_url + "/images/image_not_found.png";
      let unit_price = 0;
      let stock_quantity = "";
      let weight = "";
      let sale_unit = "";
      let product_discount = 0;
      let quantity = 1;
      let vat = 0;
      let type = "custom";

      let product = {
        id,
        name,
        image,
        unit_price,
        product_discount,
        stock_quantity,
        weight,
        sale_unit,
        quantity,
        vat,
        type,
      };

      let stateData = {
        ...state,
        cart: [...state.cart, product],
      };

      return stateData;
    }

    case POS_SET_CUSTOM_PRODUCT_PRICE: {
      let id = action.payload.id;
      let unit_price =
        action.payload.unit_price >= 0 ? action.payload.unit_price : 0;
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          if (cartItem.type === "custom") {
            cartItem = { ...cartItem, unit_price };
          } else {
            alert("Price change not Allowed");
          }
        }
        return cartItem;
      });

      let stateData = {
        ...state,
        cart: tempCart,
      };
      return stateData;
    }

    case POS_INCREASE: {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (cartItem.type === "custom") {
            let quantity = cartItem.quantity + 1;
            cartItem = { ...cartItem, quantity };
          } else if (cartItem.stock_quantity > cartItem.quantity) {
            let quantity = parseFloat(cartItem.quantity) + 1;
            cartItem = { ...cartItem, quantity };
          } else {
            alert("Out of Stock");
          }
        }
        return cartItem;
      });

      let stateData = {
        ...state,
        cart: tempCart,
      };
      return stateData;
    }
    case POS_DECREASE: {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          let quantity = cartItem.quantity - 1 > 0 ? cartItem.quantity - 1 : 1;
          cartItem = { ...cartItem, quantity };
        }
        return cartItem;
      });

      let stateData = {
        ...state,
        cart: tempCart,
      };

      return stateData;
    }
    case POS_CHANGE_QTY: {
      let id = action.payload.id;
      let quantity = action.payload.quantity >= 0 ? action.payload.quantity : 0;
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          if (cartItem.type === "custom") {
            cartItem = { ...cartItem, quantity };
          } else if (cartItem.stock_quantity >= quantity) {
            cartItem = { ...cartItem, quantity };
          } else {
            alert("Out of stock");
          }
        }
        return cartItem;
      });

      let stateData = {
        ...state,
        cart: tempCart,
      };
      return stateData;
    }

    case POS_REMOVE: {
      let stateData = {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

      return stateData;
    }

    case SET_POS_SHIPPING: {
      let delivery_charge =
        action.payload.delivery_charge >= 0
          ? parseFloat(action.payload.delivery_charge)
          : 0.0;
      let stateDate = {
        ...state,
        delivery_charge,
      };
      return stateDate;
    }

    case SET_POS_DISCOUNT: {
      let discount =
        action.payload.discount >= 0 ? action.payload.discount : 0.0;
      let stateDate = {
        ...state,
        discount,
      };
      return stateDate;
    }

    case SET_POS_AMOUNT: {
      let pos_amount =
        action.payload.pos_amount >= 0 ? action.payload.pos_amount : 0.0;

      let stateDate = {
        ...state,
        pos_amount,
      };
      return stateDate;
    }

    case SET_PAYMENT_METHOD: {
      let stateDate = {
        ...state,
        payment_method: action.payload.payment_method,
      };

      return stateDate;
    }

    case SET_PAYMENT_STATUS: {
      let stateDate = {
        ...state,
        payment_status: action.payload.payment_status,
      };
      return stateDate;
    }

    case SET_STAFF_NOTE: {
      let stateDate = {
        ...state,
        staff_note: action.payload.staff_note,
      };

      return stateDate;
    }

    case SET_PAYMENT_NOTE: {
      let stateDate = {
        ...state,
        payment_note: action.payload.payment_note,
      };

      return stateDate;
    }

    case CLEAR_QUICK_CASH_NOTE: {
      let stateDate = {
        ...state,
        quick_cash_note,
        pos_amount: 0,
        change_return: 0,
      };

      return stateDate;
    }

    case SET_QUICK_CASH_NOTE: {
      let note_amount = action.payload.note_amount;
      let counter = 1;
      let cash_note = {
        note_amount,
        counter,
      };
      let itemExist = false;
      let pos_amount = 0;
      let tempNote = state.quick_cash_note.map((quick_note) => {
        pos_amount = pos_amount + quick_note.note_amount * quick_note.counter;

        if (quick_note.note_amount === note_amount) {
          pos_amount = pos_amount + note_amount;
          itemExist = true;
          quick_note = { ...quick_note, counter: quick_note.counter + 1 };
        }
        return quick_note;
      });

      let stateData = itemExist
        ? {
            ...state,
            quick_cash_note: tempNote,
            pos_amount,
            change_return: state.grand_total - pos_amount,
          }
        : {
            ...state,
            quick_cash_note: [...state.quick_cash_note, cash_note],
            pos_amount,
            change_return: state.grand_total - pos_amount,
          };

      return stateData;
    }

    case POS_CANCEL_ORDER: {
      // document.getElementById("search_order").value = "";
      return initialState;
    }
    case POS_CHECKOUT: {
      // document.getElementById("search_order").value = "";
      return initialState;
    }
    case SET_POS_ACCOUNT_ID: {
      return {
        ...state,
        account_id: action.payload.account_id,
      };
    }

    case SET_POS_DUE_AMOUNT: {
      return {
        ...state,
        amount: action.payload.amount,
      };
    }
    case SET_POS_SALE_TYPE: {
      return {
        ...state,
        sale_type: action.payload.sale_type,
      };
    }

    default:
      return state;
  }
};

export default posCartReducers;
