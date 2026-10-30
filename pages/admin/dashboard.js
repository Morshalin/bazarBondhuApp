import AdminHeader from "../../components/Admin/Header/AdminHeader";
import Layout from "../../components/Admin/Layout/Layout";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <AdminHeader>{`Admin Dashboard | ${process.env.app_name}`}</AdminHeader>

      <Layout>
        <section className="product-search">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col-md-12">
                <h3>Groceries Delivered in 90 Minute</h3>
                <p>
                  Get your needs delivered at your doorsteps all day everyday
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="searc-form">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="search your need (e.g. mask, sanitizer, spray bottle, etc)"
                        required
                      />
                      <div className="input-group-append">
                        <button className="btn" type="button">
                          <i className="fas fa-search"></i> Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// Dashboard.getInitialProps = async (ctx) => {

//     // Checked it is on the server
//     if (ctx.res) {

//         let cookies = ctx.req.headers.cookie;
//         let isLoggedIn = cookies ? cookies.includes('token') : false;

//         if (!isLoggedIn) {
//             ctx.res.writeHead(302, {Location: '/auth/login'});
//             ctx.res.end();
//         }

//     }

//     return {};

// }

export default Dashboard;
