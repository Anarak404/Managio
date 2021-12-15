import { httpClient } from "./client";
import {
  IConfig,
  IName,
  IParams,
  IResultResponse,
  ISearchTaskRequest,
  ITask,
  ITaskDetails,
  ITaskPackage,
  ITaskPageable,
  ITaskRequest,
} from "./types";

export const getConfigApi = async (): Promise<IConfig> => {
  return httpClient.get("/app/tasks/config");
};

export const createTaskApi = async (data: ITaskRequest): Promise<ITask> => {
  return httpClient.post("/app/tasks/create", data);
};

export const getTaskApi = async (id: number): Promise<ITaskDetails> => {
  return httpClient.get(`/app/tasks/${id}`);
};

export const getFilteredTasksApi = async (
  params: IParams,
  data: ISearchTaskRequest
): Promise<ITaskPageable> => {
  return httpClient.post("/app/tasks/filter", data, undefined, params);
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

export const editTaskApi = async (
  id: number,
  data: ITaskRequest
): Promise<ITaskDetails> => {
  return httpClient.put(`/app/tasks/${id}/edit`, data);
};

export const saveAttachmentsApi = async (
  id: number,
  files: Blob[] | undefined
): Promise<IResultResponse> => {
  return httpClient.post(
    `/app/tasks/${id}/attachments`,
    { files },
    "multipart/form-data"
  );
};
