import React from "react";
import { IUser } from "interfaces/user.interface";
import { IAuth, ILoginPayload } from "interfaces/auth.interface";

export type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login(payload: ILoginPayload): Promise<IAuth>;
  logout(): void;
  user: IUser | null;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
