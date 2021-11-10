/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import axios, { Canceler } from "axios";
import { createBrowserHistory } from "history";
import URL from "./URL";
import AuthStore from "../stores/AuthStore";

const { CancelToken } = axios;
const source = CancelToken.source();

export const history = createBrowserHistory();
let cancel: Canceler;

interface HttpResponse {
  headers: unknown;
  data: unknown;
}

axios.interceptors.request.use(
  (config) => {
    const token = AuthStore.getToken() as string;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      new CancelToken(function executor(c) {
        cancel = c;
      });
      source.cancel();
      AuthStore.removeToken();
      const str = window.location.pathname;
      if (str !== "/signin") {
        localStorage.setItem("pathName", str);
      }
      history.push("/signin");
      window.location.reload();
    }
    if (err.response?.status === 403) {
      history.push("/notAuthorized");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

const get = async (url: string, data?: any, paramsSerializer?: any): Promise<HttpResponse> => {
  const response = await axios.get(URL + url, {
    params: data,
    paramsSerializer,
  });
  return response;
};

const post = async (url: string, data?: any) => {
  const response = await axios.post(URL + url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};

const put = async (url: string, data?: any): Promise<HttpResponse> => {
  const response = await axios.put(URL + url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};

const remove = async (url: string, data?: any, options: any = {}): Promise<HttpResponse> => {
  const response = await axios.delete(URL + url, {
    ...options,
    params: data,
  });
  return response;
};
export default { get, post, put, remove };
