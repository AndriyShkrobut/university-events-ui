import { IEvent } from "./event.interface";
import { IUser } from "./user.interface";

export interface IEventGuest {
  id: number;
  guest: IUser;
  event: IEvent;
}
