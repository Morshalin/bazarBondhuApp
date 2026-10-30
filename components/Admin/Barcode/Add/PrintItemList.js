import React from 'react';
import {connect} from "react-redux";
import {CHANGE_PRINT_QTY, REMOVE_PRODUCT} from "../../../../store/admin/actions/barcode/printBarcodeAction";

const PrintItemList = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-responsive custom-table mb-2">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Barcode</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">
                                    <i className="fas fa-trash"></i>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.products &&
                            props.products.map((product, index) => (
                                <tr key={++index}>
                                    <td>
                                        <img src={product.image} alt=""/>
                                    </td>

                                    <td className="nowrap">
                                        {product.name}
                                    </td>

                                    <td>
                                        {product.barcode}
                                    </td>

                                    <td className={`text-center`}>
                                        <input
                                            type="number"
                                            placeholder={'00'}
                                            value={product.qty ? product.qty : ''}
                                            onChange={(event) => {
                                                props.changeQty(product.id, event.currentTarget.value);
                                            }}
                                        />
                                    </td>


                                    <td className="actions">
                                        <div className="action-wrap">
                                            <button
                                                className="action-delete"
                                                onClick={(event) => {
                                                    props.removeProduct(product.id);
                                                }}>
                                                <i className="icon-bin"/>
                                            </button>
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

const mapStateToProps = (store) => {
    const {products} = store.printBarcodeStore;
    return {products};
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeQty: (id, qty) => dispatch({type: CHANGE_PRINT_QTY, payload: {id, qty}}),
        removeProduct: (id) => dispatch({type: REMOVE_PRODUCT, payload: {id}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintItemList);