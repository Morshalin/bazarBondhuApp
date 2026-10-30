import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { staticUnitOptions } from '../Adapter/Utils'
import {
	addProductBrandApi,
	barcodeCheckingApi,
	brandApi
} from '../Adapter/Xhr'
import useDebounce from '../custom-hook/use-debounce'
import BrandCreateModal from '../Forms/BrandCreateModal'

const MerchantBasicForm = (props) => {
	const { productFiledError, productInformation, handleChange } = props

	const [brandOptions, setBrandOptions] = useState(props.productDependency.data.brands)
	const [unitOptions, setUnitOptions] = useState(props.productDependency.data.units)
	const [isLoading, setIsLoading] = useState(false)
	const [brandsOrSeries, setBrandsOrSeries] = useState('')
	const [companyId, setCompanyId] = useState('')
	


	async function callAsyncBrandCreateApi() {
		try {
			/**
			 * Brand option list
			 */
			setIsLoading(true)
			const newCreatedBrand = await addProductBrandApi(
				brandsOrSeries,
				companyId
			)
			newCreatedBrand.success &&
				setBrandOptions([
					...brandOptions,
					{ value: newCreatedBrand.data.id, label: newCreatedBrand.data.name },
				])
			newCreatedBrand.success && setIsLoading(false)
			newCreatedBrand.success &&
				handleChange(
					'brand',
					newCreatedBrand.data.id ?? null,
					null,
					newCreatedBrand.data.name ?? null
				)
			!newCreatedBrand.success && window.alert(newCreatedBrand?.errors?.name)
			!newCreatedBrand.success && setIsLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const debouncedBarcode = useDebounce(productInformation.barcode, 1000)
	const [barcodeError, setBarcodeError] = useState('')
	const route = useRouter()

	useEffect(() => {
		async function callAsyncApi() {
			try {
				if (debouncedBarcode) {
					const imputedBarcode = new FormData()
					imputedBarcode.append('barcode', parseInt(debouncedBarcode))
					const checkAvailableBarcode = await barcodeCheckingApi(imputedBarcode)
					if (checkAvailableBarcode.success) {
						setBarcodeError('')
					} else {
						if (
							checkAvailableBarcode.errors.id !== productInformation.id ||
							['/admin/product/copy/[edit]'].includes(route.pathname)
						) {
							setBarcodeError(checkAvailableBarcode.message)
						}
					}
				}
			} catch (error) {
				console.log(error)
			}
		}

		callAsyncApi()
	}, [debouncedBarcode])

	const inputCompanyIdFromChild = (id) => {
		setCompanyId(id)
	}

	return (
		<div className='card rounded-0 mb-3'>
			<div className='card-header rounded-0'>
				<div className='fbh-title mt-2'>
					<h6>Product Basic Information</h6>
				</div>
			</div>
			<div className='card-body'>
				<div className='form-row'>
					<div className='form-group col-lg-12 text-center'>
						<label htmlFor='name'>
							Product Name:
						</label>{` `}{productInformation.name}
					</div>

					{(props.productDependency.config.role === 'manager' || props.productDependency.config.role === 'shop-owner') && <div className='form-group col-lg-6'>
						<label htmlFor='unit'>
							Selling Unit<span className='text-danger'>*</span>
						</label>
						<Select
							className={`${
								productFiledError.product_purchase_unit_id ? 'is-invalid' : ''
							}`}
							instanceId='unit'
							value={productInformation.product_purchase_unit_id}
							isClearable={true}
							onChange={(selectedOption) => {
								handleChange(
									'unit',
									selectedOption?.value ?? null,
									null,
									selectedOption?.label ?? null
								)
							}}
							options={unitOptions}
							autoFocus={false}
							theme={(theme) => ({
								...theme,
								borderRadius: 0,
							})}
						/>
						{productFiledError.product_purchase_unit_id && (
							<div className='invalid-feedback d-block'>
								{productFiledError.product_purchase_unit_id}
							</div>
						)}
					</div>}


				{(props.productDependency.config.role === 'manager' || props.productDependency.config.role === 'shop-owner') && 
					<div className='form-group col-lg-6'>
						<label htmlFor='barcode'>Barcode</label>
						<input
							type='text'
							className={`form-control ${
								barcodeError || productFiledError.barcode ? 'is-invalid' : ''
							}`}
							placeholder='Barcode'
							id='barcode'
							name='barcode'
							value={productInformation.barcode}
							onChange={(event) => {
								handleChange(event.target.name, event.target.value)
							}}
						/>
						{(barcodeError || productFiledError.barcode) && (
							<div className='invalid-feedback'>
								{barcodeError ?? productFiledError.barcode}
							</div>
						)}
					</div>}
				</div>
			</div>
			<BrandCreateModal
				callAsyncBrandCreateApi={callAsyncBrandCreateApi}
				brandsOrSeries={brandsOrSeries}
				inputCompanyIdFromChild={inputCompanyIdFromChild}
				companyBrandOptions = {props.productDependency.data.company_brands}
			/>
		</div>
	)
}
export default MerchantBasicForm
