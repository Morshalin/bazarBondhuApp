import Link from 'next/link'
const EmptyTableCard = (props) => {
	return (
		<>
			<section className='custom-card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='custom-card-box'>
								<div className='custom-card-box-header'>
									<div className='fbh-title'>
										<i className='icon-list2' />
										<h2>Product List</h2>
										<Link legacyBehavior href={`/admin/product/add`}>
											<a className='fbh-btn' title='Add New Product'>
												<i className='icon-plus-square-regular' />
											</a>
										</Link>
									</div>
								</div>
								<div className='custom-card-box-content'>
									<div className='row table-top-option mb-3'>
										<div className='col-sm-6'>
											<div className='showing-table-row'>
												<label className=''>Show</label>
												<select className='custom-select' defaultValue={10}>
													<option value='10'>10</option>
													<option value='25'>25</option>
													<option value='50'>50</option>
													<option value='100'>100</option>
												</select>
											</div>
										</div>
										<div className='col-sm-6'>
											<div className='table-search'>
												<label>Search</label>
												<input
													type='text'
													className='form-control'
													placeholder='search product by category/brand/product name'
													title='search product by category/brand/product name'
													style={{ width: '300px' }}
												/>
											</div>
										</div>
									</div>
									{props.children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default EmptyTableCard
