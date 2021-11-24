import { IUser } from "./user.interface";

export interface IToken {
  user: IUser;
  date: Date;
  token: string;
}
