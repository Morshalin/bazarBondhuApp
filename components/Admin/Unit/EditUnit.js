import Success from "../Notification/Success";
import Error from "../Notification/Error";
import process from "../../../next.config";
import React, { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import CreatableSelect from 'react-select/creatable'


const CreateUnitGroup = (props)=>{

  const [unitGroups,setUnitGroups]=useState('');
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    (async () =>{
      try{
        const API_RESPONSES = await axios.get('/backend/unit-groups')
        const UNIT_GROUPS = await API_RESPONSES.data
        UNIT_GROUPS.success ? setUnitGroups(UNIT_GROUPS.data) : (()=>{ throw UNIT_GROUPS.message})();
        UNIT_GROUPS.success && setIsLoading(false)
      } catch(error){
        console.log(error);
      }
    })();
  },[])

  return (
    <>
    <label htmlFor='brand'>Unit Group *</label>
    <CreatableSelect
      className={`${
        props.errorUnitMessage ? 'is-invalid' : ''
      }`}
      instanceId='brand'
      value={props.selectedUnitGroup}
      isClearable={true}
      onChange={(selectedOption) => {
        props.handleUnitGroup(selectedOption?.value,selectedOption?.label)
      }}
      onCreateOption={(inputValue) => {
        if ( window.confirm('Are you sure you wish to add this unit group ?')) {
          (async () =>{
            try{
              const CREATE_UNIT_GROUP = await axios.post('/backend/unit-groups',{name:inputValue});
              const RESPONSE_CREATE_API_UNIT = await CREATE_UNIT_GROUP.data;
              
              if(CREATE_UNIT_GROUP.data.success){

                const API_RESPONSES = await axios.get('/backend/unit-groups')
                const UNIT_GROUPS = await API_RESPONSES.data
                UNIT_GROUPS.success ? setUnitGroups(UNIT_GROUPS.data) : (()=>{ throw UNIT_GROUPS.message})();
                props.handleUnitGroup(RESPONSE_CREATE_API_UNIT.data.value,RESPONSE_CREATE_API_UNIT.data.label)
              
              } else{
                throw RESPONSE_CREATE_API_UNIT.message
              }
            } catch(error){
              console.log(error);
            }
          })();
        }
      }}
      isDisabled={isLoading}
      isLoading={isLoading}
      options={unitGroups}
      autoFocus={false}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
      })}
    />
    {props.errorUnitMessage && (
      <div className='invalid-feedback d-block'>
        {props.errorUnitMessage}
      </div>
    )}
    </>
  )
}



