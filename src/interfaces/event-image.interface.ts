import { IEvent } from "./event.interface";
import { IImage } from "./image.interface";

export interface IEventImage {
  id: number;
  isAfterEvent: boolean;
  event: IEvent;
  image: IImage;
}
