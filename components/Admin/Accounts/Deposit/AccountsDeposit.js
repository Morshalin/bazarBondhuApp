import React, { useEffect, useState } from "react";
import process from "../../../../next.config";
import axios from "axios";
import Link from "next/link";

const AccountsDeposit = () => {
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
    //getReport();
  };

  const onValueChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setDateSelection(value);
    //getReport();
  };

  const getReport = async () => {
    let headApiUrl = `${process.env.api_backend_url}/accounts/deposit-list`;
    const headFormData = new FormData();
    headFormData.append("selectDate", dateSelection);

    axios
      .post(headApiUrl, headFormData)
      .then((apiResponses) => {
        //console.log(apiResponses.data.data);
        if (apiResponses.data.success) {
          setReport(apiResponses.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*  function downloadPdfHandler() {
    axios
      .get(`backend/accounts/pdf/download`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);

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
  } */

  useEffect(() => {
    getReport();
  }, [dateSelection]);

  return (
    <>
      {/* <button onClick={downloadPdfHandler}>PDF</button> */}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>জমার তালিকা </h2>
                    <Link legacyBehavior href={`accounts-deposit/add`}>
                      <a className="fbh-btn pr-3" title="জমা করুন">
                        <i className="icon-plus-square-regular" /> জমা করুন
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
                          <div className="p-2 mx-auto form-group">
                            <input
                              type="date"
                              value={
                                dateSelection ??
                                new Date().toISOString().slice(0, 10)
                              }
                              max={new Date().toISOString().slice(0, 10)}
                              className="mt-1 form-control"
                              onChange={onValueChange}
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
                  <div className="table-responsive custom-table mt-1">
                    <table className="table table-bordered table-hover table-striped">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">ক্রমিক নং</th>
                          {/* <th scope="col">তারিখ</th> */}
                          <th scope="col">বাবদ</th>
                          <th scope="col">রেফারেন্স</th>
                          <th scope="col">হিসাবের খাত</th>
                          <th scope="col">দাতার ধরণ</th>
                          <th scope="col">দাতার নাম</th>
                          <th scope="col">অ্যাকাউন্ট</th>
                          <th scope="col">টাকার পরিমান</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.deposit &&
                          report.deposit.map((dep, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              {/* <td>{dep.date} </td> */}
                              <td>
                                {dep?.particulars?.map((data) => (
                                  <>
                                    &#x2611; {data.particular} &#x21b2; ৳
                                    {data.amount}
                                    <br />
                                  </>
                                ))}
                              </td>
                              <td>{dep.reference} </td>
                              <td>
                                {dep.head.head} ({dep.head.code}){" "}
                              </td>
                              <td>{dep.receiver_type} </td>
                              <td>{dep.receiver.name}</td>
                              <td>
                                {dep.payment_type}{" "}
                                {/* <span
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title={
                                    dep.payment_note
                                      ? dep.payment_note
                                      : "Don't Have a Note."
                                  }
                                >
                                  <i class="fas fa-info-circle"></i>{" "}
                                </span> */}
                              </td>

                              <td className="text-right">{dep.amount}</td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot className="text-right">
                        <tr>
                          <td colSpan={7} className="text-right">
                            সর্বমোট
                          </td>
                          <td>{report.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AccountsDeposit;
