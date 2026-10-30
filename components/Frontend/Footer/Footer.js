import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// import { getSiteSettings } from "../../../Helpers/Utils/Utils";

const Footer = () => {
  const [homeCategories, setHomeCategories] = useState("");
  const [shopData, setshopData] = useState("");
  const [sociallinks, setSociallinks] = useState(null);

  useEffect(() => {
    let mounted = true;

    mounted &&
      getMenuHomeCategories()
        .then((response) => {
          if (response.hResponse.success) {
            setHomeCategories(response.hResponse.data);
          }
        })
        .finally(() => {
          mounted = false;
        });
  }, []);

  // useEffect(() => {
  //   getSiteSettings().then((response) => {
  //     if (response.success) {
  //       setshopData(response.data);
  //       setSociallinks(response.data.social_links);
  //     }
  //   });
  // }, []);

  const getMenuHomeCategories = async () => {
    let hCategoryUrl = `${process.env.api_url}/category`;
    let hResponse = await axios
      .post(hCategoryUrl, { type: "home" })
      .then((res) => res.data)
      .catch((err) => err);
    return { hResponse };
  };

  return (
    <>
      <footer>
        <div className="footer-app-newsletter text-center">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 download-app">
                <h1>Download {process.env.app_name} App</h1>
                <div className="app-download-btn">
                  <button className="android-app-btn btn">
                    <i className="fab fa-google-play"></i>
                    <span className="get-it-on">Get Android App On</span>
                    <span className="get-from">Google Play</span>
                  </button>
                  <button className="ios-app-btn btn">
                    <i className="fab fa-app-store-ios"></i>
                    <span className="get-it-on">Get IOS App On</span>
                    <span className="get-from">App Store</span>
                  </button>
                </div>
              </div>
              <div className="col-md-6 subscribe-newsletter">
                <h1>Subscribe for latest offer</h1>
                <div className="subscribe-form">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your phone number"
                        required
                      />
                      <div className="input-group-append">
                        <button
                          className="btn"
                          type="button"
                          title="press the bell icon"
                        >
                          <i className="far fa-bell"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-details">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer-details-wrap">
                  <div className="footer-logo">
                    <a href="/">
                      {/*<img src={`${process.env.base_url}/images/shop/shop_logo/logo.png`} alt="logo"/> */}
                      <img src={"/img/logo.png"} alt="logo" />
                    </a>
                  </div>
                  <div className="footer-help-support">
                    <p className="f-hs">
                      <Link legacyBehavior
                        href={{
                          pathname: "/contactus",
                        }}
                      >
                        <a className="nav-link">Contact Us</a>
                      </Link>
                      <Link legacyBehavior
                        href={{
                          pathname: "/help/return-policy",
                        }}
                      >
                        <a className="nav-link">Returns policy</a>
                      </Link>
                      <Link legacyBehavior
                        href={{
                          pathname: "/help/refund-policy",
                        }}
                      >
                        <a className="nav-link">Refund policy</a>
                      </Link>
                      <Link legacyBehavior
                        href={{
                          pathname: "/help/faq",
                        }}
                      >
                        <a className="nav-link">FAQ.</a>
                      </Link>
                    </p>

                    <p className="f-si">
                      {sociallinks &&
                        sociallinks.map((socialLink, index) => (
                          <a href={socialLink.url} key={index++}>
                            <i
                              className={
                                socialLink.name === "facebook"
                                  ? "fab fa-facebook-f"
                                  : `fab fa-${socialLink.name}`
                              }
                            ></i>
                          </a>
                        ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer-product-cat">
                  <h1>Popular Category</h1>
                  <ul>
                    {homeCategories &&
                      homeCategories.map((category) => (
                        <div
                          className="product-category-wrap"
                          title={category.name}
                          key={category.id}
                        >
                          <li>
                            <Link legacyBehavior
                              href={{
                                pathname: "/category/[slug]",
                                query: { slug: category.slug },
                              }}
                            >
                              <a>
                                <i className="fas fa-caret-right"></i>{" "}
                                {category.name}
                              </a>
                            </Link>
                          </li>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer-contact-details">
                  <h1>Contact Us</h1>
                  <ul>
                    <li>
                      <a href="#">
                        <img src="/img/location.png" alt="Address" />
                        <p>{`${shopData.address}, ${shopData.city}-${shopData.zip_code}, ${shopData.country}`}</p>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:+88${shopData.phone}`}
                        className="sdsp-info-box"
                      >
                        <img src="/img/help-line.png" alt="Hotline" />
                        <p>
                          <span className="sdsp-title">Hotline Number</span>
                          <span className="sdsp-details">{shopData.phone}</span>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${shopData.shop_email}`}
                        className="sdsp-info-box"
                      >
                        <img src="/img/email.png" alt="Hotline" />
                        <p>
                          <span className="sdsp-title">Email Us</span>
                          <span className="sdsp-details">
                            {shopData.shop_email}
                          </span>
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-7 col-sm-7">
                <img
                  className="pay-with"
                  src="/img/paywith.png"
                  alt="Pay with SSLCommerz"
                />
              </div>
              <div className="col-lg-3 offset-lg-3 col-md-5 col-sm-5">
                <p className="fcr-text">
                  <i className="far fa-copyright"></i> {process.env.app_name}{" "}
                  2021
                </p>
                <p className="fpb-text">
                  Developed by{" "}
                  <a href="https://desktopit.net" target="_blank">
                    Desktop IT
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
