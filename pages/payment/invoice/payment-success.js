import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const PaymentSuccess = () => {
  const { asPath, route, query } = useRouter();
  //console.log(query.order_id);

  const [paymentDetails, setPaymentDetails] = useState("");
  const meta = {
    title: `Payment Success - ${process.env.app_name}`,
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

  useEffect(() => {
    let isMounted = true;
    const paymentVerificationCheck = async () => {
      const api_url = `${process.env.api_url}/sp-check-payment-verification`;
      const order_id = query.order_id;
      const response = await axios
        .post(api_url, { order_id: order_id })
        .then((result) => {
          return result.data;
        })
        .catch((exception) => {
          return exception;
        });
      if (response.success) {
        setPaymentDetails(response.data);
      } else {
        setPaymentDetails("");
      }
    };

    if (asPath !== route) {
      paymentVerificationCheck();
    }

    return () => (isMounted = false);
  }, [asPath, route, query]);

  return (
    <>
      <SiteHeader {...meta} />
      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1>Thank You !</h1>
          <p>Your payment has been successfully procced .</p>
          <br />
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
