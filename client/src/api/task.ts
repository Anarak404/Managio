import { httpClient } from "./client";
import {
  IConfig,
  IName,
  IParams,
  IResultResponse,
  ITaskDetails,
  ITaskPackage,
  ITaskPageable,
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

export const getTaskApi = async (id: number): Promise<ITaskDetails> => {
  return httpClient.get(`/app/tasks/${id}`);
};

export const getTasksAssignedToUserApi = async (): Promise<ITaskPackage> => {
  return httpClient.get("/app/tasks");
};

export const getAllTasksApi = async (data: IParams): Promise<ITaskPageable> => {
  return httpClient.get("/app/tasks/all", data);
};

export const changeTaskStatusApi = async (
  data: IName,
  id: number
): Promise<IResultResponse> => {
  return httpClient.put(`/app/tasks/${id}/status`, data);
};
