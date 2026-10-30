import React from 'react';
import {connect} from "react-redux";
import {
    CHANGE_PURCHASE_RETURN_QUANTITY,
    PURCHASE_RETURN_CART_REMOVE
} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";

const PurchaseReturnItemList = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-responsive custom-table mb-2">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product (Code - Name ) <i
                                    className="fas fa-sort-amount-up-alt"/>
                                </th>
                                <th scope="col">Return Quantity *</th>
                                <th scope="col">Purchase Price</th>
                                <th scope="col">SubTotal *</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>


                            {
                                props.products && props.products.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <img src={item.image} alt={item.name}/>
                                        </td>

                                        <td className="nowrap">
                                            {item.name} ({item.code})
                                        </td>


                                        <td className="text-center">

                                            <input
                                                type="text"
                                                placeholder="0"
                                                // value={item.return_quantity ?? 0}
                                                onChange={(event) => {
                                                    event.preventDefault();
                                                    props.changeReturnQty(item.id, event.target.value);
                                                }}/>

                                        </td>

                                        <td>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                value={item.purchase_price ?? 0}
                                                readOnly={true}/>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                value={item.grand_total ?? 0}
                                                readOnly={true}/>
                                        </td>

                                        <td className="actions">
                                            <div className="action-wrap">
                                                <button className="action-delete"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            props.remove(item.id);
                                                        }}>
                                                    <i className="icon-bin"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (store) => {
    const {products} = store.purchaseReturnStore;
    return {products};
}

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (id) => dispatch({type: PURCHASE_RETURN_CART_REMOVE, payload: {id}}),
        changeReturnQty: (id, return_quantity) => dispatch({
            type: CHANGE_PURCHASE_RETURN_QUANTITY,
            payload: {id, return_quantity}
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnItemList);