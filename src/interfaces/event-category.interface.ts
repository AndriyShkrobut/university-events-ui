import { IEvent } from "./event.interface";

export interface IEventCategory {
  id: number;
  name: string;
  events: IEvent[];
}
