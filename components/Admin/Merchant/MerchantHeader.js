import React, { memo, useState, useEffect } from "react";

const MerchantHeader = memo((props) => {
  const { getMerchantHeaderData } = props;
  console.log("marchent header");

  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");

  const headerChangeHandler = (headerId) => {
    setColumn(headerId);
    setOrderBy((prevState) => (prevState === "DESC" ? "ASC" : "DESC"));
  };

  useEffect(() => {
    getMerchantHeaderData(column, orderBy);
  }, [column, orderBy, getMerchantHeaderData]);

  return (
    <>
      <tr>
        <th onClick={() => headerChangeHandler("id")} scope="col">
          <i
            className={` mr-1
                        ${column === "id" ? `text-primary` : `d-none`} ${
              orderBy === "ASC"
                ? `icon-long-arrow-alt-down-solid`
                : `icon-long-arrow-alt-up-solid`
            }`}
          ></i>
          SL
        </th>
        <th onClick={() => headerChangeHandler("name")} scope="col">
          <i
            className={` mr-1
                        ${column === "name" ? `text-primary` : `d-none`} ${
              orderBy === "ASC"
                ? `icon-long-arrow-alt-down-solid`
                : `icon-long-arrow-alt-up-solid`
            }`}
          ></i>
          Shop Name
        </th>
        <th scope="col">Shop Owner</th>
        <th scope="col">Mobile</th>
        <th scope="col">Address</th>
        {/* <th scope="col">Contact Infos</th> */}
        {/* <th scope="col">Commission Rate</th> */}

        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </>
  );
});

export default MerchantHeader;
