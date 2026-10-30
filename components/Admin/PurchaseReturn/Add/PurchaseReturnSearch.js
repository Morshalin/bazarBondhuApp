import React, {useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {PURCHASE_RETURN_CART} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnAction";

const PurchaseReturnSearch = (props) => {

    const [searchProductList, setSearchProductList] = useState(null);
    const [word, setWord] = useState(null);

    const WAIT_INTERVAL = 500;
    let keyword;
    let timer = null;

    const searchProducts = (e) => {
        e.preventDefault();
        clearTimeout(timer);
        keyword = e.target.value;
        setWord(keyword)
        timer = setTimeout(getProducts, WAIT_INTERVAL);
    }

    const getProducts = async () => {

        let response = await axios.post(`backend/search/products`, {
            search_keyword: keyword
        }).then((result) => (result.data)).catch((err) => (err));

        if (response.success) {
            setSearchProductList(response.data);
        }
    }


    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group custom-sr-box">
                        <label>Search Product <span className="text-danger"> * </span></label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="icon-barcode"/>
                                </div>
                            </div>

                            <input type="text"
                                   id="search_products"
                                   className={`form-control border-right-0 ${props.errors.products_error ? `is-invalid` : ``}`}
                                   onChange={searchProducts}
                                   placeholder="Please search products to order list"
                                   value={word ?? ""}
                                   autoComplete="off"/>

                            <div className="input-group-prepend">
                                <button className="input-group-text">
                                    <i className="icon-plus-square-regular"/>
                                </button>
                            </div>

                            <div
                                className={props.errors.products_error ? `invalid-feedback` : `d-none`}>
                                {props.errors.products_error}
                            </div>
                        </div>

                        {
                            (searchProductList && searchProductList.length > 0) ?
                                (
                                    <ul className="src-ul">
                                        {
                                            searchProductList && searchProductList.map((product, index) => (
                                                <li key={index} value={product.id} onClick={(event) => {
                                                    event.preventDefault();
                                                    setWord('');
                                                    setSearchProductList('');
                                                    props.addPurchaseReturn(product);
                                                }}>{product.name}</li>
                                            ))
                                        }

                                    </ul>
                                ) : ''
                        }

                    </div>
                </div>

            </div>
        </>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        addPurchaseReturn: (product) => dispatch({type: PURCHASE_RETURN_CART, payload: {product}}),
    }
}

const mapStateToProps = (store) => {
    const {errors} = store.purchaseReturnStore;
    return {errors};
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnSearch);