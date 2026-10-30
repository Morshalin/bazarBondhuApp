import React from "react";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import SMS from "../../../../components/Admin/Settings/SMS";

const SettingsSiteSettings = () => {
  return (
    <>
      <AdminHeader>{`Site Settings | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <SMS />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SettingsSiteSettings;
