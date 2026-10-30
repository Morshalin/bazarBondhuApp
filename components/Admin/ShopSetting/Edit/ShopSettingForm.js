import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Link from "next/link";
import router,{ useRouter } from "next/router";
import MySucces from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";

const ShopSettingForm = () => {
    const inputFiled = {
      setting_type:'',
      custom_filed_1:'',
      custom_filed_2:'',
      custom_filed_3:'',
      custom_filed_4:'',
      custom_filed_5:'',
      custom_filed_6:'',
      custom_filed_7:'',
      custom_filed_8:'',
      status:true,
    };

  const [errorBag, setErrorBag] = useState('');

  const [shopSetting,setShopSetting] = useState('');

  const inputEl = useRef(null);

  const [disabled,setDisabled] = useState('');

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });


  const resetSuccesMessage = () => {
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

  const { asPath, route, query } = useRouter();

  useEffect(() => {
    let isMounted = true;

    if(isMounted){
      const bsCustomFileInput = require("bs-custom-file-input");
      bsCustomFileInput.init();
    }

    const getShopSetting = async (id) => {
      return await axios.get(`/backend/shop-settings/${id}`).then(response=>response.data).catch(errors=>errors);
    };

    if (asPath !== route) {
      getShopSetting(query.edit)
        .then((response) => {
          if (response.success) {
            isMounted && setShopSetting(response.data);
          } else {
            router.replace('/admin/shop-setting');
            throw response.message;
          }
        })
        .catch((errors) => {
          console.error(errors);
        });
    }
    return () => (isMounted = false);
    
  }, [asPath, route, query]);


  const shopSettingUpdateAPi = async (formData)=>{
    return await axios.post(`/backend/shop-settings/${query.edit}`,formData).then(response=>response.data).catch(errors=>errors)
  }

  const handaleOnFormSubmit = (event)=>{
    event.preventDefault();
    setDisabled('disabled');
    let fromFiled = new FormData(inputEl.current)
    fromFiled.set('status',fromFiled.get('status') === "on" ? 1:0);
    fromFiled.append('_method','PUT');
    shopSettingUpdateAPi(fromFiled).then((response)=>{
      if(response.success){
        setSuccessMessage({
          ...successMessage,
          status: true,
          message: response.message,
        });
      } else {
        setErrorBag(response.errors);
        throw response.message;
      }
    }).catch((errors)=>{
      setErrorMessage({
        ...errorMessage,
        status: true,
        message: errors,
      });
    }) .finally(()=>{
      setDisabled('');
    })
  }

  const handaleOnFormReset =(event)=>{
    event.preventDefault();
    inputEl.current.reset();
    setShopSetting(inputFiled)
  };

  const handaleOnChange = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    if(name==="slider_image"){
      value = event.target.files[0] ? URL.createObjectURL(event.target.files[0]):'';
    }
    setShopSetting({...shopSetting,[name]:value});
    setErrorBag({...errorBag,[name]:''});
  };

  if(!shopSetting){
    return false;
  }
  return (
    <>
      {successMessage.status && (
        <MySucces
          message={successMessage.message}
          resetSuccesMessage={resetSuccesMessage}
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
                    <i className="icon-plus-square-regular" />
                    <h2>Edit Shop Setting</h2>
                    <Link legacyBehavior href={`/admin/shop-setting`}>
                      <a className="fbh-btn" title="Shop Setting List">
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

                <div className="custom-card-box-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <form method="POST" ref={inputEl} onSubmit={handaleOnFormSubmit}>
                        <fieldset disabled={disabled}>
                          <div className="row">
                            
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="setting_type">
                                  Setting Type
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.setting_type ? 'is-invalid':''}`}
                                  placeholder="setting type"
                                  id="setting_type"
                                  name="setting_type"
                                  value={shopSetting.setting_type}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.setting_type}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_1">
                                  Custom Filed 1
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_1 ? 'is-invalid':''}`}
                                  placeholder="custom filed 1"
                                  id="custom_filed_1"
                                  name="custom_filed_1"
                                  value={shopSetting.custom_filed_1}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_1}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_2">
                                  Custom Filed 2
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_2 ? 'is-invalid':''}`}
                                  placeholder="custom filed 2"
                                  id="custom_filed_2"
                                  name="custom_filed_2"
                                  value={shopSetting.custom_filed_2}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_2}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_3">
                                  Custom Filed 3
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_3 ? 'is-invalid':''}`}
                                  placeholder="custom filed 3"
                                  id="custom_filed_3"
                                  name="custom_filed_3"
                                  value={shopSetting.custom_filed_3}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_3}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_4">
                                  Custom Filed 4
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_4 ? 'is-invalid':''}`}
                                  placeholder="custom filed 4"
                                  id="custom_filed_4"
                                  name="custom_filed_4"
                                  value={shopSetting.custom_filed_4}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_4}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_5">
                                  Custom Filed 5
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_5 ? 'is-invalid':''}`}
                                  placeholder="custom filed 5"
                                  id="custom_filed_5"
                                  name="custom_filed_5"
                                  value={shopSetting.custom_filed_5}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_5}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_6">
                                  Custom Filed 6
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_6 ? 'is-invalid':''}`}
                                  placeholder="custom filed 6"
                                  id="custom_filed_6"
                                  name="custom_filed_6"
                                  value={shopSetting.custom_filed_6}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_6}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_7">
                                  Custom Filed 7
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_7 ? 'is-invalid':''}`}
                                  placeholder="custom filed 7"
                                  id="custom_filed_7"
                                  name="custom_filed_7"
                                  value={shopSetting.custom_filed_7}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_7}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_8">
                                  Custom Filed 8
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_8 ? 'is-invalid':''}`}
                                  placeholder="custom filed 8"
                                  id="custom_filed_8"
                                  name="custom_filed_8"
                                  value={shopSetting.custom_filed_8}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_8}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_9">
                                  Custom Filed 9
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_9 ? 'is-invalid':''}`}
                                  placeholder="custom filed 9"
                                  id="custom_filed_9"
                                  name="custom_filed_9"
                                  value={shopSetting.custom_filed_9}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_9}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="custom_filed_10">
                                  Custom Filed 10
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_10 ? 'is-invalid':''}`}
                                  placeholder="custom filed 10"
                                  id="custom_filed_10"
                                  name="custom_filed_10"
                                  value={shopSetting.custom_filed_10}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.custom_filed_10}
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="row">
                            <div className="col-lg-6 text-left">
                              <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="status"
                                    name="status"
                                    defaultChecked={shopSetting.status}
                                    onChange={handaleOnChange}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="status"
                                  >
                                    Active
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-right">
                              <Link legacyBehavior href={"/admin/shop-setting"}>
                                <a className="btn btn-info mr-1">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />back to list
                                </a>
                              </Link>

                              <button type="button" className="btn btn-danger mr-1" onClick={handaleOnFormReset} >
                                <i className="icon-reset mr-1 mr-1" /> reset
                              </button>
                              <button type="submit" className="btn btn-primary" >
                                {disabled === "disabled" ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    />saving...
                                  </>
                                ) : (
                                  <>
                                    <i className="icon-save-regular mr-1" />save
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ShopSettingForm;
