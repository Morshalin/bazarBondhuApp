const SpecificationForm = (props) => {
	const { productFiledError, productInformation, handleChange } = props
	return (
		<div className='card rounded-0 mb-3'>
			<div className='card-header rounded-0'>
				<div className='fbh-title mt-2'>
					<h6>Product Specification</h6>
				</div>
			</div>
			<div className='card-body'>
				<div className='form-row'>
					<div className='form-group col-lg-6'>
						<label htmlFor='model'>Model</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.model ? 'is-invalid' : ''
							}`}
							placeholder='Model'
							id='model'
							name='model'
							value={productInformation.model}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.model && (
							<div className='invalid-feedback'>{productFiledError.model}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='item_name'>Part Number</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.part_number ? 'is-invalid' : ''
							}`}
							placeholder='Part Number'
							id='part_number'
							name='part_number'
							value={productInformation.part_number}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.part_number && (
							<div className='invalid-feedback'>
								{productFiledError.part_number}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='size'>Size</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.size ? 'is-invalid' : ''
							}`}
							placeholder='Size'
							id='size'
							name='size'
							value={productInformation.size}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.size && (
							<div className='invalid-feedback'>{productFiledError.size}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='length'>Length</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.length ? 'is-invalid' : ''
							}`}
							placeholder='Length'
							id='length'
							name='length'
							value={productInformation.length}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.length && (
							<div className='invalid-feedback'>{productFiledError.length}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='width'>Width</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.width ? 'is-invalid' : ''
							}`}
							placeholder='Width'
							id='width'
							name='width'
							value={productInformation.width}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.width && (
							<div className='invalid-feedback'>{productFiledError.width}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='height'>Height</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.height ? 'is-invalid' : ''
							}`}
							placeholder='Height'
							id='height'
							name='height'
							value={productInformation.height}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.height && (
							<div className='invalid-feedback'>{productFiledError.height}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='weight'>Weight (Kg)</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.weight ? 'is-invalid' : ''
							}`}
							placeholder='Weight'
							id='weight'
							name='weight'
							value={productInformation.weight}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.weight && (
							<div className='invalid-feedback'>{productFiledError.weight}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='color'>Color</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.color ? 'is-invalid' : ''
							}`}
							placeholder='Color'
							id='color'
							name='color'
							value={productInformation.color}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.color && (
							<div className='invalid-feedback'>{productFiledError.color}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='flavor'>Flavor</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.flavor ? 'is-invalid' : ''
							}`}
							placeholder='Flavor'
							id='flavor'
							name='flavor'
							value={productInformation.flavor}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.flavor && (
							<div className='invalid-feedback'>{productFiledError.flavor}</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='version'>Version</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.version ? 'is-invalid' : ''
							}`}
							placeholder='Version'
							id='version'
							name='version'
							value={productInformation.version}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.version && (
							<div className='invalid-feedback'>
								{productFiledError.version}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='ingredients'>Ingredients</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.ingredients ? 'is-invalid' : ''
							}`}
							placeholder='Ingredients'
							id='ingredients'
							name='ingredients'
							value={productInformation.ingredients}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.ingredients && (
							<div className='invalid-feedback'>
								{productFiledError.ingredients}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='variant'>Variant</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.variant ? 'is-invalid' : ''
							}`}
							placeholder='Variant'
							id='variant'
							name='variant'
							value={productInformation.variant}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.variant && (
							<div className='invalid-feedback'>
								{productFiledError.variant}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='country_of_origin'>Country of Origin</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.country_of_origin ? 'is-invalid' : ''
							}`}
							placeholder='Country of Origin'
							id='country_of_origin'
							name='country_of_origin'
							value={productInformation.country_of_origin}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.country_of_origin && (
							<div className='invalid-feedback'>
								{productFiledError.country_of_origin}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='made_in'>Made In (Country name)</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.made_in ? 'is-invalid' : ''
							}`}
							placeholder='Made In (Country name)'
							id='made_in'
							name='made_in'
							value={productInformation.made_in}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.made_in && (
							<div className='invalid-feedback'>
								{productFiledError.made_in}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='assemble_by'>Assemble By</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.assemble_by ? 'is-invalid' : ''
							}`}
							placeholder='Assemble By'
							id='assemble_by'
							name='assemble_by'
							value={productInformation.assemble_by}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.assemble_by && (
							<div className='invalid-feedback'>
								{productFiledError.assemble_by}
							</div>
						)}
					</div>

					<div className='form-group col-lg-6'>
						<label htmlFor='manufactured_by'>
							Manufactured By (Company Name)
						</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.manufactured_by ? 'is-invalid' : ''
							}`}
							placeholder='Manufactured By (Company Name)'
							id='manufactured_by'
							name='manufactured_by'
							value={productInformation.manufactured_by}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.manufactured_by && (
							<div className='invalid-feedback'>
								{productFiledError.manufactured_by}
							</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='marketed_by'>Marketed By (Company Name)</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.marketed_by ? 'is-invalid' : ''
							}`}
							placeholder='Marketed By (Company Name)'
							id='marketed_by'
							name='marketed_by'
							value={productInformation.marketed_by}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.marketed_by && (
							<div className='invalid-feedback'>
								{productFiledError.marketed_by}
							</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='imported_by'>Imported By</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.imported_by ? 'is-invalid' : ''
							}`}
							placeholder='Imported By'
							id='imported_by'
							name='imported_by'
							value={productInformation.imported_by}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.imported_by && (
							<div className='invalid-feedback'>
								{productFiledError.imported_by}
							</div>
						)}
					</div>

					<div className='form-group col-lg-4'>
						<label htmlFor='warranty'>Warranty/Guarantee</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.warranty ? 'is-invalid' : ''
							}`}
							placeholder='Warranty/Guarantee'
							id='warranty'
							name='warranty'
							value={productInformation.warranty}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.warranty && (
							<div className='invalid-feedback'>
								{productFiledError.warranty}
							</div>
						)}
					</div>

					{/* <div className='form-group col-lg-12'>
						<label htmlFor='web_link'>Web Link</label>
						<input
							type='text'
							className={`form-control ${
								productFiledError.web_link ? 'is-invalid' : ''
							}`}
							placeholder='example. https://www.example.com'
							id='web_link'
							name='web_link'
							value={productInformation.web_link}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{productFiledError.web_link && (
							<div className='invalid-feedback'>
								{productFiledError.web_link}
							</div>
						)}
					</div> */}
				</div>
			</div>
		</div>
	)
}
export default SpecificationForm
