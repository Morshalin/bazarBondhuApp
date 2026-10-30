import React, { memo, useEffect, useState } from "react";
import { saveFileAction, getActions } from "../../../../Helpers/Utils/Utils";
import MySuccess from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";
import { useRouter } from "next/router";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import useHttp from "../../../../hooks/useHttp";

// const UserList = (props) => {
//   const { userType, users, headData, errors, handleHeadDataChange } = props;

//   const allUsers =
//     users &&
//     users.map((user) => {
//       return (
//         <option value={user.id} key={user.id}>
//           {user.name}
//         </option>
//       );
//     });

//   const handleChange = (event) => {
//     handleHeadDataChange({
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <select
//       className={`custom-select ${errors?.to_pay_user_id ? `is-invalid` : ``}`}
//       id="to_pay_user_id"
//       name="to_pay_user_id"
//       value={headData.to_pay_user_id ?? ""}
//       onChange={(e) => {
//         handleChange(e);
//       }}
//       autoFocus={false}
//       disabled={false}
//       required
//     >
//       <option value="">Select from {userType}</option>
//       {allUsers}
//     </select>
//   );
// };

const SelectUsers = memo((props) => {
  //console.log("AccountsExpenseAdd SelectUsers");

  const { errors, handleHeadDataChange, isReset } = props;
  const [head_id, setUserType] = useState("");
  const [isSelect, setIsSelect] = useState(true);
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
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
        to_pay_user_id: +selectedUser.value,
      });
    }
  };

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

  /* rest head and user type */
  useEffect(() => {
    setIsSelect(true);
    setUserType("");
    setSelectedUser({
      value: "",
      label: "নির্বাচন করুন...",
    });
  }, [isReset]);
  /* rest head and user type */
  /* account head start  */
  const [headList, setHeadList] = useState("");
  const getHead = () => {
    getActions("backend/accounts/heads/expense/list", false).then((result) => {
      if (result.success) {
        let arr = result.data[0].children;
        function filterByID(item) {
          if (item.id !== 8) {
            return true;
          }
        }
        let arrByID = arr?.filter(filterByID);
        setHeadList(arrByID);
      }
    });
  };

  useEffect(() => {
    getHead();
  }, []);

  useEffect(() => {
    setSelectedUser({
      value: "",
      label: "নির্বাচন করুন...",
    });
  }, [head_id]);
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

  /* account head end  */

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="name">
              খরচের খাত
              <span className="text-danger"> * </span>
            </label>

            <select
              className={`custom-select ${errors?.head_id ? `is-invalid` : ``}`}
              id="head_id"
              name="head_id"
              value={head_id}
              onChange={(event) => {
                handleUserTypeChange(event);
              }}
              autoFocus={false}
              required
            >
              <option disabled={true} value="" hidden>
                নির্বাচন করুন
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
              গ্রহণকারী
              <span className="text-danger"> * </span>
            </label>
            <div className="input-group">
              <Select
                className={`flex-1-1-auto p-0 rounded-0 ${
                  errors?.to_pay_user_id ? `is-invalid` : ``
                }`}
                instanceId="customer"
                value={selectedUser}
                onChange={(selectedOption) => {
                  selectChangeHandler(selectedOption, head_id);
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
              <div className={errors?.to_pay_user_id ? `invalid-feedback` : ``}>
                {errors?.to_pay_user_id}
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

const fullDateTime = `${convertedDate} ${convertedTime}`;

const AccountsExpenseAdd = () => {
  //console.log("AccountsExpenseAdd");

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
    //document.getElementById("profile_image").innerHTML = "ফাইল নির্বাচন";
  }, []);

  const initialState = {
    head_id: "",
    responsible_id: "",
    reference: "",
    cashBook: "",
    ledgerBook: "",
    // attach: "",
    payment_note: "",
    to_pay_other_user: "",
    to_pay_type: "",
    to_pay_user_id: "",
    date: fullDateTime,
    amount: 0,
    payment_method: "",
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
  const router = useRouter();

  const [errors, setError] = useState({});

  const addAttachment = (file) => {
    setSelectedFile(file);
    setIsFilePicked(true);
  };

  const handleChange = (event) => {
    handleHeadDataChange({ [event.target.name]: event.target.value });
  };

  // particulars

  const [particulars, setParticulars] = useState([
    {
      no: 1,
      particular: "",
      amount: 0,
    },
  ]);

  const [clientErrors, setClientErrors] = useState({
    amount: [],
    particular: [],
  });

  const addParticularHandler = (event) => {
    event.preventDefault();
    // console.log(event);

    setClientErrors((oldErrors) => {
      return {
        ...oldErrors,
        amount: [],
        particular: [],
      };
    });

    let isError = true;

    particulars.map((item, index) => {
      if (item.amount === 0) {
        isError = false;
        setClientErrors((oldErrors) => {
          return {
            ...oldErrors,
            amount: [...Array(+index + 1)].map((_, indexMap) =>
              index === indexMap ? "টাকার পরিমাণ পূরণ করুন ।" : ""
            ),
          };
        });
      }
      if (item.particular.length === 0) {
        isError = false;
        setClientErrors((oldErrors) => {
          return {
            ...oldErrors,
            particular: [...Array(+index + 1)].map((_, indexMap) =>
              index === indexMap ? "বিবরন নির্বাচন করুন ।" : ""
            ),
          };
        });
      }
    });

    if (isError) {
      setParticulars((prevState) => {
        const serialNo = prevState.filter((item, index, array) => {
          if (index + 1 === array.length) return item;
        });
        const [noLastItem] = serialNo;
        return [
          ...prevState,
          {
            no: noLastItem.no + 1,
            particular: "",
            amount: 0,
          },
        ];
      });
    }
  };

  const updateParticularHandler = (index, event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "amount") {
      console.log(value);
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          amount: [
            ...oldErrors.amount.map((item, aIndex) =>
              index === aIndex ? "" : item
            ),
          ],
        };
      });

      setParticulars((prevState) =>
        prevState.map((item, pIndex) =>
          index === pIndex ? { ...item, [name]: value } : item
        )
      );
    } else {
      setClientErrors((oldErrors) => {
        return {
          ...oldErrors,
          particular: [
            ...oldErrors.particular.map((item, aIndex) =>
              index === aIndex ? "" : item
            ),
          ],
        };
      });

      setParticulars((prevState) =>
        prevState.map((item, pIndex) =>
          index === pIndex ? { ...item, [name]: value } : item
        )
      );
    }
  };

  const removeParticularHandler = (event, no) => {
    event.preventDefault();

    setParticulars((prevState) => prevState.filter((item) => item.no != no));
  };

  const amountCalculation = () => {
    setHeadData({
      ...headData,
      ["amount"]: particulars.reduce(function (sum, current) {
        return Number(sum) + Number(current.amount);
      }, 0),
    });
  };

  useEffect(() => {
    amountCalculation();
  }, [particulars]);

  const handleExpense = (event) => {
    event.preventDefault();

    setDisabledFiled("disabled");
    const formData = new FormData();

    if (isFilePicked) {
      formData.append("attach", selectedFile);
    }

    for (let key in headData) {
      if (headData[key]) {
        formData.append(key, headData[key]);
      }
    }

    formData.append("particulars", JSON.stringify(particulars));

    const config = {
      headers: {
        "content-type": "multipart/form-data;",
      },
    };

    saveFileAction(`backend/accounts/heads/expense/add`, formData, config).then(
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
          setDisabledFiled("");
          setParticulars([
            {
              no: 1,
              particular: "",
              amount: 0,
            },
          ]);
          // hideModal();
          //router.back();
          //router.reload();
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
    //console.log(str);
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

  // const hideModal = () => {
  //   // $("#add_expense_modal").modal("hide");
  // };

  // const options = [
  //   { value: "bkash", label: "Bkash" },
  //   { value: "nagod", label: "Nagod" },
  //   { value: "bank", label: "Bank" },
  //   { value: "card_payment", label: "Card Payment" },
  // ];

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

  const [isReset, setIsReset] = useState(false);
  const resetExpenseFormData = (event) => {
    event.preventDefault();
    handleHeadDataChange(initialState);
    //reset more option
    setParticulars([
      {
        no: 1,
        particular: "",
        amount: 0,
      },
    ]);

    setSelectedFile("");
    setIsFilePicked(false);

    document.getElementById("profile_image").innerHTML =
      "যদি থাকে। যেমন, ছবি, রশিদ";

    setIsReset((prevState) => !prevState);
    //document.getElementById("expenseFormData").reset();
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log("onclick..");
  };

  // console.log(particulars);
  //console.log(clientErrors);
  //console.log(errors);

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
                    <h2>খরচ</h2>
                    {/* <Link href={`../accounts-expense`}>
                      <a className="fbh-btn" title="Expense List">
                        <i className="icon-list2" />
                      </a>
                    </Link> */}
                    <a
                      href={`${void 0}`}
                      onClick={onClick}
                      className="fbh-btn"
                      title="Expense List"
                    >
                      <i className="icon-list2" />
                    </a>
                  </div>
                  <div className="fbh-info">
                    <p>
                      নীচের তথ্য পূরণ করুন। * দ্বারা চিহ্নিত ফিল্ড লেবেলগুলি
                      অবশ্যই পূরণ করতে হবে
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <form
                    className="row"
                    id="expenseFormData"
                    encType="multipart/form-data"
                  >
                    <div className="col-3">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="date">
                              খরচ তারিখ <span className="text-danger"> * </span>
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
                              className={errors?.date ? `invalid-feedback` : ``}
                            >
                              {errors?.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <SelectUsers
                          isReset={isReset}
                          handleHeadDataChange={handleHeadDataChange}
                          errors={errors}
                        />
                      </div>
                    </div>

                    <div className="col-3">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="reference">ভাউচার নং</label>

                            <input
                              id="reference"
                              name="reference"
                              type="text"
                              value={headData.reference}
                              className={`form-control`}
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              placeholder="ভাউচার নং"
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
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th
                              className={"text-center"}
                              style={{ width: "12%" }}
                            >
                              ক্রমিক নং.
                            </th>
                            <th
                              className={"text-center"}
                              style={{ width: "57%" }}
                            >
                              খরচের বিবরন
                            </th>
                            <th
                              className={"text-center"}
                              style={{ width: "30%" }}
                              colSpan={2}
                            >
                              টাকার পরিমান
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {particulars.map((data, index, array) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  name="partial"
                                  className={`form-control text-center`}
                                  value={index + 1}
                                  readOnly={"readOnly"}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="particular"
                                  value={data?.particular ?? ""}
                                  className={`form-control`}
                                  onChange={(event) => {
                                    updateParticularHandler(index, event);
                                  }}
                                />
                                <small className="text-danger d-block">
                                  {clientErrors.particular[index]}
                                </small>
                              </td>
                              <td colSpan={array.length === 1 ? 2 : 1}>
                                <input
                                  type="text"
                                  name="amount"
                                  value={data?.amount === 0 ? "" : data?.amount}
                                  className={`form-control text-right`}
                                  onChange={(event) => {
                                    isNumberPositive(event.target.value) &&
                                      updateParticularHandler(index, event);
                                  }}
                                />
                                <small className="text-danger d-block">
                                  {clientErrors.amount[index]}
                                </small>
                              </td>

                              {array.length !== 1 ? (
                                <td className={"text-center"}>
                                  <button
                                    className={"btn border btn-danger"}
                                    onClick={(event) => {
                                      removeParticularHandler(event, data.no);
                                    }}
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={2}></td>
                            <td>
                              <div className="row form-group">
                                <div className="col-4 pr-0 align-self-center">
                                  <label className="mb-0">
                                    সর্বমোট{" "}
                                    <span className="text-danger"> * </span>
                                  </label>
                                </div>
                                <div className="col-8">
                                  <input
                                    className={`form-control text-right `}
                                    value={headData.amount ?? 0}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="box">
                                <button
                                  className="btn btn-secondary d-inline float-right"
                                  onClick={addParticularHandler}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name">
                          Amount
                          <span className="text-danger"> * </span>
                        </label>

                        <input
                          className={`form-control ${
                            errors?.amount ? `is-invalid` : ``
                          }`}
                          autoComplete="off"
                          id="amount"
                          name="amount"
                          value={headData.amount ?? 0}
                          placeholder="Amount"
                          readOnly
                        />

                        <div
                          className={errors?.amount ? `invalid-feedback` : ``}
                        >
                          {errors?.amount}
                        </div>
                      </div>
                    </div> */}

                    {/*  <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">
                          প্রদানের ধরণ
                          <span className="text-danger"> * </span>
                        </label>

                        <select
                          className="custom-select"
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
                          <option value="" disabled className="text-muted">
                            Bank
                          </option>
                          <option value="bank-cash">-Cash</option>
                          <option value="check">-Check</option>
                          <option value="transfer">-Transfer</option>
                          <option value="card">-Card</option>
                          <option value="" disabled className="text-muted">
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

                    <div className="col-md-4">
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
                                <option value={item.id}>{item.name}</option>
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

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>ফাইল সংযুক্ত করুন</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className={`custom-file-input ${
                              errors?.attach ? `is-invalid` : ``
                            }`}
                            name="attach"
                            onChange={(e) => {
                              addAttachment(e.target.files[0]);
                            }}
                            id="attach"
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
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label>
                          পেমেন্ট নোট{" "}
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
                          onClick={resetExpenseFormData}
                        >
                          <i className="icon-reset mr-1 mr-1" />
                          বাতিল
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={handleExpense}
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
                              সংরক্ষিত হচ্ছে...
                            </>
                          ) : (
                            <>
                              <i className="icon-save-regular mr-1" /> খরচ করুন
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
export default AccountsExpenseAdd;
