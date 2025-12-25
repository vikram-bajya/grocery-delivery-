import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
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
        const passowrd = credentials.password as string;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User does not exist");
        }
        const isMatch = await bcrypt.compare(passowrd, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          
        };
      },
    }),
  ],
});
