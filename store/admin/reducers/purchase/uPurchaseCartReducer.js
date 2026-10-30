import {
    ADD_CHALAN_ATTACHMENT,
    ADD_CHALAN_DATE,
    ADD_CHALAN_NUMBER,
    ADD_INVOICE_ATTACHMENT,
    ADD_INVOICE_DATE,
    ADD_INVOICE_NUMBER,
    ADD_PRODUCT_EXPIRE_DATE,
    ADD_PRODUCT_MRP,
    ADD_PRODUCT_QTY, ADD_PRODUCT_UNIT,
    ADD_PRODUCT_UNIT_PRICE,
    ADD_PURCHASE_DISCOUNT,
    ADD_PURCHASE_ERRORS,
    ADD_PURCHASE_MESSAGE,
    ADD_PURCHASE_NOTE,
    ADD_PURCHASE_PRODUCTS,
    ADD_SELECTED_SUPPLIER,
    ADD_SUPPLIERS,
    EDIT_PURCHASE_PRODUCTS,
    REMOVE_PRODUCT,
    RESET_PURCHASE_DATA,
    RESET_PURCHASE_MESSAGE
} from "../../actions/purchase/uPurchaseCartActions";

let initialSelectedSupplier = {
    value: '',
    label: 'Select Supplier....'
}

let initialErrors = {
    invoice_number: '',
    supplier_id: '',
    products: '',
    chalan_attachment: '',
    invoice_attachment: ''
}

let initialMessage = {
    success: '',
    error: ''
}

let initialState = {
    products: [],
    shop_id: 2,
    chalan_number: '',
    chalan_date: '',
    chalan_attachment: '',
    invoice_number: '',
    invoice_date: new Date().toISOString().slice(0, 10),
    invoice_attachment: '',
    supplier_id: '',
    total_discount: '',
    status: 'Received',
    payment_status: 'Due',
    purchase_note: '',
    selectedSupplier: initialSelectedSupplier,
    suppliers: [],
    errors: initialErrors,
    message: initialMessage
}

const uPurchaseCartReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {

        case ADD_PURCHASE_PRODUCTS: {
            let id = payload.product.id;
            let barcode = payload.product.barcode;
            let name = payload.product.name;
            let purchase_price = payload?.product?.last_purchase_price ?? '';
            let last_purchase_price = payload?.product?.last_purchase_price ?? '';
            let image = payload.product.feature_image;
            let mrp = payload?.product?.selling_price ?? '';
            let quantity = 0.00;
            let unit_price = 0.00;
            // let unit_id = payload?.product?.productDetails?.unit_id ?? '';
            let unit_id = payload?.product?.unit_id ?? '';
            let unit_id_check = unit_id;
            let expire_date = "";

            let product = {
                id,
                name,
                purchase_price,
                image,
                mrp,
                quantity,
                unit_price,
                unit_id,
                unit_id_check,
                expire_date,
                barcode,
                last_purchase_price,
            }


            let itemExist = false;

            let tempCart = state.products.map(cartItem => {

                if (cartItem.id === product.id) {
                    itemExist = true;
                }

                return cartItem;
            });

            return (itemExist) ? {
                    ...state,
                    products: tempCart,
                    errors: {...state.errors, products: ''}
                } :
                {
                    ...state,
                    products: [...state.products, product],
                    errors: {...state.errors, products: ''}
                };
        }

        case EDIT_PURCHASE_PRODUCTS: {
            let purchase = payload.purchase;
            let chalan_number = purchase.chalan_number ?? '';
            let chalan_date = purchase.chalan_date ? new Date(purchase.chalan_date).toISOString().slice(0, 10) : '';
            let chalan_attachment = '';
            let invoice_number = purchase.invoice_number ?? '';
            let invoice_date = purchase.invoice_date ? new Date(purchase.invoice_date).toISOString().slice(0, 10) : '';
            let invoice_attachment = '';
            let supplier_id = purchase.supplier_id ?? '';
            let total_discount = purchase.total_discount ?? '';
            let status = purchase.status ?? '';
            let payment_status = purchase.payment_status ?? '';
            let purchase_note = purchase.purchase_note ?? '';
            let selectedSupplier = state.suppliers && state.suppliers.find((supplier) => supplier.value === supplier_id);

            let tempPurchaseProducts = (payload.purchase
                    && payload.purchase.product_purchases
                    && payload.purchase.product_purchases.length > 0)
                && payload.purchase.product_purchases.map((productPurchase) => {
                    let id = productPurchase.product.id;
                    let name = productPurchase.product.name;
                    let image = productPurchase.product.feature_image;
                    let purchase_price = productPurchase.purchase_price;
                    let mrp = productPurchase.selling_price;
                    let quantity = productPurchase.purchase_quantity;
                    let unit_price = productPurchase.net_unit_cost;
                    let expire_date = productPurchase.expiry_date ? new Date(productPurchase.expiry_date).toISOString().slice(0, 10) : '';

                    return {
                        id,
                        name,
                        purchase_price,
                        image,
                        mrp,
                        quantity,
                        unit_price,
                        expire_date
                    }
                });

            return {
                ...state,
                products: tempPurchaseProducts,
                chalan_number: chalan_number,
                chalan_date: chalan_date,
                chalan_attachment: chalan_attachment,
                invoice_number: invoice_number,
                invoice_date: invoice_date,
                invoice_attachment: invoice_attachment,
                supplier_id: supplier_id,
                total_discount: total_discount,
                status: status,
                payment_status: payment_status,
                purchase_note: purchase_note,
                selectedSupplier: selectedSupplier
            }
        }

        case ADD_PRODUCT_MRP: {

            let cartData = state.products.map((item) => {
                if (payload.id === item.id) {
                    let mrp = (parseFloat(payload.mrp) > 0) ? parseFloat(payload.mrp) : 0;
                    item = {...item, mrp}
                }
                return item;
            })

            return {
                ...state,
                products: cartData
            }

        }

        case ADD_PRODUCT_UNIT: {

            let cartData = state.products.map((item) => {
                if (payload.id === item.id) {
                    let unit_id = payload?.unit_id;
                    item = {...item, unit_id}
                }
                return item;
            })

            return {
                ...state,
                products: cartData
            }

        }

        case ADD_PRODUCT_QTY: {

            let cartData = state.products.map((item) => {
                if (payload.id === item.id) {
                    let quantity = parseFloat(payload.quantity) > 0 ? parseFloat(payload.quantity) : 0;
                    item = {...item, quantity: quantity};
                }
                return item;
            });

            return {
                ...state,
                products: cartData
            }

        }

        case ADD_PRODUCT_UNIT_PRICE: {
            let cartData = state.products.map((item) => {
                if (payload.id === item.id) {
                    let unit_price = (parseFloat(payload.unit_price) > 0) ? parseFloat(payload.unit_price) : 0;
                    item = {...item, unit_price: unit_price}
                }

                return item;
            });

            return {
                ...state,
                products: cartData
            }
        }

        case ADD_PRODUCT_EXPIRE_DATE: {
            let cartData = state.products.map((item) => {
                if (payload.id === item.id) {
                    let expire_date = payload.expire_date;
                    item = {...item, expire_date: expire_date};
                }
                return item;
            });

            return {
                ...state,
                products: cartData
            }
        }


        case ADD_SELECTED_SUPPLIER: {

            let selectedSupplier = payload.selectedSupplier;

            return {
                ...state,
                selectedSupplier: selectedSupplier,
                supplier_id: selectedSupplier ? selectedSupplier.value : '',
                errors: {...state.errors, supplier_id: ''}
            }
        }

        case ADD_SUPPLIERS: {
            return {
                ...state,
                suppliers: payload.suppliers
            }
        }


        case ADD_CHALAN_NUMBER: {
            return {
                ...state,
                chalan_number: payload.chalan_number
            }
        }

        case ADD_CHALAN_DATE: {
            return {
                ...state,
                chalan_date: payload.chalan_date
            }
        }

        case ADD_CHALAN_ATTACHMENT: {
            return {
                ...state,
                chalan_attachment: payload.chalan_attachment,
                errors: {...state.errors, chalan_attachment: ''}
            }
        }

        case ADD_INVOICE_NUMBER: {
            return {
                ...state,
                invoice_number: payload.invoice_number,
                errors: {...state.errors, invoice_number: ''}
            }
        }

        case ADD_INVOICE_DATE: {
            return {
                ...state,
                invoice_date: payload.invoice_date
            }
        }

        case ADD_INVOICE_ATTACHMENT: {
            return {
                ...state,
                invoice_attachment: payload.invoice_attachment,
                errors: {...state.errors, invoice_attachment: ''}
            }
        }


        case ADD_PURCHASE_NOTE: {
            return {
                ...state,
                purchase_note: payload.purchase_note
            }
        }

        case ADD_PURCHASE_DISCOUNT: {
            return {
                ...state,
                total_discount: (parseFloat(payload.total_discount) > 0) ? parseFloat(payload.total_discount) : ''
            }
        }

        case REMOVE_PRODUCT: {
            return {
                ...state,
                products: state.products.filter(item => payload.id !== item.id)
            }
        }

        case ADD_PURCHASE_ERRORS: {
            return {
                ...state,
                errors: payload.errors
            }
        }

        case ADD_PURCHASE_MESSAGE: {
            return {
                ...state,
                message: {
                    ...state.message,
                    [payload.message_type]: payload.message
                }
            }
        }

        case RESET_PURCHASE_MESSAGE: {
            return {
                ...state,
                message: initialMessage
            }
        }

        case RESET_PURCHASE_DATA: {
            document.getElementById("chalan_attachment_text").innerHTML = 'doc, pdf, xls, csv or image';
            document.getElementById("invoice_attachment_text").innerHTML = 'doc, pdf, xls, csv or image';
            return {
                ...initialState,
                suppliers: state.suppliers
            };
        }


        default:
            return state;

    }
}

export default uPurchaseCartReducer;
