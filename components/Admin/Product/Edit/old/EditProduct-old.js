import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import useDebounce from "../custom-hook/use-debounce";
import process from "../../../../next.config";
import Link from "next/link";
import CategoryContent from "./CategoryContent";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import ProductStyle from "./css/product-styles.module.css";

const EditProduct = ({ productEditData }) => {
  // declare state data for operation
  const [product, setProduct] = useState({
    name: productEditData.name ?? "",
    slug: productEditData.slug ?? "",
    category_ids: productEditData.category_ids
      ? productEditData.category_ids.map(({ id }) => id.toString())
      : [],

    product_brand_id: productEditData.brand.id ?? "",
    product_purchase_unit_id: productEditData.purchase_unit.id ?? "",
    product_sell_unit_id: productEditData.sell_unit.id ?? "",

    weight: productEditData.weight ?? "",
    sku: productEditData.sku ?? "",

    description: productEditData.description ?? "",

    feature_image: productEditData.feature_image ?? "",
    product_images: productEditData.product_images ?? "",

    meta_keywords: productEditData.meta_keywords ?? "",
    meta_description: productEditData.meta_description ?? "",

    product_warranty: productEditData.warranty ?? "",
    attributes: "",

    display_position: productEditData.display_position ?? "",
    status: productEditData.active ? "1" : "0",
    barcode: productEditData.barcode ?? "",
    quantity_alert: productEditData.quantity_alert ?? "",
    selling_price: productEditData.selling_price ?? "",
    in_stock: productEditData.in_stock ? "1" : "0",
    promotional_active: productEditData.promotional_active ? "1" : "0",
    promotional_price: productEditData.promotional_price ?? "",
    promotional_start_date: productEditData.promotional_start_date
      ? new Date(productEditData.promotional_start_date.slice(0, 10))
          .toISOString()
          .slice(0, 10)
      : "",
    promotional_end_date: productEditData.promotional_end_date
      ? new Date(productEditData.promotional_end_date.slice(0, 10))
          .toISOString()
          .slice(0, 10)
      : "",
    is_featured: productEditData.is_featured ? "1" : "0",
    sort_order: productEditData.sort_order,
  });

  // error message state variable
  const [productError, setProductError] = useState({
    name: "",
    name_error: "",

    slug: "",
    slug_error: "",

    category_ids: "",
    category_ids_error: "",

    product_brand_id: "",
    product_brand_id_error: "",

    product_purchase_unit_id: "",
    product_purchase_unit_id_error: "",

    product_sell_unit_id: "",
    product_sell_unit_id_error: "",

    weight: "",
    weight_error: "",

    description: "",
    description_error: "",

    feature_image: "",
    feature_image_error: "",

    product_images: "",
    product_images_error: "",

    meta_keywords: "",
    meta_keywords_error: "",

    meta_description: "",
    meta_description_error: "",

    product_warranty: "",
    product_warranty_error: "",

    display_position: "",
    display_position_error: "",

    status: "",
    status_error: "",

    barcode: "",
    barcode_error: "",

    quantity_alert: "",
    quantity_alert_error: "",

    selling_price: "",
    selling_price_error: "",

    in_stock: "",
    in_stock_error: "",

    promotional_active: "",
    promotional_active_error: "",

    promotional_price: "",
    promotional_price_error: "",

    promotional_start_date: "",
    promotional_start_date_error: "",

    promotional_end_date: "",
    promotional_end_date_error: "",

    is_featured: "",
    is_featured_error: "",

    sort_order: "",
    sort_order_error: "",
  });

  // declare state data for option select data for react select data
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [sellUnits, setSellUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [featureImagePreview, setFeatureImagePreview] = useState(
    productEditData.feature_image
  );
  const [productImagePreview, setProductImagePreview] = useState(
    productEditData.product_images
  );

  // all select default option
  const [defaultBrandOption, setDefaultBrandOption] = useState({
    value: productEditData.brand.id,
    label: productEditData.brand.name,
  });
  const [defaultPurchaseUnitOption, setDefaultPurchaseUnitOption] = useState({
    value: productEditData.purchase_unit.id,
    label: productEditData.purchase_unit.name,
  });
  const [defaultSellUnitOption, setDefaultSellUnitOption] = useState({
    value: productEditData.sell_unit.id,
    label: productEditData.sell_unit.name,
  });

  // disabled field during submit form
  const [disabledFiled, setDisabledFiled] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const debouncedBarcode = useDebounce(
    product.barcode === productEditData.barcode ? "" : product.barcode,
    1000
  );

  useEffect(() => {
    if (debouncedBarcode) {
      const inputedBarcode = new FormData();
      inputedBarcode.append("barcode", parseInt(debouncedBarcode));
      axios
        .post(
          `${process.env.api_backend_url}/products/checkBarcode`,
          inputedBarcode
        )
        .then((results) => {
          if (results.data.success) {
            setProductError({
              ...productError,
              barcode: "is-valid",
              barcode_error: "",
            });
          } else {
            setProductError({
              ...productError,
              barcode: "is-invalid",
              barcode_error: results.data.message,
            });
          }
        });
    }
  }, [debouncedBarcode]);

  // all fetching data api
  const apiFetching = async () => {
    const brandApiUrl = await `${process.env.api_backend_url}/brands`;
    const categoryApiUrl = await `${process.env.api_backend_url}/getAllCategoryWithChild`;
    const unitApiUrl = await `${process.env.api_backend_url}/units`;

    const brandApiRequest = axios.get(brandApiUrl);
    const categoryApiRequest = axios.get(categoryApiUrl);
    const unitApiRequest = axios.get(unitApiUrl);

    axios
      .all([brandApiRequest, categoryApiRequest, unitApiRequest])
      .then(
        axios.spread((...responses) => {
          // brand api response
          if (responses[0].data.success) {
            let fetchedData = responses[0].data.data;
            let brandsData = fetchedData.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            });
            setBrands(brandsData);
          } else {
            setBrands(responses[0].data.errors);
          }

          // category api response
          if (responses[1].data.success) {
            setCategories(responses[1].data.data);
          } else {
            setCategories(responses[1].data.errors);
          }

          //unit api response
          if (responses[2].data.success) {
            let fetchedData = responses[2].data.data;
            let unitsData = fetchedData.map(({ id, name }) => {
              return {
                value: id,
                label: name,
              };
            });
            setUnits(unitsData);
            setSellUnits(unitsData);
          } else {
            setUnits(responses[2].data.error);
            setSellUnits(responses[2].data.error);
          }
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };

  // react hook calling once
  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
    if (!loadingData) {
      apiFetching();
    }
    return () => {
      setLoadingData(true);
    };
  }, []);

  // array remove helper function
  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }

  // handling all inout filed data
  const handleProductData = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    /// For slugify string and filter slug data
    if (event.target.name === "name") {
      product.slug = slugify(event.target.value);
      productError.slug &&
        setProductError({ ...productError, slug: "", slug_error: "" });
    } else if (event.target.name === "slug") {
      value = slugify(event.target.value);
    }

    // Creating Category Array
    else if (event.target.name === "category_ids") {
      if (event.target.checked === true) {
        value = product.category_ids;
        value.push(event.target.value);
      } else if (event.target.checked === false) {
        value = arrayRemove(product.category_ids, event.target.value);
      }
    }

    // Preparing Image data for api posting
    else if (event.target.name === "feature_image") {
      value = event.target.files[0];
      setFeatureImagePreview(URL.createObjectURL(value));
    } else if (event.target.name === "product_images") {
      value = event.target.files;
      let allData = [];
      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          allData.push(URL.createObjectURL(value[i]));
        }
      }
      setProductImagePreview(allData);
    } else if (event.target.name === "status") {
      value = event.target.checked ? "1" : "0";
    } else if (name === "in_stock") {
      value = event.target.checked ? "1" : "0";
    } else if (name === "promotional_active") {
      value = event.target.checked ? "1" : "0";
    } else if (name === "barcode") {
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (event.target.value === "" || pattern.test(event.target.value)) {
        value = event.target.value;
      } else {
        value = product.barcode;
      }
    } else if (name === "selling_price") {
      value = value ? parseFloat(value) : "";
      if (value < 0) {
        value = product.selling_price;
      }
    } else if (name === "quantity_alert") {
      value = value ? parseFloat(value) : "";
      if (value < 0) {
        value = product.quantity_alert;
      }
    } else if (name === "weight") {
      value = value ? parseFloat(value) : "";
      if (value < 0) {
        value = product.quantity_alert;
      }
    } else if (name === "is_featured") {
      value = event.target.checked ? "1" : "0";
    } else if (name === "status") {
      value = event.target.checked ? "1" : "0";
    }

    setProduct({ ...product, [name]: value });

    productError[name] &&
      setProductError({ ...productError, [name]: "", [name + "_error"]: "" });
  };

  // slugify helper function
  const slugify = (toConvertText) => {
    toConvertText = toConvertText.replace(/^\s+|\s+$/g, "");

    // Make the string lowercase
    toConvertText = toConvertText.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      toConvertText = toConvertText.replace(
        new RegExp(from.charAt(i), "g"),
        to.charAt(i)
      );
    }

    // Remove invalid chars
    toConvertText = toConvertText
      .replace(/[^a-z0-9 -]/g, "")
      // Collapse whitespace and replace by -
      .replace(/\s+/g, "-")
      // Collapse dashes
      .replace(/-+/g, "-");

    return toConvertText;
  };

  // reset all state value
  const resetProductFormData = (event) => {
    event.preventDefault();
    document.getElementById("productFormData").reset();

    setProduct({
      name: "",
      slug: "",
      category_ids: [],
      product_brand_id: "",
      product_purchase_unit_id: "",
      product_sell_unit_id: "",
      weight: "",
      sku: "",
      description: "",
      feature_image: "",
      product_images: "",
      meta_keywords: "",
      meta_description: "",
      product_warranty: "",
      attributes: "",
      display_position: "",
      status: "1",
      barcode: "",
      quantity_alert: "",
      selling_price: "",
      in_stock: "0",
      promotional_active: "0",
      promotional_price: "",
      promotional_start_date: "",
      promotional_end_date: "",
      is_featured: "0",
      sort_order: "",
    });

    setProductError({
      name: "",
      name_error: "",

      slug: "",
      slug_error: "",

      category_ids: [],
      category_ids_error: [],

      product_brand_id: "",
      product_brand_id_error: "",

      product_purchase_unit_id: "",
      product_purchase_unit_id_error: "",

      product_sell_unit_id: "",
      product_sell_unit_id_error: "",

      weight: "",
      weight_error: "",

      sku: "",
      sku_error: "",

      description: "",
      description_error: "",

      feature_image: "",
      feature_image_error: "",

      product_images: "",
      product_images_error: "",

      meta_keywords: "",
      meta_keywords_error: "",

      meta_description: "",
      meta_description_error: "",

      product_warranty: "",
      product_warranty_error: "",

      attributes: "",
      attributes_error: "",

      display_position: "",
      display_position_error: "",

      status: "",
      status_error: "",

      barcode: "",
      barcode_error: "",

      quantity_alert: "",
      quantity_alert_error: "",

      selling_price: "",
      selling_price_error: "",

      in_stock: "",
      in_stock_error: "",

      promotional_active: "",
      promotional_active_error: "",

      promotional_price: "",
      promotional_price_error: "",

      promotional_start_date: "",
      promotional_start_date_error: "",

      promotional_end_date: "",
      promotional_end_date_error: "",

      is_featured: "",
      is_featured_error: "",

      sort_order: "",
      sort_order_error: "",
    });

    setDefaultBrandOption((defaultBrandOption) => null);
    setDefaultPurchaseUnitOption((defaultPurchaseUnitOption) => null);
    setDefaultSellUnitOption((defaultSellUnitOption) => null);

    setFeatureImagePreview("");
    setProductImagePreview([]);
    setDisabledFiled("");
  };

  // submit product data on api
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !product.name ||
      !product.slug ||
      !product.category_ids.length ||
      !product.product_brand_id.toString().length ||
      !product.product_purchase_unit_id.toString().length ||
      !product.product_sell_unit_id.toString().length ||
      !product.feature_image ||
      !product.product_images
    ) {
      setProductError({
        ...product,
        name: !product.name ? "is-invalid" : "",
        name_error: !product.name ? "Product name filed is required" : "",

        slug: !product.slug ? "is-invalid" : "",
        slug_error: !product.slug ? "Product slug filed is required" : "",

        category_ids: !product.category_ids.length ? "is-invalid" : "",
        category_ids_error: !product.category_ids.length
          ? "Product category filed is required"
          : "",

        product_brand_id: !product.product_brand_id.toString().length
          ? "is-invalid"
          : "",
        product_brand_id_error: !product.product_brand_id.toString().length
          ? "Product brand filed is required"
          : "",

        product_purchase_unit_id: !product.product_purchase_unit_id.toString()
          .length
          ? "is-invalid"
          : "",
        product_purchase_unit_id_error: !product.product_purchase_unit_id.toString()
          .length
          ? "Product purchase unit filed is required"
          : "",

        product_sell_unit_id: !product.product_sell_unit_id.toString().length
          ? "is-invalid"
          : "",
        product_sell_unit_id_error: !product.product_sell_unit_id.toString()
          .length
          ? "Product sell unit is required"
          : "",

        feature_image: !product.feature_image ? "is-invalid" : "",
        feature_image_error: !product.feature_image
          ? "Product feature image filed is required"
          : "",

        product_images: !product.product_images ? "is-invalid" : "",
        product_images_error: !product.product_images
          ? "Product product image filed is required"
          : "",
      });
    } else {
      setDisabledFiled("disabled");
      const brandApiUrl = `${process.env.api_backend_url}/products/${productEditData.id}`; // api url for post data
      const productInfoData = new FormData(); // create form data for post data

      // append FormData for papering axios data for posting api url
      product.name && productInfoData.append("name", product.name);
      product.slug && productInfoData.append("slug", product.slug);

      product.description &&
        productInfoData.append("description", product.description ?? "");
      product.meta_keywords &&
        productInfoData.append("meta_keywords", product.meta_keywords ?? "");
      product.meta_description &&
        productInfoData.append(
          "meta_description",
          product.meta_description ?? ""
        );
      product.product_warranty &&
        productInfoData.append(
          "product_warranty",
          product.product_warranty ?? ""
        );
      productInfoData.append("status", product.status ?? "0");

      // multiple category ids select
      product.category_ids &&
        product.category_ids.map((categoryId) => {
          productInfoData.append("category_ids[]", categoryId);
        });

      product.product_brand_id &&
        productInfoData.append(
          "product_brand_id",
          product.product_brand_id ?? ""
        );
      product.product_purchase_unit_id &&
        productInfoData.append(
          "product_purchase_unit_id",
          product.product_purchase_unit_id ?? ""
        );
      product.product_sell_unit_id &&
        productInfoData.append(
          "product_sell_unit_id",
          product.product_sell_unit_id ?? ""
        );
      product.weight && productInfoData.append("weight", product.weight ?? "");

      product.sku && productInfoData.append("sku", product.sku ?? "");

      product.barcode &&
        productInfoData.append("barcode", product.barcode ?? "");
      product.quantity_alert &&
        productInfoData.append("quantity_alert", product.quantity_alert ?? "");
      product.selling_price &&
        productInfoData.append("selling_price", product.selling_price ?? "");
      product.in_stock &&
        productInfoData.append("in_stock", product.in_stock ?? "");
      product.promotional_active &&
        productInfoData.append(
          "promotional_active",
          product.promotional_active ?? ""
        );
      product.promotional_price &&
        productInfoData.append(
          "promotional_price",
          product.promotional_price ?? ""
        );
      product.promotional_start_date &&
        productInfoData.append(
          "promotional_start_date",
          product.promotional_start_date ?? ""
        );
      product.promotional_end_date &&
        productInfoData.append(
          "promotional_end_date",
          product.promotional_end_date ?? ""
        );

      product.is_featured &&
        productInfoData.append("is_featured", product.is_featured ?? "");

      product.sort_order &&
        productInfoData.append("sort_order", product.sort_order ?? "");

      // image data manipulation
      typeof product.feature_image === "object" &&
        productInfoData.append("feature_image", product.feature_image);
      if (product.product_images.length) {
        for (let index = 0; index < product.product_images.length; index++) {
          typeof product.product_images[index] === "object" &&
            productInfoData.append(
              "product_images[]",
              product.product_images[index]
            );
        }
      }

      productInfoData.append("_method", "PUT");

      // multipart form data posting
      const config = {
        headers: {
          "content-type": "multipart/form-data;",
        },
      };

      // axios api form post request
      await axios
        .post(brandApiUrl, productInfoData, config)
        .then((apiResponses) => {
          if (apiResponses.data.success) {
            // resetProductFormData(event);
            setTimeout(
              () =>
                setSuccessMessage({
                  ...successMessage,
                  status: false,
                  message: "",
                }),
              3000
            );
            setSuccessMessage({
              ...successMessage,
              status: true,
              message: apiResponses.data.message,
            });
          } else {
            Object.keys(apiResponses.data.errors).map((name) => {
              if (name.includes("product_images")) {
                setProductError((productError) => ({
                  ...productError,
                  ["product_images"]: "is-invalid",
                  ["product_images" + "_error"]: apiResponses.data.errors[
                    name
                  ].join(),
                }));
              } else {
                setProductError((productError) => ({
                  ...productError,
                  [name]: "is-invalid",
                  [name + "_error"]: apiResponses.data.errors[name].join(),
                }));
              }
            });
            setDisabledFiled("");
            setErrorMessage({
              ...errorMessage,
              status: true,
              message: apiResponses.data.message,
            });
            setTimeout(
              () =>
                setErrorMessage({
                  ...errorMessage,
                  status: false,
                  message: "",
                }),
              3000
            );
          }
        })
        .catch((errors) => {
          throw errors;
        })
        .finally(() => {
          setTimeout(() => setDisabledFiled(""), 3000);
        });
    }
  };

  return (
    <>
      {successMessage.status && <Success message={successMessage.message} />}

      {errorMessage.status && <Error message={errorMessage.message} />}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-pencil-alt" />
                    <h2>Edit Product</h2>
                    <Link legacyBehavior href={"/admin/product"}>
                      <a className="fbh-btn" title="Product List">
                        <i className="icon-list2" />
                      </a>
                    </Link>
                  </div>
                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with * are required input fields.
                    </p>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <form encType="multipart/form-data" id="productFormData">
                    <fieldset disabled={disabledFiled ?? ""}>
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="name">
                                  Name <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.name}`}
                                  id="name"
                                  placeholder="name"
                                  value={product.name}
                                  name="name"
                                  onChange={handleProductData}
                                />
                                {productError.name_error && (
                                  <div className="invalid-feedback">
                                    {productError.name_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="slug">
                                  Slug <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.slug}`}
                                  id="slug"
                                  placeholder="slug"
                                  value={product.slug}
                                  name="slug"
                                  onChange={handleProductData}
                                />
                                {productError.slug && (
                                  <div className="invalid-feedback">
                                    {productError.slug_error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <label
                                  htmlFor="brand"
                                  className={`is-invalid ${productError.product_brand_id}`}
                                >
                                  Brand
                                </label>
                                <Select
                                  instanceId="brand"
                                  value={defaultBrandOption}
                                  isClearable={true}
                                  onChange={(selectedOption) => {
                                    setProduct({
                                      ...product,
                                      product_brand_id: selectedOption
                                        ? selectedOption.value
                                        : "",
                                    });

                                    setDefaultBrandOption(
                                      selectedOption
                                        ? {
                                            ...defaultBrandOption,
                                            value: selectedOption.value,
                                            label: selectedOption.label,
                                          }
                                        : null
                                    );

                                    productError.product_brand_id &&
                                      setProductError({
                                        ...productError,
                                        product_brand_id: "",
                                        product_brand_id_error: "",
                                      });
                                  }}
                                  options={brands}
                                  autoFocus={false}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                  })}
                                />
                                {productError.product_brand_id && (
                                  <div className="invalid-feedback">
                                    {productError.product_brand_id_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div className="form-group">
                                <label
                                  htmlFor="units"
                                  className={`is-invalid ${productError.product_purchase_unit_id}`}
                                >
                                  Purchase unit
                                </label>
                                <Select
                                  instanceId="unit"
                                  value={defaultPurchaseUnitOption}
                                  isClearable={true}
                                  onChange={(selectedOption) => {
                                    setProduct({
                                      ...product,
                                      product_purchase_unit_id: selectedOption
                                        ? selectedOption.value
                                        : "",
                                    });

                                    setDefaultPurchaseUnitOption(
                                      selectedOption
                                        ? {
                                            ...defaultPurchaseUnitOption,
                                            value: selectedOption.value,
                                            label: selectedOption.label,
                                          }
                                        : null
                                    );

                                    productError.product_purchase_unit_id &&
                                      setProductError({
                                        ...productError,
                                        product_purchase_unit_id: "",
                                        product_purchase_unit_id_error: "",
                                      });
                                  }}
                                  options={units}
                                  autoFocus={false}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                  })}
                                />
                                {productError.product_purchase_unit_id && (
                                  <div className="invalid-feedback">
                                    {productError.product_sell_unit_id_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div className="form-group">
                                <label
                                  htmlFor="sellUnits"
                                  className={`is-invalid ${productError.product_sell_unit_id}`}
                                >
                                  Sell unit
                                </label>
                                <Select
                                  instanceId="sellUnits"
                                  name="sellUnits"
                                  value={defaultSellUnitOption}
                                  isClearable={true}
                                  onChange={(selectedOption) => {
                                    setProduct({
                                      ...product,
                                      product_sell_unit_id: selectedOption
                                        ? selectedOption.value
                                        : "",
                                    });

                                    setDefaultSellUnitOption(
                                      selectedOption
                                        ? {
                                            ...defaultSellUnitOption,
                                            value: selectedOption.value,
                                            label: selectedOption.label,
                                          }
                                        : null
                                    );

                                    productError.product_sell_unit_id &&
                                      setProductError({
                                        ...productError,
                                        product_sell_unit_id: "",
                                        product_sell_unit_id_error: "",
                                      });
                                  }}
                                  options={sellUnits}
                                  autoFocus={false}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                  })}
                                />
                                {productError.product_sell_unit_id && (
                                  <div className="invalid-feedback">
                                    {productError.product_sell_unit_id_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-3">
                              <div className="form-group">
                                <label htmlFor="weight">Weight</label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.weight}`}
                                  id="weight"
                                  placeholder="weight"
                                  value={product.weight}
                                  name="weight"
                                  onChange={handleProductData}
                                />
                                {productError.weight && (
                                  <div className="invalid-feedback">
                                    {productError.weight_error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  className={`form-control ${productError.description}`}
                                  id="description"
                                  value={product.description}
                                  name="description"
                                  onChange={handleProductData}
                                  rows="6"
                                  placeholder="description"
                                />
                                {productError.description && (
                                  <div className="invalid-feedback">
                                    {productError.description_error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="metaKeywords">
                                  Meta keywords
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.meta_keywords}`}
                                  id="metaKeywords"
                                  value={product.meta_keywords}
                                  name="meta_keywords"
                                  onChange={handleProductData}
                                  placeholder="meta keywords"
                                />
                                {productError.meta_keywords && (
                                  <div className="invalid-feedback">
                                    {productError.meta_keywords_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="metaDescription">
                                  Meta description
                                </label>
                                <textarea
                                  className={`form-control ${productError.meta_description}`}
                                  id="metaDescription"
                                  name="meta_description"
                                  value={product.meta_description}
                                  onChange={handleProductData}
                                  rows="6"
                                  placeholder="meta description"
                                />
                                {productError.meta_description && (
                                  <div className="invalid-feedback">
                                    {productError.meta_description_error}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <label htmlFor="warranty">Warranty</label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.product_warranty}`}
                                  id="warranty"
                                  value={product.product_warranty}
                                  name="product_warranty"
                                  onChange={handleProductData}
                                  placeholder="warranty"
                                />
                                {productError.product_warranty && (
                                  <div className="invalid-feedback">
                                    {productError.product_warranty_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="code">Sku</label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.sku}`}
                                  id="sku"
                                  value={product.sku}
                                  name="sku"
                                  onChange={handleProductData}
                                  placeholder="stock keeping unit"
                                />
                                {productError.sku && (
                                  <div className="invalid-feedback">
                                    {productError.sku_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* barcode */}
                            <div className="col-lg-5">
                              <div className="form-group">
                                <label htmlFor="barcode">Barcode</label>
                                <input
                                  type="text"
                                  className={`form-control ${productError.barcode}`}
                                  id="barcode"
                                  name="barcode"
                                  value={product.barcode}
                                  onChange={handleProductData}
                                  placeholder="product barcode"
                                />
                                {productError.barcode && (
                                  <div className="invalid-feedback">
                                    {productError.barcode_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="card mb-3">
                                <div className="card-header">
                                  <div className="fbh-title">
                                    <h6>Product image gallery</h6>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group mt-3">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className={`custom-file-input ${productError.product_images}`}
                                        id="productImage"
                                        name="product_images"
                                        onChange={handleProductData}
                                        multiple
                                      />
                                      <label
                                        className="custom-file-label cfl-left-align"
                                        htmlFor="productImage"
                                      >
                                        <span className="d-inline-block text-truncate w-75">
                                          choose image
                                        </span>
                                      </label>

                                      {productError.product_images && (
                                        <div className="invalid-feedback">
                                          {productError.product_images_error}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {productImagePreview && (
                                    <div
                                      className={`form-group ${ProductStyle.customImageList}`}
                                    >
                                      {productImagePreview.map(
                                        (image, index) => (
                                          <img
                                            src={image}
                                            width={`100`}
                                            height={`100`}
                                            style={{ float: "left" }}
                                            alt={`product image`}
                                            key={++index}
                                          />
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="card mb-3">
                            <div className="card-header">
                              <div className="fbh-title">
                                <h6>
                                  Category{" "}
                                  <span className="text-danger">*</span>
                                </h6>
                              </div>
                            </div>
                            <div className="card-body">
                              <div
                                className={`form-group ${
                                  ProductStyle.customCatList
                                } ${
                                  productError.category_ids === "is-invalid"
                                    ? "border-danger"
                                    : ""
                                }`}
                              >
                                <CategoryContent
                                  category_ids={product.category_ids}
                                  categories={categories}
                                  handleProductData={handleProductData}
                                />
                              </div>
                            </div>
                            {productError.category_ids && (
                              <div className="card-footer">
                                <div className="text-danger small">
                                  {productError.category_ids_error}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="card mb-3">
                            <div className="card-header">
                              <div className="fbh-title">
                                <h6>Feature image</h6>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="form-group mt-3">
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className={`custom-file-input ${productError.feature_image}`}
                                    name={`feature_image`}
                                    id="featureImage"
                                    onChange={handleProductData}
                                  />
                                  <label
                                    className="custom-file-label cfl-left-align"
                                    htmlFor="featureImage"
                                  >
                                    <span className="d-inline-block text-truncate w-75">
                                      choose image
                                    </span>
                                  </label>
                                  {productError.feature_image && (
                                    <div className="invalid-feedback">
                                      {productError.feature_image_error}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className={ProductStyle.customImageList}>
                                {featureImagePreview && (
                                  <img
                                    src={featureImagePreview}
                                    className="card-img-bottom"
                                    height="auto"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            {/* strat product sorting order */}
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="sort_order">
                                  Sorting order
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${productError.sort_order}`}
                                  id="sort_order"
                                  name="sort_order"
                                  value={product.sort_order}
                                  onChange={handleProductData}
                                  placeholder="sorting order"
                                />
                                {productError.sort_order && (
                                  <div className="invalid-feedback">
                                    {productError.sort_order_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* end product sorting order */}

                            {/* strat product quantity alert */}
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="quantity_alert">
                                  Quantity alert
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${productError.quantity_alert}`}
                                  id="quantity_alert"
                                  name="quantity_alert"
                                  value={product.quantity_alert}
                                  onChange={handleProductData}
                                  placeholder="quantity alert"
                                />
                                {productError.quantity_alert && (
                                  <div className="invalid-feedback">
                                    {productError.quantity_alert_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* end product qunatity alert */}

                            {/* start product selling price */}
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="selling_price">
                                  Selling price
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${productError.selling_price}`}
                                  id="selling_price"
                                  name="selling_price"
                                  value={product.selling_price ?? ""}
                                  onChange={handleProductData}
                                  placeholder="Selling price"
                                />
                                {productError.selling_price && (
                                  <div className="invalid-feedback">
                                    {productError.selling_price_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* end product selling price */}

                            {/* start product is featrured */}
                            <div className="col-md-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  defaultChecked={product.is_featured === "1"}
                                  name="is_featured"
                                  onChange={handleProductData}
                                  id="is_featured"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="is_featured"
                                >
                                  Is featured
                                </label>
                              </div>
                            </div>
                            {/* end product is featured */}

                            {/* start product instock */}
                            <div className="col-md-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  defaultChecked={
                                    product.in_stock === "1" ? true : false
                                  }
                                  name="in_stock"
                                  onChange={handleProductData}
                                  id="in_stock"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="in_stock"
                                >
                                  In stock
                                </label>
                              </div>
                            </div>
                            {/* end product instock */}

                            {/* start product promation */}
                            <div className="col-md-12">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  defaultChecked={
                                    product.promotional_active === "1"
                                      ? true
                                      : false
                                  }
                                  name="promotional_active"
                                  onChange={handleProductData}
                                  id="promotional_active"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="promotional_active"
                                >
                                  Is promotional offer
                                </label>
                              </div>
                            </div>
                            {/* end product promation */}
                            {product.promotional_active === "1" && (
                              <>
                                {/* start product promation price */}
                                <div className="col-md-12">
                                  <div className="form-group mt-2">
                                    <label htmlFor="promotional_price">
                                      Promotional Price
                                    </label>
                                    <input
                                      type="number"
                                      className={`form-control ${productError.promotional_price}`}
                                      id="promotional_price"
                                      name="promotional_price"
                                      value={product.promotional_price ?? ""}
                                      onChange={handleProductData}
                                    />
                                    {productError.promotional_price_error && (
                                      <div className="invalid-feedback">
                                        {productError.promotional_price_error}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* end product promation price */}
                                {/* end product promation start date */}
                                <div className="col-md-12">
                                  <div className="form-group mt-2">
                                    <label htmlFor="promotional_start_date">
                                      Promotional start date
                                    </label>
                                    <input
                                      type="date"
                                      className={`form-control ${productError.promotional_start_date}`}
                                      id="promotional_start_date"
                                      name="promotional_start_date"
                                      value={product.promotional_start_date}
                                      onChange={handleProductData}
                                    />
                                    {productError.promotional_start_date && (
                                      <div className="invalid-feedback">
                                        {
                                          productError.promotional_start_date_error
                                        }
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* end product promation start date */}

                                {/* end product promation end date */}
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="promotional_end_date">
                                      Promotional end date
                                    </label>
                                    <input
                                      type="date"
                                      className={`form-control ${productError.promotional_end_date}`}
                                      id="promotional_end_date"
                                      name="promotional_end_date"
                                      value={product.promotional_end_date}
                                      onChange={handleProductData}
                                    />
                                    {productError.promotional_end_date && (
                                      <div className="invalid-feedback">
                                        {
                                          productError.promotional_end_date_error
                                        }
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {/* end product promation end date */}
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 text-left">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              defaultChecked={product.status === "1"}
                              name="status"
                              onChange={handleProductData}
                              id="status"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="status"
                            >
                              Active
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 text-right">
                          <Link legacyBehavior href={"/admin/product"}>
                            <a className="btn btn-info mr-1">
                              <i className="icon-arrow-left-solid mr-1 mr-1" />
                              back to list
                            </a>
                          </Link>

                          <button
                            className="btn btn-danger mr-2"
                            onClick={resetProductFormData}
                          >
                            <i className="icon-reset mr-1" /> Reset
                          </button>

                          <button
                            className="btn btn-primary mr-2"
                            onClick={handleSubmit}
                          >
                            {disabledFiled === "disabled" ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                />{" "}
                                updating...
                              </>
                            ) : (
                              <>
                                <i className="icon-save-regular mr-1" /> update
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProduct;
