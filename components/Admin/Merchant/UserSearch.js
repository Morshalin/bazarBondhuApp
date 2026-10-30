import React, { memo, useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
import Select from "react-select";
import AddMerchantUserModal from "./AddMerchantUser";

import useHttp from "../../../hooks/useHttp";

const UserSearch = memo((props) => {
  console.log("marchent shop  user Search");
  // const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const [selectedUser, setSelectedUser] = useState({
    value: "",
    label: "Select...",
  });

  const { success: isSuccess, data, httpFetch, resetHttp } = useHttp();

  const [userSearch, setUserSearch] = useState("");
  const userSerchHandler = useCallback((searchKeyword) => {
    if (searchKeyword) {
      setUserSearch(searchKeyword);
    } else {
      setUserSearch("");
      resetHttp();
    }
  }, []);

  // const WAIT_INTERVAL = 500;
  // let timer = null;
  // let keyword;

  useEffect(() => {
    let timerId;

    timerId = setTimeout(() => {
      if (userSearch !== "") {
        httpFetch(
          `backend/users/search-user`,
          "post",
          {
            search_keyword: userSearch,
            order_by: "desc",
            paginate: false,
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
  }, [userSearch]);

  // const searchUser = (a) => {
  //   clearTimeout(timer);
  //   keyword = a;
  //   timer = setTimeout(searchUsers, WAIT_INTERVAL);
  // };

  const selectChangeHandler = useCallback((selectedUser) => {
    // console.log(selectedUser);
    if (
      selectedUser &&
      selectedUser.value !== null &&
      selectedUser.value !== ""
    ) {
      setSelectedUser(selectedUser);
      props.getUserId(selectedUser.value);
    }
  }, []);

  // const searchUsers = () => {
  //   getUsers(keyword).then((userResponse) => {
  //     if (userResponse.success) {
  //       setIsLoading(false);
  //       let userFilterData =
  //         userResponse.success &&
  //         userResponse.data.data.map(({ id, name, phone, shop_id }) => {
  //           let phone_number = "";
  //           phone && (phone_number = " (" + phone + ")");
  //           return {
  //             value: id,
  //             label: name + phone_number,
  //           };
  //         });
  //       setUsers(userFilterData);
  //       // setCustomersData(customerResponse.data);
  //     }
  //   });
  // };

  // const getUsers = async (keyword) => {
  //   return await axios
  //     .get(`backend/get-users`, {
  //       keyword: keyword ?? "",
  //     })
  //     .then((result) => result.data)
  //     .catch((error) => error);
  // };

  // console.log(userSearch);
  // console.log(selectedUser);
  // console.log(success);
  // console.log(data);

  return (
    <>
      <div className="input-group">
        <Select
          className="flex-1-1-auto p-0 rounded-0"
          instanceId="customer"
          value={selectedUser}
          onChange={(selectedOption) => {
            selectChangeHandler(selectedOption);
          }}
          onInputChange={(selectedOption) => {
            userSerchHandler(selectedOption);
          }}
          options={
            isSuccess
              ? (data || []).map((item) => ({
                  value: item.id,
                  label:
                    `${item.first_name ?? ""} ${item.last_name ?? ""} ` +
                    `(${item.phone})`,
                }))
              : []
          }
          autoFocus={false}
          isClearable={true}
          isLoading={false}
          isDisabled={isDisabled}
        />

        <div className="input-group-append rounded-0" id="button-addon4">
          <a
            className="btn btn-outline-secondary rounded-left rounded-0"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setIsDisabled((prevState) => !prevState);
            }}
          >
            <i className={`fas fa-eye${isDisabled ? "-slash" : ""}`} />
          </a>
          <div className="input-group-append">
            <button
              className="input-group-text"
              data-toggle="modal"
              data-target="#add_user_modal"
              type="button"
            >
              <i className="icon-plus-square-regular" />
            </button>
          </div>
        </div>
      </div>

      <AddMerchantUserModal setSelectedUser={selectChangeHandler} />
    </>
  );
});

export default UserSearch;
