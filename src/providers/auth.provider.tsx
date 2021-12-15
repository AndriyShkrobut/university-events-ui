import React, { useCallback, useEffect, useMemo, useState } from "react";
import JwtDecode from "jwt-decode";

import authApi from "api/auth.api";
import AuthContext, { AuthContextType } from "context/auth.context";
import useUser from "hooks/use-user";
import { ILoginPayload, ITokenPayload, Role } from "interfaces/auth.interface";

export const ACCESS_TOKEN_KEY = "access_token";

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<AuthContextType["isLoggedIn"]>(false);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState<AuthContextType["isLoading"]>(false);
  const { getUserById } = useUser();

  const isAdmin = useMemo<boolean>(() => {
    if (!user || !isLoggedIn) return false;

    return user.roles.some((item) => item.name === Role.ADMIN);
  }, [isLoggedIn, user]);

  const roles = useMemo<Role[]>(() => {
    if (!user) return [];

    return user.roles.map((item) => item.name);
  }, [user]);

  const login = useCallback((payload: ILoginPayload) => {
    setIsLoading(true);

    return authApi
      .login(payload)
      .then((response) => {
        const { data } = response;

        window.localStorage.setItem(ACCESS_TOKEN_KEY, data.token);

        setUser(data.user);
        setIsLoggedIn(true);

        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    if (isLoggedIn) return;

    setIsLoading(true);

    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      const decodedToken = JwtDecode<ITokenPayload>(token);

      if (Date.now() > decodedToken.exp * 1000) {
        return logout();
      }

      const userId = Number(decodedToken.id);

      getUserById(userId)
        .then((data) => {
          if (!data) return;

          setUser(data);
          setIsLoggedIn(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [getUserById, isLoggedIn]);

  const value = { isLoggedIn, isLoading, isAdmin, login, logout, user, roles };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
