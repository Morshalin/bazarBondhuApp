import Router from "next/router";
import React, { useEffect, useState } from "react";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import OrderDetails from "../../components/Frontend/Order/OrderDetails";
import OrderList from "../../components/Frontend/Order/OrderList";
import OrderPaymentHistory from "../../components/Frontend/Order/OrderPaymentHistory";
import OrderProcessing from "../../components/Frontend/Order/OrderProcessing";
import Storage from "../../Helpers/Auth/Storage";

const OrderInfo = () => {
  const metaData = {
    title: `Order Info - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!Storage.isLoggedIn()) {
      Router.push("/auth/sly-login");
    } else {
      setLoading(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!loading) {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <img src="/processing-loder/loader.gif" />
            <h1> Please wait</h1>
            <br />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader {...metaData} />
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <OrderList />
              <div className="col-md-5">
                <OrderDetails />
                <OrderProcessing />
                <OrderPaymentHistory />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default OrderInfo;
