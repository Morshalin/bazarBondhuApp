import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import MerchantProductTable from "../../../components/Admin/Product/List/MerchantProductTable";
import AdminProductTable from "../../../components/Admin/Product/List/AdminProductTable";
import { options } from "../../../Helpers/Utils/Utils";

const Product = (props) => {
  // const [products, setProducts] = useState();
  // const [userRole, setUserRole] = useState();

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     axios.get(`backend/getAllProduct?show=10`).then((res) => {
  //       console.log(res);
  //       if (res.data.success) {
  //         setProducts(res.data.data);
  //         setUserRole(res.data.config);
  //       }
  //     });
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // console.log(["products", products]);
  // console.log(["userRole", userRole]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const getProductList = async () => {
  //     const apiResponses = await axios.get(
  //       `${process.env.api_backend_url}/getAllProduct?show=10`
  //     );
  //     return await apiResponses.data;
  //   };

  //   getProductList()
  //     .then((apiResponses) => {
  //       if (apiResponses.success) {
  //         isMounted && setProducts(apiResponses.data);
  //         isMounted && setUserRole(apiResponses.config);
  //         setLoaded(true);
  //       } else {
  //         throw "Some thing goes wrong on server";
  //       }
  //     })
  //     .catch((errors) => {
  //       console.error(errors);
  //     });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <>
      <AdminHeader>{`List Product | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        {props.role === "super-admin" || props.role === "FMCG" ? (
          <AdminProductTable serverPermissions={props.serverPermissions} />
        ) : (
          <MerchantProductTable />
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

  // const config = {
  //   headers: {
  //     authorization: `bearer ${token}`,
  //   },
  // };

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
    // return {
    // 	redirect: {
    // 	  destination: 'unauthorized',
    // 	  permanent: true,
    // 	},
    //   }
  }

  return {
    props: { 
      serverPermissions: data.data.permissions, 
      role: data.config.role
     }, // will be passed to the page component as props
  };
}

export default Product;
