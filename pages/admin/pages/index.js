import React from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import PagesList from "../../../components/Admin/Pages/PagesList";
import axios from "axios";
import process from "../../../next.config";
import Unauthorized from "../../Unauthorized";

const PageList = (props) => {
  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Pages List | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <PagesList />
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

  let permission = "view-pages";

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

export default PageList;
