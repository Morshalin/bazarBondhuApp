import React from "react";

const InputField = ({label,name,placeHolder="",required=false,value="",addData,type="text"}) => {



    return (
        <>
            <div className="form-group">

                <label htmlFor="name">
                    {label}
                    {required&&<span className="text-danger"> * </span>}
                </label>

                <input
                    type={type}
                    className={`form-control`}
                    autoComplete="off"
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        addData(e);
                    }}
                    placeholder={placeHolder}
                    required/>

                {/*<div*/}
                {/*    className={props.errors.name ? `invalid-feedback` : ``}>*/}
                {/*    {props.errors.name}*/}
                {/*</div>*/}

            </div>
        </>
    );
};

export default InputField;
