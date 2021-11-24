import { IEventCategory } from "./event-category.interface";
import { IEventGuest } from "./event-guest.interface";
import { IEventImage } from "./event-image.interface";
import { IEventStatus } from "./event-status.interface";
import { IUser } from "./user.interface";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  createDate: Date;
  location: string;
  isDeleted: boolean;
  category: IEventCategory;
  status: IEventStatus;
  author: IUser;
  organizer: IUser;
  guests: IEventGuest[];
  images: IEventImage[];
}
