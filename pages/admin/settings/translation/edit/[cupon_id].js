import React from "react";
import AdminHeader from "../../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../../components/Admin/Layout/Layout";
import EditCupon from "../../../../../components/Admin/Coupon/Edit/EditCupon";

const Edit = (props) => {
  return (
    <>
      <AdminHeader>{`Edit Coupon | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <EditCupon />
      </Layout>
    </>
  );
};

export default Edit;
