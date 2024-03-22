import axios from "axios";
import { _TOKEN_141414_FSLKDFJ } from "../Components/commons/__utils";

axios.interceptors.request.use(
  (config) => {
    // Add authorization header to the request
    const _token = localStorage.getItem(_TOKEN_141414_FSLKDFJ);
    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
