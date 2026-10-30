import React, { memo, useEffect } from "react";

const InputFiles = memo(({ label, name, onChange, required = false }) => {
  console.log("Multiple InputField");

  const lebelCommon = label && (
    <label id={"inputGroupFileAddon-" + name}>
      {label} {required && <span className="text-danger"> * </span>}
    </label>
  );

  useEffect(() => {
    const bsCustomFileInput = require("bs-custom-file-input");
    bsCustomFileInput.init();
  }, []);

  return (
    <div className="form-group">
      {lebelCommon}

      <div className="custom-file">
        <input
          type="file"
          className="custom-file-input"
          id={name}
          name={name}
          onChange={onChange}
          required={required}
          multiple
          aria-describedby={"inputGroupFileAddon-" + name}
        />
        <label className="custom-file-label cfl-left-align" htmlFor={name}>
          <span className="d-inline-block text-truncate "> choose image</span>
        </label>
      </div>
    </div>
  );
});

export default InputFiles;
