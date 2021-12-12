import { IImage } from "./image.interface";

export interface IEventImage {
  id: number;
  isAfterEvent: boolean;
  image: IImage;
}
