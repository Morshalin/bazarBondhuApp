import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import DeliveryAddress from "../../components/Frontend/Checkout/DeliveryAddress";
import ProceedCheckout from "../../components/Frontend/Checkout/ProceedCheckout";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import Storage from "../../Helpers/Auth/Storage";
import {
  SET_ALL_AREAS,
  SET_AREAS,
  SET_AUTH_USER,
  SET_CUSTOMER_ALL_ADDRESSES,
  SET_LOCATIONS,
} from "../../store/frontend/actions/deliveryActions";
import { SHOW_CART_MENU } from "../../store/frontend/actions/productAction";
import PersonalDetails from "../../components/Frontend/Checkout/PersonalDetails";
import { SET_AUTHENTICATE_USER } from "../../store/frontend/actions/cartAction";

const Checkout = (props) => {
  const [paymentLoadingState, setPaymentLoadingState] = useState(false);
  const [checkCartEmpty, setCheckCartEmpty] = useState(true);
  const router = useRouter();

  const changeLoadingPaymentGateway = (status) => {
    setPaymentLoadingState(status);
  };

  const api_url = process.env.api_url;

  useEffect(() => {
    if (!Storage.isLoggedIn()) {
      router.replace("/auth/sly-login");
    } else if (props.cartStore.cart.length <= 0) {
      router.replace("/");
    } else {
      setCheckCartEmpty(false);
    }
  }, [props.cartStore.cart]);

  useEffect(() => { (async () => {
    await getDeliveryData();

    props.showCartMenu(false);
  })(); }, []);

  const getDeliveryData = async () => {
    let customerAddressApiRequest = axios.get(
      `${api_url}/customer-address-by-id`
    );
    let locationApiRequest = axios.get(`${api_url}/locations`);
    let areaApiRequest = axios.get(`${api_url}/areas`);
    let authUserRequest = axios.get(`${api_url}/auth/customers/authUser`);

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
    title: `Checkout - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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

  if (checkCartEmpty) {
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

  return paymentLoadingState ? (
    <>
      <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <img src="/processing-loder/loader.gif" />
          <h1>Please wait</h1>
          <p> System redirect you to payment gateway, within 5 seconds..</p>
          <br />
        </div>
      </div>
    </>
  ) : (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="checkout">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                {/*<div className='card checkout-details-card rounded-0 mb-4'>*/}
                {/*	<DeliveryDetails />*/}
                {/*</div>*/}

                <div className="card checkout-details-card rounded-0 mb-4">
                  <PersonalDetails />
                </div>

                <div className="card checkout-details-card rounded-0 mb-4">
                  <DeliveryAddress />
                </div>

                <div className="card checkout-details-card rounded-0 mb-4">
                  <ProceedCheckout
                    changeLoadingPaymentGateway={changeLoadingPaymentGateway}
                  />
                </div>

                {/*<div className="card checkout-details-card rounded-0 mb-4">*/}
                {/*    <PaymentOption/>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// Checkout.getInitialProps = async (ctx) => {
//
//     const api_url = process.env.api_url;
//
//     let address = [];
//     let locations = [];
//     let areas = [];
//     let serverSide = false;
//     let authUser = '';
//
//     if (ctx.req) {
//         serverSide = true;
//
//         let tokenData = ctx.req.headers.cookie ?
//             ctx.req.headers.cookie.split('; ')
//                 .find(row => row.startsWith('token')) : '';
//
//         let token = tokenData ? tokenData.split('=')[1] : '';
//
//         axios.defaults.headers.Authorization = `Bearer ${token}`;
//
//
//         let customerAddressApiRequest = axios.get(`${api_url}/customer-address-by-id`);
//         let locationApiRequest = axios.get(`${api_url}/locations`);
//         let areaApiRequest = axios.get(`${api_url}/areas`);
//         let authUserRequest = axios.get(`${api_url}/auth/customers/authUser`);
//
//
//         await axios.all([customerAddressApiRequest, locationApiRequest, areaApiRequest, authUserRequest])
//             .then(
//                 axios.spread((...responses) => {
//
//                     // Customer Address Response
//                     if (responses[0].data.success) {
//                         address = responses[0].data.data;
//                     }
//
//                     // Location Response
//                     if (responses[1].data.success) {
//                         locations = responses[1].data.data;
//                     }
//
//                     // Area Response
//                     if (responses[2].data.success) {
//                         areas = responses[2].data.data;
//                         console.log(areas);
//                     }
//
//                     // Auth User Profile Response
//                     if (responses[3].data.success) {
//                         authUser = responses[3].data.data;
//                     }
//
//
//                 }))
//             .catch(errors => {
//                 console.log(errors)
//             });
//
//         return {address: address, locations: locations, areas: areas, authUser: authUser, serverSide: serverSide};
//     }
//
//
//     return {address: address, locations: locations, areas: areas, authUser: authUser, serverSide: serverSide};
//
// }

const mapStateToProps = (store) => {
  const { cartStore, deliveryStore } = store;

  return { cartStore, deliveryStore };
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
    showCartMenu: (show) =>
      dispatch({ type: SHOW_CART_MENU, payload: { show } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
