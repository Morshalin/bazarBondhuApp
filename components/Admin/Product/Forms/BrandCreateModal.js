import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { addProductBrandApi, getCompanyBrandApi } from '../Adapter/Xhr'

const BrandCreateModal = (props) => {
	const [brandOptions, setBrandOptions] = useState(props.companyBrandOptions)
	const [isLoading, setIsLoading] = useState(false)
	const [brandDefaultValue, setBrandDefaultValue] = useState('')

	// async function callAsyncApi() {
	// 	try {
	// 		/**
	// 		 * Brand option list
	// 		 */
	// 		const brandList = await getCompanyBrandApi()
	// 		setBrandOptions(
	// 			brandList.data.map(({ id, name }) => {
	// 				return {
	// 					value: id,
	// 					label: name,
	// 				}
	// 			})
	// 		)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// useEffect(() => {
	// 	let isMounted = true

	// 	// isMounted && callAsyncApi()
	// 	return () => {
	// 		isMounted = false;
	// 		setBrandOptions([])
	// 	}
	// }, [])

	async function callAsyncBrandCreateApi(inputValue) {
		try {
			/**
			 * Brand option list
			 */
			setIsLoading(true)
			const newCreatedBrand = await addProductBrandApi(inputValue)
			newCreatedBrand.success &&
				setBrandOptions([
					...brandOptions,
					{ value: newCreatedBrand.data.id, label: newCreatedBrand.data.name },
				])
			newCreatedBrand.success && setIsLoading(false)
			newCreatedBrand.success &&
				setBrandDefaultValue({
					value: newCreatedBrand.data.id ?? null,
					label: newCreatedBrand.data.name ?? null,
				})

			newCreatedBrand.success &&
				props.inputCompanyIdFromChild(newCreatedBrand.data.id)
			!newCreatedBrand.success && window.alert(newCreatedBrand?.errors?.name)
			setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div
				className='modal fade'
				id='brandCreateModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='exampleModalLabe'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-dialog-centered' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Select Company name
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<div className='form-row'>
								<div className='form-group col-lg-12'>
									<label htmlFor='brand'>Company Name</label>
									<CreatableSelect
										instanceId='brand'
										isClearable={true}
										value={brandDefaultValue}
										onChange={(selectedOption) => {
											setBrandDefaultValue({
												value: selectedOption?.value ?? null,
												label: selectedOption?.label ?? null,
											})
											props.inputCompanyIdFromChild(selectedOption?.value)
										}}
										onCreateOption={(inputValue) => {
											if (
												window.confirm(
													'Are you sure you wish to add this company name ?'
												)
											) {
												callAsyncBrandCreateApi(inputValue)
											}
										}}
										isDisabled={isLoading}
										isLoading={isLoading}
										options={brandOptions}
										autoFocus={false}
										theme={(theme) => ({
											...theme,
											borderRadius: 0,
										})}
									/>
								</div>
							</div>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-dismiss='modal'
							>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={() => {
									props.callAsyncBrandCreateApi()
									$('#brandCreateModal').modal('hide')
								}}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default BrandCreateModal
