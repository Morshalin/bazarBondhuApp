import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MyError from "../../Notification/MyError";
import MySuccess from "../../Notification/MySuccess";
// import { SET_AUTHORIZATION } from "../../../../store/permission/actions/permissionActions";
// import { connect } from "react-redux";

const EmptyCardBody = (props) => {
  return (
    <>
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-plus-square-regular" />
                    <h2>Edit Brand</h2>
                    <Link legacyBehavior href={`/admin/brand`}>
                      <a className="fbh-btn" title="Add Brand">
                        <i className="icon-list2" />
                      </a>
                    </Link>
                  </div>
                  <div className="fbh-info">
                    <p>
                      Please fill in the information below. The field labels
                      marked with * are required input fields.
                    </p>
                  </div>
                </div>

                <div className="custom-card-box-content">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ErrorFeedback = (props) => {
  return (
    <>{props.error && <div className="invalid-feedback">{props.error}</div>}</>
  );
};

const CompanyName = (props) => {
  const { validationError } = props;
  return (
    <>
      <div className="form-group">
        <label htmlFor="name">
          Company Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${validationError.name ? "is-invalid" : ""}`}
          placeholder="name"
          id="name"
          name="name"
          value={props.brand.name}
          onChange={props.handelOnchange}
        />
        <ErrorFeedback error={validationError.name} />
      </div>
    </>
  );
};

const CompanyLogo = (props) => {
  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
  }, []);

  return (
    <>
      <div className="form-group">
        <label>Company logo</label>
        <div className="custom-file">
          <input
            type="file"
            className={`custom-file-input ${
              props.validationError.logo ? "is-invalid" : ""
            }`}
            id="logo"
            name="logo"
            onChange={props.handelOnchange}
          />
          <label className="custom-file-label" htmlFor="logo">
            <span className="d-inline-block text-truncate w-75">
              upload company logo
            </span>
          </label>

          <ErrorFeedback error={props.validationError.logo} />
        </div>
      </div>
      <div className="container mb-2">
        {props.brand.logo && (
          <img
            className="mx-auto d-block"
            src={
              typeof props.brand.logo === "string"
                ? props.brand.logo
                : URL.createObjectURL(props.brand.logo)
            }
            width="100px"
            height="100px"
            alt="no logo found"
          />
        )}
      </div>
    </>
  );
};

const CompanyAddress = (props) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="address">Company Address</label>
        <textarea
          className={`form-control ${
            props.validationError.address ? "is-invalid" : ""
          }`}
          id="address"
          name="address"
          value={props.brand.address}
          onChange={props.handelOnchange}
          rows="6"
          placeholder="Company Address"
        />
        <ErrorFeedback error={props.validationError.address} />
      </div>
    </>
  );
};

const CompanyWeb = (props) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="web">Company Web</label>
        <input
          type="text"
          className={`form-control ${
            props.validationError.web ? "is-invalid" : ""
          }`}
          placeholder="Company Web"
          id="web"
          name="web"
          value={props.brand.web}
          onChange={props.handelOnchange}
        />
        <ErrorFeedback error={props.validationError.web} />
      </div>
    </>
  );
};

const ActiveInactive = (props) => {
  return (
    <>
      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="active"
            name="active"
            defaultChecked={true}
            onChange={props.handelOnchange}
          />
          <label className="custom-control-label" htmlFor="active">
            Active
          </label>
        </div>
      </div>
    </>
  );
};

const BrandOrSeries = (props) => {
  const [validationError, setValidationError] = useState("");
  return (
    <>
      <div className="input-group form-group">
        <input
          type="text"
          className={`form-control ${validationError ? "is-invalid" : ""}`}
          placeholder="Brand/Series"
          id="brands_series"
          name="brands_series[]"
          value={props.brand_series.name}
          onChange={(event) => {
            validationError && setValidationError("");
            props.handelOnChangeBrandOrSeries(event, props.index);
          }}
        />
        <input
          hidden={true}
          name="brands_id[]"
          value={props.brand_series.id}
          onChange={(event) => {
            props.handelOnChangeBrandOrSeries(event, props.index);
          }}
        />

        <input
          hidden={true}
          name="brands_flag[]"
          value={false}
          onChange={(event) => {
            props.handelOnChangeBrandOrSeries(event, props.index);
          }}
        />

        <div className="input-group-append">
          {props.lengthOfList - 1 === props.index && (
            <>
              <button
                className="btn btn-sm btn-secondary"
                type="button"
                onClick={(event) => {
                  if (!props.brand_series.name) {
                    setValidationError("Brand or Series name can to be empty");
                    return false;
                  } else {
                    props.addOnClickBrandOrSeries({
                      name: props.brand_series.name,
                      brand_parent_id: props.editBrandId,
                      active: 1,
                      flag: true,
                    });
                    props.successMessageFromChild(
                      "Brand/Series added successfully"
                    );
                  }
                }}
              >
                <i className="fas fa-plus-circle" />
              </button>
            </>
          )}
          {props.lengthOfList - 1 !== props.index && (
            <>
              <button
                className="btn btn-sm btn-danger"
                type="button"
                onClick={(event) => {
                  axios
                    .delete(`backend/brands/${props.brand_series.id}`)
                    .then((responses) => {
                      if (!responses.data.success) {
                        setValidationError(responses.data.errors.name);
                      } else {
                        props.successMessageFromChild(responses.data.message);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                  props.removeOnClickBrandOrSeries(event, props.index);
                }}
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            </>
          )}
        </div>
        <ErrorFeedback error={validationError} />
      </div>
    </>
  );
};

const EditBrand = ({ brandEditData }) => {
  const INITIAL_STATE = {
    name: brandEditData.name,
    logo: brandEditData.logo,
    address: brandEditData.address,
    web: brandEditData.web,
    brands_series: [...brandEditData.brands, { id: "", name: "", flag: false }],
  };
  const INITIAL_ERROR_STATE = {
    name: "",
    logo: "",
    address: "",
    web: "",
    brands_series: [{ name: "" }],
  };
  const [brand, setBrand] = useState(INITIAL_STATE);
  const [validationError, setValidationError] = useState(INITIAL_ERROR_STATE);
  const [isDisabled, setIsDisabled] = useState(false);
  const brandFormData = useRef();
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

  const handelOnchange = (event) => {
    setBrand({
      ...brand,
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value,
    });
    setValidationError({
      ...validationError,
      [event.target.name]: "",
    });
  };

  const handelOnReset = () => {
    brandFormData.current.reset();
    setBrand(INITIAL_STATE);
    setValidationError(INITIAL_ERROR_STATE);
  };

  const createBrandApi = async (insertInformation) => {
    try {
      const BRAND_API_RESPONSE = await axios.post(
        `/backend/brands/${brandEditData.id}`,
        insertInformation
      );
      const BRAND_RESPONSES = await BRAND_API_RESPONSE.data;
      if (BRAND_RESPONSES.success) {
        setSuccessMessage({
          ...successMessage,
          status: true,
          message: BRAND_RESPONSES.message,
        });
        // props.set_authorization(BRAND_RESPONSES.config.permissions);
        setValidationError(INITIAL_ERROR_STATE);
        // handelOnReset()
      } else {
        console.log(BRAND_RESPONSES.errors);
        setValidationError(BRAND_RESPONSES.errors);
        setErrorMessage({
          ...errorMessage,
          status: true,
          message: BRAND_RESPONSES.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsDisabled(false);
  };

  const handelOnSubmit = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    let insertInformation = new FormData(brandFormData.current);
    insertInformation.set(
      "active",
      insertInformation.get("active") === "on" ? "1" : "0"
    );
    insertInformation.append("_method", "PUT");
    createBrandApi(insertInformation);
  };

  const handelOnChangeBrandOrSeries = (event, index) => {
    const brands_series = [...brand.brands_series];
    if (event.target.name === "brands_series[]") {
      brands_series[index]["name"] = event.target.value;
      brands_series[index]["flag"] = true;
    }
    setBrand({ ...brand, brands_series });
  };

  const addOnClickBrandOrSeries = (brandSeries) => {
    setBrand({
      ...brand,
      brands_series: [...brand.brands_series, { name: "" }],
    });
  };

  const removeOnClickBrandOrSeries = (event, index) => {
    const brands_series = [...brand.brands_series];
    brands_series.splice(index, 1);
    setBrand({ ...brand, brands_series });
  };

  const successMessageFromChild = (message) => {
    setSuccessMessage({
      ...successMessage,
      status: true,
      message: message,
    });
  };

  const recallBrandSeriesApiAfterUpdate = () => {
    axios.get(`/backend/brands/${brandEditData.id}`).then((responses) => {
      if (responses.data.success) {
        setBrand({
          ...brand,
          brands_series: [...responses.data.data.brands, { name: "" }],
        });
      }
    });
  };

  return (
    <>
      {console.log(brand.brands_series)}
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
      <EmptyCardBody>
        <div className="row">
          <div className="col-lg-12">
            <form
              id="brandFormData"
              method="POST"
              ref={brandFormData}
              encType="multipart/form-data"
              onSubmit={handelOnSubmit}
            >
              <fieldset disabled={isDisabled ? "disabled" : ""}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <CompanyName
                          handelOnchange={handelOnchange}
                          brand={brand}
                          validationError={validationError}
                        />
                      </div>
                      <div className="col-lg-12">
                        <CompanyLogo
                          handelOnchange={handelOnchange}
                          brand={brand}
                          validationError={validationError}
                        />
                      </div>
                      <div className="col-lg-12">
                        <CompanyAddress
                          handelOnchange={handelOnchange}
                          brand={brand}
                          validationError={validationError}
                        />
                      </div>
                      <div className="col-lg-12">
                        <CompanyWeb
                          handelOnchange={handelOnchange}
                          brand={brand}
                          validationError={validationError}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="name">
                      Brand/Series <span className="text-danger">*</span>{" "}
                    </label>
                    {brand.brands_series &&
                      brand.brands_series.map((brand_series, index) => (
                        <BrandOrSeries
                          key={index}
                          handelOnChangeBrandOrSeries={
                            handelOnChangeBrandOrSeries
                          }
                          addOnClickBrandOrSeries={addOnClickBrandOrSeries}
                          removeOnClickBrandOrSeries={
                            removeOnClickBrandOrSeries
                          }
                          recallBrandSeriesApiAfterUpdate={
                            recallBrandSeriesApiAfterUpdate
                          }
                          brand_series={brand_series}
                          index={index}
                          lengthOfList={brand.brands_series.length}
                          editBrandId={brandEditData.id}
                          successMessageFromChild={successMessageFromChild}
                        />
                      ))}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 text-left">
                    <ActiveInactive />
                  </div>
                  <div className="col-lg-6 text-right">
                    <Link legacyBehavior href={"/admin/brand"}>
                      <a className="btn btn-info mr-1">
                        <i className="icon-arrow-left-solid mr-1 mr-1" /> back
                        to list
                      </a>
                    </Link>

                    <button
                      type="reset"
                      className="btn btn-danger mr-1"
                      onClick={handelOnReset}
                    >
                      <i className="icon-reset mr-1 mr-1" /> reset
                    </button>
                    <button className="btn btn-primary" type="submit">
                      {isDisabled ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          saving...
                        </>
                      ) : (
                        <>
                          <i className="icon-save-regular mr-1" /> save
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </EmptyCardBody>
    </>
  );
};

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		setPermissions: (permissions) =>
// 			dispatch({type: SET_AUTHORIZATION, payload: {permissions}}),
// 		set_authorization: (permissions) =>
// 			dispatch({ type: SET_AUTHORIZATION, payload: { permissions } }),
// 	}
// }

export default EditBrand;
