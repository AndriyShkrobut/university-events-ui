import { AxiosResponse } from "axios";
import httpClient from "./http-client.api";
import { IToken } from "interfaces/token.interface";

class AuthApi {
  static BASE_URL = "/Auth";

  create(body: IToken): Promise<AxiosResponse<IToken>> {
    return httpClient.post(`${AuthApi.BASE_URL}/${body}`);
  }
}

export default new AuthApi();
