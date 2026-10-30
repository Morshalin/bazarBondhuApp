import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Storage from "../../../Helpers/Auth/Storage";
import {
  getFromCookie,
  saveToCookie,
  // getSiteSettings,
} from "../../../Helpers/Utils/Utils";

const TopBar = (props) => {
  const serverPermissions = props.serverPermissions;
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [lowQuantity, setLowQuantity] = useState("");
  const [expiredProducts, setExpiredProducts] = useState("");
  const [headerLogo, setHeaderLogo] = useState("");

  const api_url = process.env.api_url;

  const hasModulePermission = (module) => {
    let isExists = false;
    serverPermissions &&
      serverPermissions.map((perm, index) => {
        if (perm.module === module) {
          isExists = true;
        }
      });
    return isExists;
  };

  const hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    serverPermissions &&
      serverPermissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };

  useEffect(() => { (async () => {
    if (Storage.isLoggedIn()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    await lowQuantityAlert();
    await showExpiredProducts();
    // const response = await getSiteSettings();
    // response && response.success && setHeaderLogo(response.data.shop_logo);
  })(); }, [headerLogo]);

  const lowQuantityAlert = async () => {
    let response = await axios
      .get(`${api_url}/backend/low-quantity`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        return error;
      });

    if (response.success) {
      setLowQuantity(response.data.meta.total);
    }
  };
  const showExpiredProducts = async () => {
    let response = await axios
      .get(`${api_url}/backend/expired-products`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        return error;
      });

    if (response.success) {
      setExpiredProducts(response.data.meta.total);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("login_path");
    setIsLogin(false);
    localStorage.setItem("permissions", "");
    saveToCookie("shop_logo", null);

    Storage.clear();
    router.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container-fluid">
          <div className="top-nav-left">
            <a className="navbar-brand" href="/admin">
              {/*<img className='default-logo' src={`${process.env.base_url}/images/shop/shop_logo/logo.png`} alt='logo' /> */}
              <img className="default-logo" src={"/img/logo.png"} alt="logo" />
              <img
                className="mobile-logo"
                src="/img/logo-mobile.png"
                alt={process.env.app_name}
              />
            </a>
            {router.pathname == "/admin/pos" ? (
              <a href="/admin" className="back-to-dashboard">
                <i className="icon-tachometer-alt-solid" />
                <span> Dashboard</span>
              </a>
            ) : (
              <>
                <button
                  type="button"
                  id="sidebarCollapse"
                  className={
                    props.toggleButton ? "navbar-btn active" : "navbar-btn"
                  }
                  onClick={props.toggleChange}
                >
                  <span />
                  <span />
                  <span />
                </button>
                <p className="menu-title pl-2">Menu</p>
              </>
            )}
          </div>

          {/*<div className="top-nav-center">*/}
          {/*    <div className="search-form">*/}
          {/*        <form action="#">*/}
          {/*            <div className="input-group">*/}
          {/*                <input type="text" className="form-control"*/}
          {/*                    placeholder="search your need (e.g. mask, sanitizer, spray bottle, etc)"*/}
          {/*                    required />*/}
          {/*                <div className="input-group-append">*/}
          {/*                    <button className="btn" type="button"><i className="fas fa-search" /></button>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </form>*/}
          {/*    </div>*/}
          {/*</div>*/}

          <div className="top-nav-right">
            {hasModulePermission("pos") && hasMenuPermission("pos", "view") ? (
              <div className="btn-group help_support">
                <a href="/admin/pos" className="btn dropdown-toggle">
                  <i className="fa fa-th-large" />{" "}
                  <span className="help-text">POS</span>
                </a>
              </div>
            ) : (
              ""
            )}

            <div className="btn-group">
              <a
                type="button"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-bell" />
                <span className="badge badge-noti">
                  {lowQuantity}
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {/*<button className="dropdown-item" type="button">New Order Place</button>*/}
                {lowQuantity && (
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => router.push("/admin/reports/lowquantity")}
                  >
                    {lowQuantity} products has low quantity
                  </button>
                )}

                {/* {expiredProducts ? (
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() =>
                      router.push("/admin/reports/expired-products")
                    }
                  >
                    {expiredProducts} products expired
                  </button>
                ) : (
                  ""
                )} */}
              </div>
            </div>
            <div className="btn-group">
              <a
                type="button"
                className="btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-user" />
              </a>

              <div className="dropdown-menu dropdown-menu-right">
                {/*<button className="dropdown-item" type="button">User Information</button>*/}
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => router.push("/admin/user/change-password")}
                >
                  Change Password
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default TopBar;
