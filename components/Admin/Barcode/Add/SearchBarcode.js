import React, {useEffect, useState} from 'react';
import Link from "next/link";
import axios from "axios";
import {connect} from "react-redux";
import {ADD_PRODUCT_TO_PRINT_BARCODE} from "../../../../store/admin/actions/barcode/printBarcodeAction";

const SearchBarcode = (props) => {

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

        let response = await axios.post(`/backend/barcode-product-search`, {
            search_keyword: keyword
        }).then((result) => result.data).catch((errors) => errors);

        if (response.success) {
            let product = response.data && response.data.find(item => item.barcode === keyword);

            if (product) {
                props.addProductToPrint(product)
            } else {
                (keyword.length > 1) ? setSearchProductList(response.data) : setSearchProductList([]);
            }

            // product ? props.addProductToPrint(product) : setSearchProductList(response.data);

            // console.log(keyword.length);
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
                                                    props.addProductToPrint(product);
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
        addProductToPrint: (product) => {
            dispatch({
                type: ADD_PRODUCT_TO_PRINT_BARCODE,
                payload: {product}
            }), document.getElementById('search_products').value = ''
        }
    }
}


export default connect(null, mapDispatchToProps)(SearchBarcode);
