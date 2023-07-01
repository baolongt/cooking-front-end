import axios from 'axios';

const API_URL = 'https://172.16.16.113:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
