import { IEvent } from "./event.interface";

export interface IEventStatus {
  id: number;
  name: string;
  events: IEvent[];
}
