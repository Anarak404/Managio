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
  photo: string;
}

export interface IUser {
  name: string;
  email: string;
  photo: string;
}

export interface ITeam {
  name: string;
  photo: string;
  owner: IUser;
}

export interface ITeamDetails extends ITeam {
  teamMembers: IUser[];
}
