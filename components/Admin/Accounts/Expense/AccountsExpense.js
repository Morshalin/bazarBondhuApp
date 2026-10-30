import Link from "next/link";
import React, { useEffect, useState } from "react";
import { options } from "../../../../Helpers/Utils/Utils";
import axios from "axios";
import process from "../../../../next.config";
import Loader from "react-loader";
import ComponentToPrint from "./ComponentToPrint";
import { loadScript } from "../../../../Helpers/Utils/loadScript";

const AccountsExpense = () => {
  const [dateSelection, setDateSelection] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [report, setReport] = useState("");

  const dateCalculation = (sumb) => {
    let currentDateObj = new Date(dateSelection);
    let numberOfMlSeconds = currentDateObj.getTime();
    let addMlSeconds = 60 * 60 * 1000 * 24;
    if (sumb == "+") {
      let newDateObj2 = new Date(numberOfMlSeconds + addMlSeconds)
        .toISOString()
        .slice(0, 10);
      setDateSelection(newDateObj2);
    } else if (sumb == "-") {
      let newDateObj = new Date(numberOfMlSeconds - addMlSeconds)
        .toISOString()
        .slice(0, 10);
      setDateSelection(newDateObj);
    }
    getReport();
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setDateSelection(value);
    getReport();
  };

  const getReport = async () => {
    let headApiUrl = `${process.env.api_backend_url}/accounts/expense-list`;
    const headFormData = new FormData();
    headFormData.append("selectDate", dateSelection);

    axios
      .post(headApiUrl, headFormData)
      .then((apiResponses) => {
        if (apiResponses.data.success) {
          setReport(apiResponses.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReport();
  }, [dateSelection]);

  function downloadPdfHandler() {
    axios
      .get(`backend/accounts/pdf/expense/download`, {
        responseType: "blob",
      })
      .then((res) => {
        // console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `expense.pdf`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }

  const downloadCsvHandler = () => {
    axios.get(`backend/accounts/csv/expense/download`).then((res) => {
      // console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `expense.csv`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  };

  const [isScriptLoad, setIsScriptLoad] = React.useState(false);
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      loadScript(`/js/print.min.js`, "expense-print");
      setIsScriptLoad(true);
      // another loadScript below this line
    }
    return () => {
      isLoaded = false;
    };
  }, []);

  const printHandler = () => {
    printJS("printJS-form", "html");
  };

  return (
    <>
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>খরচের তালিকা</h2>
                    <Link legacyBehavior href={`accounts-expense/add`}>
                      <a className="fbh-btn pr-3" title="খরচ যুক্ত করুন">
                        <i className="icon-plus-square-regular" /> খরচ যুক্ত
                        করুন
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row mb-4">
                    <div className="col-sm-12">
                      <div className="list-group">
                        <div className="list-group-item list-group-item-action d-flex">
                          <div className="p-2">
                            {/*<a href="#"><i className="fas fa-angle-left"></i></a>*/}
                            <button
                              className="btn btn-primary"
                              onClick={(event) => {
                                event.preventDefault();
                                dateCalculation("-");
                              }}
                            >
                              <i className="fas fa-angle-left"></i>
                            </button>
                          </div>

                          {/*<div className="p-2 flex-grow-1">*/}
                          <div className="p-2 mx-auto ">
                            <input
                              type="date"
                              value={
                                dateSelection ??
                                new Date().toISOString().slice(0, 10)
                              }
                              max={new Date().toISOString().slice(0, 10)}
                              className="mt-1 form-control"
                              onChange={(event) => onValueChange(event)}
                            />
                          </div>

                          <div className="p-2">
                            {/*<a href="#"><i className="fas fa-angle-right"></i></a>*/}
                            <button
                              className="btn btn-primary"
                              onClick={(event) => {
                                event.preventDefault();
                                dateCalculation("+");
                              }}
                              disabled={
                                dateSelection >=
                                new Date().toISOString().slice(0, 10)
                                  ? "disabled"
                                  : ""
                              }
                            >
                              <i className="fas fa-angle-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-12">
                      <div className="box d-flex justify-content-end align-items-center ">
                        <div className="btn-group btn-group-toggle">
                          <button
                            title="export to pdf"
                            type="button"
                            className="btn"
                            data-toggle="button"
                            aria-pressed="false"
                            style={{
                              background: "#ff7588",
                            }}
                            onClick={downloadPdfHandler}
                          >
                            <span
                              style={{
                                color: "#fff",
                              }}
                            >
                              <i className="fas fa-file-pdf"></i>
                            </span>
                          </button>

                          <button
                            title="export to csv"
                            type="button"
                            className="btn"
                            data-toggle="button"
                            aria-pressed="false"
                            style={{
                              background: "#ffc107",
                            }}
                            onClick={downloadCsvHandler}
                          >
                            <span
                              style={{
                                color: "#fff",
                              }}
                            >
                              <i className="fas fa-file-alt"></i>
                            </span>
                          </button>
                          {isScriptLoad ? (
                            <button
                              title="print"
                              type="button"
                              className="btn"
                              data-toggle="button"
                              aria-pressed="false"
                              style={{
                                background: "#2196f3",
                              }}
                              onClick={printHandler}
                            >
                              <span
                                style={{
                                  color: "#fff",
                                }}
                              >
                                <i className="fas fa-print"></i>
                              </span>
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Loader loaded={true} options={options} className="spinner">
                    <div className="table-responsive custom-table mt-1">
                      <table className="table table-bordered table-hover table-striped">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">ক্রমিক নং</th>
                            {/* <th scope="col">তারিখ</th> */}
                            <th scope="col" colSpan={2}>
                              বাবদ
                            </th>
                            <th scope="col">রেফারেন্স</th>
                            <th scope="col">হিসাবের খাত</th>
                            <th scope="col">গ্রহীতার ধরণ</th>
                            <th scope="col">গ্রহীতার নাম</th>
                            <th scope="col">অ্যাকাউন্ট</th>
                            <th scope="col">টাকার পরিমান</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report?.expense &&
                            (report.expense || []).map((exp, index) => (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                {/* <td>{exp?.date}</td> */}
                                <td colSpan={2}>
                                  {exp?.items.map((data) => (
                                    <>
                                      &#x2611; {data.particular} &#x21b3; ৳
                                      {data.amount}
                                      <br />
                                    </>
                                  ))}
                                </td>
                                <td>{exp?.reference}</td>

                                <td>
                                  {exp?.head?.head} ({exp?.head?.code})
                                </td>
                                <td>{exp?.receiver_type}</td>
                                <td>
                                  <div>{exp?.pay_to?.name}</div>
                                </td>
                                <td>{exp?.payment_type}</td>
                                <td className="text-right">{exp?.amount}</td>
                              </tr>
                            ))}
                        </tbody>
                        <tfoot className="text-right">
                          <tr>
                            <td colSpan={8} className="text-right">
                              সর্বমোট
                            </td>
                            <td>{report?.total}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </Loader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComponentToPrint />
    </>
  );
};

export default AccountsExpense;
