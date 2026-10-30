import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import Loader from 'react-loader'
import ReactPaginate from 'react-paginate'
import {connect} from 'react-redux'
import {getActions, options} from '../../../Helpers/Utils/Utils'
import {
    RESET_ORDER_INFO,
    SELECT_ORDER,
    SET_CUSTOMER_ORDERS
} from '../../../store/frontend/actions/customerOrderActions'
import OrderHeader from './OrderHeader'

const OrderList = (props) => {
    const [show, setShow] = useState(10)
    const [column, setColumn] = useState('id')
    const [orderBy, setOrderBy] = useState('DESC')
    const [keywords, setKeywords] = useState('')
    const [meta, setMeta] = useState('')
    const [page, setPage] = useState(0)

    const router = useRouter()

    const {id} = router.query

    useEffect(() => {
        props.resetOrderInfo();
        let mounted = true

        getActions(
            `get-customer-orders?page=${page}&show=${show}&keywords=${keywords}&column=${column}&orderBy=${orderBy}`,
            true
        )
            .then((res) => {
                if (mounted && res) {
                    setMeta(res.meta)
                    props.setOrders(res.data)
                }
            })
            .finally(() => {
                mounted = false
            })
    }, [show, keywords, page, column, orderBy]);

    useEffect(() => {
        id && getActions(`backend/sales/${id}`, false)
            .then((res) => {
                if (res.success) {
                    props.selectOrder(res.data);
                }
            }).catch((err) => err);
    }, [id])

    return (
        <>
            <div className='col-md-7 mb-3'>
                <div className='custom-card-box'>
                    <div className='custom-card-box-header'>
                        <div className='fbh-title'>
                            <i className='icon-list2'/>
                            <h2>Order List</h2>
                        </div>
                    </div>
                    <div className='custom-card-box-content p-md-3 p-2'>
                        <div className='row table-top-option mb-md-3 mb-2'>
                            <div className='col-6'>
                                <div className='showing-table-row'>
                                    <label className=''>Show</label>
                                    <select
                                        className='custom-select'
                                        value={show ?? 10}
                                        onChange={(e) => {
                                            setMeta('')
                                            setShow(e.target.value)
                                            setPage(1)
                                        }}
                                    >
                                        <option value='10'>10</option>
                                        <option value='25'>25</option>
                                        <option value='50'>50</option>
                                        <option value='100'>100</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='table-search'>
                                    <label className=''>Search</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Search here ...'
                                        onChange={(e) => {
                                            setMeta('')

                                            setTimeout(() => {
                                                setKeywords(e.target.value)
                                                setPage(1)
                                            }, 500)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='table-responsive custom-table custom-hight-800'>
                                    <Loader loaded={!!meta} options={options} className='spinner'>
                                        <table className='table table-bordered table-hover mb-0 carsour-pointer'>
                                            <thead className='thead-light'>
                                            <OrderHeader
                                                setColumn={setColumn}
                                                setOrderBy={setOrderBy}
                                                column={column}
                                                orderBy={orderBy}
                                            />
                                            </thead>
                                            <tbody>
                                            {props.orderList && props.orderList.length > 0 ? (
                                                props.orderList.map((order, index) => (
                                                    <tr
                                                        key={index}
                                                        onClick={() => {
                                                            props.selectOrder(order)

                                                            router.push({
                                                                pathname: `/user/order-info/${order.id}`,
                                                            })
                                                        }}
                                                        className={`text-center ${
                                                            (id ? order.id == id : order.id === props.order.id)
                                                                ? `bg-warning`
                                                                : ``
                                                        }`}
                                                    >
                                                        <td className='nowrap'>
                                                            {meta.from ? index + meta.from : ''}
                                                        </td>
                                                        <td className='nowrap text-center'>
                                                            {order.order_number}
                                                        </td>

                                                        <td className='text-center text-nowrap'>
                                                            ৳ {order.grand_total}
                                                        </td>

                                                        <td className='text-center'>
                                                            {order.payment_status ?? 'Due'}
                                                        </td>
                                                        <td className='text-center'>
                                                            {order.order_status}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan='5' className='text-center'>
                                                        No Order Found
                                                    </td>
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
                            aria-label='Page navigation example'
                            className='d-flex justify-content-center'
                        >
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                pageCount={meta.last_page}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={3}
                                onPageChange={(pageNumber) => {
                                    setPage(pageNumber.selected + 1)
                                }}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                activeClassName={'active'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                            />
                        </nav>
                    )}
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrders: (orderList) =>
            dispatch({type: SET_CUSTOMER_ORDERS, payload: {orderList}}),
        selectOrder: (order) =>
            dispatch({type: SELECT_ORDER, payload: {order}}),
        resetOrderInfo: () => dispatch({type: RESET_ORDER_INFO})
    }
}

const mapStateToProps = (store) => {
    let {orderList, order} = store.orderStore
    return {orderList, order}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
