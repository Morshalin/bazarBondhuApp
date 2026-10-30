import { useState, useEffect, memo, Fragment } from "react";
import useHttp from "../../../../hooks/useHttp";
import MessageNotification from "../../../Ui/Notification/Message";

const ProductDefaultSettings = (props) => {
  console.log("shop setting ProductDefaultSettings");

  const [form, setForm] = useState({
    status: false,
    ecommerce_sale_status: false,
    reserved_ecommerce_product: 1,
    cash_on_delivery: false,
    over_selling: false,
    pos_sale_status: false,
    reserved_pos_product: 0,
    low_quantity_alert: 0,
    expiry_alert_before: 7,
  });

  useEffect(() => {
    if (props.productDefaultSettings) {
      setForm((prevState) => ({
        ...prevState,
        status: props.productDefaultSettings?.status ?? false,
        ecommerce_sale_status:
          props.productDefaultSettings?.ecommerce_sale_status ?? false,
        reserved_ecommerce_product:
          props.productDefaultSettings?.reserved_ecommerce_product ?? 1,
        cash_on_delivery:
          props.productDefaultSettings?.cash_on_delivery ?? false,
        over_selling: props.productDefaultSettings?.over_selling ?? false,
        pos_sale_status: props.productDefaultSettings?.pos_sale_status ?? false,
        reserved_pos_product:
          props.productDefaultSettings?.reserved_pos_product ?? 0,
        low_quantity_alert:
          props.productDefaultSettings?.low_quantity_alert ?? 0,
        expiry_alert_before:
          props.productDefaultSettings?.expiry_alert_before ?? 7,
      }));
    }
  }, [props.productDefaultSettings]);

  const formChangeHandler = (event) => {
    const { name, value, checked } = event.target;

    // console.log(name);
    // console.log(value);
    // console.log(event);

    if (name === "status") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value === "true" ? true : false,
      }));
    }

    if (name === "ecommerce_sale_status") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value === "true" ? true : false,
      }));
    }
    if (name === "reserved_ecommerce_product") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "cash_on_delivery") {
      setForm((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }
    if (name === "over_selling") {
      setForm((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    }

    if (name === "pos_sale_status") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value === "true" ? true : false,
      }));
    }

    if (name === "reserved_pos_product") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "low_quantity_alert") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name === "expiry_alert_before") {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const {
    isLoading,
    success,
    successMessage,
    httpFetch,
    error,
    errorMessage,
    clearSuccess,
    clearError,
  } = useHttp();

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("status", form.status);
    formData.append("ecommerce_sale_status", form.ecommerce_sale_status);
    formData.append(
      "reserved_ecommerce_product",
      form.reserved_ecommerce_product
    );
    formData.append("cash_on_delivery", form.cash_on_delivery);
    formData.append("over_selling", form.over_selling);
    formData.append("pos_sale_status", form.pos_sale_status);
    formData.append("reserved_pos_product", form.reserved_pos_product);
    formData.append("low_quantity_alert", form.low_quantity_alert);
    formData.append("expiry_alert_before", form.expiry_alert_before);

    httpFetch(`backend/product-default-setting`, "post", formData, {
      "Content-Type": "application/json",
    });
  };

  // console.log(form);

  return (
    <Fragment>
      {success && (
        <MessageNotification
          message={successMessage}
          onClick={() => clearSuccess()}
        />
      )}
      {errorMessage && (
        <MessageNotification
          error={errorMessage}
          message={errorMessage}
          onClick={() => clearError()}
        />
      )}

      <form className="form-row" onSubmit={submitHandler}>
        <div className="form-group col-lg-12 text-center">
          <div className="text-nowrap">
            <label className="mr-4">Product Status</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="status_active"
                defaultChecked={form.status ? true : false}
                value={true}
                onChange={formChangeHandler}
              />
              <label className="form-check-label" htmlFor="status_active">
                Active
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="status_inactive"
                defaultChecked={!form.status ? true : false}
                value={false}
                onChange={formChangeHandler}
              />
              <label className="form-check-label" htmlFor="status_inactive">
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-4">
          <label>E-commerce Sale</label>

          <div className="text-nowrap">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="ecommerce_sale_status"
                id="ecommerce_sale_status_active"
                defaultChecked={form.ecommerce_sale_status ? true : false}
                value={true}
                onChange={formChangeHandler}
              />
              <label
                className="form-check-label"
                htmlFor="ecommerce_sale_status_active"
              >
                Active
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="ecommerce_sale_status"
                id="ecommerce_sale_status_inactive"
                defaultChecked={!form.ecommerce_sale_status ? true : false}
                value={false}
                onChange={formChangeHandler}
              />
              <label
                className="form-check-label"
                htmlFor="ecommerce_sale_status_inactive"
              >
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-8">
          <label htmlFor="reserved_ecommerce_product">
            Reserved E-commerce Product
          </label>
          <input
            type="number"
            className={`form-control `}
            placeholder="Reserved E-commerce Product"
            min={1}
            step={1}
            id="reserved_ecommerce_product"
            name="reserved_ecommerce_product"
            value={form.reserved_ecommerce_product}
            onChange={formChangeHandler}
          />
        </div>

        <div className="form-group col-lg-6">
          <label>E-commerce Cash on Delivery</label>

          <div className="text-nowrap">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="cash_on_delivery"
                id="cash_on_delivery"
                defaultChecked={form.cash_on_delivery}
                onChange={formChangeHandler}
              />
              <label className="form-check-label" htmlFor="cash_on_delivery">
                Enable
              </label>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-6">
          <label>E-commerce Stock Dependency</label>

          <div className="text-nowrap">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="over_selling"
                id="over_selling"
                defaultChecked={form.over_selling}
                onChange={formChangeHandler}
              />
              <label className="form-check-label" htmlFor="over_selling">
                Enable
              </label>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-4">
          <label>Pos Sale</label>

          <div className="text-nowrap">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pos_sale_status"
                id="pos_sale_status_active"
                defaultChecked={form.pos_sale_status ? true : false}
                value={true}
                onChange={formChangeHandler}
              />
              <label
                className="form-check-label"
                htmlFor="pos_sale_status_active"
              >
                Active
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="pos_sale_status"
                id="pos_sale_status_inactive"
                defaultChecked={!form.pos_sale_status ? true : false}
                value={false}
                onChange={formChangeHandler}
              />
              <label
                className="form-check-label"
                htmlFor="pos_sale_status_inactive"
              >
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="form-group col-lg-8">
          <label htmlFor="reserved_pos_product">Reserved Pos Product</label>
          <input
            type="number"
            className={`form-control `}
            placeholder="Reserved Pos Product"
            min={0}
            step={1}
            id="reserved_pos_product"
            name="reserved_pos_product"
            value={form.reserved_pos_product}
            onChange={formChangeHandler}
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="low_quantity_alert">Low Quantity Alert</label>
          <input
            type="number"
            className={`form-control`}
            placeholder="Low Quantity Alert"
            id="low_quantity_alert"
            name="low_quantity_alert"
            value={form.low_quantity_alert}
            onChange={formChangeHandler}
          />
        </div>

        <div className="form-group col-lg-6 ">
          <label htmlFor="expiry_alert_before">Expiry Alert Before</label>
          <input
            type="number"
            className={`form-control `}
            placeholder="day"
            id="expiry_alert_before"
            name="expiry_alert_before"
            value={form.expiry_alert_before}
            onChange={formChangeHandler}
          />
        </div>
        <div className="form-group col-lg-12 mt-4">
          <button
            type="submit"
            className={`btn btn-success ${isLoading ? "disabled" : ""}`}
          >
            <i
              className={
                isLoading
                  ? `spinner-border spinner-border-sm mr-1`
                  : `icon-save-regular mr-1`
              }
            />
            {isLoading ? `Saving..` : `Save`}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default memo(ProductDefaultSettings);
