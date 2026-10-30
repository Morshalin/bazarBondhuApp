import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import EditBrand from "../../../components/Admin/Brand/Edit/EditBrand";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Unauthorized from "../../Unauthorized";

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
      getBrand(query.id)
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

  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Edit Brand | ${process.env.app_name}`}</AdminHeader>
      <Layout>
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
    res.writeHead(302, { Location: "/auth/sly-login" });
    res.end();
  }

  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  let permission = "edit-brand";

  const response = await axios
    .get(
      `${process.env.api_backend_url}/check-user-permission/${permission}`,
      config
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });

  return {
    props: { data: response }, // will be passed to the page component as props
  };
}

export default UpdateBrand;
