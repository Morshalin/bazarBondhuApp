import React from "react";
import { connect } from "react-redux";

const OrderProcessing = (props) => {
  // console.log(["OrderProcessing", props]);
  return (
    <>
      <div className="custom-card-box mb-3">
        <div className="custom-card-box-header">
          <div className="fbh-title">
            <i className="icon-table" />
            <h2>Order Processing History</h2>
          </div>
        </div>
        <div className="custom-card-box-content p-md-3 p-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive custom-table">
                <table className="table table-bordered table-hover mb-0 table-order-details">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className="text-left">
                        Status
                      </th>
                      <th scope="col">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.sale && props.sale?.saleHistory.length > 0 ? (
                      props.sale.saleHistory.map((item, index) => (
                        <tr key={index}>
                          <td scope="row" className="text-left">
                            {item.sale_history_status ?? "-"}
                          </td>

                          <td className="text-center">
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString()
                              : "_"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">
                          No Order Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store) => {
  const { sale } = store.saleListStore;

  return { sale };
};

export default connect(mapStateToProps, null)(OrderProcessing);
