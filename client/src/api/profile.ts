import { httpClient } from "./client";
import {
  INameRequest,
  IPasswordRequest,
  IPhoto,
  IResultResponse,
  IUser,
} from "./types";

export const changeNameApi = async (data: INameRequest): Promise<IUser> => {
  return httpClient.put("/app/profile/name", data);
};

export const changePhotoApi = async (data: IPhoto): Promise<IUser> => {
  return httpClient.put("/app/profile/photo", data, "multipart/form-data");
};

export const changePasswordApi = async (
  data: IPasswordRequest
): Promise<IResultResponse> => {
  return httpClient.put("/app/profile/password", data);
};
