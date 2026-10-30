import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import axios from "axios";
import Link from "next/link";

const Index = (props) => {
  const initial = {
    sales: {
      amount: 0,
    },
    sales_return: {
      amount: 0,
    },
    purchase: {
      amount: 0,
    },
    purchase_return: {
      amount: 0,
    },
    gross_profit: 0,
    net_profit: 0,
    deposit: {
      amount: 0,
    },
    expense: {
      amount: 0,
    },
  };
  const [reports, setReports] = useState(initial);
  const [reportsType, setReportsType] = useState("daily");

  const getReport = async (reportType) => {
    setReportsType(reportType);
    const url = `${process.env.api_backend_url}/accounts`;
    axios
      .post(url, { report_type: reportType })
      .then((response) => {
        console.log("uzzal", response);
        (response.data.success && setReports(response.data.data)) ||
          (!response.data.success && setReports(""));
      })
      .catch((errors) => errors);
  };

  useEffect(() => {
    let mounted = true;
    mounted && getReport("daily");
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <AdminHeader>{`Accounts Dashboard | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="custom-card-box">
                  <div className="custom-card-box-header">
                    <div className="fbh-title">
                      <i className="icon-tachometer-alt-solid" />
                      <h2>Summary Report</h2>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="dsr-filter d-flex align-items-center justify-content-center">
                      <div className="btn-group mx-auto" role="group">
                        <button
                          type="button"
                          className={`btn ${
                            reportsType === "daily" ? "active" : ""
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            getReport("daily");
                          }}
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          className={`btn ${
                            reportsType === "weekly" ? "active" : ""
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            getReport("weekly");
                          }}
                        >
                          Last 7 Days
                        </button>
                        <button
                          type="button"
                          className={`btn ${
                            reportsType === "monthly" ? "active" : ""
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            getReport("monthly");
                          }}
                        >
                          This Month
                        </button>
                        <button
                          type="button"
                          className={`btn ${
                            reportsType === "yearly" ? "active" : ""
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            getReport("yearly");
                          }}
                        >
                          This Year
                        </button>
                      </div>
                    </div>
                    <div className="card-group">
                      <div className="card border-right rounded-0">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <div className="d-inline-flex align-items-center">
                                <h2 className="text-dark mb-1 font-weight-medium">
                                  {reports.sales?.amount}
                                </h2>
                                {/*<span*/}
                                {/*    className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">+18.33%</span>*/}
                              </div>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Sales
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              <span className="opacity-7 text-muted">৳</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<div className="card border-right">*/}
                      {/*    <div className="card-body">*/}
                      {/*        <div className="d-flex d-lg-flex d-md-block align-items-center">*/}
                      {/*            <div>*/}
                      {/*                <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">*/}
                      {/*                    {reports.sales_return.amount}*/}
                      {/*                </h2>*/}
                      {/*                <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">*/}
                      {/*                    Sales Return*/}
                      {/*                </h6>*/}
                      {/*            </div>*/}
                      {/*            <div className="ml-auto mt-md-3 mt-lg-0">*/}
                      {/*                <span className="opacity-7 text-muted">*/}
                      {/*                    ৳*/}
                      {/*                </span>*/}
                      {/*            </div>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                      <div className="card border-right">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <div className="d-inline-flex align-items-center">
                                <h2 className="text-dark mb-1 font-weight-medium">
                                  {reports.purchase?.amount}
                                </h2>
                                {/*<span*/}
                                {/*    className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">-18.33%</span>*/}
                              </div>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Purchase
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              <span className="opacity-7 text-muted">৳</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*<div className="card border-right">*/}
                      {/*    <div className="card-body">*/}
                      {/*        <div className="d-flex d-lg-flex d-md-block align-items-center">*/}
                      {/*            <div>*/}
                      {/*                <div className="d-inline-flex align-items-center">*/}
                      {/*                    <h2 className="text-dark mb-1 font-weight-medium">*/}
                      {/*                        {reports.purchase_return.amount}*/}
                      {/*                    </h2>*/}
                      {/*                    /!*<span*!/*/}
                      {/*                    /!*    className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">-18.33%</span>*!/*/}
                      {/*                </div>*/}
                      {/*                <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Purchase*/}
                      {/*                    Return</h6>*/}
                      {/*            </div>*/}
                      {/*            <div className="ml-auto mt-md-3 mt-lg-0">*/}
                      {/*                <span className="opacity-7 text-muted">*/}
                      {/*                    ৳*/}
                      {/*                </span>*/}
                      {/*            </div>*/}
                      {/*        </div>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                      <div className="card border-right">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <div className="d-inline-flex align-items-center">
                                <h2 className="text-dark mb-1 font-weight-medium">
                                  {reports.gross_profit}
                                </h2>
                                {/*<span*/}
                                {/*    className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">-18.33%</span>*/}
                              </div>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Gross Profit
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              <span className="opacity-7 text-muted">৳</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-0">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <h2 className="text-dark mb-1 font-weight-medium">
                                {reports.net_profit}
                              </h2>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Net Profit/Loss
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              <span className="opacity-7 text-muted">৳</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-group mt-4">
                      <div className="card border-right rounded-0">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <div className="d-inline-flex align-items-center">
                                <h2 className="text-dark mb-1 font-weight-medium">
                                  {reports.deposit?.amount ?? 0}
                                  <span className="opacity-7 text-muted text-25">
                                    ৳
                                  </span>
                                </h2>
                                {/*<span*/}
                                {/*    className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">+18.33%</span>*/}
                              </div>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Deposit
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              {/*<span className="opacity-7 text-muted">*/}
                              {/*    ৳*/}
                              {/*</span>*/}
                              <Link legacyBehavior
                                href={`/admin/accounts/accounts-deposit/add`}
                              >
                                <a className="nav-link">
                                  <button
                                    type={`button`}
                                    className={`btn btn-sm btn-primary`}
                                  >
                                    Add Deposit
                                  </button>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card rounded-0">
                        <div className="card-body">
                          <div className="d-flex d-lg-flex d-md-block align-items-center">
                            <div>
                              <div className="d-inline-flex align-items-center">
                                <h2 className="text-dark mb-1 font-weight-medium">
                                  {reports.expense?.amount ?? 0}
                                  <span className="opacity-7 text-muted text-25">
                                    ৳
                                  </span>
                                </h2>
                                {/*<span*/}
                                {/*    className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">+18.33%</span>*/}
                              </div>
                              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">
                                Expense
                              </h6>
                            </div>
                            <div className="ml-auto mt-md-3 mt-lg-0">
                              {/*<span className="opacity-7 text-muted">*/}
                              {/*    ৳*/}
                              {/*</span>*/}

                              <Link legacyBehavior
                                href={`/admin/accounts/accounts-expense/add`}
                              >
                                <a className="nav-link">
                                  <button
                                    type={`button`}
                                    className={`btn btn-sm btn-primary`}
                                  >
                                    Add Expense
                                  </button>
                                </a>
                              </Link>
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
        </section>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  if (!req.headers.cookie) {
    res.writeHead(302, { Location: "/auth/sly-login" });
    res.end();
  }
  const token = req.headers.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("token"))
    ?.split("=")[1];

  if (!token) {
    return {
      redirect: {
        destination: "/auth/sly-login",
        permanent: false,
      },
    };
  }

  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  const resp = await fetch(`${process.env.api_backend_url}/get-site-info`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json();
  let hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    data.data.permissions &&
      data.data.permissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };
  if (!hasMenuPermission("accounts", "accounts-supplier")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default Index;
