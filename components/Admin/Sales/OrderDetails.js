/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  SET_SALE_ITEM,
  SET_SALE_RETURN_ERRORS,
  UPDATE_ORDER_STATUS,
} from "../../../store/admin/actions/sale/saleListAction";
import MySucces from "../Notification/MySuccess";
import SaleActions from "./SaleActions";
import SaleReturnList from "./SaleReturnList";
import SaleReturnModal from "./SaleReturnModal";
import Link from "next/link";
import { SALE_TYPE } from "../../../Helpers/Sales/SalesConstant";
import { ACTION_MENU } from "../../../Helpers/ActionMenu/ActionMenuConstant";
import { SALE_MODE } from "../../../Helpers/Sales/SalesConstant";

const OrderDetails = (props) => {
  // let actionStatus = [
  //   { id: 1, name: "Due" },
  //   { id: 2, name: "Payment" },
  //   { id: 3, name: "Return" },
  // ];

  // if (props?.saleMode === saleMode.ORDERS) {
  //   actionStatus = [{ id: 1, name: "Cancel" }];
  // }

  // const [menuList, setMenuList] = useState();

  // const [successMessage, setSuccessMessage] = useState({
  //   status: false,
  //   message: "",
  // });

  // const resetSuccesMessage = () => {
  //   setSuccessMessage({
  //     ...successMessage,
  //     status: false,
  //     message: "",
  //   });
  // };

  // useEffect(async () => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     axios.get(`/backend/get-all-action-menus`).then((response) => {
  //       // console.log(response);
  //       if (response.data.success) {
  //         const menuList = response.data.data.filter((filterItem) =>
  //           actionStatus.some((item) => item.name === filterItem.name)
  //         );
  //         setMenuList(menuList);
  //       }
  //     });
  //   }
  //   return () => (isMounted = false);
  // }, []);

  // const handleTrackingOrder = (event, status) => {
  //   event.preventDefault();

  //   const dataPost = {
  //     sale_id: props.sale.id,
  //     order_number: props.sale.order_number,
  //     status: status,
  //   };
  //   const url = `/backend/sales/update-order-processing-history`;

  //   axios
  //     .post(url, dataPost, {
  //       headers: {
  //         // Overwrite Axios's automatically set Content-Type
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((result) => {
  //       //console.log(result.data);

  //       if (result.data.success) {
  //         props.updateOrderStatus(result.data.data);

  //         setSuccessMessage({
  //           ...successMessage,
  //           status: true,
  //           message: result.data.message,
  //         });
  //       }
  //     });
  // };

  // console.log(["menuList", menuList]);
  console.log(["Order details", props]);

  let saleActionsHead = null;
  let saleActions = null;

  if (props.saleMode === SALE_MODE.POS) {
    if (props?.sale?.sale_type === SALE_TYPE.POS) {
      saleActionsHead = <th scope="col">Actions</th>;
    }

    if (props?.sale?.sale_type === SALE_TYPE.POS) {
      saleActions = (
        <td className="text-center text-nowrap">
          <SaleActions setErrors={props.setSaleReturnErrors} />
        </td>
      );
    }
  }

  if (props.saleMode === SALE_MODE.ECOM) {
    if (
      props?.sale?.sale_type === SALE_TYPE.ECOM &&
      props?.sale?.order_status === ACTION_MENU.COMPLETED.toString()
    ) {
      saleActionsHead = <th scope="col">Actions</th>;
    }

    if (
      props?.sale?.sale_type === SALE_TYPE.ECOM &&
      props?.sale?.order_status === ACTION_MENU.COMPLETED.toString()
    ) {
      saleActions = (
        <td className="text-center text-nowrap">
          <SaleActions setErrors={props.setSaleReturnErrors} />
        </td>
      );
    }
  }

  return (
    <>
      {/* {successMessage.status && (
        <MySucces
          message={successMessage.message}
          resetSuccesMessage={resetSuccesMessage}
        />
      )} */}

      <div className="custom-card-box mb-3">
        <div className="custom-card-box-header">
          <div className="fbh-title">
            <i className="icon-eye-regular" />
            <h2>Order Details #{props.sale.order_number}</h2>

            {/*<h2 className="ml-auto border-0">*/}
            {/*    <a href="#" data-toggle="modal" data-target="#reportOrderModal">*/}
            {/*        Report Issues*/}
            {/*    </a>*/}
            {/*</h2>*/}
          </div>
        </div>

        <div className="custom-card-box-content p-md-3 p-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-md-3 mb-2 rounded-0">
                <div className="card-body card-da-dtl rounded-0">
                  <i className="icon-map-marker-alt-solid"></i>
                  <h6 className="card-title mb-2">Delivery address</h6>
                  <p
                    className="card-subtitle mb-0 text-muted"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Name :{" "}
                    {props.sale?.delivery_address_info?.first_name ??
                      props.sale.customer_name}
                    {` `}
                    {props.sale?.delivery_address_info?.last_name}
                    {`\n`}
                    {props.sale?.delivery_address_info?.address &&
                      "Address:" +
                        props.sale?.delivery_address_info?.address +
                        `, ` +
                        props.sale?.delivery_address_info?.area?.name +
                        `, ` +
                        props.sale?.delivery_address_info?.location?.name +
                        `\n`}
                    Cell Phone:{" "}
                    {props.sale?.delivery_address_info?.phone ??
                      props.sale.customer_phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive custom-table custom-hight-320">
                <table className="table table-bordered table-hover mb-3 table-order-details">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Img</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty.</th>
                      <th scope="col">Total</th>
                      {saleActionsHead}
                    </tr>
                  </thead>
                  <tbody>
                    {props.sale && props.sale?.saleProducts.length > 0 ? (
                      props.sale.saleProducts.map((item, index) => (
                        <tr
                          onClick={(e) => {
                            e.preventDefault();
                            props.setSaleItem(item);
                          }}
                          key={item.id}
                          className={`text-center ${
                            props?.saleItem?.product_sale_id === item.id &&
                            `bg-selected`
                          }`}
                        >
                          <td scope="row">{++index}</td>

                          <td className="text-center">
                            <img
                              src={item.productDetails.product.feature_image}
                              alt="Product Img"
                            />
                          </td>
                          <td className="text-center">
                            <h6 className="text-875 mb-1">
                              {item.productDetails.product.name}
                            </h6>
                          </td>
                          <td className="text-center text-nowrap">
                            <span className="d-block">
                              {item.discount_price ? (
                                <del> ৳{item.unit_price.toFixed(2)}</del>
                              ) : (
                                <React.Fragment>
                                  ৳{item.unit_price.toFixed(2)}
                                </React.Fragment>
                              )}
                            </span>

                            {item.discount_price ? (
                              <span className="d-block">
                                ৳{item.discount_price.toFixed(2)}
                              </span>
                            ) : null}

                            <span className="d-block">
                              Vat(৳{item.unit_vat})
                            </span>
                          </td>
                          <td className="text-center text-nowrap">
                            {item.quantity}
                          </td>
                          <td className="text-center text-nowrap">
                            ৳ {item.sub_total.toFixed(2)}
                          </td>

                          {saleActions}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Products Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {(props?.sale?.sale_type === SALE_TYPE.POS ||
          props?.sale?.sale_type === SALE_TYPE.ECOM) && <SaleReturnList />}
      </div>

      <div
        className="modal fade"
        id="reportOrderModal"
        tabIndex="-1"
        aria-labelledby="reportOrderLebel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="reportOrderLebel">
                What went wrong?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="check-list-report">
                <input type="checkbox" id="1" className="vh" />
                <label htmlFor="1">Wrong product</label>
              </div>
              <div className="check-list-report">
                <input type="checkbox" id="2" className="vh" />
                <label htmlFor="2">Expaired product</label>
              </div>
              <div className="check-list-report">
                <input type="checkbox" id="3" className="vh" />
                <label htmlFor="3">LMissing product</label>
              </div>
              <div className="check-list-report">
                <input type="checkbox" id="4" className="vh" />
                <label htmlFor="4">Product quality was bad</label>
              </div>
              <div className="check-list-report">
                <input type="checkbox" id="5" className="vh" />
                <label htmlFor="5">My order arived late</label>
              </div>
              <div className="check-list-report">
                <input type="checkbox" id="6" className="vh" />
                <label htmlFor="6">I don't like the packaging</label>
              </div>
              <div className="form-group mt-4 pt-1">
                <textarea
                  className="form-control rounded-0"
                  rows="3"
                  placeholder="Please describe issues ..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-0"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger rounded-0">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <SaleReturnModal />
    </>
  );
};

const mapStateToProps = (store) => {
  const { sale, saleItem } = store.saleListStore;

  return { sale, saleItem };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderStatus: (sale) =>
      dispatch({ type: UPDATE_ORDER_STATUS, payload: { sale } }),
    setSaleItem: (saleItem) =>
      dispatch({ type: SET_SALE_ITEM, payload: { saleItem } }),
    setSaleReturnErrors: (errors) =>
      dispatch({ type: SET_SALE_RETURN_ERRORS, payload: { errors } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
