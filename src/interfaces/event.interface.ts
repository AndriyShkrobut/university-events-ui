import { IEventCategory } from "./event-category.interface";
import { IEventGuest } from "./event-guest.interface";
import { IEventImage } from "./event-image.interface";
import { IEventStatus } from "./event-status.interface";
import { IUser } from "./user.interface";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  createDate: string;
  location: string;
  isDeleted: boolean;
  category: IEventCategory;
  status: IEventStatus;
  author: IUser;
  organizer: IUser;
  guests: IEventGuest[];
  images: IEventImage[];
}

export type ICreateEventPayload = FormData;
export type IUpdateEventPayload = FormData;
