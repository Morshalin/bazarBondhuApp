import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Link from "next/link";
import router,{ useRouter } from "next/router";
import MySucces from "../../Notification/MySuccess";
import MyError from "../../Notification/MyError";

const HomeSliderForm = () => {
  const inputFiled = {
    title:'',
    tag:'',
    hyper_link:'',
    sort_order:'',
    slider_image:'',
    status:true,
  };

  const [errorBag, setErrorBag] = useState('');

  const [homeSlider,setHomeSlider] = useState('');

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

    const getBrand = async (id) => {
      return await axios.get(`/backend/home-slider/${id}`).then(response=>response.data).catch(errors=>errors);
    };

    if (asPath !== route) {
      getBrand(query.edit)
        .then((response) => {
          if (response.success) {
            isMounted && setHomeSlider(response.data);
          } else {
            router.replace('/admin/home-slider');
            throw response.message;
          }
        })
        .catch((errors) => {
          console.error(errors);
        });
    }
    return () => (isMounted = false);
    
  }, [asPath, route, query]);


  const homeSliderCreateAPi = async (formData)=>{
    return await axios.post(`/backend/home-slider/${query.edit}`,formData).then(response=>response.data).catch(errors=>errors)
  }

  const handaleOnFormSubmit = (event)=>{
    event.preventDefault();
    setDisabled('disabled');
    let fromFiled = new FormData(inputEl.current)
    fromFiled.set('status',fromFiled.get('status') === "on" ? 1:0);
    fromFiled.append('_method','PUT');
    homeSliderCreateAPi(fromFiled).then((response)=>{
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
    setHomeSlider(inputFiled)
  };

  const handaleOnChange = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    if(name==="slider_image"){
      value = event.target.files[0] ? URL.createObjectURL(event.target.files[0]):'';
    }
    setHomeSlider({...homeSlider,[name]:value});
    setErrorBag({...errorBag,[name]:''});
  };

  if(!homeSlider){
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
                    <h2>Edit Home Slider</h2>
                    <Link legacyBehavior href={`/admin/home-slider`}>
                      <a className="fbh-btn" title="Add Unit">
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
                      <form method="POST" encType="multipart/form-data" ref={inputEl} onSubmit={handaleOnFormSubmit}>
                        <fieldset disabled={disabled}>
                          <div className="row">
                            
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="title">
                                  Title
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.title ? 'is-invalid':''}`}
                                  placeholder="title"
                                  id="title"
                                  name="title"
                                  value={homeSlider.title}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.title}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tag">
                                  Tag
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.tag ? 'is-invalid':''}`}
                                  placeholder="tag"
                                  id="tag"
                                  name="tag"
                                  value={homeSlider.tag}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.tag}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="hyper_link">
                                  Link
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${errorBag.hyper_link ? 'is-invalid':''}`}
                                  placeholder="https link e.g. https://example.com/category"
                                  id="hyper_link"
                                  name="hyper_link"
                                  value={homeSlider.hyper_link}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.hyper_link}
                                </div>
                              </div>
                            </div>


                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="name">
                                  Sorting Order
                                </label>
                                <input
                                  type="number"
                                  className={`form-control ${errorBag.sort_order ? 'is-invalid':''}`}
                                  placeholder="sorting oder"
                                  id="sort_order"
                                  name="sort_order"
                                  min="0"
                                  step="1"
                                  value={homeSlider.sort_order}
                                  onChange={handaleOnChange}
                                />
                                <div className="invalid-feedback">
                                  {errorBag.sort_order}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6 offset-3">
                              <div className="row">
                                <div className="col-lg-12">
                                  
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label htmlFor="slider_image">Slider Image 
                                  <span className="text-danger">*</span></label>
                                    <div className="custom-file">
                                      <input type="file" className={`custom-file-input ${errorBag.slider_image ? 'is-invalid':''}`} id="slider_image" name="slider_image" onChange={handaleOnChange}/>
                                      <label className="custom-file-label" htmlFor="slider_image" >
                                        <span className="d-inline-block text-truncate w-75">
                                          choose images
                                        </span>
                                      </label>
                                      
                                        <div className="invalid-feedback">
                                        {errorBag.slider_image}
                                        </div>
                                    
                                    </div>
                                  </div>
                                  <div className="container mb-2">
                                    {homeSlider.slider_image && (
                                      <img
                                        className="mx-auto d-block"
                                        src={homeSlider.slider_image}
                                        width="100%"
                                        height="auto"
                                      />
                                    )}
                                  </div>
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
                                    defaultChecked={homeSlider.status === 1 ? true:false}
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
                              <Link legacyBehavior href={"/admin/home-slider"}>
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
                                    />updating...
                                  </>
                                ) : (
                                  <>
                                    <i className="icon-save-regular mr-1" />update
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
export default HomeSliderForm;
