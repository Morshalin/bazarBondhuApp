import { useEffect, useState } from 'react'
import { prodctInputFiled, slugify } from '../Adapter/Halper'
import { brandApi, categoryApi, unitApi } from '../Adapter/Xhr'
import EmptyCard from '../CardBody/EmptyCard'
import EmtpyCategoryCard from '../CardBody/EmtpyCatgoryCard'
import catgeorySelectStyle from '../css/catgory-select-styles.module.css'
import Input from '../Forms/Input'
import SelelctCatgeory from '../Forms/SelelctCatgeory'

const ProductForm = () => {
	const [productInformation, setProductInformation] = useState(prodctInputFiled)
	const [catgeorySelect, setCatgeorySelect] = useState([])
	const [brandOptions, setBrandOptions] = useState([])
	const [unitOptions, setUnitOptions] = useState([])

	useEffect(() => {
		async function callAsyncApi() {
			try {
				/**
				 * catgeory selection list
				 */
				const categoryList = await categoryApi()
				setCatgeorySelect(categoryList.data)

				/**
				 * Brand option list
				 */
				const brandList = await brandApi()
				setBrandOptions(
					brandList.data.map(({ id, name }) => {
						return {
							value: id,
							label: name,
						}
					})
				)

				/**
				 * Unit option list
				 */
				const unitList = await unitApi()
				setUnitOptions(
					unitList.data.map(({ id, name }) => {
						return {
							value: id,
							label: name,
						}
					})
				)
			} catch (error) {
				console.log(error)
			}
		}
		callAsyncApi()
		// const bsCustomFileInput = require("bs-custom-file-input");
		// bsCustomFileInput.init();
	}, [])

	const handleChange = (name, value, checked = null, optionLabel = null) => {
		switch (name) {
			case 'category_ids[]':
				break

			case 'item_name':
				setProductInformation({
					...productInformation,
					[name]: value,
					name: `${value} ${productInformation.brand} ${productInformation.quantity} ${productInformation.unit}`.trim(),
					slug: slugify(
						`${value} ${productInformation.brand} ${productInformation.quantity} ${productInformation.unit}`
					),
				})
				break

			case 'brand':
				setProductInformation({
					...productInformation,
					[name]: optionLabel ?? ' ',
					product_brand_id: value,
					name: `${productInformation.item_name} ${optionLabel ?? ''} ${
						productInformation.quantity
					} ${productInformation.unit}`.trim(),
					slug: slugify(
						`${productInformation.item_name} ${optionLabel ?? ''} ${productInformation.quantity} ${
							productInformation.unit
						}`
					),
				})
				break

			case 'quantity':
				setProductInformation({
					...productInformation,
					[name]: value,
					name: `${productInformation.item_name} ${productInformation.brand} ${value} ${productInformation.unit}`.trim(),
					slug: slugify(
						`${productInformation.item_name} ${productInformation.brand} ${value} ${productInformation.unit}`
					),
				})
				break

			case 'unit':
				setProductInformation({
					...productInformation,
					[name]: optionLabel ?? '',
					product_sell_unit_id: value,
					product_purchase_unit_id: value,
					name: `${productInformation.item_name} ${productInformation.brand} ${
						productInformation.quantity
					} ${optionLabel ?? ''}`.trim(),
					slug: slugify(
						`${productInformation.item_name} ${productInformation.brand} ${
							productInformation.quantity
						} ${optionLabel ?? ''}`
					),
				})
				break

			case 'slug':
				setProductInformation({
					...productInformation,
					[name]: slugify(value),
				})
				break

			default:
				setProductInformation({ ...productInformation, [name]: value })
				break
		}
	}

	console.log(productInformation.status)

	return (
		<EmptyCard url={`/admin/product`} title={`Add Product`} icon={`icon-plus-square-regular`}>
			<form encType='multipart/form-data' id='productFormData'>
				<fieldset disabled=''>
					<div className='row'>
						<div className='col-lg-8'>
							<div className='form-row'>
								<Input
									inputType={`text`}
									label={`Product name`}
									placeHolder={`product name`}
									inputId={`name`}
									inputName={`name`}
									inputedValue={productInformation.name}
									onChnageInput={handleChange}
									required={true}
									inputReadOnly={true}
									errorMessage={``}
									formClass={`col-lg-12`}
								/>

								<Input
									inputType={`text`}
									label={`Item name`}
									placeHolder={`item name`}
									inputName={`item_name`}
									inputedValue={productInformation.item_name}
									onChnageInput={handleChange}
									required={true}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`select-plugin`}
									label={`Brand`}
									inputId={`brand`}
									inputName={`brand`}
									inputedValue={brandOptions}
									onChnageInput={handleChange}
									required={true}
									errorMessage={``}
									formClass={`col-md-4`}
								/>

								<Input
									inputType={`text`}
									label={`Quantity`}
									placeHolder={`quantity`}
									inputName={`quantity`}
									inputedValue={productInformation.quantity}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`select-plugin`}
									label={`Unit`}
									inputId={`unit`}
									inputName={`unit`}
									inputedValue={unitOptions}
									onChnageInput={handleChange}
									required={true}
									errorMessage={``}
									formClass={`col-md-4`}
								/>

								<Input
									inputType={`text`}
									label={`Made In`}
									placeHolder={`made in`}
									inputName={`made_in`}
									inputedValue={productInformation.made_in}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`MRP`}
									placeHolder={`mrp`}
									inputName={`selling_price`}
									inputedValue={productInformation.selling_price}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Company Name`}
									placeHolder={`Company Name`}
									inputName={`company_name`}
									inputedValue={productInformation.company_name}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Size`}
									placeHolder={`size`}
									inputName={`size`}
									inputedValue={productInformation.size}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Height`}
									placeHolder={`height`}
									inputName={`height`}
									inputedValue={productInformation.height}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Weight`}
									placeHolder={`weight`}
									inputName={`weight`}
									inputedValue={productInformation.weight}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Dimension`}
									placeHolder={`dimension`}
									inputName={`dimension`}
									inputedValue={productInformation.dimension}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Flavor`}
									placeHolder={`flavor`}
									inputName={`flavor`}
									inputedValue={productInformation.flavor}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Variant`}
									placeHolder={`variant`}
									inputName={`variant`}
									inputedValue={productInformation.variant}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`SKU`}
									placeHolder={`SKU`}
									inputName={`sku`}
									inputedValue={productInformation.sku}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<Input
									inputType={`text`}
									label={`Barcode`}
									placeHolder={`barcode`}
									inputName={`barcode`}
									inputedValue={productInformation.barcode}
									onChnageInput={handleChange}
									required={true}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-4`}
								/>

								<div className='form-group col-lg-4'>
									<label>Product Status</label>
									<Input
										inputType={`radio`}
										label={`Inactive`}
										inputId={`product_status_inactive`}
										inputName={`status`}
										defaultInputChecked={productInformation.status === '0'}
										inputedValue={`0`}
										onChnageInput={handleChange}
									/>

									<Input
										inputType={`radio`}
										label={`Active`}
										inputId={`product_status_active`}
										inputName={`status`}
										defaultInputChecked={productInformation.status === '1'}
										inputedValue={`1`}
										onChnageInput={handleChange}
									/>
								</div>

								<Input
									inputType={`textarea`}
									label={`Description`}
									placeHolder={`description`}
									inputName={`description`}
									inputedValue={productInformation.description}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-12`}
								/>

								<Input
									inputType={`text`}
									label={`Slug`}
									placeHolder={`slug`}
									inputName={`slug`}
									inputedValue={productInformation.slug}
									onChnageInput={handleChange}
									required={true}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-12`}
								/>

								<Input
									inputType={`text`}
									label={`Meta Keywords`}
									placeHolder={`meta keywords`}
									inputName={`meta_keywords`}
									inputedValue={productInformation.meta_keywords}
									onChnageInput={handleChange}
									required={true}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-12`}
								/>

								<Input
									inputType={`textarea`}
									label={`Description`}
									placeHolder={`description`}
									inputName={`description`}
									inputedValue={productInformation.description}
									onChnageInput={handleChange}
									required={false}
									inputReadOnly={false}
									errorMessage={``}
									formClass={`col-lg-12`}
								/>
							</div>
						</div>

						<div className='col-lg-4 order-1'>
							<EmtpyCategoryCard>
								<div className={`form-group ${catgeorySelectStyle.customCatList}`}>
									<SelelctCatgeory
										category_ids={productInformation.category_ids}
										categories={catgeorySelect}
										handleCatgoryChange={handleChange}
									/>
								</div>
							</EmtpyCategoryCard>
						</div>
					</div>

					<div className='row'>
						<div className='col-lg-6 text-left'></div>
						<div className='col-lg-6 text-right'></div>
					</div>
				</fieldset>
			</form>
		</EmptyCard>
	)
}

export default ProductForm
