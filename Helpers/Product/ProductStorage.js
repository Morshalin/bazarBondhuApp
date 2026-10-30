class ProductStorage {

    setPopularProducts(popularProducts) {
        sessionStorage.setItem('popularProducts', btoa(JSON.stringify(popularProducts)));
    }

    getPopularProducts() {
        const popularProducts = sessionStorage.getItem('popularProducts');

        return popularProducts ? JSON.parse(atob(popularProducts)) : '';
    }

    hasPopularProducts() {
        return !!this.getPopularProducts();
    }
}

export default ProductStorage = new ProductStorage();