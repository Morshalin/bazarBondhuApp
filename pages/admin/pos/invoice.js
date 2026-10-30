import React, { useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Storage from "../../../Helpers/Auth/Storage";
import { useKeyPress } from "../../../Helpers/Utils/Utils";

const Invoice = () => {
  const { asPath, route, query } = useRouter();
  const [invoiceDetails, setInvoiceDetails] = useState("");
  const enterKey = useKeyPress("Enter");

  useEffect(() => {
    let isMounted = true;
    axios.defaults.headers.Authorization = `Bearer ${Storage.getToken()}`;

    const getInvoiceDetails = async () => {
      const api_url = `${process.env.api_backend_url}/get-invoice-details`;
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
        console.log(response.data);
      } else {
        setInvoiceDetails("");
      }
    };

    if (asPath !== route) {
      getInvoiceDetails();
    }

    return () => (isMounted = false);
  }, [asPath, route, query]);

  useEffect(() => {
    //enterKey && window.print();

    const backToPosPrint = (event) => {
      event.preventDefault();
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        window.print();
      } else if (event.code === "Delete") {
        window.close();
      }
    };
    document.addEventListener("keydown", backToPosPrint);
    return () => {
      document.removeEventListener("keydown", backToPosPrint);
    };
  }, []);

  return (
    <>
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
            onClick={() => {
              window.print();
            }}
          >
            Print
          </button>
        </div>
        <div></div>
        {invoiceDetails && (
          <div className="invoice-data">
            <div className="shop-details">
              <img
                className="shop-logo"
                src={`${invoiceDetails.shop.shop_logo}`}
                alt={invoiceDetails.shop.name ?? ''}
              />
              <p>{`${invoiceDetails.shop.address ?? ''}, ${invoiceDetails.shop.city ?? ''}${invoiceDetails.shop.zip_code ? ' - '+invoiceDetails.shop.zip_code : ''}, ${invoiceDetails.shop.country ?? ''}`}</p>
              <p>Hotline: {invoiceDetails.shop.mobile ?? ''}</p>
              {
                invoiceDetails.shop.vat_reg && (
                  <p>VAT Reg. : {invoiceDetails.shop.vat_reg}</p>
                )
              }

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
                              {++index}. {product.productDetails.product.name}
                            </span>
                            <span className="price-cal">
                              [ {product.quantity_unit} * {product.unit_price} ]

                            </span>
                          </p>
                          {product.productDetails.barcode}
                        </td>
                        <td className="text-right">{product.sub_total.toFixed(2)}</td>
                      </tr>
                    ))}
                  {invoiceDetails.saleCustomProducts &&
                    invoiceDetails.saleCustomProducts.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <p className="pid_n_qnt">
                            <span>
                              {++index}
                            </span>
                            <span className="price-cal">
                              [ {product.quantity} * {product.unit_price} ]

                            </span>
                          </p>
                          {product.name}
                        </td>
                        <td className="text-right">{parseFloat(product.price).toFixed(2)}</td>
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
                      <strong>{invoiceDetails.delivery_charge.toFixed(2)}</strong>
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
              <div>P. Amount: {invoiceDetails.pos_amount.toFixed(2)}</div>
              {
                (invoiceDetails.wallet_adjustment !== 0 &&
                  (
                    <div>Wallet Adjustment: {invoiceDetails.wallet_adjustment.toFixed(2)}</div>
                  )
                )
              }
              {
                (invoiceDetails.wallet_adjustment === 0 &&
                  (
                    <div>{(invoiceDetails.grand_total - invoiceDetails.pos_amount) > 0 ? 'Due' : 'Return'}: {invoiceDetails.change_return.toFixed(2)}</div>
                  )
                )
              }

            </div>
            <div className="print-dialog text-center">
              <p>
                <strong>Thank you for using {process.env.app_name}</strong>
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
// export const getServerSideProps = async (ctx) => {
//     const {req, res} = ctx;
//     const api_url = process.env.api_url;
//     let order_id = ctx.query.id;
//     if (!req.headers.cookie) {
//         res.writeHead(302, {Location: "/auth/login"});
//         res.end();
//     }
//     const cookieValue = await req.headers.cookie
//         .split("; ")
//         .find((row) => row.startsWith("token"))
//         .split("=")[1];

//     if (order_id) {
//         let response = await axios.post(`https://pos.desktopit.org/api/v1/backend/get-invoice-details`, {order_id: order_id}, {
//             headers: {
//                 authorization: `bearer ${cookieValue}`,
//             },
//         }).then((result) => {
//             return result.data;
//         }).catch((exception) => {
//             return exception;
//         });
//         if (response.success) {
//             return {props: {sales: response.data}}
//         } else {
//             return {props: {sales: []}}
//         }
//     } else {
//         return {props: {sales: []}}
//     }
// }
export default Invoice;
