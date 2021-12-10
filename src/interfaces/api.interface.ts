import { AxiosResponse } from "axios";

export interface IApi<T> {
  create(body: T): Promise<AxiosResponse<T>>;

  getOne(id: string): Promise<AxiosResponse<T>>;

  getAll(params?: { [key: string]: string | number }): Promise<AxiosResponse<T>>;

  update(id: string, body: T): Promise<AxiosResponse<T>>;

  delete(id: string): Promise<AxiosResponse<T>>;
}
