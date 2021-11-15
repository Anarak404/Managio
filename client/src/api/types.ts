export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ISignInRequest {
  name: string;
}

export interface IUser {
  name: string;
  email: string;
}
