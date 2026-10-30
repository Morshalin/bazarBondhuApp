import React from "react";
import { SALE_MODE } from "../../../Helpers/Sales/SalesConstant";

const SaleListHeader = (props) => {
  return (
    <>
      <tr>
        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("id");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
                        ${
                          props.column === "id" && props.orderBy === "ASC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                        ${
                          props.column === "id" && props.orderBy === "DESC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          SL
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("order_number");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1 
                        ${
                          props.column === "order_number" &&
                          props.orderBy === "ASC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                        ${
                          props.column === "order_number" &&
                          props.orderBy === "DESC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          Invoice
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("grand_total");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1 
                        ${
                          props.column === "grand_total" &&
                          props.orderBy === "ASC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                        ${
                          props.column === "grand_total" &&
                          props.orderBy === "DESC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          Total
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("payment_status");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1 
                        ${
                          props.column === "payment_status" &&
                          props.orderBy === "ASC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                        ${
                          props.column === "payment_status" &&
                          props.orderBy === "DESC"
                            ? `text-primary`
                            : `d-none`
                        }`}
          ></i>
          Payment Status
        </th>

        <th>Customer Name</th>
        <th>Cell Phone</th>
        <th>Order Status</th>

        {props?.saleMode !== SALE_MODE.POS && <th>Actions</th>}
      </tr>
    </>
  );
};

export default SaleListHeader;
