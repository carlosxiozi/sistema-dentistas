import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import { UserAuth, ManagerError } from '../app/service/UserAuth';
import {  parseErrorFromApi, ResponseApi } from "../app/models/response";
import { AuthSession } from "../app/models/auth-sessions";

export const { authOptions, signIn, handlers } = NextAuth({
  session: { strategy: "jwt" },
  jwt: {
    maxAge: 60 * 60 * 24, // 1 día
    // Removed invalid property 'updateAge'
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const validation = z.object({
          email: z.string().email(),
          password: z.string().min(4),
        }).safeParse(credentials);

        if (!validation.success) return null;

        const { email, password } = validation.data;
        const response = await new UserAuth().login(email, password);

        if (response.type === 'error') {
          throw new ManagerError(parseErrorFromApi(response as unknown as ResponseApi), response.type, { error: response.message });
        }

        const session: AuthSession = response.data as AuthSession;

        return {
          id: session.id ?? '',
          email: session.user_data?.email ?? '',
          name: session.user_data?.name ?? '',
          role: session.user_data?.role ?? '',
          token: session.auth_token ?? ''
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    }
  }
});
