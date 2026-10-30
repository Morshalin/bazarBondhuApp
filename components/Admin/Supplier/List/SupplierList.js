import React, {useEffect, useState} from 'react';
import Link from "next/link";
import SupplierHeader from "./SupplierHeader";
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
    CHANGE_SUPPLIER_STATUS,
    REMOVE_SUPPLIER, RESET_SUPPLIER_MESSAGE,
    SET_SUPPLIER,
    SET_SUPPLIER_LIST, SET_SUPPLIER_MESSAGE
} from "../../../../store/admin/actions/supplier/supplierActions";
import SupplierActions from "./SupplierActions";
import Loader from "react-loader";
import ReactPaginate from "react-paginate";
import Success from "../../Notification/Success";
import Error from "../../Notification/Error";
import SingleSupplierModal from "./SingleSupplierModal";

const SupplierList = (props) => {
    const [show, setShow] = useState(10);
    const [column, setColumn] = useState('id');
    const [orderBy, setOrderBy] = useState('DESC');
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(0);


    useEffect(() => {
        let mounted = true;

        getActions(`backend/getAllSuppliers?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`, true).then((response) => {
            if (mounted && response) {
                setMeta(response.meta);
                props.setSupplierList(response.data);
            }
        }).finally(() => {
            mounted = false;
        });

    }, [show, column, orderBy, keywords, page]);


    const actionsSupplier = (actions) => {

        let {type, payload} = actions;

        switch (type) {
            case DELETE: {
                deleteAction(`backend/suppliers/${props.suppliers[payload.index].id}`)
                    .then((res) => {
                        if (res.success) {
                            props.removeSupplier(props.suppliers[payload.index].id);
                            props.setMessage(SUCCESS, res.message);
                        } else {
                            props.setMessage(ERROR, res.message);
                        }
                    }).finally(() => resetChanges());
                break;
            }

            case STATUS: {
                statusChange(`backend/suppliers/supplier-active-status/${props.suppliers[payload.index].id}`)
                    .then((res) => {
                        if (res.success) {
                            props.changeSupplierStatus(res.data);
                            props.setMessage(SUCCESS, res.message);

                        } else {
                            props.setMessage(ERROR, res.message);
                        }
                    }).finally(() => resetChanges());
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
            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-list2"/>
                                        <h2>Supplier List</h2>
                                        <Link legacyBehavior href={`/admin/supplier/add`}>
                                            <a className="fbh-btn" title="Add supplier">
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
                                                        className="table table-bordered table-hover carsour-pointer">

                                                        <thead className="thead-light">

                                                        <SupplierHeader
                                                            setColumn={setColumn}
                                                            setOrderBy={setOrderBy}
                                                            column={column}
                                                            orderBy={orderBy}/>

                                                        </thead>


                                                        <tbody>

                                                        {
                                                            (props.suppliers && (props.suppliers.length > 0)) ? props.suppliers.map((supplier, index) => (
                                                                <tr
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        props.setSupplier(supplier);
                                                                    }}
                                                                    onDoubleClick={(e) => {
                                                                        e.preventDefault();
                                                                        $(`#singleSupplierModal`).modal({show: true});
                                                                    }}
                                                                    className={`text-center ${(supplier.id === props.supplier.id) ? `bg-selected` : ``}`}
                                                                    key={index}>
                                                                    <td scope="row">{meta.from ? index + meta.from : ''}</td>
                                                                    <td className="nowrap">
                                                                        {supplier.name}
                                                                    </td>

                                                                    {/*<td className="nowrap">*/}
                                                                    {/*    {supplier.address ?? '-'}*/}
                                                                    {/*</td>*/}

                                                                    {/*<td className="nowrap">*/}
                                                                    {/*    {supplier.telephone_number ?? '-'}*/}
                                                                    {/*</td>*/}

                                                                    <td className="nowrap">
                                                                        {supplier.mobile_number ?? '-'}
                                                                    </td>

                                                                    <td className="nowrap">
                                                                        {supplier.email ?? '-'}
                                                                    </td>

                                                                    {/*<td className="nowrap">*/}
                                                                    {/*    {supplier.products ?? '-'}*/}
                                                                    {/*</td>*/}

                                                                    {/*<td className="nowrap">*/}
                                                                    {/*    {supplier.web ?? '-'}*/}
                                                                    {/*</td>*/}

                                                                    <td className="text-center">
                                                                        {supplier.active}
                                                                    </td>
                                                                    <td className="text-center">

                                                                        <SupplierActions
                                                                            supplierIndex={index}
                                                                            supplier={supplier}
                                                                            actions={actionsSupplier}/>
                                                                    </td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan="9" className="text-center">
                                                                        No Supplier Found
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

                <SingleSupplierModal supplier={props.supplier}/>

            </section>
        </>
    );
};

const mapStateToProps = (store) => {
    const {suppliers, supplier, message} = store.supplierStore;
    return {suppliers, supplier, message};
}


const mapDispatchToProps = (dispatch) => {
    return {
        setSupplierList: (suppliers) => dispatch({type: SET_SUPPLIER_LIST, payload: {suppliers}}),
        setSupplier: (supplier) => dispatch({type: SET_SUPPLIER, payload: {supplier}}),
        removeSupplier: (id) => dispatch({type: REMOVE_SUPPLIER, payload: {id}}),
        setMessage: (message_type, message) => dispatch({type: SET_SUPPLIER_MESSAGE, payload: {message_type, message}}),
        resetMessage: () => dispatch({type: RESET_SUPPLIER_MESSAGE}),
        changeSupplierStatus: (supplier) => dispatch({type: CHANGE_SUPPLIER_STATUS, payload: {supplier}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierList);
