import axios from 'axios'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import MyError from '../../Notification/MyError'
import MySuccess from '../../Notification/MySuccess'
import {
	productInputErrorFiled,
	productInputFiled,
	rewriteDescriptionFromPropsData,
	rewriteProductName,
	// eslint-disable-next-line prettier/prettier
	slugify
} from '../Adapter/Utils'
import { categoryApi, productCreateApi } from '../Adapter/Xhr'
import EmptyCard from '../CardBody/EmptyCard'
import EmptyCategoryCard from '../CardBody/EmptyCategoryCard'
import categorySelectStyle from '../css/category-select-styles.module.css'
import BasicForm from '../Forms/BasicForm'
import ProductAdditionalForm from '../Forms/ProductAdditionalForm'
import ProductFeatureImageForm from '../Forms/ProductFeatureImageForm'
import ProductImageGalleryForm from '../Forms/ProductImageGalleryForm'
import ProductSettingForm from '../Forms/ProductSettingForm'
import SelectCategory from '../Forms/SelectCategory'
import SpecificationForm from '../Forms/SpecificationForm'
const CopyProductForm = (props) => {
	const [productInformation, setProductInformation] =
		useState(productInputFiled)
	const [productFiledError, setProductFiledError] = useState(
		productInputErrorFiled
	)
	const productFormData = useRef()

	const [successMessage, setSuccessMessage] = useState({
		status: false,
		message: '',
	})
	const [errorMessage, setErrorMessage] = useState({
		status: false,
		message: '',
	})
	const [disableFiled, steDisableFiled] = useState(false)

	const [categorySelect, setCategorySelect] = useState([])

	const [categorySelected, setCategorySelected] = useState([])

	useEffect(() => {
		async function callAsyncApi() {
			try {
				/**
				 * category selection list
				 */
				const categoryList = await categoryApi()
				setCategorySelect(categoryList.data)
				// setProductInformation({ ...productInformation, previous_product_images: '' })
			} catch (error) {
				console.log(error)
			}
		}
		callAsyncApi()
		setProductInformation(props.productEditData)
		setCategorySelected(
			props.productEditData.category_ids.map(({ id }) => id.toString())
		)
	}, [])

	const resetSuccessMessage = () => {
		setSuccessMessage({
			...successMessage,
			status: false,
			message: '',
		})
	}

	const resetErrorMessage = () => {
		setErrorMessage({
			...errorMessage,
			status: false,
			message: '',
		})
	}

	const callAsyncProductFormDataApi = async (productInputInformation) => {
		try {
			steDisableFiled(true)
			const productCreationMessage = await productCreateApi(
				productInputInformation
			)
			if (productCreationMessage.success) {
				setSuccessMessage({
					...errorMessage,
					status: true,
					message: productCreationMessage.message,
				})
				productFormData.current.reset()
				setProductInformation(productInputFiled)
				setProductFiledError(productInputErrorFiled)
			} else {
				throw productCreationMessage
			}
		} catch (errorExceptions) {
			if (errorExceptions.code === 422) {
				setProductFiledError(errorExceptions.errors)
				let scrollToErrorFiled = document.getElementsByClassName('is-invalid')
				scrollToErrorFiled &&
					scrollToErrorFiled[0].scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					})
			}
			setErrorMessage({
				...errorMessage,
				status: true,
				message: errorExceptions.message,
			})
		} finally {
			steDisableFiled(false)
		}
	}

	const handleChange = (name, value, checked = null, optionLabel = null) => {
		let filterData = ''
		let filterDescription = ''
		// const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/
		const rx_live = /^\d*(\.\d{0,2})?$/

		const pattern = new RegExp(/^[0-9\b]+$/)
		let latest_value = ''

		switch (name) {
			case 'category_ids[]':
				productFiledError.category_ids &&
					setProductFiledError({ ...productFiledError, category_ids: '' })
				break

			case 'reserved_ecommerce_product':
				if (value === '' || pattern.test(value)) {
					latest_value = value
				} else {
					latest_value = productInformation.reserved_ecommerce_product
				}
				setProductInformation({
					...productInformation,
					[name]: latest_value,
				})
				break

			case 'reserved_pos_product':
				if (value === '' || pattern.test(value)) {
					latest_value = value
				} else {
					latest_value = productInformation.reserved_pos_product
				}
				setProductInformation({
					...productInformation,
					[name]: latest_value,
				})
				break

			case 'promotional_price':
				if (rx_live.test(value)) {
					setProductInformation({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
					})
				}
				productFiledError.promotional_price &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'low_quantity_alert':
				if (value === '' || pattern.test(value)) {
					latest_value = value
				} else {
					latest_value = productInformation.low_quantity_alert
				}
				setProductInformation({
					...productInformation,
					[name]: latest_value,
				})
				break

			case 'expiry_alert_before':
				if (value === '' || pattern.test(value)) {
					latest_value = value
				} else {
					latest_value = productInformation.expiry_alert_before
				}
				setProductInformation({
					...productInformation,
					[name]: latest_value,
				})
				break

			case 'selling_price':
				if (rx_live.test(value)) {
					filterDescription = rewriteDescriptionFromPropsData({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
					})
					setProductInformation({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
						description: filterDescription,
					})
				}
				productInformation.selling_price &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'product_vat':
				if (rx_live.test(value)) {
					setProductInformation({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
					})
				}
				break

			case 'status':
				setProductInformation({
					...productInformation,
					[name]: value,
					ecommerce_sale_status: value === '0' ? value : '1',
					pos_sale_status: value === '0' ? value : '1',
					cash_on_delivery: value === '0' ? value : '1',
					over_selling: value === '0' ? value : '1',
				})
				break

			case 'item_name':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})
				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})
				productFiledError.item_name &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'brand':
				value &&
					axios.get(`/backend/getCompanyByBrand/${value}`).then((responses) => {
						filterData = rewriteProductName({
							...productInformation,
							[name]: optionLabel ?? '',
							company_brand_en: responses.data.data.name,
						})

						filterDescription = rewriteDescriptionFromPropsData({
							...productInformation,
							[name]: optionLabel,
							company_brand_en: responses.data.data.name,
						})
						setProductInformation({
							...productInformation,
							[name]: optionLabel ?? ' ',
							product_brand_id: value
								? { value: value ?? '', label: optionLabel ?? '' }
								: null,
							name: filterData.trim().trim(),
							company_brand_en: responses.data.data.name,
							description: filterDescription,
							slug: slugify(filterData),
							meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
							meta_description: filterData,
						})
					})

				if (!value) {
					filterData = rewriteProductName({
						...productInformation,
						[name]: optionLabel ?? '',
						company_brand_en: '',
					})

					filterDescription = rewriteDescriptionFromPropsData({
						...productInformation,
						[name]: optionLabel,
						company_brand_en: '',
					})
					setProductInformation({
						...productInformation,
						[name]: optionLabel ?? ' ',
						product_brand_id: value
							? { value: value ?? '', label: optionLabel ?? '' }
							: null,
						name: filterData.trim().trim(),
						company_brand_en: '',
						description: filterDescription,
						slug: slugify(filterData),
						meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
						meta_description: filterData,
					})
				}

				productFiledError.product_brand_id &&
					setProductFiledError({ ...productFiledError, product_brand_id: '' })
				break

			case 'unit':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: optionLabel,
				})

				setProductInformation({
					...productInformation,
					[name]: optionLabel ?? '',
					product_sell_unit_id: value
						? { value: value ?? '', label: optionLabel ?? '' }
						: null,
					product_purchase_unit_id: value
						? { value: value ?? '', label: optionLabel ?? '' }
						: null,
					description: filterDescription,
				})

				productFiledError.product_purchase_unit_id &&
					setProductFiledError({
						...productFiledError,
						product_purchase_unit_id: '',
					})
				break

			case 'model':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})

				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})

				productFiledError.model &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'part_number':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})

				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})
				productFiledError.part_number &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'barcode':
				if (value === '' || pattern.test(value)) {
					latest_value = value
				} else {
					latest_value = productInformation.barcode
				}
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: latest_value,
				})
				setProductInformation({
					...productInformation,
					[name]: latest_value,
					description: filterDescription,
				})
				break

			case 'size':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})

				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})
				productFiledError.size &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'length':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.length &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'width':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.width &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'height':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.height &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'weight':
				if (rx_live.test(value)) {
					filterDescription = rewriteDescriptionFromPropsData({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
					})
					setProductInformation({
						...productInformation,
						[name]: isNaN(Math.abs(value)) ? '' : value,
						description: filterDescription,
					})
				}

				productFiledError.weight &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'color':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})

				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})

				productFiledError.color &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'flavor':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})

				productFiledError.flavor &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'version':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})

				productFiledError.flavor &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'ingredients':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})

				productFiledError.ingredients &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'country_of_origin':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})

				productFiledError.country_of_origin &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'made_in':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})
				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})

				productFiledError.made_in &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'assemble_by':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})

				productFiledError.assemble_by &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'manufactured_by':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.manufactured_by &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'marketed_by':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.marketed_by &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'variant':
				filterData = rewriteProductName({
					...productInformation,
					[name]: value,
				})

				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					name: filterData.trim().trim(),
					description: filterDescription,
					slug: slugify(filterData),
					meta_keywords: filterData.trim().split(/[ ,]+/).join(','),
					meta_description: filterData,
				})

				productFiledError.variant &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'warranty':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})

				productFiledError.warranty &&
					setProductFiledError({ ...productFiledError, [name]: '' })

				break

			case 'imported_by':
				filterDescription = rewriteDescriptionFromPropsData({
					...productInformation,
					[name]: value,
				})

				setProductInformation({
					...productInformation,
					[name]: value,
					description: filterDescription,
				})
				productFiledError.imported_by &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'slug':
				setProductInformation({
					...productInformation,
					[name]: slugify(value),
				})
				productFiledError.slug &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			case 'meta_keywords':
				setProductInformation({
					...productInformation,
					[name]: value.split(/[ ,]+/).join(','),
				})
				productFiledError.meta_keywords &&
					setProductFiledError({ ...productFiledError, [name]: '' })
				break

			default:
				setProductInformation({ ...productInformation, [name]: value })
				setProductFiledError({ ...productFiledError, [name]: '' })
				break
		}
	}

	const handleSubmit = () => {
		let productInputInformation = new FormData(productFormData.current)
		productInputInformation.get('barcode') === null &&
			productInputInformation.delete('barcode')
		console.log(productInputInformation.get('barcode'))
		productInputInformation.get('ecommerce_sale_status') === null &&
			productInputInformation.set(
				'ecommerce_sale_status',
				productInformation.ecommerce_sale_status
			)
		productInputInformation.get('pos_sale_status') === null &&
			productInputInformation.set(
				'pos_sale_status',
				productInformation.pos_sale_status
			)
		productInputInformation.set(
			'cash_on_delivery',
			productInformation.cash_on_delivery
		)
		productInputInformation.set('over_selling', productInformation.over_selling)
		productInputInformation.append(
			'product_brand_id',
			productInformation.product_brand_id?.value ?? ''
		)
		productInputInformation.append(
			'net_content_unit_id',
			productInformation.net_content_unit_id?.value ?? ''
		)
		productInputInformation.append(
			'product_purchase_unit_id',
			productInformation.product_purchase_unit_id?.value ?? ''
		)
		productInputInformation.append(
			'product_sell_unit_id',
			productInformation.product_purchase_unit_id?.value ?? ''
		)
		productInformation.product_images.length !== 0 &&
			productInformation.product_images.map((imageFile) =>
				productInputInformation.append('product_images[]', imageFile)
			)
		callAsyncProductFormDataApi(productInputInformation)
	}

	return (
		<>
			{successMessage.status && (
				<MySuccess
					message={successMessage.message}
					resetSuccesMessage={resetSuccessMessage}
				/>
			)}

			{errorMessage.status && (
				<MyError
					message={errorMessage.message}
					resetErrorMessage={resetErrorMessage}
				/>
			)}

			<EmptyCard
				url={`/admin/product`}
				title={`Add Product`}
				icon={`icon-plus-square-regular`}
			>
				<form
					encType='multipart/form-data'
					id='productFormData'
					ref={productFormData}
					onSubmit={(event) => {
						event.preventDefault()
						handleSubmit()
					}}
				>
					<fieldset disabled={disableFiled ? `disabled` : ``}>
						<div className='row'>
							<div className='col-lg-8'>
								<BasicForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
								/>

								<SpecificationForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
								/>

								<ProductSettingForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
								/>

								<ProductAdditionalForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
								/>
							</div>

							<div className='col-lg-4 order-1'>
								<EmptyCategoryCard
									categoryError={productFiledError.category_ids}
								>
									<div
										className={`form-group ${categorySelectStyle.customCatList}`}
									>
										<SelectCategory
											category_ids={categorySelected}
											categories={categorySelect}
											handleCategoryChange={handleChange}
										/>
									</div>
								</EmptyCategoryCard>

								<ProductFeatureImageForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
									disabledPreviewImageForCopy={false}
								/>
								<ProductImageGalleryForm
									productFiledError={productFiledError}
									productInformation={productInformation}
									handleChange={handleChange}
									disabledPreviewImageForCopy={false}
								/>
							</div>
						</div>

						<div className='row'>
							<div className='col-lg-12 text-right'>
								<Link legacyBehavior href={'/admin/product'}>
									<a className='btn btn-info mr-1'>
										<i className='icon-arrow-left-solid mr-1 mr-1' />
										back to list
									</a>
								</Link>

								<button
									type={`reset`}
									className='btn btn-danger mr-2'
									onClick={(event) => {
										event.preventDefault()
										productFormData.current.reset()
										setProductInformation(productInputFiled)
										setProductFiledError(productInputErrorFiled)
									}}
								>
									<i className='icon-reset mr-1' /> Reset
								</button>

								<button type={`submit`} className='btn btn-primary mr-2'>
									{disableFiled ? (
										<>
											<span
												className='spinner-border spinner-border-sm'
												role='status'
												aria-hidden='true'
											/>
											saving...
										</>
									) : (
										<>
											<i className='icon-save-regular mr-1' /> save
										</>
									)}
								</button>
							</div>
						</div>
					</fieldset>
				</form>
			</EmptyCard>
		</>
	)
}

export default CopyProductForm
