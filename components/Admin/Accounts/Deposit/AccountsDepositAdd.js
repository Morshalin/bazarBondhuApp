import React, { memo, useEffect, useState } from "react";
import { saveFileAction, getActions } from "../../../../Helpers/Utils/Utils";
import MySuccess from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import useHttp from "../../../../hooks/useHttp";

const SelectUsers = memo((props) => {
  const { errors, handleHeadDataChange, isReset } = props;

  const [head_id, setHeadId] = useState("");
  const [isSelect, setIsSelect] = useState(true);

  const handleUserTypeChange = (event) => {
    handleHeadDataChange({
      head_id: event.target.value,
    });
    setHeadId(event.target.value);
    setIsSelect(false);
  };

  const [selectedUser, setSelectedUser] = useState({
    value: "",
    label: "নির্বাচন করুন...",
  });

  const selectChangeHandler = (selectedUser, head_id) => {
    if (
      selectedUser &&
      selectedUser.value !== null &&
      selectedUser.value !== ""
    ) {
      setSelectedUser(selectedUser);

      handleHeadDataChange({
        head_id: head_id,
        received_from_id: +selectedUser.value,
      });
    }
  };

  /* start for account head */
  const [headList, setHeadList] = useState("");
  const getHead = () => {
    getActions("backend/accounts/heads/deposit/list", false).then((result) => {
      if (result.success) {
        let arr = result.data[0].children;
        function filterByID(item) {
          if (item.id !== 3) {
            return true;
          }
        }
        let arrByID = arr.filter(filterByID);
        setHeadList(arrByID);
      }
    });
  };

  useEffect(() => {
    getHead();
  }, []);

  function RecursiveOptions({ array, loopCount = 0, dashCount = 0 }) {
    if (array.children) {
      loopCount++;
    }

    const dash = [...Array(dashCount)].map((_, index) =>
      dashCount === index ? "" : "-- "
    );

    const nestedOptions = (array.children || []).map((item, index) => {
      return (
        <RecursiveOptions
          key={index}
          array={item}
          loopCount={loopCount}
          dashCount={loopCount}
        />
      );
    });

    return (
      <React.Fragment>
        <option value={array.id}>
          {dash}
          {array.name}
        </option>
        {nestedOptions}
      </React.Fragment>
    );
  }
  /* end for account head */

  const [userSearch, setUserSearch] = useState("");
  const userSearchHandler = (searchKeyword) => {
    if (searchKeyword) {
      setUserSearch(searchKeyword);
    } else {
      setUserSearch("");
      resetHttp();
    }
  };

  const { success: isSuccess, data, httpFetch, resetHttp } = useHttp();
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (userSearch !== "") {
        httpFetch(
          `backend/accounts/user-list`,
          "post",
          {
            search_keyword: userSearch,
            id: head_id,
          },
          {
            "Content-Type": "application/json",
          }
        );
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [userSearch, head_id]);

  useEffect(() => {
    setSelectedUser({
      value: "",
      label: "নির্বাচন করুন...",
    });
  }, [head_id]);

  useEffect(() => {
    setIsSelect(true);
    setHeadId("");
    setSelectedUser({
      value: "",
      label: "নির্বাচন করুন...",
    });
  }, [isReset]);

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="head_id">
              জমার খাত
              <span className="text-danger"> * </span>
            </label>

            <select
              className={`custom-select ${errors?.head_id ? `is-invalid` : ``}`}
              id="head_id"
              name="head_id"
              value={head_id}
              onChange={(event) => {
                event.preventDefault();
                handleUserTypeChange(event);
                // setHeadId(event.target.value);
              }}
              autoFocus={false}
              required
            >
              <option disabled={true} value="" hidden>
                {" "}
                নির্বাচন করুন{" "}
              </option>

              {headList &&
                headList.map((item, index) => {
                  return <RecursiveOptions key={index} array={item} />;
                })}
            </select>

            <div className={errors?.head_id ? `invalid-feedback` : ``}>
              {errors?.head_id}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="receiver_type">
              প্রদানকারী
              <span className="text-danger"> * </span>
            </label>
            <div className="input-group">
              <Select
                //className="flex-1-1-auto p-0 rounded-0"
                className={`flex-1-1-auto p-0 rounded-0 ${
                  errors?.received_from_id ? `is-invalid` : ``
                }`}
                instanceId="customer"
                value={selectedUser}
                // value={headData.received_from_id}
                onChange={(selectedOption) => {
                  selectChangeHandler(selectedOption, head_id);
                  // handleHeadDataChange({
                  //   received_from_id: event.target?.value,
                  // });
                }}
                onInputChange={(selectedOption) => {
                  userSearchHandler(selectedOption);
                }}
                options={
                  isSuccess
                    ? (data || []).map((item) => ({
                        value: item.id,
                        label:
                          `${item?.name ?? ""}` +
                          `(${item?.phone || item?.mobile_number})`,
                      }))
                    : []
                }
                autoFocus={false}
                isClearable={true}
                isLoading={false}
                isDisabled={isSelect}
              />

              <div
                className={errors?.received_from_id ? `invalid-feedback` : ``}
              >
                {errors?.received_from_id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const splitDate = new Date().toISOString().split("T");
const convertedDate = splitDate[0];
const convertedTime = splitDate[1].slice(0, 8);
//const [headId, setHeadId] = useState("");

const fullDateTime = `${convertedDate} ${convertedTime}`;

const AccountsDepositAdd = () => {
  const router = useRouter();
  /* const [value, setValue] = useState("default"); */

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

  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
    // document.getElementById("profile_image").innerHTML =
    //   "Eg. csv,txt,xlx,xls,pdf, jpg,png, jpeg, doc, docx";
  }, []);

  const initialState = {
    head_id: "",
    date: fullDateTime,
    responsible_id: "",
    amount: 0,
    payment_method: "", //payment method
    payment_note: "",
    deposit_no: "",
    attach: null,
    receiver_type: "", /// user, supplier,
    received_from: "", // required if received from other user
    received_from_id: "",
    particular: "", //string
    reference: "",
    //attach: "",
  };

  const [accountsList, setAccountsList] = useState("");
  const getAccounts = () => {
    getActions("backend/accounts/bank/account/list", false).then((result) => {
      if (result.success) {
        //console.log(result.data);
        setAccountsList(result.data.data);
        const id = result.data.data.find(
          (account) => account.default === true
        ).id;
        setHeadData({
          ...headData,
          responsible_id: id,
        });
      }
    });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const [headData, setHeadData] = useState(initialState);

  const handleHeadDataChange = (changedHeadData) => {
    setHeadData((prevState) => ({
      ...prevState,
      ...changedHeadData,
    }));
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [disabledFiled, setDisabledFiled] = useState("");

  const [errors, setError] = useState({});

  const addAttachment = (file) => {
    setSelectedFile(file);
    setIsFilePicked(true);
  };

  const handleChange = (event) => {
    handleHeadDataChange({ [event.target.name]: event.target.value });
  };

  const config = {
    headers: {
      "content-type": "multipart/form-data;",
    },
  };

  const handleDeposit = (event) => {
    event.preventDefault();
    setDisabledFiled("disabled");
    let formData = new FormData();
    //formData.append("head_id", headId);
    if (isFilePicked) {
      formData.append("attach", selectedFile);
    }

    for (let key in headData) {
      if (headData[key]) {
        formData.append(key, headData[key]);
      }
    }

    saveFileAction(`backend/accounts/heads/cash/add`, formData, config).then(
      (res) => {
        if (res.success) {
          setSuccessMessage({
            status: true,
            message: res.message,
          });
          setIsReset((prevState) => !prevState);
          setHeadData(initialState);
          setSelectedFile("");
          setError([]);
          document.getElementById("profile_image").innerHTML =
            "যদি থাকে। যেমন, ছবি, রশিদ";
          //router.back();
          //router.reload();
          setDisabledFiled("");
          //resetHeadFormData();
        } else {
          setError(res.errors);
          setErrorMessage({
            status: true,
            message: res.message,
          });
          setDisabledFiled("");
        }
      }
    );
  };

  const isNumberPositive = (str) => {
    if (str === "") return true;
    const dotCount = str.split(".").length - 1;
    if (dotCount > 1) {
      return false;
    }

    for (let i = 0; i < str.length; i++) {
      if (str[i] === ".") continue;
      if (str[i] < "0" || str[i] > "9") {
        return false;
      }
    }
    return true;
  };

  const [isReset, setIsReset] = useState(false);

  const resetHeadFormData = (event) => {
    event.preventDefault();
    handleHeadDataChange(initialState);
    setSelectedFile("");
    document.getElementById("profile_image").innerHTML =
      "যদি থাকে। যেমন, ছবি, রশিদ";
    setDisabledFiled("");
    setError([]);

    setIsFilePicked(false);
    setIsReset((prevState) => !prevState);
  };

  const [startDate, setStartDate] = useState(new Date());

  const changeDateHandler = (date) => {
    setStartDate(date);

    // const convertedDateYear = date.getFullYear();
    // const convertedDateMonth = `${date.getMonth() + 1}`;
    // const convertedDateDay = `${date.getDate()}`;

    // let addedZeroMonth =
    //   convertedDateMonth.length > 1
    //     ? convertedDateMonth
    //     : `0${convertedDateMonth}`;

    // let addedZeroDay =
    //   convertedDateDay.length > 1 ? convertedDateDay : `0${convertedDateDay}`;

    // const fullDate = `${convertedDateYear}-${addedZeroMonth}-${addedZeroDay}`;

    // const convertedTime = new Date(date)
    //   .toLocaleTimeString("en-US", { hour12: false })
    //   .slice(0, 8);

    // const fullDateTime = `${fullDate} ${convertedTime}`;

    // console.log(fullDateTime);

    const splitDate = new Date(date).toISOString().split("T");
    const convertedDate = splitDate[0];
    const convertedTime = splitDate[1].slice(0, 8);

    const fullDateTime = `${convertedDate} ${convertedTime}`;

    setHeadData((prevState) => {
      return {
        ...prevState,
        date: fullDateTime,
      };
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log("onclick..");
  };

  //console.log(isReset);

  return (
    <>
      {successMessage.status && (
        <MySuccess
          message={successMessage.message}
          resetSuccesMessage={resetSuccessMessage}
        />
      )}
      {errorMessage.status && (
        <MyError
          message={errorMessage.message}
          resetErrorMessage={resetErrorMessage}
        />
      )}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="far fa-plus-square" />
                    <h2>জমা</h2>
                    {/* <Link href={`../accounts-deposit`}>
                      <a className="fbh-btn" title="Deposit List">
                        <i className="icon-list2" />
                      </a>
                    </Link> */}
                    <a
                      href={`${void 0}`}
                      onClick={onClick}
                      className="fbh-btn"
                      title="Deposit List"
                    >
                      <i className="icon-list2" />
                    </a>
                  </div>
                  <div className="fbh-info">
                    <p>
                      নীচের তথ্য পূরণ করুন। * দ্বারা চিহ্নিত ফিল্ড লেবেলগুলি
                      অবশ্যই পূরণ করতে হবে |
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <form
                    className="row"
                    id="headFormData"
                    encType="multipart/form-data"
                  >
                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="date">
                                  জমার তারিখ{" "}
                                  <span className="text-danger"> * </span>
                                </label>

                                <DatePicker
                                  showTimeSelect
                                  selected={startDate}
                                  onChange={(date) => changeDateHandler(date)}
                                  dateFormat="eeee, d MMMM yyyy"
                                  className="form-control"
                                  readOnly
                                />

                                <div
                                  className={
                                    errors?.date ? `invalid-feedback` : ``
                                  }
                                >
                                  {errors?.date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="row">
                            <SelectUsers
                              isReset={isReset}
                              handleHeadDataChange={handleHeadDataChange}
                              errors={errors}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="reference">ভাউচার নং </label>

                            <input
                              id="reference"
                              name="reference"
                              type="text"
                              className={`form-control`}
                              value={headData.reference}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              placeholder="ভাউচার নং "
                            />

                            {/* <div
                              className={
                                errors?.amount ? `invalid-feedback` : ``
                              }
                            >
                              {errors?.amount}
                            </div> */}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="particular">
                              বিবরন
                              <span className="text-danger"> * </span>
                            </label>

                            <input
                              id="particular"
                              name="particular"
                              type="text"
                              className={`form-control ${
                                errors?.particular ? `is-invalid` : ``
                              }`}
                              autoComplete="off"
                              value={headData.particular}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              placeholder="বিবরন"
                              required
                            />

                            <div
                              className={
                                errors?.particular ? `invalid-feedback` : ``
                              }
                            >
                              {errors?.particular}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="amount">
                              টাকার পরিমান
                              <span className="text-danger"> * </span>
                            </label>

                            <input
                              id="amount"
                              name="amount"
                              type="text"
                              min="0"
                              className={`form-control ${
                                errors?.amount ? `is-invalid` : ``
                              }`}
                              autoComplete="off"
                              value={headData.amount > 0 ? headData.amount : ""}
                              onChange={(event) => {
                                isNumberPositive(event.target.value) &&
                                  handleChange(event);
                              }}
                              placeholder="পরিমান"
                              required
                            />

                            <div
                              className={
                                errors?.amount ? `invalid-feedback` : ``
                              }
                            >
                              {errors?.amount}
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="payment_method">
                              প্রদানের ধরণ
                              <span className="text-danger"> * </span>
                            </label>

                            <select
                              className={`custom-select ${
                                errors?.amount ? `is-invalid` : ``
                              }`}
                              id="payment_method"
                              name="payment_method"
                              value={headData.payment_method}
                              onChange={(e) => {
                                e.preventDefault();
                                handleChange(e);
                              }}
                              autoFocus={false}
                              required
                            >
                              <option disabled={true} value="" hidden>
                                নির্বাচন করুন
                              </option>
                              <option value="cash">Cash</option>
                              <option value="0" disabled className="text-muted">
                                Bank
                              </option>
                              <option value="bank-cash">-Cash</option>
                              <option value="check">-Check</option>
                              <option value="transfer">-Transfer</option>
                              <option value="card">-Card</option>
                              <option value="0" disabled className="text-muted">
                                Mobile Bank
                              </option>
                              <option value="bkash">-Bkash</option>
                              <option value="rocket">-Rocket</option>
                              <option value="nagod">-Nagod</option>
                              <option value="u-cash">-U-Cash</option>
                              <option value="sure-cash">-Sure-Cash</option>
                            </select>
                            <div
                              className={
                                errors?.payment_method ? `invalid-feedback` : ``
                              }
                            >
                              {errors?.payment_method}
                            </div>
                          </div>
                        </div> */}

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="payment_method">
                              তহবিল
                              <span className="text-danger"> * </span>
                            </label>

                            <select
                              className={`custom-select ${
                                errors?.responsible_id ? `is-invalid` : ``
                              }`}
                              id="responsible_id"
                              name="responsible_id"
                              value={headData.responsible_id}
                              onChange={(e) => {
                                e.preventDefault();
                                handleChange(e);
                              }}
                              autoFocus={false}
                              required
                            >
                              {accountsList &&
                                accountsList.map((item, i) => (
                                  <React.Fragment key={i}>
                                    <option
                                      value={item.id}
                                      /* selected={item.default} */
                                    >
                                      {item.name}
                                    </option>
                                  </React.Fragment>
                                ))}
                            </select>
                            <div
                              className={
                                errors?.responsible_id ? `invalid-feedback` : ``
                              }
                            >
                              {errors?.responsible_id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>ফাইল সংযুক্ত করুন</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className={`custom-file-input ${
                              errors?.attach ? `is-invalid` : ``
                            }`}
                            id="attach"
                            name="attach"
                            // value={selectedFile}
                            onChange={(e) => {
                              e.preventDefault();
                              addAttachment(e.target.files[0]);
                            }}
                          />
                          <label
                            id="profile_image"
                            className="custom-file-label cfl-left-align"
                            htmlFor="avatar"
                          >
                            যদি থাকে। যেমন, ছবি, রশিদ
                          </label>

                          <div
                            className={errors?.attach ? `invalid-feedback` : ``}
                          >
                            {errors?.attach}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>
                          পেমেন্ট নোট
                          <small>
                            ( অনুগ্রহ করে ব্যাঙ্ক চেক/ব্যাঙ্ক ট্রান্সফারের সমস্ত
                            বিবরণ অন্তর্ভুক্ত করুন )
                          </small>
                        </label>
                        <textarea
                          className="form-control"
                          rows="1"
                          id="payment_note"
                          name="payment_note"
                          value={headData.payment_note}
                          onChange={(e) => {
                            e.preventDefault();
                            handleChange(e);
                          }}
                        />

                        <div
                          className={
                            errors?.payment_note ? `invalid-feedback` : ``
                          }
                        >
                          {errors?.payment_note}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex flex-row justify-content-end">
                      <div className="pr-4">
                        <button
                          className="btn btn-danger mr-1"
                          onClick={resetHeadFormData}
                        >
                          <i className="icon-reset mr-1 mr-1" />
                          বাতিল
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={handleDeposit}
                          type="submit"
                          className="btn btn-primary"
                        >
                          {disabledFiled === "disabled" ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />{" "}
                              সংরক্ষিত হচ্ছে ...
                            </>
                          ) : (
                            <>
                              <i className="icon-save-regular mr-1" /> জমা করুন
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AccountsDepositAdd;
