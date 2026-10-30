import React, { memo } from "react";

const SelectField = memo(
  ({
    name,
    label,
    options,
    required = false,
    value,
    className: classes,
    onChange,
  }) => {
    // console.log("Select fileld");

    function classNameJoin(...className) {
      return className.join(" ");
    }

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="text-danger"> * </span>}
          </label>
        )}
        <select
          name={name}
          id={name}
          className={`form-control ${classNameJoin(classes)}`}
          onChange={onChange}
          value={value ?? "default"}
        >
          <option value="default" disabled>
            Select One...
          </option>

          {(options || []).map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectField;
