import React from 'react';
import {connect} from "react-redux";

const SaleReturnItems = (props) => {

    return (
        <>
            <div className="custom-card-box mb-3">
                <div className="custom-card-box-header">
                    <div className="fbh-title ">
                        <i className="icon-eye-regular"/>
                        <h2>Return Items <span>#{props.saleReturn.reference_no}</span></h2>
                    </div>
                </div>
                <div className="custom-card-box-content p-md-3 p-2">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive custom-table custom-hight-320">
                                <table className="table table-bordered table-hover mb-0 table-order-details">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">SL</th>
                                        <th scope="col">Img</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Qty.</th>
                                        <th scope="col">Unit Cost.</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {

                                        (
                                            (props.saleReturn)
                                            && (props.saleReturn.product_sales_return)
                                            && (props.saleReturn.product_sales_return.length > 0)
                                        ) ? (props.saleReturn.product_sales_return.map((item, index) =>
                                            (
                                                <tr
                                                    key={item.id}
                                                    className={`text-center`}>

                                                    <td className="nowrap text-center">
                                                        {++index}
                                                    </td>

                                                    <td className="nowrap text-center">

                                                        <img
                                                            src={item.product_details ? item.product_details.feature_image : ''}
                                                            alt={item.product_details ? item.product_details.name : "-"}/>
                                                    </td>

                                                    <td className="text-center text-nowrap">
                                                        {item.product_details ? item.product_details.name : "-"}
                                                    </td>

                                                    <td className="text-center">
                                                        {item.quantity ?? "-"}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.unit_price ?? "-"}
                                                    </td>

                                                    <td className="text-center">
                                                        {item.sub_total ?? "-"}
                                                    </td>

                                                </tr>
                                            )
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No Item Found</td>
                                            </tr>
                                        )
                                    }

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
    const {saleReturn} = store.saleReturnListStore;
    return {saleReturn};
}

export default connect(mapStateToProps, null)(SaleReturnItems);