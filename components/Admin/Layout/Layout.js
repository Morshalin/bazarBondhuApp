import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Storage from "../../../Helpers/Auth/Storage";
import adminStore from "../../../store/admin/adminStore";
import Footer from "../Footer/Footer";
import TopBar from "../Header/TopBar";
import LeftSideBar from "../Sidebar/LeftSideBar";

const Layout = (props) => {
  // Set global token
  useEffect(() => {
    // axios.defaults.baseURL = process.env.api_url;
    // axios.defaults.headers.Authorization = `Bearer ${Storage.getToken()}`;
    if (!Storage.isLoggedIn()) {
      Router.push("/auth/sly-login");
    }
  });

  const [toggleButton, setToggleButton] = useState(false);

  const toggleChange = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <>
      <div className="wrapper">
        <TopBar
          serverPermissions={props.serverPermissions}
          toggleButton={toggleButton}
          toggleChange={toggleChange}
        />
        <LeftSideBar
          toggleChange={toggleButton}
          serverPermissions={props.serverPermissions}
        />

        <div id="content" className={toggleButton ? "active" : ""}>
          {props.children}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Layout;
