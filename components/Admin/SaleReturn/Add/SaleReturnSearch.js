import React, {useState} from 'react';
import axios from "axios";
import {SET_PRODUCTS} from "../../../../store/pos/actions/posProductActions";
import {POS_ADD_TO_CART, SET_SEARCH_KEYWORDS} from "../../../../store/pos/actions/posCartActions";
import {connect} from "react-redux";
import {SALE_RETURN_ADD_TO_CART} from "../../../../store/admin/actions/saleReturn/saleReturnCartAction";

const SaleReturnSearch = (props) => {

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
                        <label>Search Product</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="icon-barcode"/>
                                </div>
                            </div>

                            <input type="text"
                                   id="search_products"
                                   className="form-control border-right-0"
                                   onChange={searchProducts}
                                   placeholder="Please search products to order list"
                                   value={word ?? ""}
                                   autoComplete="off"/>

                            <div className="input-group-prepend">
                                <button className="input-group-text">
                                    <i className="icon-plus-square-regular"/>
                                </button>
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
                                                     props.saleReturnAddToCart(product);
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

//export default SaleReturnSearch;
const mapDispatchToProps = (dispatch) => {
    return {
        saleReturnAddToCart: (product) => {
            dispatch({type: SALE_RETURN_ADD_TO_CART, payload: {product}})
            document.getElementById('search_products').value = '';
        },
    }
}

export default connect(null, mapDispatchToProps)(SaleReturnSearch);