import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const ProductSalesTable = (props) => {
	const [purchaseList, setPurchaseList] = useState('')
	const [meta, setMeta] = useState('')
	const [page, setPage] = useState(1)
	useEffect(() => {
		let mounted = true

		axios
			.get(`backend/product-purchase-list/${props.productId}?page=${page}`)
			.then((response) => {
				if (mounted && response.data.data) {
					setMeta(response.data.data.meta)
					setPurchaseList(response.data.data.data)
				}
			})
			.finally(() => {
				mounted = false
			})
	}, [page, props.productId])

	return (
		<>
			<div className='table-responsive'>
				<table className='table table-bordered table-striped table-hover text-center'>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>SL</th>
							<th scope='col'>Invoice Number</th>
							<th scope='col'>Invoice Date</th>
							<th scope='col'>Supplier Name</th>
							<th scope='col'>Cell Phone</th>
							<th scope='col'>Purchases Quantity</th>
							<th scope='col'>Purchases Price</th>
							<th scope='col'>Total Price</th>
							<th scope='col' className='nowrap'>
								Expiry Date
							</th>
						</tr>
					</thead>
					<tbody>
						{purchaseList &&
							purchaseList.map((purchases, index) => (
								<tr key={++index}>
									<td>{meta.from ? index + meta.from : ''}</td>
									<td>{purchases.invoice_number}</td>
									<td>{purchases.invoice_date}</td>
									<td>{purchases.supplier_name}</td>
									<td>{purchases.phone}</td>
									<td>{purchases.purchase_quantity}</td>
									<td>{purchases.purchase_price}</td>
									<td>{purchases.grand_total}</td>
									<td className='nowrap'>{purchases.expiry_date}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className='text-center'>
				{meta && (
					<nav aria-label='Page navigation example' className='d-flex justify-content-center'>
						<ReactPaginate
							previousLabel={'previous'}
							nextLabel={'next'}
							breakLabel={'...'}
							pageCount={meta.last_page}
							marginPagesDisplayed={2}
							pageRangeDisplayed={2}
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
		</>
	)
}

export default ProductSalesTable
