import React, { memo, useState, useEffect, useCallback } from "react";
import UserSearch from "./UserSearch";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
// import Success from "../Notification/Success";
// import Error from "../Notification/Error";
import MessageNotification from "../../Ui/Notification/Message";
import Link from "next/link";

import InputField from "../../Ui/Form/InputField";
import InputFiles from "../../Ui/Form/InputFiles";
import SelectField from "../../Ui/Form/SelectField";
import useHttp from "../../../hooks/useHttp";
import { pattern } from "../../../Helpers/Utils/phoneNumberValidation";

// import { ERROR, saveFileAction, SUCCESS } from "../../../Helpers/Utils/Utils";

import categorySelectStyle from "./css/category-select-styles.module.css";

// import categorySelectStyle from "../css/category-select-styles.module.css";

let staticStatusOptions;

import { useRouter } from "next/router";

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const MerchantEditForm = memo((props) => {
  console.log("merchant shop form edit  component");
  const router = useRouter();
  const shopQueryId = router.query.id;

  const [merchantData, setMerchantData] = useState({
    name: "", //string required
    shop_type: [], //number[] required
    // company_name: "", //string
    shop_logo: "", //string required
    banner: "", //string
    description: "", //string
    // phone: "", //string
    mobile: "", //string required
    shop_email: "", //string
    address: "", //string required
    city: "", //string
    zip_code: "", //string
    country: "", //string
    // currency: "", //string
    social_links: [], //add input json index array
    // contact_infos: "", //string
    // theme_id: "", //number
    vat_reg: "", //string required
    lat: "", //number required
    long: "", //number required
    zoom_label: "", //integer
    radius: "", //number
    base_delivery_charge: "", //number
    per_kilometre_delivery_charge: "", //number
    // commission_rate: "", //number
    is_featured: false, //boolean checkbox
    is_popular: false, //boolean checkbox
    nid: "", //string
    nid_approved: false, //boolean checkbox
    trade_license: "", //string required
    trade_license_approved: false, //boolean checkbox
    status: "submitted", //string select
    close_open_time: "", //add input json index array
    shop_images: [], //string[] required
    meta_title: "", //string
    meta_keyword: "", //string
    meta_description: "", //string
    shop_delivery_price_distance_wise: "",
  });

  const {
    isLoading: isLoadingShopForm,
    success: isSuccessShopForm,
    httpFetch: httpFetchShopForm,
    successMessage: successMessageShopForm,
    error: errorShopForm,
    errorMessage: errorMessageShopForm,
    clearError: clearErrorShopForm,
    clearSuccess: clearSuccessShopForm,
  } = useHttp();

  const submitFormHandler = (event) => {
    event.preventDefault();
    // const pattern = new RegExp(/^01[13456789]\d{8}$/);
    // setLoading(true);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", merchantData.name);
    // console.log(merchantData.name);

    if (merchantData.shop_type && merchantData.shop_type.length !== 0) {
      merchantData.shop_type.forEach((type) => {
        formData.append("shop_type[]", type);
      });
    }

    // formData.append("company_name", merchantData.company_name);
    formData.append("shop_logo", merchantData.shop_logo);
    formData.append("banner", merchantData.banner);
    formData.append("description", merchantData.description);
    // formData.append("phone", merchantData.phone);
    if (pattern.test(merchantData.mobile)) {
      formData.append("mobile", merchantData.mobile);
    }

    formData.append("shop_email", merchantData.shop_email);
    // console.log(merchantData.shop_email);
    formData.append("address", merchantData.address);
    formData.append("city", merchantData.city);
    formData.append("zip_code", merchantData.zip_code);
    formData.append("country", merchantData.country);
    // formData.append("currency", merchantData.currency);

    formData.append("social_links", merchantData.social_links);

    // formData.append("contact_infos", merchantData.contact_infos);
    // formData.append("theme_id", merchantData.theme_id);
    formData.append("vat_reg", merchantData.vat_reg);

    formData.append(
      "shop_delivery_price_distance_wise",
      merchantData.shop_delivery_price_distance_wise
    );

    formData.append("lat", merchantData.lat);
    formData.append("long", merchantData.long);
    formData.append("zoom_label", merchantData.zoom_label);
    // formData.append("radius", merchantData.radius);
    formData.append("base_delivery_charge", merchantData.base_delivery_charge);
    formData.append(
      "per_kilometre_delivery_charge",
      merchantData.per_kilometre_delivery_charge
    );
    // formData.append("commission_rate", merchantData.commission_rate);
    formData.append("is_featured", merchantData.is_featured);
    formData.append("is_popular", merchantData.is_popular);
    formData.append("nid", merchantData.nid);
    formData.append("nid_approved", merchantData.nid_approved);
    formData.append("trade_license", merchantData.trade_license);
    formData.append(
      "trade_license_approved",
      merchantData.trade_license_approved
    );
    formData.append("status", merchantData.status);
    formData.append("close_open_time", merchantData.close_open_time);

    if (merchantData.shop_images && merchantData.shop_images.length !== 0) {
      merchantData.shop_images.forEach((file) => {
        formData.append("shop_images[]", file);
      });
    }

    formData.append("meta_title", merchantData.meta_title);
    formData.append("meta_keyword", merchantData.meta_keyword);
    formData.append("meta_description", merchantData.meta_description);
    // console.log(shopQueryId);
    httpFetchShopForm(`backend/shop/${shopQueryId}`, "post", formData, {
      "Content-Type": "multipart/form-data",
    });

    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data;",
    //   },
    // };
    // saveFileAction(`/backend/shop`, formData, config)
    //   .then((result) => {
    //     setMessageStatus(true);
    //     setMessage({
    //       success: result.success,
    //       message: result.message,
    //     });
    //     if (result.success) {
    //       setLoading(false);
    //     } else {
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     setTimeout(() => setMessageStatus(false), 2000);
    //   });
  };

  const {
    isLoading: isLoadingGetShop,
    data: dataGetShop,
    httpFetch: httpFetchGetShop,
    success: isSuccessGetShop,
  } = useHttp();

  useEffect(() => {
    httpFetchGetShop(`backend/shop/${shopQueryId}`, "get", null, {
      "Content-Type": "application/json",
    });
  }, [shopQueryId]);

  useEffect(() => {
    if (isSuccessShopForm) {
      router.replace("/admin/merchant");
    }
  }, [isSuccessShopForm]);

  useEffect(() => {
    if (isSuccessGetShop) {
      setMerchantData((prevState) => {
        return {
          ...prevState,
          name: dataGetShop?.name ?? "", //string required
          // shop_type: dataGetShop?.shop_type ?? [], //number[] required
          // company_name: dataGetShop?.company_name ?? "", //string
          // shop_logo: dataGetShop.shop_logo ?? "", //string required
          // banner: dataGetShop.banner ?? "", //string
          description: dataGetShop?.description ?? "", //string
          // phone: dataGetShop?.phone ?? "", //string
          mobile: dataGetShop?.mobile ?? "", //string required
          shop_email: dataGetShop?.shop_email ?? "", //string
          address: dataGetShop?.address ?? "", //string required
          city: dataGetShop?.city ?? "", //string
          zip_code: dataGetShop?.zip_code ?? "", //string
          country: dataGetShop?.country ?? "", //string
          // currency: dataGetShop?.currency ?? "", //string
          social_links: dataGetShop?.social_links ?? [], //add input json index array
          // contact_infos: dataGetShop?.contact_infos ?? "", //string
          // theme_id: dataGetShop?.theme_id ?? "", //number
          vat_reg: dataGetShop?.vat_reg ?? "", //string required
          lat: dataGetShop?.lat ?? "", //number required
          long: dataGetShop?.long ?? "", //number required
          zoom_label: dataGetShop?.zoom_label ?? "", //integer
          radius: dataGetShop?.radius ?? "", //number
          base_delivery_charge: dataGetShop?.base_delivery_charge ?? "", //number
          per_kilometre_delivery_charge:
            dataGetShop?.per_kilometre_delivery_charge ?? "", //number
          // commission_rate: dataGetShop?.commission_rate ?? "", //number
          is_featured: dataGetShop?.is_featured ?? false, //boolean checkbox
          is_popular: dataGetShop?.is_popular ?? false, //boolean checkbox
          nid: dataGetShop?.nid ?? "", //string
          nid_approved: dataGetShop?.nid_approved ?? false, //boolean checkbox
          trade_license: dataGetShop?.trade_license ?? "", //string required
          trade_license_approved: dataGetShop?.trade_license_approved ?? false, //boolean checkbox
          status: dataGetShop?.status, //string select
          close_open_time: dataGetShop?.close_open_time ?? "", //add input json index array
          // shop_images: dataGetShop.shop_images ?? [], //string[] required
          meta_title: dataGetShop?.meta_title ?? "", //string
          meta_keyword: dataGetShop?.meta_keyword ?? "", //string
          meta_description: dataGetShop?.meta_description ?? "", //string
        };
      });

      switch (dataGetShop?.status) {
        case "submitted":
          staticStatusOptions = [
            { id: 1, name: "Submitted", value: "submitted" },
            { id: 2, name: "Approved", value: "approved" },
            { id: 3, name: "Rejected", value: "rejected" },
          ];
          break;
        case "under_review":
          staticStatusOptions = [
            { id: 1, name: "Under Review", value: "under_review" },
            { id: 2, name: "Approved", value: "approved" },
            { id: 3, name: "Rejected", value: "rejected" },
          ];
          break;
        case "approved":
          staticStatusOptions = [
            { id: 1, name: "Approved", value: "approved" },
            { id: 2, name: "Suspend", value: "suspend" },
          ];
          break;
        case "rejected":
          staticStatusOptions = [
            { id: 1, name: "Rejected", value: "rejected" },
            { id: 2, name: "Approved", value: "approved" },
          ];

          break;
        case "suspend":
          staticStatusOptions = [
            { id: 1, name: "Suspend", value: "suspend" },
            { id: 2, name: "Approved", value: "approved" },
          ];
          break;
      }
    }
  }, [isSuccessGetShop]);

  // shop type
  const {
    isLoading: isLoadingShopTypes,
    data: dataShopTypes,
    httpFetch: httpFetchShop,
    success: isSuccessShopTypes,
  } = useHttp();

  useEffect(() => {
    httpFetchShop("backend/shop-type", "get", null, {
      "Content-Type": "application/json",
    });
  }, []);

  const [shopType, setShopType] = useState([]);
  const shopTypeChangeHandler = (event, shopTypeId) => {
    const { checked } = event.target;

    if (checked) {
      setShopType((prevState) => [...prevState, +shopTypeId]);
    } else {
      setShopType((prevState) =>
        prevState.filter((item) => item !== shopTypeId)
      );
    }
  };

  useEffect(() => {
    setMerchantData((merchantData) => {
      return {
        ...merchantData,
        shop_type: shopType.length >= 1 ? [...new Set(shopType)] : null,
      };
    });
  }, [shopType]);

  useEffect(() => {
    if (isSuccessGetShop) {
      const shopId = dataGetShop.shop_type.map((item) => item.id);
      setShopType(shopId);
    }
  }, [isSuccessGetShop]);

  const inputFieldChangeHandler = (event) => {
    const { value, name, files } = event.target;

    let imageType = /image.*/;

    if (files) {
      const arrayFiles = Array.from(files);
      arrayFiles.forEach((file) => {
        if (file.type.match(imageType)) {
          setMerchantData((prevState) => ({
            ...prevState,
            [name]: file,
          }));
        }
      });
    } else {
      setMerchantData((merchantData) => {
        return {
          ...merchantData,
          [name]: value,
        };
      });
    }
  };

  const [previewImages, setPreviewImages] = React.useState(null);

  const inputFielsChangeHandler = (event) => {
    let imageType = /image.*/;
    const imageFiles = [];
    const previewImages = [];
    const { name, files } = event.target;

    if (files) {
      const arrayFiles = Array.from(files);
      arrayFiles.forEach((file) => {
        if (file.type.match(imageType)) {
          imageFiles.push(file);
          previewImages.push(URL.createObjectURL(file));
        }
      });
      setPreviewImages(previewImages);
      setMerchantData((prevState) => ({
        ...prevState,
        [name]: imageFiles,
      }));
    }
  };

  const removeImagesHandler = (previewImagesIndex) => {
    setPreviewImages((prevState) =>
      prevState.filter((_, index) => index !== previewImagesIndex)
    );

    setMerchantData((prevState) => ({
      ...prevState,
      shop_images:
        prevState.shop_images.filter((_, index) => index !== previewImagesIndex)
          .length >= 1
          ? prevState.shop_images.filter(
              (_, index) => index !== previewImagesIndex
            )
          : null,
    }));
  };

  const inputCheckboxChangeHandler = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setMerchantData((merchantData) => {
        return {
          ...merchantData,
          [name]: checked,
        };
      });
    } else {
      setMerchantData((merchantData) => {
        return {
          ...merchantData,
          [name]: checked,
        };
      });
    }
  };

  // shop open close time field
  const [closeOpenTime, setCloseOpenTime] = useState([
    {
      name: "Saturday",
      day: "saturday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Sunday",
      day: "sunday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Monday",
      day: "monday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Tuesday",
      day: "tuesday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Wednesday",
      day: "wednesday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Thursday",
      day: "thursday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
    {
      name: "Friday",
      day: "friday",
      opening: "08:00",
      closing: "22:00",
      status: false,
    },
  ]);

  const closeOpenTimeChangeHandler = (event, inputIndex) => {
    const { name, value, checked } = event.target;

    if (name === "close_open_time_switch") {
      setCloseOpenTime((prevState) =>
        prevState.map((item, index) =>
          index === inputIndex
            ? {
                ...item,
                status: checked,
              }
            : item
        )
      );
    }

    if (name === "close_open_time_open") {
      setCloseOpenTime((prevState) =>
        prevState.map((item, index) =>
          index === inputIndex
            ? {
                ...item,
                opening: value,
              }
            : item
        )
      );
    }

    if (name === "close_open_time_close") {
      setCloseOpenTime((prevState) =>
        prevState.map((item, index) =>
          index === inputIndex
            ? {
                ...item,
                closing: value,
              }
            : item
        )
      );
    }
  };

  useEffect(() => {
    const closeOpenTimeFiltered = closeOpenTime.map((item) => {
      return {
        day: item.day,
        opening: item.opening,
        closing: item.closing,
        status: item.status,
      };
    });

    setMerchantData((merchantData) => {
      return {
        ...merchantData,
        close_open_time: JSON.stringify(closeOpenTimeFiltered),
      };
    });
  }, [closeOpenTime]);

  useEffect(() => {
    if (isSuccessGetShop) {
      const closeOpenTimeParsed = IsJsonString(dataGetShop?.close_open_time)
        ? JSON.parse(dataGetShop?.close_open_time)
        : dataGetShop?.close_open_time;
      // const closeOpenTimeParsed = JSON.parse(dataGetShop?.close_open_time);

      Array.from(closeOpenTimeParsed || []).map((closeOpenTimeParsedItem) => {
        setCloseOpenTime((prevState) =>
          prevState.map((item) =>
            item.day === closeOpenTimeParsedItem.day
              ? {
                  ...item,
                  opening: closeOpenTimeParsedItem.opening,
                  closing: closeOpenTimeParsedItem.closing,
                  status: closeOpenTimeParsedItem.status,
                }
              : item
          )
        );
      });
    }
  }, [isSuccessGetShop]);

  // social link field
  const [socialLinkData, setSocialLinkData] = useState([
    {
      id: 1,
      label: "Facebook Links",
      name: "facebook",
      value: "",
      status: false,
    },
    {
      id: 2,
      label: "Youtube Links",
      name: "youtube",
      value: "",
      status: false,
    },
  ]);

  const inputFieldSocialLinkChangeHandler = (event) => {
    const { name, value } = event.target;

    setSocialLinkData((prevState) =>
      prevState.map((item) =>
        item.name === name
          ? {
              ...item,
              value: value,
              status: !!value,
            }
          : item
      )
    );
  };

  useEffect(() => {
    const socialLinkFormFilter = socialLinkData.filter((item) => !!item.status);

    let socialLinkFormFiltered;
    if (socialLinkFormFilter.length !== 0) {
      socialLinkFormFiltered = socialLinkFormFilter.map((item) => {
        return {
          [item.name]: item.value,
        };
      });
    }

    if (socialLinkFormFiltered && socialLinkFormFiltered.length !== 0) {
      socialLinkFormFiltered = JSON.stringify(socialLinkFormFiltered);
    } else {
      socialLinkFormFiltered = null;
    }

    setMerchantData((merchantData) => {
      return {
        ...merchantData,
        social_links: socialLinkFormFiltered,
      };
    });
  }, [socialLinkData]);

  useEffect(() => {
    if (isSuccessGetShop) {
      const socialLinksParsed = IsJsonString(dataGetShop?.social_links)
        ? JSON.parse(dataGetShop?.social_links)
        : dataGetShop?.social_links;
      // const socialLinksParsed =  JSON.parse(dataGetShop?.social_links);

      (socialLinksParsed || []).map((socialLinksItem) =>
        setSocialLinkData((prevState) =>
          prevState.map((item) =>
            item.name === Object.keys(socialLinksItem)[0]
              ? {
                  ...item,
                  value: Object.values(socialLinksItem)[0],
                  status: true,
                }
              : item
          )
        )
      );
    }
  }, [isSuccessGetShop]);

  // shop delivery price
  // const [shopDeliveryPriceDistanceWise, setShopDeliveryPriceDistanceWise] =
  //   useState([
  //     {
  //       label: "250m",
  //       value: 250,
  //       price: 0,
  //       status: false,
  //     },
  //     {
  //       label: "500m",
  //       value: 500,
  //       price: 0,
  //       status: false,
  //     },
  //     {
  //       label: "1km",
  //       value: 1000,
  //       price: 0,
  //       status: false,
  //     },
  //     {
  //       label: "2km",
  //       value: 2000,
  //       price: 0,
  //       status: false,
  //     },
  //     {
  //       label: "5km",
  //       value: 5000,
  //       price: 0,
  //       status: false,
  //     },
  //     {
  //       label: "10km",
  //       value: 10000,
  //       price: 0,
  //       status: false,
  //     },

  //     {
  //       label: "All Bangladesh",
  //       value: 0,
  //       price: 0,
  //       status: false,
  //     },
  //   ]);

  // const shopDeliveryPriceDistanceWiseChangeHandler = (event, inputIndex) => {
  //   const { name, value, checked } = event.target;

  //   if (name === "shop_delivery_price_distance_wise_switch") {
  //     setShopDeliveryPriceDistanceWise((prevState) =>
  //       prevState.map((item, index) =>
  //         index === inputIndex
  //           ? {
  //               ...item,
  //               status: checked,
  //             }
  //           : item
  //       )
  //     );
  //   }

  //   if (name === "shop_delivery_price_distance_wise") {
  //     setShopDeliveryPriceDistanceWise((prevState) =>
  //       prevState.map((item, index) =>
  //         index === inputIndex
  //           ? {
  //               ...item,
  //               price: +value,
  //             }
  //           : item
  //       )
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const shopDeliveryPriceDistanceWiseFiltered =
  //     shopDeliveryPriceDistanceWise.map((item) =>
  //       item.status
  //         ? {
  //             ...item,
  //             value: +item.value,
  //             price: +item.price,
  //             status: item.status,
  //           }
  //         : {
  //             ...item,
  //             value: +item.value,
  //             price: 0,
  //             status: item.status,
  //           }
  //     );

  //   setMerchantData((merchantData) => {
  //     return {
  //       ...merchantData,
  //       shop_delivery_price_distance_wise: JSON.stringify(
  //         shopDeliveryPriceDistanceWiseFiltered
  //       ),
  //     };
  //   });
  // }, [shopDeliveryPriceDistanceWise]);

  // useEffect(() => {
  //   if (isSuccessGetShop) {
  //     (dataGetShop?.shop_delivery_price_distance_wise || []).map(
  //       (shopDeliveryPriceDistanceWiseItem) =>
  //         setShopDeliveryPriceDistanceWise((prevState) =>
  //           prevState.map((item) =>
  //             item.value === +shopDeliveryPriceDistanceWiseItem.value
  //               ? {
  //                   ...item,
  //                   value: +shopDeliveryPriceDistanceWiseItem.value,
  //                   price: +shopDeliveryPriceDistanceWiseItem.price,
  //                   status: shopDeliveryPriceDistanceWiseItem.status,
  //                 }
  //               : item
  //           )
  //         )
  //     );
  //   }
  // }, [isSuccessGetShop]);

  //   console.log(errorShopForm);
  // console.log(socialLinkForm);

  // console.log(merchantData);
  return (
    <>
      {isSuccessShopForm && (
        <MessageNotification
          message={successMessageShopForm}
          onClick={clearSuccessShopForm}
        />
      )}
      {errorMessageShopForm && (
        <MessageNotification
          error={errorMessageShopForm}
          message={errorMessageShopForm}
          onClick={clearErrorShopForm}
        />
      )}

      <section className="custom-card mt-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square"></i>
                    <h2>Edit Merchant</h2>

                    <Link legacyBehavior href={`/admin/merchant`}>
                      <a className="fbh-btn" title="List Suppliers">
                        <i className="icon-list2"></i>
                      </a>
                    </Link>
                  </div>

                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with
                      <span className="text-danger"> * </span>
                      are required input fields.
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <div className="row mt-4">
                          <div className="col-12">
                            <div className="card">
                              <div className="card-header">
                                <div className="fbh-title">
                                  <h6>Shop Details</h6>
                                </div>
                              </div>

                              <div className="card-body">
                                {/* start */}
                                <form onSubmit={submitFormHandler}>
                                  <div className="row">
                                    <div className="col-8">
                                      <div className="row ">
                                        <div className="col-lg-12">
                                          <InputField
                                            name="name"
                                            label="Name"
                                            value={merchantData.name ?? ""}
                                            onChange={inputFieldChangeHandler}
                                            required={true}
                                          />
                                        </div>
                                        {/* <div className="col-lg-6">
                                          <InputField
                                            name="company_name"
                                            label="Company Name"
                                            value={
                                              merchantData.company_name ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}
                                        <div className="col-md-6">
                                          <InputField
                                            name="mobile"
                                            label="Mobile No."
                                            value={merchantData.mobile ?? ""}
                                            onChange={inputFieldChangeHandler}
                                            error={errorShopForm}
                                            required={true}
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            type="email"
                                            name="shop_email"
                                            label="Email"
                                            value={
                                              merchantData.shop_email ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>

                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <InputField
                                                asTag="textarea"
                                                name="description"
                                                label="Description"
                                                value={
                                                  merchantData.description ?? ""
                                                }
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                              />
                                            </div>
                                            <div className="col-md-6">
                                              <InputField
                                                asTag="textarea"
                                                name="address"
                                                label="Address"
                                                value={
                                                  merchantData.address ?? ""
                                                }
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                                required={true}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            name="city"
                                            label="City"
                                            value={merchantData.city ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>

                                        <div className="col-md-6">
                                          <InputField
                                            type="number"
                                            name="zip_code"
                                            label="Post Code"
                                            value={merchantData.zip_code ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            name="country"
                                            label="Country"
                                            value={merchantData.country ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        {/* <div className="col-md-6">
                                          <InputField
                                            name="phone"
                                            label="Phone No."
                                            value={merchantData.phone ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}

                                        {/* <div className="col-lg-6">
                                          <InputField
                                            asTag="file"
                                            name="shop_logo"
                                            label="Logo"
                                            onChange={inputFieldChangeHandler}
                                          />
                                          {isSuccessGetShop && (
                                            <img
                                              src={dataGetShop?.shop_logo}
                                              width="150"
                                              height="auto"
                                              alt={`image-${dataGetShop?.name}`}
                                              title={`image-${dataGetShop?.name}`}
                                              className="img-thumbnail"
                                            />
                                          )}
                                        </div> */}
                                        <div className="col-lg-6">
                                          <InputField
                                            asTag="file"
                                            name="banner"
                                            label="Banner"
                                            onChange={inputFieldChangeHandler}
                                          />
                                          {isSuccessGetShop && (
                                            <img
                                              src={dataGetShop?.banner}
                                              width="150"
                                              height="auto"
                                              alt={`image-${dataGetShop?.name}`}
                                              title={`image-${dataGetShop?.name}`}
                                              className="img-thumbnail"
                                            />
                                          )}
                                        </div>

                                        {/* <div className="col-md-6">
                                          <InputField
                                            name="currency"
                                            label="Currency"
                                            value={merchantData.currency ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}

                                        {/* <div className="col-md-6">
                                          <InputField
                                            asTag="textarea"
                                            name="contact_infos"
                                            label="Contact Infos"
                                            value={
                                              merchantData.contact_infos ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}
                                        {/* <div className="col-md-6">
                                          <InputField
                                            type="number"
                                            name="theme_id"
                                            label="Theme Id"
                                            value={merchantData.theme_id ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}
                                        <div className="col-md-6">
                                          <InputField
                                            name="vat_reg"
                                            label="Vat Reg."
                                            value={merchantData.vat_reg ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            type="number"
                                            name="zoom_label"
                                            label="Zoom Label"
                                            value={
                                              merchantData.zoom_label ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>

                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <InputField
                                                type="number"
                                                name="lat"
                                                label="Lat"
                                                value={merchantData.lat ?? ""}
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                                required={true}
                                              />
                                            </div>
                                            <div className="col-md-6">
                                              <InputField
                                                type="number"
                                                name="long"
                                                label="Long"
                                                value={merchantData.long ?? ""}
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                                required={true}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        {/* <div className="col-md-6">
                                          <InputField
                                            type="number"
                                            name="radius"
                                            label="Radius"
                                            value={merchantData.radius ?? ""}
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}

                                        {/* <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <InputField
                                                type="number"
                                                name="base_delivery_charge"
                                                label="Base Delivery Charge"
                                                value={
                                                  merchantData.base_delivery_charge ??
                                                  ""
                                                }
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                              />
                                            </div>

                                            <div className="col-md-6">
                                              <InputField
                                                type="number"
                                                name="per_kilometre_delivery_charge"
                                                label="Per Kilometre Delivery Charge"
                                                value={
                                                  merchantData.per_kilometre_delivery_charge ??
                                                  ""
                                                }
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div> */}

                                        {/* <div className="col-md-6">
                                          <InputField
                                            type="number"
                                            name="commission_rate"
                                            label="Commission Rate (%)"
                                            value={
                                              merchantData.commission_rate ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div> */}
                                        <div className="col-md-6">
                                          {isSuccessGetShop && (
                                            <InputField
                                              asTag="switch"
                                              type="checkbox"
                                              name="is_featured"
                                              label="Is Featured"
                                              value={dataGetShop.is_featured}
                                              onChange={
                                                inputCheckboxChangeHandler
                                              }
                                            />
                                          )}
                                        </div>
                                        <div className="col-md-6">
                                          {isSuccessGetShop && (
                                            <InputField
                                              asTag="switch"
                                              type="checkbox"
                                              name="is_popular"
                                              label="Is Popular"
                                              value={dataGetShop.is_popular}
                                              onChange={
                                                inputCheckboxChangeHandler
                                              }
                                            />
                                          )}
                                        </div>
                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <InputField
                                                type="number"
                                                name="nid"
                                                label="NID"
                                                value={merchantData.nid ?? ""}
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                              />
                                            </div>
                                            <div className="col-md-6">
                                              {isSuccessGetShop && (
                                                <InputField
                                                  asTag="switch"
                                                  type="checkbox"
                                                  name="nid_approved"
                                                  label="NID Approved"
                                                  value={
                                                    dataGetShop.nid_approved
                                                  }
                                                  onChange={
                                                    inputCheckboxChangeHandler
                                                  }
                                                />
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <InputField
                                                name="trade_license"
                                                label="Trade License"
                                                value={
                                                  merchantData.trade_license ??
                                                  ""
                                                }
                                                onChange={
                                                  inputFieldChangeHandler
                                                }
                                              />
                                            </div>

                                            <div className="col-md-6">
                                              {isSuccessGetShop && (
                                                <InputField
                                                  asTag="switch"
                                                  type="checkbox"
                                                  name="trade_license_approved"
                                                  label="Trade License Approved"
                                                  value={
                                                    dataGetShop.trade_license_approved
                                                  }
                                                  onChange={
                                                    inputCheckboxChangeHandler
                                                  }
                                                />
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <SelectField
                                            name="status"
                                            label="Status"
                                            options={staticStatusOptions}
                                            onChange={inputFieldChangeHandler}
                                            value={merchantData.status}
                                            required={true}
                                          />
                                        </div>

                                        <div className="col-md-6">
                                          <InputField
                                            name="meta_title"
                                            label="Meta Title"
                                            value={
                                              merchantData.meta_title ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            name="meta_keyword"
                                            label="Meta Keyword"
                                            value={
                                              merchantData.meta_keyword ?? ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        <div className="col-md-6">
                                          <InputField
                                            name="meta_description"
                                            label="Meta Description"
                                            value={
                                              merchantData.meta_description ??
                                              ""
                                            }
                                            onChange={inputFieldChangeHandler}
                                          />
                                        </div>
                                        <div className="col-md-12">
                                          <div className="row">
                                            {socialLinkData.map(
                                              (item, index) => (
                                                <div
                                                  className="col-md-6"
                                                  key={index}
                                                >
                                                  <InputField
                                                    name={item.name}
                                                    label={item.label}
                                                    value={item.value ?? ""}
                                                    onChange={
                                                      inputFieldSocialLinkChangeHandler
                                                    }
                                                  />
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </div>
                                        <div className="col-md-10">
                                          <div className="form-group">
                                            <div className="card">
                                              <div className="card-header">
                                                <div className="d-flex justify-content-center align-items-center">
                                                  Shop Opening And Closing Time{" "}
                                                  <span className="text-danger">
                                                    *
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="card-body p-4">
                                                <div className="row">
                                                  <div className="col-4">
                                                    <span
                                                      style={{
                                                        padding: "8px 12px",
                                                        backgroundColor:
                                                          "#027cff",
                                                        borderRadius: "4px",
                                                        color: "#ffffff",
                                                      }}
                                                    >
                                                      Day
                                                    </span>
                                                  </div>
                                                  <div className="col-4">
                                                    <span
                                                      style={{
                                                        padding: "8px 12px",
                                                        backgroundColor:
                                                          "#027cff",
                                                        borderRadius: "4px",
                                                        color: "#ffffff",
                                                      }}
                                                    >
                                                      Opening Hour
                                                    </span>
                                                  </div>
                                                  <div className="col-4">
                                                    <span
                                                      style={{
                                                        padding: "8px 12px",
                                                        backgroundColor:
                                                          "#027cff",
                                                        borderRadius: "4px",
                                                        color: "#ffffff",
                                                      }}
                                                    >
                                                      Closing Hour
                                                    </span>
                                                  </div>
                                                </div>
                                                {isSuccessGetShop &&
                                                  (closeOpenTime || []).map(
                                                    (item, index) => (
                                                      <div
                                                        key={index}
                                                        className="row align-items-center mt-4"
                                                      >
                                                        <div className="col-4">
                                                          <div className="custom-control custom-switch">
                                                            <input
                                                              type="checkbox"
                                                              name="close_open_time_switch"
                                                              className="custom-control-input"
                                                              id={
                                                                "switch-" +
                                                                item.day
                                                              }
                                                              onChange={(
                                                                event
                                                              ) =>
                                                                closeOpenTimeChangeHandler(
                                                                  event,
                                                                  index
                                                                )
                                                              }
                                                              checked={
                                                                item.status
                                                              }
                                                            />
                                                            <label
                                                              className="custom-control-label"
                                                              htmlFor={
                                                                "switch-" +
                                                                item.day
                                                              }
                                                            >
                                                              {item.name}
                                                            </label>
                                                          </div>
                                                        </div>
                                                        <div className="col-4">
                                                          <div className="form-group mb-0">
                                                            <input
                                                              type="time"
                                                              name="close_open_time_open"
                                                              value={
                                                                !item.status
                                                                  ? "00"
                                                                  : item.opening
                                                              }
                                                              className="form-control"
                                                              id={
                                                                "open-" +
                                                                item.day
                                                              }
                                                              onChange={(
                                                                event
                                                              ) =>
                                                                closeOpenTimeChangeHandler(
                                                                  event,
                                                                  index
                                                                )
                                                              }
                                                              disabled={
                                                                !item.status
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                        <div className="col-4">
                                                          <div className="form-group mb-0">
                                                            <input
                                                              type="time"
                                                              name="close_open_time_close"
                                                              value={
                                                                !item.status
                                                                  ? "00"
                                                                  : item.closing
                                                              }
                                                              className="form-control"
                                                              id={
                                                                "close-" +
                                                                item.day
                                                              }
                                                              onChange={(
                                                                event
                                                              ) =>
                                                                closeOpenTimeChangeHandler(
                                                                  event,
                                                                  index
                                                                )
                                                              }
                                                              disabled={
                                                                !item.status
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-12">
                                          <Link legacyBehavior href={"/admin/merchant"}>
                                            <a className="btn btn-info mr-1">
                                              <i className="icon-arrow-left-solid mr-1 mr-1" />
                                              back to list
                                            </a>
                                          </Link>
                                          <button
                                            type="submit"
                                            className={`btn btn-success`}
                                            disabled={isLoadingShopForm}
                                          >
                                            <i
                                              className={
                                                isLoadingShopForm
                                                  ? `spinner-border spinner-border-sm mr-1`
                                                  : `icon-save-regular mr-1`
                                              }
                                            />
                                            {isLoadingShopForm
                                              ? `Saving..`
                                              : `Save`}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="row">
                                        <div className="col-12 mb-4">
                                          <div className="card">
                                            <div className="card-header">
                                              Type
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </div>
                                            <div className="card-body">
                                              <div
                                                className={`form-group ${categorySelectStyle.customCatList}`}
                                              >
                                                {isSuccessShopTypes &&
                                                  isSuccessGetShop &&
                                                  (dataShopTypes || []).map(
                                                    (item, index) => (
                                                      <div
                                                        className="custom-control custom-checkbox"
                                                        key={index}
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          className="custom-control-input"
                                                          name="shop_type"
                                                          defaultChecked={
                                                            (
                                                              dataGetShop?.shop_type ||
                                                              []
                                                            ).some((shopItem) =>
                                                              shopItem.id ==
                                                              item.id
                                                                ? true
                                                                : false
                                                            ) ?? false
                                                          }
                                                          id={
                                                            "shop_type-" +
                                                            item.id
                                                          }
                                                          onClick={(event) =>
                                                            shopTypeChangeHandler(
                                                              event,
                                                              item.id
                                                            )
                                                          }
                                                        />
                                                        <label
                                                          className="custom-control-label"
                                                          htmlFor={
                                                            "shop_type-" +
                                                            item.id
                                                          }
                                                        >
                                                          {item.name}
                                                        </label>
                                                      </div>
                                                    )
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div className="col-md-12 mb-4">
                                          <div className="form-group">
                                            <div className="card">
                                              <div className="card-header">
                                                <div className="d-flex justify-content-center align-items-center">
                                                  Delivery Charge
                                               
                                                </div>
                                              </div>
                                              <div className="card-body ">
                                                <div className="row no-gutters">
                                                  <div className="col-8">
                                                    <span
                                                      style={{
                                                        padding: "8px 12px",
                                                        backgroundColor:
                                                          "rgba(0, 0, 0, 0.03)",
                                                        border:
                                                          "1px solid rgba(0, 0, 0, 0.125)",
                                                        borderRadius: "4px",
                                                        color: "#212529",
                                                        display: "block",
                                                        marginRight: "2px",
                                                      }}
                                                    >
                                                      Distance
                                                    </span>
                                                  </div>
                                                  <div className="col-4">
                                                    <span
                                                      style={{
                                                        padding: "8px 12px",
                                                        backgroundColor:
                                                          "rgba(0, 0, 0, 0.03)",
                                                        border:
                                                          "1px solid rgba(0, 0, 0, 0.125)",
                                                        borderRadius: "4px",
                                                        color: "#212529",
                                                        display: "block",
                                                      }}
                                                    >
                                                      Price
                                                    </span>
                                                  </div>
                                                </div>
                                                {(
                                                  shopDeliveryPriceDistanceWise ||
                                                  []
                                                ).map((item, index) => (
                                                  <div
                                                    key={index}
                                                    className="row align-items-center mt-4 no-gutters"
                                                  >
                                                    <div className="col-8">
                                                      <div className="custom-control custom-switch">
                                                        <input
                                                          type="checkbox"
                                                          name="shop_delivery_price_distance_wise_switch"
                                                          className="custom-control-input"
                                                          id={
                                                            "switch-" +
                                                            item.label
                                                          }
                                                          onChange={(event) =>
                                                            shopDeliveryPriceDistanceWiseChangeHandler(
                                                              event,
                                                              index
                                                            )
                                                          }
                                                          checked={item.status}
                                                        />
                                                        <label
                                                          className="custom-control-label"
                                                          htmlFor={
                                                            "switch-" +
                                                            item.label
                                                          }
                                                        >
                                                          {item.label}
                                                        </label>
                                                      </div>
                                                    </div>
                                                    <div className="col-4">
                                                      <div className="form-group mb-0">
                                                        <input
                                                          type="number"
                                                          name="shop_delivery_price_distance_wise"
                                                          placeholder="00.00"
                                                          value={
                                                            item.status &&
                                                            item.price
                                                              ? item.price
                                                              : ""
                                                          }
                                                          className="form-control"
                                                          id={
                                                            "open-" + item.label
                                                          }
                                                          onChange={(event) =>
                                                            shopDeliveryPriceDistanceWiseChangeHandler(
                                                              event,
                                                              index
                                                            )
                                                          }
                                                          disabled={
                                                            !item.status
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div> */}
                                        <div className="col-12">
                                          <div className="card">
                                            <div className="card-header">
                                              Gallery
                                            </div>
                                            <div className="card-body">
                                              <InputFiles
                                                name="shop_images"
                                                onChange={
                                                  inputFielsChangeHandler
                                                }
                                              />

                                              <div className="row">
                                                <div className="col-12">
                                                  <div
                                                    className={`form-group ${categorySelectStyle.customImageList}`}
                                                  >
                                                    <div className="row row-cols-3 p-1">
                                                      {(
                                                        previewImages || []
                                                      ).map(
                                                        (
                                                          url,
                                                          previewImagesIndex
                                                        ) => (
                                                          <div
                                                            className="col p-1"
                                                            key={
                                                              previewImagesIndex
                                                            }
                                                          >
                                                            <div className="position-relative">
                                                              <img
                                                                src={url}
                                                                width="100%"
                                                                height="auto"
                                                                alt={`preview-image-${previewImagesIndex}`}
                                                                title={`preview-image-${previewImagesIndex}`}
                                                                className="img-thumbnail"
                                                              />
                                                              <button
                                                                type="button"
                                                                className="btn btn-sm bg-danger rounded-0 p-0"
                                                                style={{
                                                                  position:
                                                                    "absolute",
                                                                  right: "0px",
                                                                  top: "0px",
                                                                }}
                                                                onClick={() =>
                                                                  removeImagesHandler(
                                                                    previewImagesIndex
                                                                  )
                                                                }
                                                              >
                                                                <i className="icon-trash-alt-regular text-white p-1 small"></i>
                                                              </button>
                                                            </div>
                                                          </div>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                                {/* end */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default MerchantEditForm;
