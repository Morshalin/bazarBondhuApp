import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import EditBrand from "../../../../components/Admin/Brand/Edit/EditBrand";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Unauthorized from "../../../Unauthorized";

const UpdateBrand = (props) => {
  const { asPath, route, query } = useRouter();
  const [brandEditData, setBrandEditData] = useState("");
  useEffect(() => {
    let isMounted = true;

    const getBrand = async (brandId) => {
      const apiResponses = await axios.get(
        `${process.env.api_backend_url}/brands/${brandId}`
      );
      return await apiResponses.data;
    };

    if (asPath !== route) {
      getBrand(query.edit)
        .then((brand) => {
          if (brand.success) {
            isMounted && setBrandEditData(brand);
          } else {
            throw "something goes wrong on server";
          }
        })
        .catch((errors) => {
          // console.error(errors);
        });
    }

    return () => (isMounted = false);
  }, [asPath, route, query]);

  return (
    <>
      <AdminHeader>{`Edit Brand | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        {brandEditData.success ? (
          <EditBrand brandEditData={brandEditData.data} />
        ) : (
          ""
        )}
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
  if (!hasMenuPermission("brand", "edit")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default UpdateBrand;
