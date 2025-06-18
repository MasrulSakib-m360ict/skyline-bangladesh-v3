import { signOut } from "next-auth/react";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logoutUser = async (router: AppRouterInstance) => {
  await signOut();
  router.refresh();
};
