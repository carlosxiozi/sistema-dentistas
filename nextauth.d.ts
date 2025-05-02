import NextAuth, { DefaultSession } from 'next-auth';
import { UserModel } from './app/models/user';
import { AuthSession } from './app/models/auth-session';
declare module 'next-auth' {
  interface User extends Omit<AuthSession, 'password'>, DefaultUser {}
  interface Session extends DefaultSession {
    user: User;
  }
  interface JWT extends Omit<AuthSession, 'password'> {

  }
}