import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  POS_CANCEL_ORDER,
  POS_CHECKOUT,
  SET_PAYMENT_METHOD,
  SET_POS_SALE_TYPE,
  SET_POS_DUE_AMOUNT,
  SET_POS_ACCOUNT_ID,
  POS_SET_CUSTOMER,
} from "../../../store/pos/actions/posCartActions";
import axios from "axios";
import Error from "../Notification/Error";
import { useKeyPress } from "../../../Helpers/Utils/Utils";
import Success from "../Notification/Success";
import Storage from "../../../Helpers/Auth/Storage";
import AddDuePaymentModal from "./DuePaymentModal";
import OtherPaymentModal from "./OtherPaymentModal";
import { useRouter } from "next/router";

import { PAYMENT_METHODS } from "../../../Helpers/Pos/PaymentMethodsConstant";

const Checkout = (props) => {
  const router = useRouter();

  const orderNumber = router.query?.order_number ?? null;

  const controlKey = useKeyPress("Control");
  const deleteKey = useKeyPress("Delete");
  const enterKey = useKeyPress("Enter");
  const f9Key = useKeyPress("F9");
  const f10Key = useKeyPress("F10");
  const f11Key = useKeyPress("F11");
  const f12Key = useKeyPress("F12");
  let initialMessage = { success: "", error: "" };
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    deleteKey && props.cancelPosOrder();

    f9Key && posSubmitHandler(PAYMENT_METHODS.CASH);

    f10Key && posSubmitHandler(PAYMENT_METHODS.CARD);

    f11Key && posSubmitHandler(PAYMENT_METHODS.ECOM, PAYMENT_METHODS.ECOM);

    f12Key && posSubmitHandler(PAYMENT_METHODS.DUE);
  }, [controlKey, deleteKey, enterKey, f9Key, f10Key, f11Key, f12Key]);

  const [loading, setLoading] = useState(false);

  const [disable, setDisable] = React.useState(false);

  const posSubmit = async (url, formData) => {
    setDisable(true);
    setLoading(true);
    const getUrl = url ?? "backend/sales";
    const getData = formData ?? props.posCart;

    let response = await axios
      .post(getUrl, getData)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });

    if (response.success) {
      closeModalHandler();
      setLoading(false);
      setMessage({ ...message, success: response.message });
      props.posCheckOut();
      setDisable(false);

      if (response?.data?.id) {
        posInvoiceHandler(response.data.id);
      }
    } else {
      setDisable(false);
      closeModalHandler();
      setLoading(false);
      setMessage({ ...message, error: response.message });
    }

    setTimeout(() => {
      setMessage(initialMessage);
    }, 3000);
  };

  const [accountOptions, setAccountOptions] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios.get(`backend/accounts/bank/account/list`).then((response) => {
        // console.log(response);
        if (response.data.success) {
          setAccountOptions(
            response.data.data.data.map((item) => ({
              value: +item.id,
              label: item.name,
              default: item.default,
            }))
          );
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  const posSubmitHandler = (method, sale_type = PAYMENT_METHODS.POS) => {
    props.setPaymentMethod(method);
    props.setPosSaleType(sale_type);
  };

  useEffect(() => {
    if (
      props.posCart.payment_method === PAYMENT_METHODS.CASH ||
      props.posCart.payment_method === PAYMENT_METHODS.ECOM
    ) {
      posSubmit();
    }

    if (props.posCart.payment_method === PAYMENT_METHODS.CARD) {
      $("#other_payment_modal").modal("show");
    } else {
      $("#other_payment_modal").modal("hide");
    }

    if (props.posCart.payment_method === PAYMENT_METHODS.DUE) {
      $("#add_due_payment_modal").modal("show");
    } else {
      $("#add_due_payment_modal").modal("hide");
    }
  }, [props.posCart.payment_method]);

  const closeModalHandler = () => {
    $("#add_due_payment_modal").modal("hide");
    $("#other_payment_modal").modal("hide");

    setTimeout(() => {
      props.setPaymentMethod("");
      props.setPosSaleType("");
      props.setPaymentDueAmount("");
      props.setPaymentAccountId(null);
    }, 500);
  };

  const posInvoiceHandler = useCallback((id) => {
    window.open(`/admin/pos/invoice/?id=${id}`, "_blank", "channelmode=true");
  }, []);

  console.log(props.posCart);
  // console.log(orderNumber);
  return (
    <>
      {message.success && <Success message={message.success} />}
      {message.error && <Error message={message.error} />}

      <div className="cart-action shadow-lg">
        {!orderNumber && (
          <button
            className="btn btn-cash-pay"
            data-toggle="modal"
            // data-target="#add_due_payment_modal"
            type="button"
            onClick={() => {
              if (props.posCart.user_id === 258) {
                alert("Please select customer first.");
              } else {
                posSubmitHandler(PAYMENT_METHODS.DUE);
              }
            }}
            // disabled={(props.posCart.user_id===258)}
          >
            <i className="icon-money-check-alt-solid" />
            <span>Due / Advance Payment</span>
          </button>
        )}

        {!orderNumber && (
          <a className="btn btn-primary mr-2" href="/admin/sales/pos-sale">
            <i className="fas fa-undo-alt" />
            <span> Sale Return</span>
          </a>
        )}

        <button
          className="btn btn-cancle"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            props.cancelPosOrder();
          }}
        >
          <i className="icon-trash-alt-regular" />
          <span>Cancel</span>
        </button>

        {orderNumber && (
          <button
            className="btn btn-cash-pay"
            type="button"
            onClick={() =>
              posSubmitHandler(PAYMENT_METHODS.ECOM, PAYMENT_METHODS.ECOM)
            }
            disabled={disable}
          >
            <i className="icon-money-check-alt-solid" />
            <span>e-Commerce Order</span>
          </button>
        )}

        {!orderNumber && (
          <button
            className="btn btn-cash-pay"
            type="button"
            onClick={() => posSubmitHandler(PAYMENT_METHODS.CARD)}
          >
            <i className="icon-money-check-alt-solid" />
            <span>Others Payment</span>
          </button>
        )}

        {!orderNumber && (
          <button
            className="btn btn-success"
            type="button"
            onClick={() => posSubmitHandler(PAYMENT_METHODS.CASH)}
            disabled={disable}
          >
            <i className="icon-money-check-alt-solid" />
            <span>Cash Payment</span>
          </button>
        )}
      </div>

      {props.posCart.payment_method === PAYMENT_METHODS.CARD && (
        <OtherPaymentModal
          accountOptions={accountOptions}
          setMessage={setMessage}
          message={message}
          posSubmit={posSubmit}
          closeModalHandler={closeModalHandler}
          loading={loading}
          disabled={disable}
        />
      )}

      {props.posCart.payment_method === PAYMENT_METHODS.DUE && (
        <AddDuePaymentModal
          accountOptions={accountOptions}
          setMessage={setMessage}
          message={message}
          posSubmit={posSubmit}
          closeModalHandler={closeModalHandler}
          loading={loading}
          disabled={disable}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelPosOrder: () => {
      dispatch({ type: POS_CANCEL_ORDER });
    },
    posCheckOut: () => dispatch({ type: POS_CHECKOUT }),
    setPaymentMethod: (payment_method) =>
      dispatch({ type: SET_PAYMENT_METHOD, payload: { payment_method } }),
    setPosSaleType: (sale_type) =>
      dispatch({ type: SET_POS_SALE_TYPE, payload: { sale_type } }),

    setCustomer: (user_id, wallet_balance) =>
      dispatch({
        type: POS_SET_CUSTOMER,
        payload: { user_id, wallet_balance },
      }),
    setPaymentAccountId: (account_id) =>
      dispatch({ type: SET_POS_ACCOUNT_ID, payload: { account_id } }),
    setPaymentDueAmount: (amount) =>
      dispatch({ type: SET_POS_DUE_AMOUNT, payload: { amount } }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;

  return { posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
