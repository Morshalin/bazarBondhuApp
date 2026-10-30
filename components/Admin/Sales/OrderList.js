import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "react-loader";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { getActions, options } from "../../../Helpers/Utils/Utils";
import {
  SET_SALE,
  SET_SALE_LIST,
  UPDATE_SALE,
} from "../../../store/admin/actions/sale/saleListAction";
import {
  POS_CHECKOUT,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_NOTE,
  SET_POS_ACCOUNT_ID,
  POS_SET_CUSTOMER,
} from "../../../store/pos/actions/posCartActions";
import SelectField from "../../Ui/Form/SelectField";
import SaleListHeader from "./SaleListHeader";
import ReactPlaceholder from "../../../components/Ui/placeholder/placeholder";
import OrderListActions from "./OrderListActions";
import MySucces from "../Notification/MySuccess";
import {
  SALE_MODE,
  SALE_TYPE,
  PAYMENT_STATUS,
} from "../../../Helpers/Sales/SalesConstant";
import { ACTION_MENU } from "../../../Helpers/ActionMenu/ActionMenuConstant";
import SalePaymentModal from "./SalePaymentModal";
import { objectToStringConverter } from "../../../Helpers/Utils/ObjectToStringConverter";
import { PAYMENT_METHODS } from "../../../Helpers/Pos/PaymentMethodsConstant";

const SALE_ACTION = Object.freeze({
  PAYMENT: "Payment",
  DUE: "Due",
  RETURN: "Return",
  CANCEL: "Cancel",
});

