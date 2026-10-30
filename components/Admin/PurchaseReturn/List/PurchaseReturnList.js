import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {SET_PURCHASE_RETURN, SET_PURCHASE_RETURN_LIST} from "../../../../store/admin/actions/purchaseReturn/purchaseReturnListAction";
import ReactPaginate from "react-paginate";
import {options} from "../../../../Helpers/Utils/Utils";
import Loader from "react-loader";

const PurchaseReturnList = (props) => {

    const [show, setShow] = useState(10);
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(0);

    useEffect(() => {

        let mounted = true;

        fetchPurchaseReturnList().then((response) => {
            if (mounted) {
                props.setPurchaseReturnList(response.data);
                setMeta(response.meta);
            }
        }).finally(() => {
            mounted = false;
        })
    }, [show, keywords, page]);


    const fetchPurchaseReturnList = async () => {

        let url = `backend/purchase_returns?page=${page}&show=${show}&keywords=${keywords}`;

        return await axios.get(url)
            .then((result) => result.data.data).catch((error) => error);
    }

    return (
        <>
            <div className="col-md-7 mb-3">
                <Loader loaded={!!props.purchaseReturnList} options={options} className="spinner">
                    <div className="custom-card-box">
                    <div className="custom-card-box-header">
                        <div className="fbh-title">
                            <i className="icon-list2"/>
                            <h2>Purchase Return List</h2>
                            <a
                                className="fbh-btn"
                                title="Add Purchase Return"
                                href="/admin/purchases-return/add">
                                <i className="icon-plus-square-regular"></i>
                            </a>
                        </div>

                    </div>

                    <div className="custom-card-box-content p-md-3 p-2">
                        <div className="row table-top-option mb-md-3 mb-2">
                            <div className="col-6">
                                <div className="showing-table-row">
                                    <label className="">Show</label>
                                    <select
                                        className="custom-select"
                                        defaultValue={show ?? 10}
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
                                            setTimeout(() => {
                                                setMeta('');
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
                                    <table className="table table-bordered table-hover mb-0 carsour-pointer">
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">SL</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Reference No</th>
                                            <th scope="col">Grand Total</th>
                                            <th scope="col">Supplier</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            ((props.purchaseReturnList) && (props.purchaseReturnList.length > 0)) ? (props.purchaseReturnList.map((item, index) =>
                                                (
                                                    <tr
                                                        key={item.id}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            props.setPurchaseReturn(item);
                                                        }}
                                                        className={`text-center ${(props.purchaseReturn.id === item.id) ? `bg-warning` : ``}`}>
                                                        <td className="nowrap text-center ">{meta.from ? index + meta.from : ''}</td>

                                                        <td className="nowrap text-center">
                                                            {item.return_date ? new Date(item.return_date).toLocaleString() : "-"}
                                                        </td>

                                                        <td className="nowrap text-center">
                                                            {item.reference_no ?? "-"}
                                                        </td>

                                                        <td className="text-center text-nowrap">
                                                            ৳ {item.grand_total}
                                                        </td>

                                                        <td className="text-center">
                                                            {item.supplier ?? "-"}
                                                        </td>
                                                        <td className="text-center">
                                                            {item.status ?? "-"}
                                                        </td>

                                                    </tr>
                                                )
                                            )) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">No Purchase Return Found
                                                    </td>
                                                </tr>
                                            )
                                        }

                                        </tbody>
                                    </table>
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
                </Loader>
            </div>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPurchaseReturnList: (purchaseReturnList) => dispatch({
            type: SET_PURCHASE_RETURN_LIST,
            payload: {purchaseReturnList}
        }),
        setPurchaseReturn: (purchaseReturn) => dispatch({
            type: SET_PURCHASE_RETURN,
            payload: {purchaseReturn}
        })
    }
}

const mapStateToProps = (store) => {
    const {purchaseReturnList, purchaseReturn} = store.purchaseReturnListStore;

    return {purchaseReturnList, purchaseReturn};
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseReturnList);