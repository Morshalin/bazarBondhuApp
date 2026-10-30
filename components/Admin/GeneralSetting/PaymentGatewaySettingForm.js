import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import MySucces from "../Notification/MySuccess";
import MyError from "../Notification/MyError";

const PaymentGatewaySettingForm = () => {
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


  useEffect(() => {
    let isMounted = true;

    const getShopSetting = async (id) => {
      return await axios.get(`/backend/shop-settings/${id}`).then(response=>response.data).catch(errors=>errors);
    };


    getShopSetting(3)
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
    return () => (isMounted = false);
    
  }, []);


  const shopSettingUpdateAPi = async (formData)=>{
    return await axios.post(`/backend/shop-settings/3`,formData).then(response=>response.data).catch(errors=>errors)
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
                    <h2>Paymentgateway Setting</h2>
                  </div>
                </div>

                <div className="custom-card-box-content">
                  <div className="row">
                    <div className="col-md-6 offset-3">
                      <form method="POST" ref={inputEl} onSubmit={handaleOnFormSubmit}>
                        <fieldset disabled={disabled}>
                          <div className="row">

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="custom_filed_1">
                                SSL STORE ID
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_1 ? 'is-invalid':''}`}
                                  placeholder="SSL STORE ID"
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

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="custom_filed_2">
                                SSL STORE PASSWD
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_2 ? 'is-invalid':''}`}
                                  placeholder="SSL STORE PASSWD"
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

                            <div className="col-lg-12">
                              <div className="form-group">
                                <label htmlFor="custom_filed_3">
                                SSL API URL
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.custom_filed_3 ? 'is-invalid':''}`}
                                  placeholder="SSL API URL"
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
export default PaymentGatewaySettingForm;
