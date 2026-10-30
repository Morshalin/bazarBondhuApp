import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import React from "react";
import Layout from "../../components/Frontend/Layout/Layout";

const Invoice = () => {
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
                    <button className="hp-btn hp-back">Back</button>
                    <button className="hp-btn hp-print">Print</button>
                  </div>
                  <div></div>
                  <div className="invoice-data">
                    <div className="shop-details">
                      <img
                        className="shop-logo"
                        src="/img/dorkaari-logo-big-invoice.png"
                        alt="dorkaari"
                      />
                      <div className="shop-address-wlogo">
                        <div className="sawl-wrap">
                          <p>Address: 20/2, Kunipara, Babli</p>
                          <p>Tejgaon Industrial Area, Dhaka-1208.</p>
                          <p>Hotline: 01958042251-2</p>
                          <p>E-mail: info@dorkaari.com</p>
                          <p>Fb: facebookcom/dorkaarifb</p>
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
                            <p>MD Sakan Jabin Shad</p>
                            <p>22 Asam Colony, Power House more</p>
                            <p>Shalbagan, Rajshahi</p>
                            <p>Bangladesh</p>
                            <p>+880 1718659502</p>
                          </div>
                        </div>
                        <div className="col-md-6 text-left text-md-right">
                          <div className="invoice-status-date">
                            <p className="inv-sta due-invoice">
                              <span>Invoice</span>
                              <span className="status-paid"> Paid</span>
                              <span className="status-due"> Due</span>
                            </p>
                            <p className="inv-date">
                              DATE: 08-04-2021 12:30:61 PM
                            </p>
                          </div>
                          <div className="invoice-barcode">
                            <img
                              src="/img/invoice-barcode.png"
                              alt="barcode image"
                            />
                            <p>#9876543210</p>
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
                          <tr>
                            <td>
                              <p className="pid_n_qnt">
                                <span>1. 60538047 - Mini Pack Shampoo 4tk</span>
                              </p>
                            </td>
                            <td className="text-center">4</td>
                            <td className="text-center">50</td>
                            <td className="text-right">200</td>
                          </tr>
                          <tr>
                            <td>
                              <p className="pid_n_qnt">
                                <span>2. 11001104 - Athas Chal</span>
                              </p>
                            </td>
                            <td className="text-center">4</td>
                            <td className="text-center">50</td>
                            <td className="text-right">200</td>
                          </tr>
                          <tr>
                            <td>
                              <p className="pid_n_qnt">
                                <span>3. 49318047 - Mini Pack Shampoo 2tk</span>
                              </p>
                            </td>
                            <td className="text-center">4</td>
                            <td className="text-center">50</td>
                            <td className="text-right">200</td>
                          </tr>
                          <tr>
                            <td>
                              <p className="pid_n_qnt">
                                <span>4. 11001102 - Miniket Chal</span>
                              </p>
                            </td>
                            <td className="text-center">4</td>
                            <td className="text-center">50</td>
                            <td className="text-right">200</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>800.00</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Shipping</strong>
                            </td>
                            <td className="text-right">
                              <strong>50.00</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Discount</strong>
                            </td>
                            <td className="text-right">
                              <strong>00.00</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-right">
                              <strong>Grand Total</strong>
                            </td>
                            <td className="text-right">
                              <strong>850.00</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="end-summery">
                      <div>Paid by: Cash</div>
                      <div>P. Amount: 128.00</div>
                      <div>Change: 0</div>
                    </div>
                    <div className="print-dialog text-center">
                      <p>
                        <strong>
                          Thank you for using {process.env.app_name}
                        </strong>
                      </p>
                    </div>
                    <div className="print-powered-by">
                      <p>☼ Powered by Desktop IT ☼</p>
                      <p>▬ Contact: 01913800800 ▬</p>
                      <p>▬ Website: Desktopit.net ▬</p>
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
