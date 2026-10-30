import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "react-loader";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { getData, options } from "../../../../Helpers/Utils/Utils";
import {
  SET_PURCHASE,
  SET_PURCHASE_LIST,
} from "../../../../store/admin/actions/purchase/purchaseListAction";
import SelectField from "../../../Ui/Form/SelectField";
import PurchaseListHeader from "./PurchaseListHeader";

const PurchaseList = (props) => {
  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchType, setSearchType] = useState("product");

  console.log(searchType);
  useEffect(() => {
    let mounted = true;

    getData(
      `backend/purchases?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}&startDate=${startDate}&endDate=${endDate}&searchType=${searchType}`,
      true
    )
      .then((res) => {
        if (mounted && res) {
          setMeta(res.data.meta);
          props.setPurchaseList(res.data.data);
        }
      })
      .finally(() => (mounted = false));
  }, [show, keywords, page, column, orderBy, startDate, endDate, searchType]);
  const searchTypeOptions = [
    { name: "Supplier", value: "supplier" },
    { name: "Product", value: "product" },
  ];

  function searchTypeHandler(e) {
    setSearchType(e.target.value);
  }

  return (
    <>
      <div className="col-md-7 mb-3">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2 className="ml-2">Purchase List</h2>

              <Link legacyBehavior href={"/admin/purchase/add"}>
                <a className="fbh-btn" title="Add Purchase">
                  <i className="icon-plus-square-regular"></i>
                </a>
              </Link>
            </div>
          </div>
          <div className="custom-card-box-content p-md-3 p-2">
            <div className="row">
              <div className="col">
                <div className="form-group row">
                  <label className="col-2 col-form-label">From</label>
                  <div className="col-10">
                    <input
                      id="date"
                      type="date"
                      value={startDate}
                      className="form-control ml-2"
                      style={{ width: "175px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setStartDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="form-group row">
                  <label className="col-2 col-form-label">To</label>
                  <div className="col-10">
                    <input
                      id="date"
                      type="date"
                      value={endDate}
                      className="form-control ml-2"
                      style={{ width: "175px" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setEndDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row table-top-option mb-md-3 mb-2">
              <div className="col-4">
                <div className="showing-table-row">
                  <label className="">Show</label>
                  <select
                    className="custom-select"
                    defaultValue={`10`}
                    onChange={(e) => {
                      setMeta("");
                      setShow(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <SelectField
                  options={searchTypeOptions}
                  onChange={searchTypeHandler}
                  name="search_type"
                  value={searchType}
                />
              </div>
              <div className="col-4">
                <div className="table-search">
                  {/* <label className=''>Search</label> */}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here ..."
                    onChange={(e) => {
                      setMeta("");
                      setTimeout(() => {
                        setKeywords(e.target.value);
                        setPage(1);
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive custom-table custom-hight-500">
                  <Loader loaded={!!meta} options={options} className="spinner">
                    <table className="table table-bordered table-hover mb-0 carsour-pointer">
                      <thead className="thead-light">
                        <PurchaseListHeader
                          setColumn={setColumn}
                          setOrderBy={setOrderBy}
                          column={column}
                          orderBy={orderBy}
                        />
                      </thead>
                      <tbody>
                        {props.purchaseList && props.purchaseList.length > 0 ? (
                          props.purchaseList.map((item, index) => (
                            <tr
                              key={index++}
                              onClick={(e) => {
                                e.preventDefault();
                                props.setPurchase(item);
                              }}
                              className={`text-center ${
                                (
                                  props.purchase
                                    ? props.purchase.id === item.id
                                    : ""
                                )
                                  ? "bg-selected"
                                  : ""
                              }`}
                            >
                              <td className="nowrap text-center">
                                {meta.from ? index + meta.from : ""}
                              </td>

                              <td className="nowrap text-center">
                                {item.invoice_date}
                              </td>

                              <td className="nowrap text-center">
                                {item.invoice_number}
                              </td>

                              <td className="nowrap text-center">
                                ৳ {parseFloat(item.grand_total).toFixed(2)}
                              </td>

                              <td className="nowrap text-center">
                                {item.supplier}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-center" colSpan={5}>
                              No Purchase Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Loader>
                </div>
              </div>
            </div>
          </div>

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
                  setPage(pageNumber.selected + 1);
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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchaseList: (purchaseList) =>
      dispatch({ type: SET_PURCHASE_LIST, payload: { purchaseList } }),
    setPurchase: (purchase) =>
      dispatch({ type: SET_PURCHASE, payload: { purchase } }),
  };
};

const mapStateToProps = (store) => {
  const { purchaseList, purchase } = store.purchaseListStore;
  return { purchaseList, purchase };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseList);
