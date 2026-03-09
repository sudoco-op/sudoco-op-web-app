import axios, { type InternalAxiosRequestConfig } from "axios";
import { getUserToken } from "./auth";

export const setupAxios = () => {
    axios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getUserToken();
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}