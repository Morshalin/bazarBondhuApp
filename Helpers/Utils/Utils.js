import axios from "axios";
import { useEffect, useState } from "react";
// import CryptoJS from "crypto-js";

export const options = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  scale: 1.0,
  corners: 1,
  color: "#000",
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  top: "50%",
  left: "50%",
  shadow: false,
  hwaccel: false,
  position: "absolute",
};

export const DELETE = "DELETE";
export const STATUS = "STATUS";
export const SUCCESS = "success";
export const ERROR = "error";

export const saveAction = async (url, data) => {
  return await axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const saveFileAction = async (url, data, config) => {
  return await axios
    .post(url, data, config)
    .then((res) => res.data)
    .catch((err) => err);
};

export const updateAction = async (url, data) => {
  return await axios
    .put(url, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const updateFileAction = async (url, data, config) => {
  return await axios
    .post(url, data, config)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getActions = async (url, pagination) => {
  return (await pagination)
    ? axios
        .get(url)
        .then((res) => res.data.data)
        .catch((err) => err)
    : axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
};
export const getData = async (url, pagination) => {
  return (await pagination)
    ? axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err)
    : axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err);
};
export const getAllData = async (url, pagination) => {
  return (await pagination)
    ? axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err)
    : axios
        .get(url)
        .then((res) => res)
        .catch((err) => err);
};

export const getAllRequest = async (url) => {
  return await axios
    .all(url)
    .then(axios.spread((...response) => response))
    .catch((err) => err);
};

export const showActions = async (url) => {
  return await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);
};

export const statusChange = async (url) => {
  return await axios
    .post(url)
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteAction = async (url) => {
  return await axios
    .delete(url)
    .then((res) => res.data)
    .catch((err) => err);
};

export const saveToLocalStorage = async (key, value) => {
  localStorage.setItem(`${key}`, value);
};

export const postMethodGetData = async (url, data) => {
  return await axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => err);
};

export const getFromLocalStorage = async (key) => {
  if (localStorage.getItem(`${key}`) === null) {
    return getSiteSettings().then((response) => {
      let output = response.success
        ? response.data
        : () => {
            throw "Server is not responding";
          };
      saveToLocalStorage(`${key}`, output[key]);
      return output[key];
    });
  } else {
    return localStorage.getItem(`${key}`);
  }
};

export const getSiteSettings = async () => {
  return await axios
    .get(`${process.env.api_url}/get-shop-information`)
    .then((result) => result.data)
    .catch((error) => error);
};

export const saveToCookie = async (key, value) => {
  document.cookie = `${key}=${encodeURIComponent(value)}`;
};

export const getFromCookie = async (key) => {
  if (getCookie(key) === null) {
    return getSiteSettings().then((response) => {
      let output = response.success
        ? response.data
        : () => {
            throw "Server is not responding";
          };
      saveToCookie(`${key}`, output[key]);
      return output[key];
    });
  } else {
    return getCookie(key);
  }
};

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  let cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

export const useKeyPress = (targetKey) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler(event) {
    if (event.key === targetKey) {
      setKeyPressed(true);
      event.preventDefault();
    }
  }

  // If released key is our target key then set to false
  const upHandler = (event) => {
    if (event.key === targetKey) {
      setKeyPressed(false);
      event.preventDefault();
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};

// export function CryptoJSAesDecrypt(encrypted_json_string) {
//   let passphrase = process.env.passphrase;
//   let obj_json = JSON.parse(encrypted_json_string);
//   let encrypted = obj_json.ciphertext;

//   let salt = CryptoJS.enc.Hex.parse(obj_json.salt);

//   let iv = CryptoJS.enc.Hex.parse(obj_json.iv);

//   let key = CryptoJS.PBKDF2(passphrase, salt, {
//     hasher: CryptoJS.algo.SHA512,
//     keySize: 64 / 8,
//     iterations: 999,
//   });

//   let decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

// export function Permissions() {
//   let tempPermissions = null;

//   if (typeof window !== "undefined") {
//     if (
//       localStorage.getItem("permissions") &&
//       localStorage.getItem("permissions").length !== 0
//     ) {
//       let permissions = JSON.parse(
//         CryptoJSAesDecrypt(localStorage.getItem("permissions"))
//       );

//       let module = "";
//       let permission_type = "";
//       let permission = {
//         module,
//         permission_type,
//       };
//       tempPermissions =
//         permissions &&
//         permissions.map((perm) => {
//           permission = {
//             module: perm.module.name,
//             permission_type:
//               perm.permission_type !== "miscellaneous"
//                 ? perm.permission_type
//                 : perm.name,
//           };
//           return permission;
//         });
//     } else return "";
//   }
//   return tempPermissions;
// }