const OrderList = (props) => {
  const saleType = props.saleType;

  const [show, setShow] = useState(10);
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const [keywords, setKeywords] = useState();
  const [meta, setMeta] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchType, setSearchType] = useState();
  const [page, setPage] = useState(1);
  const [isSearchable, setIsSearchable] = useState(true);
  const [orderStatus, setOrderStatus] = useState();

  const [selectSearchFieldOptions, setSelectSearchFieldOptions] = useState([
    { name: "Customer", value: "customer" },
    { name: "Product", value: "product" },
  ]);

  //search FilterOptions
  let selectFilterOptions = [
    { name: "All", value: "all" },
    { name: "Shipped", value: ACTION_MENU.SHIPPED },
    { name: "Delivered", value: ACTION_MENU.DELIVERED },
    { name: "Completed", value: ACTION_MENU.COMPLETED },
    { name: "Return", value: ACTION_MENU.RETURN },
  ];

  if (props?.saleMode === SALE_MODE.ORDERS) {
    selectFilterOptions = [
      { name: "All", value: "all" },
      { name: "Placed", value: ACTION_MENU.PLACED },
      { name: "Processing", value: ACTION_MENU.PROCESSING },
      { name: "Cancel", value: ACTION_MENU.CANCEL },
    ];
  }

  // status
  let filterOrderStatus = [
    ACTION_MENU.SHIPPED,
    ACTION_MENU.DELIVERED,
    ACTION_MENU.COMPLETED,
    ACTION_MENU.RETURN,
  ];

  if (props?.saleMode === SALE_MODE.ORDERS) {
    filterOrderStatus = [
      ACTION_MENU.PLACED,
      ACTION_MENU.PROCESSING,
      ACTION_MENU.CANCEL,
    ];
  }

  if (props?.saleMode === SALE_MODE.POS) {
    filterOrderStatus = [ACTION_MENU.COMPLETED];
  }

  const dateChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "start_date") {
      setStartDate(`${value} 00:00:00`);
    } else {
      setEndDate(`${value} 23:59:59`);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);

    const params = {
      params: {
        page: page,
        show: show,
        column: column,
        keywords: keywords,
        orderBy: orderBy,
        saleType: saleType,
        startDate: startDate,
        endDate: endDate,
        searchType: searchType,
        orderStatus: orderStatus ?? filterOrderStatus,
      },
    };

    axios.get("backend/sales", params).then((res) => {
      // console.log(res.data.data);
      if (res.data.success) {
        setMeta(res.data.data.meta);
        props.setSaleList(res.data.data.data);
        setIsLoading(true);
      }
    });
  }, [
    show,
    keywords,
    page,
    column,
    orderBy,
    saleType,
    startDate,
    endDate,
    orderStatus,
  ]);

  function searchTypeHandler(e) {
    setSearchType(e.target.value);
    setIsSearchable(false);
  }

  function filterHandler(event) {
    const { value } = event.target;

    if (value === "all") {
      setOrderStatus(filterOrderStatus);
    } else {
      setOrderStatus([value]);
    }
  }

  // actions

  const [menuList, setMenuList] = useState([
    { id: 1, name: SALE_ACTION.PAYMENT },
    { id: 2, name: SALE_ACTION.DUE },
    { id: 3, name: SALE_ACTION.RETURN },
  ]);

  useEffect(() => {
    if (props?.saleMode === SALE_MODE.ORDERS) {
      setMenuList([{ id: 1, name: SALE_ACTION.CANCEL }]);
    }
  }, [props?.saleMode]);

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const resetSuccesMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  // useEffect(async () => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     axios.get(`/backend/get-all-action-menus`).then((response) => {
  //       console.log(response);
  //       if (response.data.success) {
  //         const menuList = response.data.data.filter((filterItem) =>
  //           actionStatus.some((item) => item.name === filterItem.name)
  //         );

  //         // const menuSortedList = menuList.sort(
  //         //   (a, b) => a.sort_order - b.sort_order
  //         // );

  //         setMenuList(menuList);
  //       }
  //     });
  //   }
  //   return () => (isMounted = false);
  // }, []);

  const submitPaymentHandler = (args) => {
    const From_Data = new FormData();
    From_Data.append("sale_id", args.sale_id);
    // leger
    From_Data.append("payment_method", args.payment_method);
    From_Data.append("user_id", args.user_id);
    From_Data.append("account_id", args.account_id);
    // change
    From_Data.append("order_status", args.order_status);
    From_Data.append("pos_amount", args.pos_amount);

    const url = `/backend/sales/update-order-processing-history`;

    axios.post(url, From_Data).then((res) => {
      console.log(res);

      if (res.data.success) {
        props.updateSale(res.data.data);

        closeModalHandler();

        setSuccessMessage({
          ...successMessage,
          status: true,
          message: res.data.message,
        });
      } else {
        closeModalHandler();
      }
    });
  };

  const [actionMenu, setActionMenu] = useState();

  useEffect(() => {
    if (actionMenu && actionMenu.name === SALE_ACTION.DUE) {
      submitPaymentHandler({
        sale_id: props.sale.id,
        payment_method: PAYMENT_METHODS.CARD,
        user_id: props.sale.customer_id,
        account_id: props.posCart.account_id,
        order_status: ACTION_MENU.COMPLETED,
        pos_amount: 0,
      });
    } else if (actionMenu && actionMenu.name === SALE_ACTION.RETURN) {
      submitPaymentHandler({
        sale_id: props.sale.id,
        order_status: ACTION_MENU.RETURN,
      });
    } else if (actionMenu && actionMenu.name === SALE_ACTION.CANCEL) {
      submitPaymentHandler({
        sale_id: props.sale.id,
        order_status: ACTION_MENU.CANCEL,
      });
    }
  }, [actionMenu]);

  const actionHandler = (event, action) => {
    event.preventDefault();

    setActionMenu(action);

    setTimeout(() => {
      $("#sale_payment_modal").modal("show");
    }, 500);
  };

  const [accountOptions, setAccountOptions] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      axios.get(`backend/accounts/bank/account/list`).then((response) => {
        // console.log(response);
        if (response.data.success) {
          setAccountOptions(
            response.data.data.data.map((item) => ({
              value: +item.id,
              label: item.name,
              default: item.default,
            }))
          );
        }
      });
    }
    return () => (mounted = false);
  }, []);

  const closeModalHandler = () => {
    $("#sale_payment_modal").modal("hide");

    setTimeout(() => {
      setActionMenu(null);
      props.posCheckOut();
    }, 500);
  };

  // console.log(actionMenu);
  // console.log(filterOrderStatus);
  // console.log(menuList);
  // console.log(endDate);
  // console.log(["Orders", props]);
  return (
    <>
      {successMessage.status && (
        <MySucces
          message={successMessage.message}
          resetSuccesMessage={resetSuccesMessage}
        />
      )}

      <div className="col-md-7 mb-3">
        <div className="custom-card-box">
          <div className="custom-card-box-header">
            {/* <div className='fbh-title'>
                            <i className='icon-list2'/>
                            <h2>{props.saleType} Order List</h2>
                        </div> */}
            <div className="fbh-title">
              <i className="icon-list2" />
              <h2 className="ml-2">Sales List</h2>

              {/* <Link href={'/admin/purchase/add'}>
                                <a className='fbh-btn' title='Add Purchase'>
                                    <i className='icon-plus-square-regular'></i>
                                </a>
                            </Link> */}
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
                      name={"start_date"}
                      value={
                        startDate
                          ? startDate.slice(0, 10)
                          : new Date().toISOString().slice(0, 10)
                      }
                      className="form-control ml-2"
                      style={{ width: "175px" }}
                      onChange={dateChangeHandler}
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
                      name={"end_date"}
                      value={
                        endDate
                          ? endDate.slice(0, 10)
                          : new Date().toISOString().slice(0, 10)
                      }
                      className="form-control ml-2"
                      style={{ width: "175px" }}
                      onChange={dateChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row  table-top-option mb-md-3 mb-2 align-items-center">
              <div className="col">
                <div className="row no-gutters align-items-center">
                  <div className="col-4 mb-2">
                    <label>Search By</label>
                  </div>
                  <div className="col-8">
                    <SelectField
                      options={selectSearchFieldOptions}
                      onChange={searchTypeHandler}
                      name="search_type"
                      value={searchType}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Search here ..."
                    disabled={isSearchable}
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
            <div className="row  table-top-option mb-md-3 mb-2 justify-content-between">
              <div className="col">
                <div className="showing-table-row">
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

              {props?.saleMode !== SALE_MODE.POS && (
                <React.Fragment>
                  <div className="col">
                    <div className="row no-gutters align-items-center">
                      <div className="col-3 mb-2">
                        <label>Filter By</label>
                      </div>
                      <div className="col-9">
                        <SelectField
                          options={selectFilterOptions}
                          onChange={filterHandler}
                          name="filter_by"
                          value={orderStatus}
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive custom-table custom-hight-500">
                  <table className="table table-bordered table-hover mb-0 carsour-pointer">
                    <thead className="thead-light">
                      <SaleListHeader
                        setColumn={setColumn}
                        setOrderBy={setOrderBy}
                        column={column}
                        orderBy={orderBy}
                        saleMode={props.saleMode}
                      />
                    </thead>
                    <tbody>
                      {!isLoading ? (
                        <tr>
                          <td colSpan={8}>
                            <ReactPlaceholder
                              showLoadingAnimation={true}
                              type={"textRow"}
                              rows={show}
                              ready={isLoading}
                              className="my-2"
                              style={{ height: "24px" }}
                            />
                          </td>
                        </tr>
                      ) : props.saleList && props.saleList.length > 0 ? (
                        props.saleList.map((item, index) => (
                          <tr
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              props.setSale(item);
                            }}
                            className={`text-center ${
                              (props.sale ? props.sale.id === item.id : "")
                                ? "bg-selected"
                                : ""
                            }`}
                          >
                            <td className="nowrap text-center ">
                              {meta && meta.from ? index + meta.from : ""}
                            </td>

                            <td className="nowrap text-center">
                              {item.order_number}
                            </td>

                            <td className="nowrap text-center">
                              ৳ {item.grand_total.toFixed(2)}
                            </td>

                            <td className="text-center ">
                              {objectToStringConverter(
                                PAYMENT_STATUS,

                                item.payment_status
                              )}
                            </td>
                            <td className="text-center">
                              {item.customer_name}
                            </td>
                            <td className="text-center">
                              {item.customer_phone}
                            </td>
                            <td className="text-center">
                              {objectToStringConverter(
                                ACTION_MENU,
                                item.order_status
                              )}
                            </td>
                            {props?.saleMode !== SALE_MODE.POS && (
                              <td className="text-center">
                                {ACTION_MENU.COMPLETED.toString() !==
                                  item.order_status.toString() &&
                                  ACTION_MENU.RETURN.toString() !==
                                    item.order_status.toString() &&
                                  ACTION_MENU.CANCEL.toString() !==
                                    item.order_status.toString() && (
                                    <OrderListActions
                                      menuList={menuList}
                                      actionHandler={actionHandler}
                                      saleMode={props.saleMode}
                                    />
                                  )}
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No Order Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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

      {actionMenu?.name === "Payment" && (
        <SalePaymentModal
          accountOptions={accountOptions}
          closeModalHandler={closeModalHandler}
          submitPaymentHandler={submitPaymentHandler}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSaleList: (saleList) =>
      dispatch({ type: SET_SALE_LIST, payload: { saleList } }),
    setSale: (sale) => dispatch({ type: SET_SALE, payload: { sale } }),
    setPaymentAccountId: (account_id) =>
      dispatch({ type: SET_POS_ACCOUNT_ID, payload: { account_id } }),

    posCheckOut: () => dispatch({ type: POS_CHECKOUT }),
    updateSale: (sale) => dispatch({ type: UPDATE_SALE, payload: { sale } }),
  };
};

const mapStateToProps = (store) => {
  const posCart = store.posCart;
  const { saleList, sale } = store.saleListStore;

  return { saleList, sale, posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
