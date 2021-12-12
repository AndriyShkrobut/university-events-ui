import React, { useCallback, useState } from "react";

import userApi from "api/user.api";
import UserContext, { UserContextType } from "context/user.context";
import { ICreateUserPayload } from "interfaces/user.interface";

const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<UserContextType["users"]>([]);
  const [isLoading, setIsLoading] = useState<UserContextType["isLoading"]>(false);

  const createUser = useCallback((payload: ICreateUserPayload) => {
    setIsLoading(true);

    return userApi
      .create(payload)
      .then((response) => {
        const { data } = response;
        setUsers((prevState) => [...prevState, data]);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getAllUsers = useCallback(() => {
    setIsLoading(true);

    return userApi
      .getAll()
      .then((response) => {
        const { data } = response;
        setUsers(data);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getUserById = useCallback((id: number) => {
    setIsLoading(true);

    return userApi
      .getOne(id)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = { createUser, getAllUsers, getUserById, users, isLoading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
