import React from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import OrderList from "../../../components/Admin/Sales/OrderList";
import OrderDetails from "../../../components/Admin/Sales/OrderDetails";
import OrderProcessing from "../../../components/Admin/Sales/OrderProcessing";
import OrderPaymentHistory from "../../../components/Admin/Sales/OrderPaymentHistory";
import axios from "axios";
import process from "../../../next.config";
import Unauthorized from "../../Unauthorized";

import { SALE_MODE, SALE_TYPE } from "../../../Helpers/Sales/SalesConstant";

const SalesInfo = (props) => {
  console.log("sales");

  return (
    <>
      <AdminHeader>{`E-Commerce Sale List | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <OrderList
                saleType={[SALE_TYPE.ECOM]}
                saleMode={SALE_MODE.ECOM}
              />
              <div className="col-md-5">
                <OrderDetails saleMode={SALE_MODE.ECOM} />
                <OrderProcessing />
                <OrderPaymentHistory />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

// const SalesInfo = (props) => {
//   console.log(props);
//   return props?.data?.success ? (
//     <Unauthorized />
//   ) : (
//     <>
//       <AdminHeader>{`E-Commerce Sales List | ${process.env.app_name}`}</AdminHeader>
//       <Layout serverPermissions={props.serverPermissions}>
//         <section className="custom-card">
//           <div className="container-fluid">
//             <div className="row">
//               <OrderList saleType={"ECOM"} />
//               <div className="col-md-5">
//                 <OrderDetails saleType={"ECOM"} />
//                 <OrderProcessing />
//                 <OrderPaymentHistory />
//               </div>
//             </div>
//           </div>
//         </section>
//       </Layout>
//     </>
//   );
// };

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
  if (!hasMenuPermission("sales", "view")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default SalesInfo;
