import axios from 'axios'

const brandApi = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('/backend/brands')
			.then(({ data }) => {
				if (data.success) {
					resolve(data)
				} else {
					// eslint-disable-next-line no-throw-literal
					throw 'No valid data found from api request'
				}
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const getCompanyBrandApi = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('/backend/getCompanyBrand')
			.then(({ data }) => {
				if (data.success) {
					resolve(data)
				} else {
					// eslint-disable-next-line no-throw-literal
					throw 'No valid data found from api request'
				}
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const unitApi = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('/backend/units')
			.then(({ data }) => {
				if (data.success) {
					resolve(data)
				} else {
					// eslint-disable-next-line no-throw-literal
					throw 'No valid data found from api request'
				}
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const categoryApi = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('/backend/getAllCategoryWithChild')
			.then(({ data }) => {
				if (data.success) {
					resolve(data)
				} else {
					// eslint-disable-next-line no-throw-literal
					throw 'No valid data found from api request'
				}
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const barcodeCheckingApi = (barcode) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`backend/products/checkBarcode`, barcode)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const productCreateApi = (productFormData) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`backend/products`, productFormData)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const productEditApi = (productId, productFormData) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`backend/products/${productId}`, productFormData)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const showProductApi = (productId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`backend/products/${productId}`)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const showPurchaseProductApi = (productId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`backend/product-purchase-list/${productId}`)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const showSaleProductApi = (productId) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`backend/product-sale-list/${productId}`)
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

const addProductBrandApi = (brandsOrSeries, companyId) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`backend/brands`, {
				name: brandsOrSeries,
				brand_parent_id: companyId ?? '',
			})
			.then(({ data }) => {
				resolve(data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export {
	categoryApi,
	brandApi,
	getCompanyBrandApi,
	unitApi,
	barcodeCheckingApi,
	productCreateApi,
	productEditApi,
	showProductApi,
	showPurchaseProductApi,
	showSaleProductApi,
	addProductBrandApi,
}
