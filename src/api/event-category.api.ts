import { AxiosResponse } from "axios";
import { IEventCategory } from "interfaces/event-category.interface";
import httpClient from "./http-client.api";
import { IApi } from "./api.interface";

class EventCategoryApi implements IApi<IEventCategory> {
  static BASE_URL = "/EventCategory";

  create(body: IEventCategory): Promise<AxiosResponse<IEventCategory>> {
    return httpClient.post(EventCategoryApi.BASE_URL, body);
  }

  delete(id: string): Promise<AxiosResponse<IEventCategory>> {
    return httpClient.delete(`${EventCategoryApi.BASE_URL}/${id}`);
  }

  getAll(params?: { [p: string]: string | number }): Promise<AxiosResponse<IEventCategory>> {
    return httpClient.get(EventCategoryApi.BASE_URL, { params });
  }

  getOne(id: string): Promise<AxiosResponse<IEventCategory>> {
    return httpClient.get(`${EventCategoryApi.BASE_URL}/${id}`);
  }

  update(id: string, body: IEventCategory): Promise<AxiosResponse<IEventCategory>> {
    return httpClient.put(`${EventCategoryApi.BASE_URL}/${id}`, body);
  }
}

export default new EventCategoryApi();
