import axios from "axios";

class Storage {
  storeToken(token, expires) {
    document.cookie =
      "token=" + token + ";" + "expires=" + expires + "; path=/";
  }

  storeUser(user, user_id, phone, expires,user_image) {
    document.cookie = "user=" + user + ";" + "expires=" + expires + "; path=/";
    document.cookie =
      "user_id=" + user_id + ";" + "expires=" + expires + "; path=/";
      document.cookie =
      "phone=" + phone + ";" + "expires=" + expires + "; path=/";
      document.cookie =
      "user_image=" + user_image + ";" + "expires=" + expires + "; path=/";
  }

  storeUserImage(user_image){
    console.log(new Date(Date.now()).toUTCString());
    "user_image=" + user_image + ";" + "expires=" + new Date(Date.now() + 30).toUTCString() + "; path=/";
  }

  store(authData) {
    let authUser = JSON.parse(authData);
    let token = authUser.access_token;
    let expires = new Date(Date.now() + authUser.expires_in).toUTCString();
    let name = authUser.user.name ?? "";
    let phone = authUser.user.phone ?? "";
    let user_id = authUser.user.id ?? "";
    let user_image = authUser.user.image ?? "";

    this.storeToken(token, expires);
    this.storeUser(name, user_id, phone, expires,user_image);
  }

  getToken() {
    return this.getCookie("token");
  }

  getUser() {
    return this.getCookie("user");
  }

  getUserImage() {
    return this.getCookie("user_image");
  }

  

  getUserPhone() {
    return this.getCookie("phone");
  }
  getUserId() {
    return this.getCookie("user_id");
  }
  isLoggedIn() {
    this.getToken() ? (axios.defaults.baseURL = process.env.api_url) : "";
    this.getToken()
      ? (axios.defaults.headers.Authorization = `Bearer ${this.getToken()}`)
      : "";
    return !!this.getToken();
  }

  clear() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    document.cookie = "user_image=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";

  }

  getCookie(cookieName) {
    let cookies = document.cookie;

    let tokenData = cookies
      ? cookies.split("; ").find((row) => row.startsWith(cookieName))
      : "";

    return tokenData ? tokenData.split("=")[1] : "";
  }
}

export default Storage = new Storage();
