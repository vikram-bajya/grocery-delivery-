import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
export {}