import { useEffect, useState } from 'react'
import ProductStyle from '../css/category-select-styles.module.css'

const ProductFeatureImageForm = (props) => {
	const { productFiledError, productInformation, handleChange } = props
	const [disabledPreviewImageForCopy, setDisabledPreviewImageForCopy] = useState(
		props.disabledPreviewImageForCopy ?? true
	)

	useEffect(() => {
		const bsCustomFileInput = require('bs-custom-file-input')
		bsCustomFileInput.init()
	}, [])

	return (
		<div className='card rounded-0 mb-3'>
			<div className='card-header rounded-0'>
				<div className='fbh-title mt-2'>
					<h6>
						Product image<span className='text-danger'>*</span>
					</h6>
				</div>
			</div>

			<div className='card-body'>
				<div className='form-group mt-3'>
					<div className='custom-file'>
						<input
							type='file'
							className={`custom-file-input ${productFiledError.feature_image ? 'is-invalid' : ''}`}
							name={`feature_image`}
							id='feature_image'
							onChange={(event) => {
								setDisabledPreviewImageForCopy(true)
								handleChange(event.target.name, event.target.files[0])
							}}
						/>
						<label className='custom-file-label cfl-left-align' htmlFor='feature_image'>
							<span className='d-inline-block text-truncate w-75'>choose image</span>
						</label>
						{productFiledError.feature_image && (
							<div className='invalid-feedback'>{productFiledError.feature_image}</div>
						)}
					</div>
				</div>
				<div className={ProductStyle.customImageList}>
					{disabledPreviewImageForCopy && productInformation.feature_image && (
						// eslint-disable-next-line jsx-a11y/alt-text
						<img
							src={
								typeof productInformation.feature_image === 'string'
									? productInformation.feature_image
									: URL.createObjectURL(productInformation.feature_image)
							}
							className='card-img-bottom'
							height='auto'
						/>
					)}
				</div>
			</div>
		</div>
	)
}
export default ProductFeatureImageForm
