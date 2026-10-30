class CategoryStorage {

    setMenuCategories(menuCategories) {
        sessionStorage.setItem('menuCategories', btoa(JSON.stringify(menuCategories)));
    }

    getMenuCategories() {
        const menuCategories = sessionStorage.getItem('menuCategories');
        return menuCategories ? JSON.parse(atob(menuCategories)) : '';
    }

    setHomeCategories(homeCategories) {
        sessionStorage.setItem('homeCategories', btoa(JSON.stringify(homeCategories)));
    }

    getHomeCategories() {
        const homeCategories = sessionStorage.getItem('homeCategories');
        return homeCategories ? JSON.parse(atob(homeCategories)) : '';
    }

    hasHomeCategories() {
        return !!this.getHomeCategories();
    }

    hasMenuCategories() {
        return !!this.getMenuCategories();
    }
}

export default CategoryStorage = new CategoryStorage();