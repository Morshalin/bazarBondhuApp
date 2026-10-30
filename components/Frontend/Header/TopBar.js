import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import LoginSection from "./LoginSection";
import Link from "next/link";
// import { getSiteSettings } from "../../../Helpers/Utils/Utils";

const TopBar = (props) => {
  const router = useRouter();
  let keyword = router.query.keyword;
  const WAIT_INTERVAL = 500;
  const ENTER_KEY = 13;
  const [headerLogo, setHeaderLogo] = useState("");

  let timer = null;

  const handleChange = (e) => {
    e.preventDefault();
    clearTimeout(timer);
    keyword = e.target.value;
    timer = setTimeout(triggerChange, WAIT_INTERVAL);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(timer);
      triggerChange();
    }
  };

  const triggerChange = () => {
    Router.push(`/search/${keyword}`);
    // Router.push({
    //     pathname: '/search/[keyword]',
    //     query: { keyword: keyword },
    // })
  };

  const searchInput = useRef(null);

  if (router.route === "/search/[keyword]") {
    useEffect(() => {
      // current property is refered to input element
      searchInput.current.focus();
    }, []);
  }

  // useEffect(() => {
  //   getSiteSettings().then((response) => {
  //     if (response.success) {
  //       setHeaderLogo(response.data.shop_logo);
  //     }
  //   });
  // }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="top-nav-left">
            <a
              className="navbar-brand"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                Router.push("/");
              }}
            >
              {/*<img className="default-logo" src={`${process.env.base_url}/images/shop/shop_logo/logo.png`}
                                 alt="logo"/> */}
              <img className="default-logo" src={"/img/logo.png"} alt="logo" />
              <img
                className="mobile-logo"
                src="/img/logo-mobile.png"
                alt={process.env.app_name}
              />
            </a>

            <button
              type="button"
              id="sidebarCollapse"
              className={
                props.toggleButton ? "navbar-btn active" : "navbar-btn"
              }
              onClick={props.toggleChange}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <p className="menu-title">Menu</p>
          </div>

          <div className="top-nav-center">
            <div className="search-form">
              <form action="#">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={keyword}
                    ref={searchInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="search your need (e.g. mask, sanitizer, spray bottle, etc)"
                    required
                  />
                  <div className="input-group-append">
                    <button className="btn" type="button">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="top-nav-right">
            <div className="btn-group help_support">
              <Link legacyBehavior href="/user/track-order">
                <a
                  role="button"
                  className="btn dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-info-circle"></i>{" "}
                  <span className="help-text d-none d-lg-inline">
                    Track Order
                  </span>
                </a>
              </Link>
            </div>

            <div className="btn-group help_support">
              <a
                role="button"
                href="#"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-question-circle" />{" "}
                <span className="help-text d-none d-lg-inline">Help</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow-sm">
                <a
                  className="dropdown-item"
                  href="/help/about-us"
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/help/about-us");
                  }}
                >
                  <i className="icon-question-circle" />
                  <span>About Us</span>
                </a>
                <a
                  className="dropdown-item"
                  href="/help/faq"
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/help/faq");
                  }}
                >
                  <i className="icon-question-circle" />
                  <span>FAQ</span>
                </a>
                <a
                  className="dropdown-item"
                  href="/help/refund-policy"
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/help/refund-policy");
                  }}
                >
                  <i className="icon-investment" />
                  <span>Refund Policy</span>
                </a>
                <a
                  className="dropdown-item"
                  href="/help/return-policy"
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/help/return-policy");
                  }}
                >
                  <i className="icon-share-alt" />
                  <span>Return Policy</span>
                </a>
                <a
                  className="dropdown-item"
                  href="/help/how-to-use"
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/help/how-to-use");
                  }}
                >
                  <i className="icon-comments-alt" />
                  <span>How to Use</span>
                </a>
              </div>
            </div>

            {/*<div className="btn-group">*/}
            {/*    <a role="button" className="btn dropdown-toggle" data-toggle="dropdown"*/}
            {/*        aria-haspopup="true"*/}
            {/*        aria-expanded="false">*/}
            {/*        <i className="far fa-bell" />*/}
            {/*        <span className="badge badge-noti">3</span>*/}
            {/*    </a>*/}
            {/*    <div className="dropdown-menu dropdown-menu-right shadow-sm">*/}
            {/*        <a className="dropdown-item" href="#">10% discount only for you</a>*/}
            {/*        <a className="dropdown-item" href="#">New year offer</a>*/}
            {/*        <a className="dropdown-item" href="#">Your order #SH000012 has been shipped </a>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <LoginSection />
          </div>
        </div>
      </nav>
    </>
  );
};
export default TopBar;
