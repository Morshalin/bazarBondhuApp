import React, { useEffect, useState } from "react";
import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import Layout from "../../../components/Frontend/Layout/Layout";
import { useRouter } from "next/router";
import { showActions } from "../../../Helpers/Utils/Utils";
import BarcodeGenerator from "../../../components/Admin/Barcode/Generate/BarcodeGenerator";

const Invoice = () => {
  const router = useRouter();

  const { id } = router.query;

  const [order, setOrder] = useState("");

  useEffect(() => {
    let mounted = true;
    id &&
      showActions(`backend/sales/${id}`)
        .then((res) => {
          setOrder(res.data);
        })
        .finally(() => (mounted = false));
  }, [id]);

  return (
    <>
      <SiteHeader />
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="pos-invoice-print-wrap big-invoice">
                  <div className="hidden-print">
                    <button
                      className="hp-btn hp-back"
                      onClick={() => {
                        router.push({
                          pathname: `/user/order-info`,
                        });
                      }}
                    >
                      Back
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
                  <div className="invoice-data">
                    <div className="shop-details">
                      <img
                        className="shop-logo"
                        src={`${process.env.base_url}/images/shop/shop_logo/logo.png`}
                        alt="dorkaari"
                      />
                      <div className="shop-address-wlogo">
                        <div className="sawl-wrap">
                          <p>
                            Address:{" "}
                            {order &&
                              order.shop &&
                              `${order.shop.address}, ${order.shop.city}-${order.shop.zip_code}, ${order.shop.country}`}
                          </p>
                          {/*<p>Tejgaon Industrial Area, Dhaka-1208.</p>*/}
                          <p>
                            Hotline: {order && order.shop && order.shop.phone}
                          </p>
                          <p>
                            E-mail:{" "}
                            {order && order.shop && order.shop.shop_email}
                          </p>
                          <p>Fb: {order && order.shop && order.shop.fb}</p>
                        </div>
                        <div className="sawl-bar">
                          <div className="slime-bar"></div>
                          <div className="fat-bar"></div>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-status">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="billing-address">
                            <h4>Billing Address</h4>
                            <p>{order && order.customer_name}</p>
                            {/*<p>22 Asam Colony, Power House more</p>*/}
                            {/*<p>Shalbagan, Rajshahi</p>*/}
                            <p>{order && order.address}</p>
                            <p>Bangladesh</p>
                            <p>{order && order.customer_phone}</p>
                          </div>
                        </div>
                        <div className="col-md-6 text-left text-md-right">
                          <div className="invoice-status-date">
                            <p className="inv-sta due-invoice">
                              <span>Invoice</span>

                              {order.payment_status ? (
                                <span className="status-paid">
                                  {order.payment_status}
                                </span>
                              ) : (
                                <span className="status-due">Due</span>
                              )}
                              {/*<span className="status-paid"> Paid</span>*/}
                              {/*<span className="status-due"> Due</span>*/}
                            </p>
                            <p className="inv-date">
                              DATE: {order && order.order_date}
                            </p>
                          </div>
                          <div className="invoice-barcode">
                            {/*<img src="/img/invoice-barcode.png" alt="barcode image"/>*/}
                            <BarcodeGenerator barcode={order.order_number} />
                            <p>#{order && order.order_number}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="invoice-purchase">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Item Description</strong>
                            </td>
                            <td className="text-center">
                              <strong>Qty</strong>
                            </td>
                            <td className="text-center">
                              <strong>Price</strong>
                            </td>
                            <td className="text-right">
                              <strong>Amount</strong>
                            </td>
                          </tr>
                          {order &&
                            order.saleProducts &&
                            order.saleProducts.length > 0 &&
                            order.saleProducts.map((product, index) => (
                              <tr>
                                <td key={product.id}>
                                  <p className="pid_n_qnt">
                                    <span>
                                      {++index}.{" "}
                                      {product.productDetails.barcode} -{" "}
                                      {product.name}
                                    </span>
                                  </p>
                                </td>
                                <td className="text-center">
                                  {product.quantity}
                                </td>
                                <td className="text-center">
                                  {product.unit_price}
                                </td>
                                <td className="text-right">
                                  {product.sub_total}
                                </td>
                              </tr>
                            ))}

                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>{order && order.sub_total}</strong>
                            </td>
                          </tr>

                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Shipping</strong>
                            </td>
                            <td className="text-right">
                              <strong>
                                {order &&
                                  order.slot_charge + order.delivery_charge}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Discount</strong>
                            </td>
                            <td className="text-right">
                              <strong>{order && order.coupon_discount}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Grand Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>{order && order.grand_total}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {order.payment_status && (
                      <div className="end-summery">
                        <div>Paid by: {order.payment_method}</div>
                        <div>Change: {order.change_return}</div>
                      </div>
                    )}

                    <div className="print-dialog text-center">
                      <p>
                        <strong>
                          Thank you for choosing {process.env.app_name}
                        </strong>
                      </p>
                    </div>
                    <div className="print-powered-by">
                      <p>☼ Powered by Desktop IT ☼</p>
                      <p>▬ Contact: 01913800800 ▬</p>
                      <p>▬ Website:desktopit.net ▬</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Invoice;
