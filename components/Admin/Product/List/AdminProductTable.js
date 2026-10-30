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
import MyError from "../../Notification/MyError";
import MySuccess from "../../Notification/MySuccess";
import ReactPlaceholder from "../../../Ui/placeholder/placeholder";
import ProductHeadList from "./ProductHeadList";

const AdminProductTable = ({ serverPermissions }) => {
  // const [paginationMeta, setPaginationMeta] = useState(products.meta);
  // const [listPerPage, setListPerPage] = useState(products.meta.per_page);
  const [productList, setProductList] = useState();

  const [showProduct, setShowProduct] = useState("global");
  const [searchingKeyWord, setSearchingKeyWord] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [column, setColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("DESC");
  const action = "asPermision";
  // const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  // const debouncedSearch = useDebounce(searchingKeyWord, 1000);

  // const [searchingFlag, setSearchingFlag] = useState(false);

  const hasMenuPermission = (module, permission_type) => {
    let isExists = false;
    serverPermissions &&
      serverPermissions.map((perm, index) => {
        if (
          perm.module === module &&
          perm.permission_type === permission_type
        ) {
          isExists = true;
        }
      });

    return isExists;
  };

  const [show, setShow] = useState(10);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProductGlobal, setIsProductGlobal] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(
        `backend/getAllProduct?page=${page}&show=${show}&searchKeyword=${encodeURIComponent(
          searchingKeyWord
        )}&product_scope=${showProduct}&column=${column}&orderBy=${orderBy}`
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
  }, [
    page,
    show,
    searchingKeyWord,
    showProduct,
    isProductGlobal,
    column,
    orderBy,
  ]);

  // useEffect(() => {
  //   if (debouncedSearch) {
  //     setSearchingFlag(false);
  //     setPaginationMeta("");
  //     getProductList("", listPerPage);
  //   }
  //   if (searchingFlag) {
  //     setSearchingFlag(false);
  //     setPaginationMeta("");
  //     getProductList("", listPerPage);
  //   }
  // }, [debouncedSearch]);

  // const getProductList = async (pageNumber, showingNumber, productShowing) => {
  //   console.log(showProduct);
  //   showingNumber && setListPerPage(showingNumber);
  //   productShowing && setShowProduct(productShowing);
  //   try {
  //     const productApiUrl = pageNumber
  //       ? `${
  //           process.env.api_backend_url
  //         }/getAllProduct?page=${pageNumber}&show=${showingNumber}${
  //           searchingKeyWord &&
  //           `&searchKeyword=${encodeURIComponent(searchingKeyWord)}`
  //         }&product_scope=${productShowing ?? showProduct}`
  //       : `${process.env.api_backend_url}/getAllProduct?show=${
  //           showingNumber ?? listPerPage
  //         }${
  //           searchingKeyWord &&
  //           `&searchKeyword=${encodeURIComponent(searchingKeyWord)}`
  //         }&product_scope=${productShowing ?? showProduct}`;
  //     const listOfProduct = await axios.get(productApiUrl);
  //     setProductList(listOfProduct.data.data.data);
  //     setPaginationMeta(listOfProduct.data.data.meta);
  //   } catch (error) {
  //     setProductList("");
  //     setPaginationMeta("");
  //   }
  // };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   if (event.target.value.length === 0) {
  //     setSearchingFlag(true);
  //   }
  //   setSearchingKeyWord(event.target.value);
  // };

  // const handleProductShowPerPage = (event) => {
  //   event.preventDefault();
  //   setPaginationMeta("");
  //   getProductList(null, event.target.value, null);
  // };

  // const handleProductShow = (event) => {
  //   event.preventDefault();
  //   setPaginationMeta("");
  //   getProductList(null, null, event.target.value);
  // };

  // const handlePageChange = (pageNumber) => {
  //   const selected = parseInt(pageNumber.selected + 1);
  //   setSelectedPageNumber(selected);
  //   getProductList(selected, listPerPage, showProduct);
  // };

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

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const resetSuccessMessage = () => {
    setSuccessMessage({
      ...successMessage,
      status: false,
      message: "",
    });
  };

  const resetErrorMessage = () => {
    setErrorMessage({
      ...errorMessage,
      status: false,
      message: "",
    });
  };

  const makeProductGlobal = (productId) => {
    axios
      .post(`/backend/make-product-global/${productId}`)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessage({
            ...successMessage,
            status: true,
            message: response.data.message,
          });
          setIsProductGlobal((prevState) => !prevState);
        } else {
          setErrorMessage({
            ...errorMessage,
            status: true,
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage({
          ...errorMessage,
          status: true,
          message: response.data.message,
        });
      });
  };

  // console.log(showProduct);
  // console.log(searchingKeyWord);
  // console.log(page);

  return (
    <>
      {successMessage.status && (
        <MySuccess
          message={successMessage.message}
          resetSuccesMessage={resetSuccessMessage}
        />
      )}

      {errorMessage.status && (
        <MyError
          message={errorMessage.message}
          resetErrorMessage={resetErrorMessage}
        />
      )}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-list2" />
                    <h2>Product Lists</h2>
                    {/*<Link href={`/admin/product/upload-product`}>*/}
                    {/*	<a*/}
                    {/*		className='ml-auto px-2'*/}
                    {/*		title='Import Product'*/}
                    {/*		style={{ borderLeft: '1px solid #dddddd' }}*/}
                    {/*	>*/}
                    {/*		<i className='fas fa-file-import' />*/}
                    {/*		Import Product*/}
                    {/*	</a>*/}
                    {/*</Link>*/}
                    {hasMenuPermission("product", "add") && (
                      <Link legacyBehavior href={`/admin/product/add`}>
                        <a
                          className="ml-auto px-2"
                          title="Add New Product"
                          style={{ borderLeft: "1px solid #dddddd" }}
                        >
                          <i className="icon-plus-square-regular" /> Add Product
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="custom-card-box-content">
                  <div className="row table-top-option mb-3">
                    <div className="col-sm-4">
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

                    <div className="col-sm-4">
                      <div className="showing-table-row">
                        <select
                          className="custom-select"
                          defaultValue={showProduct}
                          onChange={(event) => {
                            event.preventDefault();
                            setMeta("");
                            setPage(1);
                            setShowProduct(event.target.value);
                          }}
                          style={{ width: "50%" }}
                        >
                          <option value="all">All Product</option>
                          <option value="global">Product Center</option>
                          <option value="local">Local</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-4">
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
                        <table className="table table-bordered table-hover table-striped">
                          <ProductHeadList
                            column={column}
                            orderBy={orderBy}
                            setColumn={setColumn}
                            setOrderBy={setOrderBy}
                            action={action}
                            hasMenuPermission={hasMenuPermission}
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
                                    !product.status
                                      ? "bg-orange"
                                      : product.stock <=
                                        product.low_quantity_alert
                                      ? "bg-warning"
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
                                    {product.scope == "global"
                                      ? "Product Center"
                                      : product.scope.toUpperCase()}
                                  </td>
                                  <td className="text-center">
                                    {product.status ? "Active" : "Inactive"}
                                  </td>
                                  {(hasMenuPermission("product", "edit") ||
                                    hasMenuPermission("product", "edit")) && (
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
                                          {hasMenuPermission(
                                            "product",
                                            "edit"
                                          ) && (
                                            <Link legacyBehavior
                                              href={`product/edit/${product.id}`}
                                            >
                                              <a className="dropdown-item">
                                                <i className="icon-pencil-alt text-primary" />{" "}
                                                Edit
                                              </a>
                                            </Link>
                                          )}

                                          {hasMenuPermission(
                                            "product",
                                            "copy"
                                          ) && (
                                            <Link legacyBehavior
                                              href={`product/copy/${product.id}`}
                                            >
                                              <a className="dropdown-item">
                                                <i className="fas fa-copy" />{" "}
                                                Copy
                                              </a>
                                            </Link>
                                          )}

                                          {product.scope === "local" && (
                                            <button
                                              type="button"
                                              className="dropdown-item"
                                              onClick={() => {
                                                makeProductGlobal(product.id);
                                              }}
                                            >
                                              <i className="fas fa-copy" /> Move
                                              To Product Center
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  )}
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
      <ProductDataModal
        productDetails={productDetails}
        serverPermissions={serverPermissions}
      />
    </>
  );
};

export default AdminProductTable;
