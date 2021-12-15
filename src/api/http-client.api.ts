import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "providers/auth.provider";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const injectAccessToken = (config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

httpClient.interceptors.request.use(injectAccessToken);

export default httpClient;
