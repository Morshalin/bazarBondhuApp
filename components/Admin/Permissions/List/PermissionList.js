import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {connect} from "react-redux";
import PermissionActions from "./PermissionActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import {
    DELETE,
    deleteAction,
    ERROR,
    getActions,
    options,
    STATUS,
    statusChange,
    SUCCESS
} from "../../../../Helpers/Utils/Utils";

import {
    CHANGE_PERMISSION_STATUS,
    REMOVE_PERMISSION,
    RESET_PERMISSION_MESSAGE,
    SET_PERMISSION,
    SET_PERMISSION_LIST,
    SET_PERMISSION_MESSAGE
} from "../../../../store/admin/actions/permission/permissionAction";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
import PermissionHeader from "./PermissionHeader";


const PermissionList = (props) => {

    const [show, setShow] = useState(10);
    const [column, setColumn] = useState('id');
    const [orderBy, setOrderBy] = useState('DESC');
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {
        let mounted = true;

        getActions(`backend/getAllPermissions?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`, true).then((response) => {
            if (mounted && response) {
                setMeta(response.meta);
                props.setPermissionList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });

    }, [show, column, orderBy, keywords, page]);


    const actionsPermission = (actions) => {
        let {type, payload} = actions;
        switch (type) {

            case DELETE: {

                deleteAction(`backend/permissions/${props.permissionList[payload.index].id}`).then((result) => {

                    result.success ? (props.removePermission(props.permissionList[payload.index].id) && props.setPermissionMessage(SUCCESS, result.message))
                        : props.setPermissionMessage(ERROR, result.message);
                }).finally(() => {
                    resetChanges();
                });

                break;
            }

            case STATUS: {

                statusChange(`backend/permissions/permission-active-status/${props.permissionList[payload.index].id}`).then((result) => {

                    result.success ? (props.changePermissionStatus(result.data) && props.setPermissionMessage(SUCCESS, result.message))
                        : props.setPermissionMessage(ERROR, result.message);

                }).finally(() => {
                    resetChanges();
                });

                break;
            }
            default:
                break;
        }
    }

    const resetChanges = () => {
        setTimeout(() => {
            props.resetPermissionMessage();
        }, 3000);
    }


    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}

            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-list2"/>
                                        <h2>Permission List</h2>
                                        <Link legacyBehavior href={`/admin/permission/add`}>
                                            <a className="fbh-btn" title="Add permission">
                                                <i className="icon-plus-square-regular"></i>
                                            </a>
                                        </Link>
                                    </div>
                                </div>

                                <div className="custom-card-box-content">

                                    <div className="row table-top-option mb-3">
                                        <div className="col-sm-6">
                                            <div className="showing-table-row">
                                                <label className="">Show</label>
                                                <select
                                                    className="custom-select"
                                                    value={show ?? 10}
                                                    onChange={(e) => {
                                                        setMeta('');
                                                        setShow(e.target.value);
                                                        setPage(1);
                                                    }}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="table-search">
                                                <label className="">Search</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search here ..."
                                                    onChange={(e) => {

                                                        setMeta('');

                                                        setTimeout(() => {
                                                            setKeywords(e.target.value);
                                                            setPage(1);
                                                        }, 500);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="table-responsive custom-table">

                                                <Loader loaded={!!meta} options={options} className="spinner">
                                                    <table
                                                        className="table table-bordered table-hover table-striped carsour-pointer">

                                                        <thead className="thead-light">

                                                        <PermissionHeader
                                                            setColumn={setColumn}
                                                            setOrderBy={setOrderBy}
                                                            column={column}
                                                            orderBy={orderBy}/>

                                                        </thead>


                                                        <tbody>

                                                        {
                                                            (props.permissionList && (props.permissionList.length > 0)) ? props.permissionList.map((permission, index) => (
                                                                <tr
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.setPermission(permission);
                                                                    }}
                                                                    className={`text-center ${(permission.id === props.permission.id) ? `bg-warning` : ``}`}
                                                                    key={index}>
                                                                    <td scope="row">{meta.from ? index + meta.from : ''}</td>
                                                                    <td className="nowrap">
                                                                        {permission.name}
                                                                    </td>
                                                                    <td className="nowrap">
                                                                        {permission.display_name}
                                                                    </td>
                                                                    <td className="nowrap">
                                                                        {permission.description}
                                                                    </td>
                                                                    <td className="nowrap">
                                                                        {permission.module ? permission.module.name : '-'}
                                                                    </td>
                                                                    <td className="nowrap">
                                                                        {permission.created_by}
                                                                    </td>

                                                                    <td className="text-center">
                                                                        {permission.status}
                                                                    </td>
                                                                    <td className="text-center">

                                                                        <PermissionActions
                                                                            permissionIndex={index}
                                                                            permission={permission}
                                                                            actions={actionsPermission}/>
                                                                    </td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan="8" className="text-center">
                                                                        No Permission Found
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }


                                                        </tbody>
                                                    </table>
                                                </Loader>
                                            </div>
                                        </div>
                                    </div>

                                    {meta && (
                                        <nav
                                            aria-label="Page navigation example"
                                            className="d-flex justify-content-center">
                                            <ReactPaginate
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                                breakLabel={"..."}
                                                pageCount={meta.last_page}
                                                marginPagesDisplayed={3}
                                                pageRangeDisplayed={3}
                                                onPageChange={(pageNumber) => {
                                                    setPage((pageNumber.selected + 1))
                                                }}
                                                containerClassName={"pagination"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}/>
                                        </nav>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPermissionList: (permissionList) => dispatch({type: SET_PERMISSION_LIST, payload: {permissionList}}),
        setPermission: (permission) => dispatch({type: SET_PERMISSION, payload: {permission}}),
        changePermissionStatus: (permission) => dispatch({type: CHANGE_PERMISSION_STATUS, payload: {permission}}),
        setPermissionMessage: (message_type, message) => dispatch({
            type: SET_PERMISSION_MESSAGE,
            payload: {message_type, message}
        }),
        resetPermissionMessage: () => dispatch({type: RESET_PERMISSION_MESSAGE}),
        removePermission: (id) => dispatch({type: REMOVE_PERMISSION, payload: {id}})
    }
}

const mapStateToProps = (store) => {
    const {permissionList, permission, message} = store.permissionStore;
    return {permissionList, permission, message};
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionList);
