import React, { useEffect, useState } from "react";
import SiteHeader from "../components/Frontend/Header/SiteHeader";
// import { useTranslation } from "react-i18next";
import LayoutBB from "../components/Frontend/Layout/LayoutBB";

const Home = (props) => {
  console.log(props);

  // const { t } = useTranslation("common");
  //console.log(language.translate('app'))

  const meta = {
    title: `Home - ${process.env.app_name}`,
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
      <LayoutBB>
        <div
          className="alert alert-merchant alert-warning alert-dismissible shadow-sm fade show"
          role="alert"
        >
          {process.env.app_name}-তে একজন বিক্রেতা হতে চান?{" "}
          <a href="#">চলুন শুরু করি</a>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <nav class="bbnav ts-home-nav navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <div className="bbn-warp">
              <div className="nav-logo">
                <a className="small-logo" href="#">
                  <img src="img/logo-mobile.png" />
                </a>
                <a className="big-logo" href="#">
                  <img src="img/logo.png" />
                </a>
              </div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i class="icon-cart1 icon_big mr-0"></i>
                  </a>
                </li>
                <li className="nav-item dropdown accounts">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="far fa-user-circle icon_big"></i>{" "}
                    <span>সাইন ইন</span>
                  </a>
                  <div
                    className="dropdown-menu shadow-sm"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      নিকটস্থ
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i class="fas fa-map-marker-alt"></i>লোকেশান
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i class="far fa-bell"></i>অ্যালার্ট
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      সদাই
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      <i class="fas fa-power-off"></i> লগ আউট
                    </a>
                  </div>
                </li>
                <li className="nav-item ln-switch">
                  <a className="nav-link ln-bn active" href="#">
                    বাং
                  </a>
                  <span className="divider"></span>
                  <a className="nav-link ln-en" href="#">
                    En
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="home-location-set">
          {/* <div className='shapes-container'>
                        <div className='bg-shape'></div>
                    </div>                   */}
          <div className="container">
            {/* <div className="row logo-locatiom">
                            <div className="col-md-4">
                            <a className="bb-logo" href="#">
                                <img src="img/shoply_logo.png" />
                            </a>
                            </div>
                        </div> */}
            <div className="row bb-search mt-2">
              <div className="col-xl-6 col-lg-8">
                <div className="logo-locatiom">
                  <a className="bb-logo" href="#">
                    <img src="img/logo.png" alt={process.env.app_name} />
                  </a>
                </div>
                <h3 className="location-title mt-5">
                  আপনার <span>নিকটস্থ দোকানে</span> অর্ডার করতে লোকেশান নির্বাচন
                  করুন
                </h3>
                <div className="searc-form">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="লোকেশান লিখুন"
                        required=""
                      />
                      <i class="fas fa-search-location"></i>
                      <div className="input-group-append">
                        <button
                          className="btn"
                          type="button"
                          data-toggle="modal"
                          data-target="#addMapModal"
                        >
                          <span>সার্চ</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="saved-location">
                  <div className="row mx-n1 mb-2">
                    <div className="col-6 px-1">
                      <div className="saved-location-grid active">
                        <div className="name-acion">
                          <div className="location-name">আমার বাড়ি</div>
                          <ul className="sl-action">
                            <li>
                              <a href="#">
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="location-address">
                          শালবাগান উপকেন্দ্র, নেসকো লিমিটেড, Rajshahi - Naogaon
                          Rajshahi
                        </div>
                      </div>
                    </div>
                    <div className="col-6 px-1">
                      <div className="saved-location-grid">
                        <div className="name-acion">
                          <div className="location-name">আমার বাড়ি</div>
                          <ul className="sl-action">
                            <li>
                              <a href="#">
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="location-address">
                          শালবাগান উপকেন্দ্র, নেসকো লিমিটেড, Rajshahi - Naogaon
                          Highway, Rajshahi
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-n1">
                    <div className="col-6 px-1">
                      <div className="saved-location-grid">
                        <div className="name-acion">
                          <div className="location-name">আমার বাড়ি</div>
                          <ul className="sl-action">
                            <li>
                              <a href="#">
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="location-address">
                          শালবাগান উপকেন্দ্র, নেসকো লিমিটেড, Rajshahi - Naogaon
                          Highway, Rajshahi
                        </div>
                      </div>
                    </div>
                    <div className="col-6 px-1">
                      <div className="saved-location-grid">
                        <div className="name-acion">
                          <div className="location-name">আমার বাড়ি</div>
                          <ul className="sl-action">
                            <li>
                              <a href="#">
                                <i class="far fa-eye"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fas fa-pencil-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i class="far fa-trash-alt"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="location-address">
                          শালবাগান উপকেন্দ্র, নেসকো লিমিটেড, Rajshahi - Naogaon
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="home-baner-img">
                  <img
                    src="img/banner/home.png"
                    alt={`${process.env.app_name} Banner`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <div
          className="modal fade bbc-modal"
          id="addMapModal"
          tabindex="-1"
          aria-labelledby="addMapModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addMapModalLabel">
                  লোকেশান নির্বাচন ও সংরক্ষণঃ{" "}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="alert alert-warning" role="alert">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>
                        আপনার নির্বাচিত লোকেশান এর ভিত্তিতে, নিকটস্থ দোকানসমূহ
                        হতে আপনি পণ্য ক্রয় করতে পারবেন এবং নির্বাচিত লোকেশানে
                        পণ্য সরবারহ করা হবে।{" "}
                      </span>
                    </div>

                    <div
                      className="alert alert-secondary alert-map"
                      role="alert"
                    >
                      <i className="fas fa-map-marker-alt"></i>
                      <input
                        type="text"
                        className="mo-location"
                        defaultValue="শালবাগান উপকেন্দ্র, নেসকো লিমিটেড, Rajshahi"
                      />
                    </div>
                    <div className="map-wrap">
                      <img className="map-pin" src="img/map-location.png" />
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34574.1566150136!2d88.60046879387615!3d24.37571787263186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x90e0238b116d98b7!2sDesktop%20IT!5e0!3m2!1sen!2sbd!4v1630748631284!5m2!1sen!2sbd"
                        width="100%"
                        height="450"
                        border="0"
                        allowfullscreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <form>
                      <div className="form-group">
                        <label>যে নামে লোকেশান সেভ করতে চানঃ</label>
                        <input
                          className="form-control"
                          placeholder="যেমনঃ বাড়ি, অফিস"
                        />
                      </div>
                      <div className="form-group">
                        <label>পণ্য গ্রহণকারীর নামঃ</label>
                        <input
                          className="form-control"
                          placeholder="পণ্য গ্রহণকারীর নাম"
                        />
                      </div>
                      <div className="form-group">
                        <label>পণ্য গ্রহণকারীর মোবাইল নাম্বারঃ</label>
                        <input
                          className="form-control"
                          placeholder="মোবাইল নাম্বার"
                        />
                      </div>
                      <div className="form-group">
                        <label>বাড়ি/ ফ্লাট নম্বরঃ</label>
                        <textarea
                          class="form-control"
                          rows="4"
                          placeholder="বিস্তারিত ঠিকানা"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <button className="btn">লোকেশান সংরক্ষণ করুন</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="howtouse">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="mb-5">কিভাবে ব্যাবহার করবেন ?</h1>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="use-card-warp">
                  <div className="ucw-icon shadow-sm">
                    <img src="img/how-to/login.png" alt="Icon" />
                  </div>
                  <div className="ucw-txt">
                    <h3>লগইন করুন</h3>
                    <p>
                      আপনার ফোন নাম্বার দিয়ে রেজিস্ট্রেশান/ লগইন করুন এবং ৪-৬
                      সংখ্যার পিন সেট করুন। পিন নাম্বার মনে রাখুন এবং কাউকে
                      শেয়ার করা থেকে বিরত থাকুন। পরবর্তীতে আপনার ফোন নাম্বার ও
                      পিনটি ব্যাবহার করে লগইন করতে পারবেন।
                    </p>
                  </div>
                </div>
                <div className="use-card-warp">
                  <div className="ucw-icon shadow-sm">
                    <img src="img/how-to/location.png" alt="Icon" />
                  </div>
                  <div className="ucw-txt">
                    <h3>লোকেশান নির্বাচন করুন</h3>
                    <p>
                      নিকটস্থ দোকানে অর্ডার করতে লোকেশান নির্বাচন করুন। আপনার
                      নির্বাচিত লোকেশানটি ডেলিভারির ঠিকানা হিসাবে ব্যাবহার করা
                      হবে।
                    </p>
                  </div>
                </div>
                <div className="use-card-warp">
                  <div className="ucw-icon shadow-sm">
                    <img src="img/how-to/cart.png" alt="Icon" />
                  </div>
                  <div className="ucw-txt">
                    <h3>পণ্য কিনুন</h3>
                    <p>
                      লোকেশান নির্বাচন করার পর, আপনার লোকেশানের উপর ভিত্তি করে
                      শপ বা দোকান দেখানো হবে । এবার আপনার পছন্দের শপ বা দোকান
                      হতে পণ্য ক্রয় করুন।
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="htu-video shadow">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe
                      class="embed-responsive-item"
                      src="https://www.youtube.com/embed/cbznccQARAI?rel=0"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="download-app">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center mb-5">অ্যাপ ডাউনলোড করুন</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img src="img/app-logo/logo.png" alt="Customer App" />{" "}
                    কাস্টমার অ্যাপ
                  </div>
                  <div className="dag-btn-warp">
                    <a className="android" href="#">
                      <img
                        src="img/app-logo/play-store.png"
                        alt="Customer App"
                      />{" "}
                      Android
                    </a>
                    <a className="ios" href="#">
                      <img
                        src="img/app-logo/apple-store.png"
                        alt="Customer App"
                      />{" "}
                      IOS
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img
                      src="img/app-logo/logo-merchant.png"
                      alt="Customer App"
                    />{" "}
                    মার্চেন্ট অ্যাপ
                  </div>
                  <div className="dag-btn-warp">
                    <a className="android" href="#">
                      <img
                        src="img/app-logo/play-store.png"
                        alt="Customer App"
                      />{" "}
                      Android
                    </a>
                    <a className="ios" href="#">
                      <img
                        src="img/app-logo/apple-store.png"
                        alt="Customer App"
                      />{" "}
                      IOS
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img src="img/app-logo/logo-rider.png" alt="Customer App" />{" "}
                    রাইডার অ্যাপ
                  </div>
                  <div className="dag-btn-warp">
                    <a className="android mr-0" href="#">
                      শীঘ্রই আসছে . . .
                    </a>
                    {/* <a className='android' href='#'>
                                            <img src="img/app-logo/play-store.png" alt='Customer App'/> Android
                                        </a>
                                        <a className='ios' href='#'>
                                            <img src="img/app-logo/apple-store.png" alt='Customer App'/> IOS
                                        </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="tsly-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="f-logo-wrap">
                  <div className="f-logo mb-3">
                    <a href="#">
                      <img src="img/logo.png" alt="logo" />
                    </a>
                  </div>
                  <div className="footer-about mb-4">
                    Pellentesque tristique sapien sit amet tellus luctus,
                    finibus facilisis est sodales. Etiam id ultricies lorem.
                    Etiam tincidunt mollis dolor, eu facilisis felis.
                  </div>
                  <div className="footer-social">
                    <a className="fb" href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="ins" href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a className="twi" href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="lin" href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="ytb" href="#">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="fc-wrap">
                  <h4>আমাদের সম্পর্কে</h4>
                  <ul>
                    <li>
                      <a href="#">{process.env.app_name} সম্পর্কে</a>
                    </li>
                    <li>
                      <a href="#">{process.env.app_name} ব্লগ</a>
                    </li>
                    <li>
                      <a href="#">{process.env.app_name} টিম</a>
                    </li>
                    <li>
                      <a href="#">যোগাযোগ </a>
                    </li>
                    <li>
                      <a href="#">ক্যারিয়ার</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="fc-wrap">
                  <h4>গ্রাহক সেবা</h4>
                  <ul>
                    <li>
                      <a href="#">সাহায্য কেন্দ্র</a>
                    </li>
                    <li>
                      <a href="#">কিভাবে কেনাকাটা করবেন</a>
                    </li>
                    <li>
                      <a href="#">রিটার্ন এবং রিফান্ড নীতি</a>
                    </li>
                    <li>
                      <a href="#">গোপনীয়তা ও শর্তাবলী</a>
                    </li>
                    <li>
                      <a href="#">আচরণ বিধি</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="fc-wrap">
                  <h4>দ্রুত যোগাযোগ</h4>
                  <ul>
                    <li>
                      <a href="#">
                        <i class="fas fa-map-marker-alt"></i> ঠিকানাঃ ১৪৭/সি
                        (তৃতীয় তলা), গ্রীন রোড, ঢাকা - ১২০৫
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fas fa-headset"></i> কল করুনঃ +৮৮ ০১৯১৩ ৮০০৮০০
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="far fa-paper-plane"></i> ইমেইলঃ infor@
                        {process.env.app_name}.com{" "}
                      </a>
                    </li>
                    <li className="fm-btn">
                      <a href="#">বিক্রেতা হোন</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="payment-method">
                  <img src="img/shurjoPayFooter.png" alt="shurjoPay" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="cpoy_right shadow-sm">
                  স্বত্ব © 2022 {process.env.app_name}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </LayoutBB>
    </>
  );
};

export default Home;
