import { IUser } from "./user.interface";

export interface ILoginPayload {
  login: IUser["email"];
  password: string;
}

export interface IAuth {
  user: IUser;
  token: string;
  validTo: Date;
}

export interface ITokenPayload {
  id: string;
  Roles: string;
  exp: number;
}
