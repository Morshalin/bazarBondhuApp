import AdminHeader from "../../components/Admin/Header/AdminHeader";
import React from "react";
import LayoutBlank from "../../components/Admin/Layout/LayoutBlank";
import Invoice from "../../components/Admin/Pos/Invoice";

const POS = (props) => {
  return (
    <>
      <AdminHeader>{`POS | ${process.env.app_name}`}</AdminHeader>

      <LayoutBlank>
        <Invoice />
      </LayoutBlank>
    </>
  );
};

export default POS;
