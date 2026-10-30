class CartStorage {

    setCartItems(cartStateEcommerce) {
        localStorage.setItem('cartStateEcommerce', JSON.stringify(cartStateEcommerce));
    }


    getCartItems() {

        let cartStateEcommerce = localStorage.getItem('cartStateEcommerce');

        return JSON.parse(cartStateEcommerce);
    }

    removeCartItem() {
        this.hasCartItems() ? localStorage.removeItem('cartStateEcommerce') : '';
    }

    hasCartItems() {
        return !!this.getCartItems();
    }

}

export default CartStorage = new CartStorage();
