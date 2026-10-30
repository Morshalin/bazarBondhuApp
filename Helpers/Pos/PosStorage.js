class PosStorage {

    setCartItems(cartStateDataPos) {
        localStorage.setItem('cartStateDataPos', JSON.stringify(cartStateDataPos));
    }


    getCartItems() {

        let cartStateDataPos = localStorage.getItem('cartStateDataPos');

        return JSON.parse(cartStateDataPos);
    }

    removeCartItem() {
        this.hasCartItems() ? localStorage.removeItem('cartStateDataPos') : '';
    }

    hasCartItems() {
        return !!this.getCartItems();
    }

}

export default PosStorage = new PosStorage();