import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {toastService} from "./toastService.ts";
import {logout} from "./logout.ts";

// Define your API base URL
const BASE_URL = import.meta.env.BACKEND_URL;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define your authentication token, you can set it from your authentication logic
let authToken: string | null = sessionStorage.getItem("token");

// Set up request interceptors
axiosInstance.interceptors.request.use(
    // @ts-ignore
    (config: AxiosRequestConfig) => {
        // Attach authentication token to headers
        if (authToken) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set up response interceptors
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {

        if (response.data?.message) {
            toastService('success', response.data.message);
        }

        return response;
    },
    (error) => {
        if (error.response?.data?.message) {
            toastService('error', error.response.data.message)
        }

        if (error.response && error.response.status === 401) {
            logout();
        }

        if (error.response && error.response.status === 422) {
            let errors = error.response.data?.errors;
            for (const key of Object.keys(errors)) {
                toastService('error', errors[key][0])
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
