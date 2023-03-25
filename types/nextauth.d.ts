import Nextauth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    // id?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    admin: boolean;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

// nextauth.d.ts
declare module "next-auth/jwt" {
  interface JWT {
    // id?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    admin: boolean;
  }
}
