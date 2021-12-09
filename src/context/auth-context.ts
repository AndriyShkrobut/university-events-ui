import React from "react";
import { IUser } from "api/user.api";

export type Auth = {
  isLoggedIn: boolean;
  login(): void;
  logout(): void;
  user?: IUser;
};

const AuthContext = React.createContext<Auth>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
