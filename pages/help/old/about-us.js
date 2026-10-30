import React from "react";
import Layout from "../../../components/Frontend/Layout/Layout";
import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import Link from "next/link";
import HelpMenuList from "../../../components/Frontend/Pages/Help/HelpMenuList";
// import { useRouter } from "next/router";

const AboutUs = () => {
  const meta = {
    title: `About Us - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
  // const router = useRouter();
  // const slug = router.query;
  // console.log("slug", router);
  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="faq-section" id="faqSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3">
                <HelpMenuList slug="about-us" />
              </div>
              <div className="col-xl-8">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-share-alt"></i>{" "}
                      <span>About {process.env.app_name}.com</span>
                    </h3>
                    <div className="gq-item shadow-sm">
                      <p>
                        <p className="no-link-p">
                          <p>
                            {process.env.app_name}.com launched in 2020 . It is
                            committed to serve fresh, authentic & pure products.
                            We are not only want to be a seller but also our
                            wish to become a part of our customer family. Our
                            desire to make such a safe food web where clients
                            supposed to be a part of {process.env.app_name}.com.
                          </p>
                        </p>
                      </p>
                    </div>
                    <div className="gq-item shadow-sm">
                      <p>
                        <p className="no-link-p">
                          <p>
                            With the commitment making life easier we are here
                            to support people to minimize their pain in daily
                            purchasing & bring back the taste of childhood. We
                            serve all traditional items from anywhere in
                            Bangladesh to your home with the fastest delivery
                            ever you experienced.
                          </p>
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-investment"></i>
                      <span>What can we do for you ?</span>
                    </h3>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample4"
                          aria-expanded="false"
                          aria-controls="collapseExample4"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Support 24/7
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample4">
                        <div className="card card-body gq-content">
                          <p>
                            Call Us 24/7 at the below numbers for assistance
                            <ul type="disk">
                              <li>01958042251</li>
                              <li>01958042252</li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample5"
                          aria-expanded="false"
                          aria-controls="collapseExample5"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Best Quality
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample5">
                        <div className="card card-body gq-content">
                          <p>We provide best quality products.</p>
                        </div>
                      </div>
                    </div>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample6"
                          aria-expanded="false"
                          aria-controls="collapseExample6"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Fastest Delivery
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample6">
                        <div className="card card-body gq-content">
                          <p>Fastest delivery all over Bangladesh.</p>
                          <p>
                            Order grocery items and get same day delivery in
                            Dhaka
                          </p>
                          <p>
                            Maximum 5 day delivery period outside Dhaka shipment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-investment"></i>
                      <span>Contact No</span>
                    </h3>
                    <div className="gq-item shadow-sm">
                      <p>
                        <p className="no-link-p">
                          <ul className="mb-0">
                            <li>01958042251</li>
                            <li>01958042252</li>
                          </ul>
                        </p>
                      </p>
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

export default AboutUs;
