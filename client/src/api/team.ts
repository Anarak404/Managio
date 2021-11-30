import { httpClient } from "./client";
import {
  IResultResponse,
  ITeam,
  ITeamDetails,
  ITeamMembersRequest,
  ITeamRequest
} from "./types";

export const getTeamsApi = async (): Promise<ITeam[]> => {
  return httpClient.get("/app/teams/getTeams");
};

export const createTeamApi = async (data: ITeamRequest): Promise<ITeam> => {
  return httpClient.post("/app/teams/create", data, "multipart/form-data");
};

export const getTeamApi = async (id: number): Promise<ITeamDetails> => {
  return httpClient.get(`/app/teams/${id}`);
};

export const deleteTeamApi = async (id: number): Promise<IResultResponse> => {
  return httpClient.delete(`/app/teams/${id}`);
};

export const getMembersApi = async (id: number): Promise<ITeam[]> => {
  return httpClient.get(`/app/teams/${id}/members`);
};

export const addMembersApi = async (
  data: ITeamMembersRequest,
  id: number
): Promise<ITeamDetails> => {
  return httpClient.post(`/app/teams/${id}/members`, data);
};

export const deleteMemberApi = async (
  teamId: number,
  userId: number
): Promise<IResultResponse> => {
  return httpClient.get(`/app/teams/${teamId}/members/${userId}`);
};

export const updateTeamApi = async (
  data: ITeamRequest,
  id: number
): Promise<ITeam> => {
  return httpClient.put(`/app/teams/${id}/update`, data, "multipart/form-data");
};
