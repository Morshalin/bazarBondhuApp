import React, {useEffect, useState} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {SET_ADJUSTMENT, SET_ADJUSTMENT_LIST} from "../../../../store/admin/actions/adjustment/adjustmentListAction";
import ReactPaginate from "react-paginate";
import Loader from "react-loader";
import {options} from "../../../../Helpers/Utils/Utils";

const AdjustmentList = (props) => {

    const [show, setShow] = useState(10);
    const [keywords, setKeywords] = useState('');
    const [meta, setMeta] = useState('');
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {

        let mounted = true;

        fetchAdjustmentList().then((response) => {
            if (mounted) {
                props.setAdjustmentList(response.data);
                setMeta(response.meta);
                setLoaded(true);
            }
        }).finally(() => {
            mounted = false;
        })
    }, [show, keywords, page]);

    const fetchAdjustmentList = async () => {

        let url = `backend/adjustments?page=${page}&show=${show}&keywords=${keywords}`;

        return await axios.get(url)
            .then((result) => result.data.data).catch((error) => error);
    }


    return (
        <>
            <div className="col-md-6">

                <div className="custom-card-box">
                    <div className="custom-card-box-header">
                        <div className="fbh-title">
                            <i className="icon-list2"/>
                            <h2>Adjustment List</h2>
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
                                        }}/>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive custom-table custom-hight-500">
                                    <Loader loaded={loaded} options={options} className="spinner">
                                        <table className="table table-bordered table-hover mb-0 carsour-pointer">
                                            <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Sl</th>
                                                <th scope="col">Ref. No.</th>
                                                <th scope="col">Date</th>
                                                <th scope={'col'}>Created By</th>
                                            </tr>
                                            </thead>


                                            <tbody>
                                            {props.adjustmentList ? props.adjustmentList.map((adjustment, index) => (
                                                <tr
                                                    key={adjustment.id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        props.setAdjustment(adjustment.adjusted_lists);
                                                    }}
                                                    className={`text-center ${(props.adjustment[0] ? props.adjustment[0].adjustment_id === adjustment.id : '') ? 'bg-warning' : ''}`}>

                                                    <td scope="row">{meta.from ? index + meta.from : ''}</td>
                                                    <td scope="row">{adjustment.reference_no}</td>
                                                    <td scope="row">{adjustment.adjustment_date}</td>
                                                    <td scope="row">{adjustment.creator}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No Adjustment Fount</td>
                                                </tr>
                                            )}


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
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
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
        setAdjustmentList: (adjustmentList) => dispatch({type: SET_ADJUSTMENT_LIST, payload: {adjustmentList}}),
        setAdjustment: (adjustment) => dispatch({type: SET_ADJUSTMENT, payload: {adjustment}}),
    }
}

const mapStateToProps = (store) => {
    const {adjustmentList, adjustment} = store.adjustmentListStore;
    return {adjustmentList, adjustment};

}


export default connect(mapStateToProps, mapDispatchToProps)(AdjustmentList);