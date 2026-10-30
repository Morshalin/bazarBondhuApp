import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ERROR } from "../../../Helpers/Utils/Utils";
import {
  CART_CHECK_OUT,
  RESET_CHECKOUT_MESSAGE,
  SET_CHECKOUT_MESSAGE,
  SET_PAYMENT_METHOD,
  SET_SLOT_AND_CHARGE,
  SET_USER_DATA_ERRORS,
} from "../../../store/frontend/actions/cartAction";
import { SET_DELIVERY_TYPE } from "../../../store/frontend/actions/deliveryActions";
import Error from "../../Admin/Notification/Error";
import Success from "../../Admin/Notification/Success";

const ProceedCheckout = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.cartStore.sub_total === 0) {
      props.setSlotCharge(0, 0);
    }
  }, [props.cartStore.sub_total, props.deliveryStore.customerShippingAddress]);

  // this checkout functionality for sale, payment create method and business logic
  const checkOut = async (event) => {
    event.preventDefault(); // for preventing submit button

    if (props.cartStore.address_id) {
      // start ssl method api payment api request
      const paymentApiRequest = async (cartItem) => {
        return await axios
          .post(`ssl-payment-submit`, cartItem)
          .then((result) => {
            return result.data;
          })
          .catch((err) => {
            return err;
          });
      };
      // end ssl method api payment api request

      // start sales method api request
      let saleApiRequest = await axios
        .post(`backend/sales/store-ecom-order`, props.cartStore)
        .then((result) => {
          return result.data;
        })
        .catch((err) => {
          return err;
        });
      // end sales method api request

      switch (props.deliveryStore.delivery_type) {
        case "ssl_commerze": // if payment is selected ssl_commerze form redux store or local storage
          // if sales is created then payment method is calling paymentApiRequest() depending on saleApiRequest success status
          if (saleApiRequest.success) {
            props.changeLoadingPaymentGateway(true);
            const paymentResponses = await paymentApiRequest({
              ...saleApiRequest.data,
              address_id: props.cartStore.address_id,
            }); // payment api called if success then return payment api url
            if (paymentResponses.success) {
              await router.replace(paymentResponses.data); // after payment it will replace the route to payment api url

              props.changeLoadingPaymentGateway(false);
            } else {
              props.setCheckoutMessage(ERROR, paymentResponses.message);
              setTimeout(() => {
                props.resetCheckoutMessage();
                router.replace(`/user/order-info`);
              }, 2000);
            }
            props.checkOutCompleted(); // remove all cart data form redux store or local storage
          } else {
            // await router.replace('/user/order-info') // if fail payment gateway api then it push to order-info page
            props.setCheckoutMessage(ERROR, saleApiRequest.message);
            setTimeout(() => props.resetCheckoutMessage(), 2000);
          }

          break;

        case "cash_on_delivery": // if cash on delivery selected then it will only generated on sales data
          if (saleApiRequest.success) {
            props.checkOutCompleted();
            await router.replace(`/user/order-info`);
          } else {
            props.setCheckoutMessage(ERROR, saleApiRequest.message);
            setTimeout(() => props.resetCheckoutMessage(), 2000);
          }

          break;

        default:
          console.error("some thing goes wrong on server"); // if any thing wrong then log is occurred
          break;
      }
    } else {
      props.setCheckoutMessage(ERROR, "Please Add a delivery address.");
      setTimeout(() => props.resetCheckoutMessage(), 2000);
    }
  };

  const validate = () => {
    let errors = {};

    if (isEmpty(props?.cartStore?.authUser?.first_name)) {
      errors.first_name = "The first name field is required.";
    }

    if (isEmpty(props?.cartStore?.authUser?.last_name)) {
      errors.last_name = "The last name field is required.";
    }
    if (isEmpty(props?.cartStore?.authUser?.phone)) {
      errors.phone = "Mobile number is required.";
    }
    if (props?.cartStore?.authUser?.email) {
      const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        props?.cartStore?.authUser?.email
      );
      if (!regexMatch) {
        errors.email = "Invalid Email Format.";
      }
    } else {
      errors.email = "Email field is required.";
    }

    props.setUserErrors(errors);

    return Object.keys(errors).length === 0 && errors.constructor === Object
      ? {
          success: true,
          message: "",
          errors: "",
        }
      : props.setCheckoutMessage(ERROR, "Please fix personal details.") && {
            success: false,
            message: "Please fix the following issues",
            errors: errors,
          } &&
          setTimeout(() => props.resetCheckoutMessage(), 2000);
  };

  const isEmpty = (value) => value === null || value === "";

  return (
    <>
      {props.cartStore.message.success && (
        <Success message={props.cartStore.message.success} />
      )}
      {props.cartStore.message.error && (
        <Error message={props.cartStore.message.error} />
      )}

      <div className="card-header">
        <span className="badge">03</span>
        Proceed to Checkout
      </div>

      <div className="card-body">
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-12">
                <div className="payment-gs row">
                  <div className="col-md-6">
                    <div className="radio-button">
                      <label
                        className="radio-button__label-wrapper"
                        htmlFor="cash_on_delivery"
                      >
                        <h3 className="radio-button__label-title">
                          Cash on Delivery
                        </h3>

                        <span className="radio-button__label-subtext">
                          Pay after received your order.
                        </span>

                        <input
                          type="radio"
                          id="cash_on_delivery"
                          className="radio-button__input"
                          onChange={() => {
                            props.setDeliveryType("cash_on_delivery");
                            props.setPaymentMethod("Cash On Delivery");
                          }}
                          checked={
                            props.deliveryStore.delivery_type ===
                            "cash_on_delivery"
                          }
                        />

                        <div className="radio-button__custom-indicator" />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="radio-button">
                      <label
                        className="radio-button__label-wrapper"
                        htmlFor="ssl_commerze"
                      >
                        <h3 className="radio-button__label-title">
                          Online Payment
                        </h3>

                        <span className="radio-button__label-subtext">
                          Cards, Mobile Banking, NET Banking.
                        </span>

                        <input
                          type="radio"
                          id="ssl_commerze"
                          className="radio-button__input"
                          onChange={() => {
                            props.setDeliveryType("ssl_commerze");
                            props.setPaymentMethod("Card Payment");
                          }}
                          checked={
                            props.deliveryStore.delivery_type === "ssl_commerze"
                          }
                        />
                        <div className="radio-button__custom-indicator" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div
          className="alert alert-warning mt-3 rounded-0 text-center"
          role="alert"
        >
          <i className="icon-warning mr-3" />
          <span>
            {" "}
            By clicking or tapping proceed. I agree to {
              process.env.app_name
            }{" "}
            <a href="/">Terms & Conditions</a>.
          </span>
        </div>

        <p className="text-center delivery-amount">
          ৳ {props.cartStore.delivery_charge + props.cartStore.slot_charge}{" "}
          Delivery charge included
        </p>
        <div className="checkout-page-action">
          <button
            onClick={(e) => {
              if (validate().success) {
                checkOut(e).then((r) => r);
              }
            }}
          >
            <span className="cpa-amount">
              ৳{" "}
              {props.cartStore.grand_total >
              props.cartStore.coupon_details.min_purchase_amount
                ? props.cartStore.grand_total -
                  props.cartStore.coupon_discount +
                  props.cartStore.delivery_charge +
                  props.cartStore.slot_charge
                : props.cartStore.grand_total +
                  props.cartStore.delivery_charge +
                  props.cartStore.slot_charge}
            </span>
            <span className="cpa-proceed">Proceed</span>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  const { cartStore, deliveryStore } = store;

  return { cartStore, deliveryStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDeliveryType: (delivery_type) =>
      dispatch({ type: SET_DELIVERY_TYPE, payload: { delivery_type } }),
    setPaymentMethod: (payment_method) =>
      dispatch({ type: SET_PAYMENT_METHOD, payload: { payment_method } }),
    checkOutCompleted: () => dispatch({ type: CART_CHECK_OUT }),
    setSlotCharge: (slot_id, slot_charge) =>
      dispatch({
        type: SET_SLOT_AND_CHARGE,
        payload: { slot_id, slot_charge },
      }),
    setCheckoutMessage: (message_type, message) =>
      dispatch({
        type: SET_CHECKOUT_MESSAGE,
        payload: { message_type, message },
      }),
    resetCheckoutMessage: () => dispatch({ type: RESET_CHECKOUT_MESSAGE }),
    setUserErrors: (errors) =>
      dispatch({ type: SET_USER_DATA_ERRORS, payload: { errors } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProceedCheckout);
