import { AxiosResponse } from "axios";
import { ICreateUserPayload, IUser } from "interfaces/user.interface";
import httpClient from "./http-client.api";
import { IApi } from "interfaces/api.interface";

class UserApi implements IApi<IUser> {
  static BASE_URL = "/user";

  create(body: ICreateUserPayload): Promise<AxiosResponse<IUser>> {
    return httpClient.post(UserApi.BASE_URL, body);
  }

  delete(id: number): Promise<AxiosResponse<IUser>> {
    return httpClient.delete(`${UserApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IUser[]>> {
    return httpClient.get(UserApi.BASE_URL, { params });
  }

  getOne(id: number): Promise<AxiosResponse<IUser>> {
    return httpClient.get(`${UserApi.BASE_URL}/${id}`);
  }

  update(id: number, body: IUser): Promise<AxiosResponse<IUser>> {
    return httpClient.put(`${UserApi.BASE_URL}/${id}`, body);
  }
}

export default new UserApi();
