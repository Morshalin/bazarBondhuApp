import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import Success from "../Notification/Success";
import Error from "../Notification/Error";
import PagesTableHeader from "./PagesTableHeader";
import {STATUS} from "../../../Helpers/Utils/Utils";

const PagesList = () => {
    const [show, setShow] = useState(10);
    const [keywords, setKeywords] = useState("");
    const [meta, setMeta] = useState("");
    const [page, setPage] = useState(0);
    const [column, setColumn] = useState('sort_order');
    const [orderBy, setOrderBy] = useState('ASC');
    const [itemList, setItemList] = useState("");
    let initialMessage = {success: "", error: ""};
    const [message, setMessage] = useState(initialMessage);
    useEffect(() => { (async () => {
        await loadAllPages();
    })(); }, [show, keywords, page, orderBy, column]);


    const loadAllPages = async () => {

        let response = await axios
            .get(
                `/backend/posts?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`
            )
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                return error;
            });
        if (response.success) {
            setItemList(response.data.data);
            setMeta(response.data.meta);
        }
    };

    const deletePage = async (post_id) => {
        await axios
            .delete(`/backend/posts/${post_id}`)
            .then((result) => {
                if (result.data.success) {
                    setMessage({...message, success: result.data.message});
                    setItemList(itemList.filter((menu) => menu.id !== post_id));
                    if (!itemList) {
                        loadAllPages();
                    }
                } else {
                    setMessage({...message, error: result.data.message});
                }
            })
            .catch((error) => {
                setMessage({...message, error: error});
            });
        resetChanges();
    };

    const disableEnable = async (post_id) => {
        await axios
            .post(`/backend/posts/post-active-status/${post_id}`)
            .then((result) => {
                if (result.data.success) {
                    loadAllPages();
                    setMessage({...message, success: result.data.message});
                } else {
                    setMessage({...message, error: result.data.message});
                }
                console.log(result);
            })
            .catch((error) => {
                setMessage({...message, error: error});
            });
        resetChanges();
    };

    const resetChanges = () => {
        setTimeout(() => {
            setMessage({...message, success: "", error: ""});
        }, 2000);
    };

    return (
        <>
            {message.success && <Success message={message.success}/>}
            {message.error && <Error message={message.error}/>}
            <section className="custom-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="custom-card-box">
                                <div className="custom-card-box-header">
                                    <div className="fbh-title">
                                        <i className="icon-list2"/>
                                        <h2>Pages List</h2>
                                        <Link legacyBehavior href={`/admin/pages/add`}>
                                            <a className="fbh-btn" title="Add new page">
                                                <i className="icon-plus-square-regular"/>
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
                                                    defaultValue={`10`}
                                                    onChange={(event) => {
                                                        setMeta("");
                                                        setShow(event.target.value);
                                                    }}
                                                >
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
                                                    placeholder="Search..."
                                                    onChange={(event) => {
                                                        setTimeout(() => {
                                                            setMeta("");
                                                            setKeywords(event.target.value);
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
                                                <table
                                                    className="table table-bordered table-hover mb-0 carsour-pointer">
                                                    <thead className="thead-light">

                                                    <PagesTableHeader
                                                        setColumn={setColumn}
                                                        setOrderBy={setOrderBy}
                                                        column={column}
                                                        orderBy={orderBy}/>

                                                    </thead>
                                                    <tbody id="table">
                                                    {itemList &&
                                                    itemList.map((pageItem, index) => (
                                                        <tr key={index} className="text-center">
                                                            <td scope="row">{index + 1}</td>
                                                            <td className="nowrap">
                                                                {pageItem.name ?? "-"}
                                                            </td>
                                                            <td className="nowrap">
                                                                {pageItem.slug ?? "-"}
                                                            </td>

                                                            <td className="nowrap">
                                                                {pageItem.sort_order ?? "-"}
                                                            </td>
                                                            <td className="text-center">
                                                                <i
                                                                    className={
                                                                        pageItem.status === 1
                                                                            ? `fas fa-circle text-success`
                                                                            : `fas fa-circle text-danger`
                                                                    }
                                                                    id={`permission_status_${pageItem.id}`}
                                                                />
                                                            </td>
                                                            <td className="text-center">
                                                                <div className="dropdown action-btn-group">
                                                                    <button
                                                                        className="btn btn-outline-primary rounded-0 btn-sm dropdown-toggle"
                                                                        type="button"
                                                                        data-toggle="dropdown"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                    >
                                                                        Actions
                                                                    </button>

                                                                    <div className="dropdown-menu">
                                                                        <Link legacyBehavior
                                                                            href={`pages/edit/${pageItem.id}`}
                                                                        >
                                                                            <a className="dropdown-item">
                                                                                <i className="icon-pencil-alt text-primary"/>
                                                                                Edit
                                                                            </a>
                                                                        </Link>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            onClick={(event) => {
                                                                                event.preventDefault();
                                                                                if (window.confirm('Are you sure you want to delete this?')) {
                                                                                    deletePage(pageItem.id);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <i className="icon-trash-alt-regular text-danger"/>
                                                                            Delete
                                                                        </a>
                                                                        <div className="dropdown-divider"></div>
                                                                        <a
                                                                            className="dropdown-item"
                                                                            href="#"
                                                                            onClick={(event) => {
                                                                                event.preventDefault();
                                                                                disableEnable(pageItem.id);
                                                                            }}
                                                                        >
                                                                            <i
                                                                                className={`icon-sphere ${
                                                                                    pageItem.status === 1
                                                                                        ? "text-danger"
                                                                                        : "text-success"
                                                                                }`}
                                                                            />
                                                                            {pageItem.status === 1
                                                                                ? "Disabled"
                                                                                : "Enabled"}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            {meta && (
                                                <nav
                                                    aria-label="Page navigation example"
                                                    className="d-flex justify-content-center"
                                                >
                                                    <ReactPaginate
                                                        previousLabel={"Previous"}
                                                        nextLabel={"Next"}
                                                        breakLabel={"..."}
                                                        pageCount={meta.last_page}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={2}
                                                        onPageChange={(pageNumber) => {
                                                            setPage(pageNumber.selected + 1);
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
                                                        breakLinkClassName={"page-link"}
                                                    />
                                                </nav>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PagesList;
