import axios from "axios";

// Axios instance create kar rahe hain
const API = axios.create({
  baseURL: "https://prompt-vault-backend-nmab.onrender.com", // Yahan meri api ki  backend ki base URL hai
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Agar aapko cookies bhejni hain toh ye zaruri hai
});

// Response interceptor (optional: agar error handle karna ho)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Yahan aap global errors handle kar sakte hain (jaise 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      console.log("Session expired or unauthorized");
    }
    return Promise.reject(error);
  },
);

export default API;
