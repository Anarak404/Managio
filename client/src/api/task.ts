import { httpClient } from "./client";
import { IConfig, IResultResponse, ITaskRequest } from "./types";

export const getConfigApi = async (): Promise<IConfig> => {
  return httpClient.get("/app/tasks/config");
};

export const createTaskApi = async (data: ITaskRequest): Promise<IResultResponse> => {
  return httpClient.post("/app/tasks/create", data);
};
