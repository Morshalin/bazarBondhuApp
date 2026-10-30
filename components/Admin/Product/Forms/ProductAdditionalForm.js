const ProductAdditionalForm = (props) => {
	const { productFiledError, productInformation, handleChange } = props

	return (
		<div className='card rounded-0 mb-3'>
			<div className='card-header rounded-0'>
				<div className='fbh-title mt-2'>
					<h6>Additional Product Information</h6>
				</div>
			</div>
			<div className='card-body'>
				<div className='form-row'>
					<div className='form-group col-lg-12'>
						<label htmlFor='description'>Description</label>
						<textarea
							className={`form-control ${productFiledError.description ? 'is-invalid' : ''}`}
							rows='6'
							placeholder='Description'
							id='description'
							name='description'
							value={productInformation.description}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.description && (
							<div className='invalid-feedback'>{productFiledError.description}</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='slug'>Product Slug</label>
						<input
							type='text'
							className={`form-control ${productFiledError.slug ? 'is-invalid' : ''}`}
							placeholder='Product Slug'
							id='slug'
							name='slug'
							value={productInformation.slug}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.slug && (
							<div className='invalid-feedback'>{productFiledError.slug}</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='sort_order'>Product Sort Order</label>
						<input
							type='text'
							className={`form-control ${productFiledError.sort_order ? 'is-invalid' : ''}`}
							placeholder='Product Sort Order'
							id='sort_order'
							name='sort_order'
							value={productInformation.sort_order}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.sort_order && (
							<div className='invalid-feedback'>{productFiledError.sort_order}</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='shelf_number'>Shelf/Rack Number</label>
						<input
							type='text'
							className={`form-control ${productFiledError.shelf_number ? 'is-invalid' : ''}`}
							placeholder='Shelf/Rack Number'
							id='shelf_number'
							name='shelf_number'
							value={productInformation.shelf_number}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.shelf_number && (
							<div className='invalid-feedback'>{productFiledError.shelf_number}</div>
						)}
					</div>

					<div className='form-group col-lg-12'>
						<label htmlFor='meta_keywords'>Meta Keywords</label>
						<input
							type='text'
							className={`form-control ${productFiledError.meta_keywords ? 'is-invalid' : ''}`}
							placeholder='Meta Keywords'
							id='meta_keywords'
							name='meta_keywords'
							value={productInformation.meta_keywords}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.meta_keywords && (
							<div className='invalid-feedback'>{productFiledError.meta_keywords}</div>
						)}
					</div>

					<div className='form-group col-lg-12'>
						<label htmlFor='meta_description'>Meta Description</label>
						<textarea
							className={`form-control ${productFiledError.meta_description ? 'is-invalid' : ''}`}
							rows='6'
							placeholder='Meta Description'
							id='meta_description'
							name='meta_description'
							value={productInformation.meta_description}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.meta_description && (
							<div className='invalid-feedback'>{productFiledError.meta_description}</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductAdditionalForm
