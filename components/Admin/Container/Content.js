import React from "react";

const Content = (props) =>{
    return (
        <>
            <div className="page-body">
                {(props.showbreadcrumb)? '<Breadcrumb/>':''}
                <div className="container-fluid">
                    {props.children}
                </div>

            </div>
        </>
    )
}
export default Content;
