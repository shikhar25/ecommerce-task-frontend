import axios from "axios";
import { _TOKEN_141414_FSLKDFJ } from "../Components/commons/__utils";

axios.interceptors.request.use(
  (config) => {
    const _token = localStorage.getItem(_TOKEN_141414_FSLKDFJ);
    if (_token) {
      config.headers.Authorization = `Bearer ${_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
