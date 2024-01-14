import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000'
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json'
    config.headers["Content-Type"] = 'application/json'
    return config;
});


export default axiosClient;