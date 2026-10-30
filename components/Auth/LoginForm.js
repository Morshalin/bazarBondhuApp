import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { connect } from "react-redux";
import Storage from "../../Helpers/Auth/Storage";
// import { SET_AUTHORIZATION } from "../../store/permission/actions/permissionActions";
import AdminHeader from "../Admin/Header/AdminHeader";
import OtpLoginForm from "../Frontend/Modals/OtpLoginForm";
import login from "./login.module.css";
// import { getSiteSettings } from "../../Helpers/Utils/Utils";

const LoginForm = (props) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });

  const [resetPin, setResetPin] = useState(false);

  const [headerLogo, setHeaderLogo] = useState("");

  const handleLoginData = (event) => {
    setIsError(false);
    setErrors([]);
    setMessage("");
    setLoading(false);

    const name = event.target.name;
    const value = event.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    let response = await axios
      .post(`/auth/merchant/verify-pin`, loginData)
      .then((result) => {
        return result.data;
      })
      .catch((exception) => {
        return exception;
      });

    // Success Login
    if (response.success) {
      setLoading(false);
      setIsError(false);
      setMessage(response.data.message);
      //Save authentication to cookies
      // localStorage.setItem("permissions", response.config.permissions);
      // props.set_authorization(response.config.permissions)
      Storage.store(JSON.stringify(response.data));
      let replaceRoute = sessionStorage.getItem("login_path") ?? "/admin";

      if (Storage.isLoggedIn()) {
        sessionStorage.removeItem("login_path");
        await Router.push('/admin');
        // window.location.reload();
      }
    }
    // Login Failed
    else {
      setErrors(response.errors);
      setIsError(true);
      setLoading(false);
      setMessage(response.message);
    }
  };

  useEffect(() => {
    if (Storage.isLoggedIn()) {
      Router.push("/admin");
    }
  });

  // useEffect(() => {
  //   getSiteSettings().then((response) => {
  //     if (response.success) {
  //       setHeaderLogo(response.data.shop_logo);
  //     }
  //   });
  // }, [headerLogo]);

  //   social login

  //   const handleSocialLoginButton = async () => {
  //     await axios
  //       .get(`${process.env.api_url}/auth/oauth/google`)
  //       .then((responses) => {
  //         if (responses.data.success) {
  //           router.replace(responses.data.data.social_url);
  //         }
  //       })
  //       .catch((errors) => {
  //         console.log(errors);
  //       });
  //   };

  return (
    <>
      <AdminHeader>{`Login | ${process.env.app_name}`}</AdminHeader>
      <div className="login-logo">
        <div className="login-logo-box">
          <a href="/">
            <img src="/img/logo.png" alt="Logo" />
          </a>
          <h1>User Login</h1>
        </div>
      </div>
      <div className="login-form">
        <form
          onSubmit={(event) => {
            // loginWithOtp && event.preventDefault()
          }}
        >
          {/* <button
						type='button'
						className={`btn google_button  p-3 rounded-0 mb-2`}
						onClick={handleSocialLoginButton}
					>
						<img src='/img/gmail.png' alt='gmail' className='mr-2' height='25px' />
						Login with <strong>Gmail</strong>
					</button>

					<button
						type='button'
						className='btn btn-outline-secondary cp-login p-3 mt-1 w-100 rounded-0'
						onClick={() => {
							setLoginWithOtp(!loginWithOtp)
							setErrors([])
							setIsError(false)
						}}
					>
						<i
							className={`${
								loginWithOtp ? `icon-envelope-regular` : `fas fa-mobile-alt`
							} mr-2 pt-1`}
						/>
						Login with <strong>{loginWithOtp ? `Email` : `Cell Phone`}</strong>
					</button>

					<div className='text-center position-relative my-5 text-white'>
						<hr />
						<span className={`${login['or-word']} bg-primary px-4`}>or</span>
					</div> */}

          {resetPin ? (
            <OtpLoginForm />
          ) : (
            <>
              <div className="form-group">
                <label className="sr-only" htmlFor="email">
                  User ID
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">+88</div>
                  </div>

                  <input
                    type="number"
                    className={`form-control ${
                      isError && errors
                        ? errors.email
                          ? "is-invalid"
                          : ""
                        : ""
                    }`}
                    id="email"
                    name="phone"
                    onChange={handleLoginData}
                    placeholder="Mobile No."
                  />

                  <div
                    id="email"
                    className={
                      isError && errors
                        ? errors.email
                          ? `invalid-feedback ${login.error}`
                          : "d-none"
                        : `d-none`
                    }
                  >
                    {isError && errors
                      ? errors.email
                        ? errors.email
                        : ""
                      : ""}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-key" />
                    </div>
                  </div>

                  <input
                    type="password"
                    id="password"
                    className={`form-control ${
                      isError && errors
                        ? errors.password
                          ? "is-invalid"
                          : ""
                        : ""
                    }`}
                    name="password"
                    onChange={handleLoginData}
                    placeholder="Enter pin"
                  />
                  <div
                    id="password"
                    className={
                      isError && errors
                        ? errors.password
                          ? `invalid-feedback ${login.error}`
                          : "d-none"
                        : `d-none`
                    }
                  >
                    {isError && errors
                      ? errors.password
                        ? errors.password
                        : ""
                      : ""}
                  </div>
                </div>
              </div>

              <span
                className={
                  isError ? (message ? login.error : login.success) : `d-none`
                }
              >
                {message}
              </span>

              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-warning"
              >
                {loading ? "Please Wait" : "Login"}
                <i
                  className={
                    loading
                      ? `spinner-border spinner-border-sm`
                      : "icon-sign-in-alt-solid"
                  }
                />
              </button>
            </>
          )}
          {!resetPin && (
            <p className="forgot-password-text">
              Forgot Pin?
              <a
                href="#"
                onClick={() => {
                  setResetPin(!resetPin);
                  setErrors([]);
                  setIsError(false);
                }}
              >
                Reset Pin
              </a>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     set_authorization: (permissions) =>
//       dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
//   };
// };

export default LoginForm;
