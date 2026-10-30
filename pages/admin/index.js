import React, { useState, useEffect, useMemo } from "react";
import AdminHeader from "../../components/Admin/Header/AdminHeader";
import Layout from "../../components/Admin/Layout/Layout";
import axios from "axios";
// import useHttp from "../../hooks/useHttp";

function add(a1, b1) {
  const A = a1 ?? 0;
  const B = b1 ?? 0;

  return +A + +B;
}

function sub(a1, b1) {
  const A = a1 ?? 0;
  const B = b1 ?? 0;

  return +A - +B;
}

const Index = (props) => {
  console.log("admin index");

  const serverPermissions = props.serverPermissions;

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

  // const hasMenuPermission = (module, permission_type) => {
  //   let isExists = false;
  //   serverPermissions &&
  //     serverPermissions.map((perm, index) => {
  //       if (
  //         perm.module === module &&
  //         perm.permission_type === permission_type
  //       ) {
  //         isExists = true;
  //       }
  //     });

  //   return isExists;
  // };

  const [saleReportByDate, setSaleReportByDate] = useState();
  const [saleReportData, setSaleReportData] = useState();

  // const allSale = saleReportData.allSale.sum ?? 0;
  // const saleReturn = saleReportData.saleReturn.sum ?? 0;
  // const totalSale = allSale + saleReturn;

  const [reportsType, setReportsType] = useState("today");

  const [saleReportSearchDateFrom, setSaleReportSearchDateFrom] = useState("");
  const [saleReportSearchDateTo, setSaleReportSearchDateTo] = useState("");

  const dateChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "filter_form_date") {
      setSaleReportSearchDateFrom(`${value} 00:00:00`);
    } else {
      setSaleReportSearchDateTo(`${value} 23:59:59`);
    }
  };

  useEffect(() => {
    if (reportsType) {
      axios
        .post(`backend/sale-report-by-date`, { report_type: reportsType })
        .then((res) => {
          if (res.data.success) {
            setSaleReportByDate(res.data.data);
          }
        });
    }
  }, [reportsType]);

  const searchReportHandler = (event) => {
    event.preventDefault();
    setReportsType(null);
    axios
      .post(`backend/sale-report-by-date`, {
        report_type: "custom",
        search_report: {
          from: saleReportSearchDateFrom,
          to: saleReportSearchDateTo,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setSaleReportByDate(res.data.data);
        }
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios.get(`backend/sale-report`).then((res) => {
        if (res.data.success) {
          setSaleReportData(res.data.data);
        }
      });
    }
    return () => (mounted = false);
  }, []);

  const accountSale = useMemo(
    () =>
      saleReportData?.accountWizes.reduce((a, b) => {
        return a + b.sale_amount;
      }, 0),
    [saleReportData?.accountWizes]
  );

  const totalDue = add(
    Math.abs(saleReportData?.totalDue),
    saleReportData?.todayPayment
  );

  const todayDue = sub(saleReportData?.allSale.sum, accountSale);

  // console.log(accountSale);
  // console.log(saleReportByDate);
  // console.log(saleReportData);

  // console.log(saleReportSearchDateFrom);
  // console.log(saleReportSearchDateTo);

  return (
    <>
      <AdminHeader>{`Admin Dashboard | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <section className="sdses">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <section className="custom-card">
                  {hasModulePermission("fmcg-dashboard") &&
                  hasModulePermission(
                    "fmcg-dashboard",
                    "fmcg-dashboard-view"
                  ) ? (
                    <div className="custom-card-box">
                      <div className="card-body vh-100">
                        <h2 className="h1 text-center">Welcome to Dashboard</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="custom-card-box">
                      <div className="custom-card-box-header">
                        <div className="fbh-title">
                          <i className="fas fa-chart-line"></i>
                          <h2>সংক্ষিপ্ত রিপোর্ট</h2>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="dsr-filter d-flex align-items-center justify-content-center">
                          <div className="btn-group mx-auto" role="group">
                            <button
                              type="button"
                              className={`btn ${
                                reportsType === "today" ? "active" : ""
                              }`}
                              onClick={(event) => {
                                event.preventDefault();
                                setReportsType("today");
                              }}
                            >
                              আজকের
                            </button>
                            <button
                              type="button"
                              className={`btn ${
                                reportsType === "yesterday" ? "active" : ""
                              }`}
                              onClick={(event) => {
                                event.preventDefault();
                                setReportsType("yesterday");
                              }}
                            >
                              গতকালের
                            </button>
                          </div>
                        </div>
                        <div className="dsr-filter">
                          <div className="row justify-content-center">
                            <div className="col-md-3 form-group">
                              <input
                                type="date"
                                className={`form-control`}
                                autoComplete="off"
                                id="filter_form_date"
                                name="filter_form_date"
                                value={saleReportSearchDateFrom.slice(0, 10)}
                                onChange={dateChangeHandler}
                                required
                              />
                            </div>
                            <div className="col-md-3 form-group">
                              <input
                                type="date"
                                className={`form-control`}
                                autoComplete="off"
                                id="filter_to_date"
                                name="filter_to_date"
                                value={saleReportSearchDateTo.slice(0, 10)}
                                onChange={dateChangeHandler}
                                required
                              />
                            </div>

                            <div className="col-md-1 col-sm-1">
                              <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={searchReportHandler}
                              >
                                অনুসন্ধান
                              </button>
                            </div>
                          </div>
                        </div>

                        <section className="custom-card">
                          <div className="custom-card-box">
                            <div className="custom-card-box-header">
                              <div className="fbh-title">
                                <i className="fas fa-sign-in-alt"></i>
                                <h2>বিক্রয়</h2>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <tbody>
                                    {saleReportByDate &&
                                      saleReportByDate.accountWizes.map(
                                        (item, index) => (
                                          <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.sale_count} টি</td>
                                            <td>
                                              <span className="opacity-7 tk-sign">
                                                ৳
                                              </span>{" "}
                                              {item.sale_amount}
                                            </td>
                                          </tr>
                                        )
                                      )}

                                    <tr className="font-weight-bold">
                                      <td>মোট বিক্রয়</td>
                                      <td>
                                        {saleReportByDate?.allSale.count} টি
                                      </td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        {saleReportByDate?.allSale.sum ?? "0"}
                                      </td>
                                    </tr>
                                    <tr className="text-danger">
                                      <td>বিক্রয় ফেরত</td>
                                      <td>
                                        {saleReportByDate?.saleReturn.count} টি
                                      </td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        -
                                        {saleReportByDate?.saleReturn.sum ??
                                          "0"}
                                      </td>
                                    </tr>
                                    <tr className="font-weight-bold">
                                      <td colSpan={2}>সর্বমোট</td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        {`${sub(
                                          saleReportByDate?.allSale.sum,
                                          saleReportByDate?.saleReturn.sum
                                        )}`}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section className="custom-card">
                          <div className="custom-card-box">
                            <div className="custom-card-box-header">
                              <div className="fbh-title">
                                <i className="fas fa-sign-out-alt"></i>
                                <h2>ক্রয়</h2>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <tbody>
                                    <tr>
                                      <td>নগদ</td>
                                      <td>
                                        {saleReportByDate?.purchaseCredit.count}{" "}
                                        টি
                                      </td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        {saleReportByDate?.purchaseCredit.sum ??
                                          "0"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>বাকি</td>
                                      <td>
                                        {`${sub(
                                          saleReportByDate?.allPurchase.count,
                                          saleReportByDate?.purchaseCredit.count
                                        )}`}{" "}
                                        টি
                                      </td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        {`${sub(
                                          saleReportByDate?.allPurchase.sum,
                                          saleReportByDate?.purchaseCredit.sum
                                        )}`}
                                      </td>
                                    </tr>
                                    <tr className="font-weight-bold">
                                      <td>সর্বমোট ক্রয়</td>
                                      <td>
                                        {saleReportByDate?.allPurchase.count} টি
                                      </td>
                                      <td>
                                        <span className="opacity-7 tk-sign">
                                          ৳
                                        </span>{" "}
                                        {saleReportByDate?.allPurchase.sum ??
                                          "0"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  )}
                </section>
                <div className="row">
                  <div className="col-md-6">
                    <section className="custom-card">
                      <div className="custom-card-box">
                        <div className="custom-card-box-header">
                          <div className="fbh-title">
                            <i className="fas fa-globe"></i>
                            <h2>ই-কমার্স অর্ডার</h2>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <tbody>
                                <tr className="text-right">
                                  <td>আজকের অর্ডার</td>
                                  <td>{saleReportData?.todayOrders} টি</td>
                                </tr>
                                <tr className="text-right text-success">
                                  <td>সম্পন্ন হয়েছে</td>
                                  <td>{saleReportData?.completedOrders} টি</td>
                                </tr>
                                <tr className="text-right text-warning">
                                  <td>প্রক্রিয়াধীন</td>
                                  <td>
                                    {`${sub(
                                      saleReportData?.completedOrders,
                                      saleReportData?.todayOrders
                                    )}`}{" "}
                                    টি
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="col-md-6">
                    <section className="custom-card">
                      <div className="custom-card-box">
                        <div className="custom-card-box-header">
                          <div className="fbh-title">
                            <i className="fas fa-signal"></i>
                            <h2>পরিসংখ্যান </h2>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <tbody>
                                <tr className="text-right">
                                  <td>দোকানের ব্যবহারকারী</td>
                                  <td>{saleReportData?.shopUsers}</td>
                                </tr>
                                <tr className="text-right">
                                  <td>দোকানের ক্রেতা</td>
                                  <td>{saleReportData?.shopBuyer}</td>
                                </tr>
                                <tr className="text-right">
                                  <td>বাজার বন্ধু গ্রাহক</td>
                                  <td>{saleReportData?.totalUsers}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <section className="custom-card">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom-card-box">
                        <div className="custom-card-box-header">
                          <div className="fbh-title">
                            <i className="fas fa-link"></i>
                            <h2>শর্টকাট</h2>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="dsr-filter mb-0">
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-swatchbook"></i> ক্যাশবুক
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-plus-square"></i> জমা যোগ
                              করুন
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-plus-square"></i> খরচ যোগ
                              করুন
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-atlas"></i> লেজার বুক
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-id-badge"></i> প্রোফাইল
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-user-plus"></i> গ্রাহক যোগ
                              করুন
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-folder-plus"></i> পণ্য যোগ
                              করুন
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-cubes"></i> ক্রয় যোগ করুন
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-desktop"></i> POS
                            </a>
                            <a
                              className="btn btn-light mr-3 mb-3 shadow-sm"
                              href="#"
                              role="button"
                            >
                              <i className="fas fa-clipboard-list"></i> ই-কমার্স
                              অর্ডার
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="custom-card">
                  <div className="custom-card-box">
                    <div className="custom-card-box-header">
                      <div className="fbh-title">
                        <i className="fas fa-hand-holding-usd"></i>
                        <h2>বাঁকি</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="text-right">
                              <td>পূর্বের বাঁকি</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${sub(totalDue, todayDue)}`}
                              </td>
                            </tr>
                            <tr className="text-right">
                              <td>আজকের বাঁকি</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${sub(
                                  saleReportData?.allSale.sum,
                                  accountSale
                                )}`}
                              </td>
                            </tr>
                            <tr className="text-warning font-weight-normal text-right">
                              <td>মোট বাঁকি</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${totalDue}`}
                              </td>
                            </tr>
                            <tr className="text-success text-right">
                              <td>আজকের পরিশোধ</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {saleReportData?.todayPayment ?? "0"}
                              </td>
                            </tr>
                            <tr className="text-danger font-weight-bold text-right">
                              <td>সর্বমোট বাঁকি</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {Math.abs(saleReportData?.totalDue) ?? "0"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="custom-card">
                  <div className="custom-card-box">
                    <div className="custom-card-box-header">
                      <div className="fbh-title">
                        <i className="fas fa-file-invoice-dollar"></i>
                        <h2>স্টক</h2>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <tbody>
                            <tr className="text-right">
                              <td>পূর্বের স্টক</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${saleReportData?.previousStock ?? "0"}`}
                              </td>
                            </tr>
                            <tr className="text-right">
                              <td>আজকের ক্রয় (+)</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${saleReportData?.todayPurchase ?? "0"}`}
                              </td>
                            </tr>
                            <tr className="text-right">
                              <td>আজকের বিক্রয় (-)</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${saleReportData?.todaySale ?? "0"}`}
                              </td>
                            </tr>
                            <tr className="text-danger text-right">
                              <td>বিক্রয় ফেরত (+)</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${saleReportData?.todaySaleReturn ?? "0"}`}
                              </td>
                            </tr>
                            <tr className="text-success font-weight-bold text-right">
                              <td>বর্তমান স্টক</td>
                              <td>
                                <span className="opacity-7 tk-sign">৳</span>{" "}
                                {`${saleReportData?.currentStock ?? "0"}`}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return "";
  const prefix = `${name}=`;
  const row = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  if (!row) return "";
  try {
    return decodeURIComponent(row.slice(prefix.length));
  } catch {
    return row.slice(prefix.length);
  }
}

function redirectToLogin(res) {
  res.setHeader(
    "Set-Cookie",
    "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  return {
    redirect: {
      destination: "/auth/sly-login",
      permanent: false,
    },
  };
}

export async function getServerSideProps({ req, res }) {
  const token = readCookie(req.headers.cookie, "token");

  if (!token) {
    return redirectToLogin(res);
  }

  const resp = await fetch(`${process.env.api_backend_url}/get-site-info`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json().catch(() => null);
  const permissions = data?.data?.permissions;

  // Invalid or expired tokens come back as { success: false } with no data.
  if (!data?.success || !Array.isArray(permissions)) {
    return redirectToLogin(res);
  }

  return {
    props: {
      serverPermissions: permissions,
    },
  };
}

export default Index;
