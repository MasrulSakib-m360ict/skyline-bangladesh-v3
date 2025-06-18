'use server';

import { authKey } from '@/contants/authkey';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: { redirect?: string, callbackUrl?: string }) => {
  // Set the access token in cookies
  cookies().set(authKey, token);

  // Use the callbackUrl if it exists, otherwise fall back to the redirect option
  const redirectUrl = option?.callbackUrl || option?.redirect || '/dashboard';

  // Redirect to the desired URL
  redirect(redirectUrl);
};

export default setAccessToken;
