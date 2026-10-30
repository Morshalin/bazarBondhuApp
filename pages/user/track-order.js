import React, { useState } from "react";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import axios from "axios";

const TrackOrder = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [actionMenus, setActionMenus] = useState("");
  const [trackOrderData, setTrackOrderData] = useState("");

  const trackOrder = async () => {
    let response = await axios
      .post(`/track-order`, {
        phone_number: phoneNumber,
        order_number: orderNumber,
      })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });
    if (response.success) {
      setActionMenus(response.data.actionMenu);
      setTrackOrderData(response.data.trackingInfo);
    }
  };
  const currentStatus = () => {};
  const meta = {
    title: `Track Order - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
    keywords:
      "bangladesh online grocery, bangladesh bazaar, best bazaar, daily bazaar, daily shop, large shop, bd shop, shop, online store,  buy, sell, home shop, Meat, Oil, Chal, Free home delivery, Fresh vegetables, formalin free, free return",
    description:
      "Order grocery and food online with same-day home delivery. Save money, save time",
    ogTitle: `${process.env.app_name} Online Grocery Shopping and Delivery in Dhaka | Buy fresh food items, personal care, baby products and more`,
    ogType: "website",
    ogImage: "/img/banner/banner.jpg",
    ogSiteName: `${process.env.app_name}`,
    ogDescription:
      "Order grocery and food online with same-day home delivery. Save money, save time",
  };

  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="custom-card track-order">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="custom-card-box">
                  <div className="custom-card-box-header">
                    <div className="fbh-title">
                      <i className="icon-shipping-fast-solid" />
                      <h2>Track Order Status</h2>
                    </div>
                    <div className="fbh-info">
                      <p>
                        Please enter the <strong>Phone and Order Number</strong>{" "}
                        for track your order status
                      </p>
                    </div>
                  </div>
                  <div className="custom-card-box-content">
                    <form>
                      <div className="row">
                        <div className="col-md-8 col-xl-6  offset-md-2 offset-xl-3">
                          <div class="form-group row">
                            <label
                              className="col-lg-4 col-form-label"
                              title="Enter Phone Number"
                            >
                              Phone Number
                            </label>
                            <div className="col-lg-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                                onChange={(event) => {
                                  event.preventDefault();
                                  setPhoneNumber(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              className="col-md-4 col-form-label"
                              title="Enter Order Number"
                            >
                              Order Number
                            </label>
                            <div className="col-md-8">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Order number"
                                id="order_number"
                                name="order_number"
                                onChange={(event) => {
                                  event.preventDefault();
                                  setOrderNumber(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-4 col-form-label" />
                            <div className="col-md-8">
                              <button
                                className="btn btn-info rounded-0"
                                onClick={(event) => {
                                  event.preventDefault();
                                  trackOrder();
                                }}
                              >
                                Track Order Status
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {trackOrderData ? (
                      <div className="order-status-wrap">
                        {trackOrderData &&
                          trackOrderData.map((track, index) => (
                            <div
                              key={index}
                              className="order-status-dev active"
                            >
                              <div className="order-status-type">
                                <div className="ost-icon">
                                  <i className="icon-cart-full" />
                                </div>
                                <div className="ost-text">
                                  <div className="ost-text-name">
                                    {track.status_name}
                                  </div>
                                  <div className="ost-text-sub">
                                    {track.time}
                                  </div>
                                </div>
                              </div>
                              <div className="order-status-action">
                                <i className="icon-checkmark" />
                              </div>
                            </div>
                          ))}

                        {/*<div class="order-status-dev active">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-check-square-regular"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">Order Confirmed</div>*/}
                        {/*            <div class="ost-text-sub">23 Feb 21 - 10.01 AM</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div class="order-status-dev">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-gift-1"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">Product Packing</div>*/}
                        {/*            <div class="ost-text-sub">Estimate: Very soon</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div class="order-status-dev">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-dolly-solid"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">Ready for shipment</div>*/}
                        {/*            <div class="ost-text-sub">Estimate: Very soon</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div class="order-status-dev">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-shipping-fast-solid"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">On the way</div>*/}
                        {/*            <div class="ost-text-sub">Estimate: Very soon</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div class="order-status-dev">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-truck-loading-solid"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">Dropped in the delevery station</div>*/}
                        {/*            <div class="ost-text-sub">Estimate: Very soon</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div class="order-status-dev">*/}
                        {/*    <div class="order-status-type">*/}
                        {/*        <div class="ost-icon">*/}
                        {/*            <i class="icon-user-check"></i>*/}
                        {/*        </div>*/}
                        {/*        <div class="ost-text">*/}
                        {/*            <div class="ost-text-name">Delivered</div>*/}
                        {/*            <div class="ost-text-sub">Estimate: Very soon</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div class="order-status-action">*/}
                        {/*        <i class="icon-checkmark"></i>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                      </div>
                    ) : (
                      ""
                    )}
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

export default TrackOrder;
