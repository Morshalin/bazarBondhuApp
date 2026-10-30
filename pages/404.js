import React, { useEffect, useState } from "react";
import SiteHeader from "../components/Admin/Header/AdminHeader";
import LayoutPos from "../components/Admin/Layout/LayoutPos";

const CustomError = () => {
  const meta = {
    // title: "Home - " + t("app_name"),
    title: `${process.env.app_name} - বাংলাদেশের প্রথম ডিজিটাল কমার্স - ডি-কমার্স`,
    keywords:
      "bangladesh online grocery, bangladesh bazaar, best bazaar, daily bazaar, daily shop, large shop, bd shop, shop, online store,  buy, sell, home shop, Meat, Oil, Chal, Free home delivery, Fresh vegetables, formalin free, free return",
    description:
      "Order grocery and food online with same-day home delivery. Save money, save time",
    ogTitle: `${process.env.app_name} Online Grocery Shopping and Delivery in Dhaka | Buy fresh food items, personal care, baby products and more`,
    ogType: "website",
    ogImage: "/img/banner/banner.png",
    ogSiteName: process.env.app_name,
    ogDescription:
      "Order grocery and food online with same-day home delivery. Save money, save time",
  };

  return (
    <>
      <SiteHeader {...meta} />
      <LayoutPos>
        <div className="text-center mt-5">
          <h1 className="mt-5">You don't have permission to access this page.</h1>
        </div>

      </LayoutPos>
    </>
  );
};

export default CustomError;
