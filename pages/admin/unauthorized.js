import React from "react";
import AdminHeader from "../../components/Admin/Header/AdminHeader";
import Layout from "../../components/Admin/Layout/Layout";

const Unauthorized = () => {
  return (
    <>
      <AdminHeader>{`${process.env.app_name}`}</AdminHeader>
      <Layout>
        <div className="page-not-found-wrap">
          <h1>Unauthorized Access</h1>
          <p>We're sorry. You don't have permission to access the page.</p>
        </div>
      </Layout>
    </>
  );
};

export default Unauthorized;
