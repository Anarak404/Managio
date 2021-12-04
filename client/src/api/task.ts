import { httpClient } from "./client";
import {
  IConfig,
  IName,
  IResultResponse, ITaskPackage,
  ITaskRequest
} from "./types";

export const getConfigApi = async (): Promise<IConfig> => {
  return httpClient.get("/app/tasks/config");
};

export const createTaskApi = async (
  data: ITaskRequest
): Promise<IResultResponse> => {
  return httpClient.post("/app/tasks/create", data);
};

export const getTasksAssignedToUserApi = async (): Promise<ITaskPackage> => {
  return httpClient.get("/app/tasks");
};

export const changeTaskStatusApi = async (
  data: IName,
  id: number
): Promise<IResultResponse> => {
  return httpClient.put(`/app/tasks/${id}/status`, data);
};
