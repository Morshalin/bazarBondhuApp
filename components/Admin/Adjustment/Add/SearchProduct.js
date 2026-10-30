import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import axios from "axios";
import {ADD_ADJUSTMENT} from "../../../../store/admin/actions/adjustment/adjustmentAction";
import Link from "next/link";
// import {SET_AUTHORIZATION} from "../../../../store/permission/actions/permissionActions";

const SearchProduct = (props) => {

    const [searchProductList, setSearchProductList] = useState(null);
    const [word, setWord] = useState(null);

    useEffect(() => {
        document.getElementById('search_products').focus();
    }, []);


    const WAIT_INTERVAL = 500;
    const ENTER_KEY = 13;
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

        let response = await axios.post(`/backend/pos-product-search`, {
            search_keyword: keyword
        }).then(result => {
            return result.data;
        }).catch(err => {
            return err;
        });

        if (response.success) {

            let product = response.data && response.data.find(item => item.barcode === keyword);
            product ? props.addAdjustment(product) : setSearchProductList(response.data);
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
                                   autoComplete="off"
                            />


                            <div className="input-group-prepend">
                                <button className="input-group-text">
                                    <Link legacyBehavior href={`/admin/product/add`}>
                                        <a className="fbh-btn" title="Add New Product">
                                            <i className="icon-plus-square-regular"/>
                                        </a>
                                    </Link>
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
                                                    props.addAdjustment(product);
                                                }}>
                                                    {product.name} ({product.barcode})
                                                </li>
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
        addAdjustment: (product) => {
            dispatch({type: ADD_ADJUSTMENT, payload: {product}}), document.getElementById('search_products').value = '';
        },
    };
}

export default connect(null, mapDispatchToProps)(SearchProduct);