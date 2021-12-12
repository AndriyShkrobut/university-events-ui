import { AxiosResponse } from "axios";

export interface IApi<T> {
  create(body: unknown): Promise<AxiosResponse<T>>;

  getOne(id: number): Promise<AxiosResponse<T>>;

  getAll(params?: { [key: string]: string | number }): Promise<AxiosResponse<T[]>>;

  update(id: number, body: unknown): Promise<AxiosResponse<T>>;

  delete(id: number): Promise<AxiosResponse<T>>;
}
