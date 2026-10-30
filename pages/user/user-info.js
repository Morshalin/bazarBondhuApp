/* eslint-disable prettier/prettier */

import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddDeliveryAddress from "../../components/Frontend/Checkout/AddDeliveryAddress";
import DeliveryAddresses from "../../components/Frontend/Checkout/Addresses";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import ProfileInfo from "../../components/Frontend/User/ProfileInfo";
import Storage from "../../Helpers/Auth/Storage";
import process from "../../next.config";
import {
  SET_ALL_AREAS,
  SET_AREAS,
  SET_AUTH_USER,
  SET_CUSTOMER_ALL_ADDRESSES,
  SET_LOCATIONS,
} from "../../store/frontend/actions/deliveryActions";
import { SET_AUTHENTICATE_USER } from "../../store/frontend/actions/cartAction";

const UserInfo = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => { (async () => {
    let mounted = true;

    if (!Storage.isLoggedIn()) {
      Router.push("/auth/sly-login");
    } else {
      setLoading(true);
      await getDeliveryData();
    }

    return () => {
      mounted = false;
    };
  })(); }, []);

  const getDeliveryData = async () => {
    let customerAddressApiRequest = axios.get(
      `${process.env.api_url}/customer-address-by-id`
    );
    let locationApiRequest = axios.get(`${process.env.api_url}/locations`);
    let areaApiRequest = axios.get(`${process.env.api_url}/areas`);
    let authUserRequest = axios.get(
      `${process.env.api_url}/auth/customers/authUser`
    );

    await axios
      .all([
        customerAddressApiRequest,
        locationApiRequest,
        areaApiRequest,
        authUserRequest,
      ])
      .then(
        axios.spread((...responses) => {
          // Customer Address Response
          if (responses[0].data.success) {
            props.setCustomerAllAddresses(responses[0].data.data);
          }

          // Location Response
          if (responses[1].data.success) {
            props.setLocations(responses[1].data.data);
          }

          // Area Response
          if (responses[2].data.success) {
            props.setAreas(responses[2].data.data);
            props.setAllAreas(responses[2].data.data);
          }

          // Auth User Profile Response
          if (responses[3].data.success) {
            props.setAuthUser(responses[3].data.data);
          }
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };
  const meta = {
    title: `User Info - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
      <SiteHeader {...meta} />
      <Layout>
        <section className="checkout">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <ProfileInfo />

                <div className="card checkout-details-card rounded-0 mb-4">
                  <div className="card-header">
                    <span className="badge">02</span>Delivery Address
                  </div>
                  <div className="card-body">
                    <div className="delivery-address">
                      <DeliveryAddresses />

                      {props.expandAddDelivery && <AddDeliveryAddress />}
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

const mapStateToProps = (store) => {
  const { expandAddDelivery } = store.deliveryStore;

  return { expandAddDelivery };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCustomerAllAddresses: (addresses) =>
      dispatch({ type: SET_CUSTOMER_ALL_ADDRESSES, payload: { addresses } }),
    setLocations: (locations) =>
      dispatch({ type: SET_LOCATIONS, payload: { locations } }),
    setAreas: (areas) => dispatch({ type: SET_AREAS, payload: { areas } }),
    setAllAreas: (allAreas) =>
      dispatch({ type: SET_ALL_AREAS, payload: { allAreas } }),
    setAuthUser: (userData) =>
      dispatch({ type: SET_AUTHENTICATE_USER, payload: { userData } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
