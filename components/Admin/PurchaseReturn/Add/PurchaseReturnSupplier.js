import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {PURCHASE_RETURN_SET_SUPPLIER} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";

const PurchaseReturnSupplier = (props) => {

    const [supplierList, setSupplierList] = useState([]);

    useEffect(() => {

        let fetched = true;

        fetchSupplier().then((result) => {
            if (fetched) {
                setSupplierList(result.data);
            }
        }).finally(() => {
            fetched = false;
        })
    }, []);


    const fetchSupplier = async () => {
        return await axios.get(`/backend/users`).then((response) => (response.data)).catch((errors) => (errors));
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Supplier  <span className="text-danger"> * </span></label>
                        <div className="input-group">
                            <select
                                className={`custom-select form-control ${props.errors.status_error ? `is-invalid` : ``}`}
                                onChange={(e) => {
                                    e.preventDefault();
                                    props.setSupplier(e.target.value);
                                }}>

                                <option value="">Select Supplier</option>

                                {
                                    supplierList && supplierList.map((supplier) => (
                                        <option value={supplier.id} key={supplier.id}>{supplier.name}</option>
                                    ))
                                }

                            </select>
                            <div className="input-group-append">
                                <button className="input-group-text" type="button">
                                    <i className="icon-eye-solid"/>
                                </button>
                            </div>
                            <div className="input-group-append">
                                <button className="input-group-text" type="button">
                                    <i className="icon-plus-square-regular"/>
                                </button>
                            </div>
                            <div
                                className={props.errors.supplier_id_error ? `invalid-feedback` : `d-none`}>
                                {props.errors.supplier_id_error}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSupplier: (supplier_id) => dispatch({type: PURCHASE_RETURN_SET_SUPPLIER, payload: {supplier_id}})
    }
}

const mapStateToProps = (store) => {
    const {errors} = store.purchaseReturnStore;
    return {errors};
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnSupplier);