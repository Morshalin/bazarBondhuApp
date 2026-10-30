const productInputFiled = {
	status: '1',
	ecommerce_sale_status: '1',
	reserved_ecommerce_product: '1',
	cash_on_delivery: '1',
	over_selling: '1',
	pos_sale_status: '1',
	reserved_pos_product: '0',

	promotional_active: '0',
	promotional_price: '',
	promotional_gift_item: '',
	promotional_start_date: '',
	promotional_end_date: '',

	low_quantity_alert: '',
	expiry_alert_before: '7',

	selling_price: '',
	product_vat: '',
	sku: '',

	name: '',
	item_name: '',
	product_brand_id: '',
	brand: '',
	net_content: '',
	net_content_unit: '',
	net_content_unit_id: '',
	product_purchase_unit_id: '',
	product_sell_unit_id: '',
	unit: '',
	model: '',
	part_number: '',
	company_brand_sn: '',
	company_brand_en: '',
	barcode: '',

	size: '',
	length: '',
	width: '',
	height: '',
	weight: '',
	color: '',
	flavor: '',
	version: '',
	ingredients: '',
	country_of_origin: '',
	made_in: '',
	assemble_by: '',
	manufactured_by: '',
	marketed_by: '',
	variant: '',
	warranty: '',
	imported_by: '',
	web_link: '',

	description: '',
	slug: '',
	sort_order: '',
	shelf_number: '',
	meta_keywords: '',
	meta_description: '',

	category_ids: [],
	'category_ids[]': '',
	feature_image: '',
	product_images: '',
	previous_product_images: '',
}

const staticUnitOptions = [
	{
		label: 'Miscellaneous Measure',
		options: [
			// { label: 'DZ', value: 5 },
			// { label: 'PK', value: 6 },
			{ label: 'pcs', value: 6 },
		],
	},
	{
		label: 'Weight Measure',
		options: [
			{ label: 'gm', value: 7 },
			{ label: 'kg', value: 8 },
		],
	},
	{
		label: 'Linear Measure',
		options: [
			{ label: 'mm', value: 1 },
			{ label: 'cm', value: 2 },
			{ label: 'in', value: 3 },
			{ label: 'ft', value: 4 },
		],
	},

	{
		label: 'Volume Measure',
		options: [
			{ label: 'L', value: 9 },
			{ label: 'ml', value: 10 },
		],
	},
]

const productInputErrorFiled = {
	status: '',
	ecommerce_sale_status: '',
	reserved_ecommerce_product: '',
	cash_on_delivery: '0',
	pos_sale_status: '',
	reserved_pos_product: '',

	promotional_active: '',
	promotional_price: '',
	promotional_gift_item: '',
	promotional_start_date: '',
	promotional_end_date: '',

	low_quantity_alert: '',
	expiry_alert_before: '',

	selling_price: '',
	product_vat: '',
	sku: '',

	name: '',
	item_name: '',
	product_brand_id: '',
	brand: '',
	net_content: '',
	product_purchase_unit_id: '',
	product_sell_unit_id: '',
	unit: '',
	model: '',
	part_number: '',
	company_brand_sn: '',
	company_brand_en: '',
	barcode: '',

	size: '',
	length: '',
	width: '',
	height: '',
	weight: '',
	color: '',
	flavor: '',
	ingredients: '',
	country_of_origin: '',
	made_in: '',
	assemble_by: '',
	manufactured_by: '',
	marketed_by: '',
	variant: '',
	warranty: '',
	imported_by: '',
	web_link: '',

	description: '',
	slug: '',
	sort_order: '',
	shelf_number: '',
	meta_keywords: '',
	meta_description: '',

	category_ids: [],
	'category_ids[]': '',
	feature_image: '',
	product_images: '',
	previous_product_images: '',
}

