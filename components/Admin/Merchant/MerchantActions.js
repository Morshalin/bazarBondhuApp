import React, { memo, useEffect } from "react";
import Link from "next/link";
import { DELETE, STATUS } from "../../../Helpers/Utils/Utils";
import useHttp from "../../../hooks/useHttp";
import MessageNotification from "../../Ui/Notification/Message";

let staticStatusOptions;

const MerchantActions = memo((props) => {
  console.log("marchent Action");

  switch (props.shop?.status) {
    case "submitted":
      staticStatusOptions = [
        { id: 1, name: "Approved", value: "approved" },
        { id: 2, name: "Rejected", value: "rejected" },
      ];
      break;
    case "under_review":
      staticStatusOptions = [
        { id: 1, name: "Approved", value: "approved" },
        { id: 2, name: "Rejected", value: "rejected" },
      ];
      break;
    case "approved":
      staticStatusOptions = [{ id: 1, name: "Suspend", value: "suspend" }];
      break;
    case "rejected":
      staticStatusOptions = [{ id: 1, name: "Approved", value: "approved" }];

      break;
    case "suspend":
      staticStatusOptions = [{ id: 1, name: "Approved", value: "approved" }];
      break;
  }
  const {
    isLoading: isLoadingShopStatusUpdate,
    success: isSuccessShopStatusUpdate,
    httpFetch: httpFetchShopStatusUpdate,
    successMessage: successMessageShopStatusUpdate,
    error: errorShopStatusUpdate,
    errorMessage: errorMessageShopStatusUpdate,
    clearError: clearErrorShopStatusUpdate,
    clearSuccess: clearSuccessShopStatusUpdate,
  } = useHttp();

  const shopStatusHandler = (event, { id, status }) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("id", id);
    formData.append("status", status);

    httpFetchShopStatusUpdate(`backend/shop-status-update`, "post", formData, {
      "Content-Type": "application/json",
    });
  };

  useEffect(() => {
    let setTimeoutId;
    if (isSuccessShopStatusUpdate) {
      setTimeoutId = setTimeout(() => {
        props.statusUpdate();
      }, 3000);
    }
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [isSuccessShopStatusUpdate]);

  return (
    <>
      {isSuccessShopStatusUpdate && (
        <MessageNotification
          message={successMessageShopStatusUpdate}
          onClick={clearSuccessShopStatusUpdate}
        />
      )}
      {errorMessageShopStatusUpdate && (
        <MessageNotification
          error={errorMessageShopStatusUpdate}
          message={errorMessageShopStatusUpdate}
          onClick={clearErrorShopStatusUpdate}
        />
      )}

      <div className="dropdown action-btn-group">
        <button
          className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id={`action_button_${props.shop.id}`}
        >
          Actions
        </button>
        <div className="dropdown-menu">
          <Link legacyBehavior href={`merchant/edit/${props.shop.id}`}>
            <a className="dropdown-item">
              <i className="icon-pencil-alt text-primary" />
              Edit
            </a>
          </Link>

          {(staticStatusOptions || []).map((item, i) => (
            <React.Fragment key={i}>
              <a
                className="dropdown-item"
                onClick={(e) =>
                  shopStatusHandler(e, {
                    id: props.shop.id,
                    status: item.value,
                  })
                }
              >
                <i
                  className={`icon-sphere  ${
                    item.value == "approved" ? "text-success" : "text-primary"
                  }`}
                />
                {item.name}
              </a>
            </React.Fragment>
          ))}

          {/* <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();

              if (window.confirm("Are you sure to delete?")) {
                props.actions({
                  type: DELETE,
                  payload: { index: props.shopIndex },
                });
              }
            }}
          >
            <i className="icon-trash-alt-regular text-danger" />
            Delete
          </button> */}

          {/* <div className="dropdown-divider" />

          <button
            className="dropdown-item"
            onClick={(event) => {
              event.preventDefault();
              if (window.confirm("Are you sure?")) {
                props.actions({
                  type: STATUS,
                  payload: { index: props.shopIndex },
                });
              }
            }}
          >
            <i
              id={`status_icon_${props.shop.id}`}
              className={`icon-sphere ${
                props.shop.status === "Active" ? "text-danger" : "text-success"
              }`}
            />
            <span id={`status_name_${props.shop.id}`}>
              {props.shop.status === "Active" ? "Unpublish" : "Publish"}
            </span>
          </button> */}
        </div>
      </div>
    </>
  );
});

export default MerchantActions;
