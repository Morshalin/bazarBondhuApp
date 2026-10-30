import React from "react";
import Layout from "../../components/Frontend/Layout/Layout";
import ContactUsForm from "../../components/Frontend/ContactUsForm/ContactUsForm";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";

const CreateCustomOrder = () => {
  const meta = {
    title: `Contact Us - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
        <ContactUsForm />
      </Layout>
    </>
  );
};

export default CreateCustomOrder;
