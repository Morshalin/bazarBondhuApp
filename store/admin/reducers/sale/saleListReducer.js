import {
  SET_SALE,
  SET_SALE_ITEM,
  SET_SALE_LIST,
  SET_SALE_RETURN_ERRORS,
  SET_SALE_RETURN_NOTE,
  SET_SALE_RETURN_QUANTITY,
  UPDATE_ORDER_STATUS,
  UPDATE_SALE,
} from "../../actions/sale/saleListAction";

let initialErrors = {
  return_quantity: "",
};

let initialSaleItem = {
  product_id: "",
  sale_id: "",
  product_sale_id: "",
  selling_quantity: "",
  return_quantity: "",
  selling_price: "",
  return_type: "Sale Return",
  sale_type: "",
  note: "",
  name: "",
  image: "",
  customer_id: "",
  customer_name: "",
};
let initialState = {
  saleList: "",
  sale: "",
  saleItem: initialSaleItem,
  errors: initialErrors,
};

const saleListReducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case SET_SALE_LIST: {
      let saleList = payload.saleList;

      return {
        ...state,
        saleList: saleList,
        sale: saleList && saleList.length > 0 ? saleList[0] : "",
      };
    }

    case SET_SALE: {
      let sale = payload.sale;

      return {
        ...state,
        sale: sale,
      };
    }

    case UPDATE_ORDER_STATUS: {
      let newSale = payload.sale;
      let tempSaleList = state.saleList.map((sale) => {
        if (sale.id === newSale.id) {
          let saleHistory = newSale.saleHistory;
          return {
            ...sale,
            order_status: newSale.order_status,
            saleHistory: saleHistory,
          };
        }

        return sale;
      });
      return {
        ...state,
        sale: newSale,
        saleList: tempSaleList,
      };
    }

    case SET_SALE_ITEM: {
      let product_id = payload?.saleItem?.productDetails?.id;
      let sale_id = payload?.saleItem?.sale_id;
      let product_sale_id = payload?.saleItem?.id;
      let selling_quantity = payload?.saleItem?.quantity;
      let return_quantity = "";
      let selling_price = payload?.saleItem?.unit_price;
      let return_type = state?.saleItem?.return_type;
      let sale_type = payload?.saleItem?.sale_type;
      let note = "";
      let name = payload?.saleItem?.productDetails?.name;
      let image = payload?.saleItem?.productDetails?.feature_image;
      let customer_id = payload?.saleItem?.customer_id;
      let customer_name = payload?.saleItem?.customer_name;

      let saleItem = {
        product_id,
        sale_id,
        product_sale_id,
        selling_quantity,
        return_quantity,
        selling_price,
        return_type,
        sale_type,
        note,
        name,
        image,
        customer_id,
        customer_name,
      };

      return {
        ...state,
        saleItem: saleItem,
      };
    }

    case SET_SALE_RETURN_QUANTITY: {
      return {
        ...state,
        saleItem: {
          ...state.saleItem,
          return_quantity: payload?.return_quantity
            ? parseFloat(payload?.return_quantity)
            : "",
        },
        errors: initialErrors,
      };
    }

    case SET_SALE_RETURN_NOTE: {
      return {
        ...state,
        saleItem: {
          ...state.saleItem,
          note: payload.note,
        },
      };
    }

    case SET_SALE_RETURN_ERRORS: {
      return {
        ...state,
        errors: payload?.errors,
      };
    }

    case UPDATE_SALE: {
      let sale = payload?.sale;

      let tempSaleList = state.saleList.map((item) => {
        if (item.id === sale.id) {
          return { ...sale };
        }
        return item;
      });

      return {
        ...state,
        sale: sale,
        saleList: tempSaleList,
      };
    }

    default:
      return state;
  }
};

export default saleListReducer;
