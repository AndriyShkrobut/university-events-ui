import axios, { AxiosRequestConfig } from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const ACCESS_TOKEN_KEY = "access_token";

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
