import React, { memo, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
import {
  DELETE,
  deleteAction,
  ERROR,
  getAllData,
  options,
  STATUS,
  statusChange,
  SUCCESS,
  updateAction,
} from "../../../Helpers/Utils/Utils";
// import ModuleActions from "./ModuleActions";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import MerchantHeader from "./MerchantHeader";
import ModuleActions from "../Module/List/ModuleActions";
import MerchantActions from "./MerchantActions";

// import ModuleHeader from "./ModuleHeader";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MerchantList = memo((props) => {
  console.log("marchent List");
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(10);

  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");

  const [keywords, setKeywords] = useState("");

  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);

  const [shops, setShops] = useState([]);

  const [statusUpdate, setStatusUpdate] = useState(false);
  const statusUpdateHandler = useCallback(() => {
    setStatusUpdate((prevState) => !prevState);
  }, []);

  const tablePaginationHandler = (event) => {
    setMeta("");
    setShow(event.target.value);
    setPage(1);
  };

  const searchHandler = (event) => {
    setTimeout(() => {
      setMeta("");
      setKeywords(event.target.value);
      setPage(1);
    }, 2000);
  };

  const getMerchantHeaderDataHandler = useCallback((column, orderBy) => {
    setColumn(column);
    setOrderBy(orderBy);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    getAllData(
      `backend/shop?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
      true
    ).then(({ data }) => {
      if (data) {
        // console.log(data);
        setIsLoaded(true);
        setMeta(data.meta);
        setShops(data.data);
      }
    });
  }, [show, keywords, page, column, orderBy, statusUpdate]);

  // const actionsMerchant = useCallback((actions, data = null) => {
  //   let { type, payload } = actions;
  //   switch (type) {
  //     case DELETE: {
  //       deleteAction(`backend/modules/${props.moduleList[payload.index].id}`)
  //         .then((result) =>
  //           result.success
  //             ? props.removeModule(props.moduleList[payload.index].id) &&
  //               props.setMessage(SUCCESS, result.message)
  //             : props.setMessage(ERROR, result.message)
  //         )
  //         .finally(() => resetChanges());

  //       break;
  //     }

  //     case STATUS: {
  //       updateAction(`backend/shops/${id}`, data)
  //         .then((result) =>
  //           result.success
  //             ? props.changeModule(result.data) &&
  //               props.setMessage(SUCCESS, result.message)
  //             : props.setMessage(ERROR, result.message)
  //         )
  //         .finally(() => resetChanges());

  //       break;
  //     }

  //     default:
  //       break;
  //   }
  // }, []);

  // const resetChanges = () => {
  //   setTimeout(() => {
  //     props.resetMessage();
  //   }, 3000);
  // };
  // console.log(shops);
  return (
    <>
      {/*{props.message.success && <Success message={props.message.success}/>}*/}
      {/*{props.message.error && <Error message={props.message.error}/>}*/}
      <div className="col-md-12">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2>Merchant List</h2>
              <Link legacyBehavior href={"/admin/merchant/add"}>
                <a className="fbh-btn" title="Add Module">
                  <i className="icon-plus-square-regular"></i>
                </a>
              </Link>
            </div>
          </div>

          <div className="custom-card-box-content p-md-3 p-2">
            <div className="row table-top-option mb-md-3 mb-2">
              <div className="col-6">
                <div className="showing-table-row">
                  <label className="">Show</label>
                  <select
                    className="custom-select"
                    defaultValue={`10`}
                    onChange={tablePaginationHandler}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="table-search">
                  <label className="">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here ..."
                    onChange={searchHandler}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive custom-table custom-hight-500">
                  <Loader
                    loaded={isLoaded}
                    options={options}
                    className="spinner"
                  >
                    <table className="table table-bordered table-hover mb-0 carsour-pointer">
                      <thead className="thead-light">
                        <MerchantHeader
                          getMerchantHeaderData={getMerchantHeaderDataHandler}
                        />
                      </thead>
                      <tbody>
                        {shops?.map((shop, index) => (
                          <tr
                            key={index}
                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     props.setModule(module);
                            // }}

                            // className={`text-center ${(shop ? props.module.id === module.id : '') ? 'bg-warning' : ''}`}
                          >
                            <td className="nowrap text-center ">
                              {meta.from ? index + meta.from : ""}
                            </td>

                            <td className="nowrap text-center">{shop?.name}</td>
                            <td className="nowrap text-center">
                              {shop?.shop_owner}
                            </td>
                            <td className="text-center text-nowrap">
                              {shop?.mobile}
                            </td>
                            <td className="text-center text-nowrap">
                              {shop?.address}
                            </td>
                            {/* <td className="text-center text-nowrap">
                              {shop?.contact_infos}
                            </td> */}

                            {/* <td className="text-center text-nowrap">
                              {shop?.commission_rate ?? 0} %
                            </td> */}

                            <td className="text-center">
                              {capitalizeFirstLetter(shop?.status ?? "null")}
                            </td>
                            <td className="text-center">
                              <MerchantActions
                                shop={shop}
                                statusUpdate={statusUpdateHandler}
                                // shopIndex={index}
                                // actions={actionsMerchant}
                              />
                            </td>
                          </tr>
                        ))}
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
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
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
});

export default MerchantList;
