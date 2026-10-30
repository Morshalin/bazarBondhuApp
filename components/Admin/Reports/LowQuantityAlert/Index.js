import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
import {options} from "../../../../Helpers/Utils/Utils";

const Index = () => {
    const [show, setShow] = useState(10);
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(1);
    const [lowQuantityProducts, setLowQuantityProducts] = useState('');
    const [loaded, setLoaded] = useState(false);


    useEffect(() => { (async () => {
        await lowQuantityAlert();

    })(); }, [show, keywords, page]);

    const lowQuantityAlert = async () => {
        let response = await axios.get(`/backend/low-quantity?page=${page}&show=${show}&keywords=${keywords}`).then((result) => {
            return result.data;
        }).catch((error) => {
            return error;
        });
        if (response.success) {
            setLoaded('true')
            setLowQuantityProducts(response.data.data);
            setMeta(response.data.meta);
        }
    }
    const productHandler = async (index) => {
        let response = await axios.post(`${api_url}/admin/products/product-active-status/`, lowQuantityProducts[index].id)
            .then((result) => {
                return result.data;
            }).catch((error) => {
                return error;
            });

        if (response.success) {
            lowQuantityProducts.splice(index, 1);
            setLowQuantityProducts(lowQuantityProducts);
        }
    }

    return (
        <>
            <Loader loaded={loaded} options={options} className="spinner">

                <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-list2"/>
                                        <h2>Low Quantity Product List</h2>
                                        <Link legacyBehavior href={`/admin/purchase/add`}>
                                            <a className="fbh-btn" title="Add Purchase">
                                                <i className="icon-plus-square-regular"/>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="custom-card-box-content">
                                    <div className="row table-top-option mb-3">
                                        <div className="col-sm-6">
                                            <div className="showing-table-row">
                                                <label className="">Show</label>
                                                <select
                                                    className="custom-select"
                                                    defaultValue={`10`}
                                                    onChange={(event) => {
                                                        setMeta('');
                                                        setShow(event.target.value);
                                                    }}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="table-search">
                                                <label className="">Search</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search expired product"
                                                    style={{width: "200px"}}
                                                    onChange={(event) => {
                                                        setTimeout(() => {
                                                            setMeta('');
                                                            setKeywords(event.target.value);
                                                            setPage(1);
                                                        }, 500);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="table-responsive custom-table">
                                                <table
                                                    className="table table-bordered table-hover text-center">
                                                    <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">SL</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Sell price</th>
                                                        <th scope="col">Purchase quantity</th>
                                                        <th scope="col">Sell quantity</th>
                                                        <th scope="col">Current stock</th>
                                                        {/*<th scope="col">In stock</th>*/}
                                                        {/*<th scope="col">Status</th>*/}
                                                        {/*<th scope="col">Action</th>*/}
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {lowQuantityProducts && lowQuantityProducts.map((product, index) => (
                                                        <tr
                                                            key={product.id}
                                                            id={`category_row_${product.id}`}
                                                        >
                                                            <td scope="row">
                                                                {meta.from ? (meta.from + index) : ''}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={product.feature_image}
                                                                    alt={product.name}
                                                                />
                                                            </td>
                                                            <td className="nowrap">{product.name}</td>
                                                            <td scope="row">
                                                                {product.selling_price}
                                                            </td>
                                                            <td scope="row">
                                                                {product.purchase_qty}
                                                            </td>
                                                            <td scope="row">
                                                                {product.selling_qty}
                                                            </td>
                                                            <td scope="row">
                                                                {product.purchase_qty - product.selling_qty}
                                                            </td>
                                                            {/*<td>*/}
                                                            {/*    <i*/}
                                                            {/*        className={`icon-check-circle-solid ${*/}
                                                            {/*            product.in_stock ? `text-success` : `text-danger`*/}
                                                            {/*        }`}*/}
                                                            {/*        id={`in_stock_${product.id}`}*/}
                                                            {/*    />*/}
                                                            {/*</td>*/}
                                                            {/*<td>*/}
                                                            {/*    <i*/}
                                                            {/*        className={`icon-check-circle-solid ${*/}
                                                            {/*            product.active ? `text-success` : `text-danger`*/}
                                                            {/*        }`}*/}
                                                            {/*        id={`status_${product.id}`}*/}
                                                            {/*    />*/}
                                                            {/*</td>*/}
                                                            {/*<td className="text-center">*/}
                                                            {/*    <div className="dropdown action-btn-group">*/}
                                                            {/*        <button*/}
                                                            {/*            className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"*/}
                                                            {/*            type="button"*/}
                                                            {/*            data-toggle="dropdown"*/}
                                                            {/*            aria-haspopup="true"*/}
                                                            {/*            aria-expanded="false"*/}
                                                            {/*        >*/}
                                                            {/*            Actions*/}
                                                            {/*        </button>*/}
                                                            {/*        <div className="dropdown-menu">*/}
                                                            {/*            <Link*/}
                                                            {/*                href={`/admin/product/edit/${product.id}`}*/}
                                                            {/*            >*/}
                                                            {/*                <a className="dropdown-item">*/}
                                                            {/*                    <i className="icon-pencil-alt text-primary" />{" "}*/}
                                                            {/*                    Edit*/}
                                                            {/*                </a>*/}
                                                            {/*            </Link>*/}
                                                            {/*            <div className="dropdown-divider" />*/}
                                                            {/*            <a*/}
                                                            {/*                className="dropdown-item"*/}
                                                            {/*                href="#"*/}
                                                            {/*                onClick={(event) => {*/}
                                                            {/*                    productHandler(index);*/}
                                                            {/*                }}*/}
                                                            {/*            >*/}
                                                            {/*                <i*/}
                                                            {/*                    id={`pubUnpubIcon${product.id}`}*/}
                                                            {/*                    className={*/}
                                                            {/*                        product.active*/}
                                                            {/*                            ? `icon-sphere text-danger`*/}
                                                            {/*                            : `icon-sphere text-success`*/}
                                                            {/*                    }*/}
                                                            {/*                />*/}
                                                            {/*                <span id={`pubUnpub${product.id}`}>*/}
                                                            {/*                  {product.active*/}
                                                            {/*                      ? "Unpublish"*/}
                                                            {/*                      : "Publish"}*/}
                                                            {/*                </span>*/}
                                                            {/*            </a>*/}
                                                            {/*        </div>*/}
                                                            {/*    </div>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            {meta && (
                                                <nav
                                                    aria-label="Page navigation example"
                                                    className="d-flex justify-content-center">
                                                    <ReactPaginate
                                                        previousLabel={"Previous"}
                                                        nextLabel={"Next"}
                                                        breakLabel={"..."}
                                                        pageCount={meta.last_page}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={2}
                                                        onPageChange={(pageNumber) => {
                                                            setPage((pageNumber.selected + 1))
                                                        }}
                                                        containerClassName={"pagination"}
                                                        pageClassName={"page-item"}
                                                        pageLinkClassName={"page-link"}
                                                        activeClassName={"active"}
                                                        previousClassName={"page-item"}
                                                        previousLinkClassName={"page-link"}
                                                        nextClassName={"page-item"}
                                                        nextLinkClassName={"page-link"}
                                                        breakClassName={"page-item"}
                                                        breakLinkClassName={"page-link"}/>
                                                </nav>
                                            )}
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </Loader>
        </>
    );
};
export default Index;
