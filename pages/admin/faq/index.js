import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import Faq from "../../../components/Admin/Faq/Faq";
import Unauthorized from "../../Unauthorized";
import React from "react";
import axios from "axios";
import process from "../../../next.config";

const Index = (props) => {
  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Edit FAQ Page | ${process.env.app_name}`}</AdminHeader>

      <Layout>
        <Faq />
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

  let permission = "view-faq";

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

export default Index;
