import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import SiteHeader from "../../components/Frontend/Header/SiteHeader";
import Layout from "../../components/Frontend/Layout/Layout";
import Storage from "../../Helpers/Auth/Storage";
import process from "../../next.config";

const ChangePassword = () => {
  const [passwordInfo, setPasswordInfo] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const [errorPasswordInfo, setErrorPasswordInfo] = useState({
    old_password: "",
    old_password_error: "",
    password: "",
    password_error: "",
    password_confirmation: "",
    password_confirmation_error: "",
  });

  const [messagePassword, setMessagePassword] = useState({
    status: false,
    message: "",
  });

  // disabled field during submit form
  const [disabledFiled, setDisabledFiled] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (!Storage.isLoggedIn()) {
      Router.push("/auth/sly-login");
    } else {
      setLoading(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handlePasswordData = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    setPasswordInfo({ ...passwordInfo, [name]: value });
    setErrorPasswordInfo({
      ...errorPasswordInfo,
      [name]: "",
      [name + "_error"]: "",
    });
  };

  const resetPasswordData = (event) => {
    event.preventDefault();
    document.getElementById("passwordInfoForm").reset();
    setPasswordInfo({
      old_password: "",
      password: "",
      password_confirmation: "",
    });

    setErrorPasswordInfo({
      old_password: "",
      old_password_error: "",
      password: "",
      password_error: "",
      password_confirmation: "",
      password_confirmation_error: "",
    });
  };

  const changePassword = async (event) => {
    event.preventDefault();
    const checkRequiredData =
      !passwordInfo.old_password ||
      !passwordInfo.password ||
      !passwordInfo.password_confirmation;
    if (checkRequiredData) {
      setErrorPasswordInfo({
        ...errorPasswordInfo,
        old_password: "is-invalid",
        old_password_error: "Old password filed is required",
        password: "is-invalid",
        password_error: "New Password filed is required",
        password_confirmation: "is-invalid",
        password_confirmation_error: "Re-type new Password",
      });
    } else {
      setDisabledFiled("disabled");
      const url = `${process.env.api_url}/auth/customers/changePassword`;
      await axios
        .post(url, passwordInfo)
        .then((apiResponse) => {
          if (apiResponse.data.success) {
            setMessagePassword((messagePassword) => ({
              ...messagePassword,
              status: true,
              message: apiResponse.data.message,
            }));
            setDisabledFiled("");
            resetPasswordData(event);
          } else {
            typeof apiResponse.data.errors !== "undefined" &&
              Object.keys(apiResponse.data.errors).map((name) => {
                setErrorPasswordInfo((errorPasswordInfo) => ({
                  ...errorPasswordInfo,
                  [name]: "is-invalid",
                  [name + "_error"]: apiResponse.data.errors[name].join(),
                }));
              });
            setMessagePassword((messagePassword) => ({
              ...messagePassword,
              status: false,
              message: apiResponse.data.message,
            }));
            setDisabledFiled("");
          }
        })
        .catch((errors) => {
          setMessagePassword((messagePassword) => ({
            ...messagePassword,
            status: false,
            message: errors,
          }));
          setDisabledFiled("");
        });
    }
  };

  const meta = {
    title: `Change Password - ${process.env.app_name} - Best Online Grocery Shop in Bangladesh | Buy Grocery, Cosmetics, Diapers, Food items, Vegetables Online and Get Delivery in 90 Minutes`,
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
      {loading ? (
        <>
          <SiteHeader {...meta} />
          <Layout>
            <section className="custom-card">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7 mb-3">
                    <div className="custom-card-box">
                      <div className="custom-card-box-header">
                        <div className="fbh-title">
                          <i className="icon-list2" />
                          <h2>Change Your Password</h2>
                        </div>
                      </div>
                      <div className="custom-card-box-content p-md-3 p-2">
                        <form id="passwordInfoForm">
                          <fieldset disabled={disabledFiled}>
                            <div className="form-group">
                              <label
                                htmlFor="oldPassword"
                                title="Enter Your Old Password"
                              >
                                Old Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${errorPasswordInfo.old_password}`}
                                id="oldPassword"
                                name="old_password"
                                value={passwordInfo.old_password}
                                placeholder="Password"
                                onChange={handlePasswordData}
                              />
                              {errorPasswordInfo.old_password && (
                                <div className="invalid-feedback">
                                  {errorPasswordInfo.old_password_error}
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="newPassword"
                                title="Enter Your New Password"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${errorPasswordInfo.password}`}
                                id="newPassword"
                                placeholder="Password"
                                value={passwordInfo.password}
                                name="password"
                                onChange={handlePasswordData}
                              />
                              {errorPasswordInfo.password && (
                                <div className="invalid-feedback">
                                  {errorPasswordInfo.password_error}
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="reTypeNewPassword"
                                title="Re-type Your New Password"
                              >
                                Re-type new Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${errorPasswordInfo.password_confirmation}`}
                                id="reTypeNewPassword"
                                placeholder="Password"
                                value={passwordInfo.password_confirmation}
                                name="password_confirmation"
                                onChange={handlePasswordData}
                              />
                              {errorPasswordInfo.password_confirmation && (
                                <div className="invalid-feedback">
                                  {
                                    errorPasswordInfo.password_confirmation_error
                                  }
                                </div>
                              )}
                            </div>

                            <div className="invalid-feedback"></div>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={changePassword}
                            >
                              {disabledFiled === "disabled" ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  />{" "}
                                  saving...
                                </>
                              ) : (
                                <>
                                  <i className="icon-save-regular mr-1" /> save
                                </>
                              )}
                            </button>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    messagePassword.status ? "text-success" : "text-danger"
                  } text-left`}
                >
                  {messagePassword.message}
                </div>
              </div>
            </section>
          </Layout>
        </>
      ) : (
        <>
          <div
            style={{ display: "flex", alignItems: "center", height: "100vh" }}
          >
            <div style={{ width: "100%", textAlign: "center" }}>
              <img src="/processing-loder/loader.gif" />
              <h1> Please wait</h1>
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ChangePassword;
