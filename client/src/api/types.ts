import { Status } from "../components/dashboard/DashboardView";

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ISignInRequest {
  name: string;
}

export interface ITeamMembersRequest {
  emails: string[];
}

export interface IResultResponse {
  success: boolean;
}

export interface ITeamRequest extends IPhoto {
  name: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  photo: string;
}

export interface ITeam {
  id: number;
  name: string;
  photo: string;
  owner: IUser;
}

export interface ITeamDetails extends ITeam {
  teamMembers: IUser[];
  tasks: ITaskPackage;
}

export interface IConfig {
  labels: ILabel[];
  priorities: string[];
}

export interface ITaskRequest {
  title: string;
  description: string;
  userId: number;
  teamId: number;
  priority: string;
  labels: ILabel[];
}

export interface ITask {
  id: number;
  title: string;
  priority: string;
  status: Status;
  labels: ILabel[];
  assignedUser: IUser;
}

export interface ITaskDetails extends ITask {
  description: string;
  reporter: IUser;
  assignedTeam: ITeam;
  attachments: IAttachment[];
}

export interface ITaskPackage {
  todoTasks: ITask[];
  inProgressTasks: ITask[];
  doneTasks: ITask[];
}

export interface ILabel {
  label: string;
  exist: boolean;
}

export interface IName {
  name: Status;
}

export interface IParams {
  page: number;
  size: number;
}

export interface ITaskPageable {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  tasks: ITask[];
}

export type AllowedOperators = "EQ" | "NOT_EQ";

export type AcceptedField = "TITLE" | "PRIORITY" | "STATUS";

export interface IFilterValue {
  field: AcceptedField;
  value: string;
  operator: AllowedOperators;
}

export interface ISearchTaskRequest {
  filters: IFilterValue[];
}

export interface IComment {
  id: number;
  description: string;
  user: IUser;
  time: string;
}

export interface ICreateCommentRequest {
  description: string;
}

export interface ICommentPageable {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  comments: IComment[];
}

export interface IAttachment {
  name: string;
  path: string;
}

export interface IPasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface IPhoto {
  photo: Blob | undefined;
}

export interface INameRequest {
  name: string;
}
