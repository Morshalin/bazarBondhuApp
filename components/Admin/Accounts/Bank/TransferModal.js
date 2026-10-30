import axios from "axios";
import React, { useEffect, useState } from "react";
import { isNumberPositive } from "../../../../Helpers/Utils/numbers";
import MySuccess from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";

export default function TransferModal(props) {
  const { fromAccount, accountList, getAccountsList } = props;
  const [amount, setAmount] = useState("");
  const [toId, setToId] = useState("");

  const [errors, setErrors] = useState([]);

  let dataDismiss = "";

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const resetSuccessMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      ...errorMessage,
      status: false,
      message: "",
    });
  };

  const resetErrors = () => {
    setErrors([]);
  };

  const resetAllState = () => {
    setToId("");
    setAmount("");
  };

  const transfer = () => {
    axios
      .post(`backend/accounts/banks/transfer`, {
        amount: Number(amount),
        fromId: fromAccount.id,
        toId: toId,
      })
      .then((response) => {
        if (response.data.success) {
          dataDismiss = "modal";
          setSuccessMessage({
            status: true,
            message: response.data.message,
          });
          resetErrors();
          getAccountsList();
          hideModal();
          resetAllState();
        } else {
          dataDismiss = "";
          // setDataDismiss("");
          setErrors(response.data.errors);

          setErrorMessage({
            status: true,
            message: response.data.message,
          });
        }
      })
      .catch((error) => {});
  };

  const hideModal = () => {
    $("#transferModal").modal("hide");
  };

  return (
    <>
      {successMessage.status && (
        <MySuccess
          message={successMessage.message}
          resetSuccesMessage={resetSuccessMessage}
        />
      )}

      <div
        className="modal fade"
        id="transferModal"
        tabIndex="-1"
        aria-labelledby="transferModalLabel"
        aria-hidden="true"
      >
        {errorMessage.status && (
          <MyError
            message={errorMessage.message}
            resetErrorMessage={resetErrorMessage}
          />
        )}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="transferModalLabel">
                Transfer
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="fromId" className="col-form-label">
                    {" "}
                    From:{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fromId"
                    value={fromAccount.name}
                    readOnly={true}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="toId" className="col-form-label">
                    {" "}
                    To:{" "}
                  </label>
                  <select
                    className={`custom-select ${
                      errors?.toId ? `is-invalid` : ``
                    }`}
                    id="toId"
                    aria-label="Example select with button addon"
                    value={toId}
                    onChange={(event) => {
                      setToId(Number(event.target.value));
                    }}
                  >
                    <option value={null}> Choose...</option>
                    {accountList?.map((account, index) => {
                      if (account.id != fromAccount.id)
                        return (
                          <option value={account.id} key={index}>
                            {" "}
                            {account.name}{" "}
                          </option>
                        );
                    })}
                  </select>
                  <div className={errors?.toId ? `invalid-feedback` : ``}>
                    {errors?.toId}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Amount:
                  </label>
                  <input
                    className={`form-control ${
                      errors?.amount ? `is-invalid` : ``
                    }`}
                    id="amount"
                    value={amount}
                    onChange={(event) => {
                      event.preventDefault();
                      isNumberPositive(event.target.value) &&
                        setAmount(event.target.value);
                    }}
                  />
                  <div className={errors?.amount ? `invalid-feedback` : ``}>
                    {errors?.amount}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  resetErrors();
                  resetAllState();
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // data-dismiss={() => dataDismiss}
                data-dismiss={dataDismiss}
                onClick={() => transfer()}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
