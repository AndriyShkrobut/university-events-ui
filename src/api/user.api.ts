import { AxiosResponse } from "axios";

import httpClient from "./http-client.api";
import { IApi } from "./api.interface";

// TODO: define user interface
export interface IUser {
  id: string;
}

class UserApi implements IApi<IUser> {
  static BASE_URL = "/User";

  create(body: IUser): Promise<AxiosResponse<IUser>> {
    return httpClient.post(UserApi.BASE_URL, body);
  }

  delete(id: string): Promise<AxiosResponse<IUser>> {
    return httpClient.delete(`${UserApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IUser>> {
    return httpClient.get(UserApi.BASE_URL, { params });
  }

  getOne(id: string): Promise<AxiosResponse<IUser>> {
    return httpClient.get(`${UserApi.BASE_URL}/${id}`);
  }

  update(id: string, body: IUser): Promise<AxiosResponse<IUser>> {
    return httpClient.put(`${UserApi.BASE_URL}/${id}`, body);
  }
}

export default new UserApi();
