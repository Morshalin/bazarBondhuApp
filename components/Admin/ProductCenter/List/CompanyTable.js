/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactPlaceholder from "../../../Ui/placeholder/placeholder";
import CompanyHeadList from "./CompanyHeadList";

const CompanyTable = () => {
  const [comapnList, setCompanyList] = useState();
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");

  const [searchingKeyWord, setSearchingKeyWord] = useState("");

  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(
        `backend/getAllCompany?page=${page}&show=${show}&searchKeyword=${encodeURIComponent(
          searchingKeyWord
        )}&column=${column}&orderBy=${orderBy}`
      )
      .then((res) => {
        if (res.data.success) {
          setMeta(res.data.data.meta);
          setCompanyList(res.data.data.data);
          setIsLoading(true);
        }
      });
  }, [page, show, searchingKeyWord, column, orderBy]);

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
                    <h2>Company List</h2>
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <div className="row table-top-option mb-3">
                    <div className="col-sm-6">
                      <div className="showing-table-row">
                        <label className="">Show</label>
                        <select
                          className="custom-select"
                          defaultValue={10}
                          onChange={(event) => {
                            setPage(1);
                            setMeta("");
                            setShow(+event.target.value);
                          }}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="table-search">
                        <label className="">Search</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search Company by name"
                          onChange={(event) => {
                            setTimeout(() => {
                              setMeta("");
                              setSearchingKeyWord(event.target.value);
                              setPage(1);
                            }, 500);
                          }}
                          title="search product by name"
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table">
                        <table className="table table-bordered table-hover table-striped">
                          <CompanyHeadList
                            column={column}
                            orderBy={orderBy}
                            setColumn={setColumn}
                            setOrderBy={setOrderBy}
                          />
                          <tbody>
                            {!isLoading ? (
                              <tr>
                                <td colSpan={7}>
                                  <ReactPlaceholder
                                    showLoadingAnimation={true}
                                    type={"textRow"}
                                    rows={10}
                                    ready={isLoading}
                                    className="my-2"
                                    style={{ height: "24px" }}
                                  />
                                </td>
                              </tr>
                            ) : comapnList && comapnList.length > 0 ? (
                              comapnList.map((company, index) => (
                                <tr
                                  key={`company_${company.id}`}
                                  id={`company_${company.id}`}
                                >
                                  <td scope="row" className="text-center">
                                    {meta.from ? index + meta.from : ""}
                                  </td>

                                  <td className="nowrap">{company.name}</td>

                                  <td className="text-center">
                                    {company.status === true
                                      ? "Active"
                                      : "Inactive"}
                                  </td>

                                  <td className="text-center">
                                    <div className="dropdown action-btn-group">
                                      <button
                                        className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Actions
                                      </button>
                                      <div className="dropdown-menu">
                                        <Link legacyBehavior
                                          href={`product-center/brand/${company.id}`}
                                        >
                                          <a className="dropdown-item">
                                            <i className="icon-pencil-alt text-primary" />{" "}
                                            View Brand
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="text-center">
                                  No Comapny Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {meta && (
                        <nav
                          aria-label="Page navigation example"
                          className="d-flex justify-content-center"
                        >
                          <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={meta.last_page}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={(pageNumber) => {
                              setPage(+pageNumber.selected + 1);
                            }}
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            activeClassName={"active"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                          />
                        </nav>
                      )}
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
};

export default CompanyTable;
