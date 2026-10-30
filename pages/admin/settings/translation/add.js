import React from "react";

import AddNewTranslation from "../../../../components/Admin/Translation/Add/Add";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";

const AddTranslation = (props) => {
  return (
    <>
      <AdminHeader>{`Add Language | ${process.env.app_name}`}</AdminHeader>

      <Layout>
        <AddNewTranslation />
      </Layout>
    </>
  );
};
export default AddTranslation;
