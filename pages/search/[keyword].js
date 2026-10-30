import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SingleProduct from "../../components/Frontend/Container/Home/SingleProduct";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import ProductQuickView from "../../components/Frontend/Modals/ProductQuickView";
import * as process from "../../next.config";
import { postMethodGetData } from "../../Helpers/Utils/Utils";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState("");

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    let fetched = true;
    fetched &&
      keyword &&
      postMethodGetData(
        `${process.env.api_url}/filter/filterProductByKeywords?page=${page}`,
        { keyword }
      )
        .then((res) => {
          if (res.success) {
            if (page === 1) {
              setProducts(res.data.data);
            } else {
              setProducts([...products, ...res.data.data]);
            }

            setNext(res.data.links.next);
          }
        })
        .finally(() => {
          fetched = false;
        });
  }, [keyword, page]);

  const meta = {
    title:
      "Search: " +
      keyword +
      ` - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
        <section className="product-block">
          <div className="container-fluid">
            <div className="row text-center">
              <div className="col-md-12">
                <h3>
                  {products.length > 0
                    ? `Search result for : ${keyword}`
                    : `Search products like (Potato, Sugar, Tea)`}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <InfiniteScroll
                  dataLength={products.length}
                  next={() => {
                    setPage(page + 1);
                  }}
                  loader={
                    next && (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )
                  }
                  hasMore={products.length > 0}
                  className="product-showcase-wrap"
                >
                  {products.map((product, index) => (
                    <SingleProduct product={product} key={index} />
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </section>

        <ProductQuickView />
      </Layout>
    </>
  );
};

export default SearchResult;
