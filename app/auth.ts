import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { image } from "motion/react-client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { throwDeprecation } from "process";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //connect to db
      //check email
      //password metch

      async authorize(credentials, request) {
        await connectDb();
        const email = credentials.email;
        const password = credentials.password as string;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User does not exist");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider == "google") {
          await connectDb();
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            //create user
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
          }
          user.id = dbUser._id.toString();
          user.role = dbUser.role;
        }
        return true;
      } catch (error) {
        console.log("Error in google signIn:", error);
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {
      // token ke aunder data dalta h
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      if (trigger === "update") {
        token.role = session.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user.id = token.id as string),
          (session.user.name = token.name as string),
          (session.user.email = token.email as string),
          (session.user.role = token.role as string);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, //mili second
  },
  secret: process.env.AUTH_SECRET,
});
