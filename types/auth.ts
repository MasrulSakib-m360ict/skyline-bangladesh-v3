// ! for slice 
export type TInitialState = {
  user: null | IUser,
  token: string | null,
  recover: {
    token: string | null,
    email: string | null,
    time: string | null
  }
}
// data fetching
export interface IUser {
  id: number;
  name: string;
  agency_id: number;
  email: string;
  mobile_number: string;
  status: number;
  is_verified: number;
  photo: string;
  created_at: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  mobile_number: string;
}

export interface dataType {
  type: "reset_btob"
}
export interface ISendOTP extends dataType {
  email: string;
}
export interface IMatchOtp extends dataType {
  email: string;
  otp: string;
}
export interface IRecoverToken extends dataType {
  token?: string;
  email: string;

}
export interface IResetPassword {
  token: string;
  password: string;
}
export interface IChangePassword {
  old_password: string;
  new_password: string
}

export interface IData {
  id: number;
  name: string;
  agency_id: number;
  email: string;
  mobile_number: string;
  status: number;
  photo: string;
  is_verified: number;
}
