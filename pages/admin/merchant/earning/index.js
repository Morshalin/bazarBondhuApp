import React from "react";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import EarningList from "../../../../components/Admin/Earning/EarningList";

const Index = () => {
  return (
    <>
      <AdminHeader>{`Shop Earning List | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <EarningList />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
