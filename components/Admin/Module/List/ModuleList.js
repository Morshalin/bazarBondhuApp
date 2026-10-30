import React, {useEffect, useState} from 'react';
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
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
import ModuleActions from "./ModuleActions";
import {connect} from "react-redux";
import {
    CHANGE_MODULE,
    REMOVE_MODULE,
    RESET_MESSAGE,
    SET_MESSAGE,
    SET_MODULE,
    SET_MODULE_LIST
} from "../../../../store/admin/actions/module/moduleActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import ModuleHeader from "./ModuleHeader";


const ModuleList = (props) => {

    const [show, setShow] = useState(10);
    const [column, setColumn] = useState('id');
    const [orderBy, setOrderBy] = useState('DESC');
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {

        let mounted = true;

        getActions(`backend/getAllModules?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`, true).then((response) => {
            if (mounted && response) {
                setMeta(response.meta);
                props.setModuleList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });


    }, [show, keywords, page, column, orderBy]);


    const actionsModule = (actions) => {
        let {type, payload} = actions;
        switch (type) {
            case DELETE: {

                deleteAction(`backend/modules/${props.moduleList[payload.index].id}`).then(result =>
                    ((result.success) ?
                        (props.removeModule(props.moduleList[payload.index].id) && props.setMessage(SUCCESS, result.message))
                        : props.setMessage(ERROR, result.message))
                ).finally(() => resetChanges());

                break;
            }

            case STATUS: {

                statusChange(`backend/modules/module-active-status/${props.moduleList[payload.index].id}`).then(result =>
                    ((result.success) ?
                        (props.changeModule(result.data) && props.setMessage(SUCCESS, result.message))
                        : props.setMessage(ERROR, result.message))
                ).finally(() => resetChanges());

                break;
            }

            default:
                break;
        }
    }

    const resetChanges = () => {
        setTimeout(() => {
            props.resetMessage();
        }, 3000);
    }


    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}
            <div className="col-md-7 mb-3">
                <div className="custom-card-box">
                    <div className="custom-card-box-header">
                        <div className="fbh-title">
                            <i className="icon-list2"/>
                            <h2>Module List</h2>
                            <Link legacyBehavior href={'/admin/module/add'}>
                                <a className="fbh-btn"
                                   title="Add Module">
                                    <i className="icon-plus-square-regular"></i>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="custom-card-box-content p-md-3 p-2">
                        <div className="row table-top-option mb-md-3 mb-2">
                            <div className="col-6">
                                <div className="showing-table-row">
                                    <label className="">Show</label>
                                    <select
                                        className="custom-select"
                                        defaultValue={`10`}
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
                            <div className="col-6">
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
                                <div className="table-responsive custom-table custom-hight-500">
                                    <Loader loaded={!!meta} options={options} className="spinner">
                                        <table className="table table-bordered table-hover mb-0 carsour-pointer">
                                            <thead className="thead-light">

                                            <ModuleHeader
                                                setColumn={setColumn}
                                                setOrderBy={setOrderBy}
                                                column={column}
                                                orderBy={orderBy}/>

                                            </thead>
                                            <tbody>

                                            {
                                                (props.moduleList && (props.moduleList.length > 0)) ? props.moduleList.map((module, index) => (
                                                    <tr
                                                        key={index}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.setModule(module);
                                                        }}

                                                        className={`text-center ${(props.module ? props.module.id === module.id : '') ? 'bg-warning' : ''}`}>

                                                        <td className="nowrap text-center ">{meta.from ? index + meta.from : ''}</td>

                                                        <td className="nowrap text-center">
                                                            {module.name}
                                                        </td>

                                                        <td className="text-center text-nowrap">
                                                            {module.permissions ? module.permissions.length : 0}
                                                        </td>

                                                        <td className="text-center">
                                                            {module.status}
                                                        </td>
                                                        <td className="text-center">
                                                            <ModuleActions
                                                                module={module}
                                                                moduleIndex={index}
                                                                actions={actionsModule}/>
                                                        </td>

                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Module Found</td>
                                                    </tr>
                                                )
                                            }

                                            </tbody>
                                        </table>
                                    </Loader>
                                </div>
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
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setModuleList: (moduleList) => dispatch({type: SET_MODULE_LIST, payload: {moduleList}}),
        changeModule: (module) => dispatch({type: CHANGE_MODULE, payload: {module}}),
        removeModule: (id) => dispatch({type: REMOVE_MODULE, payload: {id}}),
        setModule: (module) => dispatch({type: SET_MODULE, payload: {module}}),
        setMessage: (message_type, message) => dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_MESSAGE})
    }
}

const mapStateToProps = (store) => {
    const {moduleList, module, message} = store.moduleStore;
    return {moduleList, module, message};
}


export default connect(mapStateToProps, mapDispatchToProps)(ModuleList);