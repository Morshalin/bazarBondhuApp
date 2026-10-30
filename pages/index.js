import React, { useEffect, useState } from "react";
import SiteHeader from "../components/Frontend/Header/SiteHeader";
// import { useTranslation } from "react-i18next";
import LayoutBB from "../components/Frontend/Layout/LayoutBB";

const Home = (props) => {
  console.log(props);

  //   const { t } = useTranslation("common");
  //console.log(language.translate('app'))

  const meta = {
    title: "Home - " + `${process.env.app_name}`,
    keywords:
      "বাজারবন্ধু, বাজারবন্ধু মার্চেন্ট, ডেস্কটপ আইটি নিয়ে এলো ডি-কমার্স, ডিজিটাল কমার্স, আপনার ব্যবসা প্রতিষ্ঠানকে করুন সম্পূর্ণরূপে ডিজিটাল, বাজারবন্ধু",
    description:
      "ডেস্কটপ আইটি নিয়ে এলো ডি-কমার্স। আপনার ব্যবসা যদি হয় পণ্য ক্রয়-বিক্রয়, তাহলে আপনার ব্যবসা প্রতিষ্ঠানকে করুন সম্পূর্ণরূপে ডিজিটাল",
    ogTitle:
      "${process.env.app_name} আপনার ব্যবসাটি প্রসারিত করাই আমাদের উদ্দেশ্য।",
    ogType: "website",
    ogImage: "/img/banner/banner.jpg",
    ogSiteName: `${process.env.app_name}`,
    ogDescription:
      "আপনার ব্যবসাটি প্রসারিত করাই আমাদের উদ্দেশ্য।",
  };

  return (
    <>
      <SiteHeader {...meta} />
      <LayoutBB>
        <nav class="bbnav navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <div className="bbn-warp">
              <div className="nav-logo">
                <a className="small-logo" href="#">
                  <img src="../img/logo-mobile.png" />
                </a>
                <a className="big-logo" href="#">
                  <img src="../img/logo-bg.png" />
                </a>
              </div>
              <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i class="icon-cart1 icon_big mr-0"></i>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="/auth/sly-login">
                  <i class="far fa-user-circle icon_big"></i>{" "}
                  <span>সাইন ইন</span>
                  </a>
                </li>
                {/* <li className="nav-item dropdown accounts">
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
                </li> */}
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

        <section className="merchant-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="mh-left">
                  <h1>আপনার ব্যবসাটি প্রসারিত করাই আমাদের উদ্দেশ্য।</h1>
                  <p>
                    ডেস্কটপ আইটি নিয়ে এলো "ডি-কমার্স" (ডিজিটাল কমার্স)। আপনার
                    ব্যবসা যদি হয় পণ্য ক্রয়-বিক্রয়, তাহলে আপনার ব্যবসা
                    প্রতিষ্ঠানকে করুন সম্পূর্ণরূপে ডিজিটাল।
                  </p>
                  <p className="lst-cild">
                    স্বাধীনতার ৫০ বছর পূর্তিতে বাংলাদেশে নতুন এক অধ্যায়ের সূচনা
                    "ডি-কমার্স"।
                  </p>
                  <a className="lets-start" href="#">
                    শুরু করুন
                  </a>
                  <a className="vi-ditels" href="#downloadApp">
                  ডাউনলোড অ্যাপ
                  </a>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <div className="mh-right d-flex align-items-center justify-content-center">
                  <div className="mhr-image-holder shadow-sm">
                    <img
                      className=""
                      src="../../img/app-img.png"
                      alt="app image"
                    ></img>
                  </div>
                  <img
                    className="bg-mask"
                    src="../../img/path.png"
                    alt="app image"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className=""></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        
                    </div>
                </div>
            </div>
        </section> */}

        <section className="download-app" id="downloadApp">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center mb-5">অ্যাপ ডাউনলোড করুন</h1>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img src="../img/app-logo/logo.png" alt="Customer App" />{" "}
                    কাস্টমার অ্যাপ
                  </div>
                  <div className="dag-btn-warp">
                    <a className="android" href="#">
                      <img
                        src="../img/app-logo/play-store.png"
                        alt="Customer App"
                      />{" "}
                      Android
                    </a>
                    <a className="ios" href="#">
                      <img
                        src="../img/app-logo/apple-store.png"
                        alt="Customer App"
                      />{" "}
                      IOS
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img
                      src="../img/app-logo/logo-merchant.png"
                      alt="Customer App"
                    />{" "}
                    মার্চেন্ট অ্যাপ
                  </div>
                  <div className="dag-btn-warp">
                    <a className="android" href="#">
                      <img
                        src="../img/app-logo/play-store.png"
                        alt="Customer App"
                      />{" "}
                      Android
                    </a>
                    <a className="ios" href="#">
                      <img
                        src="../img/app-logo/apple-store.png"
                        alt="Customer App"
                      />{" "}
                      IOS
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="download-app-grid mb-0">
                  <div className="dag-title">
                    <img
                      src="../img/app-logo/logo.png"
                      alt="Customer App"
                    />{" "}
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
                      <img src="../img/logo.png" alt="logo" />
                    </a>
                  </div>
                  <div className="footer-about mb-4">
                    ডেস্কটপ আইটি নিয়ে এলো "ডি-কমার্স" (ডিজিটাল কমার্স)। আপনার ব্যবসা যদি হয় পণ্য ক্রয়-বিক্রয়, তাহলে আপনার ব্যবসা প্রতিষ্ঠানকে করুন সম্পূর্ণরূপে ডিজিটাল।
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
                        <i class="fas fa-headset"></i> <span className="open-suns">কল করুনঃ +৮৮ ০১৯১৩ ৮০০৮০০</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="far fa-paper-plane"></i> ইমেইলঃ
                        info@{process.env.app_name}.com{" "}
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
                  <img src="../img/shurjoPayFooter.png" alt="shurjoPay" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="cpoy_right shadow-sm">
                  স্বত্ব © বাজারবন্ধু ২০২২ {process.env.app_name}
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
