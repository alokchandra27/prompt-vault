import axios from 'axios';

// Axios instance create kar rahe hain
const API = axios.create({
  baseURL: 'http://localhost:3000', // Yahan apne backend ki base URL daal dena
  withCredentials: true, // Cookies ko browser mein save aur send karne ke liye bohot zaroori hai
  headers: {
    'Content-Type': 'application/json',
  },
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
  }
);

export default API;