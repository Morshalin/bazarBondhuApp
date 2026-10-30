import React from "react";
import { connect } from "react-redux";

const SaleReturnList = (props) => {
  return props?.sale?.saleReturn?.length > 0 ? (
    <>
      <div className="custom-card-box-content p-md-3 p-2">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-md-3 mb-2 rounded-0">
              <div className="card-body card-da-dtl rounded-0">
                <i className="fas fa-shopping-cart"></i>
                <h6 className="card-title mt-2">Sale Return List</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive custom-table custom-hight-320">
              <table className="table table-bordered table-hover mb-3 table-order-details">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Img</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sale type</th>
                    <th scope="col">Return type</th>
                    <th scope="col">Qty.</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.sale?.saleReturn?.length > 0 ? (
                    props?.sale?.saleReturn?.map((item, index) => (
                      <tr key={index} className={`text-center`}>
                        <td scope="row">{++index}</td>

                        <td className="text-center">
                          <img src={item?.product?.image} alt="Product Img" />
                        </td>

                        <td className="text-center">
                          <h6 className="text-875 mb-1">
                            {item?.product?.name}
                          </h6>
                        </td>

                        <td className="text-center">
                          <h6 className="text-875 mb-1">{item?.sale_type}</h6>
                        </td>

                        <td className="text-center">
                          <h6 className="text-875 mb-1">{item?.return_type}</h6>
                        </td>

                        <td className="text-center text-nowrap">
                          {item?.return_quantity}
                        </td>

                        <td className="text-center text-nowrap">
                          ৳{item?.selling_price?.toFixed(2)}
                        </td>

                        <td className="text-center text-nowrap">
                          ৳{" "}
                          {(
                            item?.return_quantity * item?.selling_price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <h6 className="text-875 mb-1">No data found</h6>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

const mapStateToProps = (store) => {
  const { sale } = store.saleListStore;
  return { sale };
};

export default connect(mapStateToProps, null)(SaleReturnList);
