import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import AddSupplierModal from "../Add/AddSupplierModal";
import {
  ADD_PURCHASE_PRODUCTS,
  ADD_SELECTED_SUPPLIER,
  ADD_SUPPLIERS,
} from "../../../../store/admin/actions/purchase/uPurchaseCartActions";
import { connect } from "react-redux";
import {
  getActions,
  postMethodGetData,
  showActions,
} from "../../../../Helpers/Utils/Utils";
import SingleSupplierModal from "../../Supplier/List/SingleSupplierModal";
import { RESET_SUPPLIER_DATA } from "../../../../store/admin/actions/supplier/supplierActions";
import Link from "next/link";

const SupplierProductSearch = (props) => {
  const selectInputRef = useRef();
  let initialMessage = "";
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [message, setMessage] = useState("");
  const [supplier, setSupplier] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [supplier_id, setSupplierId] = useState("");

  useEffect(() => {
    document.getElementById("search_products").focus();
  }, []);

  const WAIT_INTERVAL = 500;
  let keyword;
  let timer = 0;

  let supplierKeyword;
  let supplierTimer = 0;

  const searchProducts = (selectedOption) => {
    clearTimeout(timer);

    keyword = selectedOption;

    timer = setTimeout(getProducts, WAIT_INTERVAL);
  };

  const supplierSearch = (selectedOption) => {
    clearTimeout(supplierTimer);
    supplierKeyword = selectedOption;
    supplierTimer = setTimeout(getSuppliers, WAIT_INTERVAL);
  };

  const getProducts = async () => {
    // set search keyword to redux for marking the searching result
    postMethodGetData(`backend/search/products`, { search_keyword: keyword })
      .then((response) => {
        if (response.success) {
          if (!response.data.length) {
            setMessage("No product found");
          }

          let product =
            response.data &&
            response.data.find((item) => item.barcode === keyword);

          // product barcode and search keyword same then directly product will added to cart and clear the search keyword
          if (product) {
            props.addPurchaseItem(product);
            // clear the input value
            selectInputRef.current.select.setValue("");
            document.getElementById("search_products").focus();
            props.setSearchKeywords("");
          } else {
            setProductsData(response.data);
            let productsFilterData = response.data.map(
              ({ id, name, purchase_price, stock }) => {
                return {
                  value: id,
                  label: name,
                  // label: name + '(' + stock + ') | - ৳ ' + purchase_price,
                };
              }
            );
            console.log(productsFilterData);
            setProducts(productsFilterData);
          }
        }
      })
      .catch((err) => err);

    setTimeout(() => {
      setMessage(initialMessage);
    }, 3000);
  };

  const handleChange = (selectedProduct) => {
    let product =
      productsData &&
      selectedProduct &&
      productsData.find((item) => item.id === selectedProduct.value);
    product && props.addPurchaseItem(product);
    setProducts([]);
    document.getElementById("search_products").focus();
  };

  const getSuppliers = () => {
    let mounted = true;
    let allSupplier = props.suppliers;

    postMethodGetData(`/backend/get-search-suppliers`, { supplierKeyword })
      .then((res) => {
        allSupplier =
          mounted &&
          res.success &&
          res?.data?.map(({ id, name }) => {
            return {
              value: id,
              label: name,
            };
          });
      })
      .finally(() => {
        props.addSuppliers(allSupplier);
        mounted = false;
        setIsLoading(!isLoading);
        setIsDisabled(!isDisabled);
      });
  };

  const showSupplier = (e) => {
    e.preventDefault();

    showActions(`backend/suppliers/${props.selectedSupplier.value}`).then(
      (supplier) => {
        if (supplier.success) {
          setSupplier(supplier.data);
          props.selectedSupplier.value &&
            $(`#singleSupplierModal`).modal({ show: true });
        }
      }
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>
              Supplier <span className="text-danger"> * </span>
            </label>

            <div className="input-group row">
              <Select
                className={`col-md-10 col ${
                  props?.errors?.supplier_id ? `is-invalid` : ""
                }`}
                onInputChange={(selectedOption) => {
                  supplierSearch(selectedOption);
                }}
                onChange={(selectedOption) => {
                  props.addSelectedSupplier(selectedOption);
                }}
                value={props.selectedSupplier}
                options={props.suppliers}
                autoFocus={false}
                isClearable={false}
              />

              <div className="input-group-append mr-2">
                <button
                  onClick={showSupplier}
                  className="input-group-text"
                  type="button"
                >
                  <i className="icon-eye-solid" />
                </button>
              </div>

              <div className="input-group-append">
                <button
                  onClick={() => {
                    setSupplierId("");
                    props.resetSupplierData();
                  }}
                  className="input-group-text"
                  data-toggle="modal"
                  data-target="#add_supplier_modal"
                  type="button"
                >
                  <i className="icon-plus-square-regular" />
                </button>
              </div>

              <div
                className={`ml-3 ${
                  props?.errors?.supplier_id ? `invalid-feedback` : ``
                }`}
              >
                {props?.errors?.supplier_id}
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <div className="form-group custom-sr-box">
            <label>Search Product</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="icon-barcode" />
                </div>
              </div>

              <Select
                ref={selectInputRef}
                className="col-md-10 p-0 ml-2 mr-2"
                id="search_products"
                classNamePrefix="select"
                onInputChange={(selectedOption) => {
                  searchProducts(selectedOption);
                }}
                onChange={(selectedOption) => {
                  handleChange(selectedOption);
                }}
                value={null}
                options={products}
                autoFocus={true}
                isClearable={true}
                placeholder={"Search/Scan product by Name/Barcode"}
              />

              <div className="input-group-append" id="button-addon4">
                <Link legacyBehavior target="_blank" href="/admin/product/add">
                  <a
                    className="btn btn-outline-secondary"
                    title="Add New Product"
                    target="_blank"
                  >
                    <i className="icon-plus-circle-solid" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddSupplierModal supplier_id={supplier_id} />

      <SingleSupplierModal
        formPurchase={true}
        supplier={supplier}
        setSupplierId={setSupplierId}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPurchaseItem: (product) =>
      dispatch({ type: ADD_PURCHASE_PRODUCTS, payload: { product } }),
    addSelectedSupplier: (selectedSupplier) =>
      dispatch({ type: ADD_SELECTED_SUPPLIER, payload: { selectedSupplier } }),
    addSuppliers: (suppliers) =>
      dispatch({ type: ADD_SUPPLIERS, payload: { suppliers } }),
    resetSupplierData: () => dispatch({ type: RESET_SUPPLIER_DATA }),
  };
};

const mapStateToProps = (store) => {
  const { selectedSupplier, suppliers, errors } = store.uPurchaseCart;
  return { selectedSupplier, suppliers, errors };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierProductSearch);
