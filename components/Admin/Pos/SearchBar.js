import React, { useEffect, useState } from "react";
import axios from "axios";
import { SET_PRODUCTS } from "../../../store/pos/actions/posProductActions";
import { connect } from "react-redux";
import {
  POS_ADD_TO_CART,
  SET_SEARCH_KEYWORDS,
  POS_ADD_CUSTOM_PRODUCT,
} from "../../../store/pos/actions/posCartActions";
import Link from "next/link";
import Error from "../Notification/Error";

import Select from "react-select";
// import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const SearchBar = (props) => {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  //   useEffect(() => {
  //     document.getElementById("search_products").focus();
  //   }, []);

  //   const WAIT_INTERVAL = 500;
  //   const ENTER_KEY = 13;
  //   let keyword;
  //   let timer = null;

  //   const searchProducts = (selectedOption) => {

  //     clearTimeout(timer);

  //     keyword = selectedOption;

  //     timer = setTimeout(getProducts, WAIT_INTERVAL);
  //   };

  //   const getProducts = async () => {
  //     // set search keyword to redux for marking the searching result
  //     props.setSearchKeywords(keyword);

  //     let response =
  //       keyword &&
  //       (await axios
  //         .post(`backend/pos-product-search`, {
  //           search_keyword: keyword,
  //         })
  //         .then((result) => {
  //           return result.data;
  //         })
  //         .catch((err) => {
  //           return err;
  //         }));

  //     if (response.success) {
  //       if (!response.data.length) {
  //         setMessage("No product found");
  //       }

  //       let product =
  //         response.data && response.data.find((item) => item.barcode === keyword);

  //       // product barcode and search keyword same then directly product will added to cart and clear the search keyword
  //       if (product) {
  //         props.posAddToCart(product);
  //         document.getElementsByClassName(
  //           "css-b8ldur-Input"
  //         )[0].firstElementChild.firstElementChild.value = "";
  //         document.getElementById("search_products").focus();
  //         props.setSearchKeywords("");
  //       } else {
  //         setProductsData(response.data);
  //         let productsFilterData = response.data.map(
  //           ({ id, name, selling_price, stock }) => {
  //             return {
  //               value: id,
  //               label: name + "(" + stock + ") | Price - ৳ " + selling_price,
  //             };
  //           }
  //         );
  //         setProducts(productsFilterData);
  //       }
  //     }
  //     setTimeout(() => {
  //       setMessage(initialMessage);
  //     }, 3000);
  //   };

  //   const handleChange = (selectedProduct) => {
  //     let product =
  //       productsData &&
  //       selectedProduct &&
  //       productsData.find((item) => item.id === selectedProduct.value);
  //     product && props.posAddToCart(product);
  //     setProducts([]);
  //     document.getElementById("search_products").focus();
  //   };

  const [searchKeyWord, setSearchKeyWord] = useState("");

  useEffect(() => {
    let timerId;
    if (searchKeyWord.length > 0) {
      timerId = setTimeout(() => {
        axios
          .post(`backend/pos-product-search`, {
            search_keyword: searchKeyWord,
          })
          .then((result) => {
            // console.log(result);

            if (result.data.success) {
              if (result.data.data.length === 0) {
                setMessage("No product found");
                setSearchKeyWord("");
                setProductsData([]);
                setProducts([]);
              } else {
                const product = result.data.data.find(
                  (item) => item.barcode === searchKeyWord
                );

                if (product) {
                  props.posAddToCart(product);
                  setSearchKeyWord("");
                  setProductsData([]);
                  setMessage("");
                } else {
                  const productsFilterData = result.data.data.map(
                    ({ id, name, selling_price, stock }) => {
                      return {
                        value: +id,
                        label: `${name} ( ${stock} ) | Price - ৳ ${selling_price} | Search product by ${searchKeyWord}`,
                      };
                    }
                  );
                  setProducts(productsFilterData);
                  setProductsData(result.data.data);
                  setMessage("");
                }
              }
            }
          });
      }, 500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [searchKeyWord]);

  const handleChange = (selectedProduct) => {
    if (selectedProduct) {
      let product = productsData.find(
        (item) => +item.id === +selectedProduct.value
      );
      props.posAddToCart(product);
      setProductsData([]);
      setProducts([]);
      setSearchKeyWord("");
    }
  };

  // console.log(["search", searchKeyWord]);
  // console.log(productsData);
  // console.log(["products", products]);
  //   console.log(message);

  return (
    <>
      {message && <Error message={message} />}
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group">
            {/*<input*/}
            {/*    id="search_products"*/}
            {/*    type="text"*/}
            {/*    className="form-control"*/}
            {/*    onChange={searchProducts}*/}
            {/*    value={keyword}*/}
            {/*    placeholder="Search/Scan product by Name/Barcode"/>*/}

            {/* <CreatableSelect
              closeMenuOnSelect={true}
              components={animatedComponents}
              className="product-search-select p-0"
              id="search_products"
              onInputChange={(selectedOption) => {
                if (selectedOption.length > 0) {
                  setSearchKeyWord(selectedOption.trim());
                }
              }}
              onChange={(selectedOption) => {
                handleChange(selectedOption);
              }}
              onCreateOption={(inputValue) => {
                if (
                  window.confirm(
                    "Are you sure you wish to add this as temporary product?"
                  )
                ) {
                  props.posAddCustomProduct(inputValue);
                }
              }}
              value=""
              options={products}
              autoFocus={true}
              isClearable={true}
              placeholder={"Search/Scan product by Name/Barcode"}
            /> */}

            <Select
              autoFocus={true}
              escapeClearsValue={true}
              closeMenuOnSelect={true}
              components={animatedComponents}
              className="product-search-select p-0"
              classNamePrefix="select"
              id="search_products"
              name="search_products"
              aria-label="search_products"
              onInputChange={(selectedOption) => {
                setSearchKeyWord(selectedOption.trim());
              }}
              onChange={(selectedOption) => {
                handleChange(selectedOption);
              }}
              value=""
              options={products}
              isClearable={true}
              inputValue={searchKeyWord}
              isSearchable={true}
              placeholder={"Search/Scan product by Name/Barcode"}
            />

            <div className="input-group-append" id="button-addon4">
              <Link legacyBehavior href="/admin/product/add">
                <a className="btn btn-outline-secondary rounded-left">
                  <i className="icon-plus-circle-solid" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) =>
      dispatch({ type: SET_PRODUCTS, payload: { products } }),
    posAddToCart: (product) => {
      dispatch({ type: POS_ADD_TO_CART, payload: { product } });
      document.getElementById("search_products").value = "";
    },
    posAddCustomProduct: (product_name) => {
      dispatch({ type: POS_ADD_CUSTOM_PRODUCT, payload: { product_name } });
      document.getElementById("search_products").value = "";
    },
    setSearchKeywords: (keyword) =>
      dispatch({ type: SET_SEARCH_KEYWORDS, payload: { keyword } }),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
