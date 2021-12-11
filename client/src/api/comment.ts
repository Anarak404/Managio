import { httpClient } from "./client";
import {
  IComment,
  ICommentPageable,
  ICreateCommentRequest,
  IParams,
} from "./types";

export const addCommentApi = async (
  id: number,
  data: ICreateCommentRequest
): Promise<IComment> => {
  return httpClient.post(`/app/comments/${id}/create`, data);
};

export const getAllCommentsApi = async (
  id: number,
  params: IParams
): Promise<ICommentPageable> => {
  return httpClient.get(`/app/comments/${id}/all`, params);
};
