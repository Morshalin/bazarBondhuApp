import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Storage from "../../../Helpers/Auth/Storage";
// import { connect } from "react-redux";
// import { Permissions } from "../../../Helpers/Utils/Utils";

const LeftSideBar = (props) => {
  // console.log(props.serverPermissions);
  const serverPermissions = props.serverPermissions;
  // let permissions = Permissions();
  const router = useRouter();

  const [user, setUser] = useState("");

  const [userId, setUserId] = useState("");
  const [userImage, setUserImage] = useState("");

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

  const menu_active = "menu_active";

  // const logout = () => {
  //     Storage.clear();

  //     if (!Storage.isLoggedIn()) {
  //         Router.push("/auth/login");
  //     }
  // };

  useEffect(() => {
    Storage.isLoggedIn() ? setUser(Storage.getUser()) : "";
    Storage.isLoggedIn() ? setUserId(Storage.getUserId()) : "";
    Storage.isLoggedIn() ? setUserImage(Storage.getUserImage()) : "";
    // Storage.storeUserImage('buyhsdbasuy');
  }, []);

  return (
    <>
      <nav
        id="sidebar"
        className={props.toggleChange ? "shadow-sm active" : "shadow-sm"}
      >
        <div className="sidebar-wrap">
          <div className="client-login-area">
            <a href="#">
              <img src={userImage} alt="User Login" />
            </a>
            <div className="client-login-detail">
              <p className="welcome-text">Welcome</p>

              <h4 className="cla-name" title={user}>
                <Link legacyBehavior href={`/admin/user/profile-update`}>
                  <a>{user}</a>
                </Link>
              </h4>

              {/* <p
                onClick={(event) => {
                  event.preventDefault();
                  logout();
                }}
                className="cla-log-in-out"
              >
                <a href="#">Logout</a>
              </p> */}
            </div>
          </div>

          <div className="accordion settings-menu" id="sidebarMainMenu">
            <span className="section-tag">Products</span>

            {/* Product Menu*/}
            {hasModulePermission("product") ||
            hasModulePermission("category") ||
            hasModulePermission("brand") ||
            hasModulePermission("unit") ? (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/product",
                      "/admin/product/add",
                      "/admin/product/edit/[edit]",
                      "/admin/adjustment",
                      "/admin/adjustment/add",
                      "/admin/product/print-barcode",
                      "/admin/category",
                      "/admin/category/add",
                      "/admin/category/edit/[edit]",
                      "/admin/brand",
                      "/admin/brand/add",
                      "/admin/brand/edit/[edit]",
                      "/admin/unit",
                      "/admin/unit/add",
                      "/admin/unit/edit/[edit]",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="productMenu"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/product",
                          "/admin/product/add",
                          "/admin/product/edit/[edit]",
                          "/admin/adjustment",
                          "/admin/adjustment/add",
                          "/admin/product/print-barcode",
                          "/admin/category",
                          "/admin/category/add",
                          "/admin/category/edit/[edit]",
                          "/admin/brand",
                          "/admin/brand/add",
                          "/admin/brand/edit/[edit]",
                          "/admin/unit",
                          "/admin/unit/add",
                          "/admin/unit/edit/[edit]",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#product"
                      aria-expanded={
                        [
                          "/admin/product",
                          "/admin/product/add",
                          "/admin/product/edit/[edit]",
                          "/admin/adjustment",
                          "/admin/adjustment/add",
                          "/admin/product/print-barcode",
                          "/admin/category",
                          "/admin/category/add",
                          "/admin/category/edit/[edit]",
                          "/admin/brand",
                          "/admin/brand/add",
                          "/admin/brand/edit/[edit]",
                          "/admin/unit",
                          "/admin/unit/add",
                          "/admin/unit/edit/[edit]",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="product"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/baby_product.png"
                        alt="Module Image"
                      />
                      <span>Product</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="product"
                  className={`collapse ${
                    [
                      "/admin/product",
                      "/admin/product-center",
                      "/admin/product-center/brand/[brandId]",
                      "/admin/product-center/product/[productId]",
                      "/admin/product/add",
                      "/admin/product/edit/[edit]",
                      "/admin/adjustment",
                      "/admin/adjustment/add",
                      "/admin/product/print-barcode",
                      "/admin/category",
                      "/admin/category/add",
                      "/admin/category/edit/[edit]",
                      "/admin/brand",
                      "/admin/brand/add",
                      "/admin/brand/edit/[edit]",
                      "/admin/unit",
                      "/admin/unit/add",
                      "/admin/unit/edit/[edit]",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="productMenu"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("product", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/product"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/product">
                              <a className="nav-link">Product List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("product", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/product-center" ||
                              router.pathname === "/admin/product-center/brand/[brandId]" ||
                              router.pathname === "/admin/product-center/product/[productId]" 
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/product-center">
                              <a className="nav-link">Product Center</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("category", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/category" ||
                              router.pathname === "/admin/category/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/category">
                              <a className="nav-link">Category</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("brand", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/brand" ||
                              router.pathname === "/admin/brand/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/brand">
                              <a className="nav-link">Brands</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("unit", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/unit" ||
                              router.pathname === "/admin/unit/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/unit">
                              <a className="nav-link">Units</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("product", "print-barcode") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/product/print-barcode"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/product/print-barcode">
                              <a className="nav-link">Print Barcode</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/*End Product Menu*/}
            {/*Start merchant */}
            {hasModulePermission("merchant") ? (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/merchant",
                      "/admin/merchant/add",
                      "/admin/merchant/edit/[id]",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="productPurchaseMenu"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/merchant",
                          "/admin/merchant/add",
                          "/admin/merchant/edit/[id]",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#merchant"
                      aria-expanded={
                        [
                          "/admin/merchant",
                          "/admin/merchant/add",
                          "/admin/purchase/edit/[id]",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="purchase"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/purchase.png"
                        alt="Module Image"
                      />
                      <span>Merchant</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="merchant"
                  className={`collapse ${
                    [
                      "/admin/merchant",
                      "/admin/merchant/add",
                      "/admin/merchant/edit/[id]",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="productPurchaseMenu"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("merchant", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/merchant"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/merchant">
                              <a className="nav-link">Merchant List</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/*End merchant */}

            {/*Start Product Purchase */}
            {hasModulePermission("purchase") ? (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/purchase",
                      "/admin/purchase/add",
                      "/admin/purchase/edit/[id]",
                      // "/admin/purchases-return",
                      // "/admin/purchases-return/add"
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="productPurchaseMenu"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/purchase",
                          "/admin/purchase/add",
                          "/admin/purchase/edit/[id]",
                          // "/admin/purchases-return",
                          // "/admin/purchases-return/add"
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#purchase"
                      aria-expanded={
                        [
                          "/admin/purchase",
                          "/admin/purchase/add",
                          "/admin/purchase/edit/[id]",
                          // "/admin/purchases-return",
                          // "/admin/purchases-return/add"
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="purchase"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/purchase.png"
                        alt="Module Image"
                      />
                      <span>Purchase</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="purchase"
                  className={`collapse ${
                    [
                      "/admin/purchase",
                      "/admin/purchase/add",
                      "/admin/purchase/edit/[id]",
                      // "/admin/purchases-return",
                      // "/admin/purchases-return/add"
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="productPurchaseMenu"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("purchase", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/purchase/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/purchase/add">
                              <a className="nav-link">Add Purchase</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("purchase", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/purchase"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/purchase">
                              <a className="nav-link">Purchase List</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/*End Product Purchase */}

            {/*Start Order */}
            {hasModulePermission("sales") ? (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/sales",
                      "/admin/sales/pos-sale",
                      "/admin/sales-return",
                      "/admin/sales-return/add",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="productSalesMenu"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/sales",
                          "/admin/sales/pos-sale",
                          "/admin/sales-return",
                          "/admin/sales-return/add",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#sales"
                      aria-expanded={
                        [
                          "/admin/sales",
                          "/admin/sales/pos-sale",
                          "/admin/sales-return",
                          "/admin/sales-return/add",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="sales"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/sales.png"
                        alt="Module Image"
                      />
                      <span>Sales</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="sales"
                  className={`collapse ${
                    [
                      "/admin/sales",
                      "/admin/sales/orders",
                      "/admin/sales/pos-sale",
                      "/admin/sales-return",
                      "/admin/sales-return/add",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="productSalesMenu"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("sales", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/sales/orders"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/sales/orders">
                              <a className="nav-link">E-Commerce Order</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("sales", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/sales"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/sales">
                              <a className="nav-link">E-Commerce Sale</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("sales", "pos-sale") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/sales/pos-sale"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/sales/pos-sale">
                              <a className="nav-link">POS Sale</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {/*Start Settings Menu */}
          <div className="accordion settings-menu" id="sidebarMainMenu">
            <span className="section-tag">All Modules</span>

            {/*Start Accounts*/}
            {hasModulePermission("accounts") && (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "admin/accounts/",
                      "/admin/accounts/bank-accounts",
                      "/admin/accounts/bank-accounts/add",
                      "/admin/accounts/bank-accounts/edit/[edit]",
                      "/admin/accounts/accounts-head",
                      "/admin/accounts/accounts-expense",
                      "/admin/accounts/accounts-expense/add",
                      "/admin/accounts/accounts-deposit/",
                      "/admin/accounts/accounts-deposit/add",
                      "/admin/accounts/accounts-purchase/",
                      "/admin/accounts/accounts-sales/",
                      "/admin/accounts/accounts-cashbook/",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="role"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/accounts/bank-accounts",
                          "/admin/accounts/bank-accounts/add",
                          "/admin/accounts/bank-accounts/edit/[edit]",
                          "/admin/accounts/accounts-head",
                          "/admin/accounts/accounts-expense",
                          "/admin/accounts/accounts-expense/add",
                          "/admin/accounts/accounts-deposit/",
                          "/admin/accounts/accounts-deposit/add",
                          "/admin/accounts/accounts-purchase/",
                          "/admin/accounts/accounts-sales/",
                          "/admin/accounts/accounts-cashbook/",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#accounts"
                      aria-expanded={
                        [
                          "/admin/accounts/bank-accounts",
                          "/admin/accounts/bank-accounts/add",
                          "/admin/accounts/bank-accounts/edit/[edit]",
                          "/admin/accounts/accounts-head",
                          "/admin/accounts/accounts-expense",
                          "/admin/accounts/accounts-expense/add",
                          "/admin/accounts/accounts-deposit/",
                          "/admin/accounts/accounts-deposit/add",
                          "/admin/accounts/accounts-purchase/",
                          "/admin/accounts/accounts-sales/",
                          "/admin/accounts/accounts-cashbook/",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="homeslider"
                      href="#"
                    >
                      <img
                        src={`/admin_assets/images/menu_icon/sales.png`}
                        alt="Reports"
                      />
                      <span>Accounting</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="accounts"
                  className={`collapse ${
                    [
                      "/admin/accounts/bank-accounts",
                      "/admin/accounts/bank-accounts/add",
                      "/admin/accounts/bank-accounts/edit/[edit]",
                      "/admin/accounts/accounts-head",
                      "/admin/accounts/accounts-expense",
                      "/admin/accounts/accounts-expense/add",
                      "/admin/accounts/accounts-deposit",
                      "/admin/accounts/accounts-deposit/add",
                      "/admin/accounts/accounts-purchase",
                      "/admin/accounts/accounts-sales",
                      "/admin/accounts/accounts-cashbook",
                      "/admin/accounts/ledgers",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="role"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("accounts", "accounts-deposit") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/accounts/accounts-deposit/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/accounts/accounts-deposit/add`}>
                              <a className="nav-link">জমা</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("accounts", "accounts-expense") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/accounts/accounts-expense/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/accounts/accounts-expense/add`}>
                              <a className="nav-link">খরচ</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("accounts", "accounts-cashbook") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/accounts/accounts-cashbook"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/accounts/accounts-cashbook`}>
                              <a className="nav-link">ক্যাশবুক</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("accounts", "ledgers") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/accounts/ledgers"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/accounts/ledgers`}>
                              <a className="nav-link">লেজারবুক</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("bank-accounts", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/accounts/bank-accounts"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/accounts/bank-accounts`}>
                              <a className="nav-link">তহবিল</a>
                            </Link>
                          </li>
                        )}

                        {/*Need to create permission and page*/}

                        {/*Start Account Settings*/}
                        {hasModulePermission("accounts") && (
                          <div className="card">
                            <div
                              className={`card-header ${
                                [
                                  "admin/accounts/",
                                  // "/admin/accounts/bank-accounts",
                                  "/admin/accounts/bank-accounts/add",
                                  "/admin/accounts/bank-accounts/edit/[edit]",
                                  "/admin/accounts/accounts-head",
                                ].includes(router.pathname)
                                  ? menu_active
                                  : ""
                              }`}
                              id="role"
                            >
                              <h2 className="mb-0">
                                <a
                                  className={`nav-link has-sub-menu ${
                                    [
                                      // "/admin/accounts/bank-accounts",
                                      "/admin/accounts/bank-accounts/add",
                                      "/admin/accounts/bank-accounts/edit/[edit]",
                                      "/admin/accounts/accounts-head",
                                    ].includes(router.pathname)
                                      ? ""
                                      : "collapsed"
                                  }`}
                                  data-toggle="collapse"
                                  data-target="#bank-accounts"
                                  aria-expanded={
                                    [
                                      // "/admin/accounts/bank-accounts",
                                      "/admin/accounts/bank-accounts/add",
                                      "/admin/accounts/bank-accounts/edit/[edit]",
                                      "/admin/accounts/accounts-head",
                                    ].includes(router.pathname)
                                      ? "true"
                                      : "false"
                                  }
                                  aria-controls="homeslider"
                                  href="#"
                                >
                                  <i className="fas fa-cogs" />
                                  <span>অ্যাকাউন্ট সেটিংস</span>
                                </a>
                              </h2>
                            </div>

                            <div
                              id="bank-accounts"
                              className={`collapse ${
                                [
                                  // "/admin/accounts/bank-accounts",
                                  "/admin/accounts/bank-accounts/add",
                                  "/admin/accounts/bank-accounts/edit/[edit]",
                                  "/admin/accounts/accounts-head",
                                ].includes(router.pathname)
                                  ? "show"
                                  : ""
                              }`}
                              aria-labelledby="role"
                              data-parent="#sidebarMainMenu"
                            >
                              <div className="card-body">
                                <div
                                  className="panel-collapse collapse show"
                                  aria-expanded="true"
                                >
                                  <ul className="">
                                    {hasMenuPermission(
                                      "bank-accounts",
                                      "add"
                                    ) && (
                                      <li
                                        className={`list-group-item ${
                                          (router.pathname ===
                                            router.pathname) ===
                                            "/admin/accounts/bank-accounts/add" ||
                                          router.pathname ===
                                            "/admin/accounts/bank-accounts/edit/[edit]"
                                            ? menu_active
                                            : ""
                                        }`}
                                      >
                                        <Link legacyBehavior
                                          href={`/admin/accounts/bank-accounts/add`}
                                        >
                                          <a className="nav-link">তহবিল যোগ</a>
                                        </Link>
                                      </li>
                                    )}

                                    {hasMenuPermission(
                                      "accounts",
                                      "accounts-head"
                                    ) && (
                                      <li
                                        className={`list-group-item ${
                                          router.pathname ===
                                          "/admin/accounts/accounts-head"
                                            ? menu_active
                                            : ""
                                        }`}
                                      >
                                        <Link legacyBehavior
                                          href={`/admin/accounts/accounts-head`}
                                        >
                                          <a className="nav-link">
                                            হিসাবের খাত সমূহ
                                          </a>
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {/*End Account Settings*/}
                        {hasMenuPermission("accounts", "report") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/accounts/report"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`#`}>
                              <a className="nav-link">Accounting Reports</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*End Accounts*/}

            {/*Start Home slider*/}
            {hasModulePermission("home-slider") && (
              <div className="card">
                <div
                  className={`card-header ${
                    ["/admin/home-slider", "/admin/home-slider/add"].includes(
                      router.pathname
                    )
                      ? menu_active
                      : ""
                  }`}
                  id="role"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/home-slider",
                          "/admin/home-slider/add",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#homeslider"
                      aria-expanded={
                        [
                          "/admin/home-slider",
                          "/admin/home-slider/add",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="homeslider"
                      href="#"
                    >
                      <img
                        src={`/admin_assets/images/menu_icon/reports.png`}
                        alt="Reports"
                      />
                      <span>Home Slider</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="homeslider"
                  className={`collapse ${
                    ["/admin/home-slider", "/admin/home-slider/add"].includes(
                      router.pathname
                    )
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="role"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("home-slider", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/home-slider"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/home-slider"}>
                              <a className="nav-link"> Home Slider List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("home-slider", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/home-slider/expired-products"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/home-slider/add`}>
                              <a className="nav-link">Add Home Slider</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*End Home slider */}

            {/*Start User Menu */}
            {(hasModulePermission("user") ||
              hasModulePermission("customer") ||
              hasModulePermission("supplier")) && (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/user",
                      "/admin/user/add",
                      "/admin/user/edit/[id]",
                      "/admin/supplier",
                      "/admin/supplier/add",
                      "/admin/supplier/edit/[id]",
                      "/admin/user/customer/create",
                      "/admin/user/customer",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="userHeading"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/user",
                          "/admin/user/add",
                          "/admin/user/edit/[id]",
                          "/admin/supplier",
                          "/admin/supplier/add",
                          "/admin/supplier/edit/[id]",
                          "/admin/user/customer/create",
                          "/admin/user/customer",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#userItem"
                      aria-expanded={
                        [
                          "/admin/user",
                          "/admin/user/add",
                          "/admin/user/edit/[id]",
                          "/admin/supplier",
                          "/admin/supplier/add",
                          "/admin/supplier/edit/[id]",
                          "/admin/user/customer/create",
                          "/admin/user/customer",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="userItem"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/user.png"
                        alt="Food and Beverage"
                      />
                      <span>Users</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="userItem"
                  className={`collapse ${
                    [
                      "/admin/user",
                      "/admin/user/add",
                      "/admin/user/edit/[id]",
                      "/admin/supplier",
                      "/admin/supplier/add",
                      "/admin/supplier/edit/[id]",
                      "/admin/customer/add",
                      "/admin/customer",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="userHeading"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("user", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/user"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/user">
                              <a className="nav-link">User List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("user", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/user/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/user/add">
                              <a className="nav-link">Add User</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("supplier", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/supplier"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/supplier">
                              <a className="nav-link">Supplier List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("supplier", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/supplier/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/supplier/add">
                              <a className="nav-link">Add Supplier</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("customer", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/customer"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/customer">
                              <a className="nav-link">Customer List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("customer", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/customer/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/customer/add">
                              <a className="nav-link">Add Customer</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*End User Menu*/}

            {/*Start Coupon Menu */}
            {hasModulePermission("coupon") ? (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/coupon",
                      "/admin/coupon/add",
                      "/admin/promotional-offer",
                      "/admin/promotional-offer/add",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="coupon"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/coupon",
                          "/admin/coupon/add",
                          "/admin/promotional-offer",
                          "/admin/promotional-offer/add",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#couponItem"
                      aria-expanded={
                        [
                          "/admin/permission",
                          "/admin/permission/add",
                          "/admin/promotional-offer",
                          "/admin/promotional-offer/add",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="couponItem"
                      href="#"
                    >
                      <img
                        src={`/admin_assets/images/menu_icon/permission.png`}
                        alt="Permission"
                      />
                      <span>Promotional</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="couponItem"
                  className={`collapse ${
                    [
                      "/admin/coupon",
                      "/admin/coupon/add",
                      "/admin/promotional-offer",
                      "/admin/promotional-offer/add",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="permission"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("coupon", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/coupon"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/coupon"}>
                              <a className="nav-link">Coupon List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("coupon", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/coupon/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/coupon/add`}>
                              <a className="nav-link">Add Coupon</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("promotional-offer", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/promotional-offer"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/promotional-offer"}>
                              <a className="nav-link">Promotional Offer List</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("promotional-offer", "add") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/promotional-offer/add"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/promotional-offer/add`}>
                              <a className="nav-link">Add Promotional Offer</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/*End Coupon Menu*/}

            {/* Module Menu*/}
            {(hasModulePermission("module") ||
              hasModulePermission("permission") ||
              hasModulePermission("group")) && (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/module",
                      "/admin/module/add",
                      "/admin/module/edit/[id]",
                      "/admin/permission",
                      "/admin/permission/add",
                      "/admin/permission/edit/[id]",
                      "/admin/group",
                      "/admin/group/add",
                      "/admin/group/edit/[id]",
                      "/admin/group/assign/[id]",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="moduleHeading"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/module",
                          "/admin/module/add",
                          "/admin/module/edit/[id]",
                          "/admin/permission",
                          "/admin/permission/add",
                          "/admin/permission/edit/[id]",
                          "/admin/group",
                          "/admin/group/add",
                          "/admin/group/edit/[id]",
                          "/admin/group/assign/[id]",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#moduleItem"
                      aria-expanded={
                        [
                          "/admin/module",
                          "/admin/module/add",
                          "/admin/module/edit/[id]",
                          "/admin/permission",
                          "/admin/permission/add",
                          "/admin/permission/edit/[id]",
                          "/admin/group",
                          "/admin/group/add",
                          "/admin/group/edit/[id]",
                          "/admin/group/assign/[id]",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="moduleItem"
                      href="#"
                    >
                      <img
                        src="/admin_assets/images/menu_icon/modules.png"
                        alt="Module Image"
                      />
                      <span>Roles And Permission</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="moduleItem"
                  className={`collapse ${
                    [
                      "/admin/module",
                      "/admin/module/add",
                      "/admin/module/edit/[id]",
                      "/admin/permission",
                      "/admin/permission/add",
                      "/admin/permission/edit/[id]",
                      "/admin/group",
                      "/admin/group/add",
                      "/admin/group/edit/[id]",
                      "/admin/group/assign/[id]",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="moduleHeading"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("module", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/module" ||
                              router.pathname === "/admin/module/add" ||
                              router.pathname === "/admin/module/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href="/admin/module">
                              <a className="nav-link">Module List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("permission", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/permission" ||
                              router.pathname === "/admin/permission/add" ||
                              router.pathname === "/admin/permission/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/permission"}>
                              <a className="nav-link">Permission List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("group", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/group" ||
                              router.pathname === "/admin/group/add" ||
                              router.pathname === "/admin/group/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/group"}>
                              <a className="nav-link"> Group List</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*End First Label Menu*/}

            {/*Start Settings*/}
            {(hasModulePermission("settings") ||
              hasModulePermission("shop-settings") ||
              hasModulePermission("action-menu") ||
              hasModulePermission("delivery-slots") ||
              hasModulePermission("location") ||
              hasModulePermission("area") ||
              hasModulePermission("pages") ||
              hasModulePermission("faq")) && (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/settings",
                      "/admin/settings/site-settings",

                      "/admin/settings/shop-settings",

                      "/admin/settings/meta-tag",
                      "/admin/settings/payment-gateway",
                      "/admin/action-menu",
                      "/admin/action-menu/add",
                      "/admin/action-menu/edit/[id]",
                      "/admin/delivery-slots",
                      "/admin/delivery-slots/add",
                      "/admin/delivery-slots/edit/[id]",
                      "/admin/location",
                      "/admin/location/add",
                      "/admin/location/edit/[id]",
                      "/admin/area",
                      "/admin/area/add",
                      "/admin/area/edit/[id]",
                      "/admin/pages",
                      "/admin/pages/add",
                      "/admin/pages/edit/[id]",
                      "/admin/faq",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="role"
                >
                  <h2 className="mb-0">
                    {/*<Link href={"/admin/settings"}>*/}
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/settings",
                          "/admin/settings/site-settings",

                          "/admin/settings/shop-settings",

                          "/admin/settings/meta-tag",
                          "/admin/settings/payment-gateway",
                          "/admin/action-menu",
                          "/admin/action-menu/add",
                          "/admin/action-menu/edit/[id]",
                          "/admin/delivery-slots",
                          "/admin/delivery-slots/add",
                          "/admin/delivery-slots/edit/[id]",
                          "/admin/location",
                          "/admin/location/add",
                          "/admin/location/edit/[id]",
                          "/admin/area",
                          "/admin/area/add",
                          "/admin/area/edit/[id]",
                          "/admin/pages",
                          "/admin/pages/add",
                          "/admin/pages/edit/[id]",
                          "/admin/faq",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#all_settings"
                      aria-expanded={
                        [
                          "/admin/settings",
                          "/admin/settings/site-settings",

                          "/admin/settings/shop-settings",

                          "/admin/settings/meta-tag",
                          "/admin/settings/payment-gateway",
                          "/admin/action-menu",
                          "/admin/action-menu/add",
                          "/admin/action-menu/edit/[id]",
                          "/admin/delivery-slots",
                          "/admin/delivery-slots/add",
                          "/admin/delivery-slots/edit/[id]",
                          "/admin/location",
                          "/admin/location/add",
                          "/admin/location/edit/[id]",
                          "/admin/area",
                          "/admin/area/add",
                          "/admin/area/edit/[id]",
                          "/admin/pages",
                          "/admin/pages/add",
                          "/admin/pages/edit/[id]",
                          "/admin/faq",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="all_settings"
                      href="#"
                    >
                      <i className="fas fa-cogs"></i>
                      <span>Settings</span>
                    </a>
                    {/*</Link>*/}
                  </h2>
                </div>

                <div
                  id="all_settings"
                  className={`collapse ${
                    [
                      "/admin/settings",
                      "/admin/settings/site-settings",

                      "/admin/settings/shop-settings",

                      "/admin/settings/meta-tag",
                      "/admin/settings/payment-gateway",
                      "/admin/action-menu",
                      "/admin/action-menu/add",
                      "/admin/action-menu/edit/[id]",
                      "/admin/delivery-slots",
                      "/admin/delivery-slots/add",
                      "/admin/delivery-slots/edit/[id]",
                      "/admin/location",
                      "/admin/location/add",
                      "/admin/location/edit/[id]",
                      "/admin/area",
                      "/admin/area/add",
                      "/admin/area/edit/[id]",
                      "/admin/pages",
                      "/admin/pages/add",
                      "/admin/pages/edit/[id]",
                      "/admin/faq",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="role"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("settings", "shop-settings") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/settings/shop-settings"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/settings/shop-settings"}>
                              <a className="nav-link">Shop Setting</a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("settings", "site-settings") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/settings/site-settings"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/settings/site-settings"}>
                              <a className="nav-link">Site Setting</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("action-menu", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/action-menu" ||
                              router.pathname === "/admin/action-menu/add" ||
                              router.pathname === "/admin/action-menu/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/action-menu"}>
                              <a className="nav-link">Action Menu List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("delivery-slots", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/delivery-slots" ||
                              router.pathname === "/admin/delivery-slots/add" ||
                              router.pathname ===
                                "/admin/delivery-slots/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/delivery-slots"}>
                              <a className="nav-link">Delivery Slots</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("location", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/location" ||
                              router.pathname === "/admin/location/add" ||
                              router.pathname === "/admin/location/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/location"}>
                              <a className="nav-link">Location List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("area", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/area" ||
                              router.pathname === "/admin/area/add" ||
                              router.pathname === "/admin/area/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/area"}>
                              <a className="nav-link">Area List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("pages", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/pages" ||
                              router.pathname === "/admin/pages/add" ||
                              router.pathname === "/admin/pages/edit/[id]"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/pages"}>
                              <a className="nav-link">Pages List</a>
                            </Link>
                          </li>
                        )}
                        {hasMenuPermission("faq", "view") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/faq"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/faq"}>
                              <a className="nav-link">FAQ</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasModulePermission("reports") && (
              <div className="card">
                <div
                  className={`card-header ${
                    [
                      "/admin/reports/lowquantity",
                      "/admin/reports/expired-products",
                    ].includes(router.pathname)
                      ? menu_active
                      : ""
                  }`}
                  id="role"
                >
                  <h2 className="mb-0">
                    <a
                      className={`nav-link has-sub-menu ${
                        [
                          "/admin/reports/lowquantity",
                          "/admin/reports/expired-products",
                        ].includes(router.pathname)
                          ? ""
                          : "collapsed"
                      }`}
                      data-toggle="collapse"
                      data-target="#all_reports"
                      aria-expanded={
                        [
                          "/admin/reports/lowquantity",
                          "/admin/reports/expired-products",
                        ].includes(router.pathname)
                          ? "true"
                          : "false"
                      }
                      aria-controls="all_reports"
                      href="#"
                    >
                      <img
                        src={`/admin_assets/images/menu_icon/reports.png`}
                        alt="Reports"
                      />
                      <span>Reports</span>
                    </a>
                  </h2>
                </div>

                <div
                  id="all_reports"
                  className={`collapse ${
                    [
                      "/admin/reports/lowquantity",
                      "/admin/reports/expired-products",
                    ].includes(router.pathname)
                      ? "show"
                      : ""
                  }`}
                  aria-labelledby="role"
                  data-parent="#sidebarMainMenu"
                >
                  <div className="card-body">
                    <div
                      className="panel-collapse collapse show"
                      aria-expanded="true"
                    >
                      <ul className="">
                        {hasMenuPermission("reports", "lowquantity") && (
                          <li
                            className={`list-group-item ${
                              router.pathname === "/admin/reports/lowquantity"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={"/admin/reports/lowquantity"}>
                              <a className="nav-link">
                                {" "}
                                Low Quantity Product List
                              </a>
                            </Link>
                          </li>
                        )}

                        {hasMenuPermission("reports", "expired-products") && (
                          <li
                            className={`list-group-item ${
                              router.pathname ===
                              "/admin/reports/expired-products"
                                ? menu_active
                                : ""
                            }`}
                          >
                            <Link legacyBehavior href={`/admin/reports/expired-products`}>
                              <a className="nav-link">Expired Product List</a>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*End Report */}
          </div>
        </div>
      </nav>
    </>
  );
};

// const mapStateToProps = (store) => {
//   const { permissions } = store.authorizationStore;
//   return { permissions };
// };
export default LeftSideBar;
