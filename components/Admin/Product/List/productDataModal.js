import { useEffect, useState } from 'react'
import ProductDetailsTable from './ProductDetailsTable'
import ProductPurchasesTable from './ProductPurchasesTable'
import ProductSalesTable from './ProductSalesTable'

const ProductDataModal = (props) => {
	const serverPermissions = props.serverPermissions;

	const hasMenuPermission = (module, permission_type) => {
		let isExists = false;
		serverPermissions &&
			serverPermissions.map((perm, index) => {
				if (
					perm.module === module &&
					perm.permission_type === permission_type
				) {
					isExists = true;
				}
			});

		return isExists;
	};

	const [salesStatus, setSaleStatus] = useState(false)
	const [purchasesStatus, setPurchasesStatus] = useState(false)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line no-undef
			$('.nav-tabs a[href="#products-information"]').tab('show')
		}
		setSaleStatus(false)
		setPurchasesStatus(false)
	}, [props.productDetails])
	return (
		<>
			<div
				className='modal modal-custom fade modal-fullscreen'
				id='myModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-xl modal-dialog-scrollable'>
					<div className='modal-content'>
						<div className='modal-header border-0'>
							<ul className='nav nav-tabs' id='myTab' role='tablist'>
								<li className='nav-item'>
									<a
										className='nav-link active'
										id='products-information-tab'
										data-toggle='tab'
										href='#products-information'
										role='tab'
										aria-controls='products-information-tab'
										aria-selected='true'
										onClick={() => {
											setSaleStatus(false)
											setPurchasesStatus(false)
										}}
									>
										Product Details
									</a>
								</li>
								{
									hasMenuPermission("sales", "view") && (
										<li className='nav-item'>
											<a
												className='nav-link'
												id='product-sales-tab'
												data-toggle='tab'
												href='#product-sales'
												role='tab'
												aria-controls='product-sales'
												aria-selected='false'
												onClick={() => {
													setPurchasesStatus(false)
													setSaleStatus(true)
												}}
											>
												Sales
											</a>
										</li>
									)
								}

								{
									hasMenuPermission("purchase", "view") && (
										<li className='nav-item'>
											<a
												className='nav-link'
												id='product-purchases-tab'
												data-toggle='tab'
												href='#product-purchases'
												role='tab'
												aria-controls='product-purchases'
												aria-selected='false'
												onClick={() => {
													setPurchasesStatus(true)
													setSaleStatus(false)
												}}
											>
												Purchases
											</a>
										</li>
									)
								}

							</ul>

							<button type='button' className='close' data-dismiss='modal' aria-label='Close'>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>

						<div className='modal-body'>
							<div className='tab-content' id='myTabContent'>
								<div
									className='tab-pane fade show active'
									id='products-information'
									role='tabpanel'
									aria-labelledby='products-information-tab'
								>
									<ProductDetailsTable productDetails={props.productDetails} serverPermissions={serverPermissions} />
								</div>
								<div
									className='tab-pane fade'
									id='product-sales'
									role='tabpanel'
									aria-labelledby='product-sales-tab'
								>
									{salesStatus && (
										<ProductSalesTable
											productSalesList={props.productDetails.product_sale_list}
											productId={props.productDetails.product_details_id}
										/>
									)}
								</div>
								<div
									className='tab-pane fade'
									id='product-purchases'
									role='tabpanel'
									aria-labelledby='product-purchases-tab'
								>
									{purchasesStatus && (
										<ProductPurchasesTable
											productPurchaseList={props.productDetails.product_purchase_list}
											productId={props.productDetails.id}
										/>
									)}
								</div>
							</div>
						</div>

						<div className='modal-footer border-0'>
							<button type='button' className='btn btn-sm btn-secondary' data-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default ProductDataModal
