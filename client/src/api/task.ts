import { httpClient } from "./client";
import { IConfig, IResultResponse, ITask } from "./types";

export const getConfigApi = async (): Promise<IConfig> => {
  return httpClient.get("/app/tasks/config");
};

export const createTaskApi = async (data: ITask): Promise<IResultResponse> => {
  return httpClient.post("/app/tasks/create", data);
};
