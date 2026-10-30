import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import AddProduct from "../../../components/Admin/Product/Add/AddProduct";
import Unauthorized from "../../Unauthorized";
import React from "react";
import axios from "axios";

const Product = (props) => {
  // return props?.data?.success ? (<Unauthorized/>) : (
  // 	<>
  // 		<AdminHeader>{`Add Product | ${process.env.app_name}`}</AdminHeader>
  // 		<Layout>
  // 			<AddProduct />
  // 		</Layout>
  // 	</>
  // )

  return (
    <>
      <AdminHeader>{`Add Product | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <AddProduct productDependency={props.productDependency} />
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
  if (!hasMenuPermission("product", "add")) {
    return {
      notFound: true,
    };
    // return {
    // 	redirect: {
    // 	  destination: 'unauthorized',
    // 	  permanent: true,
    // 	},
    //   }
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
      serverPermissions: data.data.permissions,
      productDependency: productDependency,
    }, // will be passed to the page component as props
  };
}

export default Product;
