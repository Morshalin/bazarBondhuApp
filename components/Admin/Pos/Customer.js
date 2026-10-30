import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  POS_SET_CUSTOMER,
  SET_ECOMMERCE_INFORMATION,
  SET_ORDER_DATE,
  SET_ORDER_NUMBER,
  SET_POS_SHIPPING,
} from "../../../store/pos/actions/posCartActions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Select from "react-select";
import AddCustomerModal from "../../../pages/admin/customer/AddCustomerModal";

const Customer = (props) => {
  const router = useRouter();

  const orderNumber = router.query?.order_number ?? null;

  const initialSelect = {
    value: "",
    label: "",
  };

  const [customers, setCustomers] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  const [walkInCustomer, setWalkInCustomer] = useState(initialSelect);

  const [selectedCustomer, setSelectedCustomer] = useState(initialSelect);

  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!orderNumber && !props.posCart.user_id && walkInCustomer.value) {
      setSelectedCustomer(walkInCustomer);
      props.setCustomer(walkInCustomer.value, 0);
      // setSearchOrder("");
    }
  }, [props.posCart.user_id]);

  // for walk in customer

  useEffect(() => {
    let mounted = true;
    if (mounted && !orderNumber) {
      getWalkInCustomer();
    }
    return () => (mounted = false);
  }, []);

  const getWalkInCustomer = () => {
    setIsLoading(true);
    axios
      .post(`backend/get-customers`, {
        keyword: "Walk In Customer",
      })
      .then((res) => {
        // console.log(["res", res]);
        if (res.data.success) {
          let customerFilterData = res.data.data.map(({ id, name, phone }) => {
            let phone_number = "";
            phone && (phone_number = " (" + phone + ")");
            return {
              value: id,
              label: name + phone_number,
            };
          });

          setCustomers(customerFilterData);
          setSelectedCustomer(...customerFilterData);
          setWalkInCustomer(...customerFilterData);
          setCustomersData(res.data.data);
          props.setCustomer(customerFilterData[0].value, 0);
          setIsLoading(false);
        } else {
          // setCustomers([]);
          // setSelectedCustomer(initialSelect);
          // setWalkInCustomer(initialSelect);
          // setCustomersData([]);
          props.setCustomer("", 0);
          setIsLoading(false);
        }
      });
  };

  // for user search

  const [searchKeywords, setSearchKeywords] = useState("");

  const searchCustomerHandler = (searchKeywords) => {
    const keyWords = searchKeywords ? searchKeywords.trim() : "";
    setSearchKeywords(keyWords);
  };

  const changeCustomerHandler = (customer) => {
    if (customer) {
      const result = customersData.find(({ id }) => id === customer.value);
      props.setCustomer(customer.value, result.wallet_balance);
      setSelectedCustomer(customer);
    } else {
      // setCustomers([]);
      // setSelectedCustomer(initialSelect);
      // setCustomersData([]);
      setSearchOrder("");
      props.setOrderDate("");
      props.setCustomer("", 0);
    }
  };

  useEffect(() => {
    let timerId;
    if (searchKeywords) {
      timerId = setTimeout(() => {
        getSearchCustomer(searchKeywords);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [searchKeywords]);

  const getSearchCustomer = (keyWords) => {
    setIsLoading(true);
    axios
      .post(`backend/get-customers`, {
        keyword: keyWords,
      })
      .then((res) => {
        // console.log(["res", res]);
        if (res.data.success) {
          if (Object.keys(res.data.data).length !== 0) {
            const customerFilterData = res.data.data.map(
              ({ id, name, phone }) => {
                let phone_number = "";
                phone && (phone_number = " (" + phone + ")");
                return {
                  value: id,
                  label: name + phone_number,
                };
              }
            );
            setCustomers(customerFilterData);
            // setSelectedCustomer(...customerFilterData);
            setCustomersData(res.data.data);

            setIsLoading(false);
          } else {
            // setCustomers([]);
            // setSelectedCustomer(initialSelect);
            // setCustomersData([]);

            setIsLoading(false);
          }
        } else {
          // setCustomers([]);
          // setSelectedCustomer(initialSelect);
          // setCustomersData([]);

          setIsLoading(false);
        }
      });
  };

  // for sale order

  useEffect(() => {
    // if (!orderNumber && !props.posCart.order_number) {
    //   setSearchOrder("");
    // }
    if (orderNumber && !props.posCart.order_number) {
      getSaleOrder(orderNumber);
    }
  }, [props.posCart.order_number]);

  useEffect(() => {
    let mounted = true;
    if (mounted && orderNumber) {
      getSaleOrder(orderNumber);
    }
    return () => (mounted = false);
  }, []);

  const [searchOrder, setSearchOrder] = useState("");

  const searchOrderHandler = (orderKeyWords) => {
    const keyWords = orderKeyWords ? orderKeyWords.trim() : "";
    // props.setOrderNumber(keyWords);
    setSearchOrder(keyWords);
  };

  useEffect(() => {
    let timerId;
    if (searchOrder) {
      timerId = setTimeout(() => {
        getSaleOrder(searchOrder);
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [searchOrder]);

  const getSaleOrder = (orderNumberKey) => {
    setIsLoading(true);
    axios
      .post(`backend/get-order-info`, {
        order_number: orderNumberKey,
      })
      .then((res) => {
        // console.log(["res", res]);
        if (res.data.success) {
          if (res.data.data.length !== 0) {
            setIsLoading(false);
            props.setOrderNumber(orderNumberKey);
            setSearchOrder(orderNumberKey);
            props.setOrderDate(res.data.data.order_date);

            let phone_number = "";
            res.data.customer_phone &&
              (phone_number = " (" + res.data.data.customer_phone + ")");
            const customerFilterData = {
              value: res.data.data.customer_id,
              label: res.data.data.customer_name + phone_number,
            };
            setSelectedCustomer(customerFilterData);
            props.setCustomer(
              res.data.data.customer_id,
              res.data.data.wallet_balance
            );
            props.setEcommerceInfo(res.data.data);
            props.setDeliveryCharge(res.data.data.delivery_charge);
          } else {
            // props.setOrderNumber("");
            props.setOrderDate("");
            props.setCustomer("", 0);
            setSelectedCustomer(initialSelect);
            props.setEcommerceInfo("");
            props.setDeliveryCharge(0);
            setIsLoading(false);
          }
        } else {
          // props.setOrderNumber("");
          props.setOrderDate("");
          props.setCustomer("", 0);
          setSelectedCustomer(initialSelect);
          props.setEcommerceInfo("");
          props.setDeliveryCharge(0);
          setIsLoading(false);
        }
      });
  };

  // console.log(walkInCustomer);
  // console.log(selectedCustomer);
  // console.log(orderNumber);
  // console.log(props);
  return (
    <>
      <div className="pos-form-top">
        <div className="row">
          {orderNumber && (
            <div className="col-md-6">
              <div className="form-group">
                <input
                  id="search_order"
                  type="text"
                  className="form-control mr-1"
                  placeholder="e-commerce order no."
                  value={searchOrder}
                  onChange={(event) => {
                    searchOrderHandler(event.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className={`${orderNumber ? "col-md-6" : "col-md-12"}`}>
            <div className="form-group">
              <input
                id="date"
                type="date"
                value={
                  props.posCart.order_date
                    ? props.posCart.order_date.slice(0, 10)
                    : ""
                }
                onChange={(event) => {
                  props.setOrderDate(event.target.value);
                }}
                className="form-control ml-1"
                disabled
              />
            </div>
          </div>
        </div>

        <div className="input-group">
          <Select
            className="pos-customer-select p-0"
            instanceId="customer"
            value={selectedCustomer}
            // closeMenuOnSelect={true}
            onChange={(selectedOption) => {
              console.log(["onChange", selectedOption]);
              changeCustomerHandler(selectedOption);
            }}
            onInputChange={(selectedOption) => {
              console.log(["onInputChange", selectedOption]);
              searchCustomerHandler(selectedOption);
            }}
            options={customers}
            // inputValue={searchKeywords}
            // autoFocus={false}
            isClearable={!orderNumber ? true : false}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />

          <div className="input-group-append" id="button-addon4">
            <a
              className="btn btn-outline-secondary rounded-left"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setIsDisabled((prevState) => !prevState);
              }}
            >
              <i className="icon-edit-solid" />
            </a>
            {/*<div className="input-group-append">*/}
            {/*    <button className="btn btn-outline-secondary" type="button">*/}
            {/*        <i className="icon-eye-solid"/>*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className="input-group-append">
              {/*<Link href="/admin/customer/add">*/}
              {/*    <a className="btn btn-outline-secondary rounded-left">*/}
              {/*        <i className="icon-plus-circle-solid"/>*/}
              {/*    </a>*/}
              {/*</Link>*/}
              <button
                onClick={() => {}}
                className="input-group-text"
                data-toggle="modal"
                data-target="#add_customer_modal"
                type="button"
              >
                <i className="icon-plus-square-regular" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddCustomerModal
        setSelectedCustomer={setSelectedCustomer}
        setCustomer={props.setCustomer}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCustomer: (user_id, wallet_balance) =>
      dispatch({
        type: POS_SET_CUSTOMER,
        payload: { user_id, wallet_balance },
      }),
    setOrderNumber: (order_number) =>
      dispatch({ type: SET_ORDER_NUMBER, payload: { order_number } }),
    setEcommerceInfo: (orderInformation) =>
      dispatch({
        type: SET_ECOMMERCE_INFORMATION,
        payload: { orderInformation },
      }),
    setOrderDate: (order_date) =>
      dispatch({ type: SET_ORDER_DATE, payload: { order_date } }),
    setDeliveryCharge: (delivery_charge) =>
      dispatch({ type: SET_POS_SHIPPING, payload: { delivery_charge } }),
  };
};
const mapStateToProps = (store) => {
  const posCart = store.posCart;

  return { posCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
