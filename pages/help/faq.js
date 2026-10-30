import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Frontend/Layout/Layout";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Link from "next/link";
import HelpMenuList from "../../components/Frontend/Pages/Help/HelpMenuList";

const Faq = () => {
  const meta = {
    title: `FAQ - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    let mounted = true;
    fetchFaq()
      .then((response) => {
        if (mounted) {
          setQuestions(response);
        }
      })
      .finally(() => {
        mounted = false;
      });
  }, []);
  const fetchFaq = async () => {
    let url = `faq`;

    return await axios
      .get(url)
      .then((result) => result.data)
      .catch((error) => error);
  };

  console.log(questions);

  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="faq-section" id="faqSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3">
                <HelpMenuList slug="faq" />
              </div>
              <div className="col-xl-8">
                {questions &&
                  questions.length > 0 &&
                  questions.map((question, index) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="mb-3 d-flex align-items-center faq-type text-warning">
                              <i className="icon-question-circle"></i>{" "}
                              <span>{question.type}</span>
                            </h3>
                            {question.questions &&
                              question.questions.map((q, index) => {
                                return (
                                  <>
                                    <div className="gq-item shadow-sm">
                                      <p>
                                        <a
                                          className="btn collapsed"
                                          type="button"
                                          data-toggle="collapse"
                                          data-target={`#example${q.id}`}
                                          aria-expanded="true"
                                          aria-controls={`example${q.id}`}
                                        >
                                          <i className="fas fa-plus-square"></i>
                                          <i className="fas fa-minus-square"></i>
                                          {q.questions}
                                        </a>
                                      </p>
                                      <div
                                        className="collapse"
                                        id={`example${q.id}`}
                                      >
                                        <div className="card card-body gq-content border-0">
                                          <p>{q.ans}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Faq;
