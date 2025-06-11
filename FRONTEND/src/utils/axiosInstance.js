import axios from "axios";
import { showErrorToast } from "../components/toastMessage"; // adjust path as needed

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // Set a timeout for requests
  withCredentials: true, // Include credentials for cross-origin requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within 2xx
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("API error:", error.response.data);
      showErrorToast(error.response.data.message || "API Error");
    } else if (error.request) {
      // No response received
      console.error("No response from server:", error.request);
      showErrorToast("No response from server. Please try again.");
    } else {
      // Something else happened
      console.error("Error:", error.message);
      showErrorToast("An unexpected error occurred.");
    }

    return Promise.reject({
      message:
        error.response?.data.message ||
        error.message ||
        "An unexpected error occurred.",
      status: error.response ? error.response.status : 500,
      data: error.response ? error.response.data : null,
      originalError: error,
    });
  }
);


export default axiosInstance;
