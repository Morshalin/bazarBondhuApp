import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import React from "react";
import { useRouter } from "next/router";
import ProductList from "../../components/Frontend/Container/Category/ProductList";

const CategoryItem = () => {
  const router = useRouter();
  const { slug } = router.query;

  const meta = {
    title: slug + ` - ${process.env.app_name}`,
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
        <ProductList />
      </Layout>
    </>
  );
};

export default CategoryItem;
