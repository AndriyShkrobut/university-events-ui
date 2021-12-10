import { AxiosResponse } from "axios";
import { IEventStatus } from "interfaces/event-status.interface";
import httpClient from "./http-client.api";
import { IApi } from "./api.interface";

class EventStatusApi implements IApi<IEventStatus> {
  static BASE_URL = "/EventStatus";

  create(body: IEventStatus): Promise<AxiosResponse<IEventStatus>> {
    return httpClient.post(EventStatusApi.BASE_URL, body);
  }

  delete(id: string): Promise<AxiosResponse<IEventStatus>> {
    return httpClient.delete(`${EventStatusApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IEventStatus>> {
    return httpClient.get(EventStatusApi.BASE_URL, { params });
  }

  getOne(id: string): Promise<AxiosResponse<IEventStatus>> {
    return httpClient.get(`${EventStatusApi.BASE_URL}/${id}`);
  }

  update(id: string, body: IEventStatus): Promise<AxiosResponse<IEventStatus>> {
    return httpClient.put(`${EventStatusApi.BASE_URL}/${id}`, body);
  }
}

export default new EventStatusApi();
