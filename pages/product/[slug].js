import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ReactImageFallback from "react-image-fallback";
import { connect } from "react-redux";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import { getActions } from "../../Helpers/Utils/Utils";
import * as process from "../../next.config";
import { ADD_TO_CART } from "../../store/frontend/actions/cartAction";

const ProductDetails = (props) => {
  const router = useRouter();
  const { slug } = router.query;

  const productUrl = process.env.basePath + router.asPath;

  const refDiv = useRef(null);
  const [count, setCount] = useState(1);
  const [productDetails, setProductDetails] = useState("");

  useEffect(() => {
    let mounted = true;

    slug &&
      mounted &&
      getActions(`${process.env.api_url}/product-details/${slug}`, false)
        .then((res) => {
          if (res.success) {
            setProductDetails(res.data);
          }
        })
        .finally(() => (mounted = false));
  }, [slug]);

  const meta = {
    title:
      productDetails &&
      productDetails.name +
        ` -${process.env.app_name} | Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
    keywords: productDetails.meta_keywords,
    description: productDetails.meta_description,
    ogTitle:
      productDetails && productDetails.name + ` - ${process.env.app_name}`,
    ogType: "website",
    ogImage: productDetails.feature_image,
    ogSiteName: `${process.env.app_name}`,
    ogDescription: productDetails.meta_description,
  };

  console.log(productDetails.product_images);

  return (
    <>
      <SiteHeader {...meta} />
      <Layout>
        <section className="class_name" ref={refDiv}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <section className="product-details-main">
                  <div className="container-fluid">
                    <div className="product-details-wrap">
                      <div className="pdw-top">
                        <div className="pwdt-left pwdt-grid">
                          <div
                            id="productDisplayCarousel"
                            className="carousel slide carousel-fade"
                            data-ride="carousel"
                          >
                            <div className="carousel-inner">
                              {productDetails?.previous_product_images?.length >
                              0 ? (
                                productDetails?.previous_product_images?.map(
                                  (image, index) => (
                                    <div
                                      key={index}
                                      className={`carousel-item ${
                                        index ? "" : "active"
                                      }`}
                                    >
                                      <ReactImageFallback
                                        src={image.name}
                                        className="d-block w-100"
                                        fallbackImage={
                                          process.env.base_url +
                                          "/images/image_not_found.png"
                                        }
                                        initialImage="/processing-loder/loader.gif"
                                        alt={productDetails.name}
                                      />

                                      {/*<img src={image} className='d-block w-100'*/}
                                      {/*     alt='Product Name'/>*/}
                                    </div>
                                  )
                                )
                              ) : (
                                <div className="carousel-item active">
                                  <ReactImageFallback
                                    src={productDetails.feature_image}
                                    className="d-block w-100"
                                    fallbackImage={
                                      process.env.base_url +
                                      "/images/image_not_found.png"
                                    }
                                    initialImage="/processing-loder/loader.gif"
                                    alt={productDetails.name}
                                  />

                                  {/*<img*/}
                                  {/*    src={productDetails.feature_image}*/}
                                  {/*    className='d-block w-100'*/}
                                  {/*    alt='Product Name'*/}
                                  {/*/>*/}
                                </div>
                              )}
                            </div>
                            <ol className="carousel-indicators">
                              {productDetails?.previous_product_images?.length >
                              0 ? (
                                productDetails?.previous_product_images?.map(
                                  (image, index) => (
                                    <li
                                      key={index}
                                      data-target="#productDisplayCarousel"
                                      data-slide-to={index}
                                      className={`${index ? "" : "active"}`}
                                    >
                                      <ReactImageFallback
                                        src={image.name}
                                        className="d-block w-100"
                                        fallbackImage={
                                          process.env.base_url +
                                          "/images/image_not_found.png"
                                        }
                                        initialImage="/processing-loder/loader.gif"
                                        alt={productDetails.name}
                                      />

                                      {/*<img className='d-block w-100' src={image}*/}
                                      {/*     alt='Product Name'/>*/}
                                    </li>
                                  )
                                )
                              ) : (
                                <li
                                  data-target="#productDisplayCarousel"
                                  className="active"
                                >
                                  <ReactImageFallback
                                    src={productDetails.feature_image}
                                    className="d-block w-100"
                                    fallbackImage={
                                      process.env.base_url +
                                      "/images/image_not_found.png"
                                    }
                                    initialImage="/processing-loder/loader.gif"
                                    alt={productDetails.name}
                                  />

                                  {/*<img*/}
                                  {/*    className='d-block w-100'*/}
                                  {/*    src={productDetails.feature_image}*/}
                                  {/*    alt='Product Name'*/}
                                  {/*/>*/}
                                </li>
                              )}
                            </ol>
                          </div>
                        </div>
                        <div className="pwdt-right pwdt-grid">
                          <div className="product-title">
                            <h1>{productDetails.name}</h1>
                          </div>
                          {/*<div className="product-review">*/}
                          {/*    <div className="review-summary">*/}
                          {/*        <i className="icon-star-full"/>*/}
                          {/*        <i className="icon-star-full"/>*/}
                          {/*        <i className="icon-star-full"/>*/}
                          {/*        <i className="icon-star-half"/>*/}
                          {/*        <i className="icon-star-empty"/>*/}
                          {/*        <span>(5 reviews)</span>*/}
                          {/*    </div>*/}
                          {/*</div>*/}
                          <hr />
                          <div className="product-qan-price-off">
                            <div className="product-qan-price">
                              {/* <div className='product-quantity'>
																<span>
																	{productDetails.weight}{' '}
																	{productDetails.sell_unit && productDetails.sell_unit.name}
																</span>
															</div> */}
                              <div className="product-price">
                                <span className="off-price">
                                  {" "}
                                  ৳ {productDetails.selling_price}
                                </span>
                                {/*<span className="original-price">$500</span>*/}
                              </div>
                            </div>
                            {/*<div className="off-percentage">*/}
                            {/*    <span>20% off</span>*/}
                            {/*</div>*/}
                          </div>
                          <div
                            className="product-small-des"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            <p>{productDetails.description}</p>
                          </div>
                          <div className="availability-sku">
                            <div className="sku">
                              SKU : <span>{productDetails.sku}</span>
                            </div>
                            {productDetails.in_stock ? (
                              <div className="availability">
                                AVAILABILITY :{" "}
                                <span className="badge badge-pill badge-primary">
                                  In Stock
                                </span>
                              </div>
                            ) : (
                              <div className="availability">
                                AVAILABILITY :{" "}
                                <span className="badge badge-pill badge-danger">
                                  Out Stock
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="add-to-cart">
                            <div className="cart-count input-group">
                              <button
                                className="decrise"
                                onClick={() => {
                                  if (count > 0) setCount(count - 1);
                                }}
                              ></button>
                              <input
                                name="qty"
                                type="text"
                                readOnly
                                value={count}
                              />
                              <button
                                className="incrise"
                                onClick={() => setCount(count + 1)}
                              ></button>
                            </div>
                            <div className="acrt-btn">
                              <button
                                className="btn btn-atc"
                                onClick={(event) => {
                                  event.preventDefault();
                                  if (
                                    productDetails.selling_price === 0 ||
                                    count <= 0
                                  ) {
                                    return false;
                                  }
                                  props.addToCart(productDetails, count);
                                }}
                                disabled={
                                  productDetails.selling_price === 0 ||
                                  count <= 0
                                    ? "disabled"
                                    : ""
                                }
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                          <div className="social-share">
                            <div className="share-icon">
                              <FacebookShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <FacebookIcon size={36} />
                              </FacebookShareButton>
                              <TwitterShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <TwitterIcon size={36} />
                              </TwitterShareButton>
                              <LinkedinShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <LinkedinIcon size={36} />
                              </LinkedinShareButton>
                              <WhatsappShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <WhatsappIcon size={36} />
                              </WhatsappShareButton>
                              <InstapaperShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <InstapaperIcon size={36} />
                              </InstapaperShareButton>
                              <EmailShareButton
                                url={productUrl}
                                quote={productDetails.description}
                                hashtag="#camperstribe"
                              >
                                <EmailIcon size={36} />
                              </EmailShareButton>
                            </div>
                            {/* <div className='add-to-wishlist'>
															<button className='btn btn-atw'>
																<i className='icon-heart-regular' />
																<span>Add to wishlist</span>
															</button>
														</div> */}
                          </div>
                          <div className="pay-with">
                            <img src="/img/paywith.png" alt="Pay with" />
                          </div>
                        </div>
                      </div>
                      <div className="pdw-bottom" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// ProductDetails.getInitialProps = async (ctx) => {
//     const api_url = process.env.api_url;
//
//     let slug = ctx.query.slug;
//
//     if (slug) {
//         let response = await axios.get(`${api_url}/products/${slug}`).then((result) => {
//             return result.data;
//         }).catch((exception) => {
//             return exception;
//         });
//
//         if (response.success) {
//             return {product: response.data}
//         } else {
//             return {product: []}
//         }
//     } else {
//         return {product: []}
//     }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, qty) =>
      dispatch({ type: ADD_TO_CART, payload: { product, qty } }),
  };
};
export default connect(null, mapDispatchToProps)(ProductDetails);
