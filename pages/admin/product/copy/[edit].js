import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import CopyProductForm from "../../../../components/Admin/Product/Copy/CopyProductForm";
import Unauthorized from "../../../Unauthorized";

const UpdateProduct = (props) => {
  const { asPath, route, query } = useRouter();
  const [productEditData, setProductEditData] = useState("");

  const productAPiDataFetching = async (productId) => {
    return await axios
      .get(`/backend/products/${productId}`)
      .then((responseApi) => responseApi.data)
      .catch((errors) => errors);
  };

  useEffect(() => {
    let mounted = true;
    if (asPath !== route) {
      productAPiDataFetching(query.edit).then((product) => {
        if (mounted) {
          setProductEditData(product.data ?? "");
        }
      });
    }
    return () => (mounted = false);
  }, [asPath, route, query]);

  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Edit Product | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        {productEditData ? (
          <CopyProductForm productEditData={productEditData} />
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

  let permission = "copy";

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

export default UpdateProduct;
