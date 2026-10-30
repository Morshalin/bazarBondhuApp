import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../../components/Admin/Header/AdminHeader";
import Layout from "../../../../components/Admin/Layout/Layout";
import EditProduct from "../../../../components/Admin/Product/Edit/EditProduct";
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
  console.log(productEditData);

  return (
    <>
      <AdminHeader>{`Edit Product | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        {productEditData ? (
          <EditProduct
            productEditData={productEditData}
            productDependency={props.productDependency}
          />
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
  if (!hasMenuPermission("product", "edit")) {
    return {
      notFound: true,
    };
  }
  const productDependency = await axios
    .get(`${process.env.api_backend_url}/products-dependency`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });

  return {
    props: {
      productDependency: productDependency,
      serverPermissions: data.data.permissions,
    }, // will be passed to the page component as props
  };
}

export default UpdateProduct;
