/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import api from "./api";

export const GetAllUsers = async () => {
  return api.get(`User`).catch((error) => {
    throw new Error(error);
  });
};

export const GetUserById = async (userId: number) => {
  return api.get(`User/${userId}`).catch((error) => {
    throw new Error(error);
  });
};

export const PutUser = async (data: any) => {
  return api.put(`User`, data).catch((error) => {
    throw new Error(error);
  });
};

export const PostUser = async (data: any) => {
  return api.post(`User`, data).catch((error) => {
    throw new Error(error);
  });
};

export const DeleteUserById = async (userId: number) => {
  return api.post(`User${userId}`).catch((error) => {
    throw new Error(error);
  });
};
