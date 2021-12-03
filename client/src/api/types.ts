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

export interface ITeamRequest {
  name: string;
  photo: Blob | undefined;
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
  todoTasks: ITask[];
  inProgressTasks: ITask[];
  doneTasks: ITask[];
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
  labels: ILabel[];
  assignedUser: IUser;
}

export interface ITaskDetails extends ITask {
  description: string;
  status: string;
  reporter: IUser;
  assignedTeam: ITeam;
}

export interface ILabel {
  label: string;
  exist: boolean;
}
