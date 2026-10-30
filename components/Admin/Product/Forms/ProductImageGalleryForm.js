/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios'
import { useEffect } from 'react'
import ProductStyle from '../css/category-select-styles.module.css'

const ProductImageGalleryForm = (props) => {
	const { productFiledError, productInformation, handleChange } = props
	const disabledPreviewImageForCopy = props.disabledPreviewImageForCopy ?? true

	useEffect(() => {
		const bsCustomFileInput = require('bs-custom-file-input')
		bsCustomFileInput.init()
	}, [])

	// const swapImageOder = (previousImage, nextImage) => {
	// 	let mainArray = Array.from(productInformation.product_images)
	// 	;[mainArray[previousImage], mainArray[nextImage]] = [
	// 		mainArray[nextImage],
	// 		mainArray[previousImage],
	// 	]
	// 	handleChange('product_images', mainArray)
	// }

	return (
		<>
			<div className='card rounded-0 mb-3'>
				<div className='card-header rounded-0'>
					<div className='fbh-title  mt-2'>
						<h6>Product image gallery</h6>
					</div>
				</div>
				<div className='card-body'>
					<div className='form-group mt-3'>
						<div className='custom-file'>
							<input
								type='file'
								className={`custom-file-input ${
									productFiledError.feature_image ? 'is-invalid' : ''
								}`}
								id='productImage'
								name='product_images'
								onChange={(event) => {
									let appendFiles =
										productInformation.product_images.length > 0
											? productInformation.product_images.concat(
													Array.from(event.target.files)
											  )
											: Array.from(event.target.files)
									event.target.value = ''
									const uniqueObjects = [
										...new Map(
											appendFiles.map((item) => [item.name, item])
										).values(),
									]
									handleChange(event.target.name, uniqueObjects)
								}}
								multiple
							/>
							<label
								className='custom-file-label cfl-left-align'
								htmlFor='productImage'
							>
								<span className='d-inline-block text-truncate w-75'>
									choose images
								</span>
							</label>

							{productFiledError.product_images && (
								<div className='invalid-feedback'>
									{productFiledError.product_images}
								</div>
							)}
						</div>
					</div>

					<div className={`form-group ${ProductStyle.customImageList}`}>
						<div className='row row-cols-3 p-1'>
							{disabledPreviewImageForCopy &&
								productInformation.previous_product_images.length !== 0 &&
								productInformation.previous_product_images.map(
									(image, index) => (
										<div
											className='col p-1'
											key={index}
											// id={`${index}_div`}
											// onDrop={(event) => {
											// 	event.preventDefault()
											// 	let data = event.dataTransfer.getData('text')

											// 	return event.target.parentNode.id.length !== 0
											// 		? swapImageOder(parseInt(event.target.parentNode.id), parseInt(data))
											// 		: false
											// }}
											// onDragOver={(event) => {
											// 	event.preventDefault()
											// }}
										>
											<div
												className='position-relative'
												// style={{ cursor: 'grab' }}
												// id={`${index}_img`}
											>
												<img
													src={image.name}
													width={`100%`}
													height={`auto`}
													// style={{ float: 'left' }}
													alt={image.name}
													title={image.name}
													className='img-thumbnail'
													// draggable='true'
													// onDragStart={(event) => {
													// 	//console.log(event.target.parentNode.parentNode)
													// 	event.dataTransfer.setData('text', event.target.parentNode.id)
													// }}
												/>
												<button
													type='button'
													className='btn btn-sm bg-danger rounded-0 p-0'
													style={{
														position: 'absolute',
														right: `0px`,
														top: `0px`,
													}}
													onClick={() => {
														if (
															window.confirm(
																'Are you sure you wish to delete this product image?'
															)
														) {
															axios.delete(
																`/backend/delete-product-image/${image.id}`
															)
															handleChange(
																'previous_product_images',
																productInformation.previous_product_images.filter(
																	(img) => img.name !== image.name
																)
															)
														}
													}}
												>
													<i className='icon-trash-alt-regular text-white p-1 small' />
												</button>
											</div>
										</div>
									)
								)}
							{productInformation.product_images.length !== 0 &&
								productInformation.product_images.map((image, index) => (
									<div
										className='col p-1'
										key={index}
										// id={`${index}_div`}
										// onDrop={(event) => {
										// 	event.preventDefault()
										// 	let data = event.dataTransfer.getData('text')

										// 	return event.target.parentNode.id.length !== 0
										// 		? swapImageOder(parseInt(event.target.parentNode.id), parseInt(data))
										// 		: false
										// }}
										// onDragOver={(event) => {
										// 	event.preventDefault()
										// }}
									>
										<div
											className='position-relative'
											// style={{ cursor: 'grab' }}
											// id={`${index}_img`}
										>
											<img
												src={URL.createObjectURL(image)}
												width={`100%`}
												height={`auto`}
												// style={{ float: 'left' }}
												alt={image.name}
												title={image.name}
												className='img-thumbnail'
												// draggable='true'
												// onDragStart={(event) => {
												// 	//console.log(event.target.parentNode.parentNode)
												// 	event.dataTransfer.setData('text', event.target.parentNode.id)
												// }}
											/>
											<button
												type='button'
												className='btn btn-sm bg-danger rounded-0 p-0'
												style={{
													position: 'absolute',
													right: `0px`,
													top: `0px`,
												}}
												onClick={() => {
													if (
														window.confirm(
															'Are you sure you wish to delete this product image?'
														)
													) {
														handleChange(
															'product_images',
															productInformation.product_images.filter(
																(img) => img.name !== image.name
															)
														)
													}
												}}
											>
												<i className='icon-trash-alt-regular text-white p-1 small' />
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>

			{/* {productInformation.previous_product_images.length !== 0 && (
				<div className='card rounded-0 mb-3'>
					<div className='card-header rounded-0'>
						<div className='fbh-title  mt-2'>
							<h6>Uploaded Product's image gallery</h6>
						</div>
					</div>
					<div className='card-body'>
						<div className={`form-group ${ProductStyle.customImageList}`}>
							<div className='row row-cols-3 p-1'>
								
							</div>
						</div>
					</div>
				</div>
			)} */}
		</>
	)
}
export default ProductImageGalleryForm
