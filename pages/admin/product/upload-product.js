/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "../../../components/Admin/Header/AdminHeader";
import Layout from "../../../components/Admin/Layout/Layout";
import Unauthorized from "../../Unauthorized";

// display: block;
// height: 130px;
// overflow: hidden;
// overflow-y: auto;
// border: 1px solid #ddd;
// padding: .75rem;

const UploadProduct = (props) => {
  const formData = useRef();

  const [inputErrors, setInputErrors] = useState("");
  const [successfullyInsertedData, setSuccessfullyInsertedData] = useState("");
  const [disableFiled, setDisableFiled] = useState(false);

  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
  }, []);

  console.log(successfullyInsertedData);

  return props?.data?.success ? (
    <Unauthorized />
  ) : (
    <>
      <AdminHeader>{`Upload Product | ${process.env.app_name}`}</AdminHeader>
      <Layout>
        <section className="custom-card">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="custom-card-box">
                  <div className="custom-card-box-header">
                    <div className="fbh-title">
                      <i className="far fa-plus-square" />
                      <h2>Upload Product List</h2>
                      <Link legacyBehavior
                        href={`${process.env.base_url}/csv/product_details_csv.csv`}
                      >
                        <a className="ml-auto px-3" title="Product List">
                          <i class="fas fa-file-download"></i> Download Csv
                          Format
                        </a>
                      </Link>

                      <Link legacyBehavior href={`/admin/product`}>
                        <a className="fbh-btn" title="Product List">
                          <i className="icon-list2" />
                        </a>
                      </Link>
                    </div>
                    <div className="fbh-info">
                      <p>
                        Please fill in the information below. The field labels
                        marked with * are required input fields.
                      </p>
                    </div>
                  </div>

                  <div className="custom-card-box-content">
                    <div className="row">
                      <div className="col-lg-12">
                        <form
                          id="unitFormData"
                          method="POST"
                          ref={formData}
                          onSubmit={(e) => {
                            e.preventDefault();
                            setDisableFiled(true);
                            const formSubmitData = new FormData(
                              formData.current
                            );
                            axios
                              .post("/backend/upload-csv", formSubmitData)
                              .then((responses) => {
                                if (responses.data.success) {
                                  setInputErrors("");
                                  setSuccessfullyInsertedData(
                                    responses.data.data
                                  );
                                  setDisableFiled(false);
                                } else {
                                  setInputErrors(
                                    responses.data.errors.product_csv
                                  );
                                  setDisableFiled(false);
                                }
                              })
                              .catch((errors) => {
                                console.log(errors);
                              });
                          }}
                          encType="multipart/form-data"
                        >
                          <fieldset disabled={disableFiled ? "disabled" : ""}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group mt-3">
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className={`custom-file-input ${
                                        inputErrors ? "is-invalid" : ""
                                      }`}
                                      name={`product_csv`}
                                      id="product_csv"
                                    />
                                    <label
                                      className="custom-file-label cfl-left-align"
                                      htmlFor="product_csv"
                                    >
                                      <span className="d-inline-block text-truncate w-75">
                                        upload product csv file
                                      </span>
                                    </label>
                                    {inputErrors && (
                                      <div className="invalid-feedback">
                                        {inputErrors}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 mb-4">
                                <div
                                  style={{
                                    display: "block",
                                    height: "300px",
                                    overflow: "hidden",
                                    overflowY: "auto",
                                    border: "1px solid #ddd",
                                    padding: ".75rem",
                                  }}
                                >
                                  {successfullyInsertedData &&
                                    successfullyInsertedData.map(
                                      (productName, index) => (
                                        <p
                                          key={index}
                                          className="text-success nowrap"
                                        >
                                          {productName}
                                        </p>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-lg-12 text-right">
                                <Link legacyBehavior href={"/admin/product"}>
                                  <a className="btn btn-info mr-1">
                                    <i className="icon-arrow-left-solid mr-1 mr-1" />
                                    back to list
                                  </a>
                                </Link>

                                <button
                                  type={`submit`}
                                  className="btn btn-primary mr-2"
                                >
                                  {disableFiled ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <i className="fas fa-upload mr-1"></i>{" "}
                                      Upload
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

  let permission = "upload-product";

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

export default UploadProduct;
