import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import HomeSliderTable from "../../../components/Admin/HomeSider/List/HomeSliderTable";
import Unauthorized from "../../Unauthorized";
import React from "react";
import axios from "axios";
import process from "../../../next.config";
const HomeSliderIndex = (props) => {
  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Home slider List | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <HomeSliderTable />
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

  let permission = "view-home-slider";

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

export default HomeSliderIndex;