const EditUnit = ({ unitEditData }) => {
  const [unit, setUnit] = useState({
    name: unitEditData.name ?? "",
    unit_code: unitEditData.unit_code ?? "",
    base_unit: unitEditData.base_unit ?? "",
    operator: unitEditData.operator ?? "",
    operation_value: unitEditData.operation_value ?? "",
    active: unitEditData.status === "Active" ? "1" : "0",
    unit_group_id: unitEditData.unit_group_id,
    unit_group: unitEditData.unit_group,
  });

  const [unitError, setUnitError] = useState({
    name: "",
    unit_code: "",
    base_unit: "",
    operator: "",
    operation_value: "",
    active: "",
    active_error: "",
    unit_group_id: "",
  });

  const [disabledFiled, setDisabledFiled] = useState("");

  const [successMessage, setSuccessMessage] = useState({
    status: false,
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const router = useRouter();

  const handleUnitData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "active") {
      value = event.target.checked ? "1" : "0";
    }
    setUnit({ ...unit, [name]: value });
    setUnitError({ ...unitError, [name]: "", [name + "_error"]: "" });
  };

  const handleUnitGroup = (value,label) => {
    setUnit({ ...unit, unit_group_id: value, unit_group: (value || label) ? {value:value,label:label}:'' });
    setUnitError({ ...unitError, unit_group_id: ""});
  };

  const submitUnitData = (event) => {
    event.preventDefault();

      setDisabledFiled("disabled");
      const unitFormData = new FormData();
      unit.name && unitFormData.append("name", unit.name);
      unit.unit_code && unitFormData.append("unit_code", unit.unit_code);
      unit.base_unit && unitFormData.append("base_unit", unit.base_unit);
      unit.operator && unitFormData.append("operator", unit.operator);
      unit.operation_value &&
        unitFormData.append("operation_value", unit.operation_value);
      unit.unit_group_id && unitFormData.append("unit_group_id", unit.unit_group_id);
      unitFormData.append("active", unit.active);
      unitFormData.append("_method", "PUT");
      const unitApiUrl = `${process.env.api_backend_url}/units/${unitEditData.id}`;
      axios
        .post(unitApiUrl, unitFormData)
        .then((apiResponses) => {
          if (apiResponses.data.success) {
            setDisabledFiled("disabled");
            // if (apiResponses.data.data.slug !== unitApiUrl) {
            //   router.replace(`/admin/unit/edit/${apiResponses.data.data.id}`);
            // }
            setSuccessMessage({
              ...successMessage,
              status: true,
              message: apiResponses.data.message,
            });
            resetAfterUpdate();
          } else {
            setUnitError({
              ...unitError,
              ...apiResponses.data.errors
            });
            setDisabledFiled("");
            setErrorMessage({
              ...errorMessage,
              status: true,
              message: apiResponses.data.message,
            });
            setTimeout(
              () =>
                setErrorMessage({
                  ...errorMessage,
                  status: false,
                  message: "",
                }),
              5000
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const resetUnitFormData = (event) => {
    event.preventDefault();
    document.getElementById("unitFormData").reset();

    setUnit({
      name: "",
      unit_code: "",
      base_unit: "",
      operation_value: "",
      active: "1",
    });

    setUnitError({
      name: "",
      unit_code: "",
      base_unit: "",
      operator: "",
      operation_value: "",
      active: "",
      active_error: "",
      unit_group_id: "",
    });
    setDisabledFiled("");
    setTimeout(
      () =>
        setSuccessMessage({ ...successMessage, status: false, message: "" }),
      5000
    );
  };

  const resetAfterUpdate = () => {
    setUnitError({
      name: "",
      unit_code: "",
      base_unit: "",
      operator: "",
      operation_value: "",
      active: "",
      active_error: "",
      unit_group_id: "",
    });
    setDisabledFiled("");
    setTimeout(
      () =>
        setSuccessMessage({ ...successMessage, status: false, message: "" }),
      5000
    );
  };

  return (
    <>
      {successMessage.status && <Success message={successMessage.message} />}

      {errorMessage.status && <Error message={errorMessage.message} />}
      <section className="custom-card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="custom-card-box">
                <div className="custom-card-box-header">
                  <div className="fbh-title">
                    <i className="icon-pencil-alt" />
                    <h2>Edit Unit</h2>
                    <Link legacyBehavior href={`/admin/unit`}>
                      <a className="fbh-btn" title="Unit List">
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
                      <form id="unitFormData" method="POST">
                        <fieldset disabled={disabledFiled ?? ""}>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="name">
                                  {" "}
                                  Name<span className="text-danger"> *</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${unitError.name ? 'is-invalid':''}`}
                                  placeholder=" name"
                                  id="name"
                                  name="name"
                                  value={unit.name}
                                  onChange={handleUnitData}
                                  required
                                />
                                {unitError.name && (
                                  <div className="invalid-feedback">
                                    {unitError.name}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="unit_code"> Unit code</label>
                                <input
                                  type="text"
                                  className={`form-control ${unitError.unit_code ? 'is-invalid':''}`}
                                  placeholder=" unit code"
                                  id="unit_code"
                                  name="unit_code"
                                  value={unit.unit_code}
                                  onChange={handleUnitData}
                                  required
                                />
                                {unitError.unit_code && (
                                  <div className="invalid-feedback">
                                    {unitError.unit_code}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="name"> Base unit</label>
                                <input
                                  type="text"
                                  className={`form-control ${unitError.base_unit ? 'is-invalid':''}`}
                                  placeholder="base unit"
                                  id="base_unit"
                                  name="base_unit"
                                  value={unit.base_unit}
                                  onChange={handleUnitData}
                                  required
                                />
                                {unitError.base_unit && (
                                  <div className="invalid-feedback">
                                    {unitError.base_unit}
                                  </div>
                                )}
                              </div>
                            </div>
                          
                            <div className="col-lg-6">
                              <div className="form-group">
                                <CreateUnitGroup errorUnitMessage={unitError.unit_group_id} selectedUnitGroup={unit.unit_group} handleUnitGroup={handleUnitGroup}/>
                              </div>
                            </div>


                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="operator"> Operator</label>
                                <select
                                  className={`custom-select mr-sm-2 ${unitError.operator ? 'is-invalid':''}`}
                                  id="operator"
                                  name="operator"
                                  defaultValue={unit.operator}
                                  onChange={handleUnitData}
                                >
                                  <option>Choose...</option>
                                  <option value="+">Plus (+)</option>
                                  <option value="-">Minus (-)</option>
                                  <option value="*">Multiply (*)</option>
                                  <option value="/">Division (/)</option>
                                </select>
                                {unitError.operator && (
                                  <div className="invalid-feedback">
                                    {unitError.operator}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="operation_value">
                                  {" "}
                                  Operation value
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${unitError.operation_value ? 'is-invalid':''}`}
                                  placeholder=" operation value"
                                  id="operation_value"
                                  name="operation_value"
                                  value={unit.operation_value}
                                  onChange={handleUnitData}
                                  required
                                />
                                {unitError.operation_value && (
                                  <div className="invalid-feedback">
                                    {unitError.operation_value}
                                  </div>
                                )}
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
                                    id="active"
                                    name="active"
                                    defaultChecked={
                                      unit.active === "1" ? true : false
                                    }
                                    onClick={handleUnitData}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="active"
                                  >
                                    Active
                                  </label>
                                  {unitError.active && (
                                    <div className="invalid-feedback">
                                      {unitError.active}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-right">
                              <Link legacyBehavior href={"/admin/unit"}>
                                <a className="btn btn-info mr-1">
                                  <i className="icon-arrow-left-solid mr-1 mr-1" />
                                  back to list
                                </a>
                              </Link>

                              <button
                                className="btn btn-danger mr-1"
                                onClick={resetUnitFormData}
                              >
                                <i className="icon-reset mr-1 mr-1" />
                                reset
                              </button>
                              <button
                                className="btn btn-primary"
                                onClick={submitUnitData}
                              >
                                {disabledFiled === "disabled" ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    />{" "}
                                    updating...
                                  </>
                                ) : (
                                  <>
                                    <i className="icon-save-regular mr-1" />{" "}
                                    update
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

export default EditUnit;
