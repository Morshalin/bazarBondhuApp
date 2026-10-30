import React from 'react';
import {POS_DECREASE, POS_INCREASE, POS_REMOVE} from "../../../../store/pos/actions/posCartActions";
import {connect} from "react-redux";
import CartItem from "../../Pos/CartItem";
import {
    SALE_RETURN_ADD_QUANTITY,
    SALE_RETURN_REMOVE
} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";

const SaleReturnItemList = (props) => {
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
                                <th scope="col">Quantity *</th>
                                <th scope="col">Unit Cost</th>
                                <th scope="col">SubTotal *</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {props.saleReturnCart.products.length > 0 && props.saleReturnCart.products.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.image}
                                             alt={item.name}/>
                                    </td>

                                    <td className="nowrap">
                                        {item.name}
                                    </td>


                                    <td className="text-center">

                                        <input type="text" placeholder="0"
                                               defaultValue={item.quantity}
                                               onChange={(event) => {
                                                   event.preventDefault();
                                                   props.addQuantity(item.id , event.target.value)
                                               }}
                                        />

                                    </td>

                                    <td>
                                        <input type="number" placeholder="0.00"
                                               value={item.unit_price}
                                               readOnly={true}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" placeholder="0.00" value={item.sub_total} readOnly={true}/>
                                    </td>

                                    <td className="actions">
                                        <div className="action-wrap">
                                            <button className="action-delete"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        props.remove(item.id);
                                                    }}
                                            >
                                                <i className="icon-bin"/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

function mapDispatchToProps(dispatch) {

    return {
        addQuantity: (id,quantity) => dispatch({type: SALE_RETURN_ADD_QUANTITY, payload: {id,quantity}}),
        remove: (id) => dispatch({type: SALE_RETURN_REMOVE, payload: {id}})
    }
}
const mapStateToProps = (store) => {
    const saleReturnCart = store.saleReturnCart;
    return {saleReturnCart};
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnItemList);