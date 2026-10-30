import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import { saveToLocalStorage } from "../../../Helpers/Utils/Utils";

const Invoice = () => {
  const { asPath, route, query } = useRouter();
  const [invoiceDetails, setInvoiceDetails] = useState("");

  useEffect(() => {
    let isMounted = true;
    const getInvoiceDetails = async () => {
      const api_url = `${process.env.api_url}/get-payment-invoice-details`;
      const order_id = query.id;
      const response = await axios
        .post(api_url, { order_id: order_id })
        .then((result) => {
          return result.data;
        })
        .catch((exception) => {
          return exception;
        });
      if (response.success) {
        setInvoiceDetails(response.data);
      } else {
        setInvoiceDetails("");
      }
    };

    if (asPath !== route) {
      getInvoiceDetails();
    }

    return () => (isMounted = false);
  }, [asPath, route, query]);

  const payNow = async () => {
    let order_info = {
      return_url: `${process.env.app_url}/payment/invoice/payment-success`,
      cancel_url: `${process.env.app_url}/payment/invoice/payment-cancel`,
      amount: invoiceDetails.grand_total,
      order_id: invoiceDetails.order_number,
      customer_name: invoiceDetails.customer_name,
      customer_phone: invoiceDetails.customer_phone,
      customer_address: invoiceDetails.delivery_address_info
        ? invoiceDetails.delivery_address_info
        : "Customer Address",
      customer_city: invoiceDetails.shop?.city ?? "Customer City",
      client_ip: "101.125.001.01",
      value1: invoiceDetails.id,
    };
    await axios
      .post(`${process.env.api_url}/sp-generate-payment-link`, order_info)
      .then((result) => {
        console.log(result.data);
        if (result.data.success === true) {
          window.location.href = result.data.data.checkout_url;
        }
      })
      .catch((exception) => {
        console.log(exception);
      });
  };
  return (
    <>
      <SiteHeader />
      <div className="pos-invoice-print-wrap">
        <div className="hidden-print">
          <button
            className="hp-btn hp-back"
            onClick={() => {
              window.close();
            }}
          >
            Close
          </button>
          <button
            className="hp-btn hp-print"
            onClick={(event) => {
              event.preventDefault();
              payNow();
            }}
          >
            Pay Now
          </button>
        </div>
        <div></div>
        {invoiceDetails && (
          <div className="invoice-data">
            <div className="shop-details">
              <img
                className="shop-logo"
                src={`${invoiceDetails.shop.shop_logo}`}
                alt={invoiceDetails.shop.name}
              />
              <p>{`${invoiceDetails.shop.address}, ${invoiceDetails.shop?.city}-${invoiceDetails?.shop?.zip_code}, ${invoiceDetails.shop?.country}`}</p>
              <p>Hotline: {invoiceDetails.shop?.mobile}</p>
              {invoiceDetails.shop.vat_reg && (
                <p>VAT Reg. : {invoiceDetails.shop.vat_reg}</p>
              )}
            </div>
            <div className="invoice-details">
              <p>Invoice ID: {invoiceDetails.order_number}</p>
              <p>Date: {invoiceDetails.order_date}</p>
              <p>Biller: {invoiceDetails.biller_name}</p>
              <p>Customer: {invoiceDetails.customer_name}</p>
            </div>
            <div className="invoice-purchase">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Item Description</strong>
                    </td>
                    <td className="text-right">
                      <strong>Amount</strong>
                    </td>
                  </tr>
                  {invoiceDetails.saleProducts &&
                    invoiceDetails.saleProducts.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <p className="pid_n_qnt">
                            <span>
                              {++index}.{product.productDetails.product.name}
                            </span>
                            <span className="price-cal">
                              [ {product.quantity_unit} * {product.unit_price} ]
                            </span>
                          </p>
                          {product.productDetails.barcode}
                        </td>
                        <td className="text-right">
                          {product.sub_total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>{invoiceDetails.sub_total.toFixed(2)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Discount</strong>
                    </td>
                    <td className="text-right">
                      <strong>-{invoiceDetails.discount.toFixed(2)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>VAT(Included)</strong>
                    </td>
                    <td className="text-right">
                      <strong>{invoiceDetails.vat.toFixed(2)}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping</strong>
                    </td>
                    <td className="text-right">
                      <strong>
                        {invoiceDetails.delivery_charge.toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Grand Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>{invoiceDetails.grand_total.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="end-summery">
              <div>Paid by: {invoiceDetails.payment_method}</div>
              <div>Paid Amount: {invoiceDetails.pos_amount.toFixed(2)}</div>
              {invoiceDetails.wallet_adjustment !== 0 && (
                <div>
                  Wallet Adjustment:{" "}
                  {invoiceDetails.wallet_adjustment.toFixed(2)}
                </div>
              )}
              {invoiceDetails.wallet_adjustment === 0 && (
                <div>
                  {invoiceDetails.grand_total - invoiceDetails.pos_amount > 0
                    ? "Due"
                    : "Return"}
                  : {invoiceDetails.change_return.toFixed(2)}
                </div>
              )}
            </div>
            <div className="print-dialog text-center">
              <p>
                <strong>Thank you for choosing {process.env.app_name}</strong>
              </p>
            </div>
            <div className="print-powered-by">
              <p>☼ Powered by Desktop IT ☼</p>
              <p>▬ Contact: 01913800800 ▬</p>
              <p>▬ Website: desktopit.com.bd ▬</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Invoice;
