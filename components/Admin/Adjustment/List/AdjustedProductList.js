import React from 'react';
import {connect} from "react-redux";

const AdjustedProductList = (props) => {
    return (
        <>
            <div className="col-md-6">
                <div className="custom-card-box mb-3">
                    <div className="custom-card-box-header">
                        <div className="fbh-title">
                            <i className="icon-table"/>
                            <h2>Adjusted Product List</h2>
                        </div>
                    </div>
                    <div className="custom-card-box-content p-md-3 p-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive custom-table custom-hight-320">
                                    <table className="table table-bordered table-hover mb-0 table-order-details">
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col" className="text-left">Sl</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Purchase Qty</th>
                                            <th scope="col">Selling Qty</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Adjustment Qty</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            props.adjustment ? props.adjustment.map((item, index) => (
                                                <tr key={item.id} className={'text-center'}>
                                                    <td>{++index}</td>
                                                    <td>{item.product_details ? item.product_details.name : '-'}</td>
                                                    <td>{item.product_details ? item.product_details.purchase_qty : '-'}</td>
                                                    <td>{item.product_details ? item.product_details.selling_qty : '-'}</td>
                                                    <td>{item.product_details ? (item.product_details.purchase_qty - item.product_details.selling_qty) : '-'}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.action}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">None of product adjusted.
                                                    </td>
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
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {adjustment} = store.adjustmentListStore;
    return {adjustment};
}

export default connect(mapStateToProps, null)(AdjustedProductList);