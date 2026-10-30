import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
const ProductSalesTable = (props) => {
	const [saleList, setSaleList] = useState('')
	const [meta, setMeta] = useState('')
	const [page, setPage] = useState(1)
	useEffect(() => {
		let mounted = true
		axios
			.get(`backend/product-sale-list/${props.productId}?page=${page}`)
			.then((response) => {
				if (mounted && response.data.data) {
					setMeta(response.data.data.meta)
					setSaleList(response.data.data.data)
				}
			})
			.finally(() => {
				mounted = false
			})
	}, [page])

	return (
		<>
			<div className='table-responsive'>
				<table className='table table-bordered table-striped table-hover text-center'>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>SL</th>
							<th scope='col'>Order Number</th>
							<th scope='col'>Customer Name</th>
							<th scope='col'>Cell Phone</th>
							<th scope='col'>Quantity</th>
							<th scope='col'>Unit Price</th>
							<th scope='col'>Total Price</th>
							<th scope='col'>Sale Date</th>
						</tr>
					</thead>
					<tbody>
						{saleList &&
							saleList.map((sales, index) => (
								<tr key={++index}>
									<td>{meta.from ? index + meta.from : ''}</td>
									<td>{sales.order_number}</td>
									<td>{sales.customer_name}</td>
									<td>{sales.cell_phone}</td>
									<td>{sales.quantity}</td>
									<td>{sales.unit_price}</td>
									<td>{sales.price}</td>
									<td>{sales.created_at}</td>
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
