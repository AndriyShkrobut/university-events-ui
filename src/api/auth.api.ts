import { AxiosResponse } from "axios";
import httpClient from "./http-client.api";
import { IAuth, ILoginPayload } from "interfaces/auth.interface";

class AuthApi {
  static BASE_URL = "/auth";

  login(body: ILoginPayload): Promise<AxiosResponse<IAuth>> {
    return httpClient.post(AuthApi.BASE_URL, body);
  }
}

export default new AuthApi();
