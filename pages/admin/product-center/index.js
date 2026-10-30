import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import CompanyTable from "../../../components/Admin/ProductCenter/List/CompanyTable";

const ProductCenter = (props) => {
  return (
    <>
      <AdminHeader>{`List Company | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <CompanyTable />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  if (!req.headers.cookie) {
    res.writeHead(302, { Location: "/auth/sly-login" });
    res.end();
  }
  const token = req.headers.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith("token"))
    ?.split("=")[1];

  if (!token) {
    return {
      redirect: {
        destination: "/auth/sly-login",
        permanent: false,
      },
    };
  }

  const resp = await fetch(`${process.env.api_backend_url}/get-site-info`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();

  let hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    data.data.permissions &&
      data.data.permissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };
  if (!hasMenuPermission("product", "view")) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serverPermissions: data.data.permissions,
      role: data.config.role,
    }, // will be passed to the page component as props
  };
}

export default ProductCenter;
