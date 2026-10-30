import axios from 'axios'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
    ERROR,
    getActions,
    saveAction,
    SUCCESS
} from '../../../Helpers/Utils/Utils'
import {
    RESET_REPORT_ISSUE_DATA,
    SET_ALL_REPORT_ISSUES,
    SET_MESSAGE,
    SET_REPORT_DESCRIPTION,
    SET_REPORT_ISSUE_DATA
} from '../../../store/frontend/actions/customerOrderActions'
import Error from '../../Admin/Notification/Error'
import Success from '../../Admin/Notification/Success'

const OrderDetails = (props) => {
    let selectedReportIssues =
        props.reportIssueData.report_issue &&
        props.reportIssueData.report_issue.map(({id}) => id)

    const router = useRouter()

    useEffect(() => {
        let mounted = true

        mounted &&
        getActions(`/backend/reportIssues`, false)
            .then((res) => {
                props.setAllReportIssues(res.data)
            })
            .finally(() => (mounted = false))
    }, [])

    const reportSave = (e) => {
        // /customer-reports
        e.preventDefault()

        if (props.reportIssueData.report_issue.length > 0) {
            saveAction(`/customer-reports`, props.reportIssueData)
                .then((res) => {
                    props.setMessage(SUCCESS, res.message)
                })
                .finally(() => resetChanges())
        } else {
            props.setMessage(ERROR, 'No Report Item Selected')
            resetChanges()
        }
    }

    const resetChanges = () => {
        setTimeout(() => props.resetReportIssue(), 2000)
        router.reload()
    }

    const paymentApiRequest = async (cartItem) => {
        return await axios
            .post(`ssl-payment-submit`, cartItem)
            .then((result) => {
                return result.data
            })
            .catch((err) => {
                return err
            })
    }

    return (
        <>
            {props.message.success && <Success message={props.message.success}/>}
            {props.message.error && <Error message={props.message.error}/>}

            <div className='custom-card-box mb-3'>
                <div className='custom-card-box-header border-bottom-0'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <ul className='nav global-nav'>
                                <li className='nav-item'>
                                    <Link legacyBehavior href={`/user/invoice/${props.order.id}`}>
                                        <a className='nav-link'>
                                            <i className='icon-print-solid mr-1'/>
                                            <span>Print Invoice</span>
                                        </a>
                                    </Link>
                                </li>
                                {props.order.payment_status === 'Due' &&
                                props.order.sale_type === 'ECOM' && (
                                    <li className='nav-item'>
                                        <button
                                            type='button'
                                            className='nav-link btn'
                                            onClick={(event) => {
                                                event.preventDefault()
                                                paymentApiRequest({
                                                    id: props.order.id,
                                                    address_id: props.order.address_id,
                                                })
                                                    .then((response) => {
                                                        if (response.success) {
                                                            router.replace(response.data)
                                                        } else {
                                                            router.replace('/payment/payment-failure')
                                                        }
                                                    })
                                                    .catch((errors) => {
                                                        console.log(errors)
                                                    })
                                            }}
                                        >
                                            <i className='fas fa-money-bill-alt mr-1'/>
                                            <span>Payment</span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='custom-card-box mb-3'>
                <div className='custom-card-box-header'>
                    <div className='fbh-title'>
                        <i className='icon-eye-regular'/>
                        <h2>Order Details #{props.order.order_number}</h2>
                        <h2 className='ml-auto border-0'>
                            {/* <a href='#' data-toggle='modal' data-target='#reportOrderModal'>
								Report Issues
							</a> */}
                        </h2>
                    </div>
                </div>

                {
                    props?.order && (
                        <div className='custom-card-box-content p-md-3 p-2'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='card mb-md-3 mb-2 rounded-0'>
                                        <div className='card-body card-da-dtl rounded-0'>
                                            <i className='icon-map-marker-alt-solid'/>
                                            <h6 className='card-title mb-2'>Delivery address</h6>
                                            <p
                                                className='card-subtitle mb-0 text-muted'
                                                style={{whiteSpace: 'pre-line'}}
                                            >
                                                Name : {props.order.delivery_address_info?.first_name}
                                                {` `}
                                                {props.order.delivery_address_info?.last_name}
                                                {`\n`}
                                                Address: {props.order.delivery_address_info?.address}
                                                {`, `}
                                                {props.order.delivery_address_info?.area?.name}
                                                {`, `}
                                                {props.order.delivery_address_info?.location?.name}
                                                {`\n`}
                                                Cell Phone: {props.order.delivery_address_info?.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='table-responsive custom-table'>
                                        <table className='table table-bordered table-hover mb-0 table-order-details'>
                                            <thead className='thead-light'>
                                            <tr>
                                                <th scope='col'>SL</th>
                                                <th scope='col'>Img</th>
                                                <th scope='col'>Name</th>
                                                <th scope='col'>Qty.</th>
                                                <th scope='col'>Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {props.order &&
                                            props.order.saleProducts &&
                                            props.order.saleProducts.length > 0 ? (
                                                props.order.saleProducts.map((item, index) => (
                                                    <tr key={index} className='text-center'>
                                                        <td scope='row'>{++index}</td>

                                                        <td className='text-center'>
                                                            <img
                                                                src={item.productDetails.feature_image}
                                                                alt='Product Img'
                                                            />
                                                        </td>
                                                        <td className='text-center'>
                                                            <h6 className='text-875 mb-1'>
                                                                {item.productDetails.name}
                                                            </h6>
                                                            <p className='mb-0 text-75 text-muted'>
                                                                {item.productDetails.weight}{' '}
                                                                {item.productDetails.sale_unit} / ৳{' '}
                                                                {item.unit_price}
                                                            </p>
                                                        </td>
                                                        <td className='text-center text-nowrap'>
                                                            {item.quantity} {item.sale_unit}
                                                        </td>
                                                        <td className='text-center text-nowrap'>
                                                            ৳ {item.sub_total.toFixed(2)}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

            <div
                className='modal fade'
                id='reportOrderModal'
                tabIndex='-1'
                aria-labelledby='reportOrderLebel'
                aria-hidden='true'
            >
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content rounded-0 border-0'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='reportOrderLebel'>
                                What went wrong?
                            </h5>
                            <button
                                type='button'
                                className='close'
                                data-dismiss='modal'
                                aria-label='Close'
                            >
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            {props.allReportIssues &&
                            props.allReportIssues.length > 0 &&
                            props.allReportIssues.map((rIssue, index) => {
                                return selectedReportIssues.includes(rIssue.id) ? (
                                    <div className='check-list-report' key={index}>
                                        <input
                                            type='checkbox'
                                            id={rIssue.id}
                                            className='vh'
                                            checked={selectedReportIssues.includes(rIssue.id)}
                                        />

                                        <label htmlFor={rIssue.id}>{rIssue.name}</label>
                                    </div>
                                ) : (
                                    <div className='check-list-report' key={index}>
                                        <input
                                            name={rIssue.name}
                                            type='checkbox'
                                            id={rIssue.id}
                                            onChange={(e) => {
                                                props.setReportIssueData(e)
                                            }}
                                            className='vh'
                                        />

                                        <label htmlFor={rIssue.id}>{rIssue.name}</label>
                                    </div>
                                )
                            })}

                            <div className='form-group mt-4 pt-1'>
								<textarea
                                    value={props.reportIssueData.description}
                                    className='form-control rounded-0'
                                    rows='3'
                                    onChange={(e) => props.setDescription(e.target.value)}
                                    placeholder='Please describe issues ...'
                                />
                            </div>
                        </div>

                        <div className='modal-footer'>
                            <button
                                type='button'
                                className='btn btn-secondary rounded-0'
                                data-dismiss='modal'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={reportSave}
                                className='btn btn-danger rounded-0'
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAllReportIssues: (allReportIssues) =>
            dispatch({type: SET_ALL_REPORT_ISSUES, payload: {allReportIssues}}),
        setDescription: (description) =>
            dispatch({type: SET_REPORT_DESCRIPTION, payload: {description}}),
        setReportIssueData: (e) =>
            dispatch({type: SET_REPORT_ISSUE_DATA, payload: {e}}),
        setMessage: (message_type, message) =>
            dispatch({type: SET_MESSAGE, payload: {message_type, message}}),
        resetReportIssue: () => dispatch({type: RESET_REPORT_ISSUE_DATA}),
    }
}

const mapStateToProps = (store) => {
    let {order, allReportIssues, reportIssueData, message} = store.orderStore
    return {order, allReportIssues, reportIssueData, message}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
