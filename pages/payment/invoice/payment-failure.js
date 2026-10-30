import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import React, { useEffect, useState } from "react";

const PaymentFailure = () => {
  const meta = {
    title: `Payment Failure - ${process.env.app_name}`,
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
      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>OOPS !!!</h1>
          <p>Sorry! Your Payment has been Declined.</p>
          <br />
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;
