class PosSale {
    createSale(posCartData) {

        let formData = new FormData();

        formData.append('cart', JSON.stringify(posCartData.cart));
        formData.append('change_return', posCartData.change_return);
        formData.append('coupon_discount', posCartData.coupon_discount);
        formData.append('delivery_charge', posCartData.delivery_charge);
        formData.append('discount', posCartData.discount);
        formData.append('grand_total', posCartData.grand_total);
        formData.append('order_type', posCartData.order_type);
        formData.append('payment_method', posCartData.payment_method);
        formData.append('payment_note', posCartData.payment_note);
        formData.append('payment_status', posCartData.payment_status);
        formData.append('pos_amount', posCartData.pos_amount);
        formData.append('quick_cash_amount', posCartData.quick_cash_amount);
        formData.append('quick_cash_note', JSON.stringify(posCartData.quick_cash_note));
        formData.append('shop_id', posCartData.shop_id);
        formData.append('staff_note', posCartData.staff_note);
        formData.append('sub_total', posCartData.sub_total);
        formData.append('user_id', posCartData.user_id);

        return formData;

    }
}

export default PosSale = new PosSale();