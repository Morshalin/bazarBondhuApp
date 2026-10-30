import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import HomeCategory from "../components/Frontend/Container/Home/Category";
import PopularProduct from "../components/Frontend/Container/Home/PopularProduct";
import HomeSearch from "../components/Frontend/Container/Home/Search";
import SiteHeader from "../components/Frontend/Header/SiteHeader";
import Layout from "../components/Frontend/Layout/Layout";
import {
  SET_HOME_CATEGORIES,
  SET_MENU_CATEGORIES,
} from "../store/frontend/actions/menuActions";
// import { SET_AUTHORIZATION } from "../store/permission/actions/permissionActions";

// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Index = (props) => {
  const { t } = useTranslation("common");
  //console.log(language.translate('app'))

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

  const [homeSliders, setHomeSliders] = useState("");

  useEffect(() => {
    let mounted = true;

    mounted &&
      getMenuHomeCategories().then((response) => {
        if (response.mResponse.success) {
          props.setMenuCategories(response.mResponse.data);
          // props.set_authorization(
          //     response.mResponse.config.permissions
          // );
        }

        if (response.hResponse.success) {
          props.setHomeCategories(response.hResponse.data);
        }
      });

    mounted &&
      getHomeSlider()
        .then((responses) => {
          if (responses.success) {
            setHomeSliders(responses.data);
          } else {
            throw "something gone wrong";
          }
        })
        .catch((errors) => {
          console.error(errors);
        });

    return () => {
      mounted = false;
    };
  }, []);

  const getMenuHomeCategories = async () => {
    let mCategoryUrl = `${process.env.api_url}/getAllCategoryWithChild/menuShow`;
    let hCategoryUrl = `${process.env.api_url}/category`;

    let mResponse = await axios
      .get(mCategoryUrl)
      .then((res) => res.data)
      .catch((err) => err);
    let hResponse = await axios
      .post(hCategoryUrl, { type: "home" })
      .then((res) => res.data)
      .catch((err) => err);

    return { mResponse, hResponse };
  };

  const getHomeSlider = async () => {
    return await axios
      .get(`${process.env.api_url}/home-slider`)
      .then((responses) => responses.data)
      .catch((errors) => errors);
  };

  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <header className="home-slider">
          {homeSliders.length > 0 && (
            <div className="home-slider-wrap">
              <div
                id="carouselHomeCaptions"
                className="carousel slide carousel-fade"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {homeSliders.map((homeSlider, index) => (
                    <li
                      key={index}
                      data-target="#carouselHomeCaptions"
                      data-slide-to={index}
                      className={index == 0 ? "active" : ""}
                    />
                  ))}
                </ol>
                <div className="carousel-inner">
                  {homeSliders.map((homeSlider, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index == 0 ? "active" : ""}`}
                    >
                      <Link legacyBehavior href={homeSlider.hyper_link}>
                        <a>
                          <img
                            src={homeSlider.slider_image}
                            className="d-block w-100"
                            alt={homeSlider.title}
                          />
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselHomeCaptions"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselHomeCaptions"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          )}
        </header>

        <HomeSearch />

        <HomeCategory />

        <section className="top-banner">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-md-12">
                <div className="top-banner-img">
                  <Link legacyBehavior href="/custom-order">
                    <a>
                      <img src="/img/banner/banner.jpg" alt="top banner" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PopularProduct />

        <section className="class_name">
          <div className="container">
            <div className="row">
              <div className="col-md-12"></div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ["common"])),
//   },
// });

const mapDispatchToProps = (dispatch) => {
  return {
    setMenuCategories: (menu_categories) =>
      dispatch({
        type: SET_MENU_CATEGORIES,
        payload: { menu_categories },
      }),
    setHomeCategories: (home_categories) =>
      dispatch({
        type: SET_HOME_CATEGORIES,
        payload: { home_categories },
      }),
    // set_authorization: (permissions) =>
    //   dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
  };
};

const mapStateToProps = (store) => {
  const { menuCategories, homeCategories } = store.menuStore;

  return { menuCategories, homeCategories };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
