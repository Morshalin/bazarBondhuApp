import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import BrandTable from "../../../components/Admin/Brand/List/BrandTable";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Brand = (props) => {
  const [brands, setBrands] = useState("");

  useEffect(() => {
    let isMounted = true;
    const getBrandList = async () => {
      const apiResponses = await axios.get(
        `${process.env.api_backend_url}/getAllBrand?show=10`
      );
      return await apiResponses.data;
    };

    getBrandList()
      .then((apiResponses) => {
        if (apiResponses.success) {
          isMounted && setBrands(apiResponses.data);
        } else {
          throw "some thing goes wrong on server";
        }
      })
      .catch((errors) => {
        console.error(errors);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AdminHeader>{`Brand List | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        {brands && <BrandTable brands={brands} />}
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

  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

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
  if (!hasMenuPermission("brand", "view")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default Brand;
