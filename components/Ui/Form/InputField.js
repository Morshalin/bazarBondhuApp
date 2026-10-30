import React, { memo, useEffect } from "react";

const InputField = memo(
  ({
    asTag = "input",
    value,
    label,
    name,
    placeholder = "",
    type = "text",
    onChange,
    required = false,
    className: classes,
    error,

    rows = 3,
  }) => {
    console.log("InputField");

    function classNameJoin(...classes) {
      return classes.join(" ");
    }

    useEffect(() => {
      const bsCustomFileInput = require("bs-custom-file-input");
      bsCustomFileInput.init();
    }, []);

    const labelCommon = label && (
      <label htmlFor={name}>
        {label} {required && <span className="text-danger"> * </span>}
      </label>
    );
    const errorCommon = error && (
      <div id={`validation-${name}`} className="invalid-feedback">
        {error}
      </div>
    );

    switch (asTag) {
      case "input":
        return (
          <div className="form-group">
            {labelCommon}
            <input
              id={name}
              type={type}
              value={value}
              name={name}
              className={`form-control ${
                error ? "is-invalid" : ""
              } ${classNameJoin(classes)}`}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              aria-describedby={`validation-${name}`}
            />
            {errorCommon}
          </div>
        );
      case "textarea":
        return (
          <div className="form-group">
            {labelCommon}
            <textarea
              id={name}
              type={type}
              value={value}
              name={name}
              rows={rows}
              className={`form-control ${
                error ? "is-invalid" : ""
              } ${classNameJoin(classes)}`}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              aria-describedby={`validation-${name}`}
            />
            {errorCommon}
          </div>
        );
      case "checkbox":
        return (
          <div className="form-group">
            {labelCommon}

            <div className="form-check">
              <input
                id={name}
                type={type}
                value={value}
                name={name}
                className={`form-check-input ${classNameJoin(classes)}`}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                defaultChecked={value}
              />

              <label className="form-check-label" htmlFor={name}>
                {label}
              </label>
            </div>
          </div>
        );
      case "switch":
        return (
          <div className="form-group">
            {labelCommon}

            <div className="custom-control custom-switch">
              <input
                id={name}
                type={type}
                value={value}
                name={name}
                className={`custom-control-input ${classNameJoin(classes)}`}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                defaultChecked={value}
              />
              <label className="custom-control-label" htmlFor={name}>
                {label}
              </label>
            </div>
          </div>
        );
      case "file":
        return (
          <div className="form-group">
            {labelCommon}
            <div className="custom-file">
              <input
                type="file"
                className={`custom-file-input ${
                  error ? "is-invalid" : ""
                } ${classNameJoin(classes)}`}
                id={name}
                name={name}
                onChange={onChange}
                required={required}
                aria-describedby={"inputGroupFileAddon-" + name}
              />
              <label
                className="custom-file-label cfl-left-align"
                htmlFor={name}
              >
                <span className="d-inline-block text-truncate ">
                  choose image
                </span>
              </label>
              {errorCommon}
            </div>
          </div>
        );

      default:
        break;
    }
  }
);

export default InputField;
