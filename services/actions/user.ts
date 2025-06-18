
import { ENV } from '@/config';
import { IHttpResponse } from '@/types';
import { FieldValues } from 'react-hook-form';
import setAccessToken from './set-access-token';

export const userLogin = async (data: FieldValues, callbackUrl?: string) => {
  const res = await fetch(`${ENV.serverUrl!}/btoc/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "agency": ENV.btocToken!,
    },
    body: JSON.stringify(data),
  });

  const userInfo = await res.json();

  if (userInfo.token) {
    setAccessToken(userInfo.token, {
      redirect: '/dashboard',
      callbackUrl: callbackUrl || undefined,
    });
  }

  return userInfo;
};

export const userRegister = async (data: FieldValues) => {
  const res = await fetch(`${ENV.serverUrl!}/btoc/auth/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'agency': ENV.btocToken!,
    },
    body: JSON.stringify(data),
  });

  const userInfo = await res.json();

  return userInfo;
};


export const sendOTP = async (email: string, type: "reset_user" | "verify_user") => {
  try {
    const res = await fetch(`${ENV.serverUrl!}/btoc/otp/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'agency': ENV.btocToken!,
      },
      body: JSON.stringify({
        email,
        type
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send OTP. Status: ${res.status} - ${res.statusText}`);
    }
    const responseData = await res.json() as IHttpResponse<any>;
    if (!responseData.success) {
      throw new Error(responseData.message);
    }
  } catch (error) {
    return (error as Error);
  }
};


export const matchOTP = async (email: string, otp: string, type: "reset_user" | "verify_user"): Promise<IHttpResponse<any>> => {
  const res = await fetch(`${ENV.serverUrl!}/btoc/otp/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "agency": ENV.btocToken!,
    },
    body: JSON.stringify({
      email,
      otp,
      type
    }),
  });
  const responseData = await res.json();
  return responseData;
};

export const changePassword = async (
  token: string,
  password: string,
): Promise<IHttpResponse<any>> => {
  const res = await fetch(`${ENV.serverUrl!}/btoc/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'agency': ENV.btocToken!,
    },
    body: JSON.stringify({
      token,
      password
    }),
  });

  const responseData = await res.json();

  return responseData;
};