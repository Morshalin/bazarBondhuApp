import React from "react";
import LayoutBlank from "../../components/Admin/Layout/LayoutBlank";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <>
      <LayoutBlank>
        <LoginForm />
      </LayoutBlank>
    </>
  );
};

export default Login;
