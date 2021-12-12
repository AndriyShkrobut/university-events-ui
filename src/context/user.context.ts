import React from "react";
import { ICreateUserPayload, IUser } from "interfaces/user.interface";

export type UserContextType = {
  createUser(payload: ICreateUserPayload): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: number): Promise<IUser>;
  users: IUser[];
  isLoading: boolean;
};

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;
