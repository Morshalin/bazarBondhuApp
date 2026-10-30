import React from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import ActionMenuLIst from "../../../components/Admin/ActionMenu/ActionMenuLIst";
import Unauthorized from "../../Unauthorized";
import axios from "axios";

const ActionMenu = (props) => {
  return (
    <>
      <AdminHeader>{`Action Menu List | ${process.env.app_name}`}</AdminHeader>
      <Layout serverPermissions={props.serverPermissions}>
        <ActionMenuLIst />
      </Layout>
    </>
  );
};

// export async function getServerSideProps({ req, res }) {
//   if (!req.headers.cookie) {
//     res.writeHead(302, { Location: "/auth/sly-login" });
//     res.end();
//   }

//   const token = req.headers.cookie
//     ?.split("; ")
//     ?.find((row) => row.startsWith("token"))
//     ?.split("=")[1];

//   if (!token) {
//     res.writeHead(302, { Location: "/auth/sly-login" });
//     res.end();
//   }

//   const config = {
//     headers: {
//       authorization: `bearer ${token}`,
//     },
//   };

//   let permission = "view-action-menu";

//   const response = await axios
//     .get(
//       `${process.env.api_backend_url}/check-user-permission/${permission}`,
//       config
//     )
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return null;
//     });

//   return {
//     props: { data: response }, // will be passed to the page component as props
//   };
// }

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
  if (!hasMenuPermission("action-menu", "view")) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverPermissions: data.data.permissions }, // will be passed to the page component as props
  };
}

export default ActionMenu;
