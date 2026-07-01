import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: String(import.meta.env.VITE_API_BASE_URL),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data?.status_message || error.message);
        return Promise.reject(error);
    }
);