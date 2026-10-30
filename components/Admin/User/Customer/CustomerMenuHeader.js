import React from "react";

const AreaHeader = (props) => {
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
            props.setColumn("name");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
                       ${
                         props.column === "first_name" &&
                         props.orderBy === "ASC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                       ${
                         props.column === "first_name" &&
                         props.orderBy === "DESC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          Name
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("mobile");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
                       ${
                         props.column === "phone" && props.orderBy === "ASC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                       ${
                         props.column === "phone" && props.orderBy === "DESC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          Mobile
        </th>

        <th scope="col">
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
                       ${
                         props.column === "wallet_balance" &&
                         props.orderBy === "ASC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                       ${
                         props.column === "wallet_balance" &&
                         props.orderBy === "DESC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          Balance Status
        </th>

        <th
          onClick={(e) => {
            e.preventDefault();
            props.setColumn("active");
            props.setOrderBy(props.orderBy === "ASC" ? "DESC" : "ASC");
          }}
          scope="col"
        >
          <i
            className={`icon-long-arrow-alt-down-solid mr-1
                       ${
                         props.column === "status" && props.orderBy === "ASC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          <i
            className={`icon-long-arrow-alt-up-solid mr-1 
                       ${
                         props.column === "status" && props.orderBy === "DESC"
                           ? `text-primary`
                           : `d-none`
                       }`}
          ></i>
          Status
        </th>
        {/* <th scope="col">Action</th> */}
      </tr>
    </>
  );
};

export default AreaHeader;
