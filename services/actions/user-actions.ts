"use server"

import { signIn } from "@/auth";
import { ILogin } from "@/types";
import { CredentialsSignin } from "next-auth";

const userLogin = async (data: ILogin, callback?: string) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.message;
  }
};




export { userLogin };

