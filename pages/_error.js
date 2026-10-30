import React, { useEffect } from "react";
import SiteHeader from "../components/Frontend/Header/SiteHeader";
import Layout from "../components/Frontend/Layout/Layout";
const ErrorPage = () => (
  <>
    <SiteHeader>{`${process.env.app_name}`}</SiteHeader>
    <Layout>
      <div className="page-not-found-wrap">
        <h1>Page Not found</h1>
        <p>We're sorry. The page you requested could be not found.</p>
      </div>
    </Layout>
  </>
);

export default ErrorPage;
