import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ENV } from "./config"
import { IHttpResponse, IUser } from "./types"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string
        const password = credentials.password as string
        if (!ENV.btocToken) { throw new Error("BTOC token is not set") }
        const res = await fetch(`${ENV.serverUrl!}/btoc/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "agency": ENV.btocToken,
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const userInfo = await res.json() as IHttpResponse<IUser>;
        if (userInfo.success === false) {
          throw new CredentialsSignin(userInfo.message)
        }
        let user = {}
        if (userInfo.data) {
          user = {
            id: userInfo.token,
            name: userInfo.data.name,
            email: userInfo.data.email,
            image: userInfo.data.photo,
          }
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    }
  },
})