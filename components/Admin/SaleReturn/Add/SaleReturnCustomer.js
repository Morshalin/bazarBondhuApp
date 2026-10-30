import React, {useEffect, useState} from 'react';
import axios from "axios";
import {POS_SET_CUSTOMER} from "../../../../store/pos/actions/posCartActions";
import {connect} from "react-redux";
import {SALE_RETURN_SET_CUSTOMER} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";

const SaleReturnCustomer = (props) => {

    const [customerList, setCustomerList] = useState('');

    useEffect(() => {

        let fetched = true;

        fetchedCustomer().then((result) => {
            if (fetched) {
                setCustomerList(result.data.map(({id, name}) => ({id, name})));
            }
        }).finally(() => {
            fetched = false;
        })
    }, []);

    const fetchedCustomer = async () => {
        return await axios.get(`/backend/users`).then((response) => (response.data)).catch((errors) => (errors));
    }
    console.log(props)

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Customer *</label>
                        <div className="input-group">

                            <select
                                value={props.saleReturnCart.customer_id}
                                onChange={(e) =>  props.setCustomer(e.target.value)}
                                className="custom-select">

                                <option value="">Select Customer</option>

                                {
                                    customerList && customerList.map((customer) => (
                                        <option value={customer.id} key={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))
                                }

                            </select>


                            {/*<Select*/}
                            {/*    className="custom-select"*/}
                            {/*    defaultValue={customerList[0]}*/}
                            {/*    isDisabled={false}*/}
                            {/*    isLoading={false}*/}
                            {/*    isClearable={true}*/}
                            {/*    isSearchable={true}*/}
                            {/*    options={customerList}*/}
                            {/*/>*/}

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

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// export default SaleReturnCustomer;
const mapDispatchToProps = (dispatch) => {
    return {
        setCustomer: (user_id) => {
            console.log(user_id);
            dispatch({type: SALE_RETURN_SET_CUSTOMER, payload: {user_id}});
        },
    };
}
const mapStateToProps = (store) => {
    const saleReturnCart = store.saleReturnCart;
    return {saleReturnCart};
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleReturnCustomer);