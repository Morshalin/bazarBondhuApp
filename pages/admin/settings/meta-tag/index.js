import React from "react";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import MetaTag from "../../../../components/Admin/Settings/MetaTag";

const SettingsMetaTag = () => {
  return (
    <>
      <AdminHeader>{`Meta Tag | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <MetaTag />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SettingsMetaTag;
