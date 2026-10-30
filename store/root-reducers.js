import { combineReducers } from "redux";

// admin
import adjustmentReducer from "./admin/reducers/adjustment/adjustmentReducer";
import adjustmentListReducer from "./admin/reducers/adjustment/adjustmentListReducer";
import purchaseListReducer from "./admin/reducers/purchase/purchaseListReducer";
import printBarcodeReducer from "./admin/reducers/barcode/printBarcodeReducer";
import saleListReducer from "./admin/reducers/sale/saleListReducer";
import purchaseReturnListReducer from "./admin/reducers/purchaseReturn/purchaseReturnListReducer";
import saleReturnListReducer from "./admin/reducers/saleReturn/saleReturnListReducer";
import saleReturnCartReducer from "./admin/reducers/saleReturn/saleReturnCartReducer";
import purchaseReturnReducer from "./admin/reducers/purchaseReturn/purchaseReturnReducer";
import moduleReducer from "./admin/reducers/module/moduleReducer";
import groupReducer from "./admin/reducers/group/groupReducer";
import permissionReducer from "./admin/reducers/permission/permissionReducer";
import userReducer from "./admin/reducers/user/userReducer";
import expiredProductListReducer from "./admin/reducers/expiredProduct/expiredProductListReducer";
import deliverySlotReducer from "./admin/reducers/deliverySlot/deliverySlotReducer";
import locationReducer from "./admin/reducers/location/locationReducer";
import uPurchaseCartReducer from "./admin/reducers/purchase/uPurchaseCartReducer";
import supplierReducer from "./admin/reducers/supplier/supplierReducer";

// frontend
import cartReducer from "./frontend/reducers/cartReducer";
import menuReducer from "./frontend/reducers/menuReducer";
import productReducer from "./frontend/reducers/productReducer";
import deliveryReducer from "./frontend/reducers/deliveryReducer";
import customOrderReducer from "./frontend/reducers/customOrderReducer";
import customerOrderReducer from "./frontend/reducers/customerOrderReducer";

// pos
import posCartReducers from "./pos/reducers/posCartReducers";
import posProductReducer from "./pos/reducers/posProductReducer";

const rootReducer = combineReducers({
  // admin
  uPurchaseCart: uPurchaseCartReducer,
  purchaseListStore: purchaseListReducer,
  adjustmentProduct: adjustmentReducer,
  adjustmentListStore: adjustmentListReducer,
  printBarcodeStore: printBarcodeReducer,
  saleListStore: saleListReducer,
  purchaseReturnListStore: purchaseReturnListReducer,
  saleReturnListStore: saleReturnListReducer,
  saleReturnCart: saleReturnCartReducer,
  purchaseReturnStore: purchaseReturnReducer,
  moduleStore: moduleReducer,
  groupStore: groupReducer,
  permissionStore: permissionReducer,
  userStore: userReducer,
  expiredProductListStore: expiredProductListReducer,
  deliverySlotStore: deliverySlotReducer,
  locationStore: locationReducer,
  supplierStore: supplierReducer,
  // frontend
  cartStore: cartReducer,
  menuStore: menuReducer,
  productStore: productReducer,
  deliveryStore: deliveryReducer,
  customOrderStore: customOrderReducer,
  orderStore: customerOrderReducer,
  // pos
  posCart: posCartReducers,
  posProduct: posProductReducer,
});

export default rootReducer;
