import React from 'react'
import { connect } from 'react-redux'

const OrderPaymentHistory = (props) => {
	return (
		<>
			<div className='custom-card-box mb-3'>
				<div className='custom-card-box-header'>
					<div className='fbh-title'>
						<i className='icon-table' />
						<h2>Payment History</h2>
					</div>
				</div>
				<div className='custom-card-box-content p-md-3 p-2'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='table-responsive custom-table'>
								<table className='table table-bordered table-hover mb-0 table-order-details'>
									<thead className='thead-light'>
										<tr>
											<th scope='col' className='text-left'>
												Payment Method
											</th>
											<th scope='col'>Transaction Id</th>
											<th scope='col'>Status</th>
											<th scope='col'>Date & Time</th>
										</tr>
									</thead>
									<tbody>
										{props.order &&
										props.order.paymentHistory &&
										props.order.paymentHistory.length > 0 ? (
											props.order.paymentHistory.map((item, index) => (
												<tr key={item.id}>
													<td scope='row' className='text-left'>
														{item.gateway}
													</td>
													<td scope='row' className='text-left'>
														{item.trans_id}
													</td>
													<td scope='row' className='text-left'>
														{item.payment_status}
													</td>
													<td className='text-center'>
														{item.created_at
															? new Date(item.created_at).toLocaleString()
															: '-'}
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan='4' className='text-center'>
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
			</div>
		</>
	)
}

const mapStateToProps = (store) => {
	let { order } = store.orderStore
	return { order }
}

export default connect(mapStateToProps, null)(OrderPaymentHistory)
