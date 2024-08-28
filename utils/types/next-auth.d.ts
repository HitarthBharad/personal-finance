// types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Custom User type extending the default NextAuth User
interface IUser extends DefaultUser {
  id: string;
  role?: string;
}

// Custom JWT type extending the default JWT
interface IToken extends JWT {
  user?: IUser;
}

// Custom Session type extending the default Session
interface ISession extends DefaultSession {
  user?: IUser;
}

interface ICredentials {
  username: string;
  password: string
}

export type { IUser, IToken, ISession, ICredentials };
