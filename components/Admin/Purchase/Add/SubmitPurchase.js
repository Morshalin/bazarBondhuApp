import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import {
  ERROR,
  saveAction,
  SUCCESS,
  updateFileAction,
  useKeyPress,
} from "../../../../Helpers/Utils/Utils";
import {
  ADD_PURCHASE_ERRORS,
  ADD_PURCHASE_MESSAGE,
  RESET_PURCHASE_DATA,
  RESET_PURCHASE_MESSAGE,
} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";

const SubmitPurchase = (props) => {
  let controlKey = useKeyPress("Control");

  let enterKey = useKeyPress("Enter");

  let deleteKey = useKeyPress("Delete");

  const [submitDisable, setSubmitDisable] = useState(false);


  let emptyQuantity =
    props.uPurchaseCart &&
    props.uPurchaseCart.products &&
    props.uPurchaseCart.products.find(
      (product) =>
        product.quantity === 0 ||
        product.quantity === "" ||
        product.unit_price === 0 ||
        product.unit_price === ""
    );

  let sub_total =
    props.uPurchaseCart.products.length > 0
      ? props.uPurchaseCart.products.reduce(
          (sum, { unit_price, quantity }) => (sum += unit_price * quantity),
          0
        )
      : 0;

  let total_discount = props.uPurchaseCart.total_discount;

  let grand_total =
    sub_total && total_discount && sub_total > total_discount
      ? sub_total - total_discount
      : sub_total;

  useEffect(() => {
    controlKey &&
      deleteKey &&
      window.confirm("Are you sure to reset the purchase?") &&
      props.resetPurchaseData();
    controlKey &&
      enterKey &&
      window.confirm("Are you sure to submit the purchase?") &&
      submitPurchase() &&
      props.setIsChecked(!!emptyQuantity);
  }, [controlKey, enterKey, deleteKey]);

  const submitPurchase = async (paid_purchase) => {
    setSubmitDisable(true);
    let formData = new FormData();
    formData.append("chalan_attachment", props.uPurchaseCart.chalan_attachment);
    formData.append("paid_purchase",paid_purchase);
    formData.append("chalan_date", props.uPurchaseCart.chalan_date);
    formData.append("chalan_number", props.uPurchaseCart.chalan_number);
    formData.append(
      "invoice_attachment",
      props.uPurchaseCart.invoice_attachment
    );
    formData.append("invoice_date", props.uPurchaseCart.invoice_date);
    formData.append(
      "transaction_time_date",
      props.uPurchaseCart.transaction_time_date
    );
    formData.append("invoice_number", props.uPurchaseCart.invoice_number);
    formData.append("payment_status", props.uPurchaseCart.payment_status);
    formData.append("products", JSON.stringify(props.uPurchaseCart.products));
    formData.append("purchase_note", props.uPurchaseCart.purchase_note);
    formData.append("shop_id", props.uPurchaseCart.shop_id);
    formData.append("status", props.uPurchaseCart.status);
    formData.append("supplier_id", props.uPurchaseCart.supplier_id);
    formData.append("total_discount", props.uPurchaseCart.total_discount);
    formData.append("sub_total", sub_total);
    formData.append("grand_total", grand_total);

    if (props.mode === "edit") {
      formData.append("_method", "PUT");

      const config = {
        headers: {
          "content-type": "multipart/form-data;",
        },
      };

      updateFileAction(`backend/purchases/${props.id}`, formData, config)
        .then((res) => {
          if (res.success) {
            props.addPurchaseMessage(SUCCESS, res.message);
          } else {
            props.addPurchaseMessage(ERROR, res.message);
            props.addPurchaseErrors(res.errors);

            let scrollToErrorFiled =
              document.getElementsByClassName("is-invalid");

            if (scrollToErrorFiled.length > 0) {
              scrollToErrorFiled[0].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            } else {
              let scrollTo = document.getElementsByClassName("error_border");
              if (scrollTo.length > 0) {
                scrollTo[0].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }
        })
        .catch((err) => err)
        .finally(() => setTimeout(() => props.resetPurchaseMessage(), 3000));
    } else {
      saveAction(`backend/purchases`, formData)
        .then((res) => {
          if (res.success) {
            props.addPurchaseMessage(SUCCESS, res.message);
        
            setTimeout(() => {props.resetPurchaseData();setSubmitDisable(false);}, 3000);
          } else {
            props.addPurchaseMessage(ERROR, res.message);
            props.addPurchaseErrors(res.errors);
            setTimeout(() => {props.resetPurchaseMessage();setSubmitDisable(false);}, 3000);

            let scrollToErrorFiled =
              document.getElementsByClassName("is-invalid");

            if (scrollToErrorFiled.length > 0) {
              scrollToErrorFiled[0].scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            } else {
              let scrollTo = document.getElementsByClassName("error_border");
              if (scrollTo.length > 0) {
                scrollTo[0].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {props.uPurchaseCart.message.success && (
        <Success message={props.uPurchaseCart.message.success} />
      )}
      {props.uPurchaseCart.message.error && (
        <Error message={props.uPurchaseCart.message.error} />
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-end final-actions">
            <button
              className="btn btn-reset m-2"
              onClick={(e) => {
                e.preventDefault();
                window.confirm("Are you sure to reset the purchase?") &&
                  props.resetPurchaseData();
              }}
            >
              <i className="icon-cross" />
              <span>Reset</span>
            </button>
            <button
              className="btn btn-submit m-2"
              disabled={submitDisable}
              onClick={(e) => {
                e.preventDefault();
                props.setIsChecked(!!emptyQuantity);
                window.confirm("Are you sure to submit the purchase?") &&
                  submitPurchase(false);
              }}
            >
              <i className="icon-money-check-alt-solid" />
              <span>{props.mode === "edit" ? "Update" : "Due Purchase"}</span>
            </button>

            <button
              className="btn btn-submit m-2"
              disabled={submitDisable}
              onClick={(e) => {
                e.preventDefault();
                props.setIsChecked(!!emptyQuantity);
                window.confirm("Are you sure to submit the purchase?") &&
                  submitPurchase(true);
              }}
            >
              <i className="icon-checkmark" />
              <span>Paid Purchase</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPurchaseErrors: (errors) =>
      dispatch({ type: ADD_PURCHASE_ERRORS, payload: { errors } }),
    addPurchaseMessage: (message_type, message) =>
      dispatch({
        type: ADD_PURCHASE_MESSAGE,
        payload: { message_type, message },
      }),
    resetPurchaseData: () => dispatch({ type: RESET_PURCHASE_DATA }),
    resetPurchaseMessage: () => dispatch({ type: RESET_PURCHASE_MESSAGE }),
  };
};

const mapStateToProps = (store) => {
  const { uPurchaseCart } = store;
  return { uPurchaseCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPurchase);
