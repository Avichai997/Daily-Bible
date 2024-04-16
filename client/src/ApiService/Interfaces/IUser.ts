export interface IUser {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  photo: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  passwordResetExpires: Date;
  passwordResetToken: string;
  passwordChangedAt: Date;
  emailVerified: boolean;
  emailConfirmToken: string;
}

export type UserData = Omit<
  IUser,
  'passwordResetExpires' | 'passwordResetToken' | 'passwordChangedAt' | 'emailConfirmToken'
>;

export interface IUserLocalStorage {
  email: string;
  id?: string;
  firstName: string;
  lastName: string;
  name: string;
  photo: string;
  phoneNumber: string;
  tokenExpiration: string;
  emailVerified: boolean;
  role: 'user' | 'admin';
}
export interface ISignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}
export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginSignupResponse {
  status?: string;
  tokenExpiration: string;
  data: UserData;
}
export interface IUpdateMyProfileRequest extends FormData {
  firstName: string;
  lastName: string;
  email: string;
  photo: File;
  phoneNumber: string;
}
export interface IUpdateMyProfileResponse {
  status: string;
  data: UserData;
}
export interface ILogoutResponse {
  status: string;
  token: '';
}
export interface IUpdateMyPasswordRequest {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}
export interface IUpdateMyPasswordResponse {
  status: string;
  tokenExpiration: string;
  data: UserData;
}
export interface IForgotPasswordRequest {
  email: string;
}
export interface IForgotPasswordResponse {
  status: string;
  message: string;
}
export interface IResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}
export type ResetPasswordData = IResetPasswordRequest & {
  temporaryToken: string;
};

export interface IConfirmEmailRequest {
  email: string;
}
export interface ISendConfirmEmailRequest {
  email: string;
}