// slugify helper function
const slugify = (toConvertText) => {
	toConvertText = toConvertText.replace(/^\s+|\s+$/g, '')

	// Make the string lowercase
	toConvertText = toConvertText.toLowerCase()

	// Remove accents, swap ñ for n, etc
	var from =
		'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
	var to =
		'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
	for (var i = 0, l = from.length; i < l; i++) {
		toConvertText = toConvertText.replace(
			new RegExp(from.charAt(i), 'g'),
			to.charAt(i)
		)
	}

	// Remove invalid chars
	toConvertText = toConvertText
		.replace(/[^a-z0-9 -]/g, '')
		// Collapse whitespace and replace by -
		.replace(/\s+/g, '-')
		// Collapse dashes
		.replace(/-+/g, '-')

	return toConvertText
}

// array remove helper function
function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele !== value
	})
}

const rewriteProductName = (productInformation) => {
	return [
		productInformation.brand.trim(),
		productInformation.item_name.trim(),
		productInformation.model.trim(),
		productInformation.variant.trim(),
		productInformation.color.trim(),
		productInformation.size.trim(),
		productInformation.flavor.trim(),
		productInformation.version.trim(),
		productInformation.part_number.trim(),
		productInformation.net_content.trim(),
	]
		.join(' ')
		.replace(/\s\s+/g, ' ')
}

const rewriteDescriptionFromPropsData = (productInformation) => {
	return [
		productInformation.name &&
			`Product Name: ${productInformation.name.trim()}\n`,
		productInformation.item_name &&
			`Item Name: ${productInformation.item_name.trim()}\n`,
		productInformation.brand && `Brand: ${productInformation.brand.trim()}\n`,
		productInformation.company_brand_en &&
			`Company Name: ${productInformation.company_brand_en.trim()}\n`,
		productInformation.net_content &&
			`Net Content: ${productInformation.net_content.trim()}\n`,
		productInformation.selling_price &&
			`Selling Price: ${productInformation.selling_price}\n`,
		productInformation.unit &&
			`Selling Unit: ${productInformation.unit.trim()}\n`,
		productInformation.barcode && `Barcode: ${productInformation.barcode}\n`,
		productInformation.model && `Model: ${productInformation.model.trim()}\n`,
		productInformation.part_number &&
			`Part Number: ${productInformation.part_number.trim()}\n`,
		// productInformation.companyBrandShortName &&
		// 	`Company Brand: ${productInformation.companyBrandShortName.trim()}\n`,
		productInformation.size && `Size: ${productInformation.size.trim()}\n`,
		productInformation.length &&
			`Length: ${productInformation.length.trim()}\n`,
		productInformation.width && `Width: ${productInformation.width.trim()}\n`,
		productInformation.height &&
			`Height: ${productInformation.height.trim()}\n`,
		productInformation.weight && `Weight: ${productInformation.weight} kg\n`,
		productInformation.color && `Color: ${productInformation.color.trim()}\n`,
		productInformation.flavor &&
			`Flavor: ${productInformation.flavor.trim()}\n`,
		productInformation.version &&
			`Version: ${productInformation.version.trim()}\n`,
		productInformation.ingredients &&
			`Ingredients: ${productInformation.ingredients.trim()}\n`,
		productInformation.variant &&
			`Variant: ${productInformation.variant.trim()}\n`,
		productInformation.country_of_origin &&
			`Country of Origin: ${productInformation.country_of_origin.trim()}\n`,
		productInformation.made_in &&
			`Made In (Country Name): ${productInformation.made_in.trim()}\n`,
		productInformation.assemble_by &&
			`Assemble By: ${productInformation.assemble_by.trim()}\n`,
		productInformation.manufactured_by &&
			`Manufactured By (Company Name): ${productInformation.manufactured_by.trim()}\n`,
		productInformation.marketed_by &&
			`Marketed By (Company Name): ${productInformation.marketed_by.trim()}\n`,
		productInformation.imported_by &&
			`Imported By: ${productInformation.imported_by.trim()}\n`,
		productInformation.warranty &&
			`Warranty: ${productInformation.warranty.trim()}\n`,
	].join('')
}
export {
	productInputFiled,
	productInputErrorFiled,
	staticUnitOptions,
	arrayRemove,
	slugify,
	rewriteProductName,
	rewriteDescriptionFromPropsData,
}
