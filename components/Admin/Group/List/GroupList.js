import React, {useEffect, useState} from 'react';
import Link from "next/link";
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
import {connect} from "react-redux";
import {
    CHANGE_GROUP,
    REMOVE_GROUP,
    RESET_MESSAGE,
    SET_GROUP,
    SET_GROUP_LIST,
    SET_MESSAGE
} from "../../../../store/admin/actions/group/groupAction";
import GroupActions from "./GroupActions";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
import GroupHeader from "./GroupHeader";

const GroupList = (props) => {

    const [show, setShow] = useState(10);
    const [column, setColumn] = useState('id');
    const [orderBy, setOrderBy] = useState('DESC');
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {

        let mounted = true;

        getActions(`backend/getAllRoles?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`, true).then((response) => {
            if (mounted && response) {
                setMeta(response.meta);
                props.setGroupList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });


    }, [show, keywords, page, column, orderBy]);


    const actionsGroup = (actions) => {

        let {type, payload} = actions;

        switch (type) {

            case DELETE: {

                deleteAction(`backend/roles/${props.groupList[payload.index].id}`).then((result) => {
                    result.success ? (props.removeGroup(props.groupList[payload.index].id) && props.setMessage(SUCCESS, result.message))
                        : props.setMessage(ERROR, result.message);
                    resetChanges();
                })

                break;
            }

            case STATUS: {

                statusChange(`backend/roles/role-active-status/${props.groupList[payload.index].id}`).then((result) => {

                    result.success ? (props.changeGroup(result.data) && props.setMessage(SUCCESS, result.message))
                        : props.setMessage(ERROR, result.message);

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
            props.resetMessage();
        }, 2000);
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
                            <h2>Group List</h2>

                            <Link legacyBehavior href={'/admin/group/add'}>
                                <a className="fbh-btn"
                                   title="Add Group">
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

                                            <GroupHeader
                                                setColumn={setColumn}
                                                setOrderBy={setOrderBy}
                                                column={column}
                                                orderBy={orderBy}/>

                                            </thead>

                                            <tbody>

                                            {
                                                (props.groupList && (props.groupList.length > 0)) ? props.groupList.map((group, index) => (
                                                    <tr
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.setGroup(group);

                                                        }}
                                                        className={`text-center ${(group.id === props.group.id) ? `bg-warning` : ``}`}
                                                        key={index}>
                                                        <td className="nowrap text-center ">{meta.from ? index + meta.from : ''}</td>

                                                        <td className="nowrap text-center">
                                                            {group.name}
                                                        </td>

                                                        <td className="text-center text-nowrap">
                                                            {group.permissions.length}
                                                        </td>

                                                        <td className="text-center">
                                                            {group.status}
                                                        </td>

                                                        <td className="text-center">
                                                            <GroupActions
                                                                groupIndex={index}
                                                                group={group}
                                                                actions={actionsGroup}/>
                                                        </td>

                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5" className="text-center">No Group Found</td>
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
        setGroupList: (groupList) => dispatch({type: SET_GROUP_LIST, payload: {groupList}}),
        setMessage: (message_type, message) => dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_MESSAGE}),
        changeGroup: (group) => dispatch({type: CHANGE_GROUP, payload: {group}}),
        removeGroup: (id) => dispatch({type: REMOVE_GROUP, payload: {id}}),
        setGroup: (group) => dispatch({type: SET_GROUP, payload: {group}})
    }
}

const mapStateToProps = (store) => {
    const {groupList, group, message} = store.groupStore;

    return {groupList, group, message};
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);