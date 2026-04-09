import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
    withCredentials: true
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest.url !== '/auth/refresh' && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(() => {
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post('/auth/refresh');
                isRefreshing = false;
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (err) {
                isRefreshing = false;
                processQueue(err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);