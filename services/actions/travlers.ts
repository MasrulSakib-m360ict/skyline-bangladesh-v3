"use server"
import { ENV } from '@/config';


export const travelerList = async (token: string) => {
  const res = await fetch(`${ENV.serverUrl!}/btoc/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const userInfo = await res.json();
  return userInfo;
};