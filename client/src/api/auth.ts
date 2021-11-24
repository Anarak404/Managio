import { httpClient } from "./client";
import { ISignInRequest, ISignUpRequest, IUser } from "./types";

export const signInApi = async (data: ISignInRequest): Promise<IUser> => {
  return httpClient.post("/login", data);
};

export const signUpApi = async (data: ISignUpRequest): Promise<IUser> => {
  return httpClient.post("/register", data);
};

export const checkLoginApi = async (): Promise<IUser> => {
  return httpClient.get("/checkLogin");
};
