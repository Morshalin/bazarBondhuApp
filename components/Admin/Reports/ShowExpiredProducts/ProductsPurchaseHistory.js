import React from 'react';
import {connect} from "react-redux";
import {
    SET_PRODUCT_PURCHASE,
    SET_RETURN_ERRORS, SET_RETURN_TYPE
} from "../../../../store/admin/actions/expiredProduct/expiredProductListAction";

const ProductsPurchaseHistory = (props) => {

    return (
        <>
            <div className="custom-card-box mb-3">
                <div className="custom-card-box-header">
                    <div className="fbh-title ">
                        <i className="icon-eye-regular"/>
                        <h2>Purchase
                            History <span>#{(props.purchaseProductHistory) ? props.purchaseProductHistory.name : ''}</span>
                        </h2>
                    </div>
                </div>

                <div className="custom-card-box-content p-md-3 p-2">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive custom-table custom-hight-320">
                                <table className="table table-bordered table-hover mb-3 table-order-details">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">SL</th>
                                        <th scope="col">Purchase Date</th>
                                        <th scope="col">Expiry Date</th>
                                        <th scope="col">Qty.</th>
                                        <th scope="col">Unit Cost.</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {

                                        props?.purchaseProductHistory?.productAllPurchase?.map((item, index) => {
                                                return (item.expiry_date && item.expiry_notification === 0) && (
                                                    <tr
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.setProductPurchase(item);
                                                        }}
                                                        key={item.id}
                                                        className={`text-center ${(props.productPurchase.id === item.id) ? `bg-warning` : ``}`}>

                                                        <td className="nowrap text-center">
                                                            {++index}
                                                        </td>

                                                        <td className="nowrap text-center">
                                                            {item.created_at}

                                                        </td>

                                                        <td className="nowrap text-center">
                                                            {item.expiry_date}

                                                        </td>
                                                        <td className="text-center">
                                                            {item.purchase_quantity ?? "-"}
                                                        </td>
                                                        <td className="text-center">
                                                            {item.net_unit_cost ?? "-"}
                                                        </td>

                                                        <td className="text-center">
                                                            {item.grand_total ?? "-"}
                                                        </td>

                                                        <td className="text-center">
                                                            <div className="dropdown action-btn-group">
                                                                <button
                                                                    className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                                                                    type="button"
                                                                    data-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                    id={`action_button_${item.id}`}>
                                                                    Actions
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={(event) => {
                                                                            event.preventDefault();
                                                                            props.setErrors('');
                                                                            props.setReturnType('Remove From Shelf');
                                                                            $(`#expiredProductReturnModal`).modal({show: true});
                                                                        }}>
                                                                        <i className="icon-trash-alt-regular text-danger"/>
                                                                        Remove From Shelf
                                                                    </button>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={(event) => {
                                                                            event.preventDefault();
                                                                            props.setErrors('');
                                                                            props.setReturnType('Damage Product');
                                                                            $(`#expiredProductReturnModal`).modal({show: true});
                                                                        }}>
                                                                        <i className="fas fa-minus-circle text-danger"/>
                                                                        Damage Product
                                                                    </button>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={(event) => {
                                                                            event.preventDefault();
                                                                            props.setErrors('');
                                                                            props.setReturnType('Return Purchase');
                                                                            $(`#expiredProductReturnModal`).modal({show: true});
                                                                        }}>
                                                                        <i className="fas fa-undo-alt text-warning"/>
                                                                        Return Purchase
                                                                    </button>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={(event) => {
                                                                            event.preventDefault();
                                                                            props.setErrors('');
                                                                            props.setReturnType('Use or Gift');
                                                                            $(`#expiredProductReturnModal`).modal({show: true});
                                                                        }}>
                                                                        <i className="fas fa-gift text-primary"/>
                                                                        Use or Gift
                                                                    </button>
                                                                    <div className="dropdown-divider"/>
                                                                </div>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            }
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
    const {purchaseProductHistory, purchaseItem, productPurchase} = store.expiredProductListStore;

    return {purchaseProductHistory, purchaseItem, productPurchase};
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProductPurchase: (productPurchase) => dispatch({type: SET_PRODUCT_PURCHASE, payload: {productPurchase}}),
        setErrors: (errors) => dispatch({type: SET_RETURN_ERRORS, payload: {errors}}),
        setReturnType: (return_type) => dispatch({type: SET_RETURN_TYPE, payload: {return_type}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPurchaseHistory);
