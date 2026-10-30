import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import Storage from "../../Helpers/Auth/Storage";
import process from "../../next.config";

const WalletBalance = () => {
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.00");
  useEffect(() => {
    let mounted = true;

    if (!Storage.isLoggedIn()) {
      Router.push("/auth/sly-login");
    } else {
      setLoading(true);
      getWalletBalance().then((response) => {
        response.data &&
          response.data.balance &&
          setWalletBalance(response.data.balance);
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const getWalletBalance = async () => {
    return await axios
      .get(`${process.env.api_url}/get-wallet-balance`)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });
  };
  const meta = {
    title: `Wallet - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
      {loading ? (
        <>
          <SiteHeader {...meta} />
          <Layout>
            <section className="custom-card">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7 mb-3">
                    <div className="custom-card-box">
                      <div className="custom-card-box-header">
                        <div className="fbh-title">
                          <i className="icon-list2" />
                          <h2>Wallet Information</h2>
                        </div>
                      </div>
                      <div className="custom-card-box-content p-md-3 p-2">
                        <p>
                          Wallet Balance: <b>BDT {walletBalance}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Layout>
        </>
      ) : (
        <>
          <div
            style={{ display: "flex", alignItems: "center", height: "100vh" }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <img src="/processing-loder/loader.gif" />
              <h1> Please wait</h1>
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default WalletBalance;
