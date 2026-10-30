import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ADD_CHALAN_ATTACHMENT,
  ADD_CHALAN_DATE,
  ADD_CHALAN_NUMBER,
  ADD_INVOICE_ATTACHMENT,
  ADD_INVOICE_DATE,
  ADD_TRANSACTION_DATE,
  ADD_INVOICE_NUMBER,
} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";

const PurchaseInfo = (props) => {
  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="invoice_number">Chalan Number</label>

            <input
              autoComplete="off"
              type="text"
              className="form-control"
              id="chalan_number"
              name="chalan_number"
              required
              value={props.chalan_number}
              onChange={(e) => {
                e.preventDefault();
                props.addChalanNumber(e.target.value);
              }}
              placeholder="Chalan Number"
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="date">Chalan Date</label>

            <input
              id="date"
              type="date"
              value={props.chalan_date}
              className="form-control"
              required
              onChange={(e) => {
                e.preventDefault();
                props.addChalanDate(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>Chalan Attachment</label>
            <div className="custom-file">
              <input
                type="file"
                className={`custom-file-input ${
                  props?.errors?.chalan_attachment ? `is-invalid` : ``
                }`}
                name="chalan_attachment"
                onChange={(e) => {
                  e.preventDefault();
                  props.addChalanAttachment(e.target.files[0]);
                }}
                id="chalan_attachment"
              />
              <label className="custom-file-label" htmlFor="chalan_attachment">
                <span
                  className="d-inline-block text-truncate w-75"
                  id="chalan_attachment_text"
                >
                  doc, pdf, xls, csv or image
                </span>
              </label>

              <div
                className={
                  props?.errors?.chalan_attachment ? `invalid-feedback` : ``
                }
              >
                {props?.errors?.chalan_attachment}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="invoice_number">Invoice Number</label>

            <input
              autoComplete="off"
              type="text"
              className={`form-control`}
              id="invoice_number"
              name="invoice_number"
              required
              value={props.invoice_number}
              onChange={(e) => {
                e.preventDefault();
                props.addInvoiceNumber(e.target.value);
              }}
              placeholder="Invoice Number"
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="date">
              Invoice Date
              <span className="text-danger"> * </span>
            </label>

            <input
              id="date"
              type="date"
              value={props.invoice_date}
              className="form-control"
              onChange={(e) => {
                e.preventDefault();
                props.addInvoiceDate(e.target.value);
              }}
            />
          </div>
        </div>

        {/* <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="date">
              Transaction Date
              <span className="text-danger"> * </span>
            </label>

            <input
              id="date"
              type="datetime-local"
              value={props.transaction_time_date}
              className="form-control"
              onChange={(e) => {
                e.preventDefault();
                props.addTransactionDate(e.target.value);
              }}
            />
          </div>
        </div> */}

        <div className="col-md-4">
          <div className="form-group">
            <label>Invoice Attachment</label>
            <div className="custom-file">
              <input
                type="file"
                className={`custom-file-input ${
                  props?.errors?.invoice_attachment ? `is-invalid` : ``
                }`}
                name="invoice_attachment"
                onChange={(e) => {
                  e.preventDefault();
                  props.addInvoiceAttachment(e.target.files[0]);
                }}
                id="invoice_attachment"
              />
              <label className="custom-file-label" htmlFor="invoice_attachment">
                <span
                  className="d-inline-block text-truncate w-75"
                  id="invoice_attachment_text"
                >
                  doc, pdf, xls, csv or image
                </span>
              </label>

              <div
                className={
                  props?.errors?.invoice_attachment ? `invalid-feedback` : ``
                }
              >
                {props?.errors?.invoice_attachment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addChalanNumber: (chalan_number) =>
      dispatch({ type: ADD_CHALAN_NUMBER, payload: { chalan_number } }),
    addChalanDate: (chalan_date) =>
      dispatch({ type: ADD_CHALAN_DATE, payload: { chalan_date } }),
    addChalanAttachment: (chalan_attachment) =>
      dispatch({
        type: ADD_CHALAN_ATTACHMENT,
        payload: { chalan_attachment },
      }),
    addInvoiceNumber: (invoice_number) =>
      dispatch({ type: ADD_INVOICE_NUMBER, payload: { invoice_number } }),
    addInvoiceDate: (invoice_date) =>
      dispatch({ type: ADD_INVOICE_DATE, payload: { invoice_date } }),
    addTransactionDate: (transaction_time_date) => {
      //console.log(transaction_time_date),
      dispatch({
        type: ADD_TRANSACTION_DATE,
        payload: { transaction_time_date },
      });
    },

    addInvoiceAttachment: (invoice_attachment) =>
      dispatch({
        type: ADD_INVOICE_ATTACHMENT,
        payload: { invoice_attachment },
      }),
  };
};

const mapStateToProps = (store) => {
  const {
    chalan_number,
    chalan_date,
    chalan_attachment,
    invoice_number,
    invoice_date,
    transaction_time_date,
    invoice_attachment,
    errors,
  } = store.uPurchaseCart;

  return {
    chalan_number,
    chalan_date,
    chalan_attachment,
    invoice_number,
    invoice_date,
    transaction_time_date,
    invoice_attachment,
    errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseInfo);
