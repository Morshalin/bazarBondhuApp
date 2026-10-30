import React from 'react';
import {connect} from "react-redux";

const ModulePermissions = (props) => {

    return (
        <>
            <div className="custom-card-box mb-3">
                <div className="custom-card-box-header">
                    <div className="fbh-title">
                        <i className="fas fa-lock"/>
                        <h2>Module Permissions</h2>

                    </div>
                </div>
                <div className="custom-card-box-content p-md-3 p-2">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-responsive custom-table custom-hight-320">
                                <table className="table table-bordered table-hover mb-0 table-order-details">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">SL</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Creator</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        ((props.module && props.module.permissions) && (props.module.permissions.length > 0)) ? props.module.permissions.map((permission, index) => (
                                            <tr className="text-center" key={index}>
                                                <td scope="row">
                                                    {++index}
                                                </td>

                                                <td className="text-center">
                                                    {permission.name}
                                                </td>
                                                <td className="text-center">
                                                    {permission.permission_type}
                                                </td>
                                                <td className="text-center text-nowrap">
                                                    {permission.created_by}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">No Permission Found</td>
                                            </tr>
                                        )
                                    }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

const mapStateToProps = (store) => {
    const {module} = store.moduleStore;
    return {module};
}

export default connect(mapStateToProps, null)(ModulePermissions);