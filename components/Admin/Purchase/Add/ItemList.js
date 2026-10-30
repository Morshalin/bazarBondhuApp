import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    ADD_PRODUCT_EXPIRE_DATE,
    ADD_PRODUCT_MRP,
    ADD_PRODUCT_QTY, ADD_PRODUCT_UNIT,
    ADD_PRODUCT_UNIT_PRICE,
    REMOVE_PRODUCT
} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";
import {getActions} from "../../../../Helpers/Utils/Utils";

const ItemList = (props) => {

    const [units, setUnits] = useState([]);

    useEffect(() => {
        let fetched = true;
        fetched && getActions(`backend/units`, false)
            .then((res) => {
                setUnits(res.data);
            }).finally(() => fetched = false);
    }, []);

    

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="table-responsive custom-table mb-2">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity <span className="text-danger"> * </span></th>
                                <th scope="col">Unit <span className="text-danger"> * </span></th>
                                <th scope="col">Unit Cost <span className="text-danger"> * </span></th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">Last Purchase Price</th>
                                <th scope="col">MRP <span className="text-danger"> * </span></th>
                                <th scope="col">Expire Date</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                props.products && props.products.map((product, index) => (

                                    <tr key={index}>

                                        <td>{++index}</td>

                                        <td>
                                            <img src={product.image} alt=""/>
                                        </td>

                                        <td className="text-center">{product.name}</td>

                                        <td className="text-center">
                                            <input
                                                type="number"
                                                placeholder={product.quantity}
                                                className={props.isChecked ? (!product.quantity && `error_border`) : ``}
                                                title="Enter quantity"
                                                value={product.quantity ? product.quantity : ''}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    props.addQuantity(product.id, e.target.value);
                                                    props.addProductUnit(product.id, units[0].id);

                                                }}
                                            />
                                        </td>

                                        <td className="text-center">
                                            <select
                                                className="custom-select"
                                                style={{width:"70px"}}
                                                id="unit_id"
                                                name="unit_id"
                                                disabled={product.unit_id_check}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    props.addProductUnit(product.id, e.target.value);
                                                }}
                                                value={product.unit_id_check>0 ? product.unit_id_check : product.unit_id}
                                                aria-label="Unit Select">
                                                {
                                                    units?.map((item) => (
                                                        <option value={item.id}>{item.unit_code}</option>
                                                    ))
                                                }

                                            </select>
                                        </td>

                                        <td className="text-center">

                                            <input
                                                type="number"
                                                placeholder={product.unit_price}
                                                className={props.isChecked ? (!product.unit_price && `error_border`) : ``}
                                                title="Enter Unit Price"
                                                value={product.unit_price ? product.unit_price : ''}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    props.addUnitPrice(product.id, e.target.value);
                                                }}
                                            />

                                        </td>

                                        <td className="text-center">

                                            <input
                                                type="text"
                                                placeholder="0.00"
                                                value={(product.unit_price * product.quantity).toFixed(2)}
                                                readOnly={true}/>

                                        </td>

                                        <td className="text-center">

                                            {product?.purchase_price > 0 ? product?.purchase_price : ''}

                                        </td>

                                        <td className="text-center">

                                            <input
                                                type="number"
                                                placeholder={product?.mrp > 0 ? product?.mrp : 0}
                                                className={props.isChecked ? (!product.mrp && `error_border`) : ``}
                                                title="Enter MRP"
                                                value={product?.mrp > 0 ? product?.mrp : ''}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    props.addMrp(product.id, e.target.value);
                                                }}
                                            />

                                        </td>

                                        <td className="text-center">
                                            <input
                                                className="customs-date"
                                                type="date"
                                                value={product.expire_date}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    props.addExpireDate(product.id, e.target.value);
                                                }}
                                            />
                                        </td>


                                        <td className="actions">
                                            <div className="action-wrap">

                                                <button
                                                    className="action-delete"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        props.remove(product.id);
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

const mapDispatchToProps = (dispatch) => {

    return {
        addQuantity: (id, quantity) => dispatch({type: ADD_PRODUCT_QTY, payload: {id, quantity}}),
        addProductUnit: (id, unit_id) => dispatch({type: ADD_PRODUCT_UNIT, payload: {id, unit_id}}),
        addUnitPrice: (id, unit_price) => dispatch({type: ADD_PRODUCT_UNIT_PRICE, payload: {id, unit_price}}),
        addMrp: (id, mrp) => dispatch({type: ADD_PRODUCT_MRP, payload: {id, mrp}}),
        addExpireDate: (id, expire_date) => dispatch({type: ADD_PRODUCT_EXPIRE_DATE, payload: {id, expire_date}}),
        remove: (id) => dispatch({type: REMOVE_PRODUCT, payload: {id}}),
    }
}
const mapStateToProps = (store) => {
    const {products} = store.uPurchaseCart;
    console.log(products);
    return {products};

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList)