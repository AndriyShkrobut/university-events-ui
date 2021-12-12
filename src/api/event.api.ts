import { AxiosResponse } from "axios";
import httpClient from "./http-client.api";
import { IApi } from "interfaces/api.interface";
import { IEvent } from "interfaces/event.interface";

class EventApi implements IApi<IEvent> {
  static BASE_URL = "/event";

  create(body: FormData): Promise<AxiosResponse<IEvent>> {
    return httpClient.post(EventApi.BASE_URL, body);
  }

  delete(id: number): Promise<AxiosResponse<IEvent>> {
    return httpClient.delete(`${EventApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IEvent[]>> {
    return httpClient.get(EventApi.BASE_URL, { params });
  }

  getOne(id: number): Promise<AxiosResponse<IEvent>> {
    return httpClient.get(`${EventApi.BASE_URL}/${id}`);
  }

  update(id: number, body: FormData): Promise<AxiosResponse<IEvent>> {
    return httpClient.put(`${EventApi.BASE_URL}/${id}`, body);
  }
}

export default new EventApi();
