"use client";
import { useGetMeQuery } from "@/redux/api/profile.api";
import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";
const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  const { isError, error, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !data?.user?.id,
  });
  if (isError) {
    signOut();
  }

  return children;
};

export default UserProvider;
