import React from "react";
import { connect } from "react-redux";
import { SALE_MODE } from "../../../Helpers/Sales/SalesConstant";
import Link from "next/link";
import { useRouter } from "next/router";

const OrderListActions = (props) => {
  // const router = useRouter();
  // const handleTrackingOrder = (event, status) => {
  //   event.preventDefault();

  //   const dataPost = {
  //     sale_id: props.sale.id,
  //     order_number: props.sale.order_number,
  //     status: status,
  //   };
  //   const url = `/backend/sales/update-order-processing-history`;

  //   axios
  //     .post(url, dataPost, {
  //       headers: {
  //         // Overwrite Axios's automatically set Content-Type
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((result) => {
  //       //console.log(result.data);

  //       if (result.data.success) {
  //         props.updateOrderStatus(result.data.data);

  //         setSuccessMessage({
  //           ...successMessage,
  //           status: true,
  //           message: result.data.message,
  //         });
  //       }
  //     });
  // };

  // console.log(props?.menuList);
  // console.log(props.sale);
  const sendToPosHandler = (event) => {
    event.preventDefault();

    window.open(`/admin/pos/order/${props.sale.order_number}`, "_blank");
  };
  return (
    <>
      <div className="dropdown action-btn-group">
        <button
          className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
          type="button"
          id="SaleOrderDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Actions
        </button>

        <div
          className="dropdown-menu dropdown-menu-right shadow"
          aria-labelledby="SaleOrderDropdown"
        >
          {props?.saleMode === SALE_MODE.ORDERS && (
            <React.Fragment>
              <a className={`dropdown-item`} onClick={sendToPosHandler}>
                <i className="fa fa-th-large mr-1" />
                <span>Sent to Pos</span>
              </a>

              <div className="dropdown-divider"></div>
            </React.Fragment>
          )}

          {props?.menuList &&
            props.menuList.map((menu, index) => (
              <React.Fragment key={index}>
                <a
                  key={menu.id}
                  className={`dropdown-item`}
                  href="#"
                  onClick={(event) => {
                    props.actionHandler(event, {
                      id: menu.id,
                      name: menu.name,
                    });
                  }}
                >
                  {menu.name}
                </a>

                {index < props.menuList.length - 1 && (
                  <div className="dropdown-divider"></div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  const { sale } = store.saleListStore;

  return { sale };
};

export default connect(mapStateToProps, null)(OrderListActions);
