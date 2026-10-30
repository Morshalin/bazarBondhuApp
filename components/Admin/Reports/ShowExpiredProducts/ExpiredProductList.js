import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { getActions, options } from "../../../../Helpers/Utils/Utils";
import Loader from "react-loader";
import {
  SET_EXPIRED_PRODUCT_LIST,
  SET_PURCHASE_PRODUCT_HISTORY,
} from "../../../../store/admin/actions/expiredProduct/expiredProductListAction";
import ExpiredProductListHeader from "./ExpiredProductListHeader";
import ExpiredProductReturnModal from "./ExpiredProductReturnModal";

const ExpiredProductList = (props) => {
  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState("");
  const [meta, setMeta] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    getActions(
      `backend/expired-products?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
      true
    )
      .then((res) => {
        /* res.map((data) => {
          console.log(data.shop_id);
        }); */

        if (mounted && res) {
          setMeta(res.meta);
          //console.log(res.data);
          props.setExpiredProductList(res.data);
        }
      })
      .finally(() => (mounted = false));
  }, [show, keywords, page, column, orderBy]);

  const removeFromList = (product_id) => {
    let response = axios
      .post(`backend/remove-from-expired-list`, { product_id })
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        return err;
      });

    if (response.success) {
    }
  };

  return (
    <>
      <div className="col-md-7 mb-3">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2>Expired Product List</h2>
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
              <div className="col-6">
                <div className="table-search">
                  <label className="">Search</label>

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
                  <Loader
                    loaded={!!props.expiredProductList}
                    options={options}
                    className="spinner"
                  >
                    <table className="table table-bordered table-hover mb-3 carsour-pointer">
                      <thead className="thead-light">
                        <ExpiredProductListHeader
                          setColumn={setColumn}
                          setOrderBy={setOrderBy}
                          column={column}
                          orderBy={orderBy}
                        />
                      </thead>
                      <tbody>
                        {props.expiredProductList &&
                        props.expiredProductList.length > 0 ? (
                          props.expiredProductList.map((item, index) => (
                            <tr
                              key={item.id}
                              onClick={(e) => {
                                e.preventDefault();
                                props.setPurchaseProductHistory(item);
                              }}
                              className={`text-center ${
                                props.purchaseProductHistory.id === item.id
                                  ? `bg-selected`
                                  : ``
                              }`}
                            >
                              <td className="nowrap text-center ">
                                {meta.from ? index + meta.from : ""}
                              </td>

                              <td className="nowrap text-center">
                                <img src={item.feature_image} />
                              </td>

                              <td className="nowrap text-center">
                                {item.name ?? "-"}
                              </td>

                              <td className="text-center text-nowrap">
                                {item.purchase_qty}
                              </td>
                              <td className="text-center">
                                {item.selling_qty ?? "-"}
                              </td>
                              <td className="text-center">
                                {console.log(item)}
                                {item.product_purchase.purchase_quantity -
                                  item.product_purchase.sale_quantity}
                              </td>
                              <td className="text-center">
                                {item.purchase_price}
                              </td>
                              <td className="text-center">
                                {item.selling_price}
                              </td>

                              {/*<td className="text-center">*/}
                              {/*    <div className="dropdown action-btn-group">*/}
                              {/*        <button*/}
                              {/*            className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"*/}
                              {/*            type="button"*/}
                              {/*            data-toggle="dropdown"*/}
                              {/*            aria-haspopup="true"*/}
                              {/*            aria-expanded="false"*/}
                              {/*            id={`action_button_${item.id}`}>*/}
                              {/*            Actions*/}
                              {/*        </button>*/}
                              {/*        <div className="dropdown-menu">*/}
                              {/*            <button*/}
                              {/*                className="dropdown-item"*/}
                              {/*                onClick={(event) => {*/}
                              {/*                    event.preventDefault();*/}
                              {/*                    removeFromList(item.id);*/}
                              {/*                }}>*/}
                              {/*                <i className="icon-trash-alt-regular text-danger"/>*/}
                              {/*                Remove From Shelf*/}
                              {/*            </button>*/}
                              {/*            <button*/}
                              {/*                className="dropdown-item"*/}
                              {/*                onClick={(event) => {*/}
                              {/*                    event.preventDefault();*/}
                              {/*                    removeFromList(item.id);*/}
                              {/*                }}>*/}
                              {/*                <i className="icon-trash-alt-regular text-danger"/>*/}
                              {/*                Damage*/}
                              {/*            </button>*/}
                              {/*            <button*/}
                              {/*                className="dropdown-item"*/}
                              {/*                onClick={(event) => {*/}
                              {/*                    event.preventDefault();*/}
                              {/*                    removeFromList(item.id);*/}
                              {/*                }}>*/}
                              {/*                <i className="icon-trash-alt-regular text-danger"/>*/}
                              {/*                Purchase Return*/}
                              {/*            </button>*/}
                              {/*            <button*/}
                              {/*                className="dropdown-item"*/}
                              {/*                onClick={(event) => {*/}
                              {/*                    event.preventDefault();*/}
                              {/*                    removeFromList(item.id);*/}
                              {/*                }}>*/}
                              {/*                <i className="icon-trash-alt-regular text-danger"/>*/}
                              {/*                Use/Gift*/}
                              {/*            </button>*/}
                              {/*            <div className="dropdown-divider"/>*/}
                              {/*        </div>*/}
                              {/*    </div>*/}
                              {/*</td>*/}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No Expired Product Found
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

      <ExpiredProductReturnModal />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setExpiredProductList: (expiredProductList) =>
      dispatch({
        type: SET_EXPIRED_PRODUCT_LIST,
        payload: { expiredProductList },
      }),
    setPurchaseProductHistory: (purchaseProductHistory) =>
      dispatch({
        type: SET_PURCHASE_PRODUCT_HISTORY,
        payload: { purchaseProductHistory },
      }),
  };
};

const mapStateToProps = (store) => {
  const { expiredProductList, purchaseProductHistory } =
    store.expiredProductListStore;

  return { expiredProductList, purchaseProductHistory };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredProductList);
