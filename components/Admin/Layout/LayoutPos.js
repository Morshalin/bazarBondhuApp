import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Storage from "../../../Helpers/Auth/Storage";
import posStore from "../../../store/pos/posStore";
import TopBar from "../Header/TopBar";

const LayoutPos = (props) => {
  // Set global token
  useEffect(() => {
    axios.defaults.baseURL = process.env.api_url;
    axios.defaults.headers.Authorization = `Bearer ${Storage.getToken()}`;

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

        <div id="content" className="content-pos">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default LayoutPos;
