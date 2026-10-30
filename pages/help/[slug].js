import React, { useEffect, useState } from "react";
import Layout from "../../components/Frontend/Layout/Layout";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
const HelpPost = () => {
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

  const router = useRouter();

  const { slug } = router.query;

  const [helpMenuList, setHelpMenuList] = useState();

  useEffect(() => {
    let mounted = true;

    getPostByType("help")
      .then((response) => {
        if (mounted) {
          setHelpMenuList(response.data);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, []);

  const getPostByType = async (post_type) => {
    return await axios
      .post(`get-post-by-type`, { post_type })
      .then((result) => result.data)
      .catch((error) => error);
  };

  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="faq-section" id="faqSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3">
                <div className="help-sticky">
                  <div className="list-group rounded-0">
                    {helpMenuList && helpMenuList.length > 0
                      ? helpMenuList.map((item, index) => (
                          <Link legacyBehavior
                            href={{
                              pathname: `/help/${item.slug}`,
                            }}
                          >
                            <a
                              className={`list-group-item list-group-item-action ${
                                slug === item.slug ? "active" : ""
                              } d-flex align-items-center`}
                            >
                              <i className="icon-question-circle mr-2" />
                              <span>{item.name}</span>
                            </a>
                          </Link>
                        ))
                      : ""}
                    <Link legacyBehavior
                      href={{
                        pathname: "/help/faq",
                      }}
                    >
                      <a
                        href="#"
                        className={`list-group-item list-group-item-action ${
                          slug == "faq" ? "active" : ""
                        }  d-flex align-items-center`}
                      >
                        {" "}
                        <i className="icon-question-circle mr-2"></i>
                        <span>FAQ</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <>
                  {helpMenuList && helpMenuList.length > 0
                    ? helpMenuList.map((item, index) => (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.slug === slug ? item.content : "",
                          }}
                        />
                      ))
                    : ""}
                </>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HelpPost;
