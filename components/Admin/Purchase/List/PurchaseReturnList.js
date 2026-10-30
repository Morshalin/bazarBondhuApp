import React from 'react'
import { connect } from 'react-redux'

const PurchaseReturnList = (props) => {
	return (
		<>
			<div className='custom-card-box mb-3'>
				<div className='custom-card-box-header'>
					<div className='fbh-title'>
						<i className='icon-table' />
						<h2>Adjustment List</h2>
					</div>
				</div>
				<div className='custom-card-box-content p-md-3 p-2'>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='table-responsive custom-table'>
								<table className='table table-bordered table-hover mb-3 table-order-details'>
									<thead className='thead-light'>
										<tr>
											<th scope='col' className='text-left'>
												Sl
											</th>
											<th scope='col'>Img</th>
											<th scope='col'>Name</th>
											<th scope='col'>Type</th>
											<th scope='col'>Qty</th>
											<th scope='col'>Price</th>
											<th scope='col'>Amount</th>
										</tr>
									</thead>
									<tbody>
										{props?.purchase?.purchaseReturn?.length > 0 ? (
											props?.purchase?.purchaseReturn?.map((item, index) => (
												<tr>
													<td scope='row' className='text-left' key={item.id}>
														{++index}
													</td>
													<td scope='row' className='text-left'>
														<img src={item.product.image} alt='Product Img' />
													</td>
													<td scope='row' className='text-left'>
														{item.product.name}
													</td>
													<td scope='row' className='text-left'>
														{item?.return_type}
													</td>
													<td scope='row' className='text-center'>
														{item.return_quantity}
													</td>
													<td className='text-center'>{item.purchase_price}</td>
													<td className='text-center'>
														{item.return_quantity * item.purchase_price}
													</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan='7' className='text-center'>
													No record found
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
	const { purchase } = store.purchaseListStore
	return { purchase }
}

export default connect(mapStateToProps, null)(PurchaseReturnList)
