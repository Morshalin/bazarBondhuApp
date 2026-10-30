import React from "react";

const TextArea = ({label,name,placeHolder="",required=false,value="",rows=3,addData}) => {



    return (
        <>
            <div className="form-group">
                <label htmlFor="description">
                    {label}
                </label>
                <textarea
                    className="form-control"
                    rows={rows}
                    placeholder={placeHolder}
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        addData(e);
                    }}
                />
            </div>
        </>
    );
};

export default TextArea;
