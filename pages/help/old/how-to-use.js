import React from "react";
import Layout from "../../../components/Frontend/Layout/Layout";
import SiteHeader from "../../../components/Frontend/Header/SiteHeader";
import Link from "next/link";
import HelpMenuList from "../../../components/Frontend/Pages/Help/HelpMenuList";

const HowToUse = () => {
  const meta = {
    title: `How To Use - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
      <Layout>
        <section className="faq-section" id="faqSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3">
                <HelpMenuList slug="how-to-use" />
              </div>
              <div className="col-xl-8">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-cart-full"></i>{" "}
                      <span>Place order</span>
                    </h3>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample">
                        <div className="card card-body gq-content border-0">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
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
                          data-target="#collapseExample1"
                          aria-expanded="false"
                          aria-controls="collapseExample1"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample1">
                        <div className="card card-body gq-content border-0">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.{" "}
                          </p>
                          <ol type="a" className="">
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample2"
                          aria-expanded="false"
                          aria-controls="collapseExample2"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample2">
                        <div className="card card-body gq-content border-0">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-coin"></i>
                      <span>Make Payment</span>
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample4">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
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
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample5">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                          <ol type="a">
                            <li>Hic quae repellat doloremque.</li>
                            <li>Morbi at dolor ac mauris laoreet lacinia.</li>
                            <li>
                              Duis volutpat ipsum vitae mi egestas pulvinar.
                            </li>
                            <li>Sed imperdiet dolor eu porta posuere.</li>
                            <li>
                              Pellentesque semper erat in convallis ornare.
                            </li>
                          </ol>
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
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample6">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <h3 className="mb-3 d-flex align-items-center faq-type">
                      <i className="icon-delivery"></i>
                      <span>Receive order</span>
                    </h3>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample7"
                          aria-expanded="false"
                          aria-controls="collapseExample7"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample7">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
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
                          data-target="#collapseExample8"
                          aria-expanded="false"
                          aria-controls="collapseExample8"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample8">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                          <ol type="a">
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                            <li>Hic quae repellat doloremque!</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    <div className="gq-item shadow-sm">
                      <p>
                        <a
                          className="btn collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseExample9"
                          aria-expanded="false"
                          aria-controls="collapseExample9"
                        >
                          <i className="fas fa-plus-square"></i>
                          <i className="fas fa-minus-square"></i>
                          Curabitur posuere sapien vitae nisl tincidunt, eget
                          ornare dui pretium ?
                        </a>
                      </p>
                      <div className="collapse" id="collapseExample9">
                        <div className="card card-body gq-content">
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                          <p>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                          </p>
                        </div>
                      </div>
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

export default HowToUse;
