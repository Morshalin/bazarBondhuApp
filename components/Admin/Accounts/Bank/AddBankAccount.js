import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import Link from "next/link";
import React, { useState } from "react";
import process from "../../../../next.config";
import axios from "axios";
import { isNumberPositive } from "../../../../Helpers/Utils/numbers";

const initialBankData = {
  name: "",
  description: "",
  current_balance: "",
  active: true,
  default: false,
};
const initialBankDataError = {
  name: "",
  name_error: "",
  description: "",
  description_error: "",
};

const AddBankAccount = () => {
  const [bankAccount, setBankAccount] = useState(initialBankData);

  const [bankAccountError, setBankAccountError] =
    useState(initialBankDataError);

  const [disabledFiled, setDisabledFiled] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });
  const handleBankData = (event) => {
    let { name, value } = event.target;
    if (name === "active") {
      value = event.target.checked ? true : false;
    }
    if (name === "default") {
      value = event.target.checked ? true : false;
    }
    setBankAccount({ ...bankAccount, [name]: value });
    setBankAccountError({
      ...bankAccountError,
      [name]: "",
      [name + "_error"]: "",
    });
  };

  const resetBankFormData = (event) => {
    event.preventDefault();
    document.getElementById("bankAccountFormData").reset();
    setBankAccount(initialBankData);
    setBankAccountError(initialBankDataError);
    setDisabledFiled("");
    setTimeout(
      () =>
        setSuccessMessage({ ...successMessage, status: false, message: "" }),
      5000
    );
  };

  const submitBankData = (event) => {
    event.preventDefault();
    if (bankAccount.name.length === 0) {
      setBankAccountError({
        ...bankAccountError,
        name: "is-invalid",
        name_error: "Account Name filed is required",
      });
    } else {
      setDisabledFiled("disabled");
      const bankAccountFormData = new FormData();
      bankAccount.name && bankAccountFormData.append("name", bankAccount.name);
      bankAccount.description &&
        bankAccountFormData.append("description", bankAccount.description);
      bankAccount.current_balance &&
        bankAccountFormData.append(
          "current_balance",
          bankAccount.current_balance
        );
      bankAccountFormData.append("default", bankAccount.default);
      bankAccountFormData.append("active", bankAccount.active);

      const bankAccountApiUrl = `${process.env.api_backend_url}/accounts/banks`;
      axios
        .post(bankAccountApiUrl, bankAccountFormData)
        .then((apiResponses) => {
          if (apiResponses.data.success) {
            setDisabledFiled("disabled");
            resetBankFormData(event);
            setSuccessMessage({
              ...successMessage,
              status: true,
              message: apiResponses.data.message,
            });
            console.log(apiResponses.data);
          } else {
            setBankAccountError({
              ...bankAccountError,
              name:
                typeof apiResponses.data.errors.name != "undefined"
                  ? "is-invalid"
                  : "",
              name_error:
                typeof apiResponses.data.errors.name != "undefined"
                  ? apiResponses.data.errors.name.join()
                  : "",
              description:
                typeof apiResponses.data.errors.description != "undefined"
                  ? "is-invalid"
                  : "",
              description_error:
                typeof apiResponses.data.errors.description != "undefined"
                  ? apiResponses.data.errors.description.join()
                  : "",
              current_balance:
                typeof apiResponses.data.errors.current_balance != "undefined"
                  ? "is-invalid"
                  : "",
              current_balance_error:
                typeof apiResponses.data.errors.current_balance != "undefined"
                  ? apiResponses.data.errors.current_balance.join()
                  : "",
            });
            setDisabledFiled("");
            setErrorMessage({
              ...errorMessage,
              status: true,
              message: apiResponses.data.message,
            });
            setTimeout(
              () =>
                setErrorMessage({
                  ...errorMessage,
                  status: false,
                  message: "",
                }),
              5000
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {successMessage.status && <Success message={successMessage.message} />}

      {errorMessage.status && <Error message={errorMessage.message} />}
      <div className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square" />
                    <h2>Add Accounts</h2>
                    <Link legacyBehavior href={`/admin/accounts/bank-accounts`}>
                      <a className="fbh-btn" title="Bank Accounts List">
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
                      <form id="bankAccountFormData" method="POST">
                        <fieldset disabled={disabledFiled ?? ""}>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="name">
                                  {" "}
                                  Account Name
                                  <span className="text-danger"> *</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${bankAccountError.name}`}
                                  placeholder="Account Name"
                                  id="name"
                                  name="name"
                                  onChange={handleBankData}
                                />
                                {bankAccountError.name && (
                                  <div className="invalid-feedback">
                                    {bankAccountError.name_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  rows="2"
                                  className={`form-control ${bankAccountError.description}`}
                                  placeholder="description"
                                  id="description"
                                  name="description"
                                  onChange={handleBankData}
                                  required
                                />
                                {bankAccountError.description_error && (
                                  <div className="invalid-feedback">
                                    {bankAccountError.description_error}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="current_balance">
                                  {" "}
                                  Current Balance
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${bankAccountError.current_balance}`}
                                  placeholder="Current Balance"
                                  id="current_balance"
                                  name="current_balance"
                                  onChange={(e) => {
                                    isNumberPositive(e.target.value) &&
                                      handleBankData(e);
                                  }}
                                  required
                                />
                                {bankAccountError.current_balance && (
                                  <div className="invalid-feedback">
                                    {bankAccountError.current_balance_error}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="default"
                                    name="default"
                                    checked={bankAccount.default}
                                    onClick={handleBankData}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="default"
                                  >
                                    Set as default cash drawer.
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6 text-left">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="active"
                                    name="active"
                                    checked={
                                      bankAccount.default || bankAccount.active
                                    }
                                    // defaultChecked={true}
                                    onClick={handleBankData}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="active"
                                  >
                                    Active
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-right">
                              <Link legacyBehavior href={"/admin/accounts/bank-accounts"}>
                                <a className="btn btn-info mr-1">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />
                                  back to list
                                </a>
                              </Link>

                              <button
                                className="btn btn-danger mr-1"
                                onClick={resetBankFormData}
                              >
                                <i className="icon-reset mr-1 mr-1" />
                                reset
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={submitBankData}
                              >
                                {disabledFiled === "disabled" ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    />{" "}
                                    saving...
                                  </>
                                ) : (
                                  <>
                                    <i className="icon-save-regular mr-1" />{" "}
                                    save
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
      </div>
    </>
  );
};

export default AddBankAccount;
