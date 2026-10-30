import React, { useEffect, useState } from "react";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
// import { useTranslation } from "react-i18next";
import LayoutBB from "../../components/Frontend/Layout/LayoutBB";

const Home = (props) => {
  console.log(props);

  //   const { t } = useTranslation("common");
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
        <nav class="bbnav navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container-fluid">
            <div className="bbn-warp">
              <div className="nav-logo">
                <a className="small-logo" href="#">
                  <img src="../img/logo-sm.png" />
                </a>
                <a className="big-logo" href="#">
                  <img src="../img/shoply_logo.png" />
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

        <section className="home-location-set ls-shop">
          {/* <div className='shapes-container'>
                <div className='bg-shape'></div>
            </div> */}
          <div className="container">
            <div className="row logo-locatiom">
              {/* <div className="col-md-3 col-lg-3">
                        <a className="bb-logo" href="#">
                            <img src="img/shoply_logo.png" />
                        </a>
                    </div> */}
              <div className="col-md-4 col-lg-4">
                <div className="select-location" role="alert">
                  <div class="dropdown">
                    <button
                      class="btn btn-light dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                        <b>আমার বাড়ি</b> - শালবাগান উপকেন্দ্র, নেসকো লিমিটেড,
                        Rajshahi - Naogaon Highway, Rajshahi{" "}
                      </span>
                    </button>
                    <div
                      class="dropdown-menu shadow-sm"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item selected-item" href="#">
                        <span>
                          <b>আমার বাড়ি</b> - শালবাগান উপকেন্দ্র, নেসকো লিমিটেড,
                          Rajshahi - Naogaon Highway, Rajshahi{" "}
                        </span>
                      </a>
                      <a class="dropdown-item" href="#">
                        <span>
                          <b>অফিস</b> - শালবাগান উপকেন্দ্র, নেসকো লিমিটেড,
                          Rajshahi - Naogaon Highway, Rajshahi{" "}
                        </span>
                      </a>
                      <a class="dropdown-item" href="#">
                        <span>
                          <b>গ্রামের বাড়ি</b> - শালবাগান উপকেন্দ্র, নেসকো
                          লিমিটেড, Rajshahi - Naogaon Highway, Rajshahi{" "}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-lg-4">
                <div className="shop-filter">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="sf-left">
                        <div className="shop-type">সকল দোকান</div>
                        <div className="radious-range">
                          <i class="fas fa-street-view"></i> 100 মিটার
                        </div>
                      </span>
                      <span className="sf-right">
                        <span>ফিল্টার</span> <i class="fas fa-filter"></i>
                      </span>
                    </button>
                    <div
                      class="dropdown-menu shadow-sm"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="dropdown-item">
                        <form>
                          <div className="form-group mb-0">
                            <input
                              type="range"
                              class="custom-range"
                              min="100"
                              max="5000"
                              step="50"
                              id="shopRadiousRange"
                            />
                          </div>
                        </form>
                      </li>
                      <li className="dropdown-item bb-shop-type">
                        <form>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck1"
                            >
                              মুদি দোকান
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck2"
                            >
                              কনফেকশনারি
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck3"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck3"
                            >
                              ঔষধের দোকান
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck4"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck4"
                            >
                              সুপার শপ
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck5"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck5"
                            >
                              কসমেটিকস
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck6"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck6"
                            >
                              কাপড়ের দোকান
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck7"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck7"
                            >
                              হার্ডওয়্যার
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck8"
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck8"
                            >
                              মিষ্টির দোকান
                            </label>
                          </div>
                        </form>
                      </li>
                      <button className="btn dropdown-item" href="#">
                        ফিল্টার অ্যাপ্লাই করুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row bb-search">
              <div className="col-md-8">
                <div className="searc-form mb-5">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="পণ্য খুঁজুন"
                        required=""
                      />
                      <i class="fas fa-search-location"></i>
                      <div className="input-group-append">
                        <button className="btn" type="button">
                          <span>সার্চ</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-2">
              <div className="col">
                <h1 className="bbs-title">
                  আপনার পছন্দকৃত লোকেশনে এই দোকান গুলো পাওয়া গিয়েছে
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/01.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0 (12)</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>15 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/02.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">উজ্জ্বল ক্লথ ষ্টোর</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>4.7</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>20 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/06.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">ইমদাদ মেডিসিন কর্নার</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0 (12)</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>25 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/08.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>30 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/05.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>35 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/03.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>40 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/07.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>45 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/04.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>50 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/01.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>55 মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/02.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>01 ঘণ্টা</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/03.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>01 ঘণ্টা ১৫ মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <a href="#" className="bbs-card">
                  <div className="bbsc-img">
                    <img src="../img/shops/04.jpg" />
                    <div className="open-offer">
                      <div className="open-yes">খোলা</div>
                      <div className="offer">10% ছাড়</div>
                    </div>
                  </div>
                  <div className="bbsc-footer">
                    <h4 className="shop-title">খাজা সুপার শপ</h4>
                    <div className="rating-distance">
                      <div className="rating">
                        <i class="fas fa-star"></i>
                        <span>5.0</span>
                      </div>
                      <div className="distance">
                        <i class="fas fa-truck"></i>
                        <span>১৫ মিনিট</span>
                      </div>
                    </div>
                  </div>
                </a>
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
              <div className="col-md-4">
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
              <div className="col-md-4">
                <div className="download-app-grid">
                  <div className="dag-title">
                    <img
                      src="../img/app-logo/logo-rider.png"
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
                      <img src="../img/shoply_logo.png" alt="logo" />
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
                        <i class="far fa-paper-plane"></i> ইমেইলঃ
                        infor@{process.env.app_name}.com{" "}
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
