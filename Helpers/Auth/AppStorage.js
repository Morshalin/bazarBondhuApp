class AppStorage {

    // Store the access token
    storeToken(token) {
        localStorage.setItem('token', token);
    }

    // Store the logged in user
    storeUser(user) {
        localStorage.setItem('user', user);
    }

    // Store Logged in user and token
    store(user, token) {
        this.storeUser(user);
        this.storeToken(token);
    }

    // Clear logged in user and token by logout
    clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Get the token
    getToken() {
        return localStorage.getItem('token');
    }

    // Simplified return
    isLoggedIn() {
        return !!this.getToken();
    }

    // Get the logged in user
    getUser() {
        return localStorage.getItem('user');
    }

}

export default AppStorage = new AppStorage();
