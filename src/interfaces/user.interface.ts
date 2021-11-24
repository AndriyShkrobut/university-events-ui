import { IImage } from "./image.interface";
import { IRole } from "./role.interface";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  image: IImage;
  roles: IRole[];
}
