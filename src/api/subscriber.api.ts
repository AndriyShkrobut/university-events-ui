import { AxiosResponse } from "axios";
import { ISubscriber } from "interfaces/subscriber.interface";
import { IUser } from "interfaces/user.interface";
import httpClient from "./http-client.api";
import { IApi } from "interfaces/api.interface";

class SubscriberApi implements IApi<ISubscriber> {
  static BASE_URL = "/subscriber";

  create(body: ISubscriber): Promise<AxiosResponse<ISubscriber>> {
    return httpClient.post(SubscriberApi.BASE_URL, body);
  }

  delete(id: number): Promise<AxiosResponse<ISubscriber>> {
    return httpClient.delete(`${SubscriberApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IUser[]>> {
    return httpClient.get(SubscriberApi.BASE_URL, { params });
  }

  getOne(id: number): Promise<AxiosResponse<ISubscriber>> {
    return httpClient.get(`${SubscriberApi.BASE_URL}/${id}`);
  }

  update(id: number, body: ISubscriber): Promise<AxiosResponse<ISubscriber>> {
    return httpClient.put(`${SubscriberApi.BASE_URL}/${id}`, body);
  }
}

export default new SubscriberApi();
