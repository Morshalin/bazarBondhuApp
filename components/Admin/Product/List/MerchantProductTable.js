/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/scope */
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loader from "react-loader";
import ReactPaginate from "react-paginate";
import { options } from "../../../../Helpers/Utils/Utils";
import useDebounce from "../custom-hook/use-debounce";
import ProductDataModal from "./productDataModal";
import ReactPlaceholder from "../../../Ui/placeholder/placeholder";
import ProductHeadList from "./ProductHeadList";

const MerchantProductTable = () => {
  //   const [paginationMeta, setPaginationMeta] = useState();
  //   const [listPerPage, setListPerPage] = useState();
  const [productList, setProductList] = useState();
  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const action = "withoutPermision";

  const [searchingKeyWord, setSearchingKeyWord] = useState("");
  const [productDetails, setProductDetails] = useState("");

  //   const debouncedSearch = useDebounce(searchingKeyWord, 1000);

  //   const [searchingFlag, setSearchingFlag] = useState(false);

  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(
        `backend/getAllProduct?page=${page}&show=${show}&searchKeyword=${encodeURIComponent(
          searchingKeyWord
        )}&column=${column}&orderBy=${orderBy}`
      )
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          setMeta(res.data.data.meta);
          //   setListPerPage(res.data.data.meta.per_page);
          setProductList(res.data.data.data);
          setIsLoading(true);
        }
      });
  }, [page, show, searchingKeyWord, column, orderBy]);

  //   useEffect(() => {
  //     if (debouncedSearch) {
  //       setSearchingFlag(false);
  //       setPaginationMeta("");
  //       getProductList("", listPerPage);
  //     }
  //     if (searchingFlag) {
  //       setSearchingFlag(false);
  //       setPaginationMeta("");
  //       getProductList("", listPerPage);
  //     }
  //   }, [debouncedSearch]);

  //   const getProductList = async (pageNumber, showingNumber) => {
  //     showingNumber && setListPerPage(showingNumber);
  //     setIsLoading(false);
  //     try {
  //       const productApiUrl = pageNumber
  //         ? `${
  //             process.env.api_backend_url
  //           }/getAllProduct?page=${pageNumber}&show=${showingNumber}${
  //             searchingKeyWord &&
  //             `&searchKeyword=${encodeURIComponent(searchingKeyWord)}`
  //           }`
  //         : `${process.env.api_backend_url}/getAllProduct?show=${
  //             showingNumber ?? listPerPage
  //           }${
  //             searchingKeyWord &&
  //             `&searchKeyword=${encodeURIComponent(searchingKeyWord)}`
  //           }`;
  //       const listOfProduct = await axios.get(productApiUrl);
  //       setProductList(listOfProduct.data.data.data);
  //       setPaginationMeta(listOfProduct.data.data.meta);
  //       setIsLoading(true);
  //     } catch (error) {
  //       setProductList("");
  //       setPaginationMeta("");
  //       setIsLoading(true);
  //     }
  //   };

  //   const handleSearch = (event) => {
  //     event.preventDefault();
  //     if (event.target.value.length === 0) {
  //       setSearchingFlag(true);
  //     }
  //     setSearchingKeyWord(event.target.value);
  //   };

  //   const handleProductShowPerPage = (event) => {
  //     event.preventDefault();
  //     setPaginationMeta("");
  //     getProductList(null, event.target.value);
  //   };

  //   const handlePageChange = (pageNumber) => {
  //     const selected = parseInt(pageNumber.selected + 1);
  //     getProductList(selected, listPerPage);
  //   };

  // const callAsyncProductDetails = async (productId, productListIndex) => {
  // 	try {
  // 		const productPurchaseList = await showPurchaseProductApi(productId)
  // 		const productSaleList = await showSaleProductApi(productId)
  // 		setProductDetails({
  // 			...productList[productListIndex],
  // 			product_purchase_list: productPurchaseList.data,
  // 			product_sale_list: productSaleList.data,
  // 		})
  // 	} catch (errorExceptions) {
  // 		console.log(errorExceptions)
  // 	}
  // }

  const handleTableRowDoubleClick = (productListIndex) => {
    // callAsyncProductDetails(productId, productListIndex)
    setProductDetails(productList[productListIndex]);
    // eslint-disable-next-line no-undef
    $("#myModal").modal("show");
  };

  return (
    <>
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>Product List</h2>
                    {/*<Link href={`/admin/product/upload-product`}>*/}
                    {/*	<a*/}
                    {/*		className='ml-auto px-2'*/}
                    {/*		title='Import Product'*/}
                    {/*		style={{ borderLeft: '1px solid #dddddd' }}*/}
                    {/*	>*/}
                    {/*		<i class='fas fa-file-import' />*/}
                    {/*		Import Product*/}
                    {/*	</a>*/}
                    {/*</Link>*/}
                    <Link legacyBehavior href={`/admin/product/add`}>
                      <a
                        className="ml-auto px-2"
                        title="Add New Product"
                        style={{ borderLeft: "1px solid #dddddd" }}
                      >
                        <i className="icon-plus-square-regular" /> Add Product
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
                          defaultValue={10}
                          onChange={(event) => {
                            setPage(1);
                            setMeta("");
                            setShow(+event.target.value);
                          }}
                        >
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
                          placeholder="search product by name"
                          onChange={(event) => {
                            setTimeout(() => {
                              setMeta("");
                              setSearchingKeyWord(event.target.value);
                              setPage(1);
                            }, 500);
                          }}
                          title="search product by name"
                          style={{ width: "300px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="table-responsive custom-table">
                        <table className="table table-bordered table-hover">
                          <ProductHeadList
                            column={column}
                            orderBy={orderBy}
                            setColumn={setColumn}
                            setOrderBy={setOrderBy}
                            action={action}
                          />
                          <tbody>
                            {!isLoading ? (
                              <tr>
                                <td colSpan={7}>
                                  <ReactPlaceholder
                                    showLoadingAnimation={true}
                                    type={"textRow"}
                                    rows={10}
                                    ready={isLoading}
                                    className="my-2"
                                    style={{ height: "24px" }}
                                  />
                                </td>
                              </tr>
                            ) : productList && productList.length > 0 ? (
                              productList.map((product, index) => (
                                <tr
                                  key={`product_${product.id}`}
                                  id={`product_${product.id}`}
                                  className={
                                    product.status === "0"
                                      ? "bg-inactive"
                                      : product.stock <=
                                        product.low_quantity_alert
                                      ? "bg-low-qnty"
                                      : ""
                                  }
                                  onDoubleClick={(event) => {
                                    handleTableRowDoubleClick(index);
                                  }}
                                >
                                  <td scope="row" className="text-center">
                                    {meta.from ? index + meta.from : ""}
                                  </td>
                                  <td className="text-center">
                                    <img
                                      src={product.feature_image}
                                      alt={product.name}
                                    />
                                  </td>
                                  <td className="nowrap">{product.name}</td>
                                  <td className="nowrap text-center">
                                    {product.selling_price}
                                  </td>
                                  <td className="nowrap text-center">
                                    {product.stock}
                                  </td>
                                  <td className="text-center">
                                    {product.status === "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </td>
                                  <td className="text-center">
                                    <div className="dropdown action-btn-group">
                                      <button
                                        className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Actions
                                      </button>
                                      <div className="dropdown-menu">
                                        <Link legacyBehavior
                                          href={`product/edit/${product.id}`}
                                        >
                                          <a className="dropdown-item">
                                            <i className="icon-pencil-alt text-primary" />{" "}
                                            Edit
                                          </a>
                                        </Link>
                                        <Link legacyBehavior
                                          href={`product/copy/${product.id}`}
                                        >
                                          <a className="dropdown-item">
                                            <i className="fas fa-copy" /> Copy
                                          </a>
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="text-center">
                                  No Product Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      {meta && (
                        <nav
                          aria-label="Page navigation example"
                          className="d-flex justify-content-center"
                        >
                          <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={meta.last_page}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={(pageNumber) => {
                              setPage(+pageNumber.selected + 1);
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
                            breakLinkClassName={"page-link"}
                          />
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
      <ProductDataModal productDetails={productDetails} />
    </>
  );
};

export default MerchantProductTable;
